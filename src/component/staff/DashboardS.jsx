import "./dashboards.css";

const STATS = [
  { label: "Burials Today",       value: "3" },
  { label: "Available Lots",      value: "240" },
  { label: "Pending Payments",    value: "12" },
  { label: "Wake Reservations",   value: "2" },
];

const ALERTS = [
  { text: "5 installment payments overdue",        level: "warning" },
  { text: "Wake space Chapel B reserved for tomorrow", level: "info" },
  { text: "3 contracts expiring this week",         level: "warning" },
];

const SCHEDULE = [
  { time: "09:00 AM", title: "Burial - Section A, Block 3, Lot 15",        tag: "burial" },
  { time: "10:30 AM", title: "Payment processing - Lot B-042 installment", tag: "payment" },
  { time: "11:00 AM", title: "Family visit - Locate Grave C-128",          tag: "visit" },
  { time: "01:00 PM", title: "Burial - Section B, Block 1, Lot 8",         tag: "burial" },
  { time: "02:30 PM", title: "Wake setup - Chapel A",                     tag: "wake" },
  { time: "03:00 PM", title: "New lot registration - Ground burial",      tag: "registration" },
  { time: "04:00 PM", title: "Burial - Section A, Block 5, Lot 22",       tag: "burial" },
];

const TRANSACTIONS = [
  { name: "Rosa Mendoza",  ref: "OR-2026-0342 - Installment", amount: 15000, time: "2 hours ago" },
  { name: "Pedro Garcia",  ref: "OR-2026-0341 - Full Payment", amount: 85000, time: "4 hours ago" },
  { name: "Elena Santos",  ref: "OR-2026-0340 - Installment", amount: 10000, time: "Yesterday" },
];

const peso = (n) => "₱" + n.toLocaleString("en-PH");

function StatIcon({ index }) {
  if (index === 0) return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
  if (index === 1) return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
  if (index === 2) return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function DashboardS() {
  return (
    <div className="ds-page">
      <div className="ds-topbar">
        <span>Cherubim of Heaven Memorial Park</span>
      </div>

      <div className="ds-header">
        <h1>Operational Overview</h1>
        <p>Welcome back, Staff</p>
      </div>

      {/* Stats */}
      <div className="ds-stats">
        {STATS.map((stat, i) => (
          <div className="ds-stat-card" key={stat.label}>
            <div className="ds-stat-top">
              <span className="ds-stat-label">{stat.label}</span>
              <StatIcon index={i} />
            </div>
            <p className="ds-stat-value">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Alerts */}
      <div className="ds-alerts">
        {ALERTS.map((alert, i) => (
          <div className="ds-alert-row" key={i}>
            <AlertIcon />
            <span>{alert.text}</span>
          </div>
        ))}
      </div>

      {/* Bottom Grid */}
      <div className="ds-bottom-grid">
        {/* Today's Schedule */}
        <div className="ds-card">
          <h2 className="ds-card-title">Today's Schedule</h2>
          <div className="ds-schedule-list">
            {SCHEDULE.map((item, i) => (
              <div className="ds-schedule-row" key={i}>
                <span className="ds-schedule-time">{item.time}</span>
                <span className="ds-schedule-desc">{item.title}</span>
                <span className={`ds-tag ds-tag--${item.tag}`}>{item.tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="ds-card">
          <h2 className="ds-card-title">Recent Transactions</h2>
          <div className="ds-transaction-list">
            {TRANSACTIONS.map((tx, i) => (
              <div className="ds-transaction-row" key={i}>
                <div>
                  <p className="ds-tx-name">{tx.name}</p>
                  <p className="ds-tx-ref">{tx.ref}</p>
                </div>
                <div className="ds-tx-right">
                  <p className="ds-tx-amount">{peso(tx.amount)}</p>
                  <p className="ds-tx-time">{tx.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardS;