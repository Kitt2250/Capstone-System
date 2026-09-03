import re

with open("src/component/staff/pos-transactions.css", "r", encoding="utf-8") as f:
    css = f.read()

# 1. Remove the min-width: min-content hacks that caused the page to stretch/scroll
css = re.sub(r'\s*min-width:\s*min-content;', '', css)

# 2. Force exactly 50/50 split on the main pos-two-col only
css = re.sub(r'(\.pos-two-col\s*\{[^}]*)grid-template-columns:\s*1fr\s+1\.1fr;', r'\1grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);', css)

# 3. Add min-width: 0 to grid panels to ensure they respect the 50/50 split
if '.left-panel, .right-panel { min-width: 0; }' not in css:
    css += '\n.left-panel, .right-panel { min-width: 0; }\n'

# 4. Make the table fit perfectly inside its 50% container
if 'table-layout: fixed;' not in css:
    css = re.sub(r'(\.product-table\s*\{[^}]*)(\})', r'\1    table-layout: fixed;\n    width: 100%;\n\2', css)

# 5. Ensure text wraps nicely instead of cutting off
if 'word-wrap: break-word;' not in css:
    css += '\n.product-table th, .product-table td { word-wrap: break-word; white-space: normal; }\n'

with open("src/component/staff/pos-transactions.css", "w", encoding="utf-8") as f:
    f.write(css)
