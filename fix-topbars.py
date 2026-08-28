import sys, re

files = [
    ("src/component/staff/Reports.jsx", "Reports", "Analytics and insights for Cherubim of Heaven Memorial Park"),
    ("src/component/staff/WakeScheduling.jsx", "Wake Scheduling", "Manage wake space reservations — client-first booking"),
    ("src/component/staff/Notifications.jsx", "Notifications", "Stay updated with the latest system alerts"),
    ("src/component/staff/MyAccount.jsx", "My Account", "Manage your personal profile and security settings")
]

for filepath, title, greeting in files:
    content = open(filepath, "r", encoding="utf-8").read()
    
    # Add import if missing
    if "import StaffTopbar" not in content:
        content = content.replace('import "./staff-shared.css";', 'import "./staff-shared.css";\nimport StaffTopbar from "./StaffTopbar";')
    
    # Remove the manual topbar div block
    # It starts with <div className="topbar"> and ends before the next main div
    pattern = r'<div className="topbar">.*?</div>\s*</div>\s*</div>' 
    # Actually wait, regex over multiple lines for nested divs is risky. 
    # Let's match it precisely.
    
    pattern2 = r'<div className="topbar">\s*<div className="topbar-left">.*?</div>\s*</div>\s*</div>'
    replacement = f'<StaffTopbar title="{title}" greeting="{greeting}" />'
    
    content = re.sub(pattern2, replacement, content, flags=re.DOTALL)
    
    open(filepath, "w", encoding="utf-8").write(content)

print("Done")
