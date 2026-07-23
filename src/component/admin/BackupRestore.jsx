import { useState } from "react";
import { auth } from "../../firebase.config";
import { logAudit } from "../../utils/logAudit";
import "./backup-restore.css";

const INITIAL_HISTORY = [
  { date: "2026-03-15 08:00", type: "Full (auto)", size: "245 MB", status: "completed" },
  { date: "2026-03-14 08:00", type: "Full (auto)", size: "243 MB", status: "completed" },
  { date: "2026-03-13 08:00", type: "Full (auto)", size: "241 MB", status: "completed" },
  { date: "2026-03-12 15:30", type: "Manual",      size: "240 MB", status: "completed" },
  { date: "2026-03-12 08:00", type: "Full (auto)", size: "238 MB", status: "completed" },
  { date: "2026-03-11 08:00", type: "Full (auto)", size: "236 MB", status: "failed" },
  { date: "2026-03-10 08:00", type: "Full (auto)", size: "235 MB", status: "completed" },
];

function DownloadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function RestoreIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
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

function WarningIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="30" height="30">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="30" height="30">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function BackupRestore() {
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [creating, setCreating] = useState(false);
  const [restoreTarget, setRestoreTarget] = useState(null);
  const [restoreState, setRestoreState] = useState("confirm"); // confirm | done

  const lastBackup = history[0];

  const handleCreateBackup = async () => {
    setCreating(true);
    try {
      // Simulated backup creation (real backups would run via a Cloud Function)
      await new Promise((res) => setTimeout(res, 1200));
      const now = new Date();
      const dateStr = now.toISOString().slice(0, 16).replace("T", " ");
      const newEntry = {
        date: dateStr,
        type: "Manual",
        size: `${(240 + Math.random() * 10).toFixed(0)} MB`,
        status: "completed",
      };
      setHistory((prev) => [newEntry, ...prev]);

      await logAudit({
        user: auth.currentUser?.email || "Admin",
        role: "Admin",
        action: "Created manual backup",
        target: dateStr,
      });
    } catch (err) {
      console.error("Backup failed:", err);
    } finally {
      setCreating(false);
    }
  };

  const openRestoreModal = (entry) => {
    setRestoreTarget(entry);
    setRestoreState("confirm");
  };

  const closeModal = () => {
    setRestoreTarget(null);
  };

  const handleConfirmRestore = async () => {
    setRestoreState("done");
    try {
      await logAudit({
        user: auth.currentUser?.email || "Admin",
        role: "Admin",
        action: "Restored system backup",
        target: restoreTarget?.date || "—",
      });
    } catch (err) {
      console.error("Failed to log restore:", err);
    }
  };

  return (
    <div className="br-page">
      <div className="br-topbar">
        <span>Cherubim of Heaven Memorial Park</span>
      </div>
      <div className="br-header">
        <h1>Backup & Restore</h1>
        <p>Manage system backups and data recovery</p>
      </div>

      {/* Stat Cards */}
      <div className="br-stats">
        <div className="br-stat-card">
          <div className="br-stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            </svg>
          </div>
          <div>
            <p className="br-stat-label">Last Backup</p>
            <p className="br-stat-value">Today, 08:00 AM</p>
          </div>
        </div>

        <div className="br-stat-card">
          <div className="br-stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v16" />
            </svg>
          </div>
          <div>
            <p className="br-stat-label">Storage Used</p>
            <p className="br-stat-value">1.68 GB / 10 GB</p>
          </div>
        </div>

        <div className="br-stat-card">
          <div className="br-stat-icon br-stat-icon--green">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div>
            <p className="br-stat-label">Status</p>
            <p className="br-stat-value br-stat-value--green">All systems operational</p>
          </div>
        </div>
      </div>

      <button className="br-create-btn" onClick={handleCreateBackup} disabled={creating}>
        <DownloadIcon />
        {creating ? "Creating Backup..." : "Create Backup Now"}
      </button>

      {/* Backup History */}
      <div className="br-history-card">
        <h2 className="br-history-title">Backup History</h2>

        <div className="br-table-wrap">
          <table className="br-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Size</th>
                <th>Status</th>
                <th className="br-th-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry, i) => (
                <tr key={i}>
                  <td className="br-td-date">{entry.date}</td>
                  <td>{entry.type}</td>
                  <td>{entry.size}</td>
                  <td>
                    <span className={`br-status br-status--${entry.status}`}>
                      <span className="br-status-dot" />
                      {entry.status}
                    </span>
                  </td>
                  <td>
                    <div className="br-action-icons">
                      <button
                        className="br-icon-btn"
                        title="Download"
                        disabled={entry.status === "failed"}
                      >
                        <DownloadIcon />
                      </button>
                      <button
                        className="br-icon-btn"
                        title="Restore"
                        disabled={entry.status === "failed"}
                        onClick={() => openRestoreModal(entry)}
                      >
                        <RestoreIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Restore Modal */}
      {restoreTarget && (
        <div className="br-overlay" onClick={closeModal}>
          <div className="br-modal" onClick={(e) => e.stopPropagation()}>
            {restoreState === "confirm" ? (
              <>
                <div className="br-modal-icon">
                  <WarningIcon />
                </div>
                <h3 className="br-modal-title">Restore Backup?</h3>
                <p className="br-modal-desc">
                  This will replace all current data with the selected backup. This action cannot be undone.
                </p>
                <div className="br-modal-actions">
                  <button className="br-btn-secondary" onClick={closeModal}>Cancel</button>
                  <button className="br-btn-primary" onClick={handleConfirmRestore}>Restore</button>
                </div>
              </>
            ) : (
              <>
                <div className="br-modal-header">
                  <h3 className="br-modal-title-left">Restore Backup</h3>
                  <button className="br-modal-close" onClick={closeModal}>
                    <CloseIcon />
                  </button>
                </div>
                <div className="br-modal-success">
                  <div className="br-modal-icon">
                    <CheckCircleIcon />
                  </div>
                  <h4 className="br-modal-success-title">Restore Completed</h4>
                  <p className="br-modal-desc">
                    System has been restored to backup from {restoreTarget.date}.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default BackupRestore;