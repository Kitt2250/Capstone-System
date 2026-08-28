import sys, re

filepath = "src/component/staff/dashboards.css"
content = open(filepath, "r", encoding="utf-8").read()

pattern = r'(\.ds-topbar\s*\{[^\}]+?)flex-wrap:\s*wrap;([^\}]+\})'
# Only modify the very first match which is usually .ds-topbar itself.
# Or better, just use regex with specific context.
# Let's find `.ds-topbar { display: flex; ... }`
content = re.sub(r'(\.ds-topbar\s*\{[^}]*?)flex-wrap:\s*wrap;', r'\1flex-wrap: nowrap; align-items: center;', content, count=1)

# Ensure left panel takes available space and right doesn't shrink
left_right_fix = """
.ds-topbar-left { flex: 1; min-width: 0; }
.ds-topbar-right { flex-shrink: 0; display: flex; align-items: center; gap: 1.2rem; }
"""

# replace existing ds-topbar-right
content = re.sub(r'\.ds-topbar-right\s*\{[^}]+\}', left_right_fix, content)

open(filepath, "w", encoding="utf-8").write(content)
