import { useState, useEffect, useRef } from "react";
import { initializeApp, deleteApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, auth, firebaseConfig } from "../../firebase.config";
import { logAudit } from "../../utils/logAudit";
import "./user-management.css";

// ── helpers ───────────────────────────────────────────────────────────────────
function getInitials(name) {
  return (name || "").split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

const COLORS = ["gold", "blue", "green", "purple", "orange", "teal", "red"];
function pickColor(name) {
  let h = 0;
  for (let i = 0; i < (name || "").length; i++) h += name.charCodeAt(i);
  return COLORS[h % COLORS.length];
}

const ROWS_PER_PAGE = 6;

const now = new Date();
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const MONTH_YEAR = `${MONTHS[now.getMonth()]} ${now.getFullYear()}`;

// ── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ toast, onClose }) {
  if (!toast) return null;
  return (
    <div className={`um-toast um-toast-${toast.type} ${toast.visible ? "um-toast-show" : ""}`}>
      <span>{toast.message}</span>
      <button className="um-toast-close" onClick={onClose}>×</button>
    </div>
  );
}

// ── StatusBadge ───────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const iconMap = { active: "fa-check-circle", inactive: "fa-times-circle", pending: "fa-clock" };
  return (
    <span className={`um-status-badge um-status-${status}`}>
      <i className={`fas ${iconMap[status] || "fa-circle"}`}></i>
      {" "}{status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

// ── RoleBadge ─────────────────────────────────────────────────────────────────
function RoleBadge({ role }) {
  return <span className={`um-role-badge um-role-${(role || "").toLowerCase()}`}>{role}</span>;
}

// ── Main Component ────────────────────────────────────────────────────────────
function UserManagement() {
  const [users, setUsers]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage]   = useState(1);
  const [modal, setModal]           = useState(null); // "view"|"edit"|"create"|"delete"
  const [selectedUser, setSelectedUser] = useState(null);
  const [form, setForm]             = useState({ name: "", email: "", role: "Staff", password: "" });
  const [saving, setSaving]         = useState(false);
  const [formError, setFormError]   = useState("");
  const [toast, setToast]           = useState(null);
  const toastTimer                  = useRef(null);

  // ── fetch ──────────────────────────────────────────────────────────────────
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "users"));
      setUsers(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error("Failed to load users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  // ── toast ──────────────────────────────────────────────────────────────────
  const showToast = (message, type = "success") => {
    clearTimeout(toastTimer.current);
    setToast({ message, type, visible: true });
    toastTimer.current = setTimeout(() => setToast(null), 3500);
  };

  // ── filter + paginate ──────────────────────────────────────────────────────
  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    const matchSearch = !q ||
      (u.name || "").toLowerCase().includes(q) ||
      (u.email || "").toLowerCase().includes(q) ||
      (u.role || "").toLowerCase().includes(q);
    const matchRole   = roleFilter   === "all" || u.role   === roleFilter;
    const matchStatus = statusFilter === "all" || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const safePage   = Math.min(currentPage, totalPages);
  const startIdx   = (safePage - 1) * ROWS_PER_PAGE;
  const pageUsers  = filtered.slice(startIdx, startIdx + ROWS_PER_PAGE);

  const handleSearch = (val) => { setSearch(val); setCurrentPage(1); };
  const handleRoleFilter   = (v) => { setRoleFilter(v);   setCurrentPage(1); };
  const handleStatusFilter = (v) => { setStatusFilter(v); setCurrentPage(1); };

  // ── modals ─────────────────────────────────────────────────────────────────
  const openView = (u) => { setSelectedUser(u); setModal("view"); };
  const openEdit = (u) => {
    setSelectedUser(u);
    setForm({ name: u.name || "", email: u.email || "", role: u.role || "Staff", password: "" });
    setFormError(""); setModal("edit");
  };
  const openCreate = () => {
    setForm({ name: "", email: "", role: "Staff", password: "" });
    setFormError(""); setModal("create");
  };
  const openDelete = (u) => { setSelectedUser(u); setModal("delete"); };
  const closeModal = () => { setModal(null); setSelectedUser(null); setFormError(""); };

  // ── save edit ──────────────────────────────────────────────────────────────
  const handleSaveEdit = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      setFormError("Please fill in all required fields."); return;
    }
    if (form.password) {
      const pwd = form.password;
      if (pwd.length < 8 || !/[A-Z]/.test(pwd) || !/[0-9]/.test(pwd) || !/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) {
        setFormError("Invalid password. Must have 8+ characters, 1 uppercase, 1 number, and 1 special char.");
        return;
      }
    }
    setSaving(true); setFormError("");
    try {
      await updateDoc(doc(db, "users", selectedUser.id), {
        name: form.name, email: form.email, role: form.role,
      });
      setUsers((prev) => prev.map((u) =>
        u.id === selectedUser.id ? { ...u, name: form.name, email: form.email, role: form.role } : u
      ));
      await logAudit({ user: auth.currentUser?.email || "Admin", role: "Admin", action: "Updated user account", target: form.name });
      closeModal();
      showToast(`✅ ${form.name}'s information has been updated!`, "success");
    } catch (err) {
      setFormError("Could not save changes. Please try again.");
    } finally { setSaving(false); }
  };

  // ── create user ────────────────────────────────────────────────────────────
  const handleSaveCreate = async () => {
    if (!form.email || !form.password) { setFormError("Email and password are required."); return; }
    
    const pwd = form.password;
    if (pwd.length < 8 || !/[A-Z]/.test(pwd) || !/[0-9]/.test(pwd) || !/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) {
      setFormError("Invalid password. Must have 8+ characters, 1 uppercase, 1 number, and 1 special char.");
      return;
    }
    
    setSaving(true); setFormError("");
    const secondaryApp  = initializeApp(firebaseConfig, `Secondary-${Date.now()}`);
    const secondaryAuth = getAuth(secondaryApp);
    try {
      const credential = await createUserWithEmailAndPassword(secondaryAuth, form.email, form.password);
      const newUid = credential.user.uid;
      const accessMap = { Admin: "Full System Access", Staff: "Limited Access", Family: "View Only" };
      const newUser = {
        name: form.name || "New User", email: form.email, role: form.role,
        status: "active", lastLogin: "—",
        created: new Date().toISOString().slice(0, 10),
        access: accessMap[form.role] || "View Only",
      };
      await setDoc(doc(db, "users", newUid), newUser);
      setUsers((prev) => [...prev, { id: newUid, ...newUser }]);
      await logAudit({ user: auth.currentUser?.email || "Admin", role: "Admin", action: "Created user account", target: form.name || form.email });
      closeModal();
      showToast(`✅ ${form.name || form.email} has been created successfully!`, "success");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") setFormError("That email is already registered.");
      else if (err.code === "auth/weak-password")   setFormError("Password should be at least 6 characters.");
      else setFormError("Could not create user. Please try again.");
    } finally {
      await secondaryAuth.signOut().catch(() => {});
      await deleteApp(secondaryApp).catch(() => {});
      setSaving(false);
    }
  };

  // ── delete ─────────────────────────────────────────────────────────────────
  const handleConfirmDelete = async () => {
    if (!selectedUser) return;
    try {
      await deleteDoc(doc(db, "users", selectedUser.id));
      setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
      await logAudit({ user: auth.currentUser?.email || "Admin", role: "Admin", action: "Deleted user account", target: selectedUser.name });
      closeModal();
      showToast(`✅ ${selectedUser.name} has been deleted.`, "success");
    } catch (err) {
      showToast("❌ Could not delete user. Please try again.", "error");
    }
  };

  // ── toggle status ──────────────────────────────────────────────────────────
  const toggleStatus = async (u) => {
    const newStatus = u.status === "active" ? "inactive" : "active";
    try {
      await updateDoc(doc(db, "users", u.id), { status: newStatus });
      setUsers((prev) => prev.map((x) => x.id === u.id ? { ...x, status: newStatus } : x));
      await logAudit({ user: auth.currentUser?.email || "Admin", role: "Admin", action: newStatus === "active" ? "Activated user" : "Deactivated user", target: u.name });
      showToast(`✅ ${u.name} is now ${newStatus}.`, "success");
    } catch (err) {
      showToast("❌ Failed to update status.", "error");
    }
  };

  // ── pagination buttons ─────────────────────────────────────────────────────
  const pageButtons = [];
  for (let i = 1; i <= totalPages; i++) pageButtons.push(i);

  // ── render ─────────────────────────────────────────────────────────────────
  return (
    <div className="um-wrapper">
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Top Bar */}
      <div className="um-topbar">
        <div className="um-topbar-left">
          <h1 className="um-title">User Management <span className="um-title-star">✦</span></h1>
          <p className="um-greeting">Manage system users and their permissions</p>
        </div>
        <div className="um-topbar-right">
          <div className="um-date-badge">
            <i className="fas fa-calendar-alt"></i> {MONTH_YEAR}
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="um-card">

        {/* Card Header */}
        <div className="um-card-header">
          <div className="um-card-header-left">
            <h2 className="um-card-title">
              <i className="fas fa-users" style={{ color: "#d4af37", marginRight: 8 }}></i>
              All Users
            </h2>
            <span className="um-user-count">{filtered.length} total</span>
          </div>
          <div className="um-card-header-right">
            <button className="um-btn-primary" onClick={openCreate}>
              <i className="fas fa-user-plus"></i> Create User
            </button>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="um-search-filter-bar">
          <div className="um-search-wrapper">
            <i className="fas fa-search um-search-icon"></i>
            <input
              type="text"
              className="um-search-input"
              placeholder="Search by name, email, or role..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {search && (
              <button className="um-clear-btn" onClick={() => handleSearch("")}>
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
          <div className="um-filter-group">
            <select className="um-filter-select" value={roleFilter} onChange={(e) => handleRoleFilter(e.target.value)}>
              <option value="all">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Staff">Staff</option>
              <option value="Family">Family</option>
            </select>
            <select className="um-filter-select" value={statusFilter} onChange={(e) => handleStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="um-table-wrapper">
          <table className="um-table">
            <thead>
              <tr>
                <th><i className="fas fa-user"></i> User</th>
                <th><i className="fas fa-envelope"></i> Email</th>
                <th><i className="fas fa-briefcase"></i> Role</th>
                <th><i className="fas fa-circle"></i> Status</th>
                <th><i className="fas fa-clock"></i> Last Login</th>
                <th style={{ textAlign: "center" }}><i className="fas fa-cog"></i> Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={6} className="um-empty-row">
                    <i className="fas fa-spinner fa-spin"></i> Loading users...
                  </td>
                </tr>
              )}
              {!loading && pageUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className="um-empty-row">
                    <i className="fas fa-search"></i><br />No users found matching your criteria
                  </td>
                </tr>
              )}
              {!loading && pageUsers.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div className="um-user-cell">
                      <div className={`um-avatar-sm um-avatar-${pickColor(u.name)}`}>
                        {getInitials(u.name)}
                      </div>
                      <span>{u.name}</span>
                    </div>
                  </td>
                  <td className="um-email-cell">{u.email}</td>
                  <td><RoleBadge role={u.role} /></td>
                  <td><StatusBadge status={u.status || "inactive"} /></td>
                  <td className="um-lastlogin-cell">{u.lastLogin || "—"}</td>
                  <td>
                    <div className="um-action-btns">
                      <button className="um-act-btn um-act-view"  onClick={() => openView(u)}    title="View">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="um-act-btn um-act-edit"  onClick={() => openEdit(u)}    title="Edit">
                        <i className="fas fa-pen"></i>
                      </button>
                      <button
                        className={`um-act-btn ${u.status === "active" ? "um-act-deactivate" : "um-act-activate"}`}
                        onClick={() => toggleStatus(u)}
                        title={u.status === "active" ? "Deactivate" : "Activate"}
                      >
                        <i className={`fas ${u.status === "active" ? "fa-user-slash" : "fa-user-check"}`}></i>
                      </button>
                      <button className="um-act-btn um-act-delete" onClick={() => openDelete(u)}  title="Delete">
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="um-pagination">
          <div className="um-pagination-info">
            Showing <strong>{filtered.length === 0 ? 0 : startIdx + 1}</strong> to{" "}
            <strong>{Math.min(startIdx + ROWS_PER_PAGE, filtered.length)}</strong> of{" "}
            <strong>{filtered.length}</strong> users
          </div>
          <div className="um-pagination-controls">
            <button
              className="um-page-btn"
              disabled={safePage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            {pageButtons.map((n) => (
              <button
                key={n}
                className={`um-page-btn ${n === safePage ? "um-page-active" : ""}`}
                onClick={() => setCurrentPage(n)}
              >
                {n}
              </button>
            ))}
            <button
              className="um-page-btn"
              disabled={safePage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="um-footer">
        <i className="fas fa-dove"></i> Cherubim of Heaven Memorial Park · Admin Dashboard v2.0 <i className="fas fa-dove"></i>
      </div>

      {/* ── VIEW MODAL ── */}
      {modal === "view" && selectedUser && (
        <div className="um-overlay" onClick={closeModal}>
          <div className="um-modal" onClick={(e) => e.stopPropagation()}>
            <div className="um-view-header">
              <div className={`um-view-avatar um-avatar-${pickColor(selectedUser.name)}`}>
                {getInitials(selectedUser.name)}
              </div>
              <div className="um-view-info">
                <h3 className="um-view-name">{selectedUser.name}</h3>
                <div className="um-view-email">{selectedUser.email}</div>
              </div>
            </div>
            <div className="um-view-details">
              <div className="um-detail-item">
                <div className="um-detail-label">User ID</div>
                <div className="um-detail-value">USR-{String(selectedUser.id).slice(0, 8).toUpperCase()}</div>
              </div>
              <div className="um-detail-item">
                <div className="um-detail-label">Role</div>
                <div className="um-detail-value"><RoleBadge role={selectedUser.role} /></div>
              </div>
              <div className="um-detail-item">
                <div className="um-detail-label">Status</div>
                <div className="um-detail-value"><StatusBadge status={selectedUser.status || "inactive"} /></div>
              </div>
              <div className="um-detail-item">
                <div className="um-detail-label">Created</div>
                <div className="um-detail-value">{selectedUser.created || "—"}</div>
              </div>
              <div className="um-detail-item">
                <div className="um-detail-label">Last Login</div>
                <div className="um-detail-value">{selectedUser.lastLogin || "—"}</div>
              </div>
              <div className="um-detail-item">
                <div className="um-detail-label">Access Level</div>
                <div className="um-detail-value">{selectedUser.access || "—"}</div>
              </div>
            </div>
            <div className="um-modal-footer">
              <button className="um-btn-cancel" onClick={closeModal}>Close</button>
              <button className="um-btn-primary" onClick={() => openEdit(selectedUser)}>
                <i className="fas fa-pen"></i> Edit User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── EDIT MODAL ── */}
      {modal === "edit" && selectedUser && (
        <div className="um-overlay" onClick={closeModal}>
          <div className="um-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="um-modal-title">Edit User</h3>
            <p className="um-modal-sub">Update user information</p>
            <div className="um-form-group">
              <label>Full Name</label>
              <input type="text" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="um-form-group">
              <label>Email</label>
              <input type="email" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="um-form-row">
              <div className="um-form-group">
                <label>Role</label>
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                  <option value="Admin">Admin</option>
                  <option value="Staff">Staff</option>
                  <option value="Family">Family</option>
                </select>
              </div>
              <div className="um-form-group">
                <label>New Password <span className="um-label-hint">(leave blank to keep)</span></label>
                <input type="password" value={form.password} placeholder="••••••••"
                  onChange={(e) => setForm({ ...form, password: e.target.value })} />
              </div>
            </div>
            {formError && <p className="um-form-error">{formError}</p>}
            <div className="um-modal-footer">
              <button className="um-btn-cancel" onClick={closeModal}>Cancel</button>
              <button className="um-btn-primary" onClick={handleSaveEdit} disabled={saving}>
                <i className="fas fa-save"></i> {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── CREATE MODAL ── */}
      {modal === "create" && (
        <div className="um-overlay" onClick={closeModal}>
          <div className="um-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="um-modal-title">Create User</h3>
            <p className="um-modal-sub">Enter the details for the new user account</p>
            <div className="um-form-group">
              <label>Full Name</label>
              <input type="text" value={form.name} placeholder="e.g., John Doe"
                onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="um-form-group">
              <label>Email</label>
              <input type="email" value={form.email} placeholder="e.g., john@cherubim.ph"
                onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="um-form-row">
              <div className="um-form-group">
                <label>Role</label>
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                  <option value="Admin">Admin</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>
              <div className="um-form-group">
                <label>Password</label>
                <input type="password" value={form.password} placeholder="••••••••"
                  onChange={(e) => setForm({ ...form, password: e.target.value })} />
              </div>
            </div>
            {formError && <p className="um-form-error">{formError}</p>}
            <div className="um-modal-footer">
              <button className="um-btn-cancel" onClick={closeModal}>Cancel</button>
              <button className="um-btn-primary" onClick={handleSaveCreate} disabled={saving}>
                <i className="fas fa-check"></i> {saving ? "Creating…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE MODAL ── */}
      {modal === "delete" && selectedUser && (
        <div className="um-overlay" onClick={closeModal}>
          <div className="um-modal um-modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="um-modal-icon-danger">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h3 className="um-modal-title">Delete User?</h3>
            <p className="um-modal-sub">
              Are you sure you want to delete <strong>{selectedUser.name}</strong>?
              This action cannot be undone.
            </p>
            <div className="um-modal-footer">
              <button className="um-btn-cancel" onClick={closeModal}>Cancel</button>
              <button className="um-btn-danger" onClick={handleConfirmDelete}>
                <i className="fas fa-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;