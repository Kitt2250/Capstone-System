import sys, re
path = "src/component/staff/StaffNavigation.jsx"
content = open(path, "r", encoding="utf-8").read()
content = content.replace('objectFit: "contain" }}', 'objectFit: "contain", transform: "scale(1.2)" }}')
open(path, "w", encoding="utf-8").write(content)
