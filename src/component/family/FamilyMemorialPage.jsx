import { useState } from "react";
import "./family-memorial-page.css";

const INITIAL_TRIBUTES = [
  {
    id: 1,
    name: "Ana Reyes",
    date: "March 10, 2026",
    message: "Your garden still blooms, Lolo. We take care of it just the way you taught us. We miss your stories every evening.",
    type: "message",
  },
  {
    id: 2,
    name: "Marco Reyes",
    date: "February 14, 2026",
    message: "Happy birthday in heaven, Papa. We celebrated with your favorite lechon today. The whole family was here.",
    type: "message",
  },
  {
    id: 3,
    name: "Sofia Reyes",
    date: "January 5, 2026",
    message: "I graduated from college, Lolo! I know you would have been so proud. This diploma is for you.",
    type: "message",
  },
];

function FamilyMemorialPage({ embedded = false }) {
  const [showModal, setShowModal]   = useState(false);
  const [modalTab, setModalTab]     = useState("message");
  const [tributeText, setTributeText] = useState("");
  const [photoFile, setPhotoFile]   = useState(null);
  const [submitted, setSubmitted]   = useState(false);
  const [pending, setPending]       = useState(2);
  const [tributes, setTributes]     = useState(INITIAL_TRIBUTES);

  const handleSubmit = () => {
    if (modalTab === "message" && !tributeText.trim()) return;
    if (modalTab === "photo"   && !photoFile) return;
    setPending((p) => p + 1);
    setSubmitted(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setTimeout(() => {
      setSubmitted(false);
      setTributeText("");
      setPhotoFile(null);
      setModalTab("message");
    }, 200);
  };

  const content = (
    <>
      {/* Top Bar */}
      <div className="fmp-topbar">
        <span>Cherubim of Heaven Memorial Park</span>
      </div>

      {/* Memorial Hero Card */}
      <div className="fmp-hero-card">
        <div className="fmp-hero-avatar">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="#d1d5db" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>

        <div className="fmp-hero-info">
          <h1 className="fmp-hero-name">Alejandro Reyes Sr.</h1>
          <p className="fmp-hero-dates">May 12, 1945 — November 20, 2025</p>
          <div className="fmp-hero-location-row">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>Section A, Block 3, Lot 142</span>
          </div>
          <p className="fmp-hero-quote">"A loving father, grandfather, and friend to all."</p>
        </div>

        <button className="fmp-tribute-btn" onClick={() => setShowModal(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Leave a Tribute
        </button>
      </div>

      {/* Pending Banner */}
      {pending > 0 && (
        <div className="fmp-banner">
          <div className="fmp-banner-dot" />
          <div>
            <p className="fmp-banner-title">
              You have {pending} tribute{pending > 1 ? "s" : ""} pending approval
            </p>
            <p className="fmp-banner-sub">
              Tributes are reviewed by the administrator before being published.
            </p>
          </div>
          <button className="fmp-banner-close" onClick={() => setPending(0)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}

      {/* Tributes Section */}
      <div className="fmp-section">
        <div className="fmp-section-header">
          <h2 className="fmp-section-title">Tributes & Messages</h2>
          <span className="fmp-section-count">{tributes.length}</span>
        </div>

        {tributes.length === 0 ? (
          <div className="fmp-empty">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <p className="fmp-empty-text">No tributes yet</p>
            <p className="fmp-empty-sub">Be the first to leave a message.</p>
          </div>
        ) : (
          <div className="fmp-tribute-list">
            {tributes.map((t) => (
              <div key={t.id} className="fmp-tribute-item">
                <div className="fmp-tribute-avatar">
                  {t.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div className="fmp-tribute-body">
                  <div className="fmp-tribute-meta">
                    <span className="fmp-tribute-name">{t.name}</span>
                    <span className="fmp-tribute-date">{t.date}</span>
                  </div>
                  <p className="fmp-tribute-msg">{t.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fmp-overlay" onClick={handleClose}>
          <div className="fmp-modal" onClick={(e) => e.stopPropagation()}>

            <div className="fmp-modal-header">
              <h3 className="fmp-modal-title">Submit a Tribute</h3>
              <button className="fmp-modal-close" onClick={handleClose}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {!submitted ? (
              <>
                <div className="fmp-modal-tabs">
                  <button
                    className={`fmp-modal-tab ${modalTab === "message" ? "active" : ""}`}
                    onClick={() => setModalTab("message")}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    Message
                  </button>
                  <button
                    className={`fmp-modal-tab ${modalTab === "photo" ? "active" : ""}`}
                    onClick={() => setModalTab("photo")}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    Photo
                  </button>
                </div>

                {modalTab === "message" ? (
                  <textarea
                    className="fmp-modal-textarea"
                    placeholder="Write your message..."
                    value={tributeText}
                    onChange={(e) => setTributeText(e.target.value)}
                    rows={5}
                  />
                ) : (
                  <label className="fmp-upload-zone">
                    <input type="file" accept="image/*"
                      className="fmp-upload-input"
                      onChange={(e) => setPhotoFile(e.target.files[0])} />
                    {photoFile ? (
                      <div className="fmp-upload-done">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                          stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{photoFile.name}</span>
                      </div>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                          stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                        <p className="fmp-upload-label">Click to upload a photo</p>
                        <p className="fmp-upload-hint">JPG, PNG up to 5MB</p>
                      </>
                    )}
                  </label>
                )}

                <p className="fmp-modal-note">
                  Tributes are reviewed by administration before being published to ensure appropriateness.
                </p>

                <div className="fmp-modal-actions">
                  <button className="fmp-modal-cancel" onClick={handleClose}>Cancel</button>
                  <button
                    className="fmp-modal-submit"
                    onClick={handleSubmit}
                    disabled={modalTab === "message" ? !tributeText.trim() : !photoFile}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    Submit
                  </button>
                </div>
              </>
            ) : (
              <div className="fmp-success">
                <div className="fmp-success-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="34" height="34">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <h4 className="fmp-success-title">Tribute Submitted</h4>
                <p className="fmp-success-sub">Your tribute will be visible after admin approval.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );

  if (embedded) return <div className="fmp-main">{content}</div>;

  return (
    <div className="fmp-wrapper">
      <main className="fmp-main">{content}</main>
    </div>
  );
}

export default FamilyMemorialPage;