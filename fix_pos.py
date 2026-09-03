import re

with open("src/component/staff/pos-transactions.css", "r", encoding="utf-8") as f:
    css = f.read()

# 1. Remove .pos-container background, border, shadow, padding
# In the user's screenshot, it's just seamlessly blending with the page wrapper.
css = re.sub(r'(\.pos-container\s*\{[^}]*)\bbackground:\s*white;([^}]*\})', r'\1background: transparent;\2', css)
css = re.sub(r'(\.pos-container\s*\{[^}]*)\bborder-radius:\s*20px;([^}]*\})', r'\1border-radius: 0;\2', css)
css = re.sub(r'(\.pos-container\s*\{[^}]*)\bpadding:\s*1\.8rem\s+2rem\s+2rem;([^}]*\})', r'\1padding: 0;\2', css)
css = re.sub(r'(\.pos-container\s*\{[^}]*)\bbox-shadow:[^;]+;([^}]*\})', r'\1box-shadow: none;\2', css)
css = re.sub(r'(\.pos-container\s*\{[^}]*)\bborder:[^;]+;([^}]*\})', r'\1border: none;\2', css)

# 2. Remove the line at the top
css = re.sub(r'\.pos-container::before\s*\{[^}]*\}', '', css, flags=re.DOTALL)

# 3. Change grid to make left panel wider and remove scrollbar (min-width: 0 handles it)
# We use auto 1fr or 1.25fr 1fr to ensure the left panel is wider.
css = re.sub(r'grid-template-columns:\s*1fr\s+1\.1fr;', 'grid-template-columns: 1.25fr 1fr;', css)

# 4. Add min-width: 0 to flex/grid items to prevent overflow
css += "\n.pos-two-col, .left-panel, .right-panel { min-width: 0; }\n"
# 5. Fix SN-content if missing
css += "\n.sn-content { min-width: 0; }\n"

with open("src/component/staff/pos-transactions.css", "w", encoding="utf-8") as f:
    f.write(css)
