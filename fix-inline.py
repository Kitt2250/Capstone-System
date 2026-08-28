import sys

files = [
    "src/component/staff/GraveInventory.jsx",
    "src/component/staff/InstallmentPayments.jsx",
    "src/component/staff/SBurialRecords.jsx"
]

for filepath in files:
    content = open(filepath, "r", encoding="utf-8").read()
    content = content.replace('className="main-content" style={{ padding: "0 1.5rem" }}', 'className="main-content"')
    open(filepath, "w", encoding="utf-8").write(content)

print("Removed inline padding from components")
