with open('src/component/admin/DashboardA.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

import re
content = re.sub(r'(import AdminTopbar from "./AdminTopbar";\s*)+', 'import AdminTopbar from "./AdminTopbar";\n', content)

with open('src/component/admin/DashboardA.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

with open('src/component/staff/DashboardS.jsx', 'r', encoding='utf-8') as f:
    content2 = f.read()

content2 = re.sub(r'(import StaffTopbar from "./StaffTopbar";\s*)+', 'import StaffTopbar from "./StaffTopbar";\n', content2)

with open('src/component/staff/DashboardS.jsx', 'w', encoding='utf-8') as f:
    f.write(content2)

