import re

with open("src/component/staff/pos-transactions.css", "r", encoding="utf-8") as f:
    css = f.read()

replacement = """
.product-table .product-name-cell {
    font-weight: 500;
    color: #1a3d5c;
    vertical-align: middle;
}
.product-table .product-name-cell i {
    font-size: 0.9rem;
    color: #d4af37;
    width: 18px;
    text-align: center;
    margin-right: 6px;
    display: inline-block;
}
"""

css = re.sub(r'\.product-table \.product-name-cell\s*\{[^}]*\}', '', css)
css = re.sub(r'\.product-table \.product-name-cell i\s*\{[^}]*\}', '', css)
css = css + replacement

with open("src/component/staff/pos-transactions.css", "w", encoding="utf-8") as f:
    f.write(css)
