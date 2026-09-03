import re

with open("src/component/staff/staff-navigation.css", "r", encoding="utf-8") as f:
    css = f.read()

responsive_css = """
@media (max-width: 1400px) {
    .sn-content { padding: 12px 14px !important; }
}
"""

if '@media (max-width: 1400px)' not in css:
    css += responsive_css

with open("src/component/staff/staff-navigation.css", "w", encoding="utf-8") as f:
    f.write(css)
