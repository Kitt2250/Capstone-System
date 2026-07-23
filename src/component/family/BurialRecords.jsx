import "./burial-records.css";

const BURIAL_RECORDS = [
  {
    id: "B-2847",
    name: "Alejandro Reyes Sr.",
    status: "Active",
    personal: {
      name: "Alejandro Reyes Sr.",
      dates: "May 12, 1945 — November 20, 2025",
    },
    location: {
      grave: "Grave A-142",
      section: "A",
      block: "3",
    },
    burial: {
      dateBuried: "November 23, 2025",
      type: "Ground Burial",
    },
    lease: {
      start: "November 23, 2025",
      expiry: "November 23, 2030",
      payment: "Installment - Current",
    },
  },
];

function BurialRecords() {
  return (
    <div className="br-main">
      <div className="br-topbar">
        <span>Cherubim of Heaven Memorial Park</span>
      </div>

      <div className="br-header">
        <h1 className="br-title">My Burial Records</h1>
        <p className="br-subtitle">View burial details for your loved ones</p>
      </div>

      <div className="br-list">
        {BURIAL_RECORDS.map((record) => (
          <div key={record.id} className="br-card">
            {/* Card Header */}
            <div className="br-card-header">
              <div>
                <h2 className="br-card-name">{record.name}</h2>
                <p className="br-card-id">Record {record.id}</p>
              </div>
              <span className={`br-badge br-badge--${record.status.toLowerCase()}`}>
                {record.status}
              </span>
            </div>

            <div className="br-divider" />

            {/* Card Body */}
            <div className="br-card-body">
              {/* Personal Information */}
              <div className="br-section">
                <p className="br-section-label">Personal Information</p>
                <div className="br-field-row">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span>{record.personal.name}</span>
                </div>
                <div className="br-field-row">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span>{record.personal.dates}</span>
                </div>
              </div>

              {/* Location */}
              <div className="br-section">
                <p className="br-section-label">Location</p>
                <div className="br-field-row">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{record.location.grave}</span>
                </div>
                <div className="br-kv-row">
                  <span className="br-kv-label">Section / Block:</span>
                  <span className="br-kv-value">
                    {record.location.section} / {record.location.block}
                  </span>
                </div>
              </div>

              {/* Burial Details */}
              <div className="br-section">
                <p className="br-section-label">Burial Details</p>
                <div className="br-kv-row">
                  <span className="br-kv-label">Date Buried:</span>
                  <span className="br-kv-value br-kv-value--bold">{record.burial.dateBuried}</span>
                </div>
                <div className="br-kv-row">
                  <span className="br-kv-label">Type:</span>
                  <span className="br-kv-value br-kv-value--bold">{record.burial.type}</span>
                </div>
              </div>

              {/* Lease Information */}
              <div className="br-section">
                <p className="br-section-label">Lease Information</p>
                <div className="br-kv-row">
                  <span className="br-kv-label">Lease Start:</span>
                  <span className="br-kv-value br-kv-value--bold">{record.lease.start}</span>
                </div>
                <div className="br-kv-row">
                  <span className="br-kv-label">Lease Expiry:</span>
                  <span className="br-kv-value br-kv-value--bold">{record.lease.expiry}</span>
                </div>
                <div className="br-kv-row">
                  <span className="br-kv-label">Payment:</span>
                  <span className="br-kv-value br-kv-value--bold">{record.lease.payment}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BurialRecords;