import { useState, useEffect } from "react";
import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import "./staff-navigation.css";
import DashboardS from "./DashboardS";
import SBurialRecords from "./SBurialRecords";
import GraveInventory from "./GraveInventory";
import InstallmentPayments from "./InstallmentPayments";
import WakeScheduling from "./WakeScheduling";
import Reports from "./Reports";
import MyAccount from "./MyAccount";
import SNotifications from "./Notifications";
import POSTransactions from "./POSTransactions";

const menuItems = [
  { key: "dashboard",    label: "Dashboard",           path: "/staff/dashboard" },
  { key: "burial",       label: "Burial Records",      path: "/staff/burial" },
  { key: "inventory",    label: "Grave Inventory",     path: "/staff/inventory" },
  { key: "mapping",      label: "Grave Mapping",       path: "/staff/mapping" },
  { key: "pos",          label: "POS Transactions",    path: "/staff/pos" },
  { key: "installment",  label: "Installment Payments",path: "/staff/installment" },
  { key: "wake",         label: "Wake Scheduling",     path: "/staff/wake" },
  { key: "notifications",label: "Notifications",       path: "/staff/notifications" },
  { key: "reports",      label: "Reports",             path: "/staff/reports" },
  { key: "account",      label: "My Account",          path: "/staff/account" },
];

function getInitials(name) {
  return (name || "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function StaffNavIcon({ navKey }) {
  if (navKey === "dashboard") return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  );
  if (navKey === "burial") return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
  if (navKey === "inventory") return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
  if (navKey === "mapping") return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="22" />
    </svg>
  );
  if (navKey === "pos") return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
  if (navKey === "installment") return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
  if (navKey === "wake") return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
  if (navKey === "notifications") return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
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
  if (navKey === "account") return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
  return null;
}

function PagePlaceholder({ title }) {
  return (
    <div className="sn-placeholder">
      <div className="sn-placeholder-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
          stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="48" height="48">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      </div>
      <h2 className="sn-placeholder-title">{title}</h2>
      <p className="sn-placeholder-sub">This section is under construction.</p>
    </div>
  );
}

function StaffNavigation({ onSignOut }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;
      try {
        const userSnap = await getDoc(doc(db, "users", uid));
        if (userSnap.exists()) {
          setCurrentUser(userSnap.data());
        }
      } catch (err) {
        console.error("Failed to load current user:", err);
      }
    };
    fetchCurrentUser();
  }, []);

  return (
    <div className="sn-wrapper">
      {/* SIDEBAR */}
      <aside className="sn-sidebar">
        <div className="sn-brand">
          <div className="sn-brand-logo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
              fill="none" stroke="white" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
              <circle cx="12" cy="8" r="3" />
              <path d="M6 20v-2a6 6 0 0 1 12 0v2" />
            </svg>
          </div>
          <div>
            <div className="sn-brand-name">Cherubim of Heaven</div>
            <div className="sn-brand-sub">Staff Panel</div>
          </div>
        </div>

        <nav className="sn-nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.key}
              to={item.path}
              className={({ isActive }) => `sn-nav-btn ${isActive ? "sn-nav-btn--active" : ""}`}
            >
              <StaffNavIcon navKey={item.key} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* FOOTER */}
        <div className="sn-footer">
          <div className="sn-user-row">
            <div className="sn-avatar">
              {getInitials(currentUser?.name) || "—"}
            </div>
            <div className="sn-user-info">
              <div className="sn-user-name">
                {currentUser?.name || "Loading..."}
              </div>
              <div className="sn-user-email">
                {currentUser?.email || auth.currentUser?.email || ""}
              </div>
            </div>
          </div>
          <button className="sn-signout-btn" onClick={onSignOut}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT — nested routes */}
      <main className="sn-content">
        <Routes>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardS />} />
          <Route path="burial" element={<SBurialRecords />} />
          <Route path="inventory" element={<GraveInventory />} />
          <Route path="mapping" element={<PagePlaceholder title="Grave Mapping" />} />
          <Route path="pos" element={<POSTransactions />} />
          <Route path="installment" element={<InstallmentPayments />} />
          <Route path="wake" element={<WakeScheduling />} />
          <Route path="notifications" element={<SNotifications />} />
          <Route path="reports" element={<Reports />} />
          <Route path="account" element={<MyAccount />} />  
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default StaffNavigation;