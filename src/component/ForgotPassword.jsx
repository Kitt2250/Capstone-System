import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase.config";
import "./forgot-password.css";

function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      if (err.code === "auth/user-not-found") {
        setError("No account found with that email.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fp-wrapper">
      <div className="fp-topbar">
        <span>forgot password</span>
      </div>

      <div className="fp-body">
        <div className="fp-center">

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

          <div className="fp-card">
            {!submitted ? (
              <>
                <div className="fp-icon-wrap">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                    fill="none" stroke="#6b7280" strokeWidth="1.8"
                    strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <h2 className="fp-card-title">Forgot your password?</h2>
                <p className="fp-card-desc">
                  Enter your email address and we'll send you a link to reset your password.
                </p>

                <form onSubmit={handleSubmit} className="fp-form">
                  <div className="fp-field">
                    <label htmlFor="fp-email" className="fp-label">Email</label>
                    <input
                      id="fp-email"
                      type="email"
                      className="fp-input"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(""); }}
                      required
                    />
                  </div>

                  {error && (
                    <p style={{ color: "#dc2626", fontSize: "13px", margin: "-8px 0 4px" }}>
                      {error}
                    </p>
                  )}

                  <button type="submit" className="fp-submit-btn" disabled={loading}>
                    {loading ? "Sending..." : "Send Reset Link"}
                  </button>

                  <button type="button" className="fp-back-btn" onClick={onBack}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
                      <line x1="19" y1="12" x2="5" y2="12" />
                      <polyline points="12 19 5 12 12 5" />
                    </svg>
                    Back to Sign In
                  </button>
                </form>
              </>
            ) : (
              <>
                <div className="fp-success-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                    fill="none" stroke="#16a34a" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h2 className="fp-card-title">Check your email</h2>
                <p className="fp-card-desc">
                  We sent a password reset link to <strong>{email}</strong>. Please check your inbox.
                </p>
                <button type="button" className="fp-submit-btn" onClick={onBack}>
                  Back to Sign In
                </button>
                <button
                  type="button"
                  className="fp-resend-btn"
                  onClick={() => setSubmitted(false)}
                >
                  Didn't receive it? Try again
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;