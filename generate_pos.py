import re
import json

with open("C:/Users/Muji/Downloads/staff-POS-withmap.html", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Extract HTML
html_match = re.search(r'</aside>\s*(.*?)<script>', content, re.DOTALL)
html = html_match.group(1) if html_match else ""

# 2. Extract JS
js_match = re.search(r'<script>(.*?)</script>', content, re.DOTALL)
js = js_match.group(1) if js_match else ""

# Remove sidebar logic
js = re.sub(r'// 21\. SIDEBAR TOGGLE.*?(?=(// \d+\.|$))', '', js, flags=re.DOTALL)

# Make functions global so onclick works
js = re.sub(r'function\s+([a-zA-Z0-9_]+)\s*\(', r'window.\1 = function \1(', js)

html_safe = json.dumps(html)
js_safe = json.dumps(js)

jsx_content = f"""
import React, {{ useEffect }} from 'react';
import './pos-transactions.css';

export default function POSTransactions() {{

  useEffect(() => {{
    // Inject JS
    const scriptText = {js_safe};
    const script = document.createElement('script');
    script.innerHTML = "(function() {{ try {{ \\n" + scriptText + "\\n}} catch(e) {{ console.error(e); }} }})();";
    document.body.appendChild(script);

    return () => {{
      document.body.removeChild(script);
    }};
  }}, []);

  return (
    <div 
      className="pos-page-wrapper" 
      style={{{{ padding: '0', background: 'transparent' }}}}
      dangerouslySetInnerHTML={{{{ __html: {html_safe} }}}}
    />
  );
}}
"""

with open("src/component/staff/POSTransactions.jsx", "w", encoding="utf-8") as f:
    f.write(jsx_content)

print("HTML length:", len(html))
print("JS length:", len(js))
