import { useState, useEffect } from "react";
import "./grave-inventory.css";
import StaffTopbar from "./StaffTopbar";

const PRICE_DATA = {
  'Single Niche': { price: '₱150,000.00', size: '1 x 3 = 3 sqm (2 vaults)', contract: 'Staggered / Pre-Need (1 yr)' },
  'Mausoleum': { price: '₱1,380,000.00', size: '5 x 5 = 25 sqm', contract: 'On the spot' },
  'Columbarium': { price: '₱80,000.00', size: '38cm(H) x 39cm(W) x 45cm(L)', contract: '20-year renewable' },
  'Apartment': { price: '₱38,000.00', size: '1 x 1 x 3 = 3 cum', contract: '7-year renewable' },
  'Bonevault': { price: '₱30,000.00', size: '45cm(H) x 80.5cm(L) x 60cm(W)', contract: '10-year renewable' },
  'Garden Type': { price: '₱560,000.00', size: '4 x 4 = 16 sqm (4 vaults)', contract: 'Staggered (1 yr)' },
  'Heroes Buried': { price: '₱387,000.00', size: '7.84 sqm (2 vaults)', contract: 'Staggered (1 yr)' }
};

const INITIAL_INVENTORY = [
  { id: 1, grave: 'A-001', type: 'Single Niche', section: 'Section A', status: 'Occupied', notes: 'Near chapel' },
  { id: 2, grave: 'A-002', type: 'Single Niche', section: 'Section A', status: 'Occupied', notes: 'Burial record B-2847' },
  { id: 3, grave: 'A-003', type: 'Single Niche', section: 'Section A', status: 'Reserved', notes: 'Reserved for Reyes family' },
  { id: 4, grave: 'B-001', type: 'Apartment', section: 'Section B', status: 'Available', notes: '' },
  { id: 5, grave: 'B-002', type: 'Apartment', section: 'Section B', status: 'Available', notes: '' },
  { id: 6, grave: 'B-003', type: 'Apartment', section: 'Section B', status: 'Occupied', notes: 'Burial record B-2846' },
  { id: 7, grave: 'C-001', type: 'Mausoleum', section: 'Section C', status: 'Available', notes: 'Premium location' },
  { id: 8, grave: 'C-002', type: 'Mausoleum', section: 'Section C', status: 'Available', notes: '' },
  { id: 9, grave: 'D-001', type: 'Bonevault', section: 'Section D', status: 'Occupied', notes: 'Burial record B-2843' },
  { id: 10, grave: 'D-002', type: 'Bonevault', section: 'Section D', status: 'Available', notes: '' },
  { id: 11, grave: 'E-001', type: 'Columbarium', section: 'Section E', status: 'Reserved', notes: 'Reserved for Cruz family' },
  { id: 12, grave: 'E-002', type: 'Columbarium', section: 'Section E', status: 'Available', notes: '' },
  { id: 13, grave: 'F-001', type: 'Garden Type', section: 'Section F', status: 'Occupied', notes: 'Burial record B-2844' },
  { id: 14, grave: 'F-002', type: 'Garden Type', section: 'Section F', status: 'Available', notes: '' },
  { id: 15, grave: 'G-001', type: 'Heroes Buried', section: 'Section G', status: 'Occupied', notes: 'Burial record B-2842' },
  { id: 16, grave: 'G-002', type: 'Heroes Buried', section: 'Section G', status: 'Available', notes: '' },
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
const statusColors = {
  'Available': 'available',
  'Occupied': 'occupied',
  'Reserved': 'reserved'
};
const statusIcons = {
  'Available': 'fa-circle',
  'Occupied': 'fa-circle',
  'Reserved': 'fa-circle'
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

function GraveInventory() {
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast(t => (t ? { ...t, visible: false } : null)), 3500);
  };

  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  
  const [targetLot, setTargetLot] = useState(null);

  // Form states
  const [form, setForm] = useState({
    grave: '', type: 'Single Niche', section: '', status: 'Available', notes: ''
  });

  // Filter
  const filteredInventory = inventory.filter(item => {
    const s = searchTerm.toLowerCase();
    const matchSearch = s === '' || 
        item.grave.toLowerCase().includes(s) || 
        item.section.toLowerCase().includes(s) || 
        item.type.toLowerCase().includes(s) || 
        (item.notes && item.notes.toLowerCase().includes(s));
    const matchType = typeFilter === 'all' || item.type === typeFilter;
    const matchStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  const totalPages = Math.ceil(filteredInventory.length / rowsPerPage);
  const start = (currentPage - 1) * rowsPerPage;
  const pageItems = filteredInventory.slice(start, start + rowsPerPage);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  const handleClearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  const openAdd = () => {
    setForm({ grave: '', type: 'Single Niche', section: '', status: 'Available', notes: '' });
    setAddModal(true);
  };

  const confirmAdd = () => {
    if (!form.grave || !form.section) {
      showToast('⚠️ Please fill in Grave Number and Section', 'warning'); return;
    }
    const newId = inventory.length ? Math.max(...inventory.map(i => i.id)) + 1 : 1;
    setInventory([...inventory, { ...form, id: newId }]);
    setAddModal(false);
    showToast(`✅ Grave ${form.grave} added successfully!`, 'success');
  };

  const openEdit = (item) => {
    setTargetLot(item);
    setForm({ grave: item.grave, type: item.type, section: item.section, status: item.status, notes: item.notes || '' });
    setEditModal(true);
  };

  const confirmEdit = () => {
    if (!form.grave || !form.section) {
      showToast('⚠️ Please fill in Grave Number and Section', 'warning'); return;
    }
    setInventory(inventory.map(i => i.id === targetLot.id ? { ...form, id: targetLot.id } : i));
    setEditModal(false);
    showToast(`✅ Grave ${form.grave} updated!`, 'success');
  };

  const openDelete = (item) => {
    setTargetLot(item);
    setDeleteModal(true);
  };

  const confirmDelete = () => {
    setInventory(inventory.filter(i => i.id !== targetLot.id));
    setDeleteModal(false);
    showToast(`🗑️ Grave ${targetLot.grave} deleted`, 'success');
  };

  const openView = (item) => {
    setTargetLot(item);
    setViewModal(true);
  };
  
  const showOnMap = (item) => {
    showToast(`📍 Showing ${item.grave} on map (Section: ${item.section})`, 'info');
    setTimeout(() => showToast(`🗺️ Map view opened for ${item.grave}`, 'success'), 800);
  };

  const exportInventory = () => {
    showToast(`📥 Exporting ${filteredInventory.length} lots...`, 'info');
    setTimeout(() => showToast(`✅ ${filteredInventory.length} lots exported!`, 'success'), 1500);
  };
  
  // Summary Stats
  const types = ['Single Niche', 'Mausoleum', 'Columbarium', 'Apartment', 'Bonevault'];

  return (
    <div className="main-content" style={{ padding: "0 1.5rem" }}>
      <Toast toast={toast} onClose={() => setToast(null)} />
      
      <StaffTopbar title="Grave Inventory" greeting="Manage all grave lots and their availability" />

      <div className="inventory-container">
        {/* Quick Summary Cards */}
        <div className="summary-cards">
            {types.map(type => {
                const items = inventory.filter(i => i.type === type);
                const total = items.length;
                const available = items.filter(i => i.status === 'Available').length;
                const occupied = items.filter(i => i.status === 'Occupied').length;
                const reserved = items.filter(i => i.status === 'Reserved').length;
                const icon = graveTypeIcons[type] || 'fa-circle';
                return (
                    <div className="summary-card" key={type}>
                        <div className="card-type"><i className={`fas ${icon}`}></i> {type}</div>
                        <div className="card-stats">
                            <div className="stat-item">Total <span className="num">{total}</span></div>
                            <div className="stat-item">Avail <span className="num green">{available}</span></div>
                            <div className="stat-item">Occ <span className="num red">{occupied}</span></div>
                            <div className="stat-item">Res <span className="num yellow">{reserved}</span></div>
                        </div>
                    </div>
                );
            })}
        </div>

        {/* Stats Bar */}
        <div className="stats-bar">
            <div className="stat-item"><span className="count">{filteredInventory.length}</span><span className="label">Total Lots</span></div>
            <div className="stat-item"><span className="dot green"></span><span className="count">{filteredInventory.filter(i => i.status === 'Available').length}</span><span className="label">Available</span></div>
            <div className="stat-item"><span className="dot red"></span><span className="count">{filteredInventory.filter(i => i.status === 'Occupied').length}</span><span className="label">Occupied</span></div>
            <div className="stat-item"><span className="dot yellow"></span><span className="count">{filteredInventory.filter(i => i.status === 'Reserved').length}</span><span className="label">Reserved</span></div>
        </div>

        {/* Header */}
        <div className="inventory-header">
            <div className="inventory-header-left">
                <h2><i className="fas fa-tshirt" style={{ color: "#d4af37", marginRight: "8px" }}></i>All Lots</h2>
                <span className="inventory-count">{filteredInventory.length} total</span>
            </div>
            <div className="inventory-header-right">
                <button className="btn-secondary" onClick={exportInventory}><i className="fas fa-file-export"></i> Export</button>
                <button className="btn-primary" onClick={openAdd}><i className="fas fa-plus-circle"></i> Add Lot</button>
            </div>
        </div>

        {/* Search & Filter */}
        <div className="search-filter-bar">
            <div className="search-wrapper">
                <i className="fas fa-search search-icon"></i>
                <input type="text" placeholder="Search by grave number, section, or type..." value={searchTerm} onChange={handleSearch} />
                {searchTerm && <button className="clear-btn visible" onClick={handleClearSearch}><i className="fas fa-times"></i></button>}
            </div>
            <div className="filter-group">
                <select value={typeFilter} onChange={e => { setTypeFilter(e.target.value); setCurrentPage(1); }}>
                    <option value="all">All Types</option>
                    <option value="Single Niche">🟡 Single Niche</option>
                    <option value="Mausoleum">🟣 Mausoleum</option>
                    <option value="Columbarium">🔵 Columbarium</option>
                    <option value="Apartment">🟢 Apartment</option>
                    <option value="Bonevault">⚪ Bonevault</option>
                    <option value="Garden Type">🌿 Garden Type</option>
                    <option value="Heroes Buried">🔴 Heroes Buried</option>
                </select>
                <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }}>
                    <option value="all">All Status</option>
                    <option value="Available">🟢 Available</option>
                    <option value="Occupied">🔴 Occupied</option>
                    <option value="Reserved">🟡 Reserved</option>
                </select>
            </div>
        </div>

        {/* Table */}
        <div className="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th><i className="fas fa-hashtag"></i>Grave</th>
                        <th><i className="fas fa-layer-group"></i>Type</th>
                        <th><i className="fas fa-flag"></i>Section</th>
                        <th><i className="fas fa-circle"></i>Status</th>
                        <th><i className="fas fa-tag"></i>Price</th>
                        <th><i className="fas fa-arrows-alt"></i>Size</th>
                        <th style={{ textAlign: "center" }}><i className="fas fa-cog"></i>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pageItems.length === 0 ? (
                        <tr>
                            <td colSpan="7" style={{ textAlign: "center", padding: "2rem", color: "#8aaccc" }}>
                                <i className="fas fa-search" style={{ fontSize: "1.5rem", display: "block", marginBottom: "0.5rem" }}></i>
                                No lots found
                            </td>
                        </tr>
                    ) : (
                        pageItems.map(item => {
                            const typeClass = graveTypeClasses[item.type] || '';
                            const icon = graveTypeIcons[item.type] || 'fa-circle';
                            const statusClass = statusColors[item.status] || '';
                            const statusIcon = statusIcons[item.status] || 'fa-circle';
                            const price = PRICE_DATA[item.type] ? PRICE_DATA[item.type].price : '—';
                            const size = PRICE_DATA[item.type] ? PRICE_DATA[item.type].size : '—';
                            
                            return (
                                <tr key={item.id}>
                                    <td><strong>{item.grave}</strong></td>
                                    <td><span className={`grave-badge ${typeClass}`}><i className={`fas ${icon}`}></i> {item.type}</span></td>
                                    <td>{item.section}</td>
                                    <td><span className={`status-badge ${statusClass}`}><i className={`fas ${statusIcon}`}></i> {item.status}</span></td>
                                    <td className="price-display">{price}</td>
                                    <td style={{ fontSize: "0.7rem", color: "#6a8aaa" }}>{size}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="btn-action-view" onClick={() => openView(item)}><i className="fas fa-eye"></i></button>
                                            <button className="btn-action-edit" onClick={() => openEdit(item)}><i className="fas fa-pen"></i></button>
                                            <button className="btn-action-map" onClick={() => showOnMap(item)}><i className="fas fa-map-pin"></i></button>
                                            <button className="btn-action-delete" onClick={() => openDelete(item)}><i className="fas fa-trash"></i></button>
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
            <div className="pagination-info">Showing {start + 1} to {Math.min(start + rowsPerPage, filteredInventory.length)} of {filteredInventory.length} lots</div>
            <div className="pagination-controls">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}><i className="fas fa-chevron-left"></i></button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => {
                if (p === 1 || p === totalPages || (p >= currentPage - 1 && p <= currentPage + 1)) {
                    return <button key={p} className={currentPage === p ? 'active' : ''} onClick={() => setCurrentPage(p)}>{p}</button>
                } else if (p === currentPage - 2 || p === currentPage + 2) {
                    return <span key={p} className="page-dots">⋯</span>
                }
                return null;
              })}
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
                <h3>Add New Grave Lot</h3>
                <p className="modal-subtitle">Enter lot details based on price list</p>
                
                <hr className="section-divider" />
                <div className="section-label"><i className="fas fa-info-circle"></i> Lot Information</div>
                <div className="form-group">
                    <label>Grave Number</label>
                    <input type="text" placeholder="e.g., A-142" value={form.grave} onChange={e => setForm({ ...form, grave: e.target.value })} />
                </div>
                <div className="form-row">
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
                    <div className="form-group">
                        <label>Section / Block</label>
                        <input type="text" placeholder="e.g., Section A" value={form.section} onChange={e => setForm({ ...form, section: e.target.value })} />
                    </div>
                </div>

                <hr className="section-divider" />
                <div className="section-label"><i className="fas fa-coins"></i> Pricing & Details (Auto-filled)</div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Lot Price</label>
                        <input type="text" readOnly style={{ background: "#f0f2f5", fontWeight: 600 }} value={PRICE_DATA[form.type]?.price || ''} />
                    </div>
                    <div className="form-group">
                        <label>Size / Capacity</label>
                        <input type="text" readOnly style={{ background: "#f0f2f5" }} value={PRICE_DATA[form.type]?.size || ''} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Status</label>
                        <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                            <option value="Available">🟢 Available</option>
                            <option value="Reserved">🟡 Reserved</option>
                            <option value="Occupied">🔴 Occupied</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Contract Term (years)</label>
                        <input type="text" readOnly style={{ background: "#f0f2f5" }} value={PRICE_DATA[form.type]?.contract || ''} />
                    </div>
                </div>
                <div className="form-group">
                    <label>Notes / Additional Info</label>
                    <input type="text" placeholder="e.g., Near chapel, scenic view" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
                </div>

                <div className="modal-actions">
                    <button className="btn-cancel" onClick={() => setAddModal(false)}>Cancel</button>
                    <button className="btn-confirm" onClick={confirmAdd}><i className="fas fa-check"></i> Add Lot</button>
                </div>
            </div>
        </div>
      )}

      {editModal && targetLot && (
        <div className="modal-overlay active" onClick={(e) => { if (e.target.className.includes('modal-overlay')) setEditModal(false) }}>
            <div className="modal">
                <div className="modal-icon" style={{ color: "#f39c12" }}><i className="fas fa-pen"></i></div>
                <h3>Edit Grave Lot</h3>
                <p className="modal-subtitle">Update lot details</p>
                
                <hr className="section-divider" />
                <div className="section-label"><i className="fas fa-info-circle"></i> Lot Information</div>
                <div className="form-group">
                    <label>Grave Number</label>
                    <input type="text" value={form.grave} onChange={e => setForm({ ...form, grave: e.target.value })} />
                </div>
                <div className="form-row">
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
                    <div className="form-group">
                        <label>Section / Block</label>
                        <input type="text" value={form.section} onChange={e => setForm({ ...form, section: e.target.value })} />
                    </div>
                </div>

                <hr className="section-divider" />
                <div className="section-label"><i className="fas fa-coins"></i> Pricing & Details</div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Lot Price</label>
                        <input type="text" readOnly style={{ background: "#f0f2f5", fontWeight: 600 }} value={PRICE_DATA[form.type]?.price || ''} />
                    </div>
                    <div className="form-group">
                        <label>Size / Capacity</label>
                        <input type="text" readOnly style={{ background: "#f0f2f5" }} value={PRICE_DATA[form.type]?.size || ''} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Status</label>
                        <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                            <option value="Available">🟢 Available</option>
                            <option value="Reserved">🟡 Reserved</option>
                            <option value="Occupied">🔴 Occupied</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Contract Term (years)</label>
                        <input type="text" readOnly style={{ background: "#f0f2f5" }} value={PRICE_DATA[form.type]?.contract || ''} />
                    </div>
                </div>
                <div className="form-group">
                    <label>Notes</label>
                    <input type="text" placeholder="e.g., Near chapel, scenic view" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
                </div>

                <div className="modal-actions">
                    <button className="btn-cancel" onClick={() => setEditModal(false)}>Cancel</button>
                    <button className="btn-confirm" onClick={confirmEdit}><i className="fas fa-save"></i> Save Changes</button>
                </div>
            </div>
        </div>
      )}

      {deleteModal && targetLot && (
        <div className="modal-overlay active" onClick={(e) => { if (e.target.className.includes('modal-overlay')) setDeleteModal(false) }}>
            <div className="modal">
                <div className="modal-icon" style={{ color: "#c0392b" }}><i className="fas fa-exclamation-triangle"></i></div>
                <h3>Delete Lot?</h3>
                <p>Are you sure you want to delete grave <strong>{targetLot.grave}</strong>? This action cannot be undone.</p>
                <div className="modal-actions">
                    <button className="btn-cancel" onClick={() => setDeleteModal(false)}>Cancel</button>
                    <button className="btn-danger-modal" onClick={confirmDelete}><i className="fas fa-trash"></i> Delete</button>
                </div>
            </div>
        </div>
      )}

      {viewModal && targetLot && (
        <div className="modal-overlay active" onClick={(e) => { if (e.target.className.includes('modal-overlay')) setViewModal(false) }}>
            <div className="modal" style={{ maxWidth: "600px" }}>
                <div className="modal-icon" style={{ color: "#3670AF" }}><i className="fas fa-tshirt"></i></div>
                <h3>Grave {targetLot.grave}</h3>
                <p className="modal-subtitle">Complete lot information</p>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem 1.5rem", marginBottom: "1.5rem" }}>
                    <div><span style={{ color: "#8aaccc", fontSize: "0.75rem" }}>Grave Number</span><br /><strong>{targetLot.grave}</strong></div>
                    <div><span style={{ color: "#8aaccc", fontSize: "0.75rem" }}>Section</span><br /><strong>{targetLot.section}</strong></div>
                    <div><span style={{ color: "#8aaccc", fontSize: "0.75rem" }}>Type</span><br />
                        <span className={`grave-badge ${graveTypeClasses[targetLot.type] || ''}`}><i className={`fas ${graveTypeIcons[targetLot.type] || 'fa-circle'}`}></i> {targetLot.type}</span>
                    </div>
                    <div><span style={{ color: "#8aaccc", fontSize: "0.75rem" }}>Status</span><br />
                        <span className={`status-badge ${statusColors[targetLot.status] || ''}`}><i className="fas fa-circle"></i> {targetLot.status}</span>
                    </div>
                    <div><span style={{ color: "#8aaccc", fontSize: "0.75rem" }}>Price</span><br /><strong>{PRICE_DATA[targetLot.type]?.price || '—'}</strong></div>
                    <div><span style={{ color: "#8aaccc", fontSize: "0.75rem" }}>Size / Capacity</span><br /><strong>{PRICE_DATA[targetLot.type]?.size || '—'}</strong></div>
                    <div><span style={{ color: "#8aaccc", fontSize: "0.75rem" }}>Contract Term</span><br /><strong>{PRICE_DATA[targetLot.type]?.contract || '—'}</strong></div>
                    <div><span style={{ color: "#8aaccc", fontSize: "0.75rem" }}>Notes</span><br /><strong>{targetLot.notes || 'None'}</strong></div>
                    <div style={{ gridColumn: "span 2" }}><span style={{ color: "#8aaccc", fontSize: "0.75rem" }}>Linked Burial Record</span><br />
                        <span style={{ fontSize: "0.9rem" }}>
                            {targetLot.status === 'Occupied' ? (
                                <a href="#" onClick={(e) => { e.preventDefault(); showToast(`Viewing linked burial record for ${targetLot.grave}`, 'info'); }}>View Burial Record</a>
                            ) : (
                                'No burial linked'
                            )}
                        </span>
                    </div>
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

export default GraveInventory;