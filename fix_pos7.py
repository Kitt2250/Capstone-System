import re

with open("src/component/staff/pos-transactions.css", "r", encoding="utf-8") as f:
    css = f.read()

# Make the white background stretch to fit the grid if it overflows!
css = re.sub(r'(\.pos-page-wrapper\s*\{[^}]*)\bwidth:\s*100%;([^}]*\})', r'\1width: 100%;\n    min-width: min-content;\2', css)
css = re.sub(r'(\.pos-container\s*\{[^}]*)\bwidth:\s*100%;([^}]*\})', r'\1width: 100%;\n    min-width: min-content;\2', css)

with open("src/component/staff/pos-transactions.css", "w", encoding="utf-8") as f:
    f.write(css)
