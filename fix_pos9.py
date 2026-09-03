import re

with open("src/component/staff/pos-transactions.css", "r", encoding="utf-8") as f:
    css = f.read()

# 1. Remove table-layout: fixed
css = re.sub(r'\s*table-layout:\s*fixed;', '', css, flags=re.DOTALL)
# 2. Remove min-width: 0 hack
css = re.sub(r'\.pos-two-col,\s*\.left-panel,\s*\.right-panel\s*\{\s*min-width:\s*0;\s*\}', '', css, flags=re.DOTALL)
# 3. Remove media queries added in fix_pos5.py
css = re.sub(r'@media\s*\(max-width:\s*1400px\)\s*\{[^}]*\}', '', css, flags=re.DOTALL)
# 4. Make pos-container strictly stretch width
css = re.sub(r'(\.pos-page-wrapper\s*\{[^}]*)\bwidth:\s*100%;([^}]*\})', r'\1width: 100%;\n    min-width: min-content;\2', css)
css = re.sub(r'(\.pos-container\s*\{[^}]*)\bwidth:\s*100%;([^}]*\})', r'\1width: 100%;\n    min-width: min-content;\2', css)
css = re.sub(r'(\.pos-page-wrapper\s*\{[^}]*)\bmin-width:\s*0;\n', r'\1', css)


with open("src/component/staff/pos-transactions.css", "w", encoding="utf-8") as f:
    f.write(css)

with open("src/component/staff/staff-navigation.css", "r", encoding="utf-8") as f:
    css2 = f.read()
css2 = re.sub(r'@media\s*\(max-width:\s*1400px\)\s*\{[^}]*\}', '', css2, flags=re.DOTALL)
with open("src/component/staff/staff-navigation.css", "w", encoding="utf-8") as f:
    f.write(css2)
