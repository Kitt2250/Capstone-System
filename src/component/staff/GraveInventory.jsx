import { useState } from "react";
import "./grave-inventory.css";

const INITIAL_LOTS = [
  { graveNo: "A-001", section: "A", block: "1", type: "Ground",     status: "Occupied", occupant: "Alejandro Reyes Sr.", leaseExpiry: "2030-11-23", price: 85000 },
  { graveNo: "A-002", section: "A", block: "1", type: "Ground",     status: "Available", occupant: "—", leaseExpiry: "—", price: 85000 },
  { graveNo: "A-003", section: "A", block: "1", type: "Ground",     status: "Reserved",  occupant: "—", leaseExpiry: "—", price: 85000 },
  { graveNo: "B-045", section: "B", block: "1", type: "Apartment",  status: "Occupied", occupant: "Carmen Dela Cruz", leaseExpiry: "2030-11-21", price: 120000 },
  { graveNo: "B-046", section: "B", block: "1", type: "Apartment",  status: "Available", occupant: "—", leaseExpiry: "—", price: 120000 },
  { graveNo: "C-128", section: "C", block: "4", type: "Mausoleum",  status: "Occupied", occupant: "Jose Santos", leaseExpiry: "2045-11-18", price: 350000 },
  { graveNo: "C-129", section: "C", block: "4", type: "Mausoleum",  status: "Available", occupant: "—", leaseExpiry: "—", price: 350000 },
  { graveNo: "D-012", section: "D", block: "1", type: "Bone Vault", status: "Occupied", occupant: "Miguel Tan", leaseExpiry: "2031-11-08", price: 45000 },
  { graveNo: "D-013", section: "D", block: "1", type: "Bone Vault", status: "Available", occupant: "—", leaseExpiry: "—", price: 45000 },
  { graveNo: "A-200", section: "A", block: "5", type: "Ground",     status: "Occupied", occupant: "Lourdes Garcia", leaseExpiry: "2030-11-13", price: 85000 },
];

const EMPTY_FORM = {
  graveNo: "",
  section: "",
  block: "",
  type: "",
  price: "",
};

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

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

const peso = (n) => "₱" + Number(n || 0).toLocaleString("en-PH");

function GraveInventory() {
  const [lots, setLots] = useState(INITIAL_LOTS);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const available = lots.filter((l) => l.status === "Available").length;
  const occupied  = lots.filter((l) => l.status === "Occupied").length;
  const reserved  = lots.filter((l) => l.status === "Reserved").length;

  const filteredLots = lots.filter((l) => {
    const q = search.toLowerCase();
    return (
      l.graveNo.toLowerCase().includes(q) ||
      l.occupant.toLowerCase().includes(q)
    );
  });

  const openRegister = () => {
    setForm(EMPTY_FORM);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setForm(EMPTY_FORM);
  };

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleRegister = () => {
    if (!form.graveNo.trim()) return;
    const newLot = {
      graveNo: form.graveNo,
      section: form.section,
      block: form.block,
      type: form.type || "Ground",
      status: "Available",
      occupant: "—",
      leaseExpiry: "—",
      price: Number(form.price) || 0,
    };
    setLots((prev) => [newLot, ...prev]);
    closeModal();
  };

  return (
    <div className="gi-page">
      <div className="gi-topbar">
        <span>Cherubim of Heaven Memorial Park</span>
      </div>

      <div className="gi-header">
        <div>
          <h1>Grave Inventory</h1>
          <p>{lots.length} total lots</p>
        </div>
        <button className="gi-register-btn" onClick={openRegister}>
          <PlusIcon /> Register Lot
        </button>
      </div>

      {/* Stat Cards */}
      <div className="gi-stats">
        <div className="gi-stat-card">
          <p className="gi-stat-value">{available}</p>
          <p className="gi-stat-label">Available</p>
        </div>
        <div className="gi-stat-card">
          <p className="gi-stat-value">{occupied}</p>
          <p className="gi-stat-label">Occupied</p>
        </div>
        <div className="gi-stat-card">
          <p className="gi-stat-value">{reserved}</p>
          <p className="gi-stat-label">Reserved</p>
        </div>
      </div>

      <div className="gi-search-row">
        <div className="gi-search-wrap">
          <span className="gi-search-icon"><SearchIcon /></span>
          <input
            type="text"
            placeholder="Search grave number or occupant..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="gi-table-card">
        <table className="gi-table">
          <thead>
            <tr>
              <th>Grave No.</th>
              <th>Section/Block</th>
              <th>Type</th>
              <th>Status</th>
              <th>Occupant</th>
              <th>Lease Expiry</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredLots.map((lot) => (
              <tr key={lot.graveNo}>
                <td className="gi-td-grave">{lot.graveNo}</td>
                <td>{lot.section} / {lot.block}</td>
                <td>
                  <span className={`gi-type-badge gi-type-${lot.type.toLowerCase().replace(" ", "-")}`}>
                    {lot.type}
                  </span>
                </td>
                <td>
                  <span className={`gi-status gi-status--${lot.status.toLowerCase()}`}>
                    <span className="gi-status-dot" />
                    {lot.status}
                  </span>
                </td>
                <td className="gi-td-occupant">{lot.occupant}</td>
                <td>{lot.leaseExpiry}</td>
                <td className="gi-td-price">{peso(lot.price)}</td>
              </tr>
            ))}
            {filteredLots.length === 0 && (
              <tr>
                <td colSpan={7} className="gi-no-results">No lots found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Register Modal */}
      {showModal && (
        <div className="gi-overlay" onClick={closeModal}>
          <div className="gi-modal" onClick={(e) => e.stopPropagation()}>
            <div className="gi-modal-header">
              <h2>Register New Lot</h2>
              <button className="gi-modal-close" onClick={closeModal}>
                <CloseIcon />
              </button>
            </div>

            <div className="gi-form">
              <div className="gi-form-group">
                <label>Grave Number</label>
                <input
                  type="text"
                  value={form.graveNo}
                  onChange={(e) => update("graveNo", e.target.value)}
                  placeholder="e.g. A-004"
                />
              </div>

              <div className="gi-form-row">
                <div className="gi-form-group">
                  <label>Section</label>
                  <select value={form.section} onChange={(e) => update("section", e.target.value)}>
                    <option value="">Select</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>
                <div className="gi-form-group">
                  <label>Block</label>
                  <input
                    type="text"
                    value={form.block}
                    onChange={(e) => update("block", e.target.value)}
                  />
                </div>
              </div>

              <div className="gi-form-row">
                <div className="gi-form-group">
                  <label>Type</label>
                  <select value={form.type} onChange={(e) => update("type", e.target.value)}>
                    <option value="">Select</option>
                    <option value="Ground">Ground</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Mausoleum">Mausoleum</option>
                    <option value="Bone Vault">Bone Vault</option>
                  </select>
                </div>
                <div className="gi-form-group">
                  <label>Price</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => update("price", e.target.value)}
                    placeholder="₱0"
                  />
                </div>
              </div>
            </div>

            <div className="gi-modal-actions">
              <button className="gi-btn-secondary" onClick={closeModal}>Cancel</button>
              <button className="gi-btn-primary" onClick={handleRegister}>Register</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GraveInventory;