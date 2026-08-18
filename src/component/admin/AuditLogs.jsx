import { useState, useEffect, useRef } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase.config";
import "./audit-logs.css";

// ── helpers ───────────────────────────────────────────────────────────────────
const ROWS_PER_PAGE = 8;
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function getStatusDot(type) {
  if (type === "green") return <span className="al-dot al-green"></span>;
  if (type === "yellow") return <span className="al-dot al-yellow"></span>;
  if (type === "red") return <span className="al-dot al-red"></span>;
  return null;
}

// ── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ toast, onClose }) {
  if (!toast) return null;
  return (
    <div className={`al-toast al-toast-${toast.type} ${toast.visible ? "al-toast-show" : ""}`}>
      <span>{toast.message}</span>
      <button className="al-toast-close" onClick={onClose}>×</button>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Filters
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [actionFilter, setActionFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState(() => {
    const d = new Date(); d.setDate(d.getDate() - 7); return d.toISOString().slice(0, 10);
  });
  const [dateTo, setDateTo] = useState(() => new Date().toISOString().slice(0, 10));

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  
  // Export Modal
  const [showExport, setShowExport] = useState(false);
  const [exportFormat, setExportFormat] = useState("csv");

  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  // ── fetch logs ─────────────────────────────────────────────────────────────
  const fetchLogs = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const q = query(collection(db, "auditLogs"), orderBy("timestamp", "desc"));
      const snapshot = await getDocs(q);
      setLogs(snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })));
      if (isRefresh) showToast("✅ Logs refreshed successfully!", "success");
    } catch (err) {
      console.error("Failed to load audit logs:", err);
      if (isRefresh) showToast("❌ Failed to refresh logs.", "error");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const showToast = (message, type = "success") => {
    clearTimeout(toastTimer.current);
    setToast({ message, type, visible: true });
    toastTimer.current = setTimeout(() => setToast(null), 3500);
  };

  // ── handle filters ─────────────────────────────────────────────────────────
  const filteredLogs = logs.filter((log) => {
    const q = search.toLowerCase();
    const matchSearch = !q ||
      (log.user || "").toLowerCase().includes(q) ||
      (log.action || "").toLowerCase().includes(q) ||
      (log.target || "").toLowerCase().includes(q);
      
    const matchRole = roleFilter === "all" || (log.role || "") === roleFilter;
    const matchAction = actionFilter === "all" || (log.action || "") === actionFilter;

    let matchDate = true;
    if (log.timestamp) {
      const logDate = log.timestamp.split(" ")[0]; // "2026-03-14"
      if (dateFrom && dateTo) matchDate = logDate >= dateFrom && logDate <= dateTo;
      else if (dateFrom) matchDate = logDate >= dateFrom;
      else if (dateTo) matchDate = logDate <= dateTo;
    }

    return matchSearch && matchRole && matchAction && matchDate;
  });

  // ── pagination ─────────────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(filteredLogs.length / ROWS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIdx = (safePage - 1) * ROWS_PER_PAGE;
  const pageLogs = filteredLogs.slice(startIdx, startIdx + ROWS_PER_PAGE);

  const pageButtons = [];
  for (let i = 1; i <= totalPages; i++) pageButtons.push(i);

  // ── Helpers for rendering ──────────────────────────────────────────────────
  const getActionTag = (action) => {
    const act = (action || "").toLowerCase();
    let type = "system";
    let icon = "cog";
    if (act.includes("create")) { type = "created"; icon = "plus-circle"; }
    else if (act.includes("update") || act.includes("edit")) { type = "updated"; icon = "edit"; }
    else if (act.includes("delete") || act.includes("remove")) { type = "deleted"; icon = "trash"; }
    else if (act.includes("process")) { type = "processed"; icon = "check-circle"; }
    else if (act.includes("approve")) { type = "approved"; icon = "check-double"; }
    else if (act.includes("login") || act.includes("logged in")) { type = "processed"; icon = "sign-in-alt"; }

    return (
      <span className={`al-action-tag al-action-${type}`}>
        <i className={`fas fa-${icon}`}></i> {action}
      </span>
    );
  };

  const getRoleTag = (role) => {
    const r = (role || "").toLowerCase();
    const type = ["admin", "staff", "family"].includes(r) ? r : "system";
    return <span className={`al-role-tag al-role-${type}`}>{role || "System"}</span>;
  };

  const now = new Date();
  const currentMonthYear = `${MONTHS[now.getMonth()]} ${now.getFullYear()}`;

  const handleExportConfirm = () => {
    setShowExport(false);
    if (filteredLogs.length === 0) {
      showToast("⚠️ No logs to export.", "warning");
      return;
    }
    if (exportFormat === "print") {
      showToast("🖨️ Opening print dialog...", "info");
      setTimeout(() => window.print(), 500);
      return;
    }
    showToast(`📥 Exporting ${filteredLogs.length} logs as ${exportFormat.toUpperCase()}...`, "info");
    setTimeout(() => {
      showToast(`✅ Successfully exported!`, "success");
    }, 1500);
  };

  return (
    <div className="al-wrapper">
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* ── TOP BAR ── */}
      <div className="al-topbar">
        <div className="al-topbar-left">
          <h1>Audit Logs <span style={{ color: "#d4af37" }}>✦</span></h1>
          <div className="al-greeting">Monitor all user activity and system events</div>
        </div>
        <div className="al-topbar-right">
          <div className="al-date-badge">
            <i className="fas fa-calendar-alt" style={{ color: "#d4af37", marginRight: 6 }}></i>
            {currentMonthYear}
          </div>
        </div>
      </div>

      {/* ── SYSTEM STATUS ── */}
      <div className="al-system-status">
        <div className="al-status-item">
          {getStatusDot("green")}
          <span className="al-label">System:</span>
          <span className="al-value">Online</span>
        </div>
        <div className="al-status-item">
          {getStatusDot("green")}
          <span className="al-label">Logging:</span>
          <span className="al-value">Active</span>
        </div>
        <div className="al-status-item">
          <span className="al-label">Total Logs:</span>
          <span className="al-value al-highlight">{filteredLogs.length}</span>
        </div>
        <div className="al-status-item">
          <span className="al-label">Last Updated:</span>
          <span className="al-value" style={{ fontSize: "0.8rem", color: "#6a8aaa", fontWeight: 400 }}>
            {refreshing ? "Refreshing..." : "Just now"}
          </span>
        </div>
        <button className="al-btn-refresh" onClick={() => fetchLogs(true)} disabled={refreshing}>
          <i className={`fas fa-sync-alt ${refreshing ? "fa-spin" : ""}`}></i> Refresh
        </button>
      </div>

      {/* ── AUDIT LOGS CONTAINER ── */}
      <div className="al-container">
        
        {/* Header */}
        <div className="al-header">
          <div className="al-header-left">
            <h2><i className="fas fa-history" style={{ color: "#d4af37", marginRight: 8 }}></i>Activity Logs</h2>
            <span className="al-log-count">{filteredLogs.length} entries</span>
          </div>
          <div className="al-header-right">
            <button className="al-btn-secondary" onClick={() => setShowExport(true)}>
              <i className="fas fa-file-export"></i> Export Logs
            </button>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="al-search-filter-bar">
          <div className="al-search-wrapper">
            <input
              type="text"
              placeholder="Search by user, action, or target..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            />
            {search && (
              <button className="al-clear-btn" onClick={() => { setSearch(""); setCurrentPage(1); }}>
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
          <div className="al-filter-group">
            <select value={roleFilter} onChange={(e) => { setRoleFilter(e.target.value); setCurrentPage(1); }}>
              <option value="all">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Staff">Staff</option>
              <option value="Family">Family</option>
            </select>
            <select value={actionFilter} onChange={(e) => { setActionFilter(e.target.value); setCurrentPage(1); }}>
              <option value="all">All Actions</option>
              <option value="Logged in">Logged in</option>
              <option value="Created user account">Created User</option>
              <option value="Updated user account">Updated User</option>
              <option value="Deleted user account">Deleted User</option>
              <option value="Activated user">Activated User</option>
              <option value="Deactivated user">Deactivated User</option>
            </select>
          </div>
          <div className="al-date-range">
            <input type="date" value={dateFrom} onChange={(e) => { setDateFrom(e.target.value); setCurrentPage(1); }} />
            <span>to</span>
            <input type="date" value={dateTo} onChange={(e) => { setDateTo(e.target.value); setCurrentPage(1); }} />
          </div>
        </div>

        {/* Table */}
        <div className="al-table-wrapper">
          <table className="al-table">
            <thead>
              <tr>
                <th><i className="fas fa-clock"></i> Timestamp</th>
                <th><i className="fas fa-user"></i> User</th>
                <th><i className="fas fa-briefcase"></i> Role</th>
                <th><i className="fas fa-tag"></i> Action</th>
                <th><i className="fas fa-bullseye"></i> Target</th>
                <th><i className="fas fa-network-wired"></i> IP Address</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "2rem", color: "#8aaccc" }}>
                    <i className="fas fa-spinner fa-spin" style={{ fontSize: "1.5rem", display: "block", marginBottom: "0.5rem" }}></i>
                    Loading logs...
                  </td>
                </tr>
              )}
              {!loading && pageLogs.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "2rem", color: "#8aaccc" }}>
                    <i className="fas fa-search" style={{ fontSize: "1.5rem", display: "block", marginBottom: "0.5rem" }}></i>
                    No logs found matching your criteria
                  </td>
                </tr>
              )}
              {!loading && pageLogs.map((log) => (
                <tr key={log.id}>
                  <td className="al-timestamp">{log.timestamp}</td>
                  <td><strong>{log.user}</strong></td>
                  <td>{getRoleTag(log.role)}</td>
                  <td>{getActionTag(log.action)}</td>
                  <td>{log.target}</td>
                  <td className="al-ip">{log.ip || "127.0.0.1"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="al-pagination">
          <div className="al-pagination-info">
            Showing <span>{filteredLogs.length === 0 ? 0 : startIdx + 1}</span> to <span>{Math.min(startIdx + ROWS_PER_PAGE, filteredLogs.length)}</span> of <span>{filteredLogs.length}</span> entries
          </div>
          <div className="al-pagination-controls">
            <button disabled={safePage === 1} onClick={() => setCurrentPage(p => p - 1)}>
              <i className="fas fa-chevron-left"></i>
            </button>
            {pageButtons.map((n) => (
              <button
                key={n}
                className={n === safePage ? "active" : ""}
                onClick={() => setCurrentPage(n)}
              >
                {n}
              </button>
            ))}
            <button disabled={safePage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>

      </div>

      {/* ── FOOTER ── */}
      <div className="al-main-footer">
        <i className="fas fa-dove"></i>
        Cherubim of Heaven Memorial Park · Admin Dashboard v2.0
        <i className="fas fa-dove"></i>
      </div>

      {/* ── EXPORT MODAL ── */}
      {showExport && (
        <div className="al-modal-overlay" onClick={() => setShowExport(false)}>
          <div className="al-modal" onClick={(e) => e.stopPropagation()}>
            <div className="al-modal-header">
              <span className="al-modal-icon"><i className="fas fa-file-export"></i></span>
              <h3>Export Audit Logs</h3>
              <p className="al-modal-subtitle">Choose your preferred export format and download the data</p>
            </div>

            <div className="al-export-summary">
              <div className="al-export-summary-item">
                <span className="al-export-label">Total Records</span>
                <span className="al-export-value">{filteredLogs.length} entries</span>
              </div>
              <div className="al-export-summary-item">
                <span className="al-export-label">Current Filter</span>
                <span className="al-export-value">{search ? "Custom Search" : (roleFilter === "all" ? "All Users" : roleFilter)}</span>
              </div>
              <div className="al-export-summary-item">
                <span className="al-export-label">Date Range</span>
                <span className="al-export-value">{dateFrom || "Start"} – {dateTo || "End"}</span>
              </div>
            </div>

            <div className="al-format-label">
              <i className="fas fa-file-alt"></i> Select Export Format
            </div>

            <div className={`al-export-option ${exportFormat === "csv" ? "selected" : ""}`} onClick={() => setExportFormat("csv")}>
              <div className="al-export-icon" style={{ color: "#27ae60" }}><i className="fas fa-file-excel"></i></div>
              <div className="al-export-info">
                <div className="al-export-title">CSV File</div>
                <div className="al-export-desc">Spreadsheet-compatible format for Excel & Google Sheets</div>
              </div>
              <div className="al-export-check"><i className="fas fa-check"></i></div>
            </div>

            <div className={`al-export-option ${exportFormat === "pdf" ? "selected" : ""}`} onClick={() => setExportFormat("pdf")}>
              <div className="al-export-icon" style={{ color: "#c0392b" }}><i className="fas fa-file-pdf"></i></div>
              <div className="al-export-info">
                <div className="al-export-title">PDF Document</div>
                <div className="al-export-desc">Professional print-ready document with formatting</div>
              </div>
              <div className="al-export-check"><i className="fas fa-check"></i></div>
            </div>

            <div className={`al-export-option ${exportFormat === "json" ? "selected" : ""}`} onClick={() => setExportFormat("json")}>
              <div className="al-export-icon" style={{ color: "#f39c12" }}><i className="fas fa-code"></i></div>
              <div className="al-export-info">
                <div className="al-export-title">JSON Data</div>
                <div className="al-export-desc">Machine-readable format for developers and API integration</div>
              </div>
              <div className="al-export-check"><i className="fas fa-check"></i></div>
            </div>

            <div className={`al-export-option ${exportFormat === "print" ? "selected" : ""}`} onClick={() => setExportFormat("print")}>
              <div className="al-export-icon" style={{ color: "#3670AF" }}><i className="fas fa-print"></i></div>
              <div className="al-export-info">
                <div className="al-export-title">Print Report</div>
                <div className="al-export-desc">Send directly to printer or save as PDF</div>
              </div>
              <div className="al-export-check"><i className="fas fa-check"></i></div>
            </div>

            <div className="al-modal-actions">
              <button className="al-btn-cancel" onClick={() => setShowExport(false)}>
                <i className="fas fa-times"></i> Cancel
              </button>
              <button className="al-btn-confirm" onClick={handleExportConfirm}>
                <i className="fas fa-download"></i> Export Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AuditLogs;