import re
for file in ['src/component/staff/reports.css', 'src/component/staff/wake-scheduling.css']:
    content = open(file, 'r', encoding='utf-8').read()
    content = re.sub(r'\*\s*\{[^}]*\}', '', content, flags=re.MULTILINE)
    content = re.sub(r'body\s*\{[^}]*\}', '', content, flags=re.MULTILINE)
    content = re.sub(r'body\.sidebar-collapsed[^{]*\{[^}]*\}', '', content, flags=re.MULTILINE)
    content = re.sub(r'\.main-content\s*\{[^}]*\}', '', content, flags=re.MULTILINE)
    open(file, 'w', encoding='utf-8').write(content)
