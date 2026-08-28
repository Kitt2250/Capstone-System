import sys, re

filepath = "src/component/staff/staff-shared.css"
content = open(filepath, "r", encoding="utf-8").read()

# Desktop padding: from 'padding: 0 1.5rem 2.5rem;' to 'padding: 0 0 2.5rem;'
content = content.replace('padding: 0 1.5rem 2.5rem;', 'padding: 0 0 2.5rem;')

# Mobile padding: from 'padding: 0 1rem;' to 'padding: 0;'
content = content.replace('padding: 0 1rem;', 'padding: 0;')

open(filepath, "w", encoding="utf-8").write(content)
print("Removed padding from staff-shared.css")
