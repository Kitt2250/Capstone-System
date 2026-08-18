import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { auth } from "../firebase.config";
import heavenBg from "../assets/heaven_background.jpg";
import "./forgot-password.css"; // We reuse the CSS from forgot-password

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const oobCode = searchParams.get("oobCode");

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [invalidCode, setInvalidCode] = useState(false);
  const [verifying, setVerifying] = useState(true);

  // 1. Verify the code and get the user's email
  useEffect(() => {
    if (!oobCode) {
      setInvalidCode(true);
      setVerifying(false);
      return;
    }
    
    verifyPasswordResetCode(auth, oobCode)
      .then((accountEmail) => {
        setEmail(accountEmail);
        setVerifying(false);
      })
      .catch((err) => {
        console.error(err);
        setInvalidCode(true);
        setVerifying(false);
      });
  }, [oobCode]);

  // 2. Auto-redirect on success
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/login", { replace: true });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate password complexity
    if (newPassword.length < 8 || !/[A-Z]/.test(newPassword) || !/[0-9]/.test(newPassword) || !/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
      setError("Password must have 8+ characters, 1 uppercase, 1 number, and 1 special character.");
      return;
    }

    setLoading(true);
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError("Failed to reset password. The link might be expired or invalid.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fp-wrapper" style={{ backgroundImage: `url(${heavenBg})` }}>
      <div className="fp-overlay" />

      <div className="fp-center">
        {/* ── Brand ── */}
        <div className="fp-brand">
          <div className="fp-logo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
              fill="none" stroke="white" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
              <circle cx="12" cy="8" r="3" />
              <path d="M6 20v-2a6 6 0 0 1 12 0v2" />
            </svg>
          </div>
          <h1 className="fp-title">Cherubim of Heaven</h1>
          <p className="fp-subtitle">Memorial Services Management System</p>
        </div>

        {/* ── Card ── */}
        <div className="fp-card">
          {verifying ? (
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <div style={{ color: "#64748b", fontSize: "0.95rem" }}>Verifying secure link...</div>
            </div>
          ) : invalidCode ? (
            <>
              <div className="fp-icon-wrap" style={{ backgroundColor: "#fee2e2" }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                  fill="none" stroke="#ef4444" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              </div>
              <h2 className="fp-card-title">Invalid or Expired Link</h2>
              <p className="fp-card-desc">
                Your password reset link is invalid or has expired. Please request a new one.
              </p>
              <button type="button" className="fp-submit-btn" onClick={() => navigate("/forgot-password")}>
                Request New Link
              </button>
            </>
          ) : success ? (
            <>
              <div className="fp-success-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                  fill="none" stroke="#16a34a" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h2 className="fp-card-title">Password Reset!</h2>
              <p className="fp-card-desc">
                Your password has been successfully updated. You will be redirected to the login page shortly.
              </p>
              <button type="button" className="fp-submit-btn" onClick={() => navigate("/login", { replace: true })}>
                Go to Sign In
              </button>
            </>
          ) : (
            <>
              <div className="fp-icon-wrap">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                  fill="none" stroke="#2563eb" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>

              <h2 className="fp-card-title">Create New Password</h2>
              <p className="fp-card-desc">
                Enter a new password for <strong>{email}</strong>
              </p>

              <form onSubmit={handleSubmit} className="fp-form">
                <div className="fp-field">
                  <label htmlFor="fp-password" className="fp-label">New Password</label>
                  <div style={{ position: "relative" }}>
                    <input
                      id="fp-password"
                      type={showPassword ? "text" : "password"}
                      className="fp-input"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => { setNewPassword(e.target.value); setError(""); }}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        color: "#9ca3af",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "4px"
                      }}
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      )}
                    </button>
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "6px" }}>
                    Must be at least 8 characters long, contain 1 uppercase letter, 1 number, and 1 special character.
                  </div>
                </div>

                {error && <p className="fp-error">{error}</p>}

                <button type="submit" className="fp-submit-btn" disabled={loading}>
                  {loading ? "Saving..." : "Save New Password"}
                </button>
              </form>
            </>
          )}
        </div>

      </div>
    </div>
  );
}

export default ResetPassword;
