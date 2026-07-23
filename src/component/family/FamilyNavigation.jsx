import { useState, useEffect } from "react";
import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import "./family-navigation.css";
import FamilyMemorialPage from "./FamilyMemorialPage";
import BurialRecords from "./BurialRecords";
import MyPayments from "./MyPayments";
import GraveLocation from "./GraveLocation";
import Notifications from "./Notifications";
import MyAccount from "./MyAccount";

const NAV_LINKS = [
  { key: "memorial",      label: "Memorial Page",  path: "/family/memorial" },
  { key: "burial",        label: "Burial Records", path: "/family/burial" },
  { key: "payments",      label: "My Payments",    path: "/family/payments" },
  { key: "grave",         label: "Grave Location", path: "/family/grave" },
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

function NavIcon({ navKey }) {
  if (navKey === "memorial") return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
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
  if (navKey === "payments") return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
  if (navKey === "grave") return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
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

function FamilyNavigation({ onSignOut }) {
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
    <div className="fn-wrapper">
      <aside className="fn-sidebar">
        <div className="fn-brand">
          <div className="fn-brand-logo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
              fill="none" stroke="white" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
              <circle cx="12" cy="8" r="3" />
              <path d="M6 20v-2a6 6 0 0 1 12 0v2" />
            </svg>
          </div>
          <div>
            <div className="fn-brand-name">Cherubim of Heaven</div>
            <div className="fn-brand-sub">Family Panel</div>
          </div>
        </div>

        <nav className="fn-nav">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.key}
              to={link.path}
              className={({ isActive }) => `fn-nav-btn ${isActive ? "fn-nav-btn--active" : ""}`}
            >
              <NavIcon navKey={link.key} />
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* FOOTER — user info on top row, Sign Out as its own row below */}
        <div className="fn-footer">
          <div className="fn-user-row">
            <div className="fn-avatar">
              {getInitials(currentUser?.name) || "—"}
            </div>
            <div className="fn-user-info">
              <div className="fn-user-name">
                {currentUser?.name || "Loading..."}
              </div>
              <div className="fn-user-email">
                {currentUser?.email || auth.currentUser?.email || ""}
              </div>
            </div>
          </div>
          <button className="fn-signout-btn" onClick={onSignOut}>
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

      <main className="fn-content">
        <Routes>
          <Route index element={<Navigate to="memorial" replace />} />
          <Route path="memorial" element={<FamilyMemorialPage embedded />} />
          <Route path="burial" element={<BurialRecords />} />
          <Route path="payments" element={<MyPayments />} />
          <Route path="grave" element={<GraveLocation />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="account" element={<MyAccount />} />
          <Route path="*" element={<Navigate to="memorial" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default FamilyNavigation;