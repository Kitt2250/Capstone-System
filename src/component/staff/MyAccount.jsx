import { useState } from "react";
import "./my-account.css";

function SMyAccount() {
  const [form, setForm] = useState({
    fullName: "Juan Dela Cruz",
    email: "staff@cherubim.ph",
    phone: "0918-234-5678",
    address: "Hagonoy, Bulacan",
    employeeId: "EMP-0042",
    department: "Operations",
    position: "Cemetery Staff",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const [saved, setSaved] = useState(false);
  const [pwSaved, setPwSaved] = useState(false);
  const [pwError, setPwError] = useState("");

  const handleFormChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handlePasswordChange = (e) => {
    setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setPwError("");
    setPwSaved(false);
  };

  const handleUpdatePassword = (e) => {
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
    setPwSaved(true);
    setPasswords({ current: "", newPass: "", confirm: "" });
    setTimeout(() => setPwSaved(false), 3000);
  };

  return (
    <div className="sma-page">
      <div className="sma-topbar">
        <span>Cherubim of Heaven Memorial Park</span>
      </div>

      <div className="sma-header">
        <h1>My Account</h1>
        <p>Manage your account settings</p>
      </div>

      {/* Profile Information */}
      <div className="sma-card">
        <div className="sma-card-heading">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span>Profile Information</span>
        </div>

        <div className="sma-profile-row">
          <div className="sma-profile-avatar">JDC</div>
          <div>
            <p className="sma-profile-name">{form.fullName}</p>
            <p className="sma-profile-role">Staff Account</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="sma-form">
          <div className="sma-field">
            <label className="sma-label">Full Name</label>
            <input
              type="text"
              name="fullName"
              className="sma-input"
              value={form.fullName}
              onChange={handleFormChange}
            />
          </div>

          <div className="sma-field">
            <label className="sma-label">Email</label>
            <input
              type="email"
              name="email"
              className="sma-input sma-input--disabled"
              value={form.email}
              disabled
            />
            <p className="sma-field-note">Contact your administrator to change your email</p>
          </div>

          <div className="sma-form-row">
            <div className="sma-field">
              <label className="sma-label">Phone</label>
              <input
                type="text"
                name="phone"
                className="sma-input"
                value={form.phone}
                onChange={handleFormChange}
              />
            </div>
            <div className="sma-field">
              <label className="sma-label">Address</label>
              <input
                type="text"
                name="address"
                className="sma-input"
                value={form.address}
                onChange={handleFormChange}
              />
            </div>
          </div>

          <div className="sma-form-row sma-form-row--three">
            <div className="sma-field">
              <label className="sma-label">Employee ID</label>
              <input
                type="text"
                className="sma-input sma-input--disabled"
                value={form.employeeId}
                disabled
              />
            </div>
            <div className="sma-field">
              <label className="sma-label">Department</label>
              <input
                type="text"
                className="sma-input sma-input--disabled"
                value={form.department}
                disabled
              />
            </div>
            <div className="sma-field">
              <label className="sma-label">Position</label>
              <input
                type="text"
                className="sma-input sma-input--disabled"
                value={form.position}
                disabled
              />
            </div>
          </div>

          <button type="submit" className="sma-save-btn">
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
      <div className="sma-card">
        <div className="sma-card-heading">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>Change Password</span>
        </div>

        <form onSubmit={handleUpdatePassword} className="sma-form">
          <div className="sma-field">
            <label className="sma-label">Current Password</label>
            <input
              type="password"
              name="current"
              className="sma-input"
              value={passwords.current}
              onChange={handlePasswordChange}
              placeholder="Enter current password"
            />
          </div>

          <div className="sma-field">
            <label className="sma-label">New Password</label>
            <input
              type="password"
              name="newPass"
              className="sma-input"
              value={passwords.newPass}
              onChange={handlePasswordChange}
              placeholder="Enter new password"
            />
          </div>

          <div className="sma-field">
            <label className="sma-label">Confirm New Password</label>
            <input
              type="password"
              name="confirm"
              className="sma-input"
              value={passwords.confirm}
              onChange={handlePasswordChange}
              placeholder="Confirm new password"
            />
          </div>

          {pwError && <p className="sma-error">{pwError}</p>}

          <button type="submit" className="sma-pw-btn">
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

      <p className="sma-footer-note">
        Employee ID, Department, and Position are managed by the administrator. Contact admin for changes.
      </p>
    </div>
  );
}

export default SMyAccount;