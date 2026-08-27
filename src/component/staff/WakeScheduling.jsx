import React, { useState } from 'react';
import './wake-scheduling.css';

export default function WakeScheduling() {
    const [activeTab, setActiveTab] = useState('table');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    return (
        <div className="wk-page">
            

        <div className="topbar">

            <div className="topbar-left">

                <h1>Wake Scheduling <span>✦</span></h1>

                <div className="greeting">Manage wake space reservations — client-first booking</div>

            </div>

            <div className="topbar-right">

                <div className="date-badge"><i className="fas fa-calendar-alt"></i> August 2026</div>

                <button className="notification-btn"><i className="fas fa-bell"></i><span className="dot"></span></button>

            </div>

        </div>



        {/* ===== STATS ROW ===== */}

        <div className="stats-row" id="statsRow">

            <div className="stat-box">

                <div className="stat-num blue" id="statTotal">0</div>

                <div className="stat-label">Total Bookings</div>

            </div>

            <div className="stat-box">

                <div className="stat-num green" id="statConfirmed">0</div>

                <div className="stat-label">Confirmed</div>

            </div>

            <div className="stat-box">

                <div className="stat-num orange" id="statPending">0</div>

                <div className="stat-label">Pending</div>

            </div>

            <div className="stat-box">

                <div className="stat-num purple" id="statCompleted">0</div>

                <div className="stat-label">Completed</div>

            </div>

            <div className="stat-box">

                <div className="stat-num blue" id="statUtilization">0%</div>

                <div className="stat-label">Utilization (This Month)</div>

            </div>

        </div>



        {/* ===== TODAY OVERVIEW ===== */}

        <div className="today-overview" id="todayOverview">

            <div className="today-label"><i className="fas fa-calendar-day"></i> Today's Wake Schedule</div>

            <div className="today-stats" id="todayStats">

                <div className="stat"><span className="num blue" id="todayTotal">0</span> Total</div>

                <div className="stat"><span className="num green" id="todayConfirmed">0</span> Confirmed</div>

                <div className="stat"><span className="num orange" id="todayPending">0</span> Pending</div>

                <div className="stat"><span className="num purple" id="todayCompleted">0</span> Completed</div>

            </div>

            <div style={{marginLeft: 'auto', fontSize: '0.7rem', color: '#8aaccc'}} id="tomorrowPreview">

                <i className="fas fa-arrow-right"></i> Tomorrow: <span id="tomorrowCount">0</span> wakes

            </div>

        </div>



        {/* ===== INFO BANNER ===== */}

        <div className="info-banner">

            <i className="fas fa-info-circle"></i>

            <span><strong>Wake Space Only:</strong> This booking is for the wake venue space only. Caskets, flowers, sound systems, and other items are <strong>not included</strong> and must be arranged separately by the family.</span>

        </div>



        {/* ===== QUICK AVAILABILITY CHECKER ===== */}

        <div className="availability-checker">

            <div className="check-label"><i className="fas fa-check-circle"></i> Check Availability</div>

            <div className="date-inputs">

                <input type="date" id="availStart" />

                <input type="date" id="availEnd" />

                <button className="btn-primary" onClick={() => {}} style={{padding: '0.4rem 1.2rem', fontSize: '0.85rem'}}>

                    <i className="fas fa-search"></i> Check

                </button>

            </div>

            <div className="check-result idle" id="availResult">

                <i className="fas fa-info-circle"></i> Enter dates to check

            </div>

        </div>



        {/* ===== VIEW TOGGLES ===== */}

        <div className="view-tabs">

            <button className="tab-btn active" data-view="table" onClick={() => {}}>

                <i className="fas fa-list"></i> List View

            </button>

            <button className="tab-btn" data-view="calendar" onClick={() => {}}>

                <i className="fas fa-calendar-alt"></i> Calendar View

            </button>

        </div>



        {/* ===== CALENDAR VIEW ===== */}

        <div className="calendar-view" id="calendarView">

            <div className="calendar-header">

                <div className="month-year"><i className="fas fa-calendar-alt"></i> <span id="calendarMonthYear">August 2026</span></div>

                <div className="calendar-nav">

                    <button onClick={() => {}}><i className="fas fa-chevron-left"></i></button>

                    <button className="today-btn" onClick={() => {}}>Today</button>

                    <button onClick={() => {}}><i className="fas fa-chevron-right"></i></button>

                </div>

            </div>

            <div className="calendar-grid" id="calendarGrid"></div>

            <div className="calendar-legend">

                <span><span className="dot confirmed"></span> Confirmed</span>

                <span><span className="dot pending"></span> Pending</span>

                <span><span className="dot available"></span> Available</span>

                <span style={{color: '#7f8c8d'}}><i className="fas fa-check-double"></i> Completed / Cancelled (hidden)</span>

            </div>

            <div style={{marginTop: '0.5rem', textAlign: 'center', fontSize: '0.7rem', color: '#8aaccc'}}>

                <i className="fas fa-info-circle"></i> Click on a booked day to view details

            </div>

        </div>



        {/* ===== TABLE VIEW ===== */}

        <div className="wake-container" id="tableView">

            <div className="wake-header">

                <div className="wake-header-left">

                    <h2><i className="fas fa-calendar-check" style={{color: '#d4af37', marginRight: '8px'}}></i>All Wake Schedules</h2>

                    <span className="wake-count" id="wakeCount">0 total</span>

                </div>

                <div className="wake-header-right">

                    <button className="btn-secondary" onClick={() => {}}><i className="fas fa-file-export"></i> Export</button>

                    <button className="btn-primary" onClick={() => {}}><i className="fas fa-plus-circle"></i> New Reservation</button>

                </div>

            </div>



            <div className="search-filter-bar">

                <div className="search-wrapper">

                    <i className="fas fa-search search-icon"></i>

                    <input type="text" id="searchInput" placeholder="Search by ID, client, or deceased..." oninput="handleSearch()" />

                    <button className="clear-btn" id="clearBtn" onClick={() => {}}><i className="fas fa-times"></i></button>

                </div>

                <div className="filter-group">

                    <select id="statusFilter" onChange="applyFilters()">

                        <option value="all">All Status</option>

                        <option value="Confirmed">✅ Confirmed</option>

                        <option value="Pending">⏳ Pending</option>

                        <option value="Completed">✔️ Completed</option>

                        <option value="Cancelled">❌ Cancelled</option>

                    </select>

                </div>

            </div>



            <div className="table-wrapper">

                <table>

                    <thead>

                        <tr>

                            <th><i className="fas fa-hashtag"></i>ID</th>

                            <th><i className="fas fa-user"></i>Client</th>

                            <th><i className="fas fa-phone"></i>Contact</th>

                            <th><i className="fas fa-cross"></i>Deceased</th>

                            <th><i className="fas fa-calendar-alt"></i>Start</th>

                            <th><i className="fas fa-calendar-alt"></i>End</th>

                            <th><i className="fas fa-circle"></i>Status</th>

                            <th style={{textAlign: 'center'}}><i className="fas fa-cog"></i>Actions</th>

                        </tr>

                    </thead>

                    <tbody id="wakeTableBody"></tbody>

                </table>

            </div>



            <div className="pagination">

                <div className="pagination-info">Showing <span id="startCount">0</span> to <span id="endCount">0</span> of <span id="totalCount">0</span> schedules</div>

                <div className="pagination-controls">

                    <button onClick={() => {}} id="prevBtn" disabled><i className="fas fa-chevron-left"></i></button>

                    <button className="active" onClick={() => {}}>1</button>

                    <button onClick={() => {}}>2</button>

                    <span className="page-dots">⋯</span>

                    <button onClick={() => {}}>3</button>

                    <button onClick={() => {}} id="nextBtn"><i className="fas fa-chevron-right"></i></button>

                </div>

            </div>

        </div>



        <div className="main-footer" style={{marginTop: '2rem', textAlign: 'center', fontSize: '0.7rem', color: '#8aaccc', borderTop: '1px solid rgba(212,175,55,0.08)', paddingTop: '1.5rem'}}>

            <i className="fas fa-dove" style={{color: '#d4af37', margin: '0 4px'}}></i>

            Cherubim of Heaven Memorial Park · Staff Dashboard v2.0

            <i className="fas fa-dove" style={{color: '#d4af37', margin: '0 4px'}}></i>

        </div>

    
        </div>
    );
}
