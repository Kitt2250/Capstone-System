import { useState } from "react";
import "./notifications.css";

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: "tribute_approved",
    title: "Tribute Approved",
    message: "Your tribute for Alejandro Reyes Sr. has been approved and is now visible on the memorial page.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "payment_reminder",
    title: "Payment Reminder",
    message: "Your monthly installment of ₱5,000 for Lot A-142 is due on April 1, 2026.",
    time: "1 day ago",
    read: false,
  },
  {
    id: 3,
    type: "lease_expiration",
    title: "Lease Expiration Notice",
    message: "The lease for Lot A-142 (Alejandro Reyes Sr.) will expire on November 23, 2030. Please contact our office for renewal options.",
    time: "3 days ago",
    read: true,
  },
  {
    id: 4,
    type: "tribute_pending",
    title: "Tribute Pending Review",
    message: "Your photo tribute submitted on March 15, 2026 is currently pending admin review.",
    time: "5 days ago",
    read: true,
  },
  {
    id: 5,
    type: "welcome",
    title: "Welcome to Cherubim of Heaven",
    message: "Thank you for creating your account. You can now view burial records, memorial pages, and payment history online.",
    time: "1 week ago",
    read: true,
  },
];

function NotifIcon({ type }) {
  if (type === "tribute_approved" || type === "tribute_pending") return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
  if (type === "payment_reminder") return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
  if (type === "lease_expiration") return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function iconColor(type) {
  if (type === "tribute_approved")  return "notif-icon--green";
  if (type === "payment_reminder")  return "notif-icon--blue";
  if (type === "lease_expiration")  return "notif-icon--orange";
  if (type === "tribute_pending")   return "notif-icon--gray";
  return "notif-icon--gray";
}

function Notifications() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="notif-main">
      <div className="notif-topbar">
        <span>Cherubim of Heaven Memorial Park</span>
      </div>

      <div className="notif-header">
        <div>
          <h1 className="notif-title">Notifications</h1>
          {unreadCount > 0 ? (
            <p className="notif-subtitle">{unreadCount} unread</p>
          ) : (
            <p className="notif-subtitle">All caught up</p>
          )}
        </div>
        {unreadCount > 0 && (
          <button className="notif-mark-all" onClick={markAllRead}>
            Mark all as read
          </button>
        )}
      </div>

      <div className="notif-list">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`notif-item ${!n.read ? "notif-item--unread" : ""}`}
            onClick={() => markRead(n.id)}
          >
            <div className={`notif-icon-wrap ${iconColor(n.type)}`}>
              <NotifIcon type={n.type} />
            </div>
            <div className="notif-body">
              <div className="notif-row">
                <span className="notif-item-title">{n.title}</span>
                {!n.read && <span className="notif-dot" />}
              </div>
              <p className="notif-message">{n.message}</p>
              <span className="notif-time">{n.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;