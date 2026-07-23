import { useState } from "react";
import "./reports.css";

const WEEKLY_DATA = {
  totalRevenue: 860000,
  wakeSpaceRevenue: 111000,
  totalExpenses: 172000,
  netIncome: 688000,
  chart: [
    { label: "Mon", lotSales: 90000,  wakeSpace: 20000, expenses: 15000 },
    { label: "Tue", lotSales: 70000,  wakeSpace: 15000, expenses: 12000 },
    { label: "Wed", lotSales: 140000, wakeSpace: 25000, expenses: 20000 },
    { label: "Thu", lotSales: 100000, wakeSpace: 18000, expenses: 14000 },
    { label: "Fri", lotSales: 170000, wakeSpace: 22000, expenses: 25000 },
    { label: "Sat", lotSales: 80000,  wakeSpace: 8000,  expenses: 10000 },
    { label: "Sun", lotSales: 60000,  wakeSpace: 3000,  expenses: 8000 },
  ],
};

const MONTHLY_DATA = {
  totalRevenue: 2542500,
  wakeSpaceRevenue: 602000,
  totalExpenses: 765000,
  netIncome: 1777500,
  chart: [
    { label: "Jan", lotSales: 300000, wakeSpace: 90000,  expenses: 110000 },
    { label: "Feb", lotSales: 280000, wakeSpace: 85000,  expenses: 100000 },
    { label: "Mar", lotSales: 380000, wakeSpace: 100000, expenses: 130000 },
    { label: "Apr", lotSales: 350000, wakeSpace: 95000,  expenses: 120000 },
    { label: "May", lotSales: 390000, wakeSpace: 110000, expenses: 135000 },
    { label: "Jun", lotSales: 400000, wakeSpace: 120000, expenses: 140000 },
  ],
};

const BURIAL_CHART = [
  { label: "Jan", ground: 24, apartment: 8, mausoleum: 3, boneVault: 2 },
  { label: "Feb", ground: 22, apartment: 9, mausoleum: 2, boneVault: 3 },
  { label: "Mar", ground: 28, apartment: 10, mausoleum: 4, boneVault: 2 },
  { label: "Apr", ground: 25, apartment: 9, mausoleum: 3, boneVault: 3 },
  { label: "May", ground: 27, apartment: 11, mausoleum: 3, boneVault: 2 },
  { label: "Jun", ground: 26, apartment: 10, mausoleum: 4, boneVault: 3 },
];

const RESERVATION_DATA = [
  { type: "Ground Burial Lots", total: 2100, reserved: 45, available: 155, occupancy: 90 },
  { type: "Apartment Niches",   total: 980,  reserved: 22, available: 58,  occupancy: 92 },
  { type: "Mausoleum",          total: 520,  reserved: 8,  available: 12,  occupancy: 96 },
  { type: "Bone Vault",         total: 247,  reserved: 5,  available: 15,  occupancy: 92 },
];

const peso = (n) => "₱" + n.toLocaleString("en-PH");

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function CsvIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="9" y1="15" x2="9" y2="17" />
      <line x1="12" y1="13" x2="12" y2="17" />
      <line x1="15" y1="15" x2="15" y2="17" />
    </svg>
  );
}

function PdfIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  );
}

// ── Simple Bar Chart (Financial) ──
function BarChart({ data }) {
  const maxVal = Math.max(...data.flatMap((d) => [d.lotSales, d.wakeSpace, d.expenses]));
  const niceMax = Math.ceil(maxVal / 55000) * 55000 || 220000;
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(niceMax * f));

  return (
    <div className="rp-barchart">
      <div className="rp-barchart-yaxis">
        {yTicks.slice().reverse().map((tick, i) => (
          <span key={i}>₱{tick >= 1000 ? `${Math.round(tick / 1000)}k` : tick}</span>
        ))}
      </div>
      <div className="rp-barchart-body">
        {data.map((d) => (
          <div className="rp-bar-group" key={d.label}>
            <div className="rp-bar-track">
              <div
                className="rp-bar rp-bar--sales"
                style={{ height: `${(d.lotSales / niceMax) * 100}%` }}
                title={`Lot Sales: ${peso(d.lotSales)}`}
              />
              <div
                className="rp-bar rp-bar--wake"
                style={{ height: `${(d.wakeSpace / niceMax) * 100}%` }}
                title={`Wake Space: ${peso(d.wakeSpace)}`}
              />
              <div
                className="rp-bar rp-bar--exp"
                style={{ height: `${(d.expenses / niceMax) * 100}%` }}
                title={`Expenses: ${peso(d.expenses)}`}
              />
            </div>
            <span className="rp-bar-label">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Simple Line Chart (Burial) ──
function LineChart({ data }) {
  const width = 700;
  const height = 220;
  const padding = 30;
  const maxVal = 32;
  const step = (width - padding * 2) / (data.length - 1);

  const toPoints = (key) =>
    data
      .map((d, i) => {
        const x = padding + i * step;
        const y = height - padding - (d[key] / maxVal) * (height - padding * 1.5);
        return `${x},${y}`;
      })
      .join(" ");

  const series = [
    { key: "ground",    color: "#111827", label: "Ground" },
    { key: "apartment", color: "#6b7280", label: "Apartment" },
    { key: "mausoleum", color: "#9ca3af", label: "Mausoleum" },
    { key: "boneVault", color: "#d1d5db", label: "Bone Vault" },
  ];

  const yTicks = [0, 8, 16, 24, 32];

  return (
    <div className="rp-linechart-wrap">
      <svg viewBox={`0 0 ${width} ${height + 10}`} className="rp-linechart-svg">
        {yTicks.map((tick) => {
          const y = height - padding - (tick / maxVal) * (height - padding * 1.5);
          return (
            <g key={tick}>
              <line x1={padding} y1={y} x2={width - 10} y2={y} stroke="#f3f4f6" strokeWidth="1" />
              <text x={0} y={y + 4} fontSize="10" fill="#9ca3af">{tick}</text>
            </g>
          );
        })}
        {series.map((s) => (
          <polyline
            key={s.key}
            points={toPoints(s.key)}
            fill="none"
            stroke={s.color}
            strokeWidth="2"
          />
        ))}
        {series.map((s) =>
          data.map((d, i) => {
            const x = padding + i * step;
            const y = height - padding - (d[s.key] / maxVal) * (height - padding * 1.5);
            return <circle key={`${s.key}-${i}`} cx={x} cy={y} r="3" fill={s.color} />;
          })
        )}
        {data.map((d, i) => (
          <text
            key={d.label}
            x={padding + i * step}
            y={height + 6}
            fontSize="11"
            fill="#9ca3af"
            textAnchor="middle"
          >
            {d.label}
          </text>
        ))}
      </svg>
      <div className="rp-linechart-legend">
        {series.map((s) => (
          <div className="rp-legend-item" key={s.key}>
            <span className="rp-legend-dot" style={{ background: s.color }} />
            {s.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function ExportModal({ tab, period, onClose }) {
  const [format, setFormat] = useState("pdf");

  const summaryMap = {
    financial: { records: "7 entries", type: "Financial", period: "Mar 9 – Mar 15, 2026" },
    burial:    { records: "6 entries", type: "Burial",    period: "Jan – Jun 2026" },
    reservation: { records: "4 entries", type: "Reservation", period: "Jan – Jun 2026" },
  };

  const summary = summaryMap[tab];
  const titleMap = {
    financial: "Export Financial Report",
    burial: "Export Burial Report",
    reservation: "Export Reservation Report",
  };

  const handleExport = () => {
    onClose();
  };

  return (
    <div className="rp-overlay" onClick={onClose}>
      <div className="rp-modal" onClick={(e) => e.stopPropagation()}>
        <div className="rp-modal-header">
          <h2>{titleMap[tab]}</h2>
          <button className="rp-modal-close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <div className="rp-export-label">Export Summary</div>
        <div className="rp-summary-box">
          <div className="rp-summary-row">
            <span>Total Records</span>
            <span className="rp-summary-value">{summary.records}</span>
          </div>
          <div className="rp-summary-row">
            <span>Report Type</span>
            <span className="rp-summary-value">
              {summary.type}{tab === "financial" ? ` (${period === "weekly" ? "Weekly" : "Monthly"})` : ""}
            </span>
          </div>
          <div className="rp-summary-row">
            <span>Period</span>
            <span className="rp-summary-value">{summary.period}</span>
          </div>
          <div className="rp-summary-row">
            <span>Generated By</span>
            <span className="rp-summary-value">Administrator</span>
          </div>
        </div>

        <div className="rp-format-label">Choose Format</div>
        <div className="rp-format-options">
          <button
            className={`rp-format-card ${format === "csv" ? "rp-format-active" : ""}`}
            onClick={() => setFormat("csv")}
          >
            <CsvIcon />
            <div className="rp-format-title">CSV File</div>
            <div className="rp-format-sub">Spreadsheet compatible</div>
          </button>
          <button
            className={`rp-format-card ${format === "pdf" ? "rp-format-active" : ""}`}
            onClick={() => setFormat("pdf")}
          >
            <PdfIcon />
            <div className="rp-format-title">PDF File</div>
            <div className="rp-format-sub">Print-ready document</div>
          </button>
        </div>

        <div className="rp-modal-actions">
          <button className="rp-btn-secondary" onClick={onClose}>Cancel</button>
          <button className="rp-btn-primary" onClick={handleExport}>
            <DownloadIcon /> Export
          </button>
        </div>
      </div>
    </div>
  );
}

function Reports() {
  const [activeTab, setActiveTab] = useState("financial");
  const [period, setPeriod] = useState("weekly");
  const [showExport, setShowExport] = useState(false);

  const financialData = period === "weekly" ? WEEKLY_DATA : MONTHLY_DATA;

  return (
    <div className="rp-page">
      <div className="rp-topbar">
        <span>Cherubim of Heaven Memorial Park</span>
      </div>
      <div className="rp-header">
        <div>
          <h1>Reports</h1>
          <p>Financial, burial, and reservation reports</p>
        </div>
        <button className="rp-export-btn" onClick={() => setShowExport(true)}>
          <DownloadIcon /> Export Report
        </button>
      </div>

      {/* Tabs */}
      <div className="rp-tabs">
        <button
          className={`rp-tab ${activeTab === "financial" ? "rp-tab-active" : ""}`}
          onClick={() => setActiveTab("financial")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          Financial
        </button>
        <button
          className={`rp-tab ${activeTab === "burial" ? "rp-tab-active" : ""}`}
          onClick={() => setActiveTab("burial")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Burial
        </button>
        <button
          className={`rp-tab ${activeTab === "reservation" ? "rp-tab-active" : ""}`}
          onClick={() => setActiveTab("reservation")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          Reservation
        </button>
      </div>

      {/* FINANCIAL TAB */}
      {activeTab === "financial" && (
        <>
          <div className="rp-period-toggle">
            <button
              className={`rp-period-btn ${period === "weekly" ? "rp-period-active" : ""}`}
              onClick={() => setPeriod("weekly")}
            >
              Weekly
            </button>
            <button
              className={`rp-period-btn ${period === "monthly" ? "rp-period-active" : ""}`}
              onClick={() => setPeriod("monthly")}
            >
              Monthly
            </button>
          </div>

          <div className="rp-stats">
            <div className="rp-stat-card">
              <p className="rp-stat-label">Total Revenue</p>
              <p className="rp-stat-value">{peso(financialData.totalRevenue)}</p>
            </div>
            <div className="rp-stat-card">
              <p className="rp-stat-label">Wake Space Revenue</p>
              <p className="rp-stat-value">{peso(financialData.wakeSpaceRevenue)}</p>
            </div>
            <div className="rp-stat-card">
              <p className="rp-stat-label">Total Expenses</p>
              <p className="rp-stat-value">{peso(financialData.totalExpenses)}</p>
            </div>
            <div className="rp-stat-card">
              <p className="rp-stat-label">Net Income</p>
              <p className="rp-stat-value">{peso(financialData.netIncome)}</p>
            </div>
          </div>

          <div className="rp-chart-card">
            <h2 className="rp-chart-title">
              Revenue vs Expenses ({period === "weekly" ? "This Week" : "Jan – Jun 2026"})
            </h2>
            <BarChart data={financialData.chart} />
            <div className="rp-bar-legend">
              <div className="rp-legend-item">
                <span className="rp-legend-dot" style={{ background: "#111827" }} />
                Lot Sales
              </div>
              <div className="rp-legend-item">
                <span className="rp-legend-dot" style={{ background: "#9ca3af" }} />
                Wake Space
              </div>
              <div className="rp-legend-item">
                <span className="rp-legend-dot" style={{ background: "#e5e7eb" }} />
                Expenses
              </div>
            </div>
          </div>
        </>
      )}

      {/* BURIAL TAB */}
      {activeTab === "burial" && (
        <div className="rp-chart-card">
          <h2 className="rp-chart-title">Burials by Type (Monthly)</h2>
          <LineChart data={BURIAL_CHART} />
        </div>
      )}

      {/* RESERVATION TAB */}
      {activeTab === "reservation" && (
        <div className="rp-table-card">
          <table className="rp-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Total Lots</th>
                <th>Reserved</th>
                <th>Available</th>
                <th>Occupancy</th>
              </tr>
            </thead>
            <tbody>
              {RESERVATION_DATA.map((row) => (
                <tr key={row.type}>
                  <td className="rp-td-type">{row.type}</td>
                  <td>{row.total.toLocaleString()}</td>
                  <td>{row.reserved}</td>
                  <td>{row.available}</td>
                  <td>
                    <div className="rp-occupancy-cell">
                      <div className="rp-occupancy-track">
                        <div
                          className="rp-occupancy-fill"
                          style={{ width: `${row.occupancy}%` }}
                        />
                      </div>
                      <span className="rp-occupancy-pct">{row.occupancy}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showExport && (
        <ExportModal tab={activeTab} period={period} onClose={() => setShowExport(false)} />
      )}
    </div>
  );
}

export default Reports;