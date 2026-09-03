import re

def css_to_react_style(css_str):
    if not css_str.strip(): return '{{}}'
    rules = [r.strip() for r in css_str.split(';') if r.strip()]
    obj_str = []
    for r in rules:
        if ':' not in r: continue
        k, v = r.split(':', 1)
        k = k.strip()
        v = v.strip()
        # camelCase
        parts = k.split('-')
        k_camel = parts[0] + ''.join(p.capitalize() for p in parts[1:])
        v = v.replace('"', '\\"').replace("'", "\\'")
        obj_str.append(f"'{k_camel}': '{v}'")
    return '{{ ' + ', '.join(obj_str) + ' }}'

with open('src/component/staff/POSTransactions.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'\bclass=', 'className=', content)

def replacer(match):
    css_str = match.group(1)
    react_style = css_to_react_style(css_str)
    return 'style=' + react_style

content = re.sub(r'style="([^"]*)"', replacer, content)

with open('src/component/staff/POSTransactions.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
