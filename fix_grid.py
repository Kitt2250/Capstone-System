import re

with open("src/component/staff/pos-transactions.css", "r", encoding="utf-8") as f:
    css = f.read()

# Change the grid layout to favor the left panel
css = re.sub(r'grid-template-columns:\s*1fr\s+1\.1fr;', r'grid-template-columns: 1.3fr 1fr;', css)

with open("src/component/staff/pos-transactions.css", "w", encoding="utf-8") as f:
    f.write(css)
