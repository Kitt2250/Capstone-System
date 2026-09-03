import re
with open("src/component/staff/pos-transactions.css", "r", encoding="utf-8") as f:
    css = f.read()

# Make the table compact again by using max-content
css = re.sub(
    r'\.product-table\s*\{\s*width:\s*100%;\s*max-width:\s*100%;',
    '.product-table {\n    width: max-content;\n    max-width: 100%;',
    css
)

with open("src/component/staff/pos-transactions.css", "w", encoding="utf-8") as f:
    f.write(css)
