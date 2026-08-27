import React, { useState } from 'react';
import './staff-shared.css';

const MOCK_WAKES = [
    { id: 'WS-001', venue: 'Chapel A', client: 'Ana Reyes', deceased: 'Alejandro Reyes Sr.', start: '2026-03-18', end: '2026-03-20', status: 'Confirmed' },
    { id: 'WS-002', venue: 'Chapel B', client: 'Miguel Tan', deceased: 'Rosario Tan', start: '2026-03-19', end: '2026-03-21', status: 'Confirmed' },
    { id: 'WS-003', venue: 'Open Pavilion', client: 'Jose Santos', deceased: 'Maria Santos', start: '2026-03-22', end: '2026-03-23', status: 'Pending' },
    { id: 'WS-004', venue: 'Chapel A', client: 'Carmen Dela Cruz', deceased: 'Pedro Dela Cruz', start: '2026-03-12', end: '2026-03-14', status: 'Completed' },
    { id: 'WS-005', venue: 'Function Hall', client: 'Lourdes Garcia', deceased: 'Antonio Garcia', start: '2026-03-25', end: '2026-03-27', status: 'Confirmed' },
];

const VENUES = [
    { name: 'Chapel A', type: 'Premium', capacity: '50-80 pax' },
    { name: 'Chapel B', type: 'Premium', capacity: '50-80 pax' },
    { name: 'Open Pavilion', type: 'Standard', capacity: '100+ pax' },
    { name: 'Function Hall', type: 'Standard', capacity: '150+ pax' },
];

export default function WakeScheduling() {
    const [wakes, setWakes] = useState(MOCK_WAKES);
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
    const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });
    const [dateRange, setDateRange] = useState({ start: '', end: '' });

    const showToast = (msg, type = 'success') => {
        setToast({ show: true, msg, type });
        setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3500);
    };

    const getStatusClass = (status) => {
        if (status === 'Confirmed') return 'confirmed';
        if (status === 'Pending') return 'pending';
        if (status === 'Completed') return 'completed';
        return 'cancelled';
    };

    return (
        <div className="wk-page">
            <div className="topbar">
                <div className="topbar-left">
                    <h1>Wake Scheduling <span>{"\u2726"}</span></h1>
                    <div className="greeting">Manage wake space reservations — client-first booking</div>
                </div>
                <div className="topbar-right">
                    <div className="date-badge"><i className="fas fa-calendar-alt"></i> August 2026</div>
                    <button className="notification-btn"><i className="fas fa-bell"></i><span className="dot"></span></button>
                </div>
            </div>

            <div className="stats-row" style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem'}}>
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
                    <div className="stat-num blue" style={{fontSize: '1.8rem', fontWeight: 700, color: '#1a3d5c'}}>{wakes.filter(w => w.status === 'Completed').length}</div>
                    <div className="stat-label" style={{fontSize: '0.7rem', color: '#7a9fbe', fontWeight: 600, textTransform: 'uppercase'}}>Completed</div>
                </div>
            </div>

            <div className="reports-container">
                <div className="reports-header" style={{borderBottom: '1px solid #e8edf4', paddingBottom: '1rem', marginBottom: '1.5rem'}}>
                    <div className="reports-header-left">
                        <h2><i className="fas fa-clipboard-list" style={{color: '#d4af37', marginRight: '8px'}}></i> Wake Schedule</h2>
                    </div>
                    <div className="reports-header-right">
                        <button className="btn-secondary" onClick={() => setViewMode(viewMode === 'list' ? 'calendar' : 'list')}>
                            <i className={viewMode === 'list' ? "fas fa-calendar-alt" : "fas fa-list"}></i> {viewMode === 'list' ? 'Calendar View' : 'List View'}
                        </button>
                        <button className="btn-primary" onClick={() => showToast('New booking feature coming soon!', 'info')}><i className="fas fa-plus"></i> New Booking</button>
                    </div>
                </div>

                <div className="date-filter-bar">
                    <span className="filter-label"><i className="fas fa-calendar-alt"></i> Date:</span>
                    <input type="date" value={dateRange.start} onChange={e => setDateRange({...dateRange, start: e.target.value})} />
                    <span style={{color: '#8aaccc'}}>to</span>
                    <input type="date" value={dateRange.end} onChange={e => setDateRange({...dateRange, end: e.target.value})} />
                    <button className="btn-secondary" style={{padding: '0.4rem 1rem'}} onClick={() => showToast('Filters applied!', 'success')}>Check</button>
                </div>

                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th><i className="fas fa-hashtag"></i> ID</th>
                                <th><i className="fas fa-map-marker-alt"></i> Venue</th>
                                <th><i className="fas fa-user"></i> Client</th>
                                <th><i className="fas fa-cross"></i> Deceased</th>
                                <th><i className="fas fa-calendar-alt"></i> Start Date</th>
                                <th><i className="fas fa-calendar-alt"></i> End Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {wakes.map((w, i) => (
                                <tr key={i}>
                                    <td><strong>{w.id}</strong></td>
                                    <td>{w.venue}</td>
                                    <td>{w.client}</td>
                                    <td>{w.deceased}</td>
                                    <td>{w.start}</td>
                                    <td>{w.end}</td>
                                    <td><span className={`status-badge ${getStatusClass(w.status)}`}>{w.status}</span></td>
                                </tr>
                            ))}
                            {wakes.length === 0 && (
                                <tr>
                                    <td colSpan="7" style={{textAlign: 'center', padding: '2rem', color: '#8aaccc'}}>No wake schedules found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div style={{marginTop: '2rem', padding: '1rem', background: '#eafaf1', border: '1px solid #27ae60', borderRadius: '10px', color: '#1e8449', fontSize: '0.85rem'}}>
                    <i className="fas fa-info-circle" style={{marginRight: '8px'}}></i> 
                    <strong>Wake Space Only:</strong> This booking is for the wake venue space only. Caskets, flowers, sound systems, and other items are <strong>not included</strong> and must be arranged separately by the family.
                </div>
            </div>

            {toast.show && (
                <div className={`toast ${toast.type} show`}>
                    <span>{toast.msg}</span>
                    <button className="toast-close" onClick={() => setToast({ ...toast, show: false })}>×</button>
                </div>
            )}
        </div>
    );
}
