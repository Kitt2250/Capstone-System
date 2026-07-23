import "./my-payments.css";

const SUMMARY = {
  lot: "Lot A-142",
  total: 85000,
  paid: 45000,
  outstanding: 40000,
  nextDue: "April 1, 2026",
  monthly: 5000,
};

const PAYMENT_HISTORY = [
  { id: "OR-2026-0310", date: "March 1, 2026",    amount: 5000,  method: "Cash", status: "Paid",               type: "paid" },
  { id: "OR-2026-0280", date: "February 1, 2026", amount: 5000,  method: "Cash", status: "Paid",               type: "paid" },
  { id: "OR-2026-0250", date: "January 1, 2026",  amount: 5000,  method: "Cash", status: "Paid",               type: "paid" },
  { id: "OR-2025-1220", date: "December 1, 2025", amount: 5000,  method: "Cash", status: "Paid",               type: "paid" },
  { id: "OR-2025-1180", date: "November 23, 2025",amount: 25000, method: "Cash", status: "Paid (Down Payment)", type: "paid" },
];

const peso = (n) =>
  "₱" + n.toLocaleString("en-PH");

function MyPayments() {
  const progress = Math.round((SUMMARY.paid / SUMMARY.total) * 100);

  return (
    <div className="mp-main">
      <div className="mp-topbar">
        <span>Cherubim of Heaven Memorial Park</span>
      </div>

      <div className="mp-header">
        <h1 className="mp-title">My Payments</h1>
        <p className="mp-subtitle">View payment history and outstanding balance</p>
      </div>

      {/* Payment Summary Card */}
      <div className="mp-summary-card">
        <div className="mp-summary-heading">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          <span>Payment Summary — {SUMMARY.lot}</span>
        </div>

        <div className="mp-summary-grid">
          <div className="mp-summary-item">
            <p className="mp-summary-label">Total Amount</p>
            <p className="mp-summary-value">{peso(SUMMARY.total)}</p>
          </div>
          <div className="mp-summary-item">
            <p className="mp-summary-label">Amount Paid</p>
            <p className="mp-summary-value">{peso(SUMMARY.paid)}</p>
          </div>
          <div className="mp-summary-item">
            <p className="mp-summary-label">Outstanding Balance</p>
            <p className="mp-summary-value mp-summary-value--red">{peso(SUMMARY.outstanding)}</p>
          </div>
          <div className="mp-summary-item">
            <p className="mp-summary-label">Next Due</p>
            <p className="mp-summary-value">{SUMMARY.nextDue}</p>
          </div>
        </div>

        <div className="mp-progress-section">
          <div className="mp-progress-header">
            <span className="mp-progress-label">Progress</span>
            <span className="mp-progress-pct">{progress}%</span>
          </div>
          <div className="mp-progress-track">
            <div className="mp-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <p className="mp-progress-note">
            Monthly Installment: {peso(SUMMARY.monthly)}
          </p>
        </div>
      </div>

      {/* Payment History */}
      <div className="mp-history-card">
        <h2 className="mp-history-title">Payment History</h2>

        <div className="mp-table-wrap">
          <table className="mp-table">
            <thead>
              <tr>
                <th>Receipt No.</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Status</th>
                <th className="mp-th-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </th>
              </tr>
            </thead>
            <tbody>
              {PAYMENT_HISTORY.map((row) => (
                <tr key={row.id}>
                  <td className="mp-td-receipt">{row.id}</td>
                  <td>{row.date}</td>
                  <td className="mp-td-amount">{peso(row.amount)}</td>
                  <td>{row.method}</td>
                  <td>
                    <span className={`mp-badge mp-badge--${row.type}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="11" height="11">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {row.status}
                    </span>
                  </td>
                  <td>
                    <button className="mp-view-btn" title="View Receipt">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mp-footer-note">
          For payment inquiries, please visit the office or call (044) 123-4567
        </p>
      </div>
    </div>
  );
}

export default MyPayments;