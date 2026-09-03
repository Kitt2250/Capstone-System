import re

with open("src/component/staff/pos-transactions.css", "r", encoding="utf-8") as f:
    css = f.read()

css = re.sub(r'(\.pos-page-wrapper\s*\{[^}]*)\bmin-width:\s*0;\n', r'\1', css)

with open("src/component/staff/pos-transactions.css", "w", encoding="utf-8") as f:
    f.write(css)
