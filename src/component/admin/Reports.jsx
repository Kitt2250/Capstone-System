import React, { useState, useEffect } from 'react';
import './reports.css';
import AdminTopbar from './AdminTopbar';
import { downloadCSV } from '../../utils/exportToCSV';

// Mock Data
const financialData = [
    { label: 'Mon', revenue: 185, expenses: 90 }, { label: 'Tue', revenue: 95, expenses: 65 },
    { label: 'Wed', revenue: 210, expenses: 110 }, { label: 'Thu', revenue: 155, expenses: 80 },
    { label: 'Fri', revenue: 75, expenses: 55 }, { label: 'Sat', revenue: 90, expenses: 60 }, { label: 'Sun', revenue: 50, expenses: 45 }
];
const financialTransactions = [
    { date: '2026-03-15', transaction: 'Lot A-142 - Burial', category: 'Lot Sales', amount: 12500, type: 'positive' },
    { date: '2026-03-15', transaction: 'Wake Space - Chapel A', category: 'Wake Space', amount: 8000, type: 'positive' },
    { date: '2026-03-14', transaction: 'Maintenance - Grounds', category: 'Expenses', amount: -5500, type: 'negative' },
    { date: '2026-03-14', transaction: 'Lot C-211 - Renewal', category: 'Lot Sales', amount: 25000, type: 'positive' },
    { date: '2026-03-13', transaction: 'Bone Vault - Lot D-401', category: 'Lot Sales', amount: 18000, type: 'positive' }
];

const burialData = [
    { label: 'Single', value: 12, color: '#d4af37' }, { label: 'Mausoleum', value: 8, color: '#3670AF' },
    { label: 'Columbarium', value: 15, color: '#27ae60' }, { label: 'Apartment', value: 7, color: '#8e44ad' }, { label: 'Bone Vault', value: 5, color: '#7f8c8d' }
];

const occupancyData = [
    { label: 'Niche', avail: 12, occ: 28, res: 5 }, { label: 'Mausoleum', avail: 3, occ: 8, res: 1 },
    { label: 'Columbarium', avail: 15, occ: 20, res: 3 }, { label: 'Apartment', avail: 18, occ: 34, res: 4 }, { label: 'Bone Vault', avail: 23, occ: 45, res: 4 }
];

const occupancyTable = [
    { section: 'Section A', total: 60, avail: 12, occ: 42, res: 6, rate: '70%' },
    { section: 'Section B', total: 45, avail: 8, occ: 32, res: 5, rate: '71%' },
    { section: 'Section C', total: 30, avail: 10, occ: 18, res: 2, rate: '60%' },
    { section: 'Section D', total: 40, avail: 15, occ: 22, res: 3, rate: '55%' },
    { section: 'Section E', total: 48, avail: 26, occ: 28, res: 4, rate: '58%' }
];

const overdueData = [
    { label: '1-7d', value: 4, color: '#f39c12' }, { label: '8-14d', value: 3, color: '#e67e22' },
    { label: '15-30d', value: 3, color: '#c0392b' }, { label: '30+d', value: 2, color: '#922b21' }
];
const overdueTable = [
    { client: 'Carlos Tan', lot: 'D-012', amount: 3000, overdueSince: '2026-03-01', days: 14, status: 'Overdue', statusClass: 'overdue' },
    { client: 'Pedro Garcia', lot: 'A-150', amount: 5000, overdueSince: '2026-03-15', days: 0, status: 'Due Today', statusClass: 'installment' },
    { client: 'Roberto Lim', lot: 'D-014', amount: 25000, overdueSince: '2026-02-15', days: 28, status: 'Critical', statusClass: 'overdue' },
    { client: 'Elena Santos', lot: 'C-130', amount: 15000, overdueSince: '2026-03-10', days: 5, status: 'Overdue', statusClass: 'overdue' }
];

const renewalData = [
    { label: 'Apr', value: 5 }, { label: 'May', value: 8 }, { label: 'Jun', value: 6 },
    { label: 'Jul', value: 4 }, { label: 'Aug', value: 3 }, { label: 'Sep', value: 2 }
];
const renewalTable = [
    { lot: 'A-142', client: 'Reyes Family', expiry: '2026-04-15', days: 30, color: '#c0392b', status: 'Urgent', statusClass: 'overdue' },
    { lot: 'B-045', client: 'Dela Cruz Family', expiry: '2026-05-21', days: 66, color: '#f39c12', status: 'Warning', statusClass: 'installment' },
    { lot: 'C-128', client: 'Santos Family', expiry: '2026-06-13', days: 89, color: '#27ae60', status: 'Ok', statusClass: 'fully-paid' },
    { lot: 'A-200', client: 'Garcia Family', expiry: '2026-07-05', days: 111, color: '#27ae60', status: 'Ok', statusClass: 'fully-paid' },
    { lot: 'D-012', client: 'Tan Family', expiry: '2026-09-08', days: 176, color: '#27ae60', status: 'Ok', statusClass: 'fully-paid' }
];

const wakeData = [
    { label: 'Oct', value: 4 }, { label: 'Nov', value: 6 }, { label: 'Dec', value: 3 },
    { label: 'Jan', value: 5 }, { label: 'Feb', value: 7 }, { label: 'Mar', value: 8 }
];
const wakeTable = [
    { id: 'WK-001', client: 'Ana Reyes', deceased: 'Alejandro Reyes Sr.', start: '2026-03-18', end: '2026-03-20', status: 'Confirmed', statusClass: 'occupied' },
    { id: 'WK-002', client: 'Roberto Dela Cruz', deceased: 'Carmen Dela Cruz', start: '2026-03-19', end: '2026-03-21', status: 'Pending', statusClass: 'installment' },
    { id: 'WK-003', client: 'Maria Santos Jr.', deceased: 'Jose Santos', start: '2026-03-16', end: '2026-03-18', status: 'Confirmed', statusClass: 'occupied' },
    { id: 'WK-005', client: 'Carlos Tan', deceased: 'Miguel Tan', start: '2026-03-22', end: '2026-03-24', status: 'Confirmed', statusClass: 'occupied' },
    { id: 'WK-006', client: 'Lourdes Garcia', deceased: 'Ramon Garcia', start: '2026-03-25', end: '2026-03-27', status: 'Pending', statusClass: 'installment' }
];
const wakeWeekly = [
    { label: 'Mon', booked: 1, total: 1 }, { label: 'Tue', booked: 0, total: 1 }, { label: 'Wed', booked: 1, total: 1 },
    { label: 'Thu', booked: 1, total: 1 }, { label: 'Fri', booked: 0, total: 1 }, { label: 'Sat', booked: 1, total: 1 }, { label: 'Sun', booked: 0, total: 1 }
];

const inventoryData = [
    { label: 'Niche', total: 45, avail: 12 }, { label: 'Maus', total: 12, avail: 3 }, { label: 'Colum', total: 38, avail: 15 },
    { label: 'Apt', total: 56, avail: 18 }, { label: 'Bone', total: 72, avail: 23 }
];
const inventoryTable = [
    { type: 'Single Niche', total: 45, avail: 12, occ: 28, res: 5, rate: '62%' },
    { type: 'Mausoleum', total: 12, avail: 3, occ: 8, res: 1, rate: '67%' },
    { type: 'Columbarium', total: 38, avail: 15, occ: 20, res: 3, rate: '53%' },
    { type: 'Apartment', total: 56, avail: 18, occ: 34, res: 4, rate: '61%' },
    { type: 'Bone Vault', total: 72, avail: 23, occ: 45, res: 4, rate: '63%' }
];

export default function Reports() {
    const [currentTab, setCurrentTab] = useState('financial');
    const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });

    // Modals
    const [dateRangeModal, setDateRangeModal] = useState(false);
    const [exportModal, setExportModal] = useState(false);
    
    // Forms
    const [dateFrom, setDateFrom] = useState('2026-03-01');
    const [dateTo, setDateTo] = useState('2026-03-15');
    const [exportType, setExportType] = useState('financial');
    const [exportFormat, setExportFormat] = useState('csv');

    const showToast = (msg, type = 'success') => {
        setToast({ show: true, msg, type });
        setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 3500);
    };

    const handleTabChange = (tab) => {
        setCurrentTab(tab);
        const labels = {
            'financial': 'Financial', 'burial': 'Burial', 'occupancy': 'Occupancy',
            'collections': 'Collections', 'renewals': 'Renewals', 'wakespace': 'Wake Space', 'inventory': 'Inventory'
        };
        showToast(`📊 Switched to ${labels[tab]} report`, 'info');
    };

    const confirmExport = () => {
        setExportModal(false);
        showToast(`⏳ Exporting ${exportType} as ${exportFormat}...`, 'info');
        
        setTimeout(() => {
            if (exportFormat === 'csv') {
                let data = [];
                if (exportType === 'financial') data = financialTransactions;
                if (exportType === 'burial') data = burialData;
                if (exportType === 'occupancy') data = occupancyTable;
                if (exportType === 'collections') data = overdueTable;
                if (exportType === 'renewals') data = renewalTable;
                if (exportType === 'wakespace') data = wakeTable;
                if (exportType === 'inventory') data = inventoryTable;
                
                downloadCSV(data, `${exportType}_report_${new Date().toISOString().slice(0,10)}.csv`);
                showToast(`✅ ${exportType} exported successfully as CSV!`, 'success');
            } else if (exportFormat === 'pdf') {
                window.print();
                showToast(`✅ PDF dialog opened`, 'success');
            } else {
                showToast(`✅ ${exportType} exported successfully as ${exportFormat}!`, 'success');
            }
        }, 1500);
    };

    const formatDateShort = (dateStr) => {
        if (!dateStr) return '—';
        return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    // Render Helpers for Charts
    const renderBar = (item, max, colorOrGradient, isPercent = false) => {
        const height = max === 0 ? 0 : (item / max) * 100;
        const bg = colorOrGradient.includes('linear') ? colorOrGradient : colorOrGradient;
        return <div className="bar" style={{height: `${height}%`, background: bg}}></div>;
    };

    return (
        <div className="reports-page">
            <div className={`toast ${toast.type} ${toast.show ? 'show' : ''}`} style={{top: '80px', position: 'fixed', zIndex: 99999}}>
                <span>{toast.msg}</span>
                <button className="toast-close" onClick={() => setToast(prev => ({...prev, show: false}))}>×</button>
            </div>

            <AdminTopbar title="Reports ✦" greeting="Financial, burial, and operational reports" />

            <div className="reports-container" style={{ margin: '0 20px' }}>
                <div className="report-header">
                    <div className="report-header-left">
                        <h2><i className="fas fa-chart-pie" style={{color:'#d4af37', marginRight:'8px'}}></i>Analytics Dashboard</h2>
                    </div>
                    <div className="report-header-right">
                        <button className="btn-secondary" onClick={() => setExportModal(true)}>
                            <i className="fas fa-file-export"></i> Export
                        </button>
                        <button className="btn-primary" onClick={() => setDateRangeModal(true)}>
                            <i className="fas fa-calendar-alt"></i> Custom Range
                        </button>
                    </div>
                </div>

                <div className="report-tabs-wrapper">
                    <div className="report-tabs">
                        <button className={`report-tab ${currentTab==='financial'?'active':''}`} onClick={()=>handleTabChange('financial')}><i className="fas fa-coins"></i> Financial</button>
                        <button className={`report-tab ${currentTab==='burial'?'active':''}`} onClick={()=>handleTabChange('burial')}><i className="fas fa-cross"></i> Burial</button>
                        <button className={`report-tab ${currentTab==='occupancy'?'active':''}`} onClick={()=>handleTabChange('occupancy')}><i className="fas fa-tshirt"></i> Occupancy</button>
                        <button className={`report-tab ${currentTab==='collections'?'active':''}`} onClick={()=>handleTabChange('collections')}><i className="fas fa-coins"></i> Collections <span className="tab-badge">12</span></button>
                        <button className={`report-tab ${currentTab==='renewals'?'active':''}`} onClick={()=>handleTabChange('renewals')}><i className="fas fa-sync-alt"></i> Renewals</button>
                        <button className={`report-tab ${currentTab==='wakespace'?'active':''}`} onClick={()=>handleTabChange('wakespace')}><i className="fas fa-bed"></i> Wake Space</button>
                        <button className={`report-tab ${currentTab==='inventory'?'active':''}`} onClick={()=>handleTabChange('inventory')}><i className="fas fa-boxes"></i> Inventory</button>
                    </div>
                </div>

                {/* ===== TAB: FINANCIAL ===== */}
                {currentTab === 'financial' && (
                    <div className="tab-content active">
                        <div className="summary-grid">
                            <div className="summary-card"><div className="icon gold"><i className="fas fa-coins"></i></div><div className="label">Total Revenue</div><div className="value">₱860,000</div><div className="change up"><i className="fas fa-arrow-up"></i> +12.5% vs last month</div></div>
                            <div className="summary-card"><div className="icon blue"><i className="fas fa-bed"></i></div><div className="label">Wake Space Revenue</div><div className="value">₱111,000</div><div className="change up"><i className="fas fa-arrow-up"></i> +8.3% vs last month</div></div>
                            <div className="summary-card"><div className="icon red"><i className="fas fa-arrow-down"></i></div><div className="label">Total Expenses</div><div className="value">₱172,000</div><div className="change down"><i className="fas fa-arrow-down"></i> -3.2% vs last month</div></div>
                            <div className="summary-card"><div className="icon green"><i className="fas fa-chart-line"></i></div><div className="label">Net Income</div><div className="value">₱688,000</div><div className="change up"><i className="fas fa-arrow-up"></i> +15.8% vs last month</div></div>
                        </div>

                        <div className="chart-section">
                            <div className="chart-box">
                                <div className="chart-title"><i className="fas fa-chart-bar"></i> Revenue vs Expenses <span className="sub">This Week</span></div>
                                <div className="bar-chart">
                                    {financialData.map((d, i) => {
                                        const max = Math.max(...financialData.map(v => Math.max(v.revenue, v.expenses)));
                                        return (
                                            <div className="bar-item" key={i}>
                                                <div className="bar-value">₱{d.revenue}K</div>
                                                {renderBar(d.revenue, max, 'linear-gradient(180deg,#d4af37,#b8942e)')}
                                                <div className="bar-label">{d.label}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="chart-box">
                                <div className="chart-title"><i className="fas fa-chart-pie"></i> Revenue Breakdown</div>
                                <div className="legend">
                                    <div className="legend-item"><span className="color-dot" style={{background:'#d4af37'}}></span><span className="label">Lot Sales</span><span className="value">₱615,000</span></div>
                                    <div className="legend-item"><span className="color-dot" style={{background:'#3670AF'}}></span><span className="label">Wake Space</span><span className="value">₱111,000</span></div>
                                    <div className="legend-item"><span className="color-dot" style={{background:'#c0392b'}}></span><span className="label">Expenses</span><span className="value">₱172,000</span></div>
                                    <div className="legend-item" style={{borderTop:'1px solid #e8edf4', paddingTop:'0.6rem', marginTop:'0.2rem'}}>
                                        <span className="color-dot" style={{background:'#27ae60'}}></span><span className="label" style={{fontWeight:600}}>Net Income</span><span className="value" style={{color:'#27ae60'}}>₱688,000</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="report-table-wrapper">
                            <table>
                                <thead><tr><th>Date</th><th>Transaction</th><th>Category</th><th style={{textAlign:'right'}}>Amount</th></tr></thead>
                                <tbody>
                                    {financialTransactions.map((t, i) => (
                                        <tr key={i}>
                                            <td>{t.date}</td><td>{t.transaction}</td><td>{t.category}</td>
                                            <td style={{textAlign:'right'}} className={`amount ${t.type}`}>{t.amount > 0 ? `₱${t.amount.toLocaleString()}` : `-₱${Math.abs(t.amount).toLocaleString()}`}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* ===== TAB: BURIAL ===== */}
                {currentTab === 'burial' && (
                    <div className="tab-content active">
                        <div className="summary-grid">
                            <div className="summary-card"><div className="icon gold"><i className="fas fa-cross"></i></div><div className="label">Total Burials</div><div className="value">47</div><div className="change up"><i className="fas fa-arrow-up"></i> +12 vs last month</div></div>
                            <div className="summary-card"><div className="icon blue"><i className="fas fa-tshirt"></i></div><div className="label">Active Graves</div><div className="value">3,847</div><div className="change up"><i className="fas fa-arrow-up"></i> +8.2% vs last month</div></div>
                            <div className="summary-card"><div className="icon red"><i className="fas fa-clock"></i></div><div className="label">Pending Burials</div><div className="value">8</div><div className="change down"><i className="fas fa-arrow-down"></i> -2 vs last month</div></div>
                            <div className="summary-card"><div className="icon green"><i className="fas fa-coins"></i></div><div className="label">Revenue from Burials</div><div className="value">₱512,000</div><div className="change up"><i className="fas fa-arrow-up"></i> +14.3% vs last month</div></div>
                        </div>
                        <div className="chart-section">
                            <div className="chart-box">
                                <div className="chart-title"><i className="fas fa-chart-bar"></i> Burials by Type <span className="sub">This Month</span></div>
                                <div className="bar-chart">
                                    {burialData.map((d, i) => {
                                        const max = Math.max(...burialData.map(v => v.value));
                                        return (
                                            <div className="bar-item" key={i}>
                                                <div className="bar-value">{d.value}</div>
                                                {renderBar(d.value, max, d.color)}
                                                <div className="bar-label">{d.label}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="chart-box">
                                <div className="chart-title"><i className="fas fa-chart-pie"></i> Burial Distribution</div>
                                <div className="legend">
                                    {burialData.map((d, i) => (
                                        <div className="legend-item" key={i}><span className="color-dot" style={{background: d.color}}></span><span className="label">{d.label}</span><span className="value">{d.value}</span></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ===== TAB: OCCUPANCY ===== */}
                {currentTab === 'occupancy' && (
                    <div className="tab-content active">
                        <div className="summary-grid">
                            <div className="summary-card"><div className="icon blue"><i className="fas fa-tshirt"></i></div><div className="label">Total Lots</div><div className="value">223</div><div className="change neutral"><i className="fas fa-minus"></i> No change</div></div>
                            <div className="summary-card"><div className="icon green"><i className="fas fa-check-circle"></i></div><div className="label">Available</div><div className="value">71</div><div className="change up"><i className="fas fa-arrow-up"></i> +3 vs last month</div></div>
                            <div className="summary-card"><div className="icon red"><i className="fas fa-circle"></i></div><div className="label">Occupied</div><div className="value">142</div><div className="change down"><i className="fas fa-arrow-up"></i> +2 vs last month</div></div>
                            <div className="summary-card"><div className="icon orange"><i className="fas fa-clock"></i></div><div className="label">Reserved</div><div className="value">10</div><div className="change neutral"><i className="fas fa-minus"></i> 0 vs last month</div></div>
                        </div>
                        <div className="chart-section">
                            <div className="chart-box">
                                <div className="chart-title"><i className="fas fa-chart-bar"></i> Occupancy by Grave Type <span className="sub">Available vs Occupied</span></div>
                                <div className="bar-chart">
                                    {occupancyData.map((d, i) => {
                                        const max = Math.max(...occupancyData.map(v => Math.max(v.avail, v.occ, v.res)));
                                        return (
                                            <div className="bar-item" key={i}>
                                                <div className="bar-value">{d.occ}</div>
                                                {renderBar(d.occ, max, '#c0392b')}
                                                <div className="bar-label">{d.label}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="chart-box">
                                <div className="chart-title"><i className="fas fa-chart-pie"></i> Overall Occupancy</div>
                                <div className="legend">
                                    <div className="legend-item"><span className="color-dot" style={{background:'#27ae60'}}></span><span className="label">Available</span><span className="value">71 (32%)</span></div>
                                    <div className="legend-item"><span className="color-dot" style={{background:'#c0392b'}}></span><span className="label">Occupied</span><span className="value">142 (64%)</span></div>
                                    <div className="legend-item"><span className="color-dot" style={{background:'#f39c12'}}></span><span className="label">Reserved</span><span className="value">10 (4%)</span></div>
                                    <div className="legend-item" style={{borderTop:'1px solid #e8edf4', paddingTop:'0.6rem', marginTop:'0.2rem'}}>
                                        <span className="color-dot" style={{background:'#d4af37'}}></span><span className="label" style={{fontWeight:600}}>Occupancy Rate</span><span className="value" style={{color:'#d4af37'}}>68%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="report-table-wrapper">
                            <table>
                                <thead><tr><th>Section</th><th>Total</th><th>Available</th><th>Occupied</th><th>Reserved</th><th style={{textAlign:'right'}}>Rate</th></tr></thead>
                                <tbody>
                                    {occupancyTable.map((t, i) => (
                                        <tr key={i}>
                                            <td>{t.section}</td><td>{t.total}</td><td>{t.avail}</td><td>{t.occ}</td><td>{t.res}</td><td style={{textAlign:'right', fontWeight:600}}>{t.rate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* ===== TAB: COLLECTIONS ===== */}
                {currentTab === 'collections' && (
                    <div className="tab-content active">
                        <div className="summary-grid">
                            <div className="summary-card"><div className="icon green"><i className="fas fa-check-circle"></i></div><div className="label">Fully Paid</div><div className="value">156</div><div className="change up"><i className="fas fa-arrow-up"></i> +8 vs last month</div></div>
                            <div className="summary-card"><div className="icon orange"><i className="fas fa-clock"></i></div><div className="label">On Installment</div><div className="value">42</div><div className="change down"><i className="fas fa-arrow-down"></i> -3 vs last month</div></div>
                            <div className="summary-card"><div className="icon red"><i className="fas fa-exclamation-triangle"></i></div><div className="label">Overdue</div><div className="value">12</div><div className="change down"><i className="fas fa-arrow-up"></i> +4 vs last month</div></div>
                            <div className="summary-card"><div className="icon purple"><i className="fas fa-coins"></i></div><div className="label">Total Outstanding</div><div className="value">₱850,000</div><div className="change down"><i className="fas fa-arrow-down"></i> -5% vs last month</div></div>
                        </div>
                        <div className="chart-section">
                            <div className="chart-box">
                                <div className="chart-title"><i className="fas fa-chart-pie"></i> Payment Status Distribution</div>
                                <div className="legend">
                                    <div className="legend-item"><span className="color-dot" style={{background:'#27ae60'}}></span><span className="label">Fully Paid</span><span className="value">156 (74%)</span></div>
                                    <div className="legend-item"><span className="color-dot" style={{background:'#f39c12'}}></span><span className="label">Installment</span><span className="value">42 (20%)</span></div>
                                    <div className="legend-item"><span className="color-dot" style={{background:'#c0392b'}}></span><span className="label">Overdue</span><span className="value">12 (6%)</span></div>
                                </div>
                            </div>
                            <div className="chart-box">
                                <div className="chart-title"><i className="fas fa-chart-bar"></i> Overdue by Days</div>
                                <div className="bar-chart">
                                    {overdueData.map((d, i) => {
                                        const max = Math.max(...overdueData.map(v => v.value));
                                        return (
                                            <div className="bar-item" key={i}>
                                                <div className="bar-value">{d.value}</div>
                                                {renderBar(d.value, max, d.color)}
                                                <div className="bar-label">{d.label}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="report-table-wrapper">
                            <table>
                                <thead><tr><th>Client</th><th>Lot</th><th>Amount Due</th><th>Overdue Since</th><th>Days</th><th>Status</th></tr></thead>
                                <tbody>
                                    {overdueTable.map((t, i) => (
                                        <tr key={i}>
                                            <td>{t.client}</td><td>{t.lot}</td><td className="amount negative">₱{t.amount.toLocaleString()}</td><td>{t.overdueSince}</td><td>{t.days}</td>
                                            <td><span className={`status-badge ${t.statusClass}`}>{t.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* ===== TAB: RENEWALS ===== */}
                {currentTab === 'renewals' && (
                    <div className="tab-content active">
                        <div className="summary-grid">
                            <div className="summary-card"><div className="icon red"><i className="fas fa-exclamation-triangle"></i></div><div className="label">Expiring This Week</div><div className="value">5</div><div className="change down">⚠️ Urgent</div></div>
                            <div className="summary-card"><div className="icon orange"><i className="fas fa-clock"></i></div><div className="label">Expiring This Month</div><div className="value">18</div><div className="change up"><i className="fas fa-arrow-up"></i> +6 vs last month</div></div>
                            <div className="summary-card"><div className="icon green"><i className="fas fa-check-circle"></i></div><div className="label">Renewed This Month</div><div className="value">9</div><div className="change up"><i className="fas fa-arrow-up"></i> +3 vs last month</div></div>
                            <div className="summary-card"><div className="icon gold"><i className="fas fa-coins"></i></div><div className="label">Renewal Revenue</div><div className="value">₱142,500</div><div className="change up"><i className="fas fa-arrow-up"></i> +18% vs last month</div></div>
                        </div>
                        <div className="chart-section">
                            <div className="chart-box">
                                <div className="chart-title"><i className="fas fa-chart-bar"></i> Renewal Forecast <span className="sub">Next 6 Months</span></div>
                                <div className="bar-chart">
                                    {renewalData.map((d, i) => {
                                        const max = Math.max(...renewalData.map(v => v.value));
                                        return (
                                            <div className="bar-item" key={i}>
                                                <div className="bar-value">{d.value}</div>
                                                {renderBar(d.value, max, 'linear-gradient(180deg,#d4af37,#b8942e)')}
                                                <div className="bar-label">{d.label}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="chart-box">
                                <div className="chart-title"><i className="fas fa-chart-pie"></i> Renewal by Grave Type</div>
                                <div className="legend">
                                    <div className="legend-item"><span className="color-dot" style={{background:'#27ae60'}}></span><span className="label">Apartment</span><span className="value">12</span></div>
                                    <div className="legend-item"><span className="color-dot" style={{background:'#3670AF'}}></span><span className="label">Columbarium</span><span className="value">8</span></div>
                                    <div className="legend-item"><span className="color-dot" style={{background:'#7f8c8d'}}></span><span className="label">Bone Vault</span><span className="value">5</span></div>
                                </div>
                            </div>
                        </div>
                        <div className="report-table-wrapper">
                            <table>
                                <thead><tr><th>Lot</th><th>Client</th><th>Expiry Date</th><th>Days Left</th><th>Status</th></tr></thead>
                                <tbody>
                                    {renewalTable.map((t, i) => (
                                        <tr key={i}>
                                            <td>{t.lot}</td><td>{t.client}</td><td>{t.expiry}</td><td style={{color: t.color}}>{t.days}</td>
                                            <td><span className={`status-badge ${t.statusClass}`}>{t.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* ===== TAB: WAKE SPACE ===== */}
                {currentTab === 'wakespace' && (
                    <div className="tab-content active">
                        <div className="summary-grid">
                            <div className="summary-card"><div className="icon gold"><i className="fas fa-calendar-check"></i></div><div className="label">Total Bookings</div><div className="value">23</div><div className="change up"><i className="fas fa-arrow-up"></i> +5 vs last month</div></div>
                            <div className="summary-card"><div className="icon blue"><i className="fas fa-bed"></i></div><div className="label">Utilization Rate</div><div className="value">68%</div><div className="change up"><i className="fas fa-arrow-up"></i> +3% vs last month</div></div>
                            <div className="summary-card"><div className="icon red"><i className="fas fa-clock"></i></div><div className="label">Pending Bookings</div><div className="value">3</div><div className="change down"><i className="fas fa-arrow-down"></i> -2 vs last month</div></div>
                            <div className="summary-card"><div className="icon green"><i className="fas fa-coins"></i></div><div className="label">Revenue from Wake</div><div className="value">₱111,000</div><div className="change up"><i className="fas fa-arrow-up"></i> +8.3% vs last month</div></div>
                        </div>

                        <div className="chart-section">
                            <div className="chart-box">
                                <div className="chart-title"><i className="fas fa-chart-bar"></i> Monthly Bookings <span className="sub">Last 6 Months</span></div>
                                <div className="bar-chart">
                                    {wakeData.map((d, i) => {
                                        const max = Math.max(...wakeData.map(v => v.value));
                                        return (
                                            <div className="bar-item" key={i}>
                                                <div className="bar-value">{d.value}</div>
                                                {renderBar(d.value, max, 'linear-gradient(180deg,#3670AF,#2c5f82)')}
                                                <div className="bar-label">{d.label}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="chart-box">
                                <div className="chart-title"><i className="fas fa-chart-pie"></i> Booking Status Distribution</div>
                                <div className="legend">
                                    <div className="legend-item"><span className="color-dot" style={{background:'#27ae60'}}></span><span className="label">Confirmed</span><span className="value">12 (52%)</span></div>
                                    <div className="legend-item"><span className="color-dot" style={{background:'#f39c12'}}></span><span className="label">Pending</span><span className="value">5 (22%)</span></div>
                                    <div className="legend-item"><span className="color-dot" style={{background:'#7f8c8d'}}></span><span className="label">Completed</span><span className="value">4 (17%)</span></div>
                                    <div className="legend-item"><span className="color-dot" style={{background:'#c0392b'}}></span><span className="label">Cancelled</span><span className="value">2 (9%)</span></div>
                                    <div className="legend-item" style={{borderTop:'1px solid #e8edf4', paddingTop:'0.6rem', marginTop:'0.2rem'}}>
                                        <span className="color-dot" style={{background:'#d4af37'}}></span><span className="label" style={{fontWeight:600}}>Booking Rate</span><span className="value" style={{color:'#d4af37'}}>68%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="report-table-wrapper">
                            <table>
                                <thead><tr><th>Booking ID</th><th>Client</th><th>Deceased</th><th>Dates</th><th>Duration</th><th>Status</th></tr></thead>
                                <tbody>
                                    {wakeTable.map((t, i) => {
                                        const diff = Math.ceil(Math.abs(new Date(t.end) - new Date(t.start)) / (1000 * 60 * 60 * 24));
                                        return (
                                            <tr key={i}>
                                                <td><strong>{t.id}</strong></td><td>{t.client}</td><td>{t.deceased}</td>
                                                <td>{formatDateShort(t.start)} - {formatDateShort(t.end)}</td><td>{diff} day{diff > 1 ? 's' : ''}</td>
                                                <td><span className={`status-badge ${t.statusClass}`}>{t.status}</span></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem', marginTop:'1.5rem'}}>
                            <div className="chart-box">
                                <div className="chart-title"><i className="fas fa-calendar-week"></i> This Week's Utilization</div>
                                <div className="bar-chart">
                                    {wakeWeekly.map((d, i) => (
                                        <div className="bar-item" key={i}>
                                            <div className="bar-value">{d.booked}/{d.total}</div>
                                            <div className="bar" style={{height:`${(d.booked/1)*100}%`, background: d.booked > 0 ? '#27ae60' : '#e8edf4', border: d.booked === 0 ? '1px solid #dce3ec' : 'none'}}></div>
                                            <div className="bar-label">{d.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="chart-box">
                                <div className="chart-title"><i className="fas fa-info-circle"></i> Space Status</div>
                                <div style={{display:'flex', flexDirection:'column', gap:'0.5rem', padding:'0.5rem 0'}}>
                                    <div style={{display:'flex', justifyContent:'space-between', padding:'0.3rem 0', borderBottom:'1px solid #f0f2f5'}}>
                                        <span style={{color:'#7a9fbe'}}>Status</span><span style={{fontWeight:600, color:'#27ae60'}}>✅ Available</span>
                                    </div>
                                    <div style={{display:'flex', justifyContent:'space-between', padding:'0.3rem 0', borderBottom:'1px solid #f0f2f5'}}>
                                        <span style={{color:'#7a9fbe'}}>Today's Bookings</span><span style={{fontWeight:600}}>2</span>
                                    </div>
                                    <div style={{display:'flex', justifyContent:'space-between', padding:'0.3rem 0', borderBottom:'1px solid #f0f2f5'}}>
                                        <span style={{color:'#7a9fbe'}}>Next Available Date</span><span style={{fontWeight:600, color:'#27ae60'}}>Mar 21, 2026</span>
                                    </div>
                                    <div style={{display:'flex', justifyContent:'space-between', padding:'0.3rem 0', borderBottom:'1px solid #f0f2f5'}}>
                                        <span style={{color:'#7a9fbe'}}>Average Duration</span><span style={{fontWeight:600}}>3.2 days</span>
                                    </div>
                                    <div style={{display:'flex', justifyContent:'space-between', padding:'0.3rem 0'}}>
                                        <span style={{color:'#7a9fbe'}}>Total Booked Days (This Month)</span><span style={{fontWeight:600, color:'#d4af37'}}>18 days</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ===== TAB: INVENTORY ===== */}
                {currentTab === 'inventory' && (
                    <div className="tab-content active">
                        <div className="summary-grid">
                            <div className="summary-card"><div className="icon blue"><i className="fas fa-tshirt"></i></div><div className="label">Total Lots</div><div className="value">223</div><div className="change neutral"><i className="fas fa-minus"></i> No change</div></div>
                            <div className="summary-card"><div className="icon gold"><i className="fas fa-crown"></i></div><div className="label">Most Available</div><div className="value">Bone Vault</div><div className="change neutral">72 slots</div></div>
                            <div className="summary-card"><div className="icon red"><i className="fas fa-circle"></i></div><div className="label">Most Occupied</div><div className="value">Single Niche</div><div className="change neutral">45 occupied</div></div>
                            <div className="summary-card"><div className="icon orange"><i className="fas fa-clock"></i></div><div className="label">Sold Out Types</div><div className="value">2</div><div className="change down">Garden, Heroes</div></div>
                        </div>
                        <div className="chart-section">
                            <div className="chart-box">
                                <div className="chart-title"><i className="fas fa-chart-bar"></i> Inventory by Grave Type</div>
                                <div className="bar-chart">
                                    {inventoryData.map((d, i) => {
                                        const max = Math.max(...inventoryData.map(v => Math.max(v.total, v.avail)));
                                        return (
                                            <div className="bar-item" key={i}>
                                                <div className="bar-value">{d.total}</div>
                                                {renderBar(d.total, max, 'linear-gradient(180deg,#5d6d7e,#aab7b8)')}
                                                <div className="bar-label">{d.label}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="chart-box">
                                <div className="chart-title"><i className="fas fa-chart-pie"></i> Distribution</div>
                                <div className="legend">
                                    <div className="legend-item"><span className="color-dot" style={{background:'#d4af37'}}></span><span className="label">Single Niche</span><span className="value">45</span></div>
                                    <div className="legend-item"><span className="color-dot" style={{background:'#3670AF'}}></span><span className="label">Mausoleum</span><span className="value">12</span></div>
                                    <div className="legend-item"><span className="color-dot" style={{background:'#27ae60'}}></span><span className="label">Columbarium</span><span className="value">38</span></div>
                                    <div className="legend-item"><span className="color-dot" style={{background:'#8e44ad'}}></span><span className="label">Apartment</span><span className="value">56</span></div>
                                    <div className="legend-item"><span className="color-dot" style={{background:'#7f8c8d'}}></span><span className="label">Bone Vault</span><span className="value">72</span></div>
                                </div>
                            </div>
                        </div>
                        <div className="report-table-wrapper">
                            <table>
                                <thead><tr><th>Grave Type</th><th>Total</th><th>Available</th><th>Occupied</th><th>Reserved</th><th style={{textAlign:'right'}}>Rate</th></tr></thead>
                                <tbody>
                                    {inventoryTable.map((t, i) => (
                                        <tr key={i}>
                                            <td>{t.type}</td><td>{t.total}</td><td>{t.avail}</td><td>{t.occ}</td><td>{t.res}</td><td style={{textAlign:'right', fontWeight:600}}>{t.rate}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td style={{fontWeight:600}}>Total</td><td style={{fontWeight:600}}>223</td>
                                        <td style={{fontWeight:600, color:'#27ae60'}}>71</td>
                                        <td style={{fontWeight:600, color:'#c0392b'}}>142</td>
                                        <td style={{fontWeight:600, color:'#f39c12'}}>10</td>
                                        <td style={{textAlign:'right', fontWeight:600}}>64%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Quick Actions */}
                <div className="quick-actions">
                    <button className="quick-action-btn" onClick={() => showToast('📊 Generating full report...', 'info')}><i className="fas fa-file-invoice"></i> Generate Full Report</button>
                    <button className="quick-action-btn" onClick={() => setExportModal(true)}><i className="fas fa-file-export"></i> Export Data</button>
                    <button className="quick-action-btn" onClick={() => window.print()}><i className="fas fa-print"></i> Print Report</button>
                    <button className="quick-action-btn" onClick={() => showToast('🔄 Refreshing data...', 'info')}><i className="fas fa-sync-alt"></i> Refresh Data</button>
                </div>
            </div>

            {/* ===== DATE RANGE MODAL ===== */}
            {dateRangeModal && (
                <div className="modal-overlay active" onClick={() => setDateRangeModal(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-icon" style={{color:'#3670AF'}}><i className="fas fa-calendar-alt"></i></div>
                        <h3>Select Date Range</h3>
                        <p className="modal-subtitle">Choose the period for your report</p>
                        <div className="form-row">
                            <div className="form-group"><label>From</label><input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} /></div>
                            <div className="form-group"><label>To</label><input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} /></div>
                        </div>
                        <div className="modal-actions">
                            <button className="btn-cancel" onClick={() => setDateRangeModal(false)}>Cancel</button>
                            <button className="btn-confirm" onClick={() => { setDateRangeModal(false); showToast(`📅 Report range set: ${dateFrom} to ${dateTo}`, 'success'); }}><i className="fas fa-check"></i> Apply Range</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== EXPORT REPORT MODAL ===== */}
            {exportModal && (
                <div className="modal-overlay active" onClick={() => setExportModal(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-icon" style={{color:'#27ae60'}}><i className="fas fa-file-export"></i></div>
                        <h3>Export Report</h3>
                        <p className="modal-subtitle">Choose your export format</p>
                        <div className="form-group">
                            <label>Report Type</label>
                            <select value={exportType} onChange={e => setExportType(e.target.value)}>
                                <option value="financial">Financial Report</option>
                                <option value="burial">Burial Report</option>
                                <option value="occupancy">Occupancy Report</option>
                                <option value="collections">Collections Report</option>
                                <option value="renewals">Renewals Report</option>
                                <option value="wakespace">Wake Space Report</option>
                                <option value="inventory">Inventory Report</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Export Format</label>
                            <select value={exportFormat} onChange={e => setExportFormat(e.target.value)}>
                                <option value="pdf">PDF Document</option>
                                <option value="csv">CSV / Excel</option>
                                <option value="json">JSON Data</option>
                            </select>
                        </div>
                        <div className="modal-actions">
                            <button className="btn-cancel" onClick={() => setExportModal(false)}>Cancel</button>
                            <button className="btn-confirm" onClick={confirmExport}><i className="fas fa-download"></i> Export</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
