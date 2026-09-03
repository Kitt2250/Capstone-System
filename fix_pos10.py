import re

with open("src/component/staff/pos-transactions.css", "r", encoding="utf-8") as f:
    css = f.read()

css = re.sub(r'grid-template-columns:\s*1fr\s+1\.1fr;', 'grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);', css)

with open("src/component/staff/pos-transactions.css", "w", encoding="utf-8") as f:
    f.write(css)
