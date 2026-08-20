import { useState, useEffect } from "react";
import { NavLink, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import "./dashboards.css";
import DashboardS from "./DashboardS";
import SBurialRecords from "./SBurialRecords";
import GraveInventory from "./GraveInventory";
import InstallmentPayments from "./InstallmentPayments";
import WakeScheduling from "./WakeScheduling";
import Reports from "./Reports";
import MyAccount from "./MyAccount";
import SNotifications from "./Notifications";
import POSTransactions from "./POSTransactions";

function FallbackRoute({ to }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (window.history.length > 2) navigate(-1);
    else navigate(to, { replace: true });
  }, [navigate, to]);
  return null;
}

function getInitials(name) {
  return (name || "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function PagePlaceholder({ title }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', padding: '40px', textAlign: 'center' }}>
      <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
        <i className="fas fa-hammer" style={{ fontSize: '2rem', color: '#d1d5db' }}></i>
      </div>
      <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111827' }}>{title}</h2>
      <p style={{ fontSize: '13px', color: '#9ca3af' }}>This section is under construction.</p>
    </div>
  );
}

function StaffNavigation({ onSignOut }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

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

    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState === 'true') {
      setIsCollapsed(true);
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', newState);
  };

  return (
    <div className={isCollapsed ? 'staff-body-collapsed' : ''} style={{ background: '#e8edf4', minHeight: '100vh', display: 'flex', width: '100%' }}>
      {/* ===== SIDEBAR ===== */}
      <aside className={`ds-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="ds-sidebar-brand">
          <div className="ds-brand-content">
            <div className="ds-icon-ornament">
              <i className="fas fa-dove"></i>
            </div>
            <div className="ds-brand-text">
              <h2>Cherubim of Heaven</h2>
              <div className="ds-sub">Memorial Park</div>
            </div>
          </div>
          <button className="ds-toggle-btn" onClick={toggleSidebar}>
            <i className={`fas fa-chevron-${isCollapsed ? 'right' : 'left'}`}></i>
          </button>
        </div>

        <nav className="ds-sidebar-nav">
          <div className="ds-nav-label">Main</div>
          <NavLink to="/staff/dashboard" className={({ isActive }) => isActive ? "active" : ""}>
            <i className="fas fa-th-large"></i> <span>Dashboard</span>
          </NavLink>
          <NavLink to="/staff/burial" className={({ isActive }) => isActive ? "active" : ""}>
            <i className="fas fa-cross"></i> <span>Burial Records</span>
          </NavLink>
          <NavLink to="/staff/inventory" className={({ isActive }) => isActive ? "active" : ""}>
            <i className="fas fa-map-marked-alt"></i> <span>Map Availability</span>
          </NavLink>
          <NavLink to="/staff/installment" className={({ isActive }) => isActive ? "active" : ""}>
            <i className="fas fa-coins"></i> <span>Payments</span>
          </NavLink>
          
          <div className="ds-nav-label" style={{ marginTop: '1.2rem' }}>Management</div>
          <NavLink to="/staff/wake" className={({ isActive }) => isActive ? "active" : ""}>
            <i className="fas fa-calendar-check"></i> <span>Reservations</span>
          </NavLink>
          <NavLink to="/staff/pos" className={({ isActive }) => isActive ? "active" : ""}>
            <i className="fas fa-receipt"></i> <span>POS Transact</span>
          </NavLink>
          <NavLink to="/staff/reports" className={({ isActive }) => isActive ? "active" : ""}>
            <i className="fas fa-file-alt"></i> <span>Reports</span>
          </NavLink>
          <NavLink to="/staff/account" className={({ isActive }) => isActive ? "active" : ""}>
            <i className="fas fa-user-circle"></i> <span>My Account</span>
          </NavLink>
        </nav>

        <div className="ds-sidebar-footer">
          <div className="ds-user-card">
            <div className="ds-avatar">{getInitials(currentUser?.name) || 'S'}</div>
            <div className="ds-info">
              <div className="ds-name">{currentUser?.name || "Loading..."}</div>
              <div className="ds-email">{currentUser?.email || auth.currentUser?.email || ""}</div>
            </div>
            <button 
              onClick={onSignOut} 
              className="ds-badge" 
              style={{ background: '#c0392b', border: 'none', cursor: 'pointer', color: 'white' }}
              title="Sign Out"
            >
              Exit
            </button>
          </div>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="ds-main-content">
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
          <Route path="*"             element={<FallbackRoute to="dashboard" />} />
        </Routes>
      </main>
    </div>
  );
}

export default StaffNavigation;