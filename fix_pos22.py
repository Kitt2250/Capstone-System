import re
with open("src/component/staff/pos-transactions.css", "r", encoding="utf-8") as f:
    css = f.read()

# Make the table strictly bounded to the container, and use auto layout
css = re.sub(
    r'\.product-table\s*\{\s*width:\s*max-content;',
    '.product-table {\n    width: 100%;\n    max-width: 100%;',
    css
)

# Explicitly override any inline styles that might be causing the gaps
css += "\n.product-table th { width: auto !important; }\n"

with open("src/component/staff/pos-transactions.css", "w", encoding="utf-8") as f:
    f.write(css)
