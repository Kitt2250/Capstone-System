import re

with open("src/component/staff/pos-transactions.css", "r", encoding="utf-8") as f:
    css = f.read()

# Revert grid-template-columns to 1fr 1.1fr
css = re.sub(r'grid-template-columns:\s*1\.\d+fr\s+1fr;', 'grid-template-columns: 1fr 1.1fr;', css)

# Remove the min-width: 0 hacks we added at the bottom
css = re.sub(r'\.pos-two-col,\s*\.left-panel,\s*\.right-panel\s*\{\s*min-width:\s*0;\s*\}', '', css, flags=re.DOTALL)

# Remove overflow: hidden from left-panel
css = re.sub(r'(\.left-panel\s*\{[^}]*)overflow:\s*hidden;([^}]*\})', r'\1\2', css)

# Revert table-layout: auto
css = re.sub(r'\s*table-layout:\s*auto;', '', css, flags=re.DOTALL)

with open("src/component/staff/pos-transactions.css", "w", encoding="utf-8") as f:
    f.write(css)
