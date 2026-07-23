import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase.config";
import "./audit-logs.css";

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
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

function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showExport, setShowExport] = useState(false);
  const [format, setFormat] = useState("pdf");

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "auditLogs"), orderBy("timestamp", "desc"));
        const snapshot = await getDocs(q);
        setLogs(snapshot.docs.map((docSnap) => docSnap.data()));
      } catch (err) {
        console.error("Failed to load audit logs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter((log) => {
    const q = search.toLowerCase();
    return (
      (log.user || "").toLowerCase().includes(q) ||
      (log.action || "").toLowerCase().includes(q) ||
      (log.target || "").toLowerCase().includes(q) ||
      (log.role || "").toLowerCase().includes(q)
    );
  });

  const handleExport = () => {
    setShowExport(false);
  };

  return (
    <div className="al-page">
      <div className="al-topbar">
        <span>Cherubim of Heaven Memorial Park</span>
      </div>
      <div className="al-header">
        <div>
          <h1>Audit Logs</h1>
          <p>Monitor all user activity</p>
        </div>
        <button className="al-export-btn" onClick={() => setShowExport(true)}>
          <DownloadIcon /> Export Logs
        </button>
      </div>

      <div className="al-search-row">
        <div className="al-search-wrap">
          <span className="al-search-icon"><SearchIcon /></span>
          <input
            type="text"
            placeholder="Search logs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="al-table-card">
        <table className="al-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>User</th>
              <th>Role</th>
              <th>Action</th>
              <th>Target</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={5} className="al-no-results">Loading logs...</td></tr>
            )}
            {!loading && filteredLogs.map((log, i) => (
              <tr key={i}>
                <td className="al-timestamp-cell">{log.timestamp}</td>
                <td className="al-user-cell">{log.user}</td>
                <td>
                  <span className={`al-role-badge al-role-${(log.role || "").toLowerCase()}`}>
                    {log.role}
                  </span>
                </td>
                <td>{log.action}</td>
                <td className="al-target-cell">{log.target}</td>
              </tr>
            ))}
            {!loading && filteredLogs.length === 0 && (
              <tr>
                <td colSpan={5} className="al-no-results">No logs found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showExport && (
        <div className="al-modal-overlay" onClick={() => setShowExport(false)}>
          <div className="al-modal" onClick={(e) => e.stopPropagation()}>
            <div className="al-modal-header">
              <h2>Export Audit Logs</h2>
              <button className="al-modal-close" onClick={() => setShowExport(false)}>
                <CloseIcon />
              </button>
            </div>

            <div className="al-export-summary-label">Export Summary</div>
            <div className="al-summary-box">
              <div className="al-summary-row">
                <span>Total Records</span>
                <span className="al-summary-value">{filteredLogs.length} entries</span>
              </div>
              <div className="al-summary-row">
                <span>Filter Applied</span>
                <span className="al-summary-value">{search ? "Custom search" : "All Users"}</span>
              </div>
            </div>

            <div className="al-format-label">Choose Format</div>
            <div className="al-format-options">
              <button
                className={`al-format-card ${format === "csv" ? "al-format-active" : ""}`}
                onClick={() => setFormat("csv")}
              >
                <CsvIcon />
                <div className="al-format-title">CSV File</div>
                <div className="al-format-sub">Spreadsheet compatible</div>
              </button>
              <button
                className={`al-format-card ${format === "pdf" ? "al-format-active" : ""}`}
                onClick={() => setFormat("pdf")}
              >
                <PdfIcon />
                <div className="al-format-title">PDF File</div>
                <div className="al-format-sub">Print-ready document</div>
              </button>
            </div>

            <div className="al-modal-actions">
              <button className="al-btn-secondary" onClick={() => setShowExport(false)}>Cancel</button>
              <button className="al-btn-primary" onClick={handleExport}>
                <DownloadIcon /> Export
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AuditLogs;