import { useState } from "react";
import "./wake-scheduling.css";

const VENUES = [
  { name: "Chapel A", status: "Available" },
  { name: "Chapel B", status: "Available" },
  { name: "Open Pavilion", status: "Available" },
  { name: "Function Hall", status: "Available" },
];

const INITIAL_RESERVATIONS = [
  { id: "WK-001", venue: "Chapel A",      client: "Ana Reyes",       deceased: "Alejandro Reyes Sr.", start: "2026-03-18", end: "2026-03-20", status: "Confirmed" },
  { id: "WK-002", venue: "Chapel B",      client: "Roberto Dela Cruz", deceased: "Carmen Dela Cruz",   start: "2026-03-19", end: "2026-03-21", status: "Pending" },
  { id: "WK-003", venue: "Open Pavilion", client: "Maria Santos Jr.", deceased: "Jose Santos",         start: "2026-03-16", end: "2026-03-18", status: "Confirmed" },
  { id: "WK-004", venue: "Chapel A",      client: "Pedro Garcia",     deceased: "Lourdes Garcia",       start: "2026-03-10", end: "2026-03-12", status: "Completed" },
  { id: "WK-005", venue: "Function Hall", client: "Carlos Tan",       deceased: "Miguel Tan",           start: "2026-03-22", end: "2026-03-24", status: "Confirmed" },
];

const EMPTY_FORM = {
  venue: "",
  client: "",
  deceased: "",
  start: "",
  end: "",
  contactPhone: "",
};

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
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

function WakeScheduling() {
  const [reservations, setReservations] = useState(INITIAL_RESERVATIONS);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const openModal = () => {
    setForm(EMPTY_FORM);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setForm(EMPTY_FORM);
  };

  const handleConfirm = () => {
    if (!form.venue.trim() || !form.client.trim()) return;
    const newId = `WK-${String(reservations.length + 1).padStart(3, "0")}`;
    const newReservation = {
      id: newId,
      venue: form.venue,
      client: form.client,
      deceased: form.deceased,
      start: form.start,
      end: form.end,
      status: "Pending",
    };
    setReservations((prev) => [...prev, newReservation]);
    closeModal();
  };

  return (
    <div className="wk-page">
      <div className="wk-topbar">
        <span>Cherubim of Heaven Memorial Park</span>
      </div>

      <div className="wk-header">
        <div>
          <h1>Wake Space Scheduling</h1>
          <p>Manage wake venue reservations</p>
        </div>
        <button className="wk-reserve-btn" onClick={openModal}>
          <PlusIcon /> Reserve Space
        </button>
      </div>

      {/* Venue Cards */}
      <div className="wk-venues">
        {VENUES.map((v) => (
          <div className="wk-venue-card" key={v.name}>
            <p className="wk-venue-name">{v.name}</p>
            <span className="wk-venue-status">
              <span className="wk-venue-dot" />
              {v.status}
            </span>
          </div>
        ))}
      </div>

      {/* Reservations Table */}
      <div className="wk-table-card">
        <table className="wk-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Venue</th>
              <th>Client</th>
              <th>Deceased</th>
              <th>Start</th>
              <th>End</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((r) => (
              <tr key={r.id}>
                <td className="wk-td-id">{r.id}</td>
                <td>{r.venue}</td>
                <td className="wk-td-client">{r.client}</td>
                <td>{r.deceased}</td>
                <td>{r.start}</td>
                <td>{r.end}</td>
                <td>
                  <span className={`wk-status wk-status--${r.status.toLowerCase()}`}>
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
            {reservations.length === 0 && (
              <tr>
                <td colSpan={7} className="wk-no-results">No reservations found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Reserve Modal */}
      {showModal && (
        <div className="wk-overlay" onClick={closeModal}>
          <div className="wk-modal" onClick={(e) => e.stopPropagation()}>
            <div className="wk-modal-header">
              <h2>Reserve Wake Space</h2>
              <button className="wk-modal-close" onClick={closeModal}>
                <CloseIcon />
              </button>
            </div>

            <div className="wk-form">
              <div className="wk-form-group">
                <label>Venue</label>
                <select value={form.venue} onChange={(e) => update("venue", e.target.value)}>
                  <option value="">Select venue</option>
                  {VENUES.map((v) => (
                    <option key={v.name} value={v.name}>{v.name}</option>
                  ))}
                </select>
              </div>

              <div className="wk-form-group">
                <label>Client Name</label>
                <input
                  type="text"
                  value={form.client}
                  onChange={(e) => update("client", e.target.value)}
                />
              </div>

              <div className="wk-form-group">
                <label>Deceased Name</label>
                <input
                  type="text"
                  value={form.deceased}
                  onChange={(e) => update("deceased", e.target.value)}
                />
              </div>

              <div className="wk-form-row">
                <div className="wk-form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={form.start}
                    onChange={(e) => update("start", e.target.value)}
                  />
                </div>
                <div className="wk-form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    value={form.end}
                    onChange={(e) => update("end", e.target.value)}
                  />
                </div>
              </div>

              <div className="wk-form-group">
                <label>Contact Phone</label>
                <input
                  type="text"
                  value={form.contactPhone}
                  onChange={(e) => update("contactPhone", e.target.value)}
                />
              </div>
            </div>

            <div className="wk-modal-actions">
              <button className="wk-btn-secondary" onClick={closeModal}>Cancel</button>
              <button className="wk-btn-primary" onClick={handleConfirm}>Confirm Reservation</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WakeScheduling;