import "./dashboarda.css";

const monthlyBurials = [
  { month: "Jan", value: 38 },
  { month: "Feb", value: 30 },
  { month: "Mar", value: 52 },
  { month: "Apr", value: 41 },
  { month: "May", value: 47 },
  { month: "Jun", value: 45 },
];

const graveTypes = [
  { label: "Ground", value: 45, color: "#111827" },
  { label: "Apartment", value: 25, color: "#6b7280" },
  { label: "Mausoleum", value: 20, color: "#9ca3af" },
  { label: "Bone Vault", value: 10, color: "#d1d5db" },
];

const recentActivity = [
  { title: "New burial registered", by: "Juan Dela Cruz", time: "10 mins ago" },
  { title: "Payment received - Lot A-142", by: "System", time: "25 mins ago" },
  { title: "User account created", by: "Maria Santos", time: "1 hour ago" },
  { title: "Wake space reserved", by: "Juan Dela Cruz", time: "2 hours ago" },
  { title: "Contract expiration alert sent", by: "System", time: "3 hours ago" },
];

// ── STAT ICONS (clean SVG line icons, same family as sidebar) ───────────────
function UsersIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function RevenueIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <circle cx="12" cy="12" r="10" />
      <path d="M9 8h5a2 2 0 0 1 0 4H9" />
      <path d="M9 12h4a2 2 0 0 1 0 4H9" />
      <line x1="9" y1="8" x2="9" y2="16" />
      <line x1="6" y1="10" x2="9" y2="10" />
      <line x1="6" y1="14" x2="9" y2="14" />
    </svg>
  );
}

function BurialsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

const stats = [
  { label: "Total Users", value: "248", note: "+12 this month", Icon: UsersIcon },
  { label: "Active Graves", value: "3,847", note: "94% occupied", Icon: MapPinIcon },
  { label: "Monthly Revenue", value: "₱482,500", note: "+8.2% vs last month", Icon: RevenueIcon },
  { label: "Burials This Month", value: "47", note: "-3 vs last month", Icon: BurialsIcon },
];

const alerts = [
  "23 contracts expiring within 30 days",
  "5 tribute submissions pending approval",
  "12 installment payments overdue",
];

function DashboardA() {
  const maxBar = Math.max(...monthlyBurials.map((m) => m.value));

  const total = graveTypes.reduce((sum, g) => sum + g.value, 0);
  let cumulative = 0;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="dashboard-a">
      <div className="dash-topbar">
        <span>Cherubim of Heaven Memorial Park</span>
      </div>
      {/* STAT CARDS */}
      <div className="dash-stats-grid">
        {stats.map((s, i) => (
          <div className="dash-stat-card" key={i}>
            <div className="dash-stat-top">
              <span className="dash-stat-label">{s.label}</span>
              <span className="dash-stat-icon-wrap">
                <s.Icon />
              </span>
            </div>
            <div className="dash-stat-value">{s.value}</div>
            <div className="dash-stat-note">{s.note}</div>
          </div>
        ))}
      </div>

      {/* ALERTS */}
      <div className="dash-alerts">
        {alerts.map((a, i) => (
          <div className="dash-alert-item" key={i}>
            <span className="dash-alert-icon-wrap">
              <WarningIcon />
            </span>
            <span>{a}</span>
          </div>
        ))}
      </div>

      {/* CHARTS ROW */}
      <div className="dash-charts-row">
        {/* BAR CHART */}
        <div className="dash-card dash-bar-card">
          <div className="dash-card-header">
            <span>Monthly Burials</span>
            <span className="dash-card-action">
              <CodeIcon />
            </span>
          </div>
          <div className="dash-bar-chart">
            {monthlyBurials.map((m, i) => (
              <div className="dash-bar-col" key={i}>
                <div
                  className="dash-bar"
                  style={{ height: `${(m.value / maxBar) * 100}%` }}
                  title={`${m.value}`}
                ></div>
                <span className="dash-bar-label">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* DONUT CHART */}
        <div className="dash-card dash-donut-card">
          <div className="dash-card-header">
            <span>Grave Types Distribution</span>
          </div>
          <div className="dash-donut-wrap">
            <svg viewBox="0 0 160 160" className="dash-donut-svg">
              {graveTypes.map((g, i) => {
                const fraction = g.value / total;
                const dash = fraction * circumference;
                const gap = circumference - dash;
                const offset = -((cumulative / total) * circumference);
                cumulative += g.value;
                return (
                  <circle
                    key={i}
                    cx="80"
                    cy="80"
                    r={radius}
                    fill="none"
                    stroke={g.color}
                    strokeWidth="24"
                    strokeDasharray={`${dash} ${gap}`}
                    strokeDashoffset={offset}
                    transform="rotate(-90 80 80)"
                  />
                );
              })}
            </svg>
          </div>
          <div className="dash-donut-legend">
            {graveTypes.map((g, i) => (
              <div className="dash-legend-item" key={i}>
                <span
                  className="dash-legend-dot"
                  style={{ background: g.color }}
                ></span>
                <span>{g.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="dash-card dash-activity-card">
        <div className="dash-card-header">
          <span>Recent Activity</span>
        </div>
        <div className="dash-activity-list">
          {recentActivity.map((act, i) => (
            <div className="dash-activity-row" key={i}>
              <div className="dash-activity-info">
                <div className="dash-activity-title">{act.title}</div>
                <div className="dash-activity-by">by {act.by}</div>
              </div>
              <div className="dash-activity-time">{act.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardA;