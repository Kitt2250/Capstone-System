import re

with open("src/component/staff/pos-transactions.css", "r", encoding="utf-8") as f:
    css = f.read()

responsive_css = """
@media (max-width: 1400px) {
    .pos-container { padding: 1.2rem 1rem !important; }
    .pos-two-col { gap: 0.8rem !important; }
    .product-table { font-size: 0.72rem !important; }
    .product-table th, .product-table td { padding: 0.3rem !important; }
    .right-panel .panel-box { padding: 0.6rem !important; }
    .client-payment-row .form-group { min-width: 90px !important; }
}
"""

if '@media (max-width: 1400px)' not in css:
    css += responsive_css

with open("src/component/staff/pos-transactions.css", "w", encoding="utf-8") as f:
    f.write(css)
