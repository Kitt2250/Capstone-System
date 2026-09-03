import re

with open("src/component/staff/pos-transactions.css", "r", encoding="utf-8") as f:
    css = f.read()

# Remove the line above the New Transaction header
css = re.sub(r'\.pos-container::before\s*\{[^}]*\}', '', css, flags=re.DOTALL)

# Remove the overflow-x: auto that I added
css = re.sub(r'\.table-responsive\s*\{\s*overflow-x:\s*auto;\s*\}', '', css, flags=re.DOTALL)
css = re.sub(r'\.product-list-section\s*\{\s*overflow-x:\s*auto;\s*\}', '', css, flags=re.DOTALL)

with open("src/component/staff/pos-transactions.css", "w", encoding="utf-8") as f:
    f.write(css)
