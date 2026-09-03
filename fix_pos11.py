import re

with open("src/component/staff/pos-transactions.css", "r", encoding="utf-8") as f:
    css = f.read()

# 1. Force strict proportions
css = re.sub(r'grid-template-columns:\s*1fr\s+1\.1fr;', 'grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);', css)

# 2. Add min-width: min-content to pos-page-wrapper and pos-container to prevent white background from being cut off
css = re.sub(r'(\.pos-page-wrapper\s*\{[^}]*)\bmin-width:\s*0;([^}]*\})', r'\1min-width: min-content;\2', css)
css = re.sub(r'(\.pos-container\s*\{[^}]*)\bwidth:\s*100%;([^}]*\})', r'\1width: 100%;\n    min-width: min-content;\2', css)

with open("src/component/staff/pos-transactions.css", "w", encoding="utf-8") as f:
    f.write(css)
