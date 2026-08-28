import sys, re

files = [
    ("src/component/staff/Reports.jsx", "Reports", "Analytics and insights for Cherubim of Heaven Memorial Park"),
    ("src/component/staff/WakeScheduling.jsx", "Wake Scheduling", "Manage wake space reservations — client-first booking"),
    ("src/component/staff/Notifications.jsx", "Notifications", "Stay updated with the latest system alerts"),
    ("src/component/staff/MyAccount.jsx", "My Account", "Manage your personal profile and security settings")
]

for filepath, title, greeting in files:
    content = open(filepath, "r", encoding="utf-8").read()
    
    if "import StaffTopbar" not in content:
        content = content.replace('import "./staff-shared.css";', 'import "./staff-shared.css";\nimport StaffTopbar from "./StaffTopbar";')
    
    # We find the index of `<div className="topbar">`
    start_idx = content.find('<div className="topbar">')
    if start_idx != -1:
        # The topbar ends with a `</div>` that is aligned with the start. 
        # But we can just use a regex that is strictly bounded:
        pattern = re.compile(r'<div className="topbar">.*?<div className="topbar-right">.*?</div>\s*</div>', re.DOTALL)
        replacement = f'<StaffTopbar title="{title}" greeting="{greeting}" />'
        content = pattern.sub(replacement, content, count=1)
        
    open(filepath, "w", encoding="utf-8").write(content)

print("Done")
