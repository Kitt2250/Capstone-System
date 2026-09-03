import re

with open("src/component/staff/pos-transactions.css", "r", encoding="utf-8") as f:
    css = f.read()

# 1. Remove the line at the top
css = re.sub(r'\.pos-container::before\s*\{[^}]*\}', '', css, flags=re.DOTALL)

# 2. Change grid to make left panel wider than the right panel.
css = re.sub(r'grid-template-columns:\s*1fr\s+1\.1fr;', 'grid-template-columns: 1.4fr 1fr;', css)

# 3. Make sure table layout is fixed so it can shrink if absolutely necessary
if 'table-layout: fixed;' not in css:
    css = re.sub(r'(\.product-table\s*\{[^}]*)(\})', r'\1    table-layout: auto;\n\2', css)

# 4. Remove overflow-x auto if it was added
css = re.sub(r'\.table-responsive\s*\{\s*overflow-x:\s*auto;\s*\}', '', css, flags=re.DOTALL)
css = re.sub(r'\.product-list-section\s*\{\s*overflow-x:\s*auto;\s*\}', '', css, flags=re.DOTALL)

with open("src/component/staff/pos-transactions.css", "w", encoding="utf-8") as f:
    f.write(css)
