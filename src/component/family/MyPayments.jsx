import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot, doc, writeBatch } from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import "./my-payments.css";
import FamilyTopbar from "./FamilyTopbar";

const INITIAL_SUMMARY = {
  lot: "Lot A-142",
  total: 85000,
  paid: 45000,
  outstanding: 40000,
  nextDue: "April 1, 2026",
  monthly: 5000,
};

const INITIAL_HISTORY = [
  { receiptId: "OR-2026-0310", date: "March 1, 2026",    amount: 5000,  method: "Cash", status: "Paid",               type: "paid" },
  { receiptId: "OR-2026-0280", date: "February 1, 2026", amount: 5000,  method: "Cash", status: "Paid",               type: "paid" },
  { receiptId: "OR-2026-0250", date: "January 1, 2026",  amount: 5000,  method: "Cash", status: "Paid",               type: "paid" },
  { receiptId: "OR-2025-1220", date: "December 1, 2025", amount: 5000,  method: "Cash", status: "Paid",               type: "paid" },
  { receiptId: "OR-2025-1180", date: "November 23, 2025",amount: 25000, method: "Cash", status: "Paid (Down Payment)", type: "paid" },
];

const peso = (n) =>
  "₱" + (n || 0).toLocaleString("en-PH");

function MyPayments() {
  const [summary, setSummary] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    // Listen to Payment Summary
    const qSummary = query(collection(db, "family_payment_summary"), where("userId", "==", uid));
    const unsubSummary = onSnapshot(qSummary, async (snap) => {
      if (snap.empty) {
        try {
          const docRef = doc(collection(db, "family_payment_summary"));
          const batch = writeBatch(db);
          batch.set(docRef, { ...INITIAL_SUMMARY, userId: uid });
          await batch.commit();
        } catch (err) {
          console.error("Failed to seed payment summary:", err);
        }
      } else {
        setSummary(snap.docs[0].data());
      }
    });

    // Listen to Payment History
    const qHistory = query(collection(db, "family_payments"), where("userId", "==", uid));
    const unsubHistory = onSnapshot(qHistory, async (snap) => {
      if (snap.empty) {
        try {
          const batch = writeBatch(db);
          INITIAL_HISTORY.forEach((h) => {
            const docRef = doc(collection(db, "family_payments"));
            batch.set(docRef, { ...h, userId: uid });
          });
          await batch.commit();
        } catch (err) {
          console.error("Failed to seed payment history:", err);
        }
      } else {
        const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Simple string date sort or leave as is if preserving original order
        setHistory(data);
      }
      setLoading(false);
    });

    return () => {
      unsubSummary();
      unsubHistory();
    };
  }, []);

  const progress = summary ? Math.round((summary.paid / summary.total) * 100) : 0;

  return (
    <div className="fam-page-wrapper">
      {/* Top Bar */}
      <FamilyTopbar title="My Payments" greeting="View payment history and outstanding balance" />

      {loading ? (
        <p style={{ color: "#6a8aaa", padding: "20px 0" }}>
          <i className="fas fa-spinner fa-spin"></i> Loading payment data...
        </p>
      ) : (
        <div className="fmpay-grid">
          {/* Payment Summary Card */}
          <div className="fam-container fmpay-summary-col">
            <div className="fmpay-section-header">
              <h2 className="fmpay-title">
                <i className="fas fa-wallet" style={{ color: "#d4af37", marginRight: "8px" }}></i> 
                Payment Summary
              </h2>
              <span className="fmpay-lot-badge">{summary?.lot}</span>
            </div>

            <div className="fmpay-stats-grid">
              <div className="fmpay-stat-card">
                <span className="fmpay-stat-label">Total Amount</span>
                <span className="fmpay-stat-value">{peso(summary?.total)}</span>
              </div>
              <div className="fmpay-stat-card">
                <span className="fmpay-stat-label">Amount Paid</span>
                <span className="fmpay-stat-value" style={{ color: "#27ae60" }}>{peso(summary?.paid)}</span>
              </div>
              <div className="fmpay-stat-card fmpay-stat-card--highlight">
                <span className="fmpay-stat-label" style={{ color: "#c0392b" }}>Outstanding Balance</span>
                <span className="fmpay-stat-value" style={{ color: "#c0392b" }}>{peso(summary?.outstanding)}</span>
              </div>
              <div className="fmpay-stat-card">
                <span className="fmpay-stat-label">Next Due Date</span>
                <span className="fmpay-stat-value" style={{ fontSize: "1.1rem" }}>{summary?.nextDue}</span>
              </div>
            </div>

            <div className="fmpay-progress-section">
              <div className="fmpay-progress-header">
                <span className="fmpay-progress-label">Payment Progress</span>
                <span className="fmpay-progress-pct">{progress}%</span>
              </div>
              <div className="fmpay-progress-track">
                <div className="fmpay-progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <div className="fmpay-progress-footer">
                <span><i className="fas fa-info-circle"></i> Monthly Installment: <strong>{peso(summary?.monthly)}</strong></span>
              </div>
            </div>
          </div>

          {/* Payment History Card */}
          <div className="fam-container fmpay-history-col">
            <div className="fmpay-section-header">
              <h2 className="fmpay-title">
                <i className="fas fa-history" style={{ color: "#6a8aaa", marginRight: "8px" }}></i> 
                Payment History
              </h2>
            </div>

            <div className="fam-table-container">
              <table className="fam-table">
                <thead>
                  <tr>
                    <th>Receipt No.</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Status</th>
                    <th style={{ width: 60 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((row) => (
                    <tr key={row.id}>
                      <td className="fam-td-bold" style={{ color: "#3670AF" }}>{row.receiptId}</td>
                      <td>{row.date}</td>
                      <td className="fam-td-bold">{peso(row.amount)}</td>
                      <td>{row.method}</td>
                      <td>
                        <span className="fam-badge fam-badge--success">
                          <i className="fas fa-check-circle" style={{ marginRight: 4 }}></i> {row.status}
                        </span>
                      </td>
                      <td>
                        <button className="fam-icon-btn" title="View Receipt">
                          <i className="fas fa-eye"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="fmpay-footer-note">
              <i className="fas fa-headset" style={{ color: "#d4af37" }}></i> For payment inquiries, please visit the office or call (044) 123-4567.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyPayments;