import React, { useState, useEffect } from 'react';
import './staff-shared.css';
import './reports.css';
import StaffTopbar from './StaffTopbar';
import { downloadCSV } from '../../utils/exportToCSV';

// ================================================================
// DATA
// ================================================================
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

// ================================================================
// CHART COMPONENTS
// ================================================================

function BarChart({ data, height = 180 }) {
    const max = Math.max(...data.map(d => d.value));
    return (
        <div className="rp-bar-chart" style={{ height: `${height}px` }}>
            {data.map((d, i) => (
                <div className="rp-bar-group" key={i}>
                    <div
                        className={`rp-bar rp-bar-${d.color}`}
                        style={{ height: max > 0 ? `${(d.value / max) * 100}%` : '0%' }}
                    >
                        <span className="rp-bar-value">{d.label_value || d.value}</span>
                    </div>
                    <div className="rp-bar-label">{d.label}</div>
                </div>
            ))}
        </div>
    );
}

function DonutChart({ data }) {
    const total = data.reduce((s, d) => s + d.value, 0);
    let cumulative = 0;
    const segments = data.map(d => {
        const percent = (d.value / total) * 100;
        const start = cumulative;
        cumulative += percent;
        return `${d.color} ${start.toFixed(2)}% ${cumulative.toFixed(2)}%`;
    }).join(', ');

    const mainItem = data[0];
    const mainPercent = Math.round((mainItem.value / total) * 100);

    return (
        <div className="rp-donut-container">
            <div className="rp-donut" style={{ background: `conic-gradient(${segments})` }}>
                <div className="rp-donut-hole">
                    <div className="rp-hole-value">{mainPercent}%</div>
                    <div className="rp-hole-label">{mainItem.label}</div>
                </div>
            </div>
            <div className="rp-donut-legend">
                {data.map((d, i) => (
                    <div className="rp-legend-item" key={i}>
                        <span className="rp-legend-color" style={{ background: d.color }}></span>
                        {d.label}
                        <span className="rp-legend-value">{d.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ================================================================
// MAIN COMPONENT
// ================================================================
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
        showToast(`📊 Generating CSV for ${currentTab}...`, 'info');
        setTimeout(() => {
            let data = [];
            if (currentTab === 'overview') data = graveTypes;
            else if (currentTab === 'revenue' || currentTab === 'payments') data = recentTransactions;
            else if (currentTab === 'occupancy') data = overdueAccounts;
            else if (currentTab === 'expiry') data = expiringContracts;
            downloadCSV(data, `${currentTab}_report_${new Date().toISOString().slice(0, 10)}.csv`);
            showToast(`✅ ${currentTab} report exported!`, 'success');
        }, 800);
    };

    const handleDateRange = (range) => {
        setDateRange(range);
        const today = new Date();
        let start = '';
        const end = today.toISOString().slice(0, 10);
        if (range === 'today') start = end;
        else if (range === 'week') { const d = new Date(today); d.setDate(d.getDate() - d.getDay()); start = d.toISOString().slice(0, 10); }
        else if (range === 'month') { start = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().slice(0, 10); }
        else if (range === 'quarter') { start = new Date(today.getFullYear(), Math.floor(today.getMonth() / 3) * 3, 1).toISOString().slice(0, 10); }
        else if (range === 'year') { start = new Date(today.getFullYear(), 0, 1).toISOString().slice(0, 10); }
        setStartDate(start);
        setEndDate(end);
        if (start) showToast(`📅 Date range updated: ${range}`, 'info');
    };

    // Chart data
    const revenueByTypeData = [
        { label: 'Single Niche', value: 45, color: 'blue', label_value: '45%' },
        { label: 'Mausoleum', value: 25, color: 'gold', label_value: '25%' },
        { label: 'Columbarium', value: 15, color: 'green', label_value: '15%' },
        { label: 'Apartment', value: 10, color: 'orange', label_value: '10%' },
        { label: 'Bonevault', value: 5, color: 'purple', label_value: '5%' },
    ];

    const paymentDonutData = [
        { label: 'Fully Paid', value: 156, color: '#27ae60' },
        { label: 'Installment', value: 42, color: '#f39c12' },
        { label: 'DP Only', value: 12, color: '#c0392b' },
        { label: 'Overdue', value: 12, color: '#e74c3c' },
    ];

    const revenueTrendMonths = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
    const revenueTrendValues = [1200000, 950000, 1100000, 1300000, 1050000, 1400000, 1150000, 1250000, 1350000, 1450000, 1550000, 1650000];
    const revenueTrendData = revenueTrendMonths.map((m, i) => ({
        label: m, value: revenueTrendValues[i], color: 'gold', label_value: `₱${Math.round(revenueTrendValues[i] / 1000)}K`
    }));

    const occupancyByTypeData = graveTypes.map(g => ({
        label: g.name, value: g.occupied, color: 'blue', label_value: `${Math.round((g.occupied / g.total) * 100)}%`
    }));

    const sections = [
        { name: 'Section A', occupied: 42, total: 60 },
        { name: 'Section B', occupied: 28, total: 45 },
        { name: 'Section C', occupied: 18, total: 30 },
        { name: 'Section D', occupied: 25, total: 40 },
        { name: 'Section E', occupied: 12, total: 25 },
        { name: 'Section F', occupied: 17, total: 23 },
    ];
    const occupancyBySectionData = sections.map(s => {
        const rate = Math.round((s.occupied / s.total) * 100);
        const color = rate > 70 ? 'red' : rate > 40 ? 'orange' : 'green';
        return { label: s.name, value: s.occupied, color, label_value: `${rate}%` };
    });

    const paymentStatusDonutData = [
        { label: 'Fully Paid', value: 156, color: '#27ae60' },
        { label: 'Installment', value: 42, color: '#f39c12' },
        { label: 'DP Only', value: 12, color: '#e67e22' },
        { label: 'Overdue', value: 12, color: '#c0392b' },
    ];

    const overdueByDaysData = [
        { label: '1-7 days', value: 4, color: 'orange' },
        { label: '8-14 days', value: 3, color: 'orange' },
        { label: '15-30 days', value: 3, color: 'red' },
        { label: '30+ days', value: 2, color: 'red' },
    ];

    const expiryForecastMonths = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
    const expiryForecastValues = [5, 18, 12, 8, 6, 4, 3, 2, 2, 1, 1, 0];
    const expiryForecastData = expiryForecastMonths.map((m, i) => ({
        label: m, value: expiryForecastValues[i],
        color: expiryForecastValues[i] > 10 ? 'red' : expiryForecastValues[i] > 5 ? 'orange' : 'blue',
        label_value: `${expiryForecastValues[i]}`
    }));

    const tabs = [
        { id: 'overview', icon: 'fa-chart-pie', label: 'Overview' },
        { id: 'revenue', icon: 'fa-coins', label: 'Revenue' },
        { id: 'occupancy', icon: 'fa-tshirt', label: 'Occupancy' },
        { id: 'payments', icon: 'fa-credit-card', label: 'Payments' },
        { id: 'expiry', icon: 'fa-clock', label: 'Expiry' },
    ];

    return (
        <div className="reports-page-wrapper">
            <StaffTopbar title="Reports" greeting="Analytics and insights for Cherubim of Heaven Memorial Park" />

            <div className="rp-container">
                {/* Header */}
                <div className="rp-header">
                    <div className="rp-header-left">
                        <h2><i className="fas fa-chart-pie" style={{ color: '#d4af37', marginRight: '8px' }}></i>Analytics Dashboard</h2>
                    </div>
                    <div className="rp-header-right">
                        <button className="rp-btn-secondary" onClick={() => window.print()}>
                            <i className="fas fa-file-export"></i> Export PDF
                        </button>
                        <button className="rp-btn-secondary" onClick={handleExportCSV}>
                            <i className="fas fa-file-csv"></i> Export CSV
                        </button>
                    </div>
                </div>

                {/* Date Filter */}
                <div className="rp-date-filter-bar">
                    <span className="rp-filter-label"><i className="fas fa-calendar-alt"></i> Period:</span>
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                    <span style={{ color: '#8aaccc' }}>to</span>
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                    <div className="rp-quick-filters">
                        {[
                            { key: 'today', label: 'Today' },
                            { key: 'week', label: 'This Week' },
                            { key: 'month', label: 'This Month' },
                            { key: 'quarter', label: 'This Quarter' },
                            { key: 'year', label: 'This Year' },
                        ].map(r => (
                            <button
                                key={r.key}
                                className={`rp-qf-btn${dateRange === r.key ? ' active' : ''}`}
                                onClick={() => handleDateRange(r.key)}
                            >
                                {r.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tabs */}
                <div className="rp-tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`rp-tab-btn${currentTab === tab.id ? ' active' : ''}`}
                            onClick={() => setCurrentTab(tab.id)}
                        >
                            <i className={`fas ${tab.icon}`}></i> {tab.label}
                        </button>
                    ))}
                </div>

                {/* ===== TAB: OVERVIEW ===== */}
                {currentTab === 'overview' && (
                    <div className="rp-tab-content">
                        <div className="rp-stats-grid">
                            <div className="rp-stat-card">
                                <div className="rp-stat-icon rp-gold"><i className="fas fa-cross"></i></div>
                                <div className="rp-stat-label">Total Graves</div>
                                <div className="rp-stat-value">223</div>
                                <div className="rp-stat-change"><span className="rp-up">↑ 5</span> vs last month</div>
                            </div>
                            <div className="rp-stat-card">
                                <div className="rp-stat-icon rp-blue"><i className="fas fa-map-pin"></i></div>
                                <div className="rp-stat-label">Occupancy Rate</div>
                                <div className="rp-stat-value">68%</div>
                                <div className="rp-stat-change"><span className="rp-up">↑ 3%</span> vs last month</div>
                            </div>
                            <div className="rp-stat-card">
                                <div className="rp-stat-icon rp-green"><i className="fas fa-coins"></i></div>
                                <div className="rp-stat-label">Total Revenue</div>
                                <div className="rp-stat-value">₱2.8M</div>
                                <div className="rp-stat-change"><span className="rp-up">↑ 12%</span> vs last month</div>
                            </div>
                            <div className="rp-stat-card">
                                <div className="rp-stat-icon rp-orange"><i className="fas fa-clock"></i></div>
                                <div className="rp-stat-label">Expiring Soon</div>
                                <div className="rp-stat-value">23</div>
                                <div className="rp-stat-change"><span className="rp-down">↑ 8</span> vs last month</div>
                            </div>
                        </div>

                        <div className="rp-chart-grid">
                            <div className="rp-chart-box">
                                <div className="rp-chart-title">Revenue by Grave Type <span className="rp-chart-sub">This month</span></div>
                                <BarChart data={revenueByTypeData} height={180} />
                            </div>
                            <div className="rp-chart-box">
                                <div className="rp-chart-title">Payment Status Distribution <span className="rp-chart-sub">All accounts</span></div>
                                <DonutChart data={paymentDonutData} />
                            </div>
                        </div>

                        <div className="rp-chart-box" style={{ marginTop: 0 }}>
                            <div className="rp-chart-title">Recent Transactions <span className="rp-chart-sub">Last 5 transactions</span></div>
                            <div className="rp-table-wrapper">
                                <table className="rp-table">
                                    <thead>
                                        <tr>
                                            <th><i className="fas fa-hashtag"></i> Receipt</th>
                                            <th><i className="fas fa-user"></i> Client</th>
                                            <th><i className="fas fa-tag"></i> Type</th>
                                            <th style={{ textAlign: 'right' }}><i className="fas fa-coins"></i> Amount</th>
                                            <th><i className="fas fa-calendar-alt"></i> Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentTransactions.map((t, i) => (
                                            <tr key={i}>
                                                <td><strong>{t.receipt}</strong></td>
                                                <td>{t.client}</td>
                                                <td>{t.type}</td>
                                                <td style={{ textAlign: 'right', fontWeight: 600, color: '#27ae60' }}>₱{t.amount.toLocaleString()}</td>
                                                <td>{t.date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* ===== TAB: REVENUE ===== */}
                {currentTab === 'revenue' && (
                    <div className="rp-tab-content">
                        <div className="rp-stats-grid">
                            <div className="rp-stat-card">
                                <div className="rp-stat-icon rp-gold"><i className="fas fa-hand-holding-usd"></i></div>
                                <div className="rp-stat-label">This Month Revenue</div>
                                <div className="rp-stat-value">₱1.2M</div>
                                <div className="rp-stat-change"><span className="rp-up">↑ 8%</span> vs last month</div>
                            </div>
                            <div className="rp-stat-card">
                                <div className="rp-stat-icon rp-blue"><i className="fas fa-chart-line"></i></div>
                                <div className="rp-stat-label">This Quarter Revenue</div>
                                <div className="rp-stat-value">₱3.5M</div>
                                <div className="rp-stat-change"><span className="rp-up">↑ 15%</span> vs last quarter</div>
                            </div>
                            <div className="rp-stat-card">
                                <div className="rp-stat-icon rp-green"><i className="fas fa-calendar"></i></div>
                                <div className="rp-stat-label">This Year Revenue</div>
                                <div className="rp-stat-value">₱12.8M</div>
                                <div className="rp-stat-change"><span className="rp-up">↑ 22%</span> vs last year</div>
                            </div>
                            <div className="rp-stat-card">
                                <div className="rp-stat-icon rp-purple"><i className="fas fa-receipt"></i></div>
                                <div className="rp-stat-label">Average Transaction</div>
                                <div className="rp-stat-value">₱45,200</div>
                                <div className="rp-stat-change"><span className="rp-neutral">→ 0%</span> vs last month</div>
                            </div>
                        </div>

                        <div className="rp-chart-box">
                            <div className="rp-chart-title">Monthly Revenue Trend <span className="rp-chart-sub">Last 12 months</span></div>
                            <BarChart data={revenueTrendData} height={200} />
                        </div>

                        <div className="rp-chart-box" style={{ marginTop: '1rem' }}>
                            <div className="rp-chart-title">Revenue Breakdown <span className="rp-chart-sub">By category</span></div>
                            <div className="rp-table-wrapper">
                                <table className="rp-table">
                                    <thead>
                                        <tr>
                                            <th>Category</th>
                                            <th style={{ textAlign: 'right' }}>Amount</th>
                                            <th style={{ textAlign: 'right' }}>Percentage</th>
                                            <th>Trend</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>🪦 Grave Lot Sales</td><td style={{ textAlign: 'right' }}>₱1,850,000</td><td style={{ textAlign: 'right' }}>65%</td><td><span style={{ color: '#27ae60' }}>↑ 12%</span></td></tr>
                                        <tr><td>🛏️ Wake Space Rental</td><td style={{ textAlign: 'right' }}>₱450,000</td><td style={{ textAlign: 'right' }}>16%</td><td><span style={{ color: '#27ae60' }}>↑ 8%</span></td></tr>
                                        <tr><td>💰 Installment Payments</td><td style={{ textAlign: 'right' }}>₱380,000</td><td style={{ textAlign: 'right' }}>13%</td><td><span style={{ color: '#f39c12' }}>→ 0%</span></td></tr>
                                        <tr><td>📋 Other Fees</td><td style={{ textAlign: 'right' }}>₱120,000</td><td style={{ textAlign: 'right' }}>6%</td><td><span style={{ color: '#c0392b' }}>↓ 3%</span></td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* ===== TAB: OCCUPANCY ===== */}
                {currentTab === 'occupancy' && (
                    <div className="rp-tab-content">
                        <div className="rp-stats-grid">
                            <div className="rp-stat-card">
                                <div className="rp-stat-icon rp-blue"><i className="fas fa-tshirt"></i></div>
                                <div className="rp-stat-label">Total Lots</div>
                                <div className="rp-stat-value">223</div>
                                <div className="rp-stat-change"><span className="rp-up">↑ 5</span> vs last month</div>
                            </div>
                            <div className="rp-stat-card">
                                <div className="rp-stat-icon rp-green"><i className="fas fa-check-circle"></i></div>
                                <div className="rp-stat-label">Available</div>
                                <div className="rp-stat-value">71</div>
                                <div className="rp-stat-change"><span className="rp-up">↑ 3</span> vs last month</div>
                            </div>
                            <div className="rp-stat-card">
                                <div className="rp-stat-icon rp-red"><i className="fas fa-circle"></i></div>
                                <div className="rp-stat-label">Occupied</div>
                                <div className="rp-stat-value">142</div>
                                <div className="rp-stat-change"><span className="rp-down">↑ 2</span> vs last month</div>
                            </div>
                            <div className="rp-stat-card">
                                <div className="rp-stat-icon rp-orange"><i className="fas fa-clock"></i></div>
                                <div className="rp-stat-label">Reserved</div>
                                <div className="rp-stat-value">10</div>
                                <div className="rp-stat-change"><span className="rp-neutral">→ 0</span> vs last month</div>
                            </div>
                        </div>

                        <div className="rp-chart-grid">
                            <div className="rp-chart-box">
                                <div className="rp-chart-title">Occupancy by Grave Type <span className="rp-chart-sub">Available vs Occupied</span></div>
                                <BarChart data={occupancyByTypeData} height={180} />
                            </div>
                            <div className="rp-chart-box">
                                <div className="rp-chart-title">Occupancy Rate by Section <span className="rp-chart-sub">All sections</span></div>
                                <BarChart data={occupancyBySectionData} height={180} />
                            </div>
                        </div>

                        <div className="rp-chart-box" style={{ marginTop: 0 }}>
                            <div className="rp-chart-title">Grave Type Inventory <span className="rp-chart-sub">Detailed breakdown</span></div>
                            <div className="rp-table-wrapper">
                                <table className="rp-table">
                                    <thead>
                                        <tr>
                                            <th>Grave Type</th>
                                            <th style={{ textAlign: 'center' }}>Total</th>
                                            <th style={{ textAlign: 'center' }}>Available</th>
                                            <th style={{ textAlign: 'center' }}>Occupied</th>
                                            <th style={{ textAlign: 'center' }}>Reserved</th>
                                            <th style={{ textAlign: 'right' }}>Occupancy Rate</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {graveTypes.map((g, i) => (
                                            <tr key={i}>
                                                <td>{g.name}</td>
                                                <td style={{ textAlign: 'center' }}>{g.total}</td>
                                                <td style={{ textAlign: 'center', color: '#27ae60' }}>{g.available}</td>
                                                <td style={{ textAlign: 'center', color: '#c0392b' }}>{g.occupied}</td>
                                                <td style={{ textAlign: 'center', color: '#f39c12' }}>{g.reserved}</td>
                                                <td style={{ textAlign: 'right', fontWeight: 600 }}>{Math.round((g.occupied / g.total) * 100)}%</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* ===== TAB: PAYMENTS ===== */}
                {currentTab === 'payments' && (
                    <div className="rp-tab-content">
                        <div className="rp-stats-grid">
                            <div className="rp-stat-card">
                                <div className="rp-stat-icon rp-green"><i className="fas fa-check-circle"></i></div>
                                <div className="rp-stat-label">Fully Paid</div>
                                <div className="rp-stat-value">156</div>
                                <div className="rp-stat-change"><span className="rp-up">↑ 8</span> vs last month</div>
                            </div>
                            <div className="rp-stat-card">
                                <div className="rp-stat-icon rp-orange"><i className="fas fa-clock"></i></div>
                                <div className="rp-stat-label">On Installment</div>
                                <div className="rp-stat-value">42</div>
                                <div className="rp-stat-change"><span className="rp-down">↓ 3</span> vs last month</div>
                            </div>
                            <div className="rp-stat-card">
                                <div className="rp-stat-icon rp-red"><i className="fas fa-exclamation-triangle"></i></div>
                                <div className="rp-stat-label">Overdue</div>
                                <div className="rp-stat-value">12</div>
                                <div className="rp-stat-change"><span className="rp-down">↑ 4</span> vs last month</div>
                            </div>
                            <div className="rp-stat-card">
                                <div className="rp-stat-icon rp-purple"><i className="fas fa-coins"></i></div>
                                <div className="rp-stat-label">Total Outstanding</div>
                                <div className="rp-stat-value">₱850K</div>
                                <div className="rp-stat-change"><span className="rp-down">↓ 5%</span> vs last month</div>
                            </div>
                        </div>

                        <div className="rp-chart-grid">
                            <div className="rp-chart-box">
                                <div className="rp-chart-title">Payment Status Overview <span className="rp-chart-sub">All accounts</span></div>
                                <DonutChart data={paymentStatusDonutData} />
                            </div>
                            <div className="rp-chart-box">
                                <div className="rp-chart-title">Overdue Accounts by Days <span className="rp-chart-sub">Current overdue</span></div>
                                <BarChart data={overdueByDaysData} height={150} />
                            </div>
                        </div>

                        <div className="rp-chart-box" style={{ marginTop: 0 }}>
                            <div className="rp-chart-title">Overdue Accounts <span className="rp-chart-sub">Requires immediate attention</span></div>
                            <div className="rp-table-wrapper">
                                <table className="rp-table">
                                    <thead>
                                        <tr>
                                            <th><i className="fas fa-user"></i> Client</th>
                                            <th><i className="fas fa-tshirt"></i> Lot</th>
                                            <th><i className="fas fa-coins"></i> Amount Due</th>
                                            <th><i className="fas fa-calendar-alt"></i> Overdue Since</th>
                                            <th><i className="fas fa-clock"></i> Days</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {overdueAccounts.map((o, i) => (
                                            <tr key={i}>
                                                <td><strong>{o.client}</strong></td>
                                                <td>{o.lot}</td>
                                                <td style={{ fontWeight: 600, color: '#c0392b' }}>₱{o.amount.toLocaleString()}</td>
                                                <td>{o.overdueSince}</td>
                                                <td style={{ fontWeight: 600, color: o.days > 30 ? '#c0392b' : o.days > 15 ? '#f39c12' : '#e67e22' }}>{o.days}</td>
                                                <td><span className={`rp-status-badge ${o.days > 30 ? 'rp-dp-only' : o.days > 15 ? 'rp-installment' : 'rp-reserved'}`}>{o.days > 30 ? 'Critical' : o.days > 15 ? 'Overdue' : 'Urgent'}</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* ===== TAB: EXPIRY ===== */}
                {currentTab === 'expiry' && (
                    <div className="rp-tab-content">
                        <div className="rp-stats-grid">
                            <div className="rp-stat-card">
                                <div className="rp-stat-icon rp-red"><i className="fas fa-exclamation-triangle"></i></div>
                                <div className="rp-stat-label">Expiring This Week</div>
                                <div className="rp-stat-value">5</div>
                                <div className="rp-stat-change"><span className="rp-down">Urgent</span></div>
                            </div>
                            <div className="rp-stat-card">
                                <div className="rp-stat-icon rp-orange"><i className="fas fa-clock"></i></div>
                                <div className="rp-stat-label">Expiring This Month</div>
                                <div className="rp-stat-value">18</div>
                                <div className="rp-stat-change"><span className="rp-up">↑ 6</span> vs last month</div>
                            </div>
                            <div className="rp-stat-card">
                                <div className="rp-stat-icon rp-blue"><i className="fas fa-calendar-alt"></i></div>
                                <div className="rp-stat-label">Expiring Next 3 Months</div>
                                <div className="rp-stat-value">47</div>
                                <div className="rp-stat-change"><span className="rp-neutral">→ 0</span> vs last month</div>
                            </div>
                            <div className="rp-stat-card">
                                <div className="rp-stat-icon rp-green"><i className="fas fa-check-circle"></i></div>
                                <div className="rp-stat-label">Renewed This Month</div>
                                <div className="rp-stat-value">9</div>
                                <div className="rp-stat-change"><span className="rp-up">↑ 3</span> vs last month</div>
                            </div>
                        </div>

                        <div className="rp-chart-box">
                            <div className="rp-chart-title">Contract Expiry Forecast <span className="rp-chart-sub">Next 12 months</span></div>
                            <BarChart data={expiryForecastData} height={180} />
                        </div>

                        <div className="rp-chart-box" style={{ marginTop: '1rem' }}>
                            <div className="rp-chart-title">Expiring Contracts <span className="rp-chart-sub">Next 30 days</span></div>
                            <div className="rp-table-wrapper">
                                <table className="rp-table">
                                    <thead>
                                        <tr>
                                            <th><i className="fas fa-tshirt"></i> Lot</th>
                                            <th><i className="fas fa-user"></i> Client</th>
                                            <th><i className="fas fa-calendar-alt"></i> Expiry Date</th>
                                            <th><i className="fas fa-clock"></i> Days Left</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {expiringContracts.map((e, i) => (
                                            <tr key={i}>
                                                <td><strong>{e.lot}</strong></td>
                                                <td>{e.client}</td>
                                                <td>{e.expiry}</td>
                                                <td style={{ fontWeight: 600, color: e.daysLeft < 15 ? '#c0392b' : e.daysLeft < 30 ? '#f39c12' : '#27ae60' }}>{e.daysLeft}</td>
                                                <td><span className={`rp-status-badge ${e.daysLeft < 15 ? 'rp-dp-only' : e.daysLeft < 30 ? 'rp-installment' : 'rp-available'}`}>{e.daysLeft < 15 ? 'Urgent' : e.daysLeft < 30 ? 'Warning' : 'Ok'}</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="rp-footer">
                <i className="fas fa-dove" style={{ color: '#d4af37', margin: '0 4px' }}></i>
                Cherubim of Heaven Memorial Park · Staff Dashboard v2.0
                <i className="fas fa-dove" style={{ color: '#d4af37', margin: '0 4px' }}></i>
            </div>

            {/* Toast */}
            {toast.show && (
                <div className={`rp-toast rp-toast-${toast.type} rp-toast-show`}>
                    <span>{toast.msg}</span>
                    <button className="rp-toast-close" onClick={() => setToast({ ...toast, show: false })}>×</button>
                </div>
            )}
        </div>
    );
}
