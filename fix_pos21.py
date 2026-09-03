import re
with open("src/component/staff/pos-transactions.css", "r", encoding="utf-8") as f:
    css = f.read()

# Remove the explicit percentage widths for product-table
css = re.sub(r'\.product-table th:nth-child\(1\) \{ width: 30%; \}\n', '', css)
css = re.sub(r'\.product-table th:nth-child\(2\) \{ width: 20%; text-align: right; \}', '.product-table th:nth-child(2) { text-align: right; }', css)
css = re.sub(r'\.product-table th:nth-child\(3\) \{ width: 25%; text-align: center; \}', '.product-table th:nth-child(3) { text-align: center; }', css)
css = re.sub(r'\.product-table th:nth-child\(4\) \{ width: 25%; text-align: center; \}', '.product-table th:nth-child(4) { text-align: center; }', css)

with open("src/component/staff/pos-transactions.css", "w", encoding="utf-8") as f:
    f.write(css)
