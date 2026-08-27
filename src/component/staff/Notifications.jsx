import React, { useState } from "react";
import "./staff-shared.css";

const INITIAL_NOTIFICATIONS = [
  { id: 1, category: "expiry", title: "Contract Expiring Soon", message: "Lot A-142 (Alejandro Reyes Sr.) lease expires on April 15, 2026.", time: "10 mins ago", read: false },
  { id: 2, category: "payments", title: "Overdue Payment", message: "Carlos Tan - Lot D-012 installment payment overdue since March 1, 2026. Amount: \u20B13,000.", time: "1 hour ago", read: false },
  { id: 3, category: "wake", title: "New Wake Reservation", message: "Chapel A reserved by Ana Reyes for Alejandro Reyes Sr. (March 18-20, 2026).", time: "2 hours ago", read: true },
  { id: 4, category: "system", title: "System Update", message: "The staff dashboard was successfully updated to version 2.0.", time: "1 day ago", read: true },
  { id: 5, category: "expiry", title: "Contract Expired", message: "Lot C-128 (Jose Santos) lease has expired.", time: "2 days ago", read: true }
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState("all");

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const getIconForCategory = (category) => {
    switch (category) {
      case 'expiry': return 'fa-clock';
      case 'payments': return 'fa-coins';
      case 'wake': return 'fa-calendar-check';
      case 'system': return 'fa-cog';
      default: return 'fa-bell';
    }
  };

  const getColorForCategory = (category) => {
    switch (category) {
      case 'expiry': return '#f39c12';
      case 'payments': return '#c0392b';
      case 'wake': return '#3670AF';
      case 'system': return '#7a9fbe';
      default: return '#1a3d5c';
    }
  };

  const filteredNotifications = notifications.filter(n => filter === 'all' || (filter === 'unread' && !n.read));
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="reports-page-wrapper">
        <div className="topbar">
            <div className="topbar-left">
                <h1>Notifications <span>{"\u2726"}</span></h1>
                <div className="greeting">Stay updated with the latest system alerts</div>
            </div>
            <div className="topbar-right">
                <div className="date-badge"><i className="fas fa-calendar-alt"></i> August 2026</div>
                <button className="notification-btn"><i className="fas fa-bell"></i>{unreadCount > 0 && <span className="dot"></span>}</button>
            </div>
        </div>

        <div className="reports-container" style={{maxWidth: '800px', margin: '0 auto'}}>
            <div className="reports-header" style={{borderBottom: '1px solid #e8edf4', paddingBottom: '1rem', marginBottom: '1.5rem'}}>
                <div className="reports-header-left">
                    <h2><i className="fas fa-bell" style={{color: '#d4af37', marginRight: '8px'}}></i> Alert Center</h2>
                </div>
                <div className="reports-header-right">
                    <button className="btn-secondary" onClick={markAllAsRead}><i className="fas fa-check-double"></i> Mark All as Read</button>
                </div>
            </div>

            <div className="report-tabs">
                <button className={`tab-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All Notifications</button>
                <button className={`tab-btn ${filter === 'unread' ? 'active' : ''}`} onClick={() => setFilter('unread')}>Unread ({unreadCount})</button>
            </div>

            <div className="notifications-list" style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                {filteredNotifications.length === 0 ? (
                    <div style={{padding: '3rem', textAlign: 'center', color: '#8aaccc'}}>
                        <i className="fas fa-bell-slash" style={{fontSize: '3rem', marginBottom: '1rem', opacity: 0.5}}></i>
                        <p>No notifications to display.</p>
                    </div>
                ) : (
                    filteredNotifications.map(n => (
                        <div key={n.id} onClick={() => markAsRead(n.id)} style={{
                            background: n.read ? '#f8fafc' : '#fff',
                            border: `1px solid ${n.read ? '#e8edf4' : 'rgba(212, 175, 55, 0.3)'}`,
                            borderLeft: `4px solid ${getColorForCategory(n.category)}`,
                            padding: '1.2rem',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            transition: '0.2s',
                            boxShadow: n.read ? 'none' : '0 4px 12px rgba(0,0,0,0.03)',
                            position: 'relative'
                        }}>
                            {!n.read && <span style={{position:'absolute', top:'1rem', right:'1rem', width:'8px', height:'8px', background:'#c0392b', borderRadius:'50%'}}></span>}
                            <div style={{display: 'flex', gap: '1rem', alignItems: 'flex-start'}}>
                                <div style={{
                                    width: '40px', height: '40px', borderRadius: '50%', background: `${getColorForCategory(n.category)}15`, 
                                    color: getColorForCategory(n.category), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0
                                }}>
                                    <i className={`fas ${getIconForCategory(n.category)}`}></i>
                                </div>
                                <div style={{flex: 1}}>
                                    <h4 style={{margin: '0 0 0.3rem 0', color: '#1a3d5c', fontSize: '1rem'}}>{n.title}</h4>
                                    <p style={{margin: '0 0 0.5rem 0', color: '#6a8aaa', fontSize: '0.85rem', lineHeight: '1.4'}}>{n.message}</p>
                                    <span style={{fontSize: '0.7rem', color: '#8aaccc', fontWeight: 600}}>{n.time}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    </div>
  );
}