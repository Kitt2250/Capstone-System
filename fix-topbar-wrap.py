import sys, re

filepath = "src/component/staff/dashboards.css"
content = open(filepath, "r", encoding="utf-8").read()

pattern = r'\.ds-topbar\s*\{[^\}]+\}'
# We will just replace flex-wrap: wrap with flex-wrap: nowrap
content = content.replace("flex-wrap: wrap;", "flex-wrap: nowrap;\n    align-items: center;")

# Add flex: 1; min-width: 0 to .ds-topbar-left (if not already there outside media query)
# Let's see if .ds-topbar-left is defined outside media query.
left_pattern = r'\.ds-topbar-left\s*\{'
if not re.search(left_pattern, content):
    # Add it after .ds-topbar
    content = content.replace(".ds-topbar-right {", ".ds-topbar-left { flex: 1; min-width: 0; }\n\n.ds-topbar-right { flex-shrink: 0; ")
    
open(filepath, "w", encoding="utf-8").write(content)
