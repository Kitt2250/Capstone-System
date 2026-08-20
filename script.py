import sys

def replace_between(content, start_str, end_str, replacement):
    start = content.find(start_str)
    if start == -1: return content
    end = content.find(end_str, start)
    if end == -1: return content
    return content[:start] + replacement + content[end:]

with open('src/component/staff/DashboardS.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = replace_between(content, '// -- System alert notifications', '// -- Toast component', '')
content = replace_between(content, '// -- Notification Bell Dropdown', 'function DashboardS', '')
content = replace_between(content, '  // Bell dropdown state', '  const toastIdRef', '')
content = replace_between(content, '  useEffect(() => {\n    const handleClickOutside', '  useEffect(() => {\n    if (toasts', '')
content = replace_between(content, '  const handleMarkAlertRead', '  const filteredSchedule =', '')
content = content.replace('  const unreadAlerts = systemAlerts.filter(a => !a.read).length;\n', '')
content = replace_between(content, '      {/* -- Top Bar -- */}', '      {/* -- Stats Grid -- */}', '      <StaffTopbar title=\"Operational Overview\" greeting=\"Welcome back, Staff\" />\n\n')

with open('src/component/staff/DashboardS.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

