import { useState, useEffect } from "react";
import "./dashboards.css";

const SCHEDULE_DATA = [
  { time: '09:00 AM', event: 'Burial - Section A, Block 3, Lot 15', type: 'burial' },
  { time: '10:30 AM', event: 'Installment payment - Single Niche Lot B-042', type: 'payment' },
  { time: '01:00 PM', event: 'Burial - Section B, Block 1, Lot 8', type: 'burial' },
  { time: '02:30 PM', event: 'Wake setup - Chapel A (Columbarium)', type: 'wake' },
  { time: '03:00 PM', event: 'New lot registration - Apartment Type', type: 'registration' },
  { time: '04:00 PM', event: 'Burial - Section A, Block 5, Lot 22', type: 'burial' },
];

const TRANSACTIONS = [
  { name: 'Rosa Mendoza', or: 'OR-2026-0342', desc: 'Installation - Single Niche', icon: 'gold' },
  { name: 'Pedro Garcia', or: 'OR-2026-0341', desc: 'Full Payment - Columbarium', icon: 'blue' },
  { name: 'Elena Santos', or: 'OR-2026-0340', desc: 'Installment - Bonevault', icon: 'green' },
];

const PAYMENTS = [
  { name: 'Rosa Mendoza', amount: '₱6,250', or: 'OR-2026-0342', desc: 'Single Niche - Monthly', time: '2 hours ago', avatar: 'RM', color: 'gold', installment: '6 of 12 payments' },
  { name: 'Pedro Garcia', amount: '₱3,167', or: 'OR-2026-0341', desc: 'Columbarium - Monthly', time: '4 hours ago', avatar: 'PG', color: 'blue', installment: '3 of 12 payments' },
  { name: 'Elena Santos', amount: '₱2,500', or: 'OR-2026-0340', desc: 'Bonevault - Monthly', time: 'Yesterday', avatar: 'ES', color: 'green', installment: '4 of 12 payments' },
];

function DashboardS() {
  const [filter, setFilter] = useState('all');

  const filteredSchedule = SCHEDULE_DATA.filter(item => filter === 'all' || item.type === filter);

  return (
    <div className="ds-page">
      {/* TOP BAR */}
      <div className="ds-topbar">
        <div className="ds-topbar-left">
          <h1>Operational Overview <span>✦</span></h1>
          <div className="ds-greeting">Welcome back, <strong>Staff</strong> • Here's your daily overview</div>
        </div>
        <div className="ds-topbar-right">
          <div className="ds-date-badge">
            <i className="fas fa-calendar-alt"></i> August 2026
          </div>
          <button className="ds-notification-btn" title="Notifications">
            <i className="fas fa-bell"></i>
            <span className="ds-dot"></span>
          </button>
        </div>
      </div>

      {/* ===== STATS CARDS ===== */}
      <div className="ds-stats-grid">
        <div className="ds-stat-card">
          <div className="ds-stat-icon ds-gold"><i className="fas fa-cross"></i></div>
          <div className="ds-stat-label">Burials Today</div>
          <div className="ds-stat-value">3</div>
          <div className="ds-stat-change"><span>↑ 2</span> vs yesterday</div>
        </div>
        <div className="ds-stat-card">
          <div className="ds-stat-icon ds-blue"><i className="fas fa-tshirt"></i></div>
          <div className="ds-stat-label">Available Slots</div>
          <div className="ds-stat-value">223</div>
          <div className="ds-stat-change"><span className="ds-down">↓ 8</span> this week</div>
        </div>
        <div className="ds-stat-card">
          <div className="ds-stat-icon ds-orange"><i className="fas fa-clock"></i></div>
          <div className="ds-stat-label">Pending Installments</div>
          <div className="ds-stat-value">12</div>
          <div className="ds-stat-change"><span>↑ 3</span> vs last week</div>
        </div>
        <div className="ds-stat-card">
          <div className="ds-stat-icon ds-green"><i className="fas fa-bed"></i></div>
          <div className="ds-stat-label">Wake Reservations</div>
          <div className="ds-stat-value">2</div>
          <div className="ds-stat-change"><span>+1</span> today</div>
        </div>
      </div>

      {/* ===== ALERT BANNER ===== */}
      <div className="ds-alert-banner">
        <div className="ds-alert-item">
          <i className="fas fa-exclamation-triangle ds-red"></i>
          <span><strong>5</strong> installment payments overdue</span>
          <span className="ds-badge">Urgent</span>
        </div>
        <div className="ds-alert-item">
          <i className="fas fa-clock ds-blue"></i>
          <span>Wake space Chapel B reserved for <strong>tomorrow</strong></span>
          <span className="ds-badge ds-info">Reminder</span>
        </div>
        <div className="ds-alert-item">
          <i className="fas fa-calendar-times ds-orange"></i>
          <span><strong>3</strong> contracts expiring this week</span>
          <span className="ds-badge ds-warning">Warning</span>
        </div>
      </div>

      {/* ===== DASHBOARD GRID ===== */}
      <div className="ds-dashboard-grid">

        {/* LEFT: Schedule with Filters */}
        <div className="ds-schedule-section">
          <div className="ds-section-header">
            <h3><i className="fas fa-clock"></i> Today's Schedule</h3>
            <span className="ds-view-all">View all →</span>
          </div>

          {/* Filter Tabs */}
          <div className="ds-schedule-filters">
            <button className={`ds-filter-btn ${filter === 'all' ? 'ds-active' : ''}`} onClick={() => setFilter('all')}>
              <i className="fas fa-list"></i> All
              <span className="ds-count">{SCHEDULE_DATA.length}</span>
            </button>
            <button className={`ds-filter-btn ${filter === 'burial' ? 'ds-active' : ''}`} onClick={() => setFilter('burial')}>
              <i className="fas fa-cross"></i> Burials
              <span className="ds-count">{SCHEDULE_DATA.filter(i => i.type === 'burial').length}</span>
            </button>
            <button className={`ds-filter-btn ${filter === 'payment' ? 'ds-active' : ''}`} onClick={() => setFilter('payment')}>
              <i className="fas fa-coins"></i> Payments
              <span className="ds-count">{SCHEDULE_DATA.filter(i => i.type === 'payment').length}</span>
            </button>
            <button className={`ds-filter-btn ${filter === 'wake' ? 'ds-active' : ''}`} onClick={() => setFilter('wake')}>
              <i className="fas fa-bed"></i> Wake
              <span className="ds-count">{SCHEDULE_DATA.filter(i => i.type === 'wake').length}</span>
            </button>
            <button className={`ds-filter-btn ${filter === 'registration' ? 'ds-active' : ''}`} onClick={() => setFilter('registration')}>
              <i className="fas fa-file-signature"></i> Registrations
              <span className="ds-count">{SCHEDULE_DATA.filter(i => i.type === 'registration').length}</span>
            </button>
          </div>

          <div className="ds-schedule-list">
            {filteredSchedule.length > 0 ? filteredSchedule.map((item, idx) => (
              <div key={idx} className={`ds-schedule-item ds-${item.type}`}>
                <div className="ds-time">{item.time}</div>
                <div className="ds-event">
                  {item.event}
                  <span className="ds-location">
                    {item.type === 'burial' ? 'Burial Service' : item.type === 'payment' ? 'Payment Processing' : item.type === 'wake' ? 'Wake Service' : 'Lot Registration'}
                  </span>
                </div>
                <span className={`ds-type-badge ds-${item.type}`}>{item.type}</span>
              </div>
            )) : (
              <div className="ds-no-results">
                <i className="fas fa-search"></i>
                No items found for today
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Recent Transactions + Payments */}
        <div className="ds-right-panel">

          {/* Recent Transactions */}
          <div className="ds-transactions-section">
            <div className="ds-section-header">
              <h3><i className="fas fa-receipt"></i> Recent Transactions</h3>
              <span className="ds-view-all">View all →</span>
            </div>
            <div className="ds-transaction-list">
              {TRANSACTIONS.map((tx, idx) => (
                <div key={idx} className="ds-transaction-item">
                  <div className={`ds-tx-icon ds-${tx.icon}`}>
                    <i className={`fas fa-${tx.icon === 'gold' ? 'star' : tx.icon === 'blue' ? 'user' : 'check'}`}></i>
                  </div>
                  <div className="ds-tx-info">
                    <div className="ds-name">{tx.name}</div>
                    <div className="ds-desc">{tx.or} - {tx.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payments Overview */}
          <div className="ds-payments-section">
            <div className="ds-section-header">
              <h3><i className="fas fa-coins"></i> Installment Payments</h3>
              <span className="ds-view-all">View all →</span>
            </div>
            <div>
              {PAYMENTS.map((pay, idx) => (
                <div key={idx} className="ds-payment-item">
                  <div className={`ds-pay-avatar ds-${pay.color}`}>{pay.avatar}</div>
                  <div className="ds-pay-info">
                    <div className="ds-name">{pay.name}</div>
                    <div className="ds-desc">{pay.or} - {pay.desc}</div>
                    <div className="ds-installment">{pay.installment}</div>
                  </div>
                  <div className="ds-pay-amount">{pay.amount}</div>
                  <div className="ds-pay-time">{pay.time}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      
      {/* FOOTER */}
      <div style={{marginTop: '1rem', textAlign: 'center', fontSize: '0.7rem', color: '#8aaccc', borderTop: '1px solid rgba(212,175,55,0.08)', paddingTop: '1.5rem'}}>
          <i className="fas fa-dove" style={{color: '#d4af37', margin: '0 4px'}}></i>
          Cherubim of Heaven Memorial Park · Staff Dashboard v2.0
          <i className="fas fa-dove" style={{color: '#d4af37', margin: '0 4px'}}></i>
      </div>
    </div>
  );
}

export default DashboardS;