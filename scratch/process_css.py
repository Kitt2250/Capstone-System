import re
import os

with open("scratch/last_user_prompt.txt", "r", encoding="utf-8") as f:
    text = f.read()

# Extract CSS
css_match = re.search(r"<style>(.*?)</style>", text, re.DOTALL)
if not css_match:
    print("CSS not found")
    exit(1)

css = css_match.group(1)

# List of classes to prefix
classes_to_prefix = [
    "sidebar", "sidebar-brand", "brand-content", "icon-ornament", "brand-text", "sub",
    "toggle-btn", "sidebar-nav", "nav-label", "sidebar-footer", "user-card", "avatar",
    "info", "name", "email", "badge", "main-content", "topbar", "topbar-left", "greeting",
    "topbar-right", "date-badge", "notification-btn", "dot", "stats-grid", "stat-card",
    "stat-icon", "stat-label", "stat-value", "stat-change", "down", "alert-banner",
    "alert-item", "dashboard-grid", "schedule-section", "section-header", "view-all",
    "schedule-filters", "filter-btn", "count", "schedule-list", "schedule-item",
    "burial", "payment", "wake", "registration", "time", "event", "location", "type-badge",
    "no-results", "right-panel", "transactions-section", "transaction-list",
    "transaction-item", "tx-icon", "gold", "blue", "green", "orange", "tx-info", "desc",
    "payments-section", "payment-item", "pay-avatar", "pay-info", "installment", "pay-amount",
    "pay-time", "toast", "toast-close"
]

# We should separate general HTML tag styling from class styling.
# Remove body, *, html styles to avoid global leakage.
css = re.sub(r"\* \{[^}]+\}", "", css)
css = re.sub(r"body \{[^}]+\}", "", css)
# replace body.sidebar-collapsed with .staff-body-collapsed
css = css.replace("body.sidebar-collapsed", ".staff-body-collapsed")

# Simple replace to add .ds- prefix to these classes
for cls in sorted(classes_to_prefix, key=len, reverse=True):
    # Regex to replace class names in CSS (.classname)
    # Be careful not to replace parts of other class names
    css = re.sub(r"\." + cls + r"(?![a-zA-Z0-0_-])", ".ds-" + cls, css)

# The CSS might be combined for navigation and dashboard. 
# Let's just output it to a single file: ds-styles.css
# Or we can put it in dashboards.css since it's used in the StaffDashboard

with open("src/component/staff/dashboards.css", "w", encoding="utf-8") as f:
    f.write(css)

print("CSS processed and saved.")
