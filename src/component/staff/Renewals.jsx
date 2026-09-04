import React, { useState, useEffect, useRef } from 'react';
import './renewals.css';
import './staff-shared.css';
import StaffTopbar from './StaffTopbar';

const RENEWAL_CONFIG = {
    'Columbarium': { fee: 0, term: 20, termLabel: '20-year contract (renewable)', feeHint: 'No renewal fee — only borrowing fee: ₱1,500/urn', color: 'columbarium', icon: 'fa-dove' },
    'Apartment': { fee: 3500, term: 7, termLabel: '7-year contract (renewable)', feeHint: '₱3,500 per year (₱24,500 for full 7-year term)', color: 'apartment', icon: 'fa-building' },
    'Bonevault': { fee: 2000, term: 10, termLabel: '10-year contract (renewable)', feeHint: '₱2,000 per year (₱20,000 for full 10-year term)', color: 'bonevault', icon: 'fa-box' }
};

const INITIAL_RENEWALS = [
    {
        id: 'REN-001', client: 'Rosa Mendoza', lot: 'Lot B-098', graveType: 'Apartment', currentTerm: '7 years (2019-2026)',
        renewalFee: 24500, paid: 0, status: 'expiring', lastRenewal: '2019-07-15', expiryDate: '2026-07-15',
        contactNumber: '0917-123-4567', email: 'rosa.m@email.com', address: '123 Mabini St., Brgy. San Juan, Hagonoy, Bulacan',
        termYears: 7, termMonths: 84, monthsElapsed: 78,
        notes: [
            { date: '2026-03-10 14:30', text: '📞 Called — Rosa confirmed she will renew', author: 'Staff' },
            { date: '2026-04-15 09:00', text: '📧 Sent renewal reminder via email', author: 'Staff' }
        ],
        renewalHistory: [{ date: '2019-07-15', amount: 24500, receipt: 'OR-2019-0280', term: '7 years' }]
    }, {
        id: 'REN-002', client: 'Carlos Tan', lot: 'Lot D-012', graveType: 'Bonevault', currentTerm: '10 years (2016-2026)',
        renewalFee: 20000, paid: 0, status: 'expiring', lastRenewal: '2016-11-08', expiryDate: '2026-11-08',
        contactNumber: '0918-234-5678', email: 'carlos.t@email.com', address: '456 Rizal Ave., Brgy. San Jose, Hagonoy, Bulacan',
        termYears: 10, termMonths: 120, monthsElapsed: 109,
        notes: [
            { date: '2026-08-01 10:00', text: '📞 Called — no answer, left message', author: 'Staff' },
            { date: '2026-08-15 16:20', text: '📱 Sent SMS reminder', author: 'Staff' }
        ],
        renewalHistory: [{ date: '2016-11-08', amount: 20000, receipt: 'OR-2016-0230', term: '10 years' }]
    }, {
        id: 'REN-003', client: 'Maria Cruz', lot: 'Lot B-047', graveType: 'Apartment', currentTerm: '7 years (2019-2026)',
        renewalFee: 24500, paid: 0, status: 'active', lastRenewal: '2019-07-28', expiryDate: '2026-07-28',
        contactNumber: '0920-456-7890', email: 'maria.c@email.com', address: '321 Bonifacio St., Brgy. San Isidro, Hagonoy, Bulacan',
        termYears: 7, termMonths: 84, monthsElapsed: 79,
        notes: [{ date: '2026-07-10 15:45', text: '📞 Called — Maria said she will renew before expiry', author: 'Staff' }],
        renewalHistory: [{ date: '2019-07-28', amount: 24500, receipt: 'OR-2019-0250', term: '7 years' }]
    }, {
        id: 'REN-004', client: 'Roberto Lim', lot: 'Lot D-014', graveType: 'Bonevault', currentTerm: '10 years (2015-2025)',
        renewalFee: 20000, paid: 0, status: 'expired', lastRenewal: '2015-05-15', expiryDate: '2025-05-15',
        contactNumber: '0923-789-0123', email: 'roberto.l@email.com', address: '789 Rizal St., Brgy. San Pablo, Hagonoy, Bulacan',
        termYears: 10, termMonths: 120, monthsElapsed: 132,
        notes: [
            { date: '2025-06-15 09:00', text: '⚠️ Contract expired. Multiple attempts to contact.', author: 'Staff' },
            { date: '2026-01-15 08:30', text: '⚠️ 8 months overdue. Escalated to Admin.', author: 'Admin' }
        ],
        renewalHistory: [{ date: '2015-05-15', amount: 20000, receipt: 'OR-2015-0230', term: '10 years' }]
    }, {
        id: 'REN-005', client: 'Ana Reyes', lot: 'Lot E-003', graveType: 'Columbarium', currentTerm: '20 years (2016-2036)',
        renewalFee: 0, paid: 0, status: 'active', lastRenewal: '2016-10-28', expiryDate: '2036-10-28',
        contactNumber: '0924-890-1234', email: 'ana.r@email.com', address: '321 Mabini St., Brgy. San Pedro, Hagonoy, Bulacan',
        termYears: 20, termMonths: 240, monthsElapsed: 118,
        notes: [{ date: '2026-03-15 09:00', text: '✅ Contract is active until 2036', author: 'Staff' }],
        renewalHistory: [{ date: '2016-10-28', amount: 0, receipt: 'OR-2016-0240', term: '20 years' }]
    }, {
        id: 'REN-006', client: 'Ramon Garcia', lot: 'Lot F-001', graveType: 'Apartment', currentTerm: '7 years (2021-2028)',
        renewalFee: 24500, paid: 0, status: 'active', lastRenewal: '2021-01-01', expiryDate: '2028-01-01',
        contactNumber: '0925-678-9012', email: 'ramon.g@email.com', address: '456 Rizal St., Brgy. San Isidro, Hagonoy, Bulacan',
        termYears: 7, termMonths: 84, monthsElapsed: 60,
        notes: [{ date: '2026-08-10 10:00', text: '📞 Called — Ramon asked about renewal options', author: 'Staff' }],
        renewalHistory: [{ date: '2021-01-01', amount: 24500, receipt: 'OR-2021-0010', term: '7 years' }]
    }, {
        id: 'REN-007', client: 'Teresita Cruz', lot: 'Lot G-002', graveType: 'Bonevault', currentTerm: '10 years (2026-2036)',
        renewalFee: 20000, paid: 20000, status: 'renewed', lastRenewal: '2026-08-28', expiryDate: '2036-08-28',
        contactNumber: '0926-789-0123', email: 'teresita.c@email.com', address: '789 Mabini St., Brgy. San Pedro, Hagonoy, Bulacan',
        termYears: 10, termMonths: 120, monthsElapsed: 0,
        notes: [{ date: '2026-08-28 16:00', text: '✅ Renewed! New term: 10 years (expires 2036-08-28)', author: 'Admin' }],
        renewalHistory: [
            { date: '2016-08-28', amount: 20000, receipt: 'OR-2016-0400', term: '10 years' },
            { date: '2026-08-28', amount: 20000, receipt: 'OR-2026-0350', term: '10 years' }
        ]
    }
];

export default function Renewals() {
    const [renewals, setRenewals] = useState(INITIAL_RENEWALS);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [graveTypeFilter, setGraveTypeFilter] = useState('all');
    
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 4;

    // Modals
    const [detailsModal, setDetailsModal] = useState({ show: false, renId: null });
    const [renewalModal, setRenewalModal] = useState({ show: false, renId: null });
    const [historyModal, setHistoryModal] = useState({ show: false, renId: null });
    
    // Renewal form state
    const [renAmount, setRenAmount] = useState('');
    const [renTerm, setRenTerm] = useState(0);
    const [renDate, setRenDate] = useState(new Date().toISOString().slice(0, 10));
    const [renReceipt, setRenReceipt] = useState('');
    
    // Notes form
    const [noteInput, setNoteInput] = useState('');

    // Toasts
    const [toasts, setToasts] = useState([]);
    const toastIdRef = useRef(0);
    
    const showToast = (message, type = 'success') => {
        const id = ++toastIdRef.current;
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
    };

    // Helpers
    const formatDate = (dateStr) => {
        if (!dateStr) return '—';
        return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const getDaysToExpiry = (ren) => {
        if (!ren.expiryDate || ren.status === 'renewed') return 0;
        const today = new Date();
        const expiry = new Date(ren.expiryDate);
        return Math.floor((expiry - today) / (1000 * 60 * 60 * 24));
    };

    const getExpiryBadge = (days) => {
        if (days > 90) return { class: 'current', label: '✅ Current' };
        if (days > 60) return { class: 'current', label: '✅ Active' };
        if (days > 30) return { class: 'warning', label: `⚠️ ${days}d left` };
        if (days > 0) return { class: 'urgent', label: `🚨 ${days}d left` };
        return { class: 'critical', label: `⛔ ${Math.abs(days)}d overdue` };
    };

    const getRemainingPercent = (ren) => {
        if (!ren.termMonths) return 0;
        const totalMonths = ren.termMonths;
        const elapsedMonths = ren.monthsElapsed || 0;
        const remainingMonths = Math.max(0, totalMonths - elapsedMonths);
        
        if (ren.status === 'expired') return 0;
        if (ren.status === 'expiring' && remainingMonths < 0) return 0;
        if (ren.status === 'renewed') return 100;
        
        const remainingPercent = Math.round((remainingMonths / totalMonths) * 100);
        return Math.max(0, Math.min(100, remainingPercent));
    };

    const getProgressColor = (ren) => {
        const remainingPercent = getRemainingPercent(ren);
        if (ren.status === 'expired' || remainingPercent <= 15) return 'red';
        if (remainingPercent <= 40) return 'yellow';
        return 'green';
    };

    const getRenewalFeeDisplay = (ren) => {
        const config = RENEWAL_CONFIG[ren.graveType];
        if (!config) return { fee: 0, display: '—' };
        if (config.fee === 0) return { fee: 0, display: '₱0 (no renewal fee)' };
        return { fee: config.fee * config.term, display: `₱${(config.fee * config.term).toLocaleString()} (₱${config.fee.toLocaleString()}/yr × ${config.term} yrs)` };
    };

    // Derived State
    const filteredRenewals = renewals.filter(ren => {
        const matchesSearch = searchTerm === '' ||
            ren.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ren.lot.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ren.id.toLowerCase().includes(searchTerm.toLowerCase());
        
        let matchesStatus = true;
        if (statusFilter !== 'all') matchesStatus = ren.status === statusFilter;
        
        const matchesGraveType = graveTypeFilter === 'all' || ren.graveType === graveTypeFilter;
        
        return matchesSearch && matchesStatus && matchesGraveType;
    });

    const paginated = filteredRenewals.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
    const totalPages = Math.ceil(filteredRenewals.length / rowsPerPage);

    // Stats
    const totalExpiring = renewals.filter(r => r.status === 'expiring').length;
    const expiredCount = renewals.filter(r => r.status === 'expired').length;
    const renewedCount = renewals.filter(r => r.status === 'renewed').length;

    // Actions
    const handleAddNote = (id) => {
        if (!noteInput.trim()) { showToast('Please enter a note', 'warning'); return; }
        setRenewals(prev => prev.map(r => {
            if (r.id === id) {
                const now = new Date();
                const dateStr = now.toISOString().slice(0, 10) + ' ' + now.toTimeString().slice(0, 5);
                return { ...r, notes: [...(r.notes || []), { date: dateStr, text: noteInput, author: 'Staff' }] };
            }
            return r;
        }));
        setNoteInput('');
        showToast('Note added successfully!');
    };

    const handleQuickAction = (id, action, text, icon) => {
        showToast(`${icon} ${text}...`, 'info');
        setTimeout(() => {
            setRenewals(prev => prev.map(r => {
                if (r.id === id) {
                    const now = new Date();
                    const dateStr = now.toISOString().slice(0, 10) + ' ' + now.toTimeString().slice(0, 5);
                    let noteText = '';
                    if (action === 'call') noteText = '📞 Called client - discussed renewal';
                    if (action === 'sms') noteText = '📱 Renewal reminder sent via SMS';
                    if (action === 'email') noteText = '📧 Renewal reminder sent';
                    if (action === 'contacted') noteText = '✅ Client contacted - followed up on renewal';
                    return { ...r, notes: [...(r.notes || []), { date: dateStr, text: noteText, author: 'Staff' }] };
                }
                return r;
            }));
            showToast(`${icon} Action completed!`);
        }, 1500);
    };

    const handleRenewClick = (ren) => {
        const config = RENEWAL_CONFIG[ren.graveType];
        setRenewalModal({ show: true, renId: ren.id });
        setRenAmount('');
        setRenTerm(config ? config.term : 0);
        setRenDate(new Date().toISOString().slice(0, 10));
        setRenReceipt(`OR-2026-${String(Math.floor(Math.random() * 9000 + 1000))}`);
    };

    const handleConfirmRenewal = () => {
        const ren = renewals.find(r => r.id === renewalModal.renId);
        if (!ren) return;
        const feeInfo = getRenewalFeeDisplay(ren);
        const amount = parseFloat(renAmount) || 0;
        
        if (feeInfo.fee > 0 && amount < feeInfo.fee) {
            showToast(`Amount must be at least ${feeInfo.display}`, 'error');
            return;
        }

        const newExpiry = new Date(renDate);
        newExpiry.setFullYear(newExpiry.getFullYear() + renTerm);
        const newExpiryStr = newExpiry.toISOString().slice(0, 10);

        setRenewals(prev => prev.map(r => {
            if (r.id === ren.id) {
                const now = new Date();
                const dateStr = now.toISOString().slice(0, 10) + ' ' + now.toTimeString().slice(0, 5);
                const hist = [...(r.renewalHistory || []), { date: renDate, amount, receipt: renReceipt, term: `${renTerm} years` }];
                const notes = [...(r.notes || []), { date: dateStr, text: `✅ Renewed! New term: ${renTerm} years (expires ${formatDate(newExpiryStr)})`, author: 'Staff' }];
                return {
                    ...r, paid: amount, status: 'renewed', lastRenewal: renDate, expiryDate: newExpiryStr,
                    termYears: renTerm, termMonths: renTerm * 12, monthsElapsed: 0,
                    currentTerm: `${renTerm} years (${renDate} - ${newExpiryStr})`,
                    renewalHistory: hist, notes
                };
            }
            return r;
        }));
        
        setRenewalModal({ show: false, renId: null });
        showToast(`✅ Renewal processed for ${ren.client}! Receipt: ${renReceipt}`);
    };

    return (
        <div className="renewals-page">
            <div style={{position: 'fixed', top: '20px', right: '20px', zIndex: 10000, display: 'flex', flexDirection: 'column', gap: '10px'}}>
                {toasts.map(t => (
                    <div key={t.id} className={`toast ${t.type} show`} style={{position: 'relative', transform: 'none', top: 'auto', right: 'auto'}}>
                        <span>{t.message}</span>
                        <button className="toast-close" onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))}>×</button>
                    </div>
                ))}
            </div>

            <StaffTopbar title="Renewals Management" greeting="Manage contract renewals — Columbarium, Apartment & Bone Vault only" />

            <div className="renewals-container">
                <div className="info-banner">
                    <i className="fas fa-info-circle"></i>
                    <span>
                        <strong>Renewable Grave Types:</strong>
                        <span className="renewable-tag">🔵 Columbarium</span> (20-year term),
                        <span className="renewable-tag">🟢 Apartment</span> (7-year term, ₱3,500/yr),
                        <span className="renewable-tag">⚪ Bone Vault</span> (10-year term, ₱2,000/yr)
                        <br />
                        <strong>Not Renewable:</strong>
                        <span className="non-renewable-tag">🟡 Single Niche</span> (Staggered/Pre-Need),
                        <span className="non-renewable-tag">🟣 Mausoleum</span> (Lot only),
                        <span className="non-renewable-tag">🌿 Garden Type</span> (No slots),
                        <span className="non-renewable-tag">🔴 Heroes Buried</span> (No slots)
                    </span>
                </div>

                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon gold"><i className="fas fa-clock"></i></div>
                        <div className="stat-label">Total Expiring Soon</div>
                        <div className="stat-value">{totalExpiring}</div>
                        <div className="stat-sub">Contracts expiring in 90 days</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon red"><i className="fas fa-exclamation-triangle"></i></div>
                        <div className="stat-label">Expired Contracts</div>
                        <div className="stat-value">{expiredCount}</div>
                        <div className="stat-sub">Past expiry date</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon green"><i className="fas fa-check-circle"></i></div>
                        <div className="stat-label">Renewed This Month</div>
                        <div className="stat-value">{renewedCount}</div>
                        <div className="stat-sub">Successfully renewed contracts</div>
                    </div>
                </div>

                <div className="search-bar">
                    <div className="search-wrapper">
                        <i className="fas fa-search search-icon"></i>
                        <input type="text" placeholder="Search by client name, lot, or ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        {searchTerm && <button className="clear-btn visible" onClick={() => setSearchTerm('')}><i className="fas fa-times"></i></button>}
                    </div>
                    <div className="filter-group">
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="expiring">Expiring Soon</option>
                            <option value="expired">Expired</option>
                            <option value="renewed">Renewed</option>
                        </select>
                        <select value={graveTypeFilter} onChange={(e) => setGraveTypeFilter(e.target.value)}>
                            <option value="all">All Renewable Types</option>
                            <option value="Columbarium">🔵 Columbarium</option>
                            <option value="Apartment">🟢 Apartment</option>
                            <option value="Bonevault">⚪ Bone Vault</option>
                        </select>
                    </div>
                </div>

                <div className="account-list">
                    {paginated.length === 0 ? (
                        <div className="empty-state">
                            <i className="fas fa-search"></i>
                            <p>No renewal accounts found matching your criteria</p>
                            <p style={{fontSize:'0.8rem',marginTop:'0.3rem'}}>Only Columbarium, Apartment, and Bone Vault are renewable.</p>
                        </div>
                    ) : paginated.map(ren => {
                        const isExpired = ren.status === 'expired';
                        const isRenewed = ren.status === 'renewed';
                        const isExpiring = ren.status === 'expiring';
                        const statusLabel = isRenewed ? 'Renewed' : isExpired ? 'Expired' : isExpiring ? 'Expiring Soon' : 'Active';
                        const statusClass = isRenewed ? 'renewed' : isExpired ? 'expired' : isExpiring ? 'expiring' : 'active';
                        const graveClass = RENEWAL_CONFIG[ren.graveType]?.color || '';
                        const daysToExpiry = getDaysToExpiry(ren);
                        const expiryBadge = getExpiryBadge(daysToExpiry);
                        const remainingPercent = getRemainingPercent(ren);
                        const progressColor = getProgressColor(ren);
                        const feeInfo = getRenewalFeeDisplay(ren);

                        return (
                            <div key={ren.id} className="account-card">
                                <div className="account-info">
                                    <div className="client-name">
                                        {ren.client}
                                        <span className={`status-badge ${statusClass}`}>{statusLabel}</span>
                                        {!isRenewed && daysToExpiry <= 30 && <span className={`expiry-badge ${expiryBadge.class}`}>{expiryBadge.label}</span>}
                                        <span className={`grave-type ${graveClass}`}>{ren.graveType}</span>
                                    </div>
                                    <div className="details">
                                        <span>{ren.lot}</span>
                                        <span className="ren-id">{ren.id}</span>
                                        {ren.expiryDate && <span>Expiry: {formatDate(ren.expiryDate)}</span>}
                                        {ren.lastRenewal && <span>Last Renewal: {formatDate(ren.lastRenewal)}</span>}
                                    </div>
                                    <div className="progress-container">
                                        <div className="progress-track">
                                            <div className={`progress-fill ${progressColor}`} style={{width: `${Math.min(remainingPercent, 100)}%`}}></div>
                                        </div>
                                        <div className="progress-label">
                                            <span>{remainingPercent}% remaining</span>
                                            <span>{isRenewed ? '✅ Renewed' : daysToExpiry > 0 ? `${daysToExpiry} days left` : `${Math.abs(daysToExpiry)} days overdue`}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="account-balance">
                                    <div className="paid">Renewal Fee: <strong>{feeInfo.display}</strong></div>
                                    <div className={`balance ${ren.paid >= feeInfo.fee ? 'positive' : (isRenewed ? 'zero' : 'negative')}`}>
                                        {ren.paid >= feeInfo.fee ? '✅ Renewed' : feeInfo.fee > 0 ? `₱${(feeInfo.fee - ren.paid).toLocaleString()} due` : '—'}
                                    </div>
                                </div>
                                <div className="account-actions">
                                    <button className="btn-details" onClick={() => setDetailsModal({ show: true, renId: ren.id })}><i className="fas fa-info-circle"></i> Details</button>
                                    <button className="btn-history" onClick={() => setHistoryModal({ show: true, renId: ren.id })}><i className="fas fa-history"></i> History</button>
                                    {!isRenewed && feeInfo.fee > 0 && (
                                        <button className="btn-renew" onClick={() => handleRenewClick(ren)}><i className="fas fa-sync-alt"></i> Renew</button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {totalPages > 0 && (
                    <div className="pagination">
                        <div className="pagination-info">Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, filteredRenewals.length)} of {filteredRenewals.length} contracts</div>
                        <div className="pagination-controls">
                            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}><i className="fas fa-chevron-left"></i></button>
                            <button className="active">{currentPage}</button>
                            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}><i className="fas fa-chevron-right"></i></button>
                        </div>
                    </div>
                )}
            </div>

            {/* DETAILS MODAL */}
            {detailsModal.show && (() => {
                const ren = renewals.find(r => r.id === detailsModal.renId);
                if (!ren) return null;
                const isRenewed = ren.status === 'renewed';
                const isExpired = ren.status === 'expired';
                const statusClass = isRenewed ? 'renewed' : isExpired ? 'expired' : ren.status === 'expiring' ? 'expiring' : 'active';
                const statusLabel = isRenewed ? 'Renewed' : isExpired ? 'Expired' : ren.status === 'expiring' ? 'Expiring Soon' : 'Active';
                const daysToExpiry = getDaysToExpiry(ren);
                const expiryBadge = getExpiryBadge(daysToExpiry);
                const remainingPercent = getRemainingPercent(ren);
                const progressColor = getProgressColor(ren);
                const feeInfo = getRenewalFeeDisplay(ren);
                const config = RENEWAL_CONFIG[ren.graveType];

                return (
                    <div className="modal-overlay active" onClick={() => setDetailsModal({show:false, renId: null})}>
                        <div className="modal" onClick={e => e.stopPropagation()} style={{maxWidth: '600px'}}>
                            <div className="modal-icon" style={{color:'#3670AF'}}><i className="fas fa-file-contract"></i></div>
                            <h3 style={{textAlign:'center', color:'#1a3d5c'}}>Renewal Details</h3>
                            <p className="modal-subtitle" style={{textAlign:'center', color:'#6a8aaa', marginBottom:'1.2rem'}}>{ren.lot} · {ren.id}</p>
                            
                            <div className="detail-grid">
                                <div className="detail-item"><div className="label">Client Name</div><div className="value">{ren.client}</div></div>
                                <div className="detail-item">
                                    <div className="label">📱 Contact</div>
                                    <div className="value contact-row">
                                        <span className="contact-value">{ren.contactNumber || 'N/A'}</span>
                                        <button className="btn-contact call" onClick={() => handleQuickAction(ren.id, 'call', 'Calling', '📞')}><i className="fas fa-phone"></i> Call</button>
                                        <button className="btn-contact sms" onClick={() => handleQuickAction(ren.id, 'sms', 'Sending SMS', '📱')}><i className="fas fa-sms"></i> SMS</button>
                                    </div>
                                </div>
                                <div className="detail-item" style={{gridColumn: 'span 2'}}><div className="label">✉️ Email</div><div className="value">{ren.email || 'N/A'}</div></div>
                                <div className="detail-item" style={{gridColumn: 'span 2'}}><div className="label">📍 Address</div><div className="value">{ren.address || 'N/A'}</div></div>
                                <div className="detail-item"><div className="label">Lot / Grave</div><div className="value">{ren.lot}</div></div>
                                <div className="detail-item"><div className="label">Grave Type</div><div className="value"><span className={`grave-badge ${config?.color}`}>{ren.graveType}</span></div></div>
                                <div className="detail-item"><div className="label">Contract ID</div><div className="value" style={{fontFamily: 'monospace'}}>{ren.id}</div></div>
                                <div className="detail-item">
                                    <div className="label">Status</div>
                                    <div className="value">
                                        <span className={`status-badge ${statusClass}`}>{statusLabel}</span>
                                        {!isRenewed && daysToExpiry <= 30 && <span className={`expiry-badge ${expiryBadge.class}`}>{expiryBadge.label}</span>}
                                    </div>
                                </div>
                                <div className="detail-item"><div className="label">Expiry Date</div><div className="value">{formatDate(ren.expiryDate)}</div></div>
                                <div className="detail-item">
                                    <div className="label">Days to Expiry / Overdue</div>
                                    <div className="value" style={{color: isRenewed ? '#27ae60' : daysToExpiry > 0 ? (daysToExpiry > 60 ? '#3670AF' : '#f39c12') : '#c0392b'}}>
                                        {isRenewed ? '✅ Renewed' : daysToExpiry > 0 ? `${daysToExpiry} days until expiry` : `${Math.abs(daysToExpiry)} days overdue`}
                                    </div>
                                </div>
                                <div className="detail-item" style={{gridColumn: 'span 2'}}><div className="label">Contract Plan</div><div className="value">{ren.currentTerm} · {ren.monthsElapsed || 0} of {ren.termMonths} months elapsed</div></div>
                                <div className="detail-item" style={{gridColumn: 'span 2'}}>
                                    <div className="label">💰 Renewal Summary</div>
                                    <div className="value" style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:'10px'}}>
                                        <span>Current Term: <strong>{ren.currentTerm}</strong></span>
                                        <span>Renewal Fee: <strong style={{color:'#d4af37'}}>{feeInfo.display}</strong></span>
                                        <span>New Term: <strong style={{color: ren.paid >= feeInfo.fee ? '#27ae60' : '#d4af37'}}>{config ? `${config.term} years` : '—'}</strong></span>
                                    </div>
                                </div>
                                <div className="detail-item" style={{gridColumn: 'span 2'}}>
                                    <div className="label">Contract Timeline</div>
                                    <div className="value">
                                        <div className="progress-container">
                                            <div className="progress-track"><div className={`progress-fill ${progressColor}`} style={{width: `${Math.min(remainingPercent, 100)}%`}}></div></div>
                                            <div className="progress-label"><span>{remainingPercent}% remaining</span><span>{isRenewed ? 'Renewed' : daysToExpiry > 0 ? `${daysToExpiry} days left` : `${Math.abs(daysToExpiry)} days overdue`}</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="detail-payments">
                                <div className="pay-title"><i className="fas fa-history"></i> Renewal History</div>
                                <div>
                                    {!ren.renewalHistory || ren.renewalHistory.length === 0 ? <div style={{textAlign:'center', color:'#8aaccc', fontSize:'0.8rem'}}>No renewal records.</div> : 
                                     ren.renewalHistory.map((p, i) => (
                                         <div key={i} className="detail-payment-item">
                                             <div><span className="dp-date">{formatDate(p.date)}</span><span className="dp-receipt" style={{marginLeft:'8px'}}>{p.receipt}</span><span style={{fontSize:'0.65rem',color:'#8aaccc',marginLeft:'4px'}}>{p.term}</span></div>
                                             <span className="dp-amount">₱{p.amount.toLocaleString()}</span>
                                         </div>
                                     ))}
                                </div>
                            </div>

                            <div className="notes-section">
                                <div className="notes-title"><i className="fas fa-sticky-note"></i> Notes & Follow-ups</div>
                                <div className="notes-list">
                                    {!ren.notes || ren.notes.length === 0 ? <div style={{textAlign:'center', color:'#8aaccc', fontSize:'0.8rem'}}>No notes yet.</div> : 
                                     ren.notes.map((n, i) => (
                                         <div key={i} className="note-item"><span className="note-text">{n.text}</span><span className="note-meta">{n.date} · {n.author}</span></div>
                                     ))}
                                </div>
                                <div className="notes-input-row">
                                    <input type="text" placeholder="Add a note..." value={noteInput} onChange={e => setNoteInput(e.target.value)} onKeyDown={e => { if(e.key==='Enter') handleAddNote(ren.id); }} />
                                    <button className="btn-add-note" onClick={() => handleAddNote(ren.id)}><i className="fas fa-plus"></i> Add</button>
                                </div>
                            </div>

                            <div className="quick-actions-row">
                                <button className="btn-quick print" onClick={() => window.print()}><i className="fas fa-print"></i> Print Contract</button>
                                <button className="btn-quick reminder" onClick={() => handleQuickAction(ren.id, 'email', 'Sending Reminder', '📧')}><i className="fas fa-envelope"></i> Send Reminder</button>
                                <button className="btn-quick contacted" onClick={() => handleQuickAction(ren.id, 'contacted', 'Marking as Contacted', '✅')}><i className="fas fa-check-circle"></i> Mark Contacted</button>
                            </div>

                            <div style={{display:'flex', gap:'10px', justifyContent:'flex-end', marginTop:'1.5rem', borderTop:'1px solid #e8edf4', paddingTop:'1.5rem'}}>
                                <button onClick={() => setDetailsModal({show:false, renId:null})} style={{background:'#e8edf4', color:'#1a3d5c', padding:'0.6rem 1.8rem', borderRadius:'10px', border:'none', fontWeight:600, cursor:'pointer'}}>Close</button>
                            </div>
                        </div>
                    </div>
                );
            })()}

            {/* RENEWAL MODAL */}
            {renewalModal.show && (() => {
                const ren = renewals.find(r => r.id === renewalModal.renId);
                if (!ren) return null;
                const config = RENEWAL_CONFIG[ren.graveType];
                const feeInfo = getRenewalFeeDisplay(ren);

                let newExpiryStr = '';
                if (renDate && renTerm > 0) {
                    const d = new Date(renDate);
                    d.setFullYear(d.getFullYear() + renTerm);
                    newExpiryStr = d.toISOString().slice(0, 10);
                }
                const isValidAmount = feeInfo.fee === 0 || (parseFloat(renAmount) >= feeInfo.fee);

                return (
                    <div className="modal-overlay active" onClick={() => setRenewalModal({show:false, renId:null})}>
                        <div className="modal" onClick={e => e.stopPropagation()} style={{maxWidth: '500px'}}>
                            <div className="modal-icon" style={{color:'#d4af37'}}><i className="fas fa-sync-alt"></i></div>
                            <h3 style={{textAlign:'center', color:'#1a3d5c'}}>Process Renewal</h3>
                            <p className="modal-subtitle" style={{textAlign:'center', color:'#6a8aaa', marginBottom:'1.2rem'}}>Enter renewal details for this contract</p>

                            <div style={{background:'#f8fafc', borderRadius:'10px', padding:'0.8rem 1rem', marginBottom:'1rem', border:'1px solid #e8edf4'}}>
                                <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.85rem',padding:'2px 0'}}><span style={{color:'#7a9fbe'}}>Client</span><span style={{fontWeight:500,color:'#1a3d5c'}}>{ren.client}</span></div>
                                <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.85rem',padding:'2px 0'}}><span style={{color:'#7a9fbe'}}>Lot</span><span style={{fontWeight:500,color:'#1a3d5c'}}>{ren.lot}</span></div>
                                <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.85rem',padding:'2px 0'}}><span style={{color:'#7a9fbe'}}>Grave Type</span><span style={{fontWeight:500,color:'#1a3d5c'}}>{ren.graveType}</span></div>
                                <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.85rem',padding:'2px 0'}}><span style={{color:'#7a9fbe'}}>Current Expiry</span><span style={{fontWeight:500,color:'#c0392b'}}>{formatDate(ren.expiryDate)}</span></div>
                                <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.85rem',padding:'2px 0'}}><span style={{color:'#7a9fbe'}}>Contract Term</span><span style={{fontWeight:500,color:'#1a3d5c'}}>{ren.currentTerm}</span></div>
                            </div>

                            <div style={{marginBottom:'1rem'}}>
                                <label style={{display:'block',fontWeight:500,color:'#1a3d5c',marginBottom:'4px',fontSize:'0.85rem'}}>Renewal Fee <span style={{color:'#c0392b',fontSize:'0.7rem'}}>(Cash only)</span></label>
                                <input type="number" value={renAmount} onChange={e => setRenAmount(e.target.value)} placeholder="0.00" style={{width:'100%',padding:'0.6rem 1rem',border:'1px solid #dce3ec',borderRadius:'10px',outline:'none'}} />
                                <div style={{fontSize:'0.65rem',color:'#8aaccc',marginTop:'4px'}}>{config?.feeHint}</div>
                            </div>

                            <div style={{marginBottom:'1rem'}}>
                                <label style={{display:'block',fontWeight:500,color:'#1a3d5c',marginBottom:'4px',fontSize:'0.85rem'}}>Renewal Term</label>
                                <select value={renTerm} onChange={e => setRenTerm(parseInt(e.target.value))} style={{width:'100%',padding:'0.6rem 1rem',border:'1px solid #dce3ec',borderRadius:'10px',outline:'none'}}>
                                    <option value={config?.term}>{config?.term} years</option>
                                    {config?.term > 1 && Math.floor(config.term / 2) > 0 && <option value={Math.floor(config.term / 2)}>{Math.floor(config.term / 2)} years</option>}
                                </select>
                            </div>

                            <div style={{marginBottom:'1rem'}}>
                                <label style={{display:'block',fontWeight:500,color:'#1a3d5c',marginBottom:'4px',fontSize:'0.85rem'}}>Renewal Date</label>
                                <input type="date" value={renDate} onChange={e => setRenDate(e.target.value)} style={{width:'100%',padding:'0.6rem 1rem',border:'1px solid #dce3ec',borderRadius:'10px',outline:'none'}} />
                            </div>

                            <div style={{marginBottom:'1rem'}}>
                                <label style={{display:'block',fontWeight:500,color:'#1a3d5c',marginBottom:'4px',fontSize:'0.85rem'}}>New Expiry Date</label>
                                <input type="date" disabled value={newExpiryStr} style={{width:'100%',padding:'0.6rem 1rem',border:'1px solid #dce3ec',borderRadius:'10px',outline:'none',background:'#f0f2f5',fontWeight:600}} />
                            </div>

                            <div style={{marginBottom:'1rem'}}>
                                <label style={{display:'block',fontWeight:500,color:'#1a3d5c',marginBottom:'4px',fontSize:'0.85rem'}}>OR Number <span style={{color:'#8aaccc',fontSize:'0.7rem'}}>(Auto-generated)</span></label>
                                <input type="text" disabled value={renReceipt} style={{width:'100%',padding:'0.6rem 1rem',border:'1px solid #dce3ec',borderRadius:'10px',outline:'none',background:'#f0f2f5',fontFamily:'monospace'}} />
                            </div>

                            <div style={{background:'#fef9e7', borderLeft:'3px solid #f39c12', padding:'0.4rem 0.8rem', borderRadius:'6px', fontSize:'0.7rem', color:'#7a9fbe', marginBottom:'1rem'}}>
                                <i className="fas fa-info-circle" style={{color:'#f39c12'}}></i> Cash payment only. Contract will be extended to the new expiry date.
                            </div>

                            <div style={{display:'flex', gap:'10px', justifyContent:'flex-end'}}>
                                <button onClick={() => setRenewalModal({show:false, renId:null})} style={{background:'#e8edf4', color:'#1a3d5c', padding:'0.6rem 1.8rem', borderRadius:'10px', border:'none', fontWeight:600, cursor:'pointer'}}>Cancel</button>
                                <button onClick={handleConfirmRenewal} disabled={!isValidAmount} style={{background:'#d4af37', color:'#1a3d5c', padding:'0.6rem 1.8rem', borderRadius:'10px', border:'none', fontWeight:600, cursor: isValidAmount ? 'pointer' : 'not-allowed', opacity: isValidAmount ? 1 : 0.5}}>
                                    <i className="fas fa-check"></i> Process Renewal
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })()}

            {/* HISTORY MODAL */}
            {historyModal.show && (() => {
                const ren = renewals.find(r => r.id === historyModal.renId);
                if (!ren) return null;
                return (
                    <div className="modal-overlay active" onClick={() => setHistoryModal({show:false, renId:null})}>
                        <div className="modal" onClick={e => e.stopPropagation()} style={{maxWidth: '400px'}}>
                            <div className="modal-icon" style={{color:'#3670AF'}}><i className="fas fa-history"></i></div>
                            <h3 style={{textAlign:'center', color:'#1a3d5c'}}>Renewal History</h3>
                            <p className="modal-subtitle" style={{textAlign:'center', color:'#6a8aaa', marginBottom:'1.2rem'}}>{ren.lot} ({ren.graveType}) · {ren.id}</p>
                            
                            <div className="history-list">
                                {!ren.renewalHistory || ren.renewalHistory.length === 0 ? <div className="history-empty">No renewal records.</div> : 
                                 ren.renewalHistory.map((p, i) => (
                                     <div key={i} className="history-item">
                                         <div>
                                             <div className="h-date">{formatDate(p.date)}</div>
                                             <div className="h-receipt">{p.receipt}</div>
                                             <div style={{fontSize:'0.65rem', color:'#8aaccc'}}>{p.term}</div>
                                         </div>
                                         <div className="h-amount">₱{p.amount.toLocaleString()}</div>
                                     </div>
                                 ))}
                            </div>

                            <div style={{marginTop:'1rem', padding:'0.6rem 0.8rem', background:'#f8fafc', borderRadius:'8px', display:'flex', justifyContent:'space-between', fontSize:'0.85rem'}}>
                                <span style={{color:'#7a9fbe'}}>Total Renewals</span>
                                <span style={{fontWeight:700, color:'#d4af37'}}>{(ren.renewalHistory || []).length}</span>
                            </div>

                            <div style={{display:'flex', justifyContent:'flex-end', marginTop:'1.5rem'}}>
                                <button onClick={() => setHistoryModal({show:false, renId:null})} style={{background:'#e8edf4', color:'#1a3d5c', padding:'0.6rem 1.8rem', borderRadius:'10px', border:'none', fontWeight:600, cursor:'pointer'}}>Close</button>
                            </div>
                        </div>
                    </div>
                );
            })()}

        </div>
    );
}
