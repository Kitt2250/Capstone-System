import re
with open("src/component/staff/pos-transactions.css", "r", encoding="utf-8") as f:
    css = f.read()

# Replace width: 100% with width: max-content; on product-table to make it compact
css = re.sub(
    r'(\.product-table\s*\{[^}]*)\bwidth:\s*100%;([^}]*\})',
    r'\1width: max-content;\2',
    css
)

# Remove table-layout: fixed
css = re.sub(
    r'(\.product-table\s*\{[^}]*)\btable-layout:\s*fixed;([^}]*\})',
    r'\1\2',
    css
)

with open("src/component/staff/pos-transactions.css", "w", encoding="utf-8") as f:
    f.write(css)
