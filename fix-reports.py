import sys, re

filepath = "src/component/staff/Reports.jsx"
content = open(filepath, "r", encoding="utf-8").read()

content = content.replace('<StaffTopbar title="Reports" greeting="Analytics and insights for Cherubim of Heaven Memorial Park" />\n            </div>', '<StaffTopbar title="Reports" greeting="Analytics and insights for Cherubim of Heaven Memorial Park" />')

open(filepath, "w", encoding="utf-8").write(content)
