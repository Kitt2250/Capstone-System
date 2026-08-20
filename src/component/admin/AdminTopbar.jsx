import { useState, useEffect, useRef } from "react";
import "./dashboarda.css";

const SYSTEM_ALERTS_INIT = [
  {
    id: 1,
    title: "Payment Due Alert",
    body: "Elena Reyes installment OR-2026-0881 (₱3,250) is due on 2026-09-05.",
    time: "5:00:00 PM",
    read: false,
  },
  {
    id: 2,
    title: "New Registration Pending",
    body: "Roberto Cruz (Staff Applicant) requires Admin Approval.",
    time: "7:45:00 PM",
    read: false,
  },
  {
    id: 3,
    title: "Contract Expiration Checker",
    body: "12 maintenance contracts will expire in 30 days.",
    time: "4:00:00 PM",
    read: false,
  },
];

function NotificationDropdown({ alerts, onMarkRead, onMarkAllRead, onClose }) {
  const unreadCount = alerts.filter(a => !a.read).length;

  return (
    <div className="da-notif-dropdown">
      <div className="da-notif-dropdown-header">
        <span className="da-notif-dropdown-title">System Alerts ({alerts.length})</span>
        <span className="da-notif-dropdown-unread">{unreadCount} unread</span>
      </div>

      <div className="da-notif-dropdown-list">
        {alerts.map(alert => (
          <div
            key={alert.id}
            className={`da-notif-dropdown-item${alert.read ? " read" : ""}`}
            onClick={() => onMarkRead(alert.id)}
          >
            {!alert.read && <span className="da-notif-unread-dot" />}
            <div className="da-notif-dropdown-item-content">
              <div className="da-notif-dropdown-item-title">{alert.title}</div>
              <div className="da-notif-dropdown-item-body">{alert.body}</div>
              <div className="da-notif-dropdown-item-time">{alert.time}</div>
            </div>
          </div>
        ))}
      </div>

      {unreadCount > 0 && (
        <div className="da-notif-dropdown-footer">
          <button className="da-notif-mark-all-btn" onClick={onMarkAllRead}>
            <i className="fas fa-check-double"></i> Mark all as read
          </button>
        </div>
      )}
    </div>
  );
}

function AdminTopbar({ title, greeting }) {
  const [bellOpen, setBellOpen] = useState(false);
  const [systemAlerts, setSystemAlerts] = useState(() => {
    const saved = sessionStorage.getItem('adminAlerts');
    if (saved) return JSON.parse(saved);
    return SYSTEM_ALERTS_INIT;
  });
  const bellRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setBellOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    sessionStorage.setItem('adminAlerts', JSON.stringify(systemAlerts));
  }, [systemAlerts]);

  const handleMarkAlertRead = (id) => {
    setSystemAlerts(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
  };

  const handleMarkAllAlertsRead = () => {
    setSystemAlerts(prev => prev.map(a => ({ ...a, read: true })));
  };

  const unreadAlerts = systemAlerts.filter(a => !a.read).length;
  const now = new Date();
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const monthYear = `${months[now.getMonth()]} ${now.getFullYear()}`;

  return (
    <div className="da-topbar">
      <div className="da-topbar-left">
        <h1 className="da-title">{title} <span className="da-title-star">✦</span></h1>
        <p className="da-greeting">{greeting}</p>
      </div>
      <div className="da-topbar-right">
        <div className="da-date-badge">
          <i className="fas fa-calendar-alt"></i> {monthYear}
        </div>
        <div className="da-bell-wrapper" ref={bellRef}>
          <button
            className="da-bell-btn"
            onClick={() => setBellOpen(o => !o)}
            title="Notifications"
          >
            <i className="fas fa-bell"></i>
            {unreadAlerts > 0 && <span className="da-bell-dot" />}
          </button>

          {bellOpen && (
            <NotificationDropdown
              alerts={systemAlerts}
              onMarkRead={handleMarkAlertRead}
              onMarkAllRead={handleMarkAllAlertsRead}
              onClose={() => setBellOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminTopbar;
