import sys, re

path = "src/component/staff/StaffNavigation.jsx"
content = open(path, "r", encoding="utf-8").read()

# Add import
content = content.replace('import "./staff-navigation.css";', 'import "./staff-navigation.css";\nimport logoIcon from "../../assets/logo-icon.png";')

# Replace SVG block
svg_pattern = r'<div className="sn-brand-icon" title="Cherubim of Heaven">.*?</div>'
replacement = '<div className="sn-brand-icon" title="Cherubim of Heaven" style={{ background: "transparent", boxShadow: "none" }}><img src={logoIcon} alt="Logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>'
content = re.sub(svg_pattern, replacement, content, flags=re.DOTALL)

open(path, "w", encoding="utf-8").write(content)
