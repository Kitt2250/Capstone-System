import { useState, useEffect } from "react";
import { NavLink, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import "./admin-navigation.css";
import DashboardA from "./DashboardA";
import UserManagement from "./UserManagement";
import AuditLogs from "./AuditLogs";
import MapAvailability from "./MapAvailability";
import Settings from "./Settings";
import BackupRestore from "./BackupRestore";
import Reports from "./Reports";

// ── Fallback Route Helper ───────────────────────────────────────────────────
function FallbackRoute({ to }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (window.history.length > 2) navigate(-1);
    else navigate(to, { replace: true });
  }, [navigate, to]);
  return null;
}

// ── Section-grouped menu ──────────────────────────────────────────────────────
const mainItems = [
  { key: "dashboard", label: "Dashboard",       path: "/admin/dashboard" },
  { key: "users",     label: "User Management", path: "/admin/users" },
  { key: "audit",     label: "Audit Logs",      path: "/admin/audit" },
  { key: "map",       label: "Map Availability", path: "/admin/map" },
];

const managementItems = [
  { key: "reports",  label: "Reports",          path: "/admin/reports" },
  { key: "settings", label: "Settings",         path: "/admin/settings" },
  { key: "backup",   label: "Backup & Restore", path: "/admin/backup" },
];

function getInitials(name) {
  return (name || "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function AdminNavIcon({ navKey }) {
  if (navKey === "dashboard") return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  );
  if (navKey === "users") return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
  if (navKey === "audit") return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  );
  if (navKey === "map") return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );

  if (navKey === "reports") return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
  if (navKey === "settings") return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
  if (navKey === "backup") return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
  return null;
}

// ── Chevron icon (rotates on toggle) ─────────────────────────────────────────
function ChevronIcon({ collapsed }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="13"
      height="13"
      style={{
        transition: "transform 280ms cubic-bezier(0.4,0,0.2,1)",
        transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
      }}
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function AdminNavigation({ onSignOut }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem("adminSidebarCollapsed") === "true";
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(prev => {
      const next = !prev;
      localStorage.setItem("adminSidebarCollapsed", next);
      return next;
    });
  };

  const closeMobile = () => setMobileOpen(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;
      try {
        const userSnap = await getDoc(doc(db, "users", uid));
        if (userSnap.exists()) setCurrentUser(userSnap.data());
      } catch (err) {
        console.error("Failed to load current user:", err);
      }
    };
    fetchCurrentUser();
  }, []);

  return (
    <div className="admin-layout">
      {/* Mobile overlay backdrop */}
      {mobileOpen && <div className="admin-mobile-overlay" onClick={closeMobile} />}

      {/* ── SIDEBAR ── */}
      <aside className={`admin-sidebar${collapsed ? " collapsed" : ""}${mobileOpen ? " mobile-open" : ""}`}>

        {/* Brand */}
        <div className="admin-brand">
          <div className="admin-brand-icon" title="Cherubim of Heaven">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
              fill="none" stroke="white" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
              <circle cx="12" cy="8" r="3" />
              <path d="M6 20v-2a6 6 0 0 1 12 0v2" />
            </svg>
          </div>

          <div className="admin-brand-text">
            <div className="admin-brand-title">Cherubim of Heaven</div>
            <div className="admin-brand-subtitle">Administrator Panel</div>
          </div>

          {/* Toggle button — always in the brand row */}
          <button
            className="admin-toggle-btn"
            onClick={toggleSidebar}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronIcon collapsed={collapsed} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="admin-nav">
          <div className="admin-nav-section-label">MAIN</div>
          {mainItems.map((item) => (
            <NavLink
              key={item.key}
              to={item.path}
              className={({ isActive }) => `admin-menu-item${isActive ? " active" : ""}`}
              title={collapsed ? item.label : ""}
            >
              <span className="admin-menu-icon"><AdminNavIcon navKey={item.key} /></span>
              <span className="admin-menu-label">{item.label}</span>
            </NavLink>
          ))}

          <div className="admin-nav-section-label" style={{ marginTop: "16px" }}>MANAGEMENT</div>
          {managementItems.map((item) => (
            <NavLink
              key={item.key}
              to={item.path}
              className={({ isActive }) => `admin-menu-item${isActive ? " active" : ""}`}
              title={collapsed ? item.label : ""}
            >
              <span className="admin-menu-icon"><AdminNavIcon navKey={item.key} /></span>
              <span className="admin-menu-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="admin-sidebar-footer">
          <div className="admin-user" title={collapsed ? (currentUser?.name || "") : ""}>
            <div className="admin-user-avatar">
              {getInitials(currentUser?.name) || "—"}
            </div>
            <div className="admin-user-info">
              <div className="admin-user-name">{currentUser?.name || "Loading..."}</div>
              <div className="admin-user-email">{currentUser?.email || auth.currentUser?.email || ""}</div>
            </div>
            <button className="admin-signout-btn" onClick={onSignOut} title="Sign Out">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                width="15" height="15">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="admin-content">
        {/* Hamburger button — mobile only */}
        <button className="admin-hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
            <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <Routes>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardA />} />
          <Route path="users"     element={<UserManagement />} />
          <Route path="audit"     element={<AuditLogs />} />
          <Route path="map"       element={<MapAvailability />} />
          <Route path="reports"   element={<Reports />} />
          <Route path="settings"  element={<Settings />} />
          <Route path="backup"    element={<BackupRestore />} />
          <Route path="*"         element={<FallbackRoute to="dashboard" />} />
        </Routes>
      </main>
    </div>
  );
}

export default AdminNavigation;