import re
with open("src/component/staff/pos-transactions.css", "r", encoding="utf-8") as f:
    css = f.read()

force_css = """
/* BRUTE FORCE COMPACT TABLE */
.product-table {
    width: max-content !important;
    max-width: 100% !important;
    table-layout: auto !important;
}
.product-table th, .product-table td {
    width: auto !important;
    white-space: nowrap !important;
}
"""

if '/* BRUTE FORCE COMPACT TABLE */' not in css:
    css += "\n" + force_css

with open("src/component/staff/pos-transactions.css", "w", encoding="utf-8") as f:
    f.write(css)
