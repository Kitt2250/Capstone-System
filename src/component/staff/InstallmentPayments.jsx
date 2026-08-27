import { useState } from "react";
import "./installment-payments.css";
import StaffTopbar from "./StaffTopbar";

const INITIAL_INSTALLMENTS = [
  {
      id: 'INS-001',
      client: 'Rosa Mendoza',
      lot: 'Lot B-098',
      graveType: 'Apartment',
      totalAmount: 165000,
      paid: 120000,
      status: 'active',
      lastPayment: '2026-07-15',
      dueDate: '2026-08-15',
      contactNumber: '0917-123-4567',
      email: 'rosa.m@email.com',
      address: '123 Mabini St., Brgy. San Juan, Hagonoy, Bulacan',
      monthlyAmount: 15000,
      totalMonths: 12,
      monthsPaid: 8,
      notes: [
          { date: '2026-08-10 14:30', text: 'Sent payment reminder via SMS', author: 'Staff' },
          { date: '2026-08-05 09:15', text: 'Called - promised to pay next week', author: 'Staff' }
      ],
      payments: [
          { date: '2026-06-15', amount: 60000, receipt: 'OR-2026-0280' },
          { date: '2026-07-15', amount: 60000, receipt: 'OR-2026-0310' }
      ]
  }, {
      id: 'INS-002',
      client: 'Carlos Tan',
      lot: 'Lot D-012',
      graveType: 'Bonevault',
      totalAmount: 65000,
      paid: 45000,
      status: 'overdue',
      lastPayment: '2026-06-20',
      dueDate: '2026-07-20',
      contactNumber: '0918-234-5678',
      email: 'carlos.t@email.com',
      address: '456 Rizal Ave., Brgy. San Jose, Hagonoy, Bulacan',
      monthlyAmount: 20000,
      totalMonths: 6,
      monthsPaid: 2,
      notes: [
          { date: '2026-08-01 10:00', text: '📞 Called - no answer', author: 'Staff' },
          { date: '2026-07-25 16:20', text: 'Sent SMS reminder', author: 'Staff' }
      ],
      payments: [
          { date: '2026-05-20', amount: 25000, receipt: 'OR-2026-0245' },
          { date: '2026-06-20', amount: 20000, receipt: 'OR-2026-0290' }
      ]
  }, {
      id: 'INS-003',
      client: 'Elena Santos',
      lot: 'Lot C-130',
      graveType: 'Mausoleum',
      totalAmount: 530000,
      paid: 350000,
      status: 'active',
      lastPayment: '2026-08-01',
      dueDate: '2026-09-01',
      contactNumber: '0919-345-6789',
      email: 'elena.s@email.com',
      address: '789 Luna St., Brgy. San Vicente, Hagonoy, Bulacan',
      monthlyAmount: 50000,
      totalMonths: 12,
      monthsPaid: 7,
      notes: [
          { date: '2026-07-28 11:30', text: '✅ Payment confirmed. On track.', author: 'Staff' }
      ],
      payments: [
          { date: '2026-04-01', amount: 150000, receipt: 'OR-2026-0180' },
          { date: '2026-06-01', amount: 100000, receipt: 'OR-2026-0265' },
          { date: '2026-08-01', amount: 100000, receipt: 'OR-2026-0335' }
      ]
  }, {
      id: 'INS-004',
      client: 'Maria Cruz',
      lot: 'Lot B-047',
      graveType: 'Apartment',
      totalAmount: 120000,
      paid: 120000,
      status: 'paid',
      lastPayment: '2026-07-28',
      dueDate: null,
      contactNumber: '0920-456-7890',
      email: 'maria.c@email.com',
      address: '321 Bonifacio St., Brgy. San Isidro, Hagonoy, Bulacan',
      monthlyAmount: 40000,
      totalMonths: 3,
      monthsPaid: 3,
      notes: [
          { date: '2026-07-28 15:45', text: '🎉 Fully paid! Account closed.', author: 'Admin' }
      ],
      payments: [
          { date: '2026-05-28', amount: 40000, receipt: 'OR-2026-0250' },
          { date: '2026-06-28', amount: 40000, receipt: 'OR-2026-0295' },
          { date: '2026-07-28', amount: 40000, receipt: 'OR-2026-0330' }
      ]
  }, {
      id: 'INS-005',
      client: 'Pedro Garcia',
      lot: 'Lot A-150',
      graveType: 'Single Niche',
      totalAmount: 150000,
      paid: 85000,
      status: 'active',
      lastPayment: '2026-07-10',
      dueDate: '2026-08-10',
      contactNumber: '0921-567-8901',
      email: 'pedro.g@email.com',
      address: '555 Mabuhay St., Brgy. San Rafael, Hagonoy, Bulacan',
      monthlyAmount: 30000,
      totalMonths: 5,
      monthsPaid: 3,
      notes: [],
      payments: [
          { date: '2026-05-10', amount: 30000, receipt: 'OR-2026-0220' },
          { date: '2026-06-10', amount: 30000, receipt: 'OR-2026-0275' },
          { date: '2026-07-10', amount: 25000, receipt: 'OR-2026-0320' }
      ]
  }, {
      id: 'INS-006',
      client: 'Lourdes Garcia',
      lot: 'Lot A-200',
      graveType: 'Garden Type',
      totalAmount: 560000,
      paid: 560000,
      status: 'paid',
      lastPayment: '2026-06-30',
      dueDate: null,
      contactNumber: '0922-678-9012',
      email: 'lourdes.g@email.com',
      address: '123 Dona St., Brgy. San Roque, Hagonoy, Bulacan',
      monthlyAmount: 100000,
      totalMonths: 7,
      monthsPaid: 7,
      notes: [
          { date: '2026-06-30 17:00', text: '🎉 Fully paid! Account closed.', author: 'Admin' }
      ],
      payments: [
          { date: '2026-02-28', amount: 100000, receipt: 'OR-2026-0120' },
          { date: '2026-04-30', amount: 200000, receipt: 'OR-2026-0200' },
          { date: '2026-06-30', amount: 260000, receipt: 'OR-2026-0285' }
      ]
  }, {
      id: 'INS-007',
      client: 'Roberto Lim',
      lot: 'Lot D-014',
      graveType: 'Bonevault',
      totalAmount: 65000,
      paid: 25000,
      status: 'overdue',
      lastPayment: '2026-05-15',
      dueDate: '2026-06-15',
      contactNumber: '0923-789-0123',
      email: 'roberto.l@email.com',
      address: '789 Rizal St., Brgy. San Pablo, Hagonoy, Bulacan',
      monthlyAmount: 25000,
      totalMonths: 3,
      monthsPaid: 1,
      notes: [
          { date: '2026-07-15 09:00', text: '⚠️ 30 days overdue. Called - no answer.', author: 'Staff' },
          { date: '2026-08-01 08:30', text: '⚠️ 45 days overdue. Escalated to Admin.', author: 'Admin' }
      ],
      payments: [
          { date: '2026-05-15', amount: 25000, receipt: 'OR-2026-0230' }
      ]
  }, {
      id: 'INS-008',
      client: 'Ana Reyes',
      lot: 'Lot E-003',
      graveType: 'Columbarium',
      totalAmount: 80000,
      paid: 80000,
      status: 'paid',
      lastPayment: '2026-07-20',
      dueDate: null,
      contactNumber: '0924-890-1234',
      email: 'ana.r@email.com',
      address: '321 Mabini St., Brgy. San Pedro, Hagonoy, Bulacan',
      monthlyAmount: 30000,
      totalMonths: 3,
      monthsPaid: 3,
      notes: [
          { date: '2026-07-20 16:00', text: '🎉 Fully paid! Account closed.', author: 'Admin' }
      ],
      payments: [
          { date: '2026-05-20', amount: 30000, receipt: 'OR-2026-0240' },
          { date: '2026-06-20', amount: 30000, receipt: 'OR-2026-0280' },
          { date: '2026-07-20', amount: 20000, receipt: 'OR-2026-0325' }
      ]
  }
];

const graveTypeColors = {
  'Single Niche': 'single-niche',
  'Mausoleum': 'mausoleum',
  'Columbarium': 'columbarium',
  'Apartment': 'apartment',
  'Bonevault': 'bonevault',
  'Garden Type': 'garden',
  'Heroes Buried': 'heroes'
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

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function getDaysOverdue(ins) {
  if (!ins.dueDate || ins.status === 'paid') return 0;
  const today = new Date();
  const due = new Date(ins.dueDate);
  const diff = Math.floor((today - due) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
}

function getOverdueBadge(days) {
  if (days === 0) return { class: 'current', label: '✅ Current' };
  if (days <= 7) return { class: 'warning', label: `⚠️ ${days}d overdue` };
  if (days <= 15) return { class: 'urgent', label: `🚨 ${days}d overdue` };
  return { class: 'critical', label: `⛔ ${days}d overdue` };
}

function getProgressClass(percent) {
  if (percent >= 80) return '';
  if (percent >= 50) return 'medium';
  return 'low';
}

function InstallmentPayments() {
  const [installments, setInstallments] = useState(INITIAL_INSTALLMENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [graveTypeFilter, setGraveTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;

  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast(t => (t ? { ...t, visible: false } : null)), 3500);
  };

  const [detailsModal, setDetailsModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [historyModal, setHistoryModal] = useState(false);

  const [targetId, setTargetId] = useState(null);
  const [noteInput, setNoteInput] = useState('');
  
  // Payment Form States
  const [payAmount, setPayAmount] = useState('');
  const [payDate, setPayDate] = useState(new Date().toISOString().slice(0, 10));
  const [payReceipt, setPayReceipt] = useState('');

  // Filtering
  const filteredInstallments = installments.filter(ins => {
    const s = searchTerm.toLowerCase();
    const matchSearch = s === '' || 
      ins.client.toLowerCase().includes(s) || 
      ins.lot.toLowerCase().includes(s) || 
      ins.id.toLowerCase().includes(s);
    
    let matchStatus = true;
    if (statusFilter === 'active') matchStatus = ins.status === 'active';
    else if (statusFilter === 'overdue') matchStatus = ins.status === 'overdue';
    else if (statusFilter === 'paid') matchStatus = ins.status === 'paid';

    const matchGraveType = graveTypeFilter === 'all' || ins.graveType === graveTypeFilter;

    return matchSearch && matchStatus && matchGraveType;
  });

  const totalPages = Math.ceil(filteredInstallments.length / rowsPerPage);
  const start = (currentPage - 1) * rowsPerPage;
  const pageItems = filteredInstallments.slice(start, start + rowsPerPage);

  // Stats
  let totalOutstanding = 0;
  let overdueCount = 0;
  let activeCount = 0;
  installments.forEach(ins => {
    const balance = ins.totalAmount - ins.paid;
    if (balance > 0) {
      totalOutstanding += balance;
      activeCount++;
      if (ins.status === 'overdue') overdueCount++;
    }
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  const handleClearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  const openDetails = (id) => {
    setTargetId(id);
    setNoteInput('');
    setDetailsModal(true);
  };

  const openHistory = (id) => {
    setTargetId(id);
    setHistoryModal(true);
  };

  const openPayment = (id) => {
    setTargetId(id);
    setPayAmount('');
    setPayDate(new Date().toISOString().slice(0, 10));
    setPayReceipt(`OR-2026-${String(Math.floor(Math.random() * 9000 + 1000))}`);
    setPaymentModal(true);
  };

  const addNote = () => {
    if (!noteInput.trim()) {
      showToast('⚠️ Please enter a note.', 'warning');
      return;
    }
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10) + ' ' + now.toTimeString().slice(0, 5);
    setInstallments(installments.map(ins => {
      if (ins.id === targetId) {
        return {
          ...ins,
          notes: [...(ins.notes || []), { date: dateStr, text: noteInput.trim(), author: 'Staff' }]
        };
      }
      return ins;
    }));
    setNoteInput('');
    showToast('✅ Note added successfully!', 'success');
  };

  const addActionNote = (text) => {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10) + ' ' + now.toTimeString().slice(0, 5);
    setInstallments(installments.map(ins => {
      if (ins.id === targetId) {
        return { ...ins, notes: [...(ins.notes || []), { date: dateStr, text, author: 'Staff' }] };
      }
      return ins;
    }));
  };

  const callClient = () => {
    const target = installments.find(i => i.id === targetId);
    if (!target || !target.contactNumber) { showToast('⚠️ No contact number available.', 'warning'); return; }
    showToast(`📞 Calling ${target.contactNumber}...`, 'info');
    setTimeout(() => {
      showToast(`📞 Call ended. You spoke with ${target.client}.`, 'success');
      addActionNote('📞 Called client - discussed payment');
    }, 2000);
  };

  const smsClient = () => {
    const target = installments.find(i => i.id === targetId);
    if (!target || !target.contactNumber) { showToast('⚠️ No contact number available.', 'warning'); return; }
    showToast(`📱 Sending SMS to ${target.contactNumber}...`, 'info');
    setTimeout(() => {
      showToast(`📱 SMS sent to ${target.client}!`, 'success');
      addActionNote('📱 SMS reminder sent');
    }, 1500);
  };

  const sendReminder = () => {
    const target = installments.find(i => i.id === targetId);
    if (!target) return;
    showToast(`📧 Sending reminder to ${target.email || target.client}...`, 'info');
    setTimeout(() => {
      showToast(`📧 Reminder sent to ${target.client}!`, 'success');
      addActionNote('📧 Payment reminder sent');
    }, 1500);
  };

  const markContacted = () => {
    addActionNote('✅ Client contacted - followed up on payment');
    showToast('✅ Marked as contacted!', 'success');
  };

  const printStatement = () => {
    showToast('🖨️ Opening print dialog...', 'info');
    setTimeout(() => { window.print(); }, 500);
  };

  const confirmPayment = () => {
    const target = installments.find(i => i.id === targetId);
    if (!target) return;
    const amount = parseFloat(payAmount) || 0;
    
    if (amount <= 0) { showToast('⚠️ Please enter a valid amount.', 'warning'); return; }
    const balance = target.totalAmount - target.paid;
    if (amount > balance) { showToast(`⚠️ Amount exceeds outstanding balance of ₱${balance.toLocaleString()}.`, 'warning'); return; }

    const newPaid = target.paid + amount;
    const now = new Date();
    const noteDateStr = now.toISOString().slice(0, 10) + ' ' + now.toTimeString().slice(0, 5);

    let newStatus = target.status;
    let newDueDate = target.dueDate;
    if (newPaid >= target.totalAmount) {
      newStatus = 'paid';
      newDueDate = null;
    } else {
      newStatus = 'active';
      const lastDate = new Date(payDate);
      const diffDays = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));
      if (diffDays > 30) newStatus = 'overdue';
    }

    let newMonthsPaid = target.monthsPaid;
    if (target.monthlyAmount && target.totalMonths) {
      newMonthsPaid = Math.floor(newPaid / target.monthlyAmount);
      if (newMonthsPaid > target.totalMonths) newMonthsPaid = target.totalMonths;
    }

    setInstallments(installments.map(ins => {
      if (ins.id === targetId) {
        return {
          ...ins,
          paid: newPaid,
          status: newStatus,
          dueDate: newDueDate,
          lastPayment: payDate,
          monthsPaid: newMonthsPaid,
          payments: [...ins.payments, { date: payDate, amount, receipt: payReceipt }],
          notes: [...(ins.notes || []), { date: noteDateStr, text: `💰 Payment of ₱${amount.toLocaleString()} recorded (${payReceipt})`, author: 'Staff' }]
        };
      }
      return ins;
    }));

    setPaymentModal(false);
    showToast(`✅ Payment of ₱${amount.toLocaleString()} recorded for ${target.client}! Receipt: ${payReceipt}`, 'success');
    if (newPaid >= target.totalAmount) {
      setTimeout(() => showToast(`🎉 ${target.client}'s account is now fully paid!`, 'success'), 1000);
    }
  };

  const renderDetailsModal = () => {
    const target = installments.find(i => i.id === targetId);
    if (!target) return null;
    
    const balance = target.totalAmount - target.paid;
    const isOverdue = target.status === 'overdue';
    const isPaid = target.status === 'paid';
    const statusLabel = isPaid ? 'Fully Paid' : isOverdue ? 'Overdue' : 'Active';
    const statusClass = isPaid ? 'paid' : isOverdue ? 'overdue' : 'on-time';
    const graveClass = graveTypeColors[target.graveType] || '';
    const daysOverdue = getDaysOverdue(target);
    const overdueBadge = getOverdueBadge(daysOverdue);
    const percent = Math.round((target.paid / target.totalAmount) * 100);
    const progressClass = getProgressClass(percent);

    return (
      <div className="modal-overlay active" onClick={(e) => { if(e.target.className.includes('modal-overlay')) setDetailsModal(false); }}>
        <div className="modal" style={{ maxWidth: "600px" }}>
            <div className="modal-icon" style={{ color:"#3670AF" }}><i className="fas fa-user-circle"></i></div>
            <h3>Account Details - {target.client}</h3>
            <p className="modal-subtitle">{target.lot} · {target.id}</p>

            <div className="detail-grid">
                <div className="detail-item">
                    <div className="label">Client Name</div>
                    <div className="value">{target.client}</div>
                </div>
                <div className="detail-item">
                    <div className="label">📱 Contact</div>
                    <div className="value">
                        <span className="contact-row">
                            <span className="contact-value">{target.contactNumber || 'N/A'}</span>
                            <button className="btn-contact call" onClick={callClient}><i className="fas fa-phone"></i> Call</button>
                            <button className="btn-contact sms" onClick={smsClient}><i className="fas fa-sms"></i> SMS</button>
                        </span>
                    </div>
                </div>
                <div className="detail-item" style={{ gridColumn: "span 2" }}>
                    <div className="label">✉️ Email</div>
                    <div className="value" style={{ fontSize:"0.85rem" }}>{target.email || 'N/A'}</div>
                </div>
                <div className="detail-item" style={{ gridColumn: "span 2" }}>
                    <div className="label">📍 Address</div>
                    <div className="value" style={{ fontSize:"0.85rem" }}>{target.address || 'N/A'}</div>
                </div>
                <div className="detail-item">
                    <div className="label">Lot / Grave</div>
                    <div className="value">{target.lot}</div>
                </div>
                <div className="detail-item">
                    <div className="label">Grave Type</div>
                    <div className="value"><span className={`grave-badge ${graveClass}`}>{target.graveType}</span></div>
                </div>
                <div className="detail-item">
                    <div className="label">Account ID</div>
                    <div className="value" style={{ fontFamily:"'Courier New',monospace", fontSize:"0.85rem" }}>{target.id}</div>
                </div>
                <div className="detail-item">
                    <div className="label">Status</div>
                    <div className="value">
                        <span className={`status-badge ${statusClass}`}>{statusLabel}</span>
                        {!isPaid && daysOverdue > 0 && <span className={`overdue-badge ${overdueBadge.class}`} style={{ marginLeft: "6px" }}>{overdueBadge.label}</span>}
                    </div>
                </div>
                <div className="detail-item">
                    <div className="label">Due Date</div>
                    <div className="value">{target.dueDate ? formatDate(target.dueDate) : '—'}</div>
                </div>
                <div className="detail-item">
                    <div className="label">Days Overdue</div>
                    <div className="value" style={{ color: isPaid || daysOverdue === 0 ? "#27ae60" : (daysOverdue > 30 ? "#c0392b" : (daysOverdue > 15 ? "#f39c12" : "#e74c3c")) }}>
                        {isPaid ? '✅ Paid in full' : daysOverdue === 0 ? '✅ Current (no overdue)' : `${daysOverdue} days overdue`}
                    </div>
                </div>
                <div className="detail-item" style={{ gridColumn: "span 2" }}>
                    <div className="label">Payment Plan</div>
                    <div className="value">
                        {target.totalMonths ? `${target.monthlyAmount ? '₱' + target.monthlyAmount.toLocaleString() + '/mo' : ''} · ${target.monthsPaid || 0} of ${target.totalMonths} months (${Math.round((target.monthsPaid || 0) / target.totalMonths * 100)}%)` : '—'}
                    </div>
                </div>
                <div className="detail-item" style={{ gridColumn: "span 2" }}>
                    <div className="label">💰 Payment Summary</div>
                    <div className="value" style={{ fontSize:"0.9rem" }}>
                        <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:"0.2rem 1rem" }}>
                            <span>Total: <strong>₱{target.totalAmount.toLocaleString()}</strong></span>
                            <span>Paid: <strong style={{ color:"#27ae60" }}>₱{target.paid.toLocaleString()}</strong></span>
                            <span>Balance: <strong style={{ color: balance > 0 ? (isOverdue ? '#c0392b' : '#27ae60') : '#7a9fbe' }}>{balance > 0 ? `₱${balance.toLocaleString()}` : 'Fully Paid'}</strong></span>
                        </div>
                    </div>
                </div>
                <div className="detail-item" style={{ gridColumn: "span 2" }}>
                    <div className="label">Progress</div>
                    <div className="value">
                        <div className="progress-container">
                            <div className="progress-track">
                                <div className={`progress-fill ${progressClass}`} style={{ width: `${Math.min(percent, 100)}%` }}></div>
                            </div>
                            <div className="progress-label">
                                <span>{percent}%</span>
                                <span>{isPaid ? 'Complete' : (balance > 0 ? `₱${balance.toLocaleString()} remaining` : '')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="detail-payments">
                <div className="pay-title"><i className="fas fa-receipt" style={{ color:"#d4af37" }}></i> Payment History</div>
                <div>
                    {target.payments.length === 0 ? (
                        <div style={{ textAlign:"center", color:"#8aaccc", padding:"0.5rem 0", fontSize:"0.8rem" }}>No payments recorded yet.</div>
                    ) : (
                        target.payments.map((p, idx) => (
                            <div className="detail-payment-item" key={idx}>
                                <div><span className="dp-date">{formatDate(p.date)}</span> <span className="dp-receipt" style={{ marginLeft:"8px" }}>{p.receipt}</span></div>
                                <span className="dp-amount">₱{p.amount.toLocaleString()}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="notes-section">
                <div className="notes-title"><i className="fas fa-sticky-note"></i> Notes & Follow-ups</div>
                <div className="notes-list" id="notesList">
                    {(!target.notes || target.notes.length === 0) ? (
                        <div style={{ textAlign:"center", color:"#8aaccc", padding:"0.3rem 0", fontSize:"0.8rem" }}>No notes yet.</div>
                    ) : (
                        target.notes.map((n, idx) => (
                            <div className="note-item" key={idx}>
                                <span className="note-text">{n.text}</span>
                                <span className="note-meta">{n.date} · {n.author || 'Staff'}</span>
                            </div>
                        ))
                    )}
                </div>
                <div className="notes-input-row">
                    <input type="text" placeholder="Add a note..." value={noteInput} onChange={e => setNoteInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addNote()} />
                    <button className="btn-add-note" onClick={addNote}><i className="fas fa-plus"></i> Add</button>
                </div>
            </div>

            <div className="quick-actions-row">
                <button className="btn-quick print" onClick={printStatement}><i className="fas fa-print"></i> Print Statement</button>
                <button className="btn-quick reminder" onClick={sendReminder}><i className="fas fa-envelope"></i> Send Reminder</button>
                <button className="btn-quick contacted" onClick={markContacted}><i className="fas fa-check-circle"></i> Mark Contacted</button>
            </div>

            <div className="modal-actions">
                <button className="btn-cancel" onClick={() => setDetailsModal(false)}>Close</button>
                <button className="btn-confirm" onClick={() => setDetailsModal(false)}><i className="fas fa-check"></i> Done</button>
            </div>
        </div>
      </div>
    );
  };

  const renderHistoryModal = () => {
    const target = installments.find(i => i.id === targetId);
    if (!target) return null;
    return (
      <div className="modal-overlay active" onClick={(e) => { if(e.target.className.includes('modal-overlay')) setHistoryModal(false); }}>
        <div className="modal">
            <div className="modal-icon" style={{ color:"#3670AF" }}><i className="fas fa-history"></i></div>
            <h3>Payment History - {target.client}</h3>
            <p className="modal-subtitle">{target.lot} ({target.graveType}) · {target.id}</p>

            <div className="history-list">
                {target.payments.length === 0 ? (
                    <div className="history-empty">No payment records found.</div>
                ) : (
                    target.payments.map((p, idx) => (
                        <div className="history-item" key={idx}>
                            <div>
                                <div className="h-date">{formatDate(p.date)}</div>
                                <div className="h-receipt">{p.receipt}</div>
                            </div>
                            <div className="h-amount">₱{p.amount.toLocaleString()}</div>
                        </div>
                    ))
                )}
            </div>

            <div style={{ marginTop:"1rem", padding:"0.6rem 0.8rem", background:"#f8fafc", borderRadius:"8px", display:"flex", justifyContent:"space-between", fontSize:"0.85rem" }}>
                <span style={{ color:"#7a9fbe" }}>Total Paid</span>
                <span style={{ fontWeight:700, color:"#27ae60" }}>₱{target.paid.toLocaleString()}</span>
            </div>

            <div className="modal-actions">
                <button className="btn-cancel" onClick={() => setHistoryModal(false)}>Close</button>
            </div>
        </div>
      </div>
    );
  };

  const renderPaymentModal = () => {
    const target = installments.find(i => i.id === targetId);
    if (!target) return null;
    const balance = target.totalAmount - target.paid;
    const isValidAmount = (parseFloat(payAmount) > 0 && parseFloat(payAmount) <= balance);

    return (
      <div className="modal-overlay active" onClick={(e) => { if(e.target.className.includes('modal-overlay')) setPaymentModal(false); }}>
        <div className="modal">
            <div className="modal-icon" style={{ color:"#d4af37" }}><i className="fas fa-coins"></i></div>
            <h3>Record Payment</h3>
            <p className="modal-subtitle">Enter payment details for this installment</p>

            <div className="info-box">
                <div className="row"><span className="label">Client</span><span className="value">{target.client}</span></div>
                <div className="row"><span className="label">Lot</span><span className="value">{target.lot} ({target.graveType})</span></div>
                <div className="row"><span className="label">Outstanding Balance</span><span className="value negative">₱{balance.toLocaleString()}</span></div>
            </div>

            <div className="form-group">
                <label>Amount to Pay <span style={{ color:"#c0392b", fontSize:"0.7rem" }}>(Cash only)</span></label>
                <input type="number" placeholder="0.00" min="0" step="0.01" value={payAmount} onChange={e => setPayAmount(e.target.value)} />
            </div>

            <div className="form-group">
                <label>Payment Date</label>
                <input type="date" value={payDate} onChange={e => setPayDate(e.target.value)} />
            </div>

            <div className="form-group">
                <label>OR Number <span style={{ color:"#8aaccc", fontSize:"0.7rem" }}>(Auto-generated)</span></label>
                <input type="text" disabled style={{ fontFamily:"'Courier New',monospace" }} value={payReceipt} />
            </div>

            <div style={{ background:"#fef9e7", borderLeft:"3px solid #f39c12", padding:"0.4rem 0.8rem", borderRadius:"6px", fontSize:"0.7rem", color:"#7a9fbe", marginBottom:"0.5rem" }}>
                <i className="fas fa-info-circle" style={{ color:"#f39c12" }}></i> Cash payment only. Receipt will be generated after confirmation.
            </div>

            <div className="modal-actions">
                <button className="btn-cancel" onClick={() => setPaymentModal(false)}>Cancel</button>
                <button className="btn-confirm" disabled={!isValidAmount} onClick={confirmPayment}>
                    <i className="fas fa-check"></i> Record Payment
                </button>
            </div>
        </div>
      </div>
    );
  };

  return (
    <div className="main-content" style={{ padding: "0 1.5rem" }}>
      <Toast toast={toast} onClose={() => setToast(null)} />
      
      <StaffTopbar title="Installment Payment" greeting="Monitor outstanding balances and payment history" />

      <div className="tracking-container">
        
        <div className="stats-grid">
            <div className="stat-card">
                <div className="stat-icon gold"><i className="fas fa-coins"></i></div>
                <div className="stat-label">Total Outstanding</div>
                <div className="stat-value">₱{totalOutstanding.toLocaleString()}</div>
                <div className="stat-sub">Across all installment accounts</div>
            </div>
            <div className="stat-card">
                <div className="stat-icon red"><i className="fas fa-exclamation-triangle"></i></div>
                <div className="stat-label">Overdue Accounts</div>
                <div className="stat-value">{overdueCount}</div>
                <div className="stat-sub">Payments past due date</div>
            </div>
            <div className="stat-card">
                <div className="stat-icon blue"><i className="fas fa-clock"></i></div>
                <div className="stat-label">Active Installments</div>
                <div className="stat-value">{activeCount}</div>
                <div className="stat-sub">Currently on payment plan</div>
            </div>
        </div>

        <div className="search-bar">
            <div className="search-wrapper">
                <i className="fas fa-search search-icon"></i>
                <input type="text" placeholder="Search by client name, grave number, or ID..." value={searchTerm} onChange={handleSearch} />
                {searchTerm && <button className="clear-btn visible" onClick={handleClearSearch}><i className="fas fa-times"></i></button>}
            </div>
            <div className="filter-group">
                <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }}>
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="overdue">Overdue</option>
                    <option value="paid">Fully Paid</option>
                </select>
                <select value={graveTypeFilter} onChange={e => { setGraveTypeFilter(e.target.value); setCurrentPage(1); }}>
                    <option value="all">All Grave Types</option>
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

        <div className="account-list">
            {pageItems.length === 0 ? (
                <div className="empty-state">
                    <i className="fas fa-search"></i>
                    <p>No installment accounts found matching your criteria</p>
                </div>
            ) : (
                pageItems.map(ins => {
                    const balance = ins.totalAmount - ins.paid;
                    const isOverdue = ins.status === 'overdue';
                    const isPaid = ins.status === 'paid';
                    const statusLabel = isPaid ? 'Fully Paid' : isOverdue ? 'Overdue' : 'Active';
                    const statusClass = isPaid ? 'paid' : isOverdue ? 'overdue' : 'on-time';
                    const daysOverdue = getDaysOverdue(ins);
                    const overdueBadge = getOverdueBadge(daysOverdue);
                    const percent = Math.round((ins.paid / ins.totalAmount) * 100);
                    const progressClass = getProgressClass(percent);

                    return (
                        <div className="account-card" key={ins.id}>
                            <div className="account-info">
                                <div className="client-name">
                                    {ins.client}
                                    <span className={`status-badge ${statusClass}`}>{statusLabel}</span>
                                    {!isPaid && daysOverdue > 0 && <span className={`overdue-badge ${overdueBadge.class}`}>{overdueBadge.label}</span>}
                                    <span className={`grave-type ${isOverdue ? 'overdue' : isPaid ? 'paid' : ''}`}>{ins.graveType}</span>
                                </div>
                                <div className="details">
                                    <span>{ins.lot}</span>
                                    <span className="ins-id">{ins.id}</span>
                                    {ins.dueDate && <span>Due: {formatDate(ins.dueDate)}</span>}
                                    {ins.lastPayment && <span>Last: {formatDate(ins.lastPayment)}</span>}
                                </div>
                                <div className="progress-container" style={{ marginTop: "4px" }}>
                                    <div className="progress-track">
                                        <div className={`progress-fill ${progressClass}`} style={{ width: `${Math.min(percent, 100)}%` }}></div>
                                    </div>
                                    <div className="progress-label">
                                        <span>{percent}% paid</span>
                                        <span>{isPaid ? '✅ Complete' : (balance > 0 ? `₱${balance.toLocaleString()} remaining` : '')}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="account-balance">
                                <div className="paid">Paid: <strong>₱{ins.paid.toLocaleString()}</strong></div>
                                <div className={`balance ${balance > 0 ? (isOverdue ? 'negative' : 'positive') : 'zero'}`}>
                                    {balance > 0 ? `₱${balance.toLocaleString()}` : 'Fully Paid'}
                                </div>
                            </div>
                            <div className="account-actions">
                                <button className="btn-details" onClick={() => openDetails(ins.id)}><i className="fas fa-info-circle"></i> Details</button>
                                <button className="btn-history" onClick={() => openHistory(ins.id)}><i className="fas fa-history"></i> History</button>
                                {!isPaid && (
                                    <button className="btn-pay" onClick={() => openPayment(ins.id)}><i className="fas fa-coins"></i> Pay</button>
                                )}
                            </div>
                        </div>
                    );
                })
            )}
        </div>

        {totalPages > 0 && (
          <div className="pagination">
            <div className="pagination-info">Showing {start + 1} to {Math.min(start + rowsPerPage, filteredInstallments.length)} of {filteredInstallments.length} accounts</div>
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

      {detailsModal && renderDetailsModal()}
      {paymentModal && renderPaymentModal()}
      {historyModal && renderHistoryModal()}

    </div>
  );
}

export default InstallmentPayments;