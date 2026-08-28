import { useState } from "react";
import "./sburial-records.css";
import StaffTopbar from "./StaffTopbar";

const INITIAL_RECORDS = [
  { id: 'B-2847', name: 'Alejandro Reyes Sr.', grave: 'A-142', type: 'Single Niche', date: '2025-11-23', contact: 'Ana Reyes', phone: '0917-123-4567', payment: 'Installment', contract: '2026-11-23', interment: true, docs: true },
  { id: 'B-2846', name: 'Carmen Dela Cruz', grave: 'B-045', type: 'Apartment', date: '2025-11-21', contact: 'Roberto Dela Cruz', phone: '0918-234-5678', payment: 'Fully Paid', contract: '2028-11-21', interment: true, docs: false },
  { id: 'B-2845', name: 'Jose Santos', grave: 'C-128', type: 'Mausoleum', date: '2025-11-18', contact: 'Maria Santos Jr.', phone: '0919-345-6789', payment: 'DP Only', contract: '2027-11-18', interment: false, docs: true },
  { id: 'B-2844', name: 'Lourdes Garcia', grave: 'A-200', type: 'Garden Type', date: '2025-11-13', contact: 'Pedro Garcia', phone: '0920-456-7890', payment: 'Installment', contract: '2026-11-13', interment: true, docs: true },
  { id: 'B-2843', name: 'Miguel Tan', grave: 'D-012', type: 'Bonevault', date: '2025-11-08', contact: 'Carlos Tan', phone: '0921-567-8901', payment: 'Fully Paid', contract: '2033-11-08', interment: true, docs: true },
  { id: 'B-2842', name: 'Felipe Mendoza', grave: 'B-098', type: 'Heroes Buried', date: '2025-10-31', contact: 'Rosa Mendoza', phone: '0922-678-9012', payment: 'Installment', contract: '2026-10-31', interment: true, docs: true },
  { id: 'B-2841', name: 'Teresita Cruz', grave: 'E-003', type: 'Columbarium', date: '2025-10-28', contact: 'Jose Cruz', phone: '0923-789-0123', payment: 'Fully Paid', contract: '2045-10-28', interment: true, docs: false }
];

const graveTypeClasses = {
  'Single Niche': 'single-niche',
  'Mausoleum': 'mausoleum',
  'Columbarium': 'columbarium',
  'Apartment': 'apartment',
  'Bonevault': 'bonevault',
  'Garden Type': 'garden',
  'Heroes Buried': 'heroes'
};
const graveTypeIcons = {
  'Single Niche': 'fa-crown',
  'Mausoleum': 'fa-landmark',
  'Columbarium': 'fa-dove',
  'Apartment': 'fa-building',
  'Bonevault': 'fa-box',
  'Garden Type': 'fa-tree',
  'Heroes Buried': 'fa-medal'
};

function Toast({ toast, onClose }) {
  if (!toast) return null;
  return (
    <div className={`toast ${toast.type} ${toast.visible ? 'show' : ''}`}>
      <span>{toast.message}</span>
      <button className="toast-close" onClick={onClose}>×</button>
    </div>
  );
}

function SBurialRecords() {
  const [records, setRecords] = useState(INITIAL_RECORDS);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast(t => (t ? { ...t, visible: false } : null)), 3500);
  };

  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  
  const [targetRecord, setTargetRecord] = useState(null);

  // Form states
  const [form, setForm] = useState({
    name: '', grave: '', type: 'Single Niche', date: new Date().toISOString().slice(0, 10),
    payment: 'Fully Paid', contract: '', interment: true, contact: '', phone: '', docs: true
  });

  // Filter
  const filteredRecords = records.filter(r => {
    const s = searchTerm.toLowerCase();
    const matchSearch = s === '' || r.name.toLowerCase().includes(s) || r.grave.toLowerCase().includes(s) || r.id.toLowerCase().includes(s) || r.contact.toLowerCase().includes(s);
    const matchType = typeFilter === 'all' || r.type === typeFilter;
    const matchPayment = paymentFilter === 'all' || r.payment === paymentFilter;
    return matchSearch && matchType && matchPayment;
  });

  const totalPages = Math.ceil(filteredRecords.length / rowsPerPage);
  const start = (currentPage - 1) * rowsPerPage;
  const pageRecords = filteredRecords.slice(start, start + rowsPerPage);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  const handleClearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  const openAdd = () => {
    setForm({
      name: '', grave: '', type: 'Single Niche', date: new Date().toISOString().slice(0, 10),
      payment: 'Fully Paid', contract: '', interment: true, contact: '', phone: '', docs: true
    });
    setAddModal(true);
  };

  const confirmAdd = () => {
    if (!form.name || !form.grave || !form.date || !form.contact) {
      showToast('⚠️ Please fill in all required fields', 'warning'); return;
    }
    const newId = `B-${Math.floor(Math.random() * 9000 + 1000)}`;
    setRecords([{ ...form, id: newId }, ...records]);
    setAddModal(false);
    showToast(`✅ ${form.name} registered successfully! (ID: ${newId})`, 'success');
  };

  const openEdit = (r) => {
    setTargetRecord(r);
    setForm({ ...r });
    setEditModal(true);
  };

  const confirmEdit = () => {
    if (!form.name || !form.grave || !form.date || !form.contact) {
      showToast('⚠️ Please fill in all required fields', 'warning'); return;
    }
    setRecords(records.map(x => x.id === targetRecord.id ? { ...form, id: targetRecord.id } : x));
    setEditModal(false);
    showToast(`✅ ${form.name}'s record updated!`, 'success');
  };

  const openDelete = (r) => {
    setTargetRecord(r);
    setDeleteModal(true);
  };

  const confirmDelete = () => {
    setRecords(records.filter(x => x.id !== targetRecord.id));
    setDeleteModal(false);
    showToast(`🗑️ ${targetRecord.name}'s record deleted`, 'success');
  };

  const openView = (r) => {
    setTargetRecord(r);
    setViewModal(true);
  };

  const exportRecords = () => {
    showToast(`📥 Exporting ${filteredRecords.length} records...`, 'info');
    setTimeout(() => showToast(`✅ ${filteredRecords.length} records exported!`, 'success'), 1500);
  };

  return (
    <div className="main-content">
      <Toast toast={toast} onClose={() => setToast(null)} />
      
      <StaffTopbar title="Burial Records" greeting="Manage all burial records, payments, and documents" />

      <div className="records-container">
        {/* Header */}
        <div className="records-header">
          <div className="records-header-left">
            <h2><i className="fas fa-cross" style={{ color: "#d4af37", marginRight: "8px" }}></i>All Records</h2>
            <span className="record-count">{filteredRecords.length} total</span>
          </div>
          <div className="records-header-right">
            <button className="btn-secondary" onClick={exportRecords}><i className="fas fa-file-export"></i> Export</button>
            <button className="btn-primary" onClick={openAdd}><i className="fas fa-plus-circle"></i> Register Burial</button>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="search-filter-bar">
          <div className="search-wrapper">
            <i className="fas fa-search search-icon"></i>
            <input type="text" placeholder="Search by name, grave number, or ID..." value={searchTerm} onChange={handleSearch} />
            {searchTerm && <button className="clear-btn visible" onClick={handleClearSearch}><i className="fas fa-times"></i></button>}
          </div>
          <div className="filter-group">
            <select value={typeFilter} onChange={e => { setTypeFilter(e.target.value); setCurrentPage(1); }}>
              <option value="all">All Grave Types</option>
              <option value="Single Niche">🟡 Single Niche</option>
              <option value="Mausoleum">🟣 Mausoleum</option>
              <option value="Columbarium">🔵 Columbarium</option>
              <option value="Apartment">🟢 Apartment</option>
              <option value="Bonevault">⚪ Bonevault</option>
              <option value="Garden Type">🌿 Garden Type</option>
              <option value="Heroes Buried">🔴 Heroes Buried</option>
            </select>
            <select value={paymentFilter} onChange={e => { setPaymentFilter(e.target.value); setCurrentPage(1); }}>
              <option value="all">All Payment Status</option>
              <option value="Fully Paid">✅ Fully Paid</option>
              <option value="Installment">📅 Installment</option>
              <option value="DP Only">💰 DP Only</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th><i className="fas fa-hashtag"></i>ID</th>
                <th><i className="fas fa-user"></i>Deceased</th>
                <th><i className="fas fa-map-pin"></i>Grave</th>
                <th><i className="fas fa-layer-group"></i>Type</th>
                <th><i className="fas fa-coins"></i>Payment</th>
                <th><i className="fas fa-calendar-alt"></i>Contract</th>
                <th><i className="fas fa-file"></i>Docs</th>
                <th style={{ textAlign: "center" }}><i className="fas fa-cog"></i>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageRecords.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center", padding: "2rem", color: "#8aaccc" }}>
                    <i className="fas fa-search" style={{ fontSize: "1.5rem", display: "block", marginBottom: "0.5rem" }}></i>
                    No records found
                  </td>
                </tr>
              ) : (
                pageRecords.map(r => {
                  const icon = graveTypeIcons[r.type] || 'fa-circle';
                  const typeClass = graveTypeClasses[r.type] || '';
                  const paymentClass = r.payment === 'Fully Paid' ? 'fully-paid' : r.payment === 'Installment' ? 'installment' : 'dp-only';
                  
                  return (
                    <tr key={r.id}>
                      <td><strong>{r.id}</strong></td>
                      <td><strong>{r.name}</strong></td>
                      <td>{r.grave}</td>
                      <td><span className={`grave-badge ${typeClass}`}><i className={`fas ${icon}`}></i> {r.type}</span></td>
                      <td><span className={`payment-badge ${paymentClass}`}>{r.payment}</span></td>
                      <td style={{ fontSize: "0.75rem", color: new Date(r.contract) < new Date() ? "#c0392b" : "#27ae60" }}>
                        {r.contract} {new Date(r.contract) < new Date() ? '⚠️' : ''}
                      </td>
                      <td>
                        <span className={`doc-status ${r.docs ? 'complete' : 'incomplete'}`}>
                          <i className={`fas ${r.docs ? 'fa-check-circle' : 'fa-times-circle'}`}></i> {r.docs ? 'Complete' : 'Incomplete'}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-action-view" onClick={() => openView(r)}><i className="fas fa-eye"></i></button>
                          <button className="btn-action-edit" onClick={() => openEdit(r)}><i className="fas fa-pen"></i></button>
                          <button className="btn-action-delete" onClick={() => openDelete(r)}><i className="fas fa-trash"></i></button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 0 && (
          <div className="pagination">
            <div className="pagination-info">Showing {start + 1} to {Math.min(start + rowsPerPage, filteredRecords.length)} of {filteredRecords.length} records</div>
            <div className="pagination-controls">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}><i className="fas fa-chevron-left"></i></button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} className={currentPage === p ? 'active' : ''} onClick={() => setCurrentPage(p)}>{p}</button>
              ))}
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}><i className="fas fa-chevron-right"></i></button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {addModal && (
        <div className="modal-overlay active" onClick={(e) => { if (e.target.className.includes('modal-overlay')) setAddModal(false) }}>
          <div className="modal">
            <div className="modal-icon" style={{ color: "#d4af37" }}><i className="fas fa-plus-circle"></i></div>
            <h3>Register New Burial</h3>
            <p className="modal-subtitle">Enter complete burial record details</p>
            
            <hr className="section-divider" />
            <div className="section-label"><i className="fas fa-user"></i> Basic Information</div>
            <div className="form-group">
              <label>Full Name of Deceased</label>
              <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Grave Number</label>
                <input type="text" value={form.grave} onChange={e => setForm({ ...form, grave: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Grave Type</label>
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                  <option value="Single Niche">🟡 Single Niche</option>
                  <option value="Mausoleum">🟣 Mausoleum</option>
                  <option value="Columbarium">🔵 Columbarium</option>
                  <option value="Apartment">🟢 Apartment</option>
                  <option value="Bonevault">⚪ Bonevault</option>
                  <option value="Garden Type">🌿 Garden Type</option>
                  <option value="Heroes Buried">🔴 Heroes Buried</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Date Buried</label>
              <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
            </div>

            <hr className="section-divider" />
            <div className="section-label"><i className="fas fa-coins"></i> Payment & Contract</div>
            <div className="form-row">
              <div className="form-group">
                <label>Payment Status</label>
                <select value={form.payment} onChange={e => setForm({ ...form, payment: e.target.value })}>
                  <option value="Fully Paid">✅ Fully Paid</option>
                  <option value="Installment">📅 Installment</option>
                  <option value="DP Only">💰 DP Only</option>
                </select>
              </div>
              <div className="form-group">
                <label>Contract Expiry</label>
                <input type="date" value={form.contract} onChange={e => setForm({ ...form, contract: e.target.value })} />
              </div>
            </div>
            <div className="form-group">
              <div className="checkbox-group">
                <input type="checkbox" id="addInterment" checked={form.interment} onChange={e => setForm({ ...form, interment: e.target.checked })} />
                <label htmlFor="addInterment">Yes, interment fee is paid</label>
              </div>
            </div>

            <hr className="section-divider" />
            <div className="section-label"><i className="fas fa-file-alt"></i> Documents & Contact</div>
            <div className="form-row">
              <div className="form-group">
                <label>Contact Person</label>
                <input type="text" value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Contact Number</label>
                <input type="text" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
            </div>
            <div className="form-group">
              <div className="checkbox-group">
                <input type="checkbox" id="addDocs" checked={form.docs} onChange={e => setForm({ ...form, docs: e.target.checked })} />
                <label htmlFor="addDocs">All documents complete</label>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setAddModal(false)}>Cancel</button>
              <button className="btn-confirm" onClick={confirmAdd}><i className="fas fa-check"></i> Register Burial</button>
            </div>
          </div>
        </div>
      )}

      {editModal && targetRecord && (
        <div className="modal-overlay active" onClick={(e) => { if (e.target.className.includes('modal-overlay')) setEditModal(false) }}>
          <div className="modal">
            <div className="modal-icon" style={{ color: "#f39c12" }}><i className="fas fa-pen"></i></div>
            <h3>Edit Burial Record</h3>
            <p className="modal-subtitle">Update all burial record details</p>
            
            <hr className="section-divider" />
            <div className="section-label"><i className="fas fa-user"></i> Basic Information</div>
            <div className="form-group">
              <label>Full Name of Deceased</label>
              <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Grave Number</label>
                <input type="text" value={form.grave} onChange={e => setForm({ ...form, grave: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Grave Type</label>
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                  <option value="Single Niche">🟡 Single Niche</option>
                  <option value="Mausoleum">🟣 Mausoleum</option>
                  <option value="Columbarium">🔵 Columbarium</option>
                  <option value="Apartment">🟢 Apartment</option>
                  <option value="Bonevault">⚪ Bonevault</option>
                  <option value="Garden Type">🌿 Garden Type</option>
                  <option value="Heroes Buried">🔴 Heroes Buried</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Date Buried</label>
              <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
            </div>

            <hr className="section-divider" />
            <div className="section-label"><i className="fas fa-coins"></i> Payment & Contract</div>
            <div className="form-row">
              <div className="form-group">
                <label>Payment Status</label>
                <select value={form.payment} onChange={e => setForm({ ...form, payment: e.target.value })}>
                  <option value="Fully Paid">✅ Fully Paid</option>
                  <option value="Installment">📅 Installment</option>
                  <option value="DP Only">💰 DP Only</option>
                </select>
              </div>
              <div className="form-group">
                <label>Contract Expiry</label>
                <input type="date" value={form.contract} onChange={e => setForm({ ...form, contract: e.target.value })} />
              </div>
            </div>
            <div className="form-group">
              <div className="checkbox-group">
                <input type="checkbox" id="editInterment" checked={form.interment} onChange={e => setForm({ ...form, interment: e.target.checked })} />
                <label htmlFor="editInterment">Yes, interment fee is paid</label>
              </div>
            </div>

            <hr className="section-divider" />
            <div className="section-label"><i className="fas fa-file-alt"></i> Documents & Contact</div>
            <div className="form-row">
              <div className="form-group">
                <label>Contact Person</label>
                <input type="text" value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Contact Number</label>
                <input type="text" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
            </div>
            <div className="form-group">
              <div className="checkbox-group">
                <input type="checkbox" id="editDocs" checked={form.docs} onChange={e => setForm({ ...form, docs: e.target.checked })} />
                <label htmlFor="editDocs">All documents complete</label>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setEditModal(false)}>Cancel</button>
              <button className="btn-confirm" onClick={confirmEdit}><i className="fas fa-save"></i> Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {deleteModal && targetRecord && (
        <div className="modal-overlay active" onClick={(e) => { if (e.target.className.includes('modal-overlay')) setDeleteModal(false) }}>
          <div className="modal">
            <div className="modal-icon" style={{ color: "#c0392b" }}><i className="fas fa-exclamation-triangle"></i></div>
            <h3>Delete Record?</h3>
            <p>Are you sure you want to delete the burial record of <strong>{targetRecord.name}</strong>? This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setDeleteModal(false)}>Cancel</button>
              <button className="btn-danger-modal" onClick={confirmDelete}><i className="fas fa-trash"></i> Delete</button>
            </div>
          </div>
        </div>
      )}

      {viewModal && targetRecord && (
        <div className="modal-overlay active" onClick={(e) => { if (e.target.className.includes('modal-overlay')) setViewModal(false) }}>
          <div className="modal" style={{ maxWidth: "600px" }}>
            <div className="modal-icon" style={{ color: "#3670AF" }}><i className="fas fa-user-circle"></i></div>
            <h3>Burial Record</h3>
            <p className="modal-subtitle">Complete burial details</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem 1.5rem", marginBottom: "1.5rem" }}>
              <div><span style={{ color: "#8aaccc", fontSize: "0.75rem" }}>ID</span><br /><strong>{targetRecord.id}</strong></div>
              <div><span style={{ color: "#8aaccc", fontSize: "0.75rem" }}>Grave Number</span><br /><strong>{targetRecord.grave}</strong></div>
              <div><span style={{ color: "#8aaccc", fontSize: "0.75rem" }}>Grave Type</span><br /><span>{targetRecord.type}</span></div>
              <div><span style={{ color: "#8aaccc", fontSize: "0.75rem" }}>Date Buried</span><br /><strong>{targetRecord.date}</strong></div>
              <div><span style={{ color: "#8aaccc", fontSize: "0.75rem" }}>Payment Status</span><br /><span>{targetRecord.payment}</span></div>
              <div><span style={{ color: "#8aaccc", fontSize: "0.75rem" }}>Contract Expiry</span><br /><strong>{targetRecord.contract}</strong></div>
              <div><span style={{ color: "#8aaccc", fontSize: "0.75rem" }}>Interment Fee</span><br /><span>{targetRecord.interment ? '✅ Paid' : '❌ Pending'}</span></div>
              <div><span style={{ color: "#8aaccc", fontSize: "0.75rem" }}>Documents</span><br /><span>{targetRecord.docs ? 'Complete' : 'Incomplete'}</span></div>
              <div><span style={{ color: "#8aaccc", fontSize: "0.75rem" }}>Contact Person</span><br /><strong>{targetRecord.contact}</strong></div>
              <div><span style={{ color: "#8aaccc", fontSize: "0.75rem" }}>Contact Number</span><br /><strong>{targetRecord.phone}</strong></div>
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setViewModal(false)}>Close</button>
              <button className="btn-confirm" onClick={() => setViewModal(false)}><i className="fas fa-check"></i> Done</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default SBurialRecords;