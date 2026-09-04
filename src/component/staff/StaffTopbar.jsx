import { useState, useEffect, useRef } from "react";
import "./dashboards.css";

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
    title: "Wake space Chapel B reserved",
    body: "Reservation confirmed for tomorrow 09:00 AM.",
    time: "7:45:00 PM",
    read: false,
  },
  {
    id: 3,
    title: "Contract Expiration",
    body: "3 contracts expiring this week.",
    time: "4:00:00 PM",
    read: false,
  },
];

function NotificationDropdown({ alerts, onMarkRead, onMarkAllRead, onClose }) {
  const unreadCount = alerts.filter(a => !a.read).length;

  return (
    <div className="ds-notif-dropdown">
      <div className="ds-notif-dropdown-header">
        <span className="ds-notif-dropdown-title">System Alerts ({alerts.length})</span>
        <span className="ds-notif-dropdown-unread">{unreadCount} unread</span>
      </div>

      <div className="ds-notif-dropdown-list">
        {alerts.map(alert => (
          <div
            key={alert.id}
            className={`ds-notif-dropdown-item${alert.read ? " read" : ""}`}
            onClick={() => onMarkRead(alert.id)}
          >
            {!alert.read && <span className="ds-notif-unread-dot" />}
            <div className="ds-notif-dropdown-item-content">
              <div className="ds-notif-dropdown-item-title">{alert.title}</div>
              <div className="ds-notif-dropdown-item-body">{alert.body}</div>
              <div className="ds-notif-dropdown-item-time">{alert.time}</div>
            </div>
          </div>
        ))}
      </div>

      {unreadCount > 0 && (
        <div className="ds-notif-dropdown-footer">
          <button className="ds-notif-mark-all-btn" onClick={onMarkAllRead}>
            <i className="fas fa-check-double"></i> Mark all as read
          </button>
        </div>
      )}
    </div>
  );
}

function StaffTopbar({ title, greeting }) {
  const [bellOpen, setBellOpen] = useState(false);
  const [systemAlerts, setSystemAlerts] = useState(() => {
    const saved = sessionStorage.getItem('staffAlerts');
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
    sessionStorage.setItem('staffAlerts', JSON.stringify(systemAlerts));
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
    <div className="ds-topbar">
      <div className="ds-topbar-left">
        <h1 className="ds-title">{title} <span className="ds-title-star">&#10022;</span></h1>
        <p className="ds-greeting">{greeting}</p>
      </div>
      <div className="ds-topbar-right">
        <div className="ds-date-badge">
          <i className="fas fa-calendar-alt"></i> {monthYear}
        </div>
        <div className="ds-bell-wrapper" ref={bellRef}>
          <button
            className="ds-bell-btn"
            onClick={() => setBellOpen(o => !o)}
            title="Notifications"
          >
            <i className="fas fa-bell"></i>
            {unreadAlerts > 0 && <span className="ds-bell-dot" />}
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

export default StaffTopbar;
