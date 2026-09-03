import re

with open("src/component/staff/staff-navigation.css", "r", encoding="utf-8") as f:
    css = f.read()

# Add min-width: 0 to .sn-content
css = re.sub(r'(\.sn-content\s*\{[^}]*?)(\})', r'\1  min-width: 0;\n\2', css, count=1)

with open("src/component/staff/staff-navigation.css", "w", encoding="utf-8") as f:
    f.write(css)
