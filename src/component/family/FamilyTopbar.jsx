import { useState, useEffect, useRef } from "react";
import { collection, query, where, onSnapshot, doc, writeBatch, getDocs, addDoc } from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import "./family-topbar.css";

// ── Fallback/Seed Data for Notifications ──
const INITIAL_NOTIFICATIONS = [
  {
    type: "welcome",
    title: "Welcome to Cherubim of Heaven",
    message: "Thank you for creating your account. You can now view burial records and payment history online.",
    time: "Just now",
    read: false,
    createdAt: Date.now()
  },
  {
    type: "payment_reminder",
    title: "Payment Reminder",
    message: "Your monthly installment of ₱5,000 for Lot A-142 is due on April 1, 2026.",
    time: "2 days ago",
    read: false,
    createdAt: Date.now() - 172800000
  }
];

function FamilyTopbar({ title, greeting }) {
  const [bellOpen, setBellOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const bellRef = useRef(null);

  // Close bell dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setBellOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch Notifications from Firestore
  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const q = query(collection(db, "family_notifications"), where("userId", "==", uid));

    const unsubscribe = onSnapshot(q, async (snap) => {
      // Auto-seeding logic
      if (snap.empty) {
        try {
          const batch = writeBatch(db);
          INITIAL_NOTIFICATIONS.forEach((n) => {
            const docRef = doc(collection(db, "family_notifications"));
            batch.set(docRef, { ...n, userId: uid });
          });
          await batch.commit();
        } catch (err) {
          console.error("Failed to seed notifications:", err);
        }
      } else {
        const notifs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Sort by createdAt descending
        notifs.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        setNotifications(notifs);
      }
    });

    return () => unsubscribe();
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkRead = async (id) => {
    try {
      const batch = writeBatch(db);
      const docRef = doc(db, "family_notifications", id);
      batch.update(docRef, { read: true });
      await batch.commit();
    } catch (err) {
      console.error("Failed to mark as read", err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      const batch = writeBatch(db);
      const unread = notifications.filter(n => !n.read);
      unread.forEach(n => {
        const docRef = doc(db, "family_notifications", n.id);
        batch.update(docRef, { read: true });
      });
      await batch.commit();
    } catch (err) {
      console.error("Failed to mark all as read", err);
    }
  };

  // Date Logic
  const now = new Date();
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const monthYear = `${months[now.getMonth()]} ${now.getFullYear()}`;

  return (
    <div className="fam-topbar">
      <div className="fam-topbar-left">
        <h1>{title} <span style={{ color: "#d4af37" }}>✦</span></h1>
        <div className="fam-greeting">{greeting}</div>
      </div>
      <div className="fam-topbar-right">
        
        <div className="fam-date-badge">
          <i className="fas fa-calendar-alt" style={{ marginRight: "6px", color: "#3670AF" }}></i> {monthYear}
        </div>

        <div className="fam-bell-wrapper" ref={bellRef}>
          <button
            className="fam-notification-btn"
            onClick={() => setBellOpen(o => !o)}
            title="Notifications"
          >
            <i className="fas fa-bell"></i>
            {unreadCount > 0 && <span className="dot"></span>}
          </button>

          {bellOpen && (
            <div className="fam-notif-dropdown">
              <div className="fam-notif-dropdown-header">
                <span className="fam-notif-dropdown-title">System Alerts ({notifications.length})</span>
                <span className="fam-notif-dropdown-unread">{unreadCount} unread</span>
              </div>

              <div className="fam-notif-dropdown-list">
                {notifications.length === 0 ? (
                  <div className="fam-notif-empty">No notifications</div>
                ) : (
                  notifications.slice(0, 5).map(alert => (
                    <div
                      key={alert.id}
                      className={`fam-notif-dropdown-item${alert.read ? " read" : ""}`}
                      onClick={() => handleMarkRead(alert.id)}
                    >
                      {!alert.read && <span className="fam-notif-unread-dot" />}
                      <div className="fam-notif-dropdown-item-content">
                        <div className="fam-notif-dropdown-item-title">{alert.title}</div>
                        <div className="fam-notif-dropdown-item-body">{alert.message}</div>
                        <div className="fam-notif-dropdown-item-time">{alert.time}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {unreadCount > 0 && (
                <div className="fam-notif-dropdown-footer">
                  <button className="fam-notif-mark-all-btn" onClick={handleMarkAllRead}>
                    <i className="fas fa-check-double"></i> Mark all as read
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FamilyTopbar;
