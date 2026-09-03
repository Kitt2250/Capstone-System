import re

with open("src/component/staff/pos-transactions.css", "r", encoding="utf-8") as f:
    css = f.read()

# Make sure grid-template-columns is 1fr 1.1fr
css = re.sub(r'grid-template-columns:\s*1\.\d+fr\s+1fr;', 'grid-template-columns: 1fr 1.1fr;', css)

# Add min-width 0 to prevent grid items from refusing to shrink
if '.pos-two-col, .left-panel, .right-panel' not in css:
    css += "\n.pos-two-col, .left-panel, .right-panel { min-width: 0; }\n"

# Add table-layout: fixed to the table so it can actually shrink!
if 'table-layout: fixed;' not in css:
    css = re.sub(r'(\.product-table\s*\{[^}]*)(\})', r'\1    table-layout: fixed;\n\2', css)

# Make sure table-layout: auto is removed
css = re.sub(r'\s*table-layout:\s*auto;', '', css, flags=re.DOTALL)

with open("src/component/staff/pos-transactions.css", "w", encoding="utf-8") as f:
    f.write(css)
