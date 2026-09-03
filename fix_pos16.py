import re

with open("src/component/staff/pos-transactions.css", "r", encoding="utf-8") as f:
    css = f.read()

# Make the table compact by removing width: 100% and table-layout: fixed ONLY for product-table
css = re.sub(r'(\.product-table\s*\{[^}]*)\bwidth:\s*100%;\n?([^}]*\})', r'\1\2', css)
css = re.sub(r'(\.product-table\s*\{[^}]*)\btable-layout:\s*fixed;\n?([^}]*\})', r'\1\2', css)

# Also remove it from the media queries
css = re.sub(r'(\.product-table\s*\{[^}]*)\btable-layout:\s*fixed;\n?([^}]*\})', r'\1\2', css)
css = re.sub(r'(\.product-table\s*\{[^}]*)\bwidth:\s*100%;\n?([^}]*\})', r'\1\2', css)

with open("src/component/staff/pos-transactions.css", "w", encoding="utf-8") as f:
    f.write(css)
