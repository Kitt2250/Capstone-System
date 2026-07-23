import { useState } from "react";
import "./sburial-records.css";

const INITIAL_RECORDS = [
  {
    id: "B-2847",
    deceasedName: "Alejandro Reyes Sr.",
    dob: "1945-05-12",
    dod: "2025-11-20",
    dateBuried: "2025-11-23",
    graveNumber: "A-142",
    section: "A",
    block: "3",
    type: "Ground",
    clientName: "Ana Reyes",
    contactPhone: "0917-123-4567",
    status: "Active",
  },
  {
    id: "B-2846",
    deceasedName: "Carmen Dela Cruz",
    dob: "1950-02-18",
    dod: "2025-11-18",
    dateBuried: "2025-11-21",
    graveNumber: "B-045",
    section: "B",
    block: "4",
    type: "Apartment",
    clientName: "Roberto Dela Cruz",
    contactPhone: "0917-234-5678",
    status: "Active",
  },
  {
    id: "B-2845",
    deceasedName: "Jose Santos",
    dob: "1938-09-03",
    dod: "2025-11-15",
    dateBuried: "2025-11-18",
    graveNumber: "C-128",
    section: "C",
    block: "2",
    type: "Mausoleum",
    clientName: "Maria Santos Jr.",
    contactPhone: "0917-345-6789",
    status: "Active",
  },
  {
    id: "B-2844",
    deceasedName: "Lourdes Garcia",
    dob: "1942-07-25",
    dod: "2025-11-10",
    dateBuried: "2025-11-13",
    graveNumber: "A-200",
    section: "A",
    block: "5",
    type: "Ground",
    clientName: "Pedro Garcia",
    contactPhone: "0917-456-7890",
    status: "Active",
  },
  {
    id: "B-2843",
    deceasedName: "Miguel Tan",
    dob: "1955-01-30",
    dod: "2025-11-05",
    dateBuried: "2025-11-08",
    graveNumber: "D-012",
    section: "D",
    block: "1",
    type: "Bone Vault",
    clientName: "Carlos Tan",
    contactPhone: "0917-567-8901",
    status: "Active",
  },
  {
    id: "B-2842",
    deceasedName: "Felipe Mendoza",
    dob: "1948-12-14",
    dod: "2025-10-28",
    dateBuried: "2025-10-31",
    graveNumber: "B-098",
    section: "B",
    block: "2",
    type: "Apartment",
    clientName: "Rosa Mendoza",
    contactPhone: "0917-678-9012",
    status: "Active",
  },
];

const EMPTY_FORM = {
  deceasedName: "",
  dob: "",
  dod: "",
  dateBuried: "",
  graveNumber: "",
  section: "",
  block: "",
  type: "",
  clientName: "",
  contactPhone: "",
};

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

function PrintIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
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

function SBurialRecords() {
  const [records, setRecords] = useState(INITIAL_RECORDS);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null); // "view" | "edit" | "register" | null
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const filteredRecords = records.filter((r) => {
    const q = search.toLowerCase();
    return (
      r.deceasedName.toLowerCase().includes(q) ||
      r.graveNumber.toLowerCase().includes(q) ||
      r.id.toLowerCase().includes(q)
    );
  });

  const openView = (record) => {
    setSelectedRecord(record);
    setModal("view");
  };

  const openEdit = (record) => {
    setSelectedRecord(record);
    setForm({
      deceasedName: record.deceasedName,
      dob: record.dob,
      dod: record.dod,
      dateBuried: record.dateBuried,
      graveNumber: record.graveNumber,
      section: record.section,
      block: record.block,
      type: record.type,
      clientName: record.clientName,
      contactPhone: record.contactPhone,
    });
    setModal("edit");
  };

  const openRegister = () => {
    setForm(EMPTY_FORM);
    setModal("register");
  };

  const closeModal = () => {
    setModal(null);
    setSelectedRecord(null);
    setForm(EMPTY_FORM);
  };

  const handleSaveEdit = () => {
    setRecords((prev) =>
      prev.map((r) => (r.id === selectedRecord.id ? { ...r, ...form } : r))
    );
    closeModal();
  };

  const handleSaveRegister = () => {
    const newId = `B-${2848 + records.length}`;
    const newRecord = { id: newId, ...form, status: "Active" };
    setRecords((prev) => [newRecord, ...prev]);
    closeModal();
  };

  return (
    <div className="sbr-page">
      <div className="sbr-topbar">
        <span>Cherubim of Heaven Memorial Park</span>
      </div>

      <div className="sbr-header">
        <div>
          <h1>Burial Records</h1>
          <p>{records.length} total records</p>
        </div>
        <button className="sbr-register-btn" onClick={openRegister}>
          <PlusIcon /> Register Burial
        </button>
      </div>

      <div className="sbr-search-row">
        <div className="sbr-search-wrap">
          <span className="sbr-search-icon"><SearchIcon /></span>
          <input
            type="text"
            placeholder="Search by name, grave number, or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="sbr-table-card">
        <table className="sbr-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Deceased</th>
              <th>Grave No.</th>
              <th>Type</th>
              <th>Date Buried</th>
              <th>Contact</th>
              <th className="sbr-th-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((r) => (
              <tr key={r.id}>
                <td className="sbr-td-id">{r.id}</td>
                <td className="sbr-td-name">{r.deceasedName}</td>
                <td>{r.graveNumber}</td>
                <td>
                  <span className={`sbr-type-badge sbr-type-${r.type.toLowerCase().replace(" ", "-")}`}>
                    {r.type}
                  </span>
                </td>
                <td>{r.dateBuried}</td>
                <td className="sbr-td-contact">{r.clientName}</td>
                <td>
                  <div className="sbr-action-icons">
                    <button className="sbr-icon-btn" title="View" onClick={() => openView(r)}>
                      <EyeIcon />
                    </button>
                    <button className="sbr-icon-btn" title="Edit" onClick={() => openEdit(r)}>
                      <EditIcon />
                    </button>
                    <button className="sbr-icon-btn" title="Print">
                      <PrintIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredRecords.length === 0 && (
              <tr>
                <td colSpan={7} className="sbr-no-results">No burial records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* VIEW MODAL */}
      {modal === "view" && selectedRecord && (
        <div className="sbr-overlay" onClick={closeModal}>
          <div className="sbr-modal" onClick={(e) => e.stopPropagation()}>
            <div className="sbr-modal-header">
              <h2>Burial Record Details</h2>
              <button className="sbr-modal-close" onClick={closeModal}>
                <CloseIcon />
              </button>
            </div>

            <div className="sbr-modal-grid">
              <div>
                <div className="sbr-modal-label">Record ID:</div>
                <div className="sbr-modal-value">{selectedRecord.id}</div>
              </div>
              <div>
                <div className="sbr-modal-label">Status:</div>
                <span className="sbr-status-active">{selectedRecord.status}</span>
              </div>

              <div className="sbr-modal-full">
                <div className="sbr-modal-label">Deceased Name:</div>
                <div className="sbr-modal-value">{selectedRecord.deceasedName}</div>
              </div>

              <div>
                <div className="sbr-modal-label">Date of Birth:</div>
                <div className="sbr-modal-value">{selectedRecord.dob}</div>
              </div>
              <div>
                <div className="sbr-modal-label">Date of Death:</div>
                <div className="sbr-modal-value">{selectedRecord.dod}</div>
              </div>

              <div>
                <div className="sbr-modal-label">Date Buried:</div>
                <div className="sbr-modal-value">{selectedRecord.dateBuried}</div>
              </div>
              <div>
                <div className="sbr-modal-label">Grave Number:</div>
                <div className="sbr-modal-value">{selectedRecord.graveNumber}</div>
              </div>

              <div>
                <div className="sbr-modal-label">Section/Block:</div>
                <div className="sbr-modal-value">{selectedRecord.section} / {selectedRecord.block}</div>
              </div>
              <div>
                <div className="sbr-modal-label">Type:</div>
                <div className="sbr-modal-value">{selectedRecord.type}</div>
              </div>

              <div>
                <div className="sbr-modal-label">Client Name:</div>
                <div className="sbr-modal-value">{selectedRecord.clientName}</div>
              </div>
              <div>
                <div className="sbr-modal-label">Contact Phone:</div>
                <div className="sbr-modal-value">{selectedRecord.contactPhone}</div>
              </div>
            </div>

            <button className="sbr-modal-close-btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {modal === "edit" && (
        <div className="sbr-overlay" onClick={closeModal}>
          <div className="sbr-modal" onClick={(e) => e.stopPropagation()}>
            <div className="sbr-modal-header">
              <h2>Edit Burial Record</h2>
              <button className="sbr-modal-close" onClick={closeModal}>
                <CloseIcon />
              </button>
            </div>

            <BurialForm form={form} setForm={setForm} />

            <div className="sbr-modal-actions">
              <button className="sbr-btn-secondary" onClick={closeModal}>Cancel</button>
              <button className="sbr-btn-primary" onClick={handleSaveEdit}>Save Record</button>
            </div>
          </div>
        </div>
      )}

      {/* REGISTER MODAL */}
      {modal === "register" && (
        <div className="sbr-overlay" onClick={closeModal}>
          <div className="sbr-modal" onClick={(e) => e.stopPropagation()}>
            <div className="sbr-modal-header">
              <h2>Register New Burial</h2>
              <button className="sbr-modal-close" onClick={closeModal}>
                <CloseIcon />
              </button>
            </div>

            <BurialForm form={form} setForm={setForm} />

            <div className="sbr-modal-actions">
              <button className="sbr-btn-secondary" onClick={closeModal}>Cancel</button>
              <button className="sbr-btn-primary" onClick={handleSaveRegister}>Save Record</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BurialForm({ form, setForm }) {
  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="sbr-form">
      <div className="sbr-form-group">
        <label>Deceased Name</label>
        <input
          type="text"
          value={form.deceasedName}
          onChange={(e) => update("deceasedName", e.target.value)}
        />
      </div>

      <div className="sbr-form-row">
        <div className="sbr-form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            value={form.dob}
            onChange={(e) => update("dob", e.target.value)}
          />
        </div>
        <div className="sbr-form-group">
          <label>Date of Death</label>
          <input
            type="date"
            value={form.dod}
            onChange={(e) => update("dod", e.target.value)}
          />
        </div>
      </div>

      <div className="sbr-form-row">
        <div className="sbr-form-group">
          <label>Date Buried</label>
          <input
            type="date"
            value={form.dateBuried}
            onChange={(e) => update("dateBuried", e.target.value)}
          />
        </div>
        <div className="sbr-form-group">
          <label>Grave Number</label>
          <input
            type="text"
            value={form.graveNumber}
            onChange={(e) => update("graveNumber", e.target.value)}
          />
        </div>
      </div>

      <div className="sbr-form-row sbr-form-row--three">
        <div className="sbr-form-group">
          <label>Section</label>
          <input
            type="text"
            value={form.section}
            onChange={(e) => update("section", e.target.value)}
          />
        </div>
        <div className="sbr-form-group">
          <label>Block</label>
          <input
            type="text"
            value={form.block}
            onChange={(e) => update("block", e.target.value)}
          />
        </div>
        <div className="sbr-form-group">
          <label>Type</label>
          <select value={form.type} onChange={(e) => update("type", e.target.value)}>
            <option value="">Select</option>
            <option value="Ground">Ground</option>
            <option value="Apartment">Apartment</option>
            <option value="Mausoleum">Mausoleum</option>
            <option value="Bone Vault">Bone Vault</option>
          </select>
        </div>
      </div>

      <div className="sbr-form-row">
        <div className="sbr-form-group">
          <label>Client Name</label>
          <input
            type="text"
            value={form.clientName}
            onChange={(e) => update("clientName", e.target.value)}
          />
        </div>
        <div className="sbr-form-group">
          <label>Contact Phone</label>
          <input
            type="text"
            value={form.contactPhone}
            onChange={(e) => update("contactPhone", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default SBurialRecords;