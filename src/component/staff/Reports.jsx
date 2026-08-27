import React, { useState } from 'react';
import './reports.css';

export default function Reports() {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className="wk-page">
            

        <div className="topbar">

            <div className="topbar-left">

                <h1>Reports <span>✦</span></h1>

                <div className="greeting">Analytics and insights for Cherubim of Heaven Memorial Park</div>

            </div>

            <div className="topbar-right">

                <div className="date-badge"><i className="fas fa-calendar-alt"></i> August 2026</div>

                <button className="notification-btn"><i className="fas fa-bell"></i><span className="dot"></span></button>

            </div>

        </div>



        {/* ===== REPORTS ===== */}

        <div className="reports-container">



            {/* Header */}

            <div className="reports-header">

                <div className="reports-header-left">

                    <h2><i className="fas fa-chart-pie" style={{color: '#d4af37', marginRight: '8px'}}></i>Analytics Dashboard</h2>

                </div>

                <div className="reports-header-right">

                    <button className="btn-secondary" onClick={() => {}}><i className="fas fa-file-export"></i> Export PDF</button>

                    <button className="btn-secondary" onClick={() => {}}><i className="fas fa-file-csv"></i> Export CSV</button>

                </div>

            </div>



            {/* Date Filter */}

            <div className="date-filter-bar">

                <span className="filter-label"><i className="fas fa-calendar-alt"></i> Period:</span>

                <input type="date" id="startDate" />

                <span style={{color: '#8aaccc'}}>to</span>

                <input type="date" id="endDate" />

                <div className="quick-filters">

                    <button className="qf-btn" onClick={() => {}}>Today</button>

                    <button className="qf-btn" onClick={() => {}}>This Week</button>

                    <button className="qf-btn active" onClick={() => {}}>This Month</button>

                    <button className="qf-btn" onClick={() => {}}>This Quarter</button>

                    <button className="qf-btn" onClick={() => {}}>This Year</button>

                </div>

            </div>



            {/* Report Tabs */}

            <div className="report-tabs">

                <button className="tab-btn active" data-tab="overview" onClick={() => {}}>

                    <i className="fas fa-chart-pie"></i> Overview

                </button>

                <button className="tab-btn" data-tab="revenue" onClick={() => {}}>

                    <i className="fas fa-coins"></i> Revenue

                </button>

                <button className="tab-btn" data-tab="occupancy" onClick={() => {}}>

                    <i className="fas fa-tshirt"></i> Occupancy

                </button>

                <button className="tab-btn" data-tab="payments" onClick={() => {}}>

                    <i className="fas fa-credit-card"></i> Payments

                </button>

                <button className="tab-btn" data-tab="expiry" onClick={() => {}}>

                    <i className="fas fa-clock"></i> Expiry

                </button>

            </div>



            {/* ===== TAB 1: OVERVIEW ===== */}

            <div id="tab-overview" className="tab-content" style={{display: 'block'}}>



                {/* Stats Cards */}

                <div className="stats-grid">

                    <div className="stat-card">

                        <div className="stat-icon gold"><i className="fas fa-cross"></i></div>

                        <div className="stat-label">Total Graves</div>

                        <div className="stat-value" id="totalGraves">223</div>

                        <div className="stat-change"><span className="up">↑ 5</span> vs last month</div>

                    </div>

                    <div className="stat-card">

                        <div className="stat-icon blue"><i className="fas fa-map-pin"></i></div>

                        <div className="stat-label">Occupancy Rate</div>

                        <div className="stat-value" id="occupancyRate">68%</div>

                        <div className="stat-change"><span className="up">↑ 3%</span> vs last month</div>

                    </div>

                    <div className="stat-card">

                        <div className="stat-icon green"><i className="fas fa-coins"></i></div>

                        <div className="stat-label">Total Revenue</div>

                        <div className="stat-value" id="totalRevenue">₱2.8M</div>

                        <div className="stat-change"><span className="up">↑ 12%</span> vs last month</div>

                    </div>

                    <div className="stat-card">

                        <div className="stat-icon orange"><i className="fas fa-clock"></i></div>

                        <div className="stat-label">Expiring Soon</div>

                        <div className="stat-value" id="expiringSoon">23</div>

                        <div className="stat-change"><span className="down">↑ 8</span> vs last month</div>

                    </div>

                </div>



                {/* Charts */}

                <div className="chart-grid">

                    <div className="chart-box">

                        <div className="chart-title">

                            Revenue by Grave Type

                            <span className="chart-sub">This month</span>

                        </div>

                        <div className="bar-chart" id="revenueByType">

                            {/* Rendered by JS */}

                        </div>

                    </div>

                    <div className="chart-box">

                        <div className="chart-title">

                            Payment Status Distribution

                            <span className="chart-sub">All accounts</span>

                        </div>

                        <div className="donut-container" id="paymentDonut">

                            {/* Rendered by JS */}

                        </div>

                    </div>

                </div>



                {/* Recent Transactions */}

                <div className="chart-box" style={{marginTop: '0'}}>

                    <div className="chart-title">

                        Recent Transactions

                        <span className="chart-sub">Last 5 transactions</span>

                    </div>

                    <div className="table-wrapper">

                        <table>

                            <thead>

                                <tr>

                                    <th><i className="fas fa-hashtag"></i> Receipt</th>

                                    <th><i className="fas fa-user"></i> Client</th>

                                    <th><i className="fas fa-tag"></i> Type</th>

                                    <th style={{textAlign: 'right'}}><i className="fas fa-coins"></i> Amount</th>

                                    <th><i className="fas fa-calendar-alt"></i> Date</th>

                                </tr>

                            </thead>

                            <tbody id="recentTransactions">

                                {/* Rendered by JS */}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>



            {/* ===== TAB 2: REVENUE ===== */}

            <div id="tab-revenue" className="tab-content" style={{display: 'none'}}>

                <div className="stats-grid">

                    <div className="stat-card">

                        <div className="stat-icon gold"><i className="fas fa-hand-holding-usd"></i></div>

                        <div className="stat-label">This Month Revenue</div>

                        <div className="stat-value">₱1.2M</div>

                        <div className="stat-change"><span className="up">↑ 8%</span> vs last month</div>

                    </div>

                    <div className="stat-card">

                        <div className="stat-icon blue"><i className="fas fa-chart-line"></i></div>

                        <div className="stat-label">This Quarter Revenue</div>

                        <div className="stat-value">₱3.5M</div>

                        <div className="stat-change"><span className="up">↑ 15%</span> vs last quarter</div>

                    </div>

                    <div className="stat-card">

                        <div className="stat-icon green"><i className="fas fa-calendar-year"></i></div>

                        <div className="stat-label">This Year Revenue</div>

                        <div className="stat-value">₱12.8M</div>

                        <div className="stat-change"><span className="up">↑ 22%</span> vs last year</div>

                    </div>

                    <div className="stat-card">

                        <div className="stat-icon purple"><i className="fas fa-receipt"></i></div>

                        <div className="stat-label">Average Transaction</div>

                        <div className="stat-value">₱45,200</div>

                        <div className="stat-change"><span className="neutral">→ 0%</span> vs last month</div>

                    </div>

                </div>



                <div className="chart-box">

                    <div className="chart-title">

                        Monthly Revenue Trend

                        <span className="chart-sub">Last 12 months</span>

                    </div>

                    <div className="bar-chart" id="revenueTrend" style={{height: '200px'}}>

                        {/* Rendered by JS */}

                    </div>

                </div>



                <div className="chart-box" style={{marginTop: '1rem'}}>

                    <div className="chart-title">

                        Revenue Breakdown

                        <span className="chart-sub">By category</span>

                    </div>

                    <div className="table-wrapper">

                        <table>

                            <thead>

                                <tr>

                                    <th>Category</th>

                                    <th style={{textAlign: 'right'}}>Amount</th>

                                    <th style={{textAlign: 'right'}}>Percentage</th>

                                    <th>Trend</th>

                                </tr>

                            </thead>

                            <tbody>

                                <tr>

                                    <td>🪦 Grave Lot Sales</td>

                                    <td style={{textAlign: 'right'}}>₱1,850,000</td>

                                    <td style={{textAlign: 'right'}}>65%</td>

                                    <td><span style={{color: '#27ae60'}}>↑ 12%</span></td>

                                </tr>

                                <tr>

                                    <td>🛏️ Wake Space Rental</td>

                                    <td style={{textAlign: 'right'}}>₱450,000</td>

                                    <td style={{textAlign: 'right'}}>16%</td>

                                    <td><span style={{color: '#27ae60'}}>↑ 8%</span></td>

                                </tr>

                                <tr>

                                    <td>💰 Installment Payments</td>

                                    <td style={{textAlign: 'right'}}>₱380,000</td>

                                    <td style={{textAlign: 'right'}}>13%</td>

                                    <td><span style={{color: '#f39c12'}}>→ 0%</span></td>

                                </tr>

                                <tr>

                                    <td>📋 Other Fees</td>

                                    <td style={{textAlign: 'right'}}>₱120,000</td>

                                    <td style={{textAlign: 'right'}}>6%</td>

                                    <td><span style={{color: '#c0392b'}}>↓ 3%</span></td>

                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>



            {/* ===== TAB 3: OCCUPANCY ===== */}

            <div id="tab-occupancy" className="tab-content" style={{display: 'none'}}>

                <div className="stats-grid">

                    <div className="stat-card">

                        <div className="stat-icon blue"><i className="fas fa-tshirt"></i></div>

                        <div className="stat-label">Total Lots</div>

                        <div className="stat-value">223</div>

                        <div className="stat-change"><span className="up">↑ 5</span> vs last month</div>

                    </div>

                    <div className="stat-card">

                        <div className="stat-icon green"><i className="fas fa-check-circle"></i></div>

                        <div className="stat-label">Available</div>

                        <div className="stat-value">71</div>

                        <div className="stat-change"><span className="up">↑ 3</span> vs last month</div>

                    </div>

                    <div className="stat-card">

                        <div className="stat-icon red"><i className="fas fa-circle"></i></div>

                        <div className="stat-label">Occupied</div>

                        <div className="stat-value">142</div>

                        <div className="stat-change"><span className="down">↑ 2</span> vs last month</div>

                    </div>

                    <div className="stat-card">

                        <div className="stat-icon orange"><i className="fas fa-clock"></i></div>

                        <div className="stat-label">Reserved</div>

                        <div className="stat-value">10</div>

                        <div className="stat-change"><span className="neutral">→ 0</span> vs last month</div>

                    </div>

                </div>



                <div className="chart-grid">

                    <div className="chart-box">

                        <div className="chart-title">

                            Occupancy by Grave Type

                            <span className="chart-sub">Available vs Occupied</span>

                        </div>

                        <div className="bar-chart" id="occupancyByType" style={{height: '180px'}}>

                            {/* Rendered by JS */}

                        </div>

                    </div>

                    <div className="chart-box">

                        <div className="chart-title">

                            Occupancy Rate by Section

                            <span className="chart-sub">All sections</span>

                        </div>

                        <div className="bar-chart" id="occupancyBySection" style={{height: '180px'}}>

                            {/* Rendered by JS */}

                        </div>

                    </div>

                </div>



                <div className="chart-box" style={{marginTop: '0'}}>

                    <div className="chart-title">

                        Grave Type Inventory

                        <span className="chart-sub">Detailed breakdown</span>

                    </div>

                    <div className="table-wrapper">

                        <table>

                            <thead>

                                <tr>

                                    <th>Grave Type</th>

                                    <th style={{textAlign: 'center'}}>Total</th>

                                    <th style={{textAlign: 'center'}}>Available</th>

                                    <th style={{textAlign: 'center'}}>Occupied</th>

                                    <th style={{textAlign: 'center'}}>Reserved</th>

                                    <th style={{textAlign: 'right'}}>Occupancy Rate</th>

                                </tr>

                            </thead>

                            <tbody id="occupancyTable">

                                {/* Rendered by JS */}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>



            {/* ===== TAB 4: PAYMENTS ===== */}

            <div id="tab-payments" className="tab-content" style={{display: 'none'}}>

                <div className="stats-grid">

                    <div className="stat-card">

                        <div className="stat-icon green"><i className="fas fa-check-circle"></i></div>

                        <div className="stat-label">Fully Paid</div>

                        <div className="stat-value">156</div>

                        <div className="stat-change"><span className="up">↑ 8</span> vs last month</div>

                    </div>

                    <div className="stat-card">

                        <div className="stat-icon orange"><i className="fas fa-clock"></i></div>

                        <div className="stat-label">On Installment</div>

                        <div className="stat-value">42</div>

                        <div className="stat-change"><span className="down">↓ 3</span> vs last month</div>

                    </div>

                    <div className="stat-card">

                        <div className="stat-icon red"><i className="fas fa-exclamation-triangle"></i></div>

                        <div className="stat-label">Overdue</div>

                        <div className="stat-value">12</div>

                        <div className="stat-change"><span className="down">↑ 4</span> vs last month</div>

                    </div>

                    <div className="stat-card">

                        <div className="stat-icon purple"><i className="fas fa-coins"></i></div>

                        <div className="stat-label">Total Outstanding</div>

                        <div className="stat-value">₱850K</div>

                        <div className="stat-change"><span className="down">↓ 5%</span> vs last month</div>

                    </div>

                </div>



                <div className="chart-grid">

                    <div className="chart-box">

                        <div className="chart-title">

                            Payment Status Overview

                            <span className="chart-sub">All accounts</span>

                        </div>

                        <div className="donut-container" id="paymentStatusDonut">

                            {/* Rendered by JS */}

                        </div>

                    </div>

                    <div className="chart-box">

                        <div className="chart-title">

                            Overdue Accounts by Days

                            <span className="chart-sub">Current overdue</span>

                        </div>

                        <div className="bar-chart" id="overdueByDays" style={{height: '150px'}}>

                            {/* Rendered by JS */}

                        </div>

                    </div>

                </div>



                <div className="chart-box" style={{marginTop: '0'}}>

                    <div className="chart-title">

                        Overdue Accounts

                        <span className="chart-sub">Requires immediate attention</span>

                    </div>

                    <div className="table-wrapper">

                        <table>

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

                            <tbody id="overdueTable">

                                {/* Rendered by JS */}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>



            {/* ===== TAB 5: EXPIRY ===== */}

            <div id="tab-expiry" className="tab-content" style={{display: 'none'}}>

                <div className="stats-grid">

                    <div className="stat-card">

                        <div className="stat-icon red"><i className="fas fa-exclamation-triangle"></i></div>

                        <div className="stat-label">Expiring This Week</div>

                        <div className="stat-value">5</div>

                        <div className="stat-change"><span className="down">Urgent</span></div>

                    </div>

                    <div className="stat-card">

                        <div className="stat-icon orange"><i className="fas fa-clock"></i></div>

                        <div className="stat-label">Expiring This Month</div>

                        <div className="stat-value">18</div>

                        <div className="stat-change"><span className="up">↑ 6</span> vs last month</div>

                    </div>

                    <div className="stat-card">

                        </div></div></div></div>
        </div>
    );
}
