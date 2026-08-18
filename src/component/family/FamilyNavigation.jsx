import { useState, useEffect } from "react";
import { NavLink, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import "./family-navigation.css";

import BurialRecords from "./BurialRecords";
import MyPayments from "./MyPayments";
import GraveLocation from "./GraveLocation";
import Notifications from "./Notifications";
import MyAccount from "./MyAccount";

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
  { key: "burial",        label: "Burial Records", path: "/family/burial" },
  { key: "grave",         label: "Grave Location", path: "/family/grave" },
];

const accountItems = [
  { key: "payments",      label: "My Payments",    path: "/family/payments" },
  { key: "notifications", label: "Notifications",  path: "/family/notifications" },
  { key: "account",       label: "My Account",     path: "/family/account" },
];

function getInitials(name) {
  return (name || "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function FamNavIcon({ navKey }) {

  if (navKey === "burial") return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
  if (navKey === "grave") return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
  if (navKey === "payments") return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
  if (navKey === "notifications") return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
  if (navKey === "account") return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
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

function FamilyNavigation({ onSignOut }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem("familySidebarCollapsed") === "true";
  });

  const toggleSidebar = () => {
    setCollapsed(prev => {
      const next = !prev;
      localStorage.setItem("familySidebarCollapsed", next);
      return next;
    });
  };

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
    <div className="fam-layout">
      {/* ── SIDEBAR ── */}
      <aside className={`fam-sidebar${collapsed ? " collapsed" : ""}`}>

        {/* Brand */}
        <div className="fam-brand">
          <div className="fam-brand-icon" title="Cherubim of Heaven">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
              fill="none" stroke="white" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
              <circle cx="12" cy="8" r="3" />
              <path d="M6 20v-2a6 6 0 0 1 12 0v2" />
            </svg>
          </div>

          <div className="fam-brand-text">
            <div className="fam-brand-title">Cherubim of Heaven</div>
            <div className="fam-brand-subtitle">Family Portal</div>
          </div>

          {/* Toggle button — always in the brand row */}
          <button
            className="fam-toggle-btn"
            onClick={toggleSidebar}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronIcon collapsed={collapsed} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="fam-nav">
          <div className="fam-nav-section-label">MAIN</div>
          {mainItems.map((item) => (
            <NavLink
              key={item.key}
              to={item.path}
              className={({ isActive }) => `fam-menu-item${isActive ? " active" : ""}`}
              title={collapsed ? item.label : ""}
            >
              <span className="fam-menu-icon"><FamNavIcon navKey={item.key} /></span>
              <span className="fam-menu-label">{item.label}</span>
            </NavLink>
          ))}

          <div className="fam-nav-section-label" style={{ marginTop: "16px" }}>ACCOUNT</div>
          {accountItems.map((item) => (
            <NavLink
              key={item.key}
              to={item.path}
              className={({ isActive }) => `fam-menu-item${isActive ? " active" : ""}`}
              title={collapsed ? item.label : ""}
            >
              <span className="fam-menu-icon"><FamNavIcon navKey={item.key} /></span>
              <span className="fam-menu-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="fam-sidebar-footer">
          <div className="fam-user" title={collapsed ? (currentUser?.name || "") : ""}>
            <div className="fam-user-avatar">
              {getInitials(currentUser?.name) || "—"}
            </div>
            <div className="fam-user-info">
              <div className="fam-user-name">{currentUser?.name || "Loading..."}</div>
              <div className="fam-user-email">{currentUser?.email || auth.currentUser?.email || ""}</div>
            </div>
            <button className="fam-signout-btn" onClick={onSignOut} title="Sign Out">
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
      <main className="fam-content">
        <Routes>
          <Route index element={<Navigate to="burial" replace />} />
          <Route path="burial"        element={<BurialRecords />} />
          <Route path="payments"      element={<MyPayments />} />
          <Route path="grave"         element={<GraveLocation />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="account"       element={<MyAccount />} />
          <Route path="*"             element={<FallbackRoute to="burial" />} />
        </Routes>
      </main>
    </div>
  );
}

export default FamilyNavigation;