import { useState } from "react";
import "./reports.css";

const WEEKLY_DATA = {
  burials: 12,
  transactions: 51,
  revenue: 860000,
  wakeRevenue: 111000,
  overdue: 5,
  expiring: 23,
  chart: [
    { label: "Mon", lotSales: 90000,  wakeSpace: 20000 },
    { label: "Tue", lotSales: 70000,  wakeSpace: 15000 },
    { label: "Wed", lotSales: 140000, wakeSpace: 25000 },
    { label: "Thu", lotSales: 100000, wakeSpace: 18000 },
    { label: "Fri", lotSales: 170000, wakeSpace: 22000 },
    { label: "Sat", lotSales: 55000,  wakeSpace: 8000 },
    { label: "Sun", lotSales: 40000,  wakeSpace: 3000 },
  ],
};

const MONTHLY_DATA = {
  burials: 48,
  transactions: 274,
  revenue: 3144500,
  wakeRevenue: 602000,
  overdue: 5,
  expiring: 23,
  chart: [
    { label: "Jan", lotSales: 300000, wakeSpace: 90000 },
    { label: "Feb", lotSales: 280000, wakeSpace: 85000 },
    { label: "Mar", lotSales: 380000, wakeSpace: 100000 },
    { label: "Apr", lotSales: 350000, wakeSpace: 95000 },
    { label: "May", lotSales: 390000, wakeSpace: 110000 },
    { label: "Jun", lotSales: 400000, wakeSpace: 120000 },
  ],
};

const peso = (n) => "₱" + n.toLocaleString("en-PH");

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

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
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

function BarChart({ data }) {
  const maxVal = Math.max(...data.flatMap((d) => [d.lotSales, d.wakeSpace]));
  const niceMax = Math.ceil(maxVal / 55000) * 55000 || 220000;
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(niceMax * f));

  return (
    <div className="srp-barchart">
      <div className="srp-barchart-yaxis">
        {yTicks.slice().reverse().map((tick, i) => (
          <span key={i}>₱{tick >= 1000 ? `${Math.round(tick / 1000)}k` : tick}</span>
        ))}
      </div>
      <div className="srp-barchart-body">
        {data.map((d) => (
          <div className="srp-bar-group" key={d.label}>
            <div className="srp-bar-track">
              <div
                className="srp-bar srp-bar--sales"
                style={{ height: `${(d.lotSales / niceMax) * 100}%` }}
                title={`Lot Sales: ${peso(d.lotSales)}`}
              />
              <div
                className="srp-bar srp-bar--wake"
                style={{ height: `${(d.wakeSpace / niceMax) * 100}%` }}
                title={`Wake Space: ${peso(d.wakeSpace)}`}
              />
            </div>
            <span className="srp-bar-label">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExportModal({ period, data, onClose }) {
  const [format, setFormat] = useState("pdf");

  const handleExport = () => {
    onClose();
  };

  return (
    <div className="srp-overlay" onClick={onClose}>
      <div className="srp-modal" onClick={(e) => e.stopPropagation()}>
        <div className="srp-modal-header">
          <h2>Export Operational Report</h2>
          <button className="srp-modal-close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <div className="srp-export-label">Export Summary</div>
        <div className="srp-summary-box">
          <div className="srp-summary-row">
            <span>Total Records</span>
            <span className="srp-summary-value">{data.chart.length} entries</span>
          </div>
          <div className="srp-summary-row">
            <span>Report Type</span>
            <span className="srp-summary-value">
              {period === "weekly" ? "Weekly Operations" : "Monthly Operations"}
            </span>
          </div>
          <div className="srp-summary-row">
            <span>Period</span>
            <span className="srp-summary-value">
              {period === "weekly" ? "Mar 9 – Mar 15, 2026" : "Jan – Jun 2026"}
            </span>
          </div>
          <div className="srp-summary-row">
            <span>Total Revenue</span>
            <span className="srp-summary-value">{peso(data.revenue)}</span>
          </div>
          <div className="srp-summary-row">
            <span>Generated By</span>
            <span className="srp-summary-value">Staff</span>
          </div>
        </div>

        <div className="srp-format-label">Choose Format</div>
        <div className="srp-format-options">
          <button
            className={`srp-format-card ${format === "csv" ? "srp-format-active" : ""}`}
            onClick={() => setFormat("csv")}
          >
            <CsvIcon />
            <div className="srp-format-title">CSV File</div>
            <div className="srp-format-sub">Spreadsheet compatible</div>
          </button>
          <button
            className={`srp-format-card ${format === "pdf" ? "srp-format-active" : ""}`}
            onClick={() => setFormat("pdf")}
          >
            <PdfIcon />
            <div className="srp-format-title">PDF File</div>
            <div className="srp-format-sub">Print-ready document</div>
          </button>
        </div>

        <div className="srp-modal-actions">
          <button className="srp-btn-secondary" onClick={onClose}>Cancel</button>
          <button className="srp-btn-primary" onClick={handleExport}>
            <DownloadIcon /> Export
          </button>
        </div>
      </div>
    </div>
  );
}

function Reports() {
  const [period, setPeriod] = useState("weekly");
  const [showExport, setShowExport] = useState(false);

  const data = period === "weekly" ? WEEKLY_DATA : MONTHLY_DATA;

  return (
    <div className="srp-page">
      <div className="srp-topbar">
        <span>Cherubim of Heaven Memorial Park</span>
      </div>

      <div className="srp-header">
        <div>
          <h1>Operational Reports</h1>
          <p>{period === "weekly" ? "Weekly operational summary" : "Monthly operational summary"}</p>
        </div>
        <div className="srp-header-actions">
          <div className="srp-period-toggle">
            <button
              className={`srp-period-btn ${period === "weekly" ? "srp-period-active" : ""}`}
              onClick={() => setPeriod("weekly")}
            >
              Weekly
            </button>
            <button
              className={`srp-period-btn ${period === "monthly" ? "srp-period-active" : ""}`}
              onClick={() => setPeriod("monthly")}
            >
              Monthly
            </button>
          </div>
          <button className="srp-export-btn" onClick={() => setShowExport(true)}>
            <DownloadIcon /> Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="srp-stats">
        <div className="srp-stat-card">
          <p className="srp-stat-label">Burials This {period === "weekly" ? "Week" : "Month"}</p>
          <p className="srp-stat-value">{data.burials}</p>
        </div>
        <div className="srp-stat-card">
          <p className="srp-stat-label">Transactions Processed</p>
          <p className="srp-stat-value">{data.transactions}</p>
        </div>
        <div className="srp-stat-card">
          <p className="srp-stat-label">Revenue This {period === "weekly" ? "Week" : "Month"}</p>
          <p className="srp-stat-value">{peso(data.revenue)}</p>
        </div>
        <div className="srp-stat-card">
          <p className="srp-stat-label">Wake Space Revenue</p>
          <p className="srp-stat-value">{peso(data.wakeRevenue)}</p>
        </div>
        <div className="srp-stat-card">
          <p className="srp-stat-label">Overdue Payments</p>
          <p className="srp-stat-value">{data.overdue}</p>
        </div>
        <div className="srp-stat-card">
          <p className="srp-stat-label">Contracts Expiring (30d)</p>
          <p className="srp-stat-value">{data.expiring}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="srp-chart-card">
        <h2 className="srp-chart-title">
          {period === "weekly" ? "Daily Sales (This Week)" : "Monthly Sales (Jan – Jun 2026)"}
        </h2>
        <BarChart data={data.chart} />
        <div className="srp-bar-legend">
          <div className="srp-legend-item">
            <span className="srp-legend-dot" style={{ background: "#111827" }} />
            Lot Sales
          </div>
          <div className="srp-legend-item">
            <span className="srp-legend-dot" style={{ background: "#d1d5db" }} />
            Wake Space
          </div>
        </div>
      </div>

      {showExport && (
        <ExportModal period={period} data={data} onClose={() => setShowExport(false)} />
      )}
    </div>
  );
}

export default Reports;