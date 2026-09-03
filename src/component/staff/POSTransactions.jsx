import React, { useState, useEffect } from "react";
import "./pos-transactions.css";

const GRAVE_PRODUCTS = [
  { id: 'g1', name: 'Standard Lawn Lot', icon: 'fa-seedling', price: 85000, available: 42, type: 'lot' },
  { id: 'g2', name: 'Premium Lawn Lot', icon: 'fa-tree', price: 115000, available: 15, type: 'lot' },
  { id: 'g3', name: 'Mausoleum Space', icon: 'fa-place-of-worship', price: 350000, available: 4, type: 'lot' },
  { id: 'g4', name: 'Columbarium Niche', icon: 'fa-box', price: 65000, available: 89, type: 'lot' }
];

const WAKE_PRODUCTS = [
  { id: 'w1', name: 'Chapel A (Air-conditioned)', icon: 'fa-church', price: 8500, available: true, type: 'wake' },
  { id: 'w2', name: 'Chapel B (Air-conditioned)', icon: 'fa-church', price: 8000, available: true, type: 'wake' },
  { id: 'w3', name: 'Viewing Room 1', icon: 'fa-door-open', price: 5000, available: false, type: 'wake' },
  { id: 'w4', name: 'Outdoor Pavilion', icon: 'fa-campground', price: 4000, available: true, type: 'wake' }
];

const REQUIREMENTS = [
  { id: 'req1', label: 'Death Certificate', required: true },
  { id: 'req2', label: 'Valid ID of Client', required: true },
  { id: 'req3', label: 'Burial Permit', required: true },
  { id: 'req4', label: 'Proof of Relation', required: false }
];

function formatCurrency(amount) {
  return '₱' + Number(amount).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function generateReceiptId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'REC-';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function POSTransactions() {
  const [cart, setCart] = useState([]);
  const [clientName, setClientName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [burialType, setBurialType] = useState("actual");
  const [discountType, setDiscountType] = useState("none");
  const [amountTendered, setAmountTendered] = useState("");
  
  const [checklist, setChecklist] = useState(
    REQUIREMENTS.map(req => ({ ...req, checked: false }))
  );

  const [receipts, setReceipts] = useState([
    { id: 'REC-A8F9K2M1', client: 'Maria Santos', total: 85000, date: '2023-11-20', status: 'Paid' },
    { id: 'REC-X7P2N9L4', client: 'Jose Rizal', total: 65000, date: '2023-11-19', status: 'Paid' }
  ]);

  const [activeModal, setActiveModal] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toast, setToast] = useState(null);

  // Computed values
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let discount = 0;
  if (discountType === 'senior') discount = subtotal * 0.20;
  if (discountType === 'pwd') discount = subtotal * 0.20;
  const total = subtotal - discount;
  const change = Number(amountTendered) >= total ? Number(amountTendered) - total : 0;

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const addToCart = (product) => {
    if (product.type === 'lot') {
      setSelectedProduct(product);
      setActiveModal('addLot');
    } else {
      setSelectedProduct(product);
      setActiveModal('addWake');
    }
  };

  const confirmAddLot = (location) => {
    setCart([...cart, { ...selectedProduct, cartId: Date.now(), quantity: 1, location }]);
    setActiveModal(null);
    showToast(`${selectedProduct.name} added to cart`);
  };

  const confirmAddWake = (nights, dates) => {
    setCart([...cart, { ...selectedProduct, cartId: Date.now(), quantity: nights, dates }]);
    setActiveModal(null);
    showToast(`${selectedProduct.name} added to cart`);
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const toggleChecklist = (id) => {
    setChecklist(checklist.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const handleProcessPayment = () => {
    if (cart.length === 0) {
      showToast("Cart is empty", "error");
      return;
    }
    if (!clientName) {
      showToast("Please enter client name", "error");
      return;
    }
    if (burialType === 'actual') {
      const requiredMissing = checklist.some(req => req.required && !req.checked);
      if (requiredMissing) {
        showToast("Please complete all required documents", "error");
        return;
      }
    }
    if (Number(amountTendered) < total) {
      showToast("Amount tendered is insufficient", "error");
      return;
    }

    const newReceipt = {
      id: generateReceiptId(),
      client: clientName,
      total: total,
      date: new Date().toISOString().split('T')[0],
      status: 'Paid'
    };
    
    setReceipts([newReceipt, ...receipts]);
    setActiveModal('paymentSuccess');
  };

  const resetTransaction = () => {
    setCart([]);
    setClientName("");
    setPaymentMethod("cash");
    setBurialType("actual");
    setDiscountType("none");
    setAmountTendered("");
    setChecklist(REQUIREMENTS.map(req => ({ ...req, checked: false })));
    setActiveModal(null);
  };

  const checkedCount = checklist.filter(c => c.checked).length;
  const progressPercent = (checkedCount / checklist.length) * 100;

  return (
    <div className="pos-page-wrapper">
      {/* Topbar */}
      <div className="topbar">
        <div className="topbar-left">
          <h1>POS Transactions <span>• Staff</span></h1>
          <div className="greeting">Good day! Ready to process new transactions.</div>
        </div>
        <div className="topbar-right">
          <div className="date-badge">
            <i className="fas fa-calendar-alt"></i> {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <button className="notification-btn"><i className="fas fa-bell"></i></button>
        </div>
      </div>

      <div className="pos-container">
        <div className="pos-header">
          <div className="pos-header-left">
            <h2>New Transaction</h2>
            <p>Process grave lot sales and wake space rentals</p>
          </div>
          <div className="pos-header-right">
            <button className="btn-secondary" onClick={resetTransaction}><i className="fas fa-redo"></i> Reset</button>
            <button className="btn-primary" onClick={() => window.print()}><i className="fas fa-print"></i> Print View</button>
          </div>
        </div>

        <div className="pos-two-col">
          {/* Left Panel */}
          <div className="left-panel">
            {/* Lots */}
            <div className="product-list-section">
              <div className="section-title"><i className="fas fa-layer-group"></i> Grave Lots & Spaces</div>
              <table className="product-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {GRAVE_PRODUCTS.map(p => (
                    <tr key={p.id}>
                      <td className="product-name-cell"><i className={`fas ${p.icon}`}></i> {p.name}</td>
                      <td className="product-price-cell">{formatCurrency(p.price)}</td>
                      <td className={`product-avail-cell ${p.available > 0 ? 'available' : 'sold-out'}`}>
                        {p.available > 0 ? `${p.available} Available` : 'Sold Out'}
                      </td>
                      <td>
                        <button className="btn-add-sm" disabled={p.available === 0} onClick={() => addToCart(p)}>Add</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Wake */}
            <div className="wake-separator">
              <div className="line"></div>
              <span>Wake Space Rentals</span>
              <div className="line"></div>
            </div>

            <div className="product-list-section">
              {WAKE_PRODUCTS.map(w => (
                <div className="wake-product-row" key={w.id}>
                  <div className="wake-info">
                    <i className={`fas ${w.icon}`}></i>
                    <div>
                      <div className="wake-name">{w.name}</div>
                      <div className="wake-price">{formatCurrency(w.price)} / night</div>
                    </div>
                  </div>
                  <div className={`wake-avail ${w.available ? 'available' : 'sold-out'}`}>
                    {w.available ? 'Available' : 'Occupied'}
                  </div>
                  <button className="btn-add-sm" disabled={!w.available} onClick={() => addToCart(w)}>Select</button>
                </div>
              ))}
            </div>

            {/* Cart */}
            <div className="cart-section">
              <div className="cart-title">
                <span><i className="fas fa-shopping-cart"></i> Current Items</span>
                <span style={{color: '#3670AF'}}>{cart.length} item(s)</span>
              </div>
              
              {cart.length === 0 ? (
                <div className="empty-msg">No items in cart. Select products above to add.</div>
              ) : (
                <table className="cart-items-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Qty</th>
                      <th>Amount</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map(item => (
                      <tr key={item.cartId}>
                        <td>
                          <div style={{fontWeight: 600, color: '#1a3d5c'}}>{item.name}</div>
                          {item.location && <div className="cart-location"><i className="fas fa-map-marker-alt"></i> {item.location}</div>}
                          {item.dates && <div className="cart-location"><i className="fas fa-calendar"></i> {item.dates}</div>}
                        </td>
                        <td>{item.quantity}</td>
                        <td style={{fontWeight: 600}}>{formatCurrency(item.price * item.quantity)}</td>
                        <td><button className="btn-remove" onClick={() => removeFromCart(item.cartId)}><i className="fas fa-times"></i></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Right Panel */}
          <div className="right-panel">
            <div className="panel-box">
              <div className="client-payment-row">
                <div className="form-group">
                  <label>Client / Buyer Name</label>
                  <input type="text" value={clientName} onChange={e => setClientName(e.target.value)} placeholder="Enter full name" />
                </div>
                <div className="form-group">
                  <label>Payment Method</label>
                  <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
                    <option value="cash">Cash</option>
                    <option value="card">Credit/Debit Card</option>
                    <option value="check">Manager's Check</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="gcash">GCash / PayMaya</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="panel-box">
              <div className="burial-type-group">
                <label>
                  <input type="radio" name="btype" checked={burialType === 'actual'} onChange={() => setBurialType('actual')} /> Actual Burial (Immediate)
                </label>
                <label>
                  <input type="radio" name="btype" checked={burialType === 'preneed'} onChange={() => setBurialType('preneed')} /> Pre-need (Future Use)
                </label>
              </div>

              {burialType === 'actual' && (
                <div className="checklist-section" style={{marginTop: '1rem'}}>
                  <div className="checklist-title">
                    <i className="fas fa-clipboard-check"></i> Document Requirements
                  </div>
                  <div className="checklist-grid">
                    {checklist.map(req => (
                      <label className="checklist-item" key={req.id}>
                        <input type="checkbox" checked={req.checked} onChange={() => toggleChecklist(req.id)} />
                        {req.label} {req.required && <span className="required">*</span>}
                      </label>
                    ))}
                  </div>
                  <div className="checklist-progress">
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <span>Completion</span>
                      <span>{Math.round(progressPercent)}%</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-bar" style={{width: `${progressPercent}%`}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="panel-box">
              <div className="discount-plan-row">
                <div className="form-group">
                  <label>Discount</label>
                  <select value={discountType} onChange={e => setDiscountType(e.target.value)}>
                    <option value="none">No Discount</option>
                    <option value="senior">Senior Citizen (20%)</option>
                    <option value="pwd">PWD (20%)</option>
                    <option value="promo">Promo Code</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="panel-box" style={{background: '#fff', borderColor: '#dce3ec'}}>
              <div className="summary-line">
                <span className="label">Subtotal</span>
                <span className="value">{formatCurrency(subtotal)}</span>
              </div>
              <div className="summary-line" style={{color: '#c0392b'}}>
                <span className="label">Discount</span>
                <span className="value">- {formatCurrency(discount)}</span>
              </div>
              <div className="summary-line total">
                <span className="label">Amount Due</span>
                <span className="value" style={{color: '#3670AF'}}>{formatCurrency(total)}</span>
              </div>

              <div className="form-group" style={{marginTop: '1rem'}}>
                <label>Amount Tendered</label>
                <input 
                  type="number" 
                  value={amountTendered} 
                  onChange={e => setAmountTendered(e.target.value)}
                  style={{fontSize: '1.2rem', fontWeight: 'bold'}}
                />
              </div>

              <div style={{marginTop: '0.8rem'}}>
                <div style={{fontSize: '0.75rem', color: '#6a8aaa', marginBottom: '0.2rem'}}>Change</div>
                <div className="change-display">{formatCurrency(change)}</div>
              </div>

              <button className="btn-process" onClick={handleProcessPayment} disabled={cart.length === 0 || Number(amountTendered) < total}>
                <i className="fas fa-check-circle"></i> Complete Transaction
              </button>
            </div>
          </div>
        </div>

        <div className="receipts-section">
          <h3>Recent Transactions</h3>
          <table className="receipts-table">
            <thead>
              <tr>
                <th>Receipt ID</th>
                <th>Client Name</th>
                <th>Total Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {receipts.map(r => (
                <tr key={r.id}>
                  <td style={{fontWeight: 600, color: '#3670AF'}}>{r.id}</td>
                  <td>{r.client}</td>
                  <td style={{fontWeight: 600}}>{formatCurrency(r.total)}</td>
                  <td>{r.date}</td>
                  <td><span style={{color: '#27ae60', background: '#eafaf1', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem'}}>{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'addLot' && (
        <div className="pos-modal-overlay">
          <div className="pos-modal">
            <div className="modal-icon" style={{color: '#d4af37'}}><i className={`fas ${selectedProduct?.icon}`}></i></div>
            <h3>Select Location for {selectedProduct?.name}</h3>
            <p className="modal-subtitle">Choose from available blocks and lots</p>
            
            <div className="location-grid">
              <div className="location-option" onClick={() => confirmAddLot('Block 1, Lot 4')}>
                <span className="loc-id">B1-L4</span>
                <span className="loc-status available">Available</span>
              </div>
              <div className="location-option" onClick={() => confirmAddLot('Block 1, Lot 5')}>
                <span className="loc-id">B1-L5</span>
                <span className="loc-status available">Available</span>
              </div>
              <div className="location-option" onClick={() => confirmAddLot('Block 2, Lot 12')}>
                <span className="loc-id">B2-L12</span>
                <span className="loc-status available">Available</span>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setActiveModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'addWake' && (
        <div className="pos-modal-overlay">
          <div className="pos-modal">
            <div className="modal-icon" style={{color: '#3670AF'}}><i className={`fas ${selectedProduct?.icon}`}></i></div>
            <h3>Book {selectedProduct?.name}</h3>
            <p className="modal-subtitle">Specify number of nights and dates</p>
            
            <div className="wake-nights-control">
              <label style={{fontWeight: 600, fontSize: '0.9rem', color: '#1a3d5c'}}>Number of Nights:</label>
              <input type="number" id="wakeNightsInput" defaultValue={3} min="1" max="14" style={{width: '60px', padding: '0.4rem', borderRadius: '6px', border: '1px solid #dce3ec'}} />
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setActiveModal(null)}>Cancel</button>
              <button className="btn-confirm" onClick={() => confirmAddWake(parseInt(document.getElementById('wakeNightsInput').value) || 1, 'TBD')}>Add to Cart</button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'paymentSuccess' && (
        <div className="pos-modal-overlay">
          <div className="pos-modal" style={{textAlign: 'center'}}>
            <div className="modal-icon" style={{color: '#27ae60', fontSize: '4rem'}}><i className="fas fa-check-circle"></i></div>
            <h3>Transaction Successful!</h3>
            <p className="modal-subtitle">Receipt has been generated and saved.</p>
            
            <div style={{background: '#f8fafc', padding: '1rem', borderRadius: '12px', margin: '1.5rem 0'}}>
              <div style={{fontSize: '0.85rem', color: '#6a8aaa'}}>Amount Paid</div>
              <div style={{fontSize: '1.8rem', fontWeight: 'bold', color: '#1a3d5c'}}>{formatCurrency(total)}</div>
              <div style={{fontSize: '0.85rem', color: '#6a8aaa', marginTop: '0.5rem'}}>Change</div>
              <div style={{fontSize: '1.2rem', fontWeight: 'bold', color: '#27ae60'}}>{formatCurrency(change)}</div>
            </div>

            <div className="modal-actions" style={{justifyContent: 'center'}}>
              <button className="btn-cancel" onClick={resetTransaction}>New Transaction</button>
              <button className="btn-confirm" onClick={() => window.print()}><i className="fas fa-print"></i> Print Receipt</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`pos-toast ${toast.type}`}>
          <i className={toast.type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'}></i>
          {toast.message}
        </div>
      )}
    </div>
  );
}