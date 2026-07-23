import { useState } from "react";
import "./installment-payments.css";

const INITIAL_INSTALLMENTS = [
  {
    id: "INS-001",
    client: "Rosa Mendoza",
    lot: "Lot B-098 - Apartment",
    status: "Current",
    total: 120000,
    paid: 75000,
    nextDue: "2026-04-01",
    history: [
      { date: "2026-03-01", receipt: "OR-2026-0310", amount: 5000 },
      { date: "2026-02-01", receipt: "OR-2026-0280", amount: 5000 },
      { date: "2026-01-01", receipt: "OR-2026-0250", amount: 5000 },
    ],
  },
  {
    id: "INS-002",
    client: "Carlos Tan",
    lot: "Lot D-012 - Bone Vault",
    status: "Overdue",
    total: 45000,
    paid: 20000,
    nextDue: "2026-03-01",
    history: [
      { date: "2026-01-01", receipt: "OR-2026-0120", amount: 10000 },
      { date: "2025-12-01", receipt: "OR-2025-1180", amount: 10000 },
    ],
  },
  {
    id: "INS-003",
    client: "Elena Santos",
    lot: "Lot C-130 - Mausoleum",
    status: "Current",
    total: 350000,
    paid: 180000,
    nextDue: "2026-04-01",
    history: [
      { date: "2026-03-01", receipt: "OR-2026-0305", amount: 30000 },
      { date: "2026-02-01", receipt: "OR-2026-0275", amount: 30000 },
    ],
  },
  {
    id: "INS-004",
    client: "Maria Cruz",
    lot: "Lot B-047 - Apartment",
    status: "Paid",
    total: 120000,
    paid: 120000,
    nextDue: null,
    history: [
      { date: "2025-12-01", receipt: "OR-2025-1190", amount: 20000 },
      { date: "2025-11-01", receipt: "OR-2025-1150", amount: 20000 },
    ],
  },
  {
    id: "INS-005",
    client: "Pedro Garcia",
    lot: "Lot A-150 - Ground",
    status: "Overdue",
    total: 85000,
    paid: 40000,
    nextDue: "2026-03-15",
    history: [
      { date: "2026-01-15", receipt: "OR-2026-0140", amount: 10000 },
      { date: "2025-12-15", receipt: "OR-2025-1200", amount: 10000 },
    ],
  },
];

const peso = (n) => "₱" + n.toLocaleString("en-PH");

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function StatusDot({ status }) {
  return <span className={`ip-status-dot ip-status-dot--${status.toLowerCase()}`} />;
}

function InstallmentPayments() {
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const totalOutstanding = INITIAL_INSTALLMENTS.reduce((sum, i) => sum + (i.total - i.paid), 0);
  const overdueCount = INITIAL_INSTALLMENTS.filter((i) => i.status === "Overdue").length;
  const activeCount = INITIAL_INSTALLMENTS.filter((i) => i.status !== "Paid").length;

  const filtered = INITIAL_INSTALLMENTS.filter((i) => {
    const q = search.toLowerCase();
    return (
      i.client.toLowerCase().includes(q) ||
      i.lot.toLowerCase().includes(q)
    );
  });

  const toggleHistory = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="ip-page">
      <div className="ip-topbar">
        <span>Cherubim of Heaven Memorial Park</span>
      </div>

      <div className="ip-header">
        <h1>Installment Payment Tracking</h1>
        <p>Monitor outstanding balances and payment history</p>
      </div>

      {/* Stat Cards */}
      <div className="ip-stats">
        <div className="ip-stat-card">
          <p className="ip-stat-label">Total Outstanding</p>
          <p className="ip-stat-value">{peso(totalOutstanding)}</p>
        </div>
        <div className="ip-stat-card">
          <p className="ip-stat-label">Overdue Accounts</p>
          <p className="ip-stat-value ip-stat-value--red">{overdueCount}</p>
        </div>
        <div className="ip-stat-card">
          <p className="ip-stat-label">Active Installments</p>
          <p className="ip-stat-value">{activeCount}</p>
        </div>
      </div>

      <div className="ip-search-row">
        <div className="ip-search-wrap">
          <span className="ip-search-icon"><SearchIcon /></span>
          <input
            type="text"
            placeholder="Search client or grave number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Installment Cards */}
      <div className="ip-list">
        {filtered.map((inst) => {
          const balance = inst.total - inst.paid;
          const pct = Math.round((inst.paid / inst.total) * 100);
          const isExpanded = expandedId === inst.id;

          return (
            <div className="ip-card" key={inst.id}>
              <div className="ip-card-top">
                <div className="ip-card-client">
                  <span className="ip-client-name">{inst.client}</span>
                  <span className={`ip-badge ip-badge--${inst.status.toLowerCase()}`}>
                    <StatusDot status={inst.status} />
                    {inst.status}
                  </span>
                </div>
                <button className="ip-history-btn" onClick={() => toggleHistory(inst.id)}>
                  {isExpanded ? "Hide History" : "View History"}
                </button>
              </div>

              <p className="ip-card-lot">{inst.lot} · {inst.id}</p>

              <div className="ip-card-grid">
                <div className="ip-card-col">
                  <span className="ip-col-label">Total</span>
                  <span className="ip-col-value">{peso(inst.total)}</span>
                </div>
                <div className="ip-card-col">
                  <span className="ip-col-label">Paid</span>
                  <span className="ip-col-value">{peso(inst.paid)}</span>
                </div>
                <div className="ip-card-col">
                  <span className="ip-col-label">Balance</span>
                  <span className={`ip-col-value ${balance > 0 ? "ip-col-value--red" : "ip-col-value--green"}`}>
                    {peso(balance)}
                  </span>
                </div>
                <div className="ip-card-col">
                  <span className="ip-col-label">Next Due</span>
                  <span className="ip-col-value">{inst.nextDue || "—"}</span>
                </div>
              </div>

              <div className="ip-progress-track">
                <div className="ip-progress-fill" style={{ width: `${pct}%` }} />
              </div>
              <p className="ip-progress-pct">{pct}% paid</p>

              {isExpanded && (
                <div className="ip-history">
                  <p className="ip-history-title">Payment History</p>
                  {inst.history.map((h, i) => (
                    <div className="ip-history-row" key={i}>
                      <span className="ip-history-date">{h.date}</span>
                      <span className="ip-history-receipt">{h.receipt}</span>
                      <span className="ip-history-amount">{peso(h.amount)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="ip-no-results">No installment records found.</div>
        )}
      </div>
    </div>
  );
}

export default InstallmentPayments;