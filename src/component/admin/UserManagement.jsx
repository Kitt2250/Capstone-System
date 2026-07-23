import { useState, useEffect } from "react";
import { initializeApp, deleteApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, auth, firebaseConfig } from "../../firebase.config";
import { logAudit } from "../../utils/logAudit";
import "./user-management.css";

function getInitials(name) {
  return (name || "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function EyeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z" />
    </svg>
  );
}

function ToggleStatusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <path d="M18 20a6 6 0 0 0-12 0" />
      <circle cx="12" cy="10" r="4" />
      <line x1="2" y1="2" x2="22" y2="22" />
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

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null); // "view" | "edit" | "create" | null
  const [selectedUser, setSelectedUser] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", role: "", password: "" });
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "users"));
      const userList = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setUsers(userList);
    } catch (err) {
      console.error("Failed to load users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      (u.name || "").toLowerCase().includes(q) ||
      (u.email || "").toLowerCase().includes(q) ||
      (u.role || "").toLowerCase().includes(q)
    );
  });

  const openView = (user) => {
    setSelectedUser(user);
    setModal("view");
  };

  const openEdit = (user) => {
    setSelectedUser(user);
    setForm({ name: user.name, email: user.email, role: user.role, password: "" });
    setFormError("");
    setModal("edit");
  };

  const openCreate = () => {
    setForm({ name: "", email: "", role: "", password: "" });
    setFormError("");
    setModal("create");
  };

  const closeModal = () => {
    setModal(null);
    setSelectedUser(null);
    setFormError("");
  };

  const handleSaveEdit = async () => {
    if (!selectedUser) return;
    setSaving(true);
    setFormError("");
    try {
      const userRef = doc(db, "users", selectedUser.id);
      await updateDoc(userRef, {
        name: form.name,
        email: form.email,
        role: form.role || selectedUser.role,
      });

      setUsers((prev) =>
        prev.map((u) =>
          u.id === selectedUser.id
            ? { ...u, name: form.name, email: form.email, role: form.role || u.role }
            : u
        )
      );

      await logAudit({
        user: auth.currentUser?.email || "Admin",
        role: "Admin",
        action: "Updated user account",
        target: form.name,
      });

      closeModal();
    } catch (err) {
      console.error("Failed to update user:", err);
      setFormError("Could not save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Creates the account using a temporary secondary Firebase app instance
  // so the currently logged-in admin does NOT get signed out/replaced by
  // the newly created user (a common Firebase client SDK gotcha).
  const handleSaveCreate = async () => {
    if (!form.email || !form.password) {
      setFormError("Email and password are required.");
      return;
    }

    setSaving(true);
    setFormError("");

    const secondaryApp = initializeApp(firebaseConfig, `Secondary-${Date.now()}`);
    const secondaryAuth = getAuth(secondaryApp);

    try {
      const credential = await createUserWithEmailAndPassword(
        secondaryAuth,
        form.email,
        form.password
      );
      const newUid = credential.user.uid;

      const newUserData = {
        name: form.name || "New User",
        email: form.email,
        role: form.role || "Family",
        status: "active",
        lastLogin: "—",
        created: new Date().toISOString().slice(0, 10),
        access: `${form.role || "Family"} Access`,
      };

      await setDoc(doc(db, "users", newUid), newUserData);

      setUsers((prev) => [...prev, { id: newUid, ...newUserData }]);

      await logAudit({
        user: auth.currentUser?.email || "Admin",
        role: "Admin",
        action: "Created user account",
        target: form.name || form.email,
      });

      closeModal();
    } catch (err) {
      console.error("Failed to create user:", err);
      if (err.code === "auth/email-already-in-use") {
        setFormError("That email is already registered.");
      } else if (err.code === "auth/weak-password") {
        setFormError("Password should be at least 6 characters.");
      } else {
        setFormError("Could not create user. Please try again.");
      }
    } finally {
      await secondaryAuth.signOut().catch(() => {});
      await deleteApp(secondaryApp).catch(() => {});
      setSaving(false);
    }
  };

  // Note: this only flips a Firestore flag. It does NOT actually disable
  // the person's ability to log in — that requires the Firebase Admin SDK
  // (a backend/Cloud Function), which the client app can't do directly.
  const toggleStatus = async (user) => {
    const newStatus = user.status === "active" ? "inactive" : "active";
    try {
      await updateDoc(doc(db, "users", user.id), { status: newStatus });
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u))
      );
      await logAudit({
        user: auth.currentUser?.email || "Admin",
        role: "Admin",
        action: newStatus === "active" ? "Activated user" : "Deactivated user",
        target: user.name,
      });
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  return (
    <div className="um-page">
      <div className="um-topbar">
        <span>Cherubim of Heaven Memorial Park</span>
      </div>
      <div className="um-header">
        <div>
          <h1>User Management</h1>
          <p>{users.length} total users</p>
        </div>
        <button className="um-create-btn" onClick={openCreate}>
          <span className="um-plus">+</span> Create User
        </button>
      </div>

      <div className="um-search-row">
        <div className="um-search-wrap">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            width="15" height="15" className="um-search-icon">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="um-table-card">
        <table className="um-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Login</th>
              <th className="um-actions-col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={6} className="um-no-results">Loading users...</td></tr>
            )}
            {!loading && filteredUsers.map((u) => (
              <tr key={u.id}>
                <td>
                  <div className="um-name-cell">
                    <div className="um-avatar">{getInitials(u.name)}</div>
                    <span>{u.name}</span>
                  </div>
                </td>
                <td className="um-email-cell">{u.email}</td>
                <td>
                  <span className={`um-role-badge um-role-${(u.role || "").toLowerCase()}`}>
                    {u.role}
                  </span>
                </td>
                <td>
                  <span className={`um-status ${u.status === "active" ? "um-status-active" : "um-status-inactive"}`}>
                    <span className="um-status-dot"></span>
                    {u.status === "active" ? "active" : "inactive"}
                  </span>
                </td>
                <td className="um-lastlogin-cell">{u.lastLogin}</td>
                <td>
                  <div className="um-action-icons">
                    <button className="um-icon-btn" title="View" onClick={() => openView(u)}>
                      <EyeIcon />
                    </button>
                    <button className="um-icon-btn" title="Edit" onClick={() => openEdit(u)}>
                      <EditIcon />
                    </button>
                    <button
                      className="um-icon-btn"
                      title={u.status === "active" ? "Deactivate" : "Activate"}
                      onClick={() => toggleStatus(u)}
                    >
                      <ToggleStatusIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!loading && filteredUsers.length === 0 && (
              <tr>
                <td colSpan={6} className="um-no-results">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* VIEW MODAL */}
      {modal === "view" && selectedUser && (
        <div className="um-modal-overlay" onClick={closeModal}>
          <div className="um-modal" onClick={(e) => e.stopPropagation()}>
            <div className="um-modal-header">
              <h2>User Details</h2>
              <button className="um-modal-close" onClick={closeModal}><CloseIcon /></button>
            </div>

            <div className="um-modal-user-row">
              <div className="um-modal-avatar">{getInitials(selectedUser.name)}</div>
              <div>
                <div className="um-modal-user-name">{selectedUser.name}</div>
                <div className="um-modal-user-email">{selectedUser.email}</div>
              </div>
            </div>

            <div className="um-modal-grid">
              <div>
                <div className="um-modal-label">User ID</div>
                <div className="um-modal-value">{selectedUser.id}</div>
              </div>
              <div>
                <div className="um-modal-label">Role</div>
                <span className={`um-role-badge um-role-${(selectedUser.role || "").toLowerCase()}`}>
                  {selectedUser.role}
                </span>
              </div>
              <div>
                <div className="um-modal-label">Status</div>
                <span className={`um-status ${selectedUser.status === "active" ? "um-status-active" : "um-status-inactive"}`}>
                  <span className="um-status-dot"></span>
                  {selectedUser.status === "active" ? "Active" : "Inactive"}
                </span>
              </div>
              <div>
                <div className="um-modal-label">Created</div>
                <div className="um-modal-value">{selectedUser.created}</div>
              </div>
              <div>
                <div className="um-modal-label">Last Login</div>
                <div className="um-modal-value">{selectedUser.lastLogin}</div>
              </div>
              <div>
                <div className="um-modal-label">Access Level</div>
                <div className="um-modal-value">{selectedUser.access}</div>
              </div>
            </div>

            <div className="um-modal-actions">
              <button className="um-btn-secondary" onClick={closeModal}>Close</button>
              <button className="um-btn-primary" onClick={() => openEdit(selectedUser)}>Edit User</button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {modal === "edit" && selectedUser && (
        <div className="um-modal-overlay" onClick={closeModal}>
          <div className="um-modal" onClick={(e) => e.stopPropagation()}>
            <div className="um-modal-header">
              <h2>Edit User</h2>
              <button className="um-modal-close" onClick={closeModal}><CloseIcon /></button>
            </div>

            <div className="um-form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="um-form-group">
              <label>Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="um-form-group">
              <label>Role</label>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="Admin">Admin</option>
                <option value="Staff">Staff</option>
                <option value="Family">Family</option>
              </select>
            </div>

            {formError && (
              <p style={{ color: "#dc2626", fontSize: "13px" }}>{formError}</p>
            )}

            <div className="um-modal-actions">
              <button className="um-btn-secondary" onClick={closeModal}>Cancel</button>
              <button className="um-btn-primary" onClick={handleSaveEdit} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE MODAL */}
      {modal === "create" && (
        <div className="um-modal-overlay" onClick={closeModal}>
          <div className="um-modal" onClick={(e) => e.stopPropagation()}>
            <div className="um-modal-header">
              <h2>Create User</h2>
              <button className="um-modal-close" onClick={closeModal}><CloseIcon /></button>
            </div>

            <div className="um-form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Enter full name"
              />
            </div>

            <div className="um-form-group">
              <label>Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Enter email"
              />
            </div>

            <div className="um-form-group">
              <label>Role</label>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="">Select role</option>
                <option value="Admin">Admin</option>
                <option value="Staff">Staff</option>
                <option value="Family">Family</option>
              </select>
            </div>

            <div className="um-form-group">
              <label>Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Enter password (min 6 characters)"
              />
            </div>

            {formError && (
              <p style={{ color: "#dc2626", fontSize: "13px" }}>{formError}</p>
            )}

            <div className="um-modal-actions">
              <button className="um-btn-secondary" onClick={closeModal}>Cancel</button>
              <button className="um-btn-primary" onClick={handleSaveCreate} disabled={saving}>
                {saving ? "Creating..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;