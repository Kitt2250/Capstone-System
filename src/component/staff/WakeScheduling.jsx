import React, { useState, useEffect, useRef } from 'react';
import './wake-scheduling.css';
import './staff-shared.css';
import StaffTopbar from './StaffTopbar';
import { downloadCSV } from '../../utils/exportToCSV';

const INITIAL_CLIENTS = [
    { id: 'C-001', name: 'Ana Reyes', contact: '0917-123-4567', email: 'ana.reyes@email.com', relationship: 'Spouse' },
    { id: 'C-002', name: 'Roberto Dela Cruz', contact: '0918-234-5678', email: 'roberto.dc@email.com', relationship: 'Child' },
    { id: 'C-003', name: 'Maria Santos Jr.', contact: '0919-345-6789', email: 'maria.santos@email.com', relationship: 'Child' },
    { id: 'C-004', name: 'Pedro Garcia', contact: '0920-456-7890', email: 'pedro.garcia@email.com', relationship: 'Spouse' },
    { id: 'C-005', name: 'Carlos Tan', contact: '0921-567-8901', email: 'carlos.tan@email.com', relationship: 'Child' },
    { id: 'C-006', name: 'Lourdes Garcia', contact: '0922-678-9012', email: 'lourdes.g@email.com', relationship: 'Spouse' },
    { id: 'C-007', name: 'Felipe Mendoza', contact: '0923-789-0123', email: 'felipe.m@email.com', relationship: 'Child' },
];

const INITIAL_WAKES = [
    { id: 'WK-001', clientId: 'C-001', deceased: 'Alejandro Reyes Sr.', start: '2026-03-18', end: '2026-03-20', status: 'Confirmed', notes: 'Maglagay po ng 10 tables sa likod para sa food and drinks.' },
    { id: 'WK-002', clientId: 'C-002', deceased: 'Carmen Dela Cruz', start: '2026-03-19', end: '2026-03-21', status: 'Pending', notes: 'Sa likod po kami dadaan para sa loading/unloading.' },
    { id: 'WK-003', clientId: 'C-003', deceased: 'Jose Santos', start: '2026-03-16', end: '2026-03-18', status: 'Confirmed', notes: 'Mag-iwan po ng space para sa wheelchair sa harap.' },
    { id: 'WK-004', clientId: 'C-004', deceased: 'Lourdes Garcia', start: '2026-03-10', end: '2026-03-12', status: 'Completed', notes: '' },
    { id: 'WK-005', clientId: 'C-005', deceased: 'Miguel Tan', start: '2026-03-22', end: '2026-03-24', status: 'Confirmed', notes: 'Large group expected' },
    { id: 'WK-006', clientId: 'C-006', deceased: 'Ramon Garcia', start: '2026-03-25', end: '2026-03-27', status: 'Pending', notes: '' },
    { id: 'WK-007', clientId: 'C-007', deceased: 'Teresita Mendoza', start: '2026-03-28', end: '2026-03-30', status: 'Confirmed', notes: '' }
];

export default function WakeScheduling() {
    const [wakes, setWakes] = useState(INITIAL_WAKES);
    const [clients, setClients] = useState(INITIAL_CLIENTS);
    
    // View state
    const [viewMode, setViewMode] = useState('list'); // 'list' | 'calendar'
    
    // Search & Filter state
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    // Toast
    const [toasts, setToasts] = useState([]);
    const toastIdRef = useRef(0);

    const showToast = (message, type = 'success') => {
        const id = ++toastIdRef.current;
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
    };

    // Calendar state
    const todayDate = new Date();
    const [currentMonth, setCurrentMonth] = useState(todayDate.getMonth());
    const [currentYear, setCurrentYear] = useState(todayDate.getFullYear());

    // Availability Checker state
    const [availStart, setAvailStart] = useState(new Date().toISOString().slice(0, 10));
    const [availEnd, setAvailEnd] = useState(() => {
        const d = new Date();
        d.setDate(d.getDate() + 3);
        return d.toISOString().slice(0, 10);
    });
    const [availResult, setAvailResult] = useState({ type: 'idle', msg: 'Enter dates to check' });

    // Modal states
    const [addModal, setAddModal] = useState({ show: false, editId: null });
    const [viewModal, setViewModal] = useState({ show: false, wakeId: null });
    const [deleteModal, setDeleteModal] = useState({ show: false, wakeId: null });
    
    // Form states for Add/Edit
    const [formData, setFormData] = useState({ deceased: '', start: '', end: '', status: 'Pending', notes: '' });
    const [selectedClientId, setSelectedClientId] = useState(null);
    const [clientSearch, setClientSearch] = useState('');
    const [showClientResults, setShowClientResults] = useState(false);
    const [showNewClientForm, setShowNewClientForm] = useState(false);
    const [newClientData, setNewClientData] = useState({ name: '', contact: '', email: '', relationship: '' });
    
    // Printing state
    const [printSlip, setPrintSlip] = useState(null);

    // Helpers
    const getClient = (id) => clients.find(c => c.id === id);
    const formatDate = (dateStr) => {
        if (!dateStr) return '—';
        return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    // Process Data
    const filteredWakes = wakes.filter(w => {
        const client = getClient(w.clientId);
        const matchSearch = !searchTerm || 
            w.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
            (client && client.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            w.deceased.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus = statusFilter === 'all' || w.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const totalPages = Math.ceil(filteredWakes.length / rowsPerPage);
    const paginatedWakes = filteredWakes.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    // Stats
    const todayStr = new Date().toISOString().slice(0, 10);
    const todayWakes = wakes.filter(w => w.status !== 'Cancelled' && w.start <= todayStr && w.end >= todayStr);
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().slice(0, 10);
    const tomorrowWakes = wakes.filter(w => w.status !== 'Cancelled' && w.status !== 'Completed' && w.start <= tomorrowStr && w.end >= tomorrowStr);

    let bookedDaysThisMonth = new Set();
    wakes.forEach(w => {
        if (w.status === 'Cancelled' || w.status === 'Completed') return;
        let d = new Date(w.start);
        const e = new Date(w.end);
        while(d <= e) {
            if(d.getMonth() === todayDate.getMonth() && d.getFullYear() === todayDate.getFullYear()){
                bookedDaysThisMonth.add(d.getDate());
            }
            d.setDate(d.getDate() + 1);
        }
    });
    const daysInThisMonth = new Date(todayDate.getFullYear(), todayDate.getMonth() + 1, 0).getDate();
    const utilization = Math.round((bookedDaysThisMonth.size / daysInThisMonth) * 100);

    // Check Availability
    const handleCheckAvailability = () => {
        if (!availStart || !availEnd) {
            setAvailResult({ type: 'idle', msg: 'Please select both dates' });
            return;
        }
        if (availEnd < availStart) {
            setAvailResult({ type: 'unavailable', msg: 'End date must be after start date' });
            return;
        }
        const conflicts = wakes.filter(w => {
            if (w.status === 'Cancelled' || w.status === 'Completed') return false;
            return (availStart <= w.end && availEnd >= w.start);
        });
        if (conflicts.length > 0) {
            const names = conflicts.map(w => `${getClient(w.clientId)?.name} (${w.start} to ${w.end})`).join('; ');
            setAvailResult({ type: 'unavailable', msg: `Booked by: ${names}` });
        } else {
            setAvailResult({ type: 'available', msg: '✅ Wake space is AVAILABLE' });
        }
    };

    // Calendar logic
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
    
    const changeMonth = (delta) => {
        let newM = currentMonth + delta;
        let newY = currentYear;
        if(newM > 11) { newM = 0; newY++; }
        if(newM < 0) { newM = 11; newY--; }
        setCurrentMonth(newM);
        setCurrentYear(newY);
    };
    
    // Handlers
    const handleAddClick = () => {
        setFormData({ deceased: '', start: todayStr, end: tomorrowStr, status: 'Pending', notes: '' });
        setSelectedClientId(null);
        setClientSearch('');
        setShowClientResults(false);
        setShowNewClientForm(false);
        setAddModal({ show: true, editId: null });
    };

    const handleEditClick = (id) => {
        const w = wakes.find(w => w.id === id);
        if(!w) return;
        const c = getClient(w.clientId);
        setFormData({ deceased: w.deceased, start: w.start, end: w.end, status: w.status, notes: w.notes });
        setSelectedClientId(w.clientId);
        setClientSearch(c ? c.name : '');
        setShowClientResults(false);
        setShowNewClientForm(false);
        setAddModal({ show: true, editId: id });
    };

    const handleSaveWake = () => {
        if (!selectedClientId) { showToast('Please select a client', 'warning'); return; }
        if (!formData.deceased || !formData.start || !formData.end) { showToast('Please fill required fields', 'warning'); return; }
        
        const conflicts = wakes.filter(w => {
            if (addModal.editId && w.id === addModal.editId) return false;
            if (w.status === 'Cancelled' || w.status === 'Completed') return false;
            return (formData.start <= w.end && formData.end >= w.start);
        });
        
        if (conflicts.length > 0) { showToast('Conflict detected! Space is already booked.', 'error'); return; }

        if (addModal.editId) {
            setWakes(wakes.map(w => w.id === addModal.editId ? { ...w, ...formData, clientId: selectedClientId } : w));
            showToast(`✅ Wake ${addModal.editId} updated!`);
        } else {
            const newId = `WK-${String(wakes.length + 1).padStart(3, '0')}`;
            setWakes([...wakes, { id: newId, clientId: selectedClientId, ...formData }]);
            showToast(`✅ Wake ${newId} created!`);
        }
        setAddModal({ show: false, editId: null });
    };

    const handleSaveNewClient = () => {
        if(!newClientData.name || !newClientData.contact) { showToast('Name and contact required', 'warning'); return; }
        const newId = `C-${String(clients.length + 1).padStart(3, '0')}`;
        setClients([...clients, { id: newId, ...newClientData }]);
        setSelectedClientId(newId);
        setClientSearch(newClientData.name);
        setShowNewClientForm(false);
        showToast('Client added successfully');
    };

    const confirmDelete = () => {
        setWakes(wakes.filter(w => w.id !== deleteModal.wakeId));
        showToast(`🗑️ Reservation cancelled`, 'success');
        setDeleteModal({ show: false, wakeId: null });
    };

    const handlePrint = (wake) => {
        setPrintSlip(wake);
        setTimeout(() => {
            window.print();
            setTimeout(() => setPrintSlip(null), 500);
        }, 100);
    };

    const getStatusClass = (st) => st === 'Confirmed' ? 'confirmed' : st === 'Pending' ? 'pending' : st === 'Completed' ? 'completed' : 'cancelled';
    const exportWakes = () => {
        showToast(`⏳ Generating CSV for ${filteredWakes.length} wakes...`, 'info');
        setTimeout(() => {
            // Need to merge wake and client data for a useful export
            const exportData = filteredWakes.map(w => {
                const c = getClient(w.clientId);
                return {
                    'Booking ID': w.id,
                    'Client Name': c ? c.name : 'Unknown',
                    'Contact': c ? c.contact : 'Unknown',
                    'Deceased': w.deceased,
                    'Start Date': w.start,
                    'End Date': w.end,
                    'Status': w.status,
                    'Notes': w.notes || ''
                };
            });
            downloadCSV(exportData, `Wake_Schedules_${new Date().toISOString().slice(0,10)}.csv`);
            showToast(`✅ ${filteredWakes.length} wakes exported!`, 'success');
        }, 1000);
    };

    return (
        <div className="wk-page">
            
            {/* Toast Container */}
            <div style={{position: 'fixed', top: '20px', right: '20px', zIndex: 10000, display: 'flex', flexDirection: 'column', gap: '10px'}}>
                {toasts.map(t => (
                    <div key={t.id} className={`toast ${t.type} show`} style={{position: 'relative', transform: 'none', top: 'auto', right: 'auto'}}>
                        <span>{t.message}</span>
                        <button className="toast-close" onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))}>×</button>
                    </div>
                ))}
            </div>

            <StaffTopbar title="Wake Scheduling" greeting="Manage wake space reservations — client-first booking" />

            {/* Print Slip (hidden unless printing) */}
            {printSlip && (
                <div className="confirmation-slip">
                    <div className="slip-header">
                        <h2>🕊️ Cherubim of Heaven</h2>
                        <p>Memorial Park · Wake Space Confirmation</p>
                    </div>
                    <div className="slip-body">
                        <div className="row" style={{display:'flex',justifyContent:'space-between',borderBottom:'1px dotted #ccc',padding:'4px 0'}}><span className="label">Booking ID</span><span className="value">{printSlip.id}</span></div>
                        <div className="row" style={{display:'flex',justifyContent:'space-between',borderBottom:'1px dotted #ccc',padding:'4px 0'}}><span className="label">Client</span><span className="value">{getClient(printSlip.clientId)?.name}</span></div>
                        <div className="row" style={{display:'flex',justifyContent:'space-between',borderBottom:'1px dotted #ccc',padding:'4px 0'}}><span className="label">Deceased</span><span className="value">{printSlip.deceased}</span></div>
                        <div className="row" style={{display:'flex',justifyContent:'space-between',borderBottom:'1px dotted #ccc',padding:'4px 0'}}><span className="label">Dates</span><span className="value">{printSlip.start} to {printSlip.end}</span></div>
                        <div className="row" style={{display:'flex',justifyContent:'space-between',borderBottom:'1px dotted #ccc',padding:'4px 0'}}><span className="label">Status</span><span className="value">{printSlip.status}</span></div>
                    </div>
                    <div className="slip-footer">
                        <div className="space-only">Space Only: Caskets, flowers, and other items not included.</div>
                    </div>
                </div>
            )}

            {/* Stats Row */}
            <div className="stats-row" style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', marginBottom: '1.5rem'}}>
                <div className="stat-box" style={{background: '#f8fafc', padding: '1rem 1.2rem', borderRadius: '12px', border: '1px solid rgba(212,175,55,0.06)'}}>
                    <div className="stat-num blue" style={{fontSize: '1.8rem', fontWeight: 700, color: '#3670AF'}}>{wakes.length}</div>
                    <div className="stat-label" style={{fontSize: '0.7rem', color: '#7a9fbe', fontWeight: 600, textTransform: 'uppercase'}}>Total Bookings</div>
                </div>
                <div className="stat-box" style={{background: '#f8fafc', padding: '1rem 1.2rem', borderRadius: '12px', border: '1px solid rgba(212,175,55,0.06)'}}>
                    <div className="stat-num green" style={{fontSize: '1.8rem', fontWeight: 700, color: '#27ae60'}}>{wakes.filter(w => w.status === 'Confirmed').length}</div>
                    <div className="stat-label" style={{fontSize: '0.7rem', color: '#7a9fbe', fontWeight: 600, textTransform: 'uppercase'}}>Confirmed</div>
                </div>
                <div className="stat-box" style={{background: '#f8fafc', padding: '1rem 1.2rem', borderRadius: '12px', border: '1px solid rgba(212,175,55,0.06)'}}>
                    <div className="stat-num orange" style={{fontSize: '1.8rem', fontWeight: 700, color: '#f39c12'}}>{wakes.filter(w => w.status === 'Pending').length}</div>
                    <div className="stat-label" style={{fontSize: '0.7rem', color: '#7a9fbe', fontWeight: 600, textTransform: 'uppercase'}}>Pending</div>
                </div>
                <div className="stat-box" style={{background: '#f8fafc', padding: '1rem 1.2rem', borderRadius: '12px', border: '1px solid rgba(212,175,55,0.06)'}}>
                    <div className="stat-num purple" style={{fontSize: '1.8rem', fontWeight: 700, color: '#8e44ad'}}>{wakes.filter(w => w.status === 'Completed').length}</div>
                    <div className="stat-label" style={{fontSize: '0.7rem', color: '#7a9fbe', fontWeight: 600, textTransform: 'uppercase'}}>Completed</div>
                </div>
                <div className="stat-box" style={{background: '#f8fafc', padding: '1rem 1.2rem', borderRadius: '12px', border: '1px solid rgba(212,175,55,0.06)'}}>
                    <div className="stat-num blue" style={{fontSize: '1.8rem', fontWeight: 700, color: '#3670AF'}}>{utilization}%</div>
                    <div className="stat-label" style={{fontSize: '0.7rem', color: '#7a9fbe', fontWeight: 600, textTransform: 'uppercase'}}>Utilization</div>
                </div>
            </div>

            {/* Today Overview */}
            <div className="today-overview">
                <div className="today-label"><i className="fas fa-calendar-day"></i> Today's Wake Schedule</div>
                <div className="today-stats">
                    <div className="stat"><span className="num blue">{todayWakes.length}</span> Total</div>
                    <div className="stat"><span className="num green">{todayWakes.filter(w=>w.status==='Confirmed').length}</span> Confirmed</div>
                    <div className="stat"><span className="num orange">{todayWakes.filter(w=>w.status==='Pending').length}</span> Pending</div>
                </div>
                <div style={{marginLeft: 'auto', fontSize: '0.7rem', color: '#8aaccc'}}>
                    <i className="fas fa-arrow-right"></i> Tomorrow: {tomorrowWakes.length} wakes
                </div>
            </div>

            {/* Info Banner */}
            <div className="info-banner">
                <i className="fas fa-info-circle"></i>
                <span><strong>Wake Space Only:</strong> This booking is for the wake venue space only. Caskets, flowers, sound systems, and other items are <strong>not included</strong>.</span>
            </div>

            {/* Availability Checker */}
            <div className="availability-checker">
                <div className="check-label"><i className="fas fa-check-circle"></i> Check Availability</div>
                <div className="date-inputs">
                    <input type="date" value={availStart} onChange={e => setAvailStart(e.target.value)} />
                    <input type="date" value={availEnd} onChange={e => setAvailEnd(e.target.value)} />
                    <button className="btn-primary" onClick={handleCheckAvailability} style={{padding: '0.4rem 1.2rem'}}>Check</button>
                </div>
                <div className={`check-result ${availResult.type}`}>
                    {availResult.msg}
                </div>
            </div>

            {/* View Toggles */}
            <div className="view-tabs">
                <button className={`tab-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>
                    <i className="fas fa-list"></i> List View
                </button>
                <button className={`tab-btn ${viewMode === 'calendar' ? 'active' : ''}`} onClick={() => setViewMode('calendar')}>
                    <i className="fas fa-calendar-alt"></i> Calendar View
                </button>
            </div>

            {/* CALENDAR VIEW */}
            {viewMode === 'calendar' && (
                <div className="calendar-view active">
                    <div className="calendar-header">
                        <div className="month-year"><i className="fas fa-calendar-alt"></i> {monthNames[currentMonth]} {currentYear}</div>
                        <div className="calendar-nav">
                            <button onClick={() => changeMonth(-1)}><i className="fas fa-chevron-left"></i></button>
                            <button className="today-btn" onClick={() => { setCurrentMonth(todayDate.getMonth()); setCurrentYear(todayDate.getFullYear()); }}>Today</button>
                            <button onClick={() => changeMonth(1)}><i className="fas fa-chevron-right"></i></button>
                        </div>
                    </div>
                    <div className="calendar-grid">
                        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <div key={d} className="day-header">{d}</div>)}
                        
                        {/* Prev Month Days */}
                        {Array.from({length: firstDayIndex}).map((_, i) => (
                            <div key={`prev-${i}`} className="day-cell other-month"><div className="day-number">{daysInPrevMonth - firstDayIndex + i + 1}</div></div>
                        ))}
                        
                        {/* Current Month Days */}
                        {Array.from({length: daysInMonth}).map((_, i) => {
                            const dNum = i + 1;
                            const dStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dNum).padStart(2, '0')}`;
                            const isToday = dStr === todayStr;
                            const dayWakes = wakes.filter(w => w.status !== 'Cancelled' && w.status !== 'Completed' && w.start <= dStr && w.end >= dStr);
                            
                            return (
                                <div key={`curr-${i}`} className={`day-cell ${isToday ? 'today' : ''} ${dayWakes.length===0 ? 'available-day' : ''}`} onClick={() => {
                                    if(dayWakes.length === 0) showToast(`${formatDate(dStr)} is available!`);
                                    else setViewModal({ show: true, wakeId: dayWakes[0].id });
                                }}>
                                    <div className="day-number">{dNum}</div>
                                    <div className="day-events">
                                        {dayWakes.length === 0 ? (
                                            <div style={{fontSize:'0.5rem',color:'#8aaccc',textAlign:'center',marginTop:'0.3rem'}}>Available</div>
                                        ) : (
                                            <>
                                                {dayWakes.slice(0, 2).map((w, wIdx) => (
                                                    <div key={wIdx} className={`event-dot ${getStatusClass(w.status)}`}>
                                                        {getClient(w.clientId)?.name}
                                                    </div>
                                                ))}
                                                {dayWakes.length > 2 && <div className="event-more">+{dayWakes.length - 2} more</div>}
                                            </>
                                        )}
                                    </div>
                                </div>
                            )
                        })}

                        {/* Next Month Days */}
                        {Array.from({length: (7 - ((firstDayIndex + daysInMonth) % 7)) % 7}).map((_, i) => (
                            <div key={`next-${i}`} className="day-cell other-month"><div className="day-number">{i + 1}</div></div>
                        ))}
                    </div>
                    <div className="calendar-legend">
                        <span><span className="dot confirmed"></span> Confirmed</span>
                        <span><span className="dot pending"></span> Pending</span>
                        <span><span className="dot available"></span> Available</span>
                    </div>
                </div>
            )}

            {/* LIST VIEW */}
            {viewMode === 'list' && (
                <div className="wake-container">
                    <div className="wake-header">
                        <div className="wake-header-left">
                            <h2><i className="fas fa-calendar-check" style={{color:'#d4af37',marginRight:'8px'}}></i>All Wake Schedules</h2>
                            <span className="wake-count">{filteredWakes.length} total</span>
                        </div>
                        <div className="wake-header-right">
                            <button className="btn-secondary" onClick={exportWakes}><i className="fas fa-file-export"></i> Export</button>
                            <button className="btn-primary" onClick={handleAddClick}><i className="fas fa-plus-circle"></i> New Reservation</button>
                        </div>
                    </div>

                    <div className="search-filter-bar" style={{display: 'flex', gap: '10px', marginBottom: '1.5rem', flexWrap: 'wrap'}}>
                        <div className="search-wrapper" style={{flex: 1, position: 'relative', minWidth: '200px'}}>
                            <i className="fas fa-search" style={{position:'absolute',left:'12px',top:'50%',transform:'translateY(-50%)',color:'#8aaccc'}}></i>
                            <input type="text" placeholder="Search by ID, client, or deceased..." style={{width:'100%',padding:'0.7rem 1rem 0.7rem 2.5rem',borderRadius:'10px',border:'1px solid #dce3ec'}} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                        </div>
                        <div className="filter-group">
                            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{padding:'0.7rem',borderRadius:'10px',border:'1px solid #dce3ec'}}>
                                <option value="all">All Status</option>
                                <option value="Confirmed">✅ Confirmed</option>
                                <option value="Pending">⏳ Pending</option>
                                <option value="Completed">✔️ Completed</option>
                                <option value="Cancelled">❌ Cancelled</option>
                            </select>
                        </div>
                    </div>

                    <div className="table-wrapper">
                        <table style={{width: '100%', borderCollapse: 'collapse'}}>
                            <thead style={{background: '#f8fafc', borderBottom: '2px solid #e8edf4'}}>
                                <tr>
                                    <th style={{padding:'0.9rem',textAlign:'left',fontSize:'0.75rem',color:'#1a3d5c'}}>ID</th>
                                    <th style={{padding:'0.9rem',textAlign:'left',fontSize:'0.75rem',color:'#1a3d5c'}}>CLIENT</th>
                                    <th style={{padding:'0.9rem',textAlign:'left',fontSize:'0.75rem',color:'#1a3d5c'}}>CONTACT</th>
                                    <th style={{padding:'0.9rem',textAlign:'left',fontSize:'0.75rem',color:'#1a3d5c'}}>DECEASED</th>
                                    <th style={{padding:'0.9rem',textAlign:'left',fontSize:'0.75rem',color:'#1a3d5c'}}>DATES</th>
                                    <th style={{padding:'0.9rem',textAlign:'left',fontSize:'0.75rem',color:'#1a3d5c'}}>STATUS</th>
                                    <th style={{padding:'0.9rem',textAlign:'center',fontSize:'0.75rem',color:'#1a3d5c'}}>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedWakes.map(w => (
                                    <tr key={w.id} style={{borderBottom:'1px solid #f0f2f5'}}>
                                        <td style={{padding:'0.9rem',fontSize:'0.85rem'}}><strong>{w.id}</strong></td>
                                        <td style={{padding:'0.9rem',fontSize:'0.85rem'}}>{getClient(w.clientId)?.name}</td>
                                        <td style={{padding:'0.9rem',fontSize:'0.85rem'}}>{getClient(w.clientId)?.contact}</td>
                                        <td style={{padding:'0.9rem',fontSize:'0.85rem'}}>{w.deceased}</td>
                                        <td style={{padding:'0.9rem',fontSize:'0.8rem'}}>{formatDate(w.start)} <br/><span style={{color:'#8aaccc'}}>to</span> {formatDate(w.end)}</td>
                                        <td style={{padding:'0.9rem'}}>
                                            <span className={`status-badge ${getStatusClass(w.status)}`}><i className={`fas ${getStatusIcon(w.status)}`}></i> {w.status}</span>
                                        </td>
                                        <td style={{padding:'0.9rem'}}>
                                            <div className="action-buttons" style={{display:'flex',gap:'4px',justifyContent:'center'}}>
                                                <button onClick={() => setViewModal({ show: true, wakeId: w.id })} className="btn-action-view" style={{width:'32px',height:'32px',borderRadius:'6px',border:'none',background:'#e3effa',color:'#3670AF',cursor:'pointer'}}><i className="fas fa-eye"></i></button>
                                                <button onClick={() => handleEditClick(w.id)} className="btn-action-edit" style={{width:'32px',height:'32px',borderRadius:'6px',border:'none',background:'#faf3e0',color:'#d4af37',cursor:'pointer'}}><i className="fas fa-pen"></i></button>
                                                {w.status !== 'Completed' && w.status !== 'Cancelled' && (
                                                    <button onClick={() => {
                                                        if(window.confirm('Mark as completed?')) {
                                                            setWakes(wakes.map(x => x.id === w.id ? {...x, status: 'Completed'} : x));
                                                            showToast('Marked as completed!');
                                                        }
                                                    }} className="btn-action-complete" style={{width:'32px',height:'32px',borderRadius:'6px',border:'none',background:'#eafaf1',color:'#27ae60',cursor:'pointer'}}><i className="fas fa-check-double"></i></button>
                                                )}
                                                <button onClick={() => setDeleteModal({ show: true, wakeId: w.id })} className="btn-action-delete" style={{width:'32px',height:'32px',borderRadius:'6px',border:'none',background:'#fdedec',color:'#c0392b',cursor:'pointer'}}><i className="fas fa-trash"></i></button>
                                                <button onClick={() => handlePrint(w)} className="btn-action-print" style={{width:'32px',height:'32px',borderRadius:'6px',border:'none',background:'#f0f2f5',color:'#5d6d7e',cursor:'pointer'}}><i className="fas fa-print"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {paginatedWakes.length === 0 && (
                                    <tr>
                                        <td colSpan="7" style={{textAlign:'center',padding:'2rem',color:'#8aaccc'}}>No schedules found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="pagination" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem'}}>
                        <div className="pagination-info" style={{fontSize: '0.85rem', color: '#7a9fbe'}}>Showing {paginatedWakes.length > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0} to {Math.min(currentPage * rowsPerPage, filteredWakes.length)} of {filteredWakes.length}</div>
                        <div className="pagination-controls" style={{display: 'flex', gap: '5px'}}>
                            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} style={{padding: '0.4rem 0.8rem', borderRadius: '6px', border: '1px solid #dce3ec', background: 'white', cursor: currentPage === 1 ? 'not-allowed' : 'pointer'}}><i className="fas fa-chevron-left"></i></button>
                            <button className="active" style={{padding: '0.4rem 0.8rem', borderRadius: '6px', border: 'none', background: '#d4af37', color: 'white', fontWeight: 600}}>{currentPage}</button>
                            <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(p => p + 1)} style={{padding: '0.4rem 0.8rem', borderRadius: '6px', border: '1px solid #dce3ec', background: 'white', cursor: (currentPage === totalPages || totalPages === 0) ? 'not-allowed' : 'pointer'}}><i className="fas fa-chevron-right"></i></button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODALS */}
            
            {/* ADD/EDIT MODAL */}
            {addModal.show && (
                <div className="modal-overlay active" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <div className="modal" style={{background: 'white', padding: '2rem', borderRadius: '16px', width: '90%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto'}}>
                        <div className="modal-icon" style={{color:'#d4af37', fontSize: '2.5rem', textAlign: 'center', marginBottom: '0.5rem'}}><i className="fas fa-calendar-plus"></i></div>
                        <h3 style={{textAlign: 'center', color: '#1a3d5c'}}>{addModal.editId ? 'Edit Reservation' : 'New Wake Reservation'}</h3>
                        <p className="modal-subtitle" style={{textAlign: 'center', color: '#8aaccc', fontSize: '0.85rem', marginBottom: '1.5rem'}}>Search for a client or add a new one, then book the space</p>
                        
                        <div className="service-note" style={{background: '#fef9e7', padding: '10px', borderRadius: '8px', fontSize: '0.8rem', marginBottom: '1rem', border: '1px solid #f0e8c8'}}>
                            <i className="fas fa-info-circle" style={{color: '#d4af37', marginRight: '6px'}}></i>
                            <strong>Space Only:</strong> This booking is for the venue space only. Caskets/flowers not included.
                        </div>

                        <div className="form-group" style={{marginBottom: '1rem', position: 'relative'}}>
                            <label style={{display:'block',fontWeight:600,marginBottom:'6px', fontSize: '0.85rem', color: '#1a3d5c'}}>Client <span style={{color:'#c0392b'}}>*</span></label>
                            
                            {!selectedClientId && (
                                <div style={{position:'relative'}}>
                                    <input type="text" placeholder="Search client by name..." value={clientSearch} onChange={e => {
                                        setClientSearch(e.target.value);
                                        setShowClientResults(true);
                                    }} style={{width:'100%',padding:'0.6rem 1rem',borderRadius:'8px',border:'1px solid #dce3ec', outline: 'none'}} />
                                    <button onClick={() => setShowNewClientForm(true)} style={{position:'absolute',right:'6px',top:'50%',transform:'translateY(-50%)',background:'#d4af37',border:'none',padding:'4px 10px',borderRadius:'6px',fontSize:'0.75rem',cursor:'pointer', color: '#1a3d5c', fontWeight: 600}}>+ New</button>
                                    
                                    {showClientResults && clientSearch && (
                                        <div style={{position:'absolute',top:'100%',left:0,right:0,background:'white',border:'1px solid #dce3ec',zIndex:10,maxHeight:'150px',overflowY:'auto', borderRadius: '8px', marginTop: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
                                            {clients.filter(c => c.name.toLowerCase().includes(clientSearch.toLowerCase())).map(c => (
                                                <div key={c.id} onClick={() => { setSelectedClientId(c.id); setShowClientResults(false); }} style={{padding:'8px 12px',borderBottom:'1px solid #eee',cursor:'pointer'}}>
                                                    <div style={{fontWeight: 500, color: '#1a3d5c', fontSize: '0.9rem'}}>{c.name}</div>
                                                    <div style={{fontSize:'0.75rem',color:'#7a9fbe'}}>{c.contact}</div>
                                                </div>
                                            ))}
                                            {clients.filter(c => c.name.toLowerCase().includes(clientSearch.toLowerCase())).length === 0 && (
                                                <div style={{padding:'10px',color:'#888',fontSize:'0.85rem', textAlign: 'center'}}>No clients found. Click + New.</div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {selectedClientId && (
                                <div style={{background:'#f8fafc',padding:'12px',borderRadius:'8px',border:'1px solid #e8edf4',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                                    <div>
                                        <strong style={{color: '#1a3d5c', display: 'block', fontSize: '0.9rem'}}>{getClient(selectedClientId)?.name}</strong>
                                        <div style={{fontSize:'0.75rem',color:'#7a9fbe'}}>{getClient(selectedClientId)?.contact}</div>
                                    </div>
                                    <button onClick={() => { setSelectedClientId(null); setClientSearch(''); }} style={{background:'white',border:'1px solid #dce3ec',padding:'4px 10px',borderRadius:'6px',cursor:'pointer',fontSize:'0.75rem', color: '#7a9fbe'}}>Change</button>
                                </div>
                            )}
                        </div>

                        {showNewClientForm && (
                            <div style={{background:'#f8fafc',padding:'15px',borderRadius:'8px',border:'1px solid #d4af37',marginBottom:'1rem'}}>
                                <div style={{fontWeight:600,marginBottom:'10px', color: '#1a3d5c', fontSize: '0.9rem'}}>Add New Client</div>
                                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'10px'}}>
                                    <input type="text" placeholder="Name *" value={newClientData.name} onChange={e=>setNewClientData({...newClientData,name:e.target.value})} style={{padding:'0.5rem',borderRadius:'6px',border:'1px solid #dce3ec', width: '100%'}} />
                                    <input type="text" placeholder="Contact *" value={newClientData.contact} onChange={e=>setNewClientData({...newClientData,contact:e.target.value})} style={{padding:'0.5rem',borderRadius:'6px',border:'1px solid #dce3ec', width: '100%'}} />
                                </div>
                                <div style={{display:'flex',gap:'10px'}}>
                                    <button onClick={handleSaveNewClient} style={{background:'#d4af37',border:'none',padding:'6px 12px',borderRadius:'6px',cursor:'pointer', color: '#1a3d5c', fontWeight: 600, fontSize: '0.8rem'}}>Save & Select</button>
                                    <button onClick={() => setShowNewClientForm(false)} style={{background:'none',border:'none',color:'#7a9fbe',cursor:'pointer', fontSize: '0.8rem'}}>Cancel</button>
                                </div>
                            </div>
                        )}

                        <div className="form-group" style={{marginBottom:'1rem'}}>
                            <label style={{display:'block',fontWeight:600,marginBottom:'6px', fontSize: '0.85rem', color: '#1a3d5c'}}>Deceased Name *</label>
                            <input type="text" value={formData.deceased} onChange={e=>setFormData({...formData,deceased:e.target.value})} style={{width:'100%',padding:'0.6rem 1rem',borderRadius:'8px',border:'1px solid #dce3ec', outline: 'none'}} />
                        </div>
                        
                        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'1rem'}}>
                            <div className="form-group">
                                <label style={{display:'block',fontWeight:600,marginBottom:'6px', fontSize: '0.85rem', color: '#1a3d5c'}}>Start Date *</label>
                                <input type="date" value={formData.start} onChange={e=>setFormData({...formData,start:e.target.value})} style={{width:'100%',padding:'0.6rem 1rem',borderRadius:'8px',border:'1px solid #dce3ec', outline: 'none'}} />
                            </div>
                            <div className="form-group">
                                <label style={{display:'block',fontWeight:600,marginBottom:'6px', fontSize: '0.85rem', color: '#1a3d5c'}}>End Date *</label>
                                <input type="date" value={formData.end} onChange={e=>setFormData({...formData,end:e.target.value})} style={{width:'100%',padding:'0.6rem 1rem',borderRadius:'8px',border:'1px solid #dce3ec', outline: 'none'}} />
                            </div>
                        </div>

                        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'1rem'}}>
                            <div className="form-group">
                                <label style={{display:'block',fontWeight:600,marginBottom:'6px', fontSize: '0.85rem', color: '#1a3d5c'}}>Status</label>
                                <select value={formData.status} onChange={e=>setFormData({...formData,status:e.target.value})} style={{width:'100%',padding:'0.6rem 1rem',borderRadius:'8px',border:'1px solid #dce3ec', outline: 'none'}}>
                                    <option value="Pending">Pending</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group" style={{marginBottom:'1.5rem'}}>
                            <label style={{display:'block',fontWeight:600,marginBottom:'6px', fontSize: '0.85rem', color: '#1a3d5c'}}>Notes (Space-related only)</label>
                            <textarea value={formData.notes} onChange={e=>setFormData({...formData,notes:e.target.value})} rows="2" style={{width:'100%',padding:'0.6rem 1rem',borderRadius:'8px',border:'1px solid #dce3ec', outline: 'none'}}></textarea>
                        </div>

                        <div style={{display:'flex',justifyContent:'flex-end',gap:'10px',borderTop:'1px solid #eee',paddingTop:'15px'}}>
                            <button onClick={() => setAddModal({show:false,editId:null})} style={{padding:'0.6rem 1.2rem',borderRadius:'8px',border:'none',background:'#e8edf4',cursor:'pointer', color: '#1a3d5c', fontWeight: 600}}>Cancel</button>
                            <button onClick={handleSaveWake} style={{padding:'0.6rem 1.2rem',borderRadius:'8px',border:'none',background:'#d4af37', color: '#1a3d5c', fontWeight:600,cursor:'pointer'}}>Save Reservation</button>
                        </div>
                    </div>
                </div>
            )}

            {/* VIEW MODAL */}
            {viewModal.show && (() => {
                const w = wakes.find(x => x.id === viewModal.wakeId);
                const c = w ? getClient(w.clientId) : null;
                if (!w) return null;
                return (
                    <div className="modal-overlay active" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <div className="modal" style={{background: 'white', padding: '2rem', borderRadius: '16px', width: '90%', maxWidth: '560px'}}>
                            <div className="modal-icon" style={{color:'#3670AF',fontSize:'3rem',textAlign:'center', marginBottom: '0.5rem'}}><i className="fas fa-info-circle"></i></div>
                            <h3 style={{textAlign:'center',marginBottom:'0.5rem', color: '#1a3d5c'}}>Wake Reservation Details</h3>
                            <p style={{textAlign:'center',color:'#7a9fbe',marginBottom:'1.5rem', fontSize: '0.9rem'}}>{c?.name} · {w.deceased}</p>

                            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem 1.5rem',marginBottom:'20px', background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e8edf4'}}>
                                <div><div style={{fontSize:'0.7rem',color:'#8aaccc',textTransform:'uppercase', fontWeight: 600, letterSpacing: '0.5px'}}>ID</div><div style={{fontWeight:500, color: '#1a3d5c'}}>{w.id}</div></div>
                                <div><div style={{fontSize:'0.7rem',color:'#8aaccc',textTransform:'uppercase', fontWeight: 600, letterSpacing: '0.5px'}}>Status</div><div><span className={`status-badge ${getStatusClass(w.status)}`}>{w.status}</span></div></div>
                                <div><div style={{fontSize:'0.7rem',color:'#8aaccc',textTransform:'uppercase', fontWeight: 600, letterSpacing: '0.5px'}}>Client</div><div style={{fontWeight:500, color: '#1a3d5c'}}>{c?.name}</div></div>
                                <div><div style={{fontSize:'0.7rem',color:'#8aaccc',textTransform:'uppercase', fontWeight: 600, letterSpacing: '0.5px'}}>Contact</div><div style={{fontWeight:500, color: '#1a3d5c'}}>{c?.contact}</div></div>
                                <div style={{gridColumn:'span 2'}}><div style={{fontSize:'0.7rem',color:'#8aaccc',textTransform:'uppercase', fontWeight: 600, letterSpacing: '0.5px'}}>Deceased</div><div style={{fontWeight:500, color: '#1a3d5c'}}>{w.deceased}</div></div>
                                <div><div style={{fontSize:'0.7rem',color:'#8aaccc',textTransform:'uppercase', fontWeight: 600, letterSpacing: '0.5px'}}>Start Date</div><div style={{fontWeight:500, color: '#1a3d5c'}}>{formatDate(w.start)}</div></div>
                                <div><div style={{fontSize:'0.7rem',color:'#8aaccc',textTransform:'uppercase', fontWeight: 600, letterSpacing: '0.5px'}}>End Date</div><div style={{fontWeight:500, color: '#1a3d5c'}}>{formatDate(w.end)}</div></div>
                                <div style={{gridColumn:'span 2'}}><div style={{fontSize:'0.7rem',color:'#8aaccc',textTransform:'uppercase', fontWeight: 600, letterSpacing: '0.5px'}}>Notes</div><div style={{color: '#1a3d5c', fontSize: '0.9rem'}}>{w.notes || 'None'}</div></div>
                            </div>

                            <div style={{display:'flex',justifyContent:'flex-end',gap:'10px',borderTop:'1px solid #eee',paddingTop:'15px'}}>
                                <button onClick={() => setViewModal({show:false,wakeId:null})} style={{padding:'0.6rem 1.2rem',borderRadius:'8px',border:'none',background:'#e8edf4',cursor:'pointer', color: '#1a3d5c', fontWeight: 600}}>Close</button>
                                <button onClick={() => { handlePrint(w); setViewModal({show:false,wakeId:null}); }} style={{padding:'0.6rem 1.2rem',borderRadius:'8px',border:'none',background:'#27ae60',color:'white',fontWeight:600,cursor:'pointer', display: 'flex', alignItems: 'center', gap: '6px'}}><i className="fas fa-print"></i> Print Slip</button>
                            </div>
                        </div>
                    </div>
                )
            })()}

            {/* DELETE MODAL */}
            {deleteModal.show && (
                <div className="modal-overlay active" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <div className="modal" style={{background: 'white', padding: '2rem', borderRadius: '16px', width: '90%', maxWidth: '400px'}}>
                        <div className="modal-icon" style={{color:'#c0392b',fontSize:'3rem',textAlign:'center', marginBottom: '0.5rem'}}><i className="fas fa-exclamation-triangle"></i></div>
                        <h3 style={{textAlign:'center',marginBottom:'0.5rem', color: '#1a3d5c'}}>Cancel Reservation?</h3>
                        <p style={{textAlign:'center',color:'#7a9fbe',marginBottom:'1.5rem', fontSize: '0.9rem'}}>Are you sure you want to cancel the reservation for <strong>{wakes.find(w=>w.id===deleteModal.wakeId)?.deceased}</strong>? This cannot be undone.</p>
                        <div style={{display:'flex',justifyContent:'center',gap:'10px'}}>
                            <button onClick={() => setDeleteModal({show:false,wakeId:null})} style={{padding:'0.6rem 1.2rem',borderRadius:'8px',border:'none',background:'#e8edf4',cursor:'pointer', color: '#1a3d5c', fontWeight: 600}}>No, Keep it</button>
                            <button onClick={confirmDelete} style={{padding:'0.6rem 1.2rem',borderRadius:'8px',border:'none',background:'#c0392b',color:'white',fontWeight:600,cursor:'pointer'}}>Yes, Cancel it</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
