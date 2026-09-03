import re
with open("src/component/staff/pos-transactions.css", "r", encoding="utf-8") as f:
    css = f.read()

# 1. Make the grid strictly bounded
css = re.sub(
    r'\.pos-two-col\s*\{\s*display:\s*grid;\s*grid-template-columns:\s*1fr\s*1\.1fr;',
    '.pos-two-col {\n    display: grid;\n    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);',
    css
)

# 2. Fix the flex bug
css = re.sub(
    r'\.product-table \.product-name-cell\s*\{[^}]*\}',
    '.product-table .product-name-cell {\n    font-weight: 500;\n    color: #1a3d5c;\n    vertical-align: middle;\n}',
    css
)
css = re.sub(
    r'\.product-table \.product-name-cell i\s*\{[^}]*\}',
    '.product-table .product-name-cell i {\n    font-size: 0.9rem;\n    color: #d4af37;\n    width: 18px;\n    text-align: center;\n    margin-right: 6px;\n    display: inline-block;\n    vertical-align: middle;\n}',
    css
)

# 3. Add table-layout: fixed
css = re.sub(
    r'\.product-table\s*\{([^}]*)\}',
    r'.product-table {\1    table-layout: fixed;\n}',
    css, count=1
)

with open("src/component/staff/pos-transactions.css", "w", encoding="utf-8") as f:
    f.write(css)
