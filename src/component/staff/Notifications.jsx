import { useState } from "react";
import "./notifications.css";

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    category: "expiry",
    title: "Contract Expiring Soon",
    message: "Lot A-142 (Alejandro Reyes Sr.) lease expires on April 15, 2026. Contact family for renewal.",
    time: "10 mins ago",
    read: false,
  },
  {
    id: 2,
    category: "payments",
    title: "Overdue Payment",
    message: "Carlos Tan - Lot D-012 installment payment overdue since March 1, 2026. Amount: ₱3,000.",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    category: "reservations",
    title: "Wake Reservation Tomorrow",
    message: "Chapel A reserved for Ana Reyes family starting March 18, 2026. Prepare venue.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 4,
    category: "system",
    title: "System Backup Completed",
    message: "Daily automated backup completed successfully at 08:00 AM.",
    time: "5 hours ago",
    read: true,
  },
  {
    id: 5,
    category: "expiry",
    title: "Contract Expiring Soon",
    message: "Lot B-045 (Carmen Dela Cruz) lease expires on May 21, 2026. Contact family for renewal.",
    time: "6 hours ago",
    read: true,
  },
  {
    id: 6,
    category: "payments",
    title: "Overdue Payment",
    message: "Pedro Garcia - Lot A-150 installment payment overdue since March 15, 2026. Amount: ₱5,000.",
    time: "Yesterday",
    read: true,
  },
  {
    id: 7,
    category: "system",
    title: "New Tribute Submitted",
    message: "Ana Reyes submitted a tribute for memorial page of Alejandro Reyes Sr. Pending admin approval.",
    time: "Yesterday",
    read: true,
  },
  {
    id: 8,
    category: "expiry",
    title: "Multiple Contracts Expiring",
    message: "23 burial contracts expiring within the next 30 days. Review required.",
    time: "2 days ago",
    read: true,
  },
];

const TABS = [
  { key: "all",          label: "All" },
  { key: "expiry",       label: "Expiry Alerts" },
  { key: "payments",     label: "Payments" },
  { key: "reservations", label: "Reservations" },
  { key: "system",       label: "System" },
];

function NotifIcon({ category }) {
  if (category === "expiry") return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
  if (category === "payments") return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
  if (category === "reservations") return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function iconColor(category) {
  if (category === "expiry")       return "snf-icon--orange";
  if (category === "payments")     return "snf-icon--red";
  if (category === "reservations") return "snf-icon--blue";
  return "snf-icon--gray";
}

function SNotifications() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filtered = notifications.filter((n) =>
    activeTab === "all" ? true : n.category === activeTab
  );

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="snf-page">
      <div className="snf-topbar">
        <span>Cherubim of Heaven Memorial Park</span>
      </div>

      <div className="snf-header">
        <div>
          <h1>Notifications</h1>
          <p>{unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up"}</p>
        </div>
        {unreadCount > 0 && (
          <button className="snf-mark-all" onClick={markAllRead}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Mark all as read
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="snf-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`snf-tab ${activeTab === tab.key ? "snf-tab--active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="snf-list">
        {filtered.map((n) => (
          <div
            key={n.id}
            className={`snf-item ${!n.read ? "snf-item--unread" : ""}`}
            onClick={() => markRead(n.id)}
          >
            <div className={`snf-icon-wrap ${iconColor(n.category)}`}>
              <NotifIcon category={n.category} />
            </div>
            <div className="snf-body">
              <div className="snf-row">
                <span className="snf-item-title">{n.title}</span>
                {!n.read && <span className="snf-dot" />}
              </div>
              <p className="snf-message">{n.message}</p>
              <span className="snf-time">{n.time}</span>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="snf-empty">No notifications in this category.</div>
        )}
      </div>
    </div>
  );
}

export default SNotifications;