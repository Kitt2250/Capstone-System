import React, { useState, useEffect } from 'react';
import './staff-shared.css';
import StaffTopbar from './StaffTopbar';
import { downloadCSV } from '../../utils/exportToCSV';

const graveTypes = [
    { name: 'Single Niche', total: 45, available: 12, occupied: 28, reserved: 5 },
    { name: 'Mausoleum', total: 12, available: 3, occupied: 8, reserved: 1 },
    { name: 'Columbarium', total: 38, available: 15, occupied: 20, reserved: 3 },
    { name: 'Apartment', total: 56, available: 18, occupied: 34, reserved: 4 },
    { name: 'Bonevault', total: 72, available: 23, occupied: 45, reserved: 4 },
];

const recentTransactions = [
    { receipt: 'OR-2026-0342', client: 'Rosa Mendoza', type: 'Installment Payment', amount: 15000, date: '2026-03-15' },
    { receipt: 'OR-2026-0341', client: 'Pedro Garcia', type: 'Full Payment - Mausoleum', amount: 85000, date: '2026-03-15' },
    { receipt: 'OR-2026-0340', client: 'Elena Santos', type: 'DP Payment - Columbarium', amount: 10000, date: '2026-03-14' },
    { receipt: 'OR-2026-0339', client: 'Roberto Lim', type: 'Full Payment - Bonevault', amount: 45000, date: '2026-03-14' },
    { receipt: 'OR-2026-0338', client: 'Maria Cruz', type: 'Installment Payment', amount: 30000, date: '2026-03-13' },
];

const overdueAccounts = [
    { client: 'Carlos Tan', lot: 'D-012', amount: 3000, overdueSince: '2026-03-01', days: 14 },
    { client: 'Pedro Garcia', lot: 'A-150', amount: 5000, overdueSince: '2026-03-15', days: 0 },
    { client: 'Roberto Lim', lot: 'D-014', amount: 25000, overdueSince: '2026-02-15', days: 28 },
    { client: 'Elena Santos', lot: 'C-130', amount: 15000, overdueSince: '2026-03-10', days: 5 },
];

const expiringContracts = [
    { lot: 'A-142', client: 'Alejandro Reyes Sr.', expiry: '2026-04-15', daysLeft: 30 },
    { lot: 'B-045', client: 'Carmen Dela Cruz', expiry: '2026-05-21', daysLeft: 66 },
    { lot: 'C-128', client: 'Jose Santos', expiry: '2026-03-28', daysLeft: 12 },
    { lot: 'A-200', client: 'Lourdes Garcia', expiry: '2026-06-13', daysLeft: 89 },
    { lot: 'E-003', client: 'Miguel Tan', expiry: '2026-04-30', daysLeft: 45 },
];

export default function Reports() {
    const [currentTab, setCurrentTab] = useState('overview');
    const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });
    const [dateRange, setDateRange] = useState('month');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => { handleDateRange('month'); }, []);

    const showToast = (msg, type = 'success') => {
        setToast({ show: true, msg, type });
        setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3500);
    };

    const handleExportCSV = () => {
        showToast(`⏳ Generating CSV for ${currentTab}...`, 'info');
        setTimeout(() => {
            let data = [];
            if (currentTab === 'overview') data = graveTypes;
            else if (currentTab === 'financial') data = recentTransactions;
            else if (currentTab === 'collections') data = overdueAccounts;
            else if (currentTab === 'contracts') data = expiringContracts;
            
            downloadCSV(data, `${currentTab}_report_${new Date().toISOString().slice(0,10)}.csv`);
            showToast(`✅ ${currentTab} report exported!`, 'success');
        }, 800);
    };

    const handleDateRange = (range) => {
        setDateRange(range);
        const today = new Date();
        let start = '';
        let end = today.toISOString().slice(0, 10);
        if (range === 'today') start = end;
        else if (range === 'week') { const d = new Date(today); d.setDate(d.getDate() - d.getDay()); start = d.toISOString().slice(0, 10); }
        else if (range === 'month') { start = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().slice(0, 10); }
        else if (range === 'quarter') { start = new Date(today.getFullYear(), Math.floor(today.getMonth() / 3) * 3, 1).toISOString().slice(0, 10); }
        else if (range === 'year') { start = new Date(today.getFullYear(), 0, 1).toISOString().slice(0, 10); }
        setStartDate(start); setEndDate(end);
        if (start) showToast(`Date range updated: ${range}`, 'info');
    };

    return (
        <div className="reports-page-wrapper">
            <StaffTopbar title="Reports" greeting="Analytics and insights for Cherubim of Heaven Memorial Park" />

            <div className="reports-container">
                <div className="reports-header">
                    <div className="reports-header-left">
                        <h2><i className="fas fa-chart-pie" style={{color: '#d4af37', marginRight: '8px'}}></i>Analytics Dashboard</h2>
                    </div>
                    <div className="reports-header-right">
                        <button className="btn-secondary" onClick={() => window.print()}><i className="fas fa-file-export"></i> Export PDF</button>
                        <button className="btn-secondary" onClick={handleExportCSV}><i className="fas fa-file-csv"></i> Export CSV</button>
                    </div>
                </div>

                <div className="date-filter-bar">
                    <span className="filter-label"><i className="fas fa-calendar-alt"></i> Period:</span>
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                    <span style={{color: '#8aaccc'}}>to</span>
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                    <div className="quick-filters">
                        {['today', 'week', 'month', 'quarter', 'year'].map(r => (
                            <button key={r} className={`qf-btn ${dateRange === r ? 'active' : ''}`} onClick={() => handleDateRange(r)}>
                                {r.charAt(0).toUpperCase() + r.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="report-tabs">
                    {[
                        { id: 'overview', icon: 'fa-chart-pie', label: 'Overview' },
                        { id: 'revenue', icon: 'fa-coins', label: 'Revenue' },
                        { id: 'occupancy', icon: 'fa-tshirt', label: 'Occupancy' },
                        { id: 'payments', icon: 'fa-credit-card', label: 'Payments' },
                        { id: 'expiry', icon: 'fa-clock', label: 'Expiry' }
                    ].map(tab => (
                        <button key={tab.id} className={`tab-btn ${currentTab === tab.id ? 'active' : ''}`} onClick={() => setCurrentTab(tab.id)}>
                            <i className={`fas ${tab.icon}`}></i> {tab.label}
                        </button>
                    ))}
                </div>

                {currentTab === 'overview' && (
                    <div className="tab-content">
                        <div className="stats-grid">
                            <div className="stat-card"><div className="stat-icon gold"><i className="fas fa-cross"></i></div><div className="stat-label">Total Graves</div><div className="stat-value">223</div><div className="stat-change"><span className="up">↑ 5</span> vs last month</div></div>
                            <div className="stat-card"><div className="stat-icon blue"><i className="fas fa-map-pin"></i></div><div className="stat-label">Occupancy Rate</div><div className="stat-value">68%</div><div className="stat-change"><span className="up">↑ 3%</span> vs last month</div></div>
                            <div className="stat-card"><div className="stat-icon green"><i className="fas fa-coins"></i></div><div className="stat-label">Total Revenue</div><div className="stat-value">{"\u20B1"}2.8M</div><div className="stat-change"><span className="up">↑ 12%</span> vs last month</div></div>
                            <div className="stat-card"><div className="stat-icon orange"><i className="fas fa-clock"></i></div><div className="stat-label">Expiring Soon</div><div className="stat-value">23</div><div className="stat-change"><span className="down">↑ 8</span> vs last month</div></div>
                        </div>

                        <div className="chart-grid">
                            <div className="chart-box">
                                <div className="chart-title">Revenue by Grave Type <span className="chart-sub">This month</span></div>
                                <div className="bar-chart" style={{height: '180px'}}>
                                    {[
                                        { label: 'Single Niche', value: 45, color: 'blue' },
                                        { label: 'Mausoleum', value: 25, color: 'gold' },
                                        { label: 'Columbarium', value: 15, color: 'green' },
                                        { label: 'Apartment', value: 10, color: 'orange' },
                                        { label: 'Bonevault', value: 5, color: 'purple' }
                                    ].map((d, i) => (
                                        <div className="bar-group" key={i}>
                                            <div className={`bar ${d.color}`} style={{height: `${(d.value / 45) * 100}%`}}>
                                                <span className="bar-value">{d.value}%</span>
                                            </div>
                                            <div className="bar-label">{d.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="chart-box">
                                <div className="chart-title">Payment Status Distribution <span className="chart-sub">All accounts</span></div>
                                <div className="donut-container">
                                    <div className="donut" style={{background: 'conic-gradient(#27ae60 0% 70.2%, #f39c12 70.2% 89.1%, #c0392b 89.1% 94.5%, #e74c3c 94.5% 100%)'}}>
                                        <div className="donut-hole"><div className="hole-value">70%</div><div className="hole-label">Fully Paid</div></div>
                                    </div>
                                    <div className="donut-legend">
                                        <div className="legend-item"><span className="legend-color" style={{background: '#27ae60'}}></span>Fully Paid <span className="legend-value">156</span></div>
                                        <div className="legend-item"><span className="legend-color" style={{background: '#f39c12'}}></span>Installment <span className="legend-value">42</span></div>
                                        <div className="legend-item"><span className="legend-color" style={{background: '#c0392b'}}></span>DP Only <span className="legend-value">12</span></div>
                                        <div className="legend-item"><span className="legend-color" style={{background: '#e74c3c'}}></span>Overdue <span className="legend-value">12</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="chart-box" style={{marginTop: 0}}>
                            <div className="chart-title">Recent Transactions <span className="chart-sub">Last 5 transactions</span></div>
                            <div className="table-wrapper">
                                <table>
                                    <thead><tr><th><i className="fas fa-hashtag"></i> Receipt</th><th><i className="fas fa-user"></i> Client</th><th><i className="fas fa-tag"></i> Type</th><th style={{textAlign: 'right'}}><i className="fas fa-coins"></i> Amount</th><th><i className="fas fa-calendar-alt"></i> Date</th></tr></thead>
                                    <tbody>
                                        {recentTransactions.map((t, i) => (
                                            <tr key={i}><td><strong>{t.receipt}</strong></td><td>{t.client}</td><td>{t.type}</td><td style={{textAlign: 'right', fontWeight: 600, color: '#27ae60'}}>{"\u20B1"}{t.amount.toLocaleString()}</td><td>{t.date}</td></tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {currentTab === 'revenue' && (
                    <div className="tab-content">
                        <div className="stats-grid">
                            <div className="stat-card"><div className="stat-icon gold"><i className="fas fa-hand-holding-usd"></i></div><div className="stat-label">This Month Revenue</div><div className="stat-value">{"\u20B1"}1.2M</div><div className="stat-change"><span className="up">↑ 8%</span> vs last month</div></div>
                            <div className="stat-card"><div className="stat-icon blue"><i className="fas fa-chart-line"></i></div><div className="stat-label">This Quarter Revenue</div><div className="stat-value">{"\u20B1"}3.5M</div><div className="stat-change"><span className="up">↑ 15%</span> vs last quarter</div></div>
                            <div className="stat-card"><div className="stat-icon green"><i className="fas fa-calendar-year"></i></div><div className="stat-label">This Year Revenue</div><div className="stat-value">{"\u20B1"}12.8M</div><div className="stat-change"><span className="up">↑ 22%</span> vs last year</div></div>
                            <div className="stat-card"><div className="stat-icon purple"><i className="fas fa-receipt"></i></div><div className="stat-label">Average Transaction</div><div className="stat-value">{"\u20B1"}45,200</div><div className="stat-change"><span className="neutral">→ 0%</span> vs last month</div></div>
                        </div>

                        <div className="chart-box">
                            <div className="chart-title">Monthly Revenue Trend <span className="chart-sub">Last 12 months</span></div>
                            <div className="bar-chart" style={{height: '200px'}}>
                                {['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'].map((m, i) => {
                                    const vals = [1200000, 950000, 1100000, 1300000, 1050000, 1400000, 1150000, 1250000, 1350000, 1450000, 1550000, 1650000];
                                    const max = 1650000;
                                    return (
                                        <div className="bar-group" key={i}>
                                            <div className="bar gold" style={{height: `${(vals[i]/max)*100}%`}}><span className="bar-value">{"\u20B1"}{Math.round(vals[i]/1000)}K</span></div>
                                            <div className="bar-label">{m}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="chart-box" style={{marginTop: '1rem'}}>
                            <div className="chart-title">Revenue Breakdown <span className="chart-sub">By category</span></div>
                            <div className="table-wrapper">
                                <table>
                                    <thead><tr><th>Category</th><th style={{textAlign: 'right'}}>Amount</th><th style={{textAlign: 'right'}}>Percentage</th><th>Trend</th></tr></thead>
                                    <tbody>
                                        <tr><td>Grave Lot Sales</td><td style={{textAlign: 'right'}}>{"\u20B1"}1,850,000</td><td style={{textAlign: 'right'}}>65%</td><td><span style={{color: '#27ae60'}}>↑ 12%</span></td></tr>
                                        <tr><td>Wake Space Rental</td><td style={{textAlign: 'right'}}>{"\u20B1"}450,000</td><td style={{textAlign: 'right'}}>16%</td><td><span style={{color: '#27ae60'}}>↑ 8%</span></td></tr>
                                        <tr><td>Installment Payments</td><td style={{textAlign: 'right'}}>{"\u20B1"}380,000</td><td style={{textAlign: 'right'}}>13%</td><td><span style={{color: '#f39c12'}}>→ 0%</span></td></tr>
                                        <tr><td>Other Fees</td><td style={{textAlign: 'right'}}>{"\u20B1"}120,000</td><td style={{textAlign: 'right'}}>6%</td><td><span style={{color: '#c0392b'}}>↓ 3%</span></td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {currentTab === 'occupancy' && (
                    <div className="tab-content">
                        <div className="stats-grid">
                            <div className="stat-card"><div className="stat-icon blue"><i className="fas fa-tshirt"></i></div><div className="stat-label">Total Lots</div><div className="stat-value">223</div><div className="stat-change"><span className="up">↑ 5</span> vs last month</div></div>
                            <div className="stat-card"><div className="stat-icon green"><i className="fas fa-check-circle"></i></div><div className="stat-label">Available</div><div className="stat-value">71</div><div className="stat-change"><span className="up">↑ 3</span> vs last month</div></div>
                            <div className="stat-card"><div className="stat-icon red"><i className="fas fa-circle"></i></div><div className="stat-label">Occupied</div><div className="stat-value">142</div><div className="stat-change"><span className="down">↑ 2</span> vs last month</div></div>
                            <div className="stat-card"><div className="stat-icon orange"><i className="fas fa-clock"></i></div><div className="stat-label">Reserved</div><div className="stat-value">10</div><div className="stat-change"><span className="neutral">→ 0</span> vs last month</div></div>
                        </div>

                        <div className="chart-grid">
                            <div className="chart-box">
                                <div className="chart-title">Occupancy by Grave Type <span className="chart-sub">Available vs Occupied</span></div>
                                <div className="bar-chart" style={{height: '180px'}}>
                                    {graveTypes.map((g, i) => (
                                        <div className="bar-group" key={i}>
                                            <div className="bar blue" style={{height: `${(g.occupied/g.total)*100}%`}}>
                                                <span className="bar-value">{Math.round((g.occupied/g.total)*100)}%</span>
                                            </div>
                                            <div className="bar-label">{g.name}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="chart-box">
                                <div className="chart-title">Occupancy Rate by Section <span className="chart-sub">All sections</span></div>
                                <div className="bar-chart" style={{height: '180px'}}>
                                    {[
                                        { name: 'Section A', occupied: 42, total: 60 },
                                        { name: 'Section B', occupied: 28, total: 45 },
                                        { name: 'Section C', occupied: 18, total: 30 },
                                        { name: 'Section D', occupied: 25, total: 40 },
                                        { name: 'Section E', occupied: 12, total: 25 },
                                        { name: 'Section F', occupied: 17, total: 23 }
                                    ].map((s, i) => {
                                        const rate = Math.round((s.occupied / s.total) * 100);
                                        const color = rate > 70 ? 'red' : rate > 40 ? 'orange' : 'green';
                                        return (
                                            <div className="bar-group" key={i}>
                                                <div className={`bar ${color}`} style={{height: `${(s.occupied/60)*100}%`}}>
                                                    <span className="bar-value">{rate}%</span>
                                                </div>
                                                <div className="bar-label">{s.name}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="chart-box" style={{marginTop: 0}}>
                            <div className="chart-title">Grave Type Inventory <span className="chart-sub">Detailed breakdown</span></div>
                            <div className="table-wrapper">
                                <table>
                                    <thead><tr><th>Grave Type</th><th style={{textAlign: 'center'}}>Total</th><th style={{textAlign: 'center'}}>Available</th><th style={{textAlign: 'center'}}>Occupied</th><th style={{textAlign: 'center'}}>Reserved</th><th style={{textAlign: 'right'}}>Occupancy Rate</th></tr></thead>
                                    <tbody>
                                        {graveTypes.map((g, i) => (
                                            <tr key={i}>
                                                <td>{g.name}</td>
                                                <td style={{textAlign: 'center'}}>{g.total}</td>
                                                <td style={{textAlign: 'center', color: '#27ae60'}}>{g.available}</td>
                                                <td style={{textAlign: 'center', color: '#c0392b'}}>{g.occupied}</td>
                                                <td style={{textAlign: 'center', color: '#f39c12'}}>{g.reserved}</td>
                                                <td style={{textAlign: 'right', fontWeight: 600}}>{Math.round((g.occupied/g.total)*100)}%</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {currentTab === 'payments' && (
                    <div className="tab-content">
                        <div className="stats-grid">
                            <div className="stat-card"><div className="stat-icon green"><i className="fas fa-check-circle"></i></div><div className="stat-label">Fully Paid</div><div className="stat-value">156</div><div className="stat-change"><span className="up">↑ 8</span> vs last month</div></div>
                            <div className="stat-card"><div className="stat-icon orange"><i className="fas fa-clock"></i></div><div className="stat-label">On Installment</div><div className="stat-value">42</div><div className="stat-change"><span className="down">↓ 3</span> vs last month</div></div>
                            <div className="stat-card"><div className="stat-icon red"><i className="fas fa-exclamation-triangle"></i></div><div className="stat-label">Overdue</div><div className="stat-value">12</div><div className="stat-change"><span className="down">↑ 4</span> vs last month</div></div>
                            <div className="stat-card"><div className="stat-icon purple"><i className="fas fa-coins"></i></div><div className="stat-label">Total Outstanding</div><div className="stat-value">{"\u20B1"}850K</div><div className="stat-change"><span className="down">↓ 5%</span> vs last month</div></div>
                        </div>
                        
                        <div className="chart-grid">
                            <div className="chart-box">
                                <div className="chart-title">Payment Status Overview <span className="chart-sub">All accounts</span></div>
                                <div className="donut-container">
                                    <div className="donut" style={{background: 'conic-gradient(#27ae60 0% 70.2%, #f39c12 70.2% 89.1%, #e67e22 89.1% 94.5%, #c0392b 94.5% 100%)'}}>
                                        <div className="donut-hole"><div className="hole-value">70%</div><div className="hole-label">Fully Paid</div></div>
                                    </div>
                                    <div className="donut-legend">
                                        <div className="legend-item"><span className="legend-color" style={{background: '#27ae60'}}></span>Fully Paid <span className="legend-value">156</span></div>
                                        <div className="legend-item"><span className="legend-color" style={{background: '#f39c12'}}></span>Installment <span className="legend-value">42</span></div>
                                        <div className="legend-item"><span className="legend-color" style={{background: '#e67e22'}}></span>DP Only <span className="legend-value">12</span></div>
                                        <div className="legend-item"><span className="legend-color" style={{background: '#c0392b'}}></span>Overdue <span className="legend-value">12</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="chart-box">
                                <div className="chart-title">Overdue Accounts by Days <span className="chart-sub">Current overdue</span></div>
                                <div className="bar-chart" style={{height: '150px'}}>
                                    {[
                                        { label: '1-7 days', value: 4, color: 'orange' },
                                        { label: '8-14 days', value: 3, color: 'orange' },
                                        { label: '15-30 days', value: 3, color: 'red' },
                                        { label: '30+ days', value: 2, color: 'red' }
                                    ].map((d, i) => (
                                        <div className="bar-group" key={i}>
                                            <div className={`bar ${d.color}`} style={{height: `${(d.value/4)*100}%`}}><span className="bar-value">{d.value}</span></div>
                                            <div className="bar-label">{d.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="chart-box" style={{marginTop: 0}}>
                            <div className="chart-title">Overdue Accounts <span className="chart-sub">Requires immediate attention</span></div>
                            <div className="table-wrapper">
                                <table>
                                    <thead><tr><th><i className="fas fa-user"></i> Client</th><th><i className="fas fa-tshirt"></i> Lot</th><th><i className="fas fa-coins"></i> Amount Due</th><th><i className="fas fa-calendar-alt"></i> Overdue Since</th><th><i className="fas fa-clock"></i> Days</th><th>Status</th></tr></thead>
                                    <tbody>
                                        {overdueAccounts.map((o, i) => (
                                            <tr key={i}>
                                                <td><strong>{o.client}</strong></td>
                                                <td>{o.lot}</td>
                                                <td style={{fontWeight: 600, color: '#c0392b'}}>{"\u20B1"}{o.amount.toLocaleString()}</td>
                                                <td>{o.overdueSince}</td>
                                                <td style={{fontWeight: 600, color: o.days > 30 ? '#c0392b' : o.days > 15 ? '#f39c12' : '#e67e22'}}>{o.days}</td>
                                                <td><span className={`status-badge ${o.days > 30 ? 'dp-only' : o.days > 15 ? 'installment' : 'reserved'}`}>{o.days > 30 ? 'Critical' : o.days > 15 ? 'Overdue' : 'Urgent'}</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {currentTab === 'expiry' && (
                    <div className="tab-content">
                        <div className="stats-grid">
                            <div className="stat-card"><div className="stat-icon red"><i className="fas fa-exclamation-triangle"></i></div><div className="stat-label">Expiring This Week</div><div className="stat-value">5</div><div className="stat-change"><span className="down">Urgent</span></div></div>
                            <div className="stat-card"><div className="stat-icon orange"><i className="fas fa-clock"></i></div><div className="stat-label">Expiring This Month</div><div className="stat-value">18</div><div className="stat-change"><span className="up">↑ 6</span> vs last month</div></div>
                            <div className="stat-card"><div className="stat-icon blue"><i className="fas fa-calendar-alt"></i></div><div className="stat-label">Expiring Next 3 Months</div><div className="stat-value">47</div><div className="stat-change"><span className="neutral">→ 0</span> vs last month</div></div>
                            <div className="stat-card"><div className="stat-icon green"><i className="fas fa-check-circle"></i></div><div className="stat-label">Renewed This Month</div><div className="stat-value">9</div><div className="stat-change"><span className="up">↑ 3</span> vs last month</div></div>
                        </div>

                        <div className="chart-box">
                            <div className="chart-title">Contract Expiry Forecast <span className="chart-sub">Next 12 months</span></div>
                            <div className="bar-chart" style={{height: '180px'}}>
                                {['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'].map((m, i) => {
                                    const expiries = [5, 18, 12, 8, 6, 4, 3, 2, 2, 1, 1, 0];
                                    return (
                                        <div className="bar-group" key={i}>
                                            <div className={`bar ${expiries[i] > 10 ? 'red' : expiries[i] > 5 ? 'orange' : 'blue'}`} style={{height: `${(expiries[i]/18)*100}%`}}>
                                                <span className="bar-value">{expiries[i]}</span>
                                            </div>
                                            <div className="bar-label">{m}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="chart-box" style={{marginTop: '1rem'}}>
                            <div className="chart-title">Expiring Contracts <span className="chart-sub">Next 30 days</span></div>
                            <div className="table-wrapper">
                                <table>
                                    <thead><tr><th><i className="fas fa-tshirt"></i> Lot</th><th><i className="fas fa-user"></i> Client</th><th><i className="fas fa-calendar-alt"></i> Expiry Date</th><th><i className="fas fa-clock"></i> Days Left</th><th>Status</th></tr></thead>
                                    <tbody>
                                        {expiringContracts.map((e, i) => (
                                            <tr key={i}>
                                                <td><strong>{e.lot}</strong></td>
                                                <td>{e.client}</td>
                                                <td>{e.expiry}</td>
                                                <td style={{fontWeight: 600, color: e.daysLeft < 15 ? '#c0392b' : e.daysLeft < 30 ? '#f39c12' : '#27ae60'}}>{e.daysLeft}</td>
                                                <td><span className={`status-badge ${e.daysLeft < 15 ? 'dp-only' : e.daysLeft < 30 ? 'installment' : 'available'}`}>{e.daysLeft < 15 ? 'Urgent' : e.daysLeft < 30 ? 'Warning' : 'Ok'}</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {toast.show && (
                <div className={`toast ${toast.type} show`}><span>{toast.msg}</span><button className="toast-close" onClick={() => setToast({ ...toast, show: false })}>×</button></div>
            )}
        </div>
    );
}
