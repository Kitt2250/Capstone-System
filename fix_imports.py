import sys
import re

for file in ["src/component/staff/Reports.jsx", "src/component/staff/WakeScheduling.jsx"]:
    content = open(file, "r", encoding="utf-8").read()
    if "StaffTopbar" not in content[:500]:
        content = content.replace("import './staff-shared.css';", "import './staff-shared.css';\nimport StaffTopbar from './StaffTopbar';")
        open(file, "w", encoding="utf-8").write(content)
        
