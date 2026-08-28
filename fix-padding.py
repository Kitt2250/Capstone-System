import sys, re

filepath = "src/component/staff/staff-shared.css"
content = open(filepath, "r", encoding="utf-8").read()

# Fix desktop padding to match Installment Payments
content = re.sub(r'padding:\s*1\.8rem\s+2\.2rem\s+2\.5rem;', 'padding: 0 1.5rem 2.5rem;', content)

# Fix mobile padding to match Installment Payments
content = re.sub(r'\.reports-page-wrapper,\s*\.wk-page\s*\{\s*padding:\s*1rem;\s*\}', '.reports-page-wrapper, .wk-page { padding: 0 1rem; }', content)

open(filepath, "w", encoding="utf-8").write(content)
