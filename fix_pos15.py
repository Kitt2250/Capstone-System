import re

with open("src/component/staff/pos-transactions.css", "r", encoding="utf-8") as f:
    css = f.read()

# Make the table compact by removing width: 100% and table-layout: fixed
css = re.sub(r'width:\s*100%;\n?', '', css)
css = re.sub(r'table-layout:\s*fixed;\n?', '', css)

with open("src/component/staff/pos-transactions.css", "w", encoding="utf-8") as f:
    f.write(css)
