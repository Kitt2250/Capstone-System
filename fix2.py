import sys, re

# Admin
path1 = "src/component/admin/AdminNavigation.jsx"
content1 = open(path1, "r", encoding="utf-8").read()
content1 = content1.replace('import "./admin-navigation.css";', 'import "./admin-navigation.css";\nimport logoIcon from "../../assets/logo-icon.png";')
svg_pattern1 = r'<div className="admin-brand-icon" title="Cherubim of Heaven">.*?</div>'
rep1 = '<div className="admin-brand-icon" title="Cherubim of Heaven" style={{ background: "transparent", boxShadow: "none" }}><img src={logoIcon} alt="Logo" style={{ width: "100%", height: "100%", objectFit: "contain", transform: "scale(1.2)" }} /></div>'
content1 = re.sub(svg_pattern1, rep1, content1, flags=re.DOTALL)
open(path1, "w", encoding="utf-8").write(content1)

# Family
path2 = "src/component/family/FamilyNavigation.jsx"
content2 = open(path2, "r", encoding="utf-8").read()
content2 = content2.replace('import "./family-navigation.css";', 'import "./family-navigation.css";\nimport logoIcon from "../../assets/logo-icon.png";')
svg_pattern2 = r'<div className="fam-brand-icon" title="Cherubim of Heaven">.*?</div>'
rep2 = '<div className="fam-brand-icon" title="Cherubim of Heaven" style={{ background: "transparent", boxShadow: "none" }}><img src={logoIcon} alt="Logo" style={{ width: "100%", height: "100%", objectFit: "contain", transform: "scale(1.2)" }} /></div>'
content2 = re.sub(svg_pattern2, rep2, content2, flags=re.DOTALL)
open(path2, "w", encoding="utf-8").write(content2)
