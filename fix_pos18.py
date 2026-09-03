import re
with open("src/component/staff/pos-transactions.css", "r", encoding="utf-8") as f:
    css = f.read()

missing_css = """
/* Restoring inline styles stripped by React */
.product-table th:nth-child(1) { width: 30%; }
.product-table th:nth-child(2) { width: 20%; text-align: right; }
.product-table th:nth-child(3) { width: 25%; text-align: center; }
.product-table th:nth-child(4) { width: 25%; text-align: center; }

.product-table td:nth-child(2) { text-align: right; }
.product-table td:nth-child(3) { text-align: center; }
.product-table td:nth-child(4) { text-align: center; }

.cart-items-table th:nth-child(2) { text-align: center; }
.cart-items-table th:nth-child(3) { text-align: right; }
.cart-items-table th:nth-child(4) { text-align: center; }

.cart-items-table td:nth-child(2) { text-align: center; }
.cart-items-table td:nth-child(3) { text-align: right; }
.cart-items-table td:nth-child(4) { text-align: center; }

.receipts-table th:nth-child(4) { text-align: right; }
.receipts-table td:nth-child(4) { text-align: right; }

.info-grid .form-group:has(#clientEmail),
.info-grid .form-group:has(#clientRelationship),
.info-grid .form-group:has(#deceasedName),
.info-grid .form-group:has(#deceasedCause) {
    grid-column: span 2;
}

.table-wrapper {
    border: 1px solid #e8edf4;
    border-radius: 12px;
    overflow-x: auto;
}
"""

if '/* Restoring inline styles stripped by React */' not in css:
    css += "\n" + missing_css

with open("src/component/staff/pos-transactions.css", "w", encoding="utf-8") as f:
    f.write(css)
