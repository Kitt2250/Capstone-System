import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth, db } from "../../firebase.config";
import "./my-account.css";

function getInitials(name) {
  return (name || "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function MyAccount() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    relationship: "",
  });

  const [loading, setLoading] = useState(true);
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const [saved, setSaved] = useState(false);
  const [pwSaved, setPwSaved] = useState(false);
  const [pwError, setPwError] = useState("");
  const [saveError, setSaveError] = useState("");

  // Fetch the logged-in user's real Firestore data
  useEffect(() => {
    const fetchUser = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) {
        setLoading(false);
        return;
      }
      try {
        const userSnap = await getDoc(doc(db, "users", uid));
        if (userSnap.exists()) {
          const data = userSnap.data();
          setForm({
            fullName: data.name || "",
            email: data.email || auth.currentUser.email || "",
            phone: data.phone || "",
            address: data.address || "",
            relationship: data.relationship || "",
          });
        }
      } catch (err) {
        console.error("Failed to load account info:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleFormChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSaved(false);
    setSaveError("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    try {
      await updateDoc(doc(db, "users", uid), {
        name: form.fullName,
        phone: form.phone,
        address: form.address,
        relationship: form.relationship,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Failed to save account info:", err);
      setSaveError("Could not save changes. Please try again.");
    }
  };

  const handlePasswordChange = (e) => {
    setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setPwError("");
    setPwSaved(false);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!passwords.current || !passwords.newPass || !passwords.confirm) {
      setPwError("Please fill in all password fields.");
      return;
    }
    if (passwords.newPass !== passwords.confirm) {
      setPwError("New passwords do not match.");
      return;
    }
    if (passwords.newPass.length < 6) {
      setPwError("Password must be at least 6 characters.");
      return;
    }

    try {
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(user.email, passwords.current);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, passwords.newPass);

      setPwSaved(true);
      setPasswords({ current: "", newPass: "", confirm: "" });
      setTimeout(() => setPwSaved(false), 3000);
    } catch (err) {
      console.error("Failed to update password:", err);
      if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setPwError("Current password is incorrect.");
      } else {
        setPwError("Could not update password. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="ma-main">
        <div className="ma-topbar">
          <span>Cherubim of Heaven Memorial Park</span>
        </div>
        <p style={{ padding: "20px 0", color: "#6b7280", fontSize: "13px" }}>
          Loading account information...
        </p>
      </div>
    );
  }

  return (
    <div className="ma-main">
      <div className="ma-topbar">
        <span>Cherubim of Heaven Memorial Park</span>
      </div>

      <div className="ma-header">
        <h1 className="ma-title">My Account</h1>
        <p className="ma-subtitle">Manage your account information</p>
      </div>

      {/* Account Information */}
      <div className="ma-card">
        <div className="ma-card-heading">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span>Account Information</span>
        </div>

        {/* Profile Row */}
        <div className="ma-profile-row">
          <div className="ma-profile-avatar">{getInitials(form.fullName)}</div>
          <div>
            <p className="ma-profile-name">{form.fullName}</p>
            <p className="ma-profile-role">Family Account</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="ma-form">
          <div className="ma-field">
            <label className="ma-label">Full Name</label>
            <input
              type="text"
              name="fullName"
              className="ma-input"
              value={form.fullName}
              onChange={handleFormChange}
            />
          </div>

          <div className="ma-field">
            <label className="ma-label">Email</label>
            <input
              type="email"
              name="email"
              className="ma-input ma-input--disabled"
              value={form.email}
              disabled
            />
            <p className="ma-field-note">Contact administration to change your email</p>
          </div>

          <div className="ma-field">
            <label className="ma-label">Phone</label>
            <input
              type="text"
              name="phone"
              className="ma-input"
              value={form.phone}
              onChange={handleFormChange}
            />
          </div>

          <div className="ma-field">
            <label className="ma-label">Address</label>
            <input
              type="text"
              name="address"
              className="ma-input"
              value={form.address}
              onChange={handleFormChange}
            />
          </div>

          <div className="ma-field">
            <label className="ma-label">Relationship to Deceased</label>
            <input
              type="text"
              name="relationship"
              className="ma-input"
              value={form.relationship}
              onChange={handleFormChange}
            />
          </div>

          {saveError && <p className="ma-error">{saveError}</p>}

          <button type="submit" className="ma-save-btn">
            {saved ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Saved!
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                Save Changes
              </>
            )}
          </button>
        </form>
      </div>

      {/* Change Password */}
      <div className="ma-card">
        <div className="ma-card-heading">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>Change Password</span>
        </div>

        <form onSubmit={handleUpdatePassword} className="ma-form">
          <div className="ma-field">
            <label className="ma-label">Current Password</label>
            <input
              type="password"
              name="current"
              className="ma-input"
              value={passwords.current}
              onChange={handlePasswordChange}
              placeholder="Enter current password"
            />
          </div>

          <div className="ma-field">
            <label className="ma-label">New Password</label>
            <input
              type="password"
              name="newPass"
              className="ma-input"
              value={passwords.newPass}
              onChange={handlePasswordChange}
              placeholder="Enter new password"
            />
          </div>

          <div className="ma-field">
            <label className="ma-label">Confirm New Password</label>
            <input
              type="password"
              name="confirm"
              className="ma-input"
              value={passwords.confirm}
              onChange={handlePasswordChange}
              placeholder="Confirm new password"
            />
          </div>

          {pwError && <p className="ma-error">{pwError}</p>}

          <button type="submit" className="ma-pw-btn">
            {pwSaved ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Password Updated!
              </>
            ) : (
              "Update Password"
            )}
          </button>
        </form>
      </div>

      {/* Footer Note */}
      <p className="ma-footer-note">
        Your account has view-only access. Only administrators and staff can modify burial records and process transactions.
      </p>
    </div>
  );
}

export default MyAccount;