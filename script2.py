import re

with open('src/component/admin/DashboardA.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the topbar block
topbar_pattern = re.compile(r'<div className="da-topbar">.*?</div>\s*</div>\s*</div>', re.DOTALL)
content = topbar_pattern.sub('<AdminTopbar title="System Overview" greeting="Welcome back, Administrator" />', content)

# Remove the state vars and hooks for the bell
content = re.sub(r'const \[bellOpen, setBellOpen\].*?const toastIdRef.*?;\n', 'const toastIdRef = useRef(0);\n', content, flags=re.DOTALL)
content = re.sub(r'// Close bell dropdown on outside click.*?// Auto-remove toasts', '// Auto-remove toasts', content, flags=re.DOTALL)
content = re.sub(r'const unreadAlerts = systemAlerts.*?;\n', '', content)

# Remove handleMarkAlertRead and handleMarkAllAlertsRead
content = re.sub(r'// Mark single alert as read.*?const handleReminder =', 'const handleReminder =', content, flags=re.DOTALL)

# Add import
content = content.replace('import "./dashboarda.css";', 'import "./dashboarda.css";\nimport AdminTopbar from "./AdminTopbar";')

with open('src/component/admin/DashboardA.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

with open('src/component/staff/DashboardS.jsx', 'r', encoding='utf-8') as f:
    content2 = f.read()

topbar_pattern2 = re.compile(r'<div className="ds-topbar">.*?</div>\s*</div>\s*</div>', re.DOTALL)
content2 = topbar_pattern2.sub('<StaffTopbar title="Operational Overview" greeting="Welcome back, Staff" />', content2)

content2 = re.sub(r'const \[bellOpen, setBellOpen\].*?const toastIdRef.*?;\n', 'const toastIdRef = useRef(0);\n', content2, flags=re.DOTALL)
content2 = re.sub(r'useEffect\(\(\) => \{\n\s*const handleClickOutside.*?// Auto-remove', '// Auto-remove', content2, flags=re.DOTALL)
content2 = re.sub(r'const unreadAlerts = systemAlerts.*?;\n', '', content2)
content2 = re.sub(r'const handleMarkAlertRead =.*?const filteredSchedule =', 'const filteredSchedule =', content2, flags=re.DOTALL)

content2 = content2.replace('import "./dashboards.css";', 'import "./dashboards.css";\nimport StaffTopbar from "./StaffTopbar";')

with open('src/component/staff/DashboardS.jsx', 'w', encoding='utf-8') as f:
    f.write(content2)

