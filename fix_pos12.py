import re

with open("src/component/staff/pos-transactions.css", "r", encoding="utf-8") as f:
    css = f.read()

# 1. Revert to 1fr 1.1fr so it respects min-content and doesn't overlap
css = re.sub(r'grid-template-columns:\s*minmax\(0,\s*1fr\)\s*minmax\(0,\s*1\.1fr\);', 'grid-template-columns: 1fr 1.1fr;', css)

# 2. Add gentle scaling for laptops to prevent scrollbars
responsive_css = """
@media (max-width: 1400px) {
    .pos-container { padding: 1.2rem 1.5rem !important; }
    .pos-two-col { gap: 0.8rem !important; }
    .product-table { font-size: 0.72rem !important; }
    .product-table th, .product-table td { padding: 0.25rem 0.3rem !important; }
    .right-panel .panel-box { padding: 0.6rem 0.8rem !important; }
    .pos-page-wrapper .topbar { margin-bottom: 1rem !important; }
}
"""

if '@media (max-width: 1400px)' not in css:
    css += responsive_css

with open("src/component/staff/pos-transactions.css", "w", encoding="utf-8") as f:
    f.write(css)

with open("src/component/staff/staff-navigation.css", "r", encoding="utf-8") as f:
    css2 = f.read()

responsive_nav = """
@media (max-width: 1400px) {
    .sn-content { padding: 16px 20px !important; }
}
"""
if '@media (max-width: 1400px)' not in css2:
    css2 += responsive_nav

with open("src/component/staff/staff-navigation.css", "w", encoding="utf-8") as f:
    f.write(css2)
