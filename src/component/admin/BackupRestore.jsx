import { useState, useRef } from "react";
import { auth } from "../../firebase.config";
import { logAudit } from "../../utils/logAudit";
import "./backup-restore.css";

const INITIAL_HISTORY = [
  { id: 1, date: '2026-03-15 14:30:22', name: 'backup_full_2026-03-15.sql', size: '156.2 MB', status: 'success' },
  { id: 2, date: '2026-03-14 18:00:00', name: 'backup_full_2026-03-14.sql', size: '155.8 MB', status: 'success' },
  { id: 3, date: '2026-03-13 02:00:00', name: 'backup_full_2026-03-13.sql', size: '154.5 MB', status: 'success' },
  { id: 4, date: '2026-03-12 02:00:00', name: 'backup_full_2026-03-12.sql', size: '153.9 MB', status: 'failed' },
  { id: 5, date: '2026-03-11 02:00:00', name: 'backup_full_2026-03-11.sql', size: '153.2 MB', status: 'success' },
  { id: 6, date: '2026-03-10 02:00:00', name: 'backup_full_2026-03-10.sql', size: '152.8 MB', status: 'success' },
  { id: 7, date: '2026-03-09 02:00:00', name: 'backup_full_2026-03-09.sql', size: '152.1 MB', status: 'running' },
  { id: 8, date: '2026-03-08 02:00:00', name: 'backup_full_2026-03-08.sql', size: '151.7 MB', status: 'success' },
];

function Toast({ toast, onClose }) {
  if (!toast) return null;
  return (
    <div className={`br-toast br-toast-${toast.type} ${toast.visible ? "br-toast-show" : ""}`}>
      <span>{toast.message}</span>
      <button className="br-toast-close" onClick={onClose}>×</button>
    </div>
  );
}

function BackupRestore() {
  const [backups, setBackups] = useState(INITIAL_HISTORY);
  const [isBackupRunning, setIsBackupRunning] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);

  // Modals
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showCleanupModal, setShowCleanupModal] = useState(false);

  // Form states
  const [restoreFileId, setRestoreFileId] = useState("");
  const [confirmRestoreChecked, setConfirmRestoreChecked] = useState(false);

  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);
  const progressInterval = useRef(null);

  const showToast = (message, type = "success") => {
    clearTimeout(toastTimer.current);
    setToast({ message, type, visible: true });
    toastTimer.current = setTimeout(() => setToast(null), 3500);
  };

  // ── BACKUP LOGIC ──
  const createBackup = () => {
    if (isBackupRunning) {
      showToast('⚠️ A backup is already in progress', 'warning');
      return;
    }

    setShowProgressModal(true);
    setBackupProgress(0);
    setIsBackupRunning(true);

    progressInterval.current = setInterval(() => {
      setBackupProgress(p => {
        let next = p + (Math.random() * 8 + 2);
        if (next >= 100) {
          next = 100;
          clearInterval(progressInterval.current);
          setTimeout(() => {
            setIsBackupRunning(false);
            setShowProgressModal(false);
            
            const now = new Date();
            const dateStr = now.toISOString().slice(0, 10);
            const timeStr = now.toTimeString().slice(0, 8);
            const newBackup = {
              id: Date.now(),
              date: `${dateStr} ${timeStr}`,
              name: `backup_full_${dateStr}_${Math.random().toString(36).slice(2,6)}.sql`,
              size: `${(150 + Math.random() * 15).toFixed(1)} MB`,
              status: 'success'
            };
            setBackups(prev => [newBackup, ...prev]);
            showToast('✅ Backup created successfully!', 'success');
            
            logAudit({
              user: auth.currentUser?.email || "Admin",
              role: "Admin",
              action: "Created manual backup",
              target: newBackup.name,
            });
          }, 500);
        }
        return next;
      });
    }, 200);
  };

  const cancelBackup = () => {
    clearInterval(progressInterval.current);
    setIsBackupRunning(false);
    setShowProgressModal(false);
    showToast('⚠️ Backup cancelled', 'warning');
  };

  // ── RESTORE LOGIC ──
  const openRestoreModal = (id = "") => {
    setRestoreFileId(id.toString());
    setConfirmRestoreChecked(false);
    setShowRestoreModal(true);
  };

  const confirmRestore = async () => {
    if (!restoreFileId) {
      showToast('⚠️ Please select a backup file', 'warning');
      return;
    }
    const backup = backups.find(b => b.id.toString() === restoreFileId);
    setShowRestoreModal(false);
    showToast('🔄 Restoring backup... This may take a few minutes', 'info');
    
    setTimeout(() => {
      showToast('✅ Backup restored successfully!', 'success');
      logAudit({
        user: auth.currentUser?.email || "Admin",
        role: "Admin",
        action: "Restored system backup",
        target: backup?.name || "—",
      });
    }, 3000);
  };

  // ── ACTIONS ──
  const downloadBackup = (id) => {
    const backup = backups.find(b => b.id === id);
    if (backup) {
      showToast(`📥 Downloading ${backup.name}...`, 'info');
      setTimeout(() => {
        showToast(`✅ ${backup.name} downloaded successfully!`, 'success');
      }, 1500);
    }
  };

  const exportBackup = () => {
    const latest = backups.find(b => b.status === 'success');
    if (latest) {
      downloadBackup(latest.id);
    } else {
      showToast('⚠️ No successful backup found to download', 'warning');
    }
  };

  const deleteBackup = (id) => {
    if (window.confirm('Are you sure you want to delete this backup file?')) {
      setBackups(prev => prev.filter(b => b.id !== id));
      showToast('🗑️ Backup file deleted successfully', 'success');
    }
  };

  const verifyBackup = () => {
    showToast('🔍 Verifying backup integrity...', 'info');
    setTimeout(() => {
      showToast('✅ All backups verified successfully! No corruption detected.', 'success');
    }, 2000);
  };

  // ── SCHEDULE & CLEANUP ──
  const saveSchedule = () => {
    setShowScheduleModal(false);
    showToast(`✅ Backup schedule updated successfully`, 'success');
  };

  const confirmCleanup = () => {
    setShowCleanupModal(false);
    showToast('🧹 Cleaning up old backups...', 'info');
    setTimeout(() => {
      const successBackups = backups.filter(b => b.status === 'success');
      const toKeep = successBackups.slice(0, 5);
      const toDelete = backups.filter(b => !toKeep.includes(b));
      setBackups(toKeep);
      showToast(`✅ Cleaned up ${toDelete.length} old backup files`, 'success');
    }, 1500);
  };

  const oldBackupsCount = Math.max(0, backups.filter(b => b.status === 'success' || b.status === 'failed').length - 5);
  const oldBackupsSize = backups.filter(b => b.status === 'success' || b.status === 'failed').slice(5).reduce((acc, val) => acc + parseFloat(val.size || 0), 0);
  const formattedSize = oldBackupsSize > 1000 ? (oldBackupsSize / 1000).toFixed(1) + " GB" : oldBackupsSize.toFixed(1) + " MB";

  const now = new Date();
  const currentMonthYear = ["January","February","March","April","May","June","July","August","September","October","November","December"][now.getMonth()] + " " + now.getFullYear();

  return (
    <div className="br-wrapper">
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* ── TOP BAR ── */}
      <div className="br-topbar">
        <div className="br-topbar-left">
          <h1>Backup & Restore <span style={{ color: "#d4af37" }}>✦</span></h1>
          <div className="br-greeting">Manage system backups and data recovery</div>
        </div>
        <div className="br-topbar-right">
          <div className="br-date-badge">
            <i className="fas fa-calendar-alt" style={{ color: "#d4af37", marginRight: 6 }}></i>
            {currentMonthYear}
          </div>
        </div>
      </div>

      {/* ── CONTAINER ── */}
      <div className="br-container">

        {/* Header */}
        <div className="br-header">
          <div className="br-header-left">
            <h2><i className="fas fa-database" style={{ color: "#d4af37", marginRight: 8 }}></i>Data Management</h2>
            <span className={`br-status-main ${isBackupRunning ? "running" : "success"}`}>
              <i className="fas fa-circle" style={{ fontSize: "0.5rem" }}></i> {isBackupRunning ? "Backup in Progress" : "All Systems Normal"}
            </span>
          </div>
          <div className="br-header-right">
            <button className="br-btn-secondary" onClick={() => setShowScheduleModal(true)}>
              <i className="fas fa-clock"></i> Schedule Backup
            </button>
            <button className="br-btn-primary" onClick={createBackup}>
              <i className="fas fa-cloud-upload-alt"></i> Create Backup
            </button>
          </div>
        </div>

        {/* Grid Cards */}
        <div className="br-grid">
          <div className="br-card">
            <div className="br-icon" style={{ color: "#d4af37" }}><i className="fas fa-cloud-upload-alt"></i></div>
            <h3>Create Backup</h3>
            <p>Create a full backup of all system data including users, burials, payments, and settings.</p>
            <button className="br-btn-gold" onClick={createBackup}>
              <i className="fas fa-play"></i> Start Backup
            </button>
          </div>
          <div className="br-card">
            <div className="br-icon" style={{ color: "#3670AF" }}><i className="fas fa-cloud-download-alt"></i></div>
            <h3>Restore Backup</h3>
            <p>Restore system data from a previous backup file. This will overwrite current data.</p>
            <button className="br-btn-blue" onClick={() => openRestoreModal()}>
              <i className="fas fa-upload"></i> Restore from File
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="br-quick-actions">
          <button className="br-btn-success" onClick={exportBackup}>
            <i className="fas fa-download"></i> Download Latest Backup
          </button>
          <button className="br-btn-secondary" onClick={verifyBackup} style={{ border: "1px solid #d4af37" }}>
            <i className="fas fa-check-circle"></i> Verify Backup Integrity
          </button>
          <button className="br-btn-danger" onClick={() => setShowCleanupModal(true)}>
            <i className="fas fa-trash"></i> Cleanup Old Backups
          </button>
        </div>

        {/* History Table */}
        <div className="br-history">
          <div className="br-history-header">
            <h3><i className="fas fa-history" style={{ color: "#d4af37", marginRight: 6 }}></i> Backup History</h3>
            <span style={{ fontSize: "0.8rem", color: "#7a9fbe" }}>Last 10 backups</span>
          </div>
          <div className="br-table-wrapper">
            <table className="br-table">
              <thead>
                <tr>
                  <th><i className="fas fa-calendar"></i> Date</th>
                  <th><i className="fas fa-file"></i> File Name</th>
                  <th><i className="fas fa-weight"></i> Size</th>
                  <th><i className="fas fa-circle"></i> Status</th>
                  <th style={{ textAlign: "center" }}><i className="fas fa-cog"></i> Actions</th>
                </tr>
              </thead>
              <tbody>
                {backups.map(backup => (
                  <tr key={backup.id}>
                    <td>{backup.date}</td>
                    <td style={{ fontFamily: "'Courier New', monospace", fontSize: "0.8rem" }}>{backup.name}</td>
                    <td className="br-file-size">{backup.size}</td>
                    <td>
                      <span className={`br-badge ${backup.status}`}>
                        {backup.status === 'success' && <><i className="fas fa-check-circle"></i> Success</>}
                        {backup.status === 'failed' && <><i className="fas fa-times-circle"></i> Failed</>}
                        {backup.status === 'running' && <><i className="fas fa-spinner fa-pulse"></i> Running</>}
                      </span>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <button className="br-action-btn success" onClick={() => downloadBackup(backup.id)} title="Download" disabled={backup.status !== 'success'}>
                        <i className="fas fa-download"></i>
                      </button>
                      <button className="br-action-btn" onClick={() => openRestoreModal(backup.id)} title="Restore" disabled={backup.status !== 'success'}>
                        <i className="fas fa-undo"></i>
                      </button>
                      <button className="br-action-btn danger" onClick={() => deleteBackup(backup.id)} title="Delete" disabled={backup.status === 'running'}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                {backups.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", padding: "2rem", color: "#8aaccc" }}>
                      No backup history found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="br-main-footer">
        <i className="fas fa-dove"></i>
        Cherubim of Heaven Memorial Park · Admin Dashboard v2.0
        <i className="fas fa-dove"></i>
      </div>

      {/* ── MODALS ── */}
      {showProgressModal && (
        <div className="br-modal-overlay">
          <div className="br-modal">
            <div className="br-modal-icon" style={{ color: "#d4af37" }}>
              <i className="fas fa-spinner fa-pulse"></i>
            </div>
            <h3>Creating Backup...</h3>
            <p className="br-modal-subtitle">Please wait while we create a full system backup</p>
            <div className="br-progress-container">
              <div className="br-progress-bar" style={{ width: `${Math.min(backupProgress, 100)}%` }}></div>
            </div>
            <p className="br-progress-text">Progress: {Math.min(Math.round(backupProgress), 100)}%</p>
            <div className="br-modal-actions">
              <button className="br-btn-cancel" onClick={cancelBackup}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showRestoreModal && (
        <div className="br-modal-overlay" onClick={() => setShowRestoreModal(false)}>
          <div className="br-modal" onClick={e => e.stopPropagation()}>
            <div className="br-modal-icon" style={{ color: "#3670AF" }}>
              <i className="fas fa-cloud-download-alt"></i>
            </div>
            <h3>Restore from Backup</h3>
            <p className="br-modal-subtitle">Select a backup file to restore. This will overwrite current data.</p>
            
            <div className="br-form-group">
              <label>Select Backup File</label>
              <select className="br-select" value={restoreFileId} onChange={(e) => setRestoreFileId(e.target.value)}>
                <option value="">-- Select a backup file --</option>
                {backups.filter(b => b.status === 'success').map(b => (
                  <option key={b.id} value={b.id}>{b.name} ({b.date})</option>
                ))}
              </select>
            </div>

            <div className="br-warning-box">
              <p>
                <i className="fas fa-exclamation-triangle" style={{ color: "#f39c12", marginRight: 6 }}></i>
                <strong>Warning:</strong> Restoring will replace all current data with the backup data. 
                This action cannot be undone. Please ensure you have a recent backup before proceeding.
              </p>
            </div>

            <div className="br-form-group">
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: "0.85rem" }}>
                <input type="checkbox" checked={confirmRestoreChecked} onChange={e => setConfirmRestoreChecked(e.target.checked)} /> 
                I understand that this will overwrite all current data
              </label>
            </div>

            <div className="br-modal-actions">
              <button className="br-btn-cancel" onClick={() => setShowRestoreModal(false)}>Cancel</button>
              <button className="br-btn-danger" onClick={confirmRestore} disabled={!confirmRestoreChecked}>
                <i className="fas fa-upload"></i> Restore
              </button>
            </div>
          </div>
        </div>
      )}

      {showScheduleModal && (
        <div className="br-modal-overlay" onClick={() => setShowScheduleModal(false)}>
          <div className="br-modal" onClick={e => e.stopPropagation()}>
            <div className="br-modal-icon" style={{ color: "#d4af37" }}>
              <i className="fas fa-clock"></i>
            </div>
            <h3>Schedule Backup</h3>
            <p className="br-modal-subtitle">Configure automatic backup schedule</p>

            <div className="br-form-group">
              <label>Backup Frequency</label>
              <select className="br-select" defaultValue="weekly">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div className="br-form-group">
              <label>Time</label>
              <input type="time" className="br-input" defaultValue="02:00" />
            </div>

            <div className="br-form-group">
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: "0.85rem" }}>
                <input type="checkbox" defaultChecked /> Enable Auto Backup
              </label>
            </div>

            <div className="br-modal-actions">
              <button className="br-btn-cancel" onClick={() => setShowScheduleModal(false)}>Cancel</button>
              <button className="br-btn-confirm" onClick={saveSchedule}>
                <i className="fas fa-save"></i> Save Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {showCleanupModal && (
        <div className="br-modal-overlay" onClick={() => setShowCleanupModal(false)}>
          <div className="br-modal" onClick={e => e.stopPropagation()}>
            <div className="br-modal-icon" style={{ color: "#c0392b" }}>
              <i className="fas fa-trash"></i>
            </div>
            <h3>Cleanup Old Backups</h3>
            <p className="br-modal-subtitle">Remove old backup files to free up storage space</p>

            <div className="br-form-group">
              <label>Delete backups older than</label>
              <select className="br-select" defaultValue="60">
                <option value="30">30 days</option>
                <option value="60">60 days</option>
                <option value="90">90 days</option>
                <option value="180">180 days</option>
              </select>
            </div>

            <div className="br-info-box">
              <p>
                <i className="fas fa-info-circle" style={{ color: "#3670AF", marginRight: 6 }}></i>
                This will remove approximately <strong>{oldBackupsCount}</strong> backup files and free up 
                <strong> {formattedSize}</strong> of storage.
              </p>
            </div>

            <div className="br-modal-actions">
              <button className="br-btn-cancel" onClick={() => setShowCleanupModal(false)}>Cancel</button>
              <button className="br-btn-danger" onClick={confirmCleanup}>
                <i className="fas fa-trash"></i> Delete Old Backups
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default BackupRestore;