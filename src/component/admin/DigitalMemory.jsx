import { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase.config";
import { logAudit } from "../../utils/logAudit";
import "./digital-memory.css";

function MessageTypeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function PhotoTypeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function DigitalMemory() {
  const [tributes, setTributes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => {
    const fetchTributes = async () => {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(db, "tributes"));
        setTributes(snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })));
      } catch (err) {
        console.error("Failed to load tributes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTributes();
  }, []);

  const pendingCount = tributes.filter((t) => t.status === "pending").length;

  const tabs = [
    { key: "pending",  label: "Pending",  count: pendingCount },
    { key: "approved", label: "Approved", count: null },
    { key: "rejected", label: "Rejected", count: null },
    { key: "all",      label: "All",      count: null },
  ];

  const filteredTributes = tributes.filter((t) =>
    activeTab === "all" ? true : t.status === activeTab
  );

  const updateStatus = async (t, newStatus) => {
    try {
      await updateDoc(doc(db, "tributes", t.id), { status: newStatus });
      setTributes((prev) =>
        prev.map((item) => (item.id === t.id ? { ...item, status: newStatus } : item))
      );
      await logAudit({
        user: auth.currentUser?.email || "Admin",
        role: "Admin",
        action: newStatus === "approved" ? "Approved tribute" : "Rejected tribute",
        target: t.memorial,
      });
    } catch (err) {
      console.error("Failed to update tribute:", err);
    }
  };

  const handleApprove = (t) => updateStatus(t, "approved");
  const handleReject = (t) => updateStatus(t, "rejected");

  return (
    <div className="dm-page">
      <div className="dm-topbar">
        <span>Cherubim of Heaven Memorial Park</span>
      </div>
      <div className="dm-header">
        <h1>Digital Memory Management</h1>
        <p>{pendingCount} tributes pending approval</p>
      </div>

      <div className="dm-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`dm-tab ${activeTab === tab.key ? "dm-tab-active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
            {tab.count !== null && (
              <span className="dm-tab-count">{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      <div className="dm-list">
        {loading && <div className="dm-empty">Loading tributes...</div>}

        {!loading && filteredTributes.map((t) => (
          <div className="dm-card" key={t.id}>
            <div className="dm-card-body">
              <div className="dm-card-meta">
                <span className="dm-type-badge">
                  {t.type === "message" ? <MessageTypeIcon /> : <PhotoTypeIcon />}
                  {t.type === "message" ? "Message" : "Photo"}
                </span>
                <span className={`dm-status-badge dm-status-${t.status}`}>
                  {t.status}
                </span>
              </div>

              <div className="dm-memorial-line">
                <span className="dm-label">Memorial:</span> {t.memorial}
              </div>
              <div className="dm-submitted-line">
                <span className="dm-label">Submitted by:</span> {t.submittedBy}
              </div>

              <div className="dm-content-box">{t.content}</div>

              <div className="dm-date-line">
                <ClockIcon />
                {t.date}
              </div>
            </div>

            {t.status === "pending" && (
              <div className="dm-card-actions">
                <button className="dm-approve-btn" title="Approve" onClick={() => handleApprove(t)}>
                  <CheckIcon />
                </button>
                <button className="dm-reject-btn" title="Reject" onClick={() => handleReject(t)}>
                  <XIcon />
                </button>
              </div>
            )}
          </div>
        ))}

        {!loading && filteredTributes.length === 0 && (
          <div className="dm-empty">No tributes in this category.</div>
        )}
      </div>
    </div>
  );
}

export default DigitalMemory;