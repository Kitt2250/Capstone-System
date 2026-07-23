import { useState } from "react";
import "./pos-transactions.css";

const LOT_TYPES = [
  { key: "ground",    label: "Ground Burial Lot", price: 85000 },
  { key: "apartment", label: "Apartment Niche",   price: 120000 },
  { key: "mausoleum", label: "Mausoleum",         price: 350000 },
  { key: "bonevault", label: "Bone Vault",        price: 45000 },
];

const WAKE_VENUES = [
  { name: "Chapel A",      rate: 8000 },
  { name: "Chapel B",      rate: 8000 },
  { name: "Open Pavilion", rate: 5000 },
  { name: "Function Hall", rate: 12000 },
];

const WEEKLY_SALES = {
  lotSales: 860000,
  wakeSpace: 111000,
  total: 971000,
  chart: [
    { label: "Mon", lotSales: 90000,  wakeSpace: 20000 },
    { label: "Tue", lotSales: 70000,  wakeSpace: 15000 },
    { label: "Wed", lotSales: 140000, wakeSpace: 25000 },
    { label: "Thu", lotSales: 100000, wakeSpace: 18000 },
    { label: "Fri", lotSales: 170000, wakeSpace: 22000 },
    { label: "Sat", lotSales: 55000,  wakeSpace: 8000 },
    { label: "Sun", lotSales: 40000,  wakeSpace: 3000 },
  ],
};

const MONTHLY_SALES = {
  lotSales: 2542500,
  wakeSpace: 602000,
  total: 3144500,
  chart: [
    { label: "Jan", lotSales: 300000, wakeSpace: 90000 },
    { label: "Feb", lotSales: 280000, wakeSpace: 85000 },
    { label: "Mar", lotSales: 380000, wakeSpace: 100000 },
    { label: "Apr", lotSales: 350000, wakeSpace: 95000 },
    { label: "May", lotSales: 390000, wakeSpace: 110000 },
    { label: "Jun", lotSales: 400000, wakeSpace: 120000 },
  ],
};

const INITIAL_RECEIPTS = [
  { receiptNo: "OR-2026-0342", client: "Rosa Mendoza", items: "Installment Payment - Lot B-098", amount: 15000, date: "2026-03-15" },
  { receiptNo: "OR-2026-0341", client: "Pedro Garcia",  items: "Ground Burial Lot - A-201",        amount: 85000, date: "2026-03-15" },
  { receiptNo: "OR-2026-0340", client: "Elena Santos",  items: "Installment Payment - Lot C-130",  amount: 10000, date: "2026-03-14" },
  { receiptNo: "OR-2026-0339", client: "Roberto Lim",   items: "Bone Vault - D-014",                amount: 45000, date: "2026-03-14" },
  { receiptNo: "OR-2026-0338", client: "Maria Cruz",    items: "Apartment Niche - B-047",           amount: 30000, date: "2026-03-13" },
];

const peso = (n) => "₱" + Number(n || 0).toLocaleString("en-PH");

function CartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function WakeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ReceiptIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function PrintIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  );
}

function BarChart({ data }) {
  const maxVal = Math.max(...data.flatMap((d) => [d.lotSales, d.wakeSpace]));
  const niceMax = Math.ceil(maxVal / 55000) * 55000 || 220000;
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(niceMax * f));

  return (
    <div className="pos-barchart">
      <div className="pos-barchart-yaxis">
        {yTicks.slice().reverse().map((tick, i) => (
          <span key={i}>₱{tick >= 1000 ? `${Math.round(tick / 1000)}k` : tick}</span>
        ))}
      </div>
      <div className="pos-barchart-body">
        {data.map((d) => (
          <div className="pos-bar-group" key={d.label}>
            <div className="pos-bar-track">
              <div className="pos-bar pos-bar--sales" style={{ height: `${(d.lotSales / niceMax) * 100}%` }} title={`Lot Sales: ${peso(d.lotSales)}`} />
              <div className="pos-bar pos-bar--wake" style={{ height: `${(d.wakeSpace / niceMax) * 100}%` }} title={`Wake Space: ${peso(d.wakeSpace)}`} />
            </div>
            <span className="pos-bar-label">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function generateAccountCreds() {
  const num = String(Math.floor(Math.random() * 900) + 100);
  const email = `${num}cherubim@gmail.com`;
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  let pw = "Px";
  for (let i = 0; i < 4; i++) pw += chars[Math.floor(Math.random() * chars.length)];
  pw += Math.floor(Math.random() * 9000 + 1000);
  return { email, password: pw };
}

function POSTransactions() {
  const [period, setPeriod] = useState("weekly");

  const [cartItems, setCartItems] = useState([]);
  const [clientName, setClientName] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [section, setSection] = useState("");
  const [block, setBlock] = useState("");

  const [wakeVenue, setWakeVenue] = useState("");
  const [wakeNights, setWakeNights] = useState(1);

  const [receipts, setReceipts] = useState(INITIAL_RECEIPTS);
  const [receiptModal, setReceiptModal] = useState(null);

  const salesData = period === "weekly" ? WEEKLY_SALES : MONTHLY_SALES;

  const hasLotItem = cartItems.some((i) => i.type === "lot");
  const total = cartItems.reduce((sum, i) => sum + i.price, 0);

  const wakeRate = wakeVenue ? WAKE_VENUES.find((v) => v.name === wakeVenue)?.rate || 8000 : 8000;
  const wakePreview = wakeRate * (Number(wakeNights) || 1);

  const addLot = (lot) => {
    setCartItems((prev) => [
      ...prev,
      { id: `${lot.key}-${Date.now()}`, label: lot.label, price: lot.price, type: "lot" },
    ]);
  };

  const addWake = () => {
    if (!wakeVenue) return;
    const nights = Number(wakeNights) || 1;
    const rate = WAKE_VENUES.find((v) => v.name === wakeVenue)?.rate || 8000;
    setCartItems((prev) => [
      ...prev,
      {
        id: `wake-${Date.now()}`,
        label: `Wake Space - ${wakeVenue} (${nights} night${nights > 1 ? "s" : ""})`,
        price: rate * nights,
        type: "wake",
      },
    ]);
    setWakeVenue("");
    setWakeNights(1);
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const resetTransaction = () => {
    setCartItems([]);
    setClientName("");
    setPaymentType("");
    setSection("");
    setBlock("");
  };

  const handleProcessPayment = () => {
    if (cartItems.length === 0 || !clientName.trim()) return;

    const receiptNo = `OR-2026-${String(360 + receipts.length).padStart(4, "0")}`;
    const creds = generateAccountCreds();
    const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "numeric", day: "numeric" });

    const newReceipt = {
      receiptNo,
      client: clientName,
      date: today,
      payment: paymentType || "Cash",
      email: creds.email,
      password: creds.password,
      items: cartItems,
      total,
    };

    setReceiptModal(newReceipt);

    setReceipts((prev) => [
      {
        receiptNo,
        client: clientName,
        items: cartItems.map((i) => i.label).join(", "),
        amount: total,
        date: today,
      },
      ...prev,
    ]);
  };

  const closeReceiptModal = () => {
    setReceiptModal(null);
    resetTransaction();
  };

  return (
    <div className="pos-page">
      <div className="pos-topbar">
        <span>Cherubim of Heaven Memorial Park</span>
      </div>

      <div className="pos-header">
        <h1>POS Transactions</h1>
        <p>Process grave lot sales, wake space rentals, and payments</p>
      </div>

      <div className="pos-layout">
        {/* LEFT COLUMN */}
        <div className="pos-main-col">
          {/* Grave Lot Types */}
          <div className="pos-card">
            <div className="pos-card-heading">
              <CartIcon /> Grave Lot Types
            </div>
            <div className="pos-lot-grid">
              {LOT_TYPES.map((lot) => (
                <button key={lot.key} className="pos-lot-btn" onClick={() => addLot(lot)}>
                  <div>
                    <p className="pos-lot-name">{lot.label}</p>
                    <p className="pos-lot-hint">Click to add</p>
                  </div>
                  <div className="pos-lot-right">
                    <span className="pos-lot-price">{peso(lot.price)}</span>
                    <span className="pos-lot-plus"><PlusIcon /></span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Wake Space Rental */}
          <div className="pos-card">
            <div className="pos-card-heading">
              <WakeIcon /> Wake Space Rental
            </div>
            <div className="pos-wake-row">
              <div className="pos-wake-field pos-wake-field--venue">
                <label>Venue</label>
                <select value={wakeVenue} onChange={(e) => setWakeVenue(e.target.value)}>
                  <option value="">Select venue</option>
                  {WAKE_VENUES.map((v) => (
                    <option key={v.name} value={v.name}>{v.name}</option>
                  ))}
                </select>
              </div>
              <div className="pos-wake-field pos-wake-field--nights">
                <label>Nights</label>
                <input
                  type="number"
                  min="1"
                  value={wakeNights}
                  onChange={(e) => setWakeNights(e.target.value)}
                />
              </div>
              <button className="pos-wake-add-btn" onClick={addWake}>
                <PlusIcon /> Add {peso(wakePreview)}
              </button>
            </div>
            <p className="pos-wake-note">Total auto-computed as rate × number of nights</p>
          </div>

          {/* Sales Report */}
          <div className="pos-card">
            <div className="pos-card-heading-row">
              <div className="pos-card-heading">
                <ChartIcon /> Sales Report
              </div>
              <div className="pos-period-toggle">
                <button
                  className={`pos-period-btn ${period === "weekly" ? "pos-period-active" : ""}`}
                  onClick={() => setPeriod("weekly")}
                >
                  Weekly
                </button>
                <button
                  className={`pos-period-btn ${period === "monthly" ? "pos-period-active" : ""}`}
                  onClick={() => setPeriod("monthly")}
                >
                  Monthly
                </button>
              </div>
            </div>

            <div className="pos-sales-stats">
              <div className="pos-sales-stat">
                <span className="pos-sales-label">Lot Sales</span>
                <span className="pos-sales-value">{peso(salesData.lotSales)}</span>
              </div>
              <div className="pos-sales-stat">
                <span className="pos-sales-label">Wake Space</span>
                <span className="pos-sales-value">{peso(salesData.wakeSpace)}</span>
              </div>
              <div className="pos-sales-stat pos-sales-stat--total">
                <span className="pos-sales-label">Total</span>
                <span className="pos-sales-value">{peso(salesData.total)}</span>
              </div>
            </div>

            <BarChart data={salesData.chart} />
            <div className="pos-bar-legend">
              <div className="pos-legend-item">
                <span className="pos-legend-dot" style={{ background: "#111827" }} />
                Lot Sales
              </div>
              <div className="pos-legend-item">
                <span className="pos-legend-dot" style={{ background: "#d1d5db" }} />
                Wake Space
              </div>
            </div>
          </div>

          {/* Recent Receipts */}
          <div className="pos-card">
            <div className="pos-card-heading">
              <ReceiptIcon /> Recent Receipts
            </div>
            <div className="pos-table-wrap">
              <table className="pos-table">
                <thead>
                  <tr>
                    <th>Receipt No.</th>
                    <th>Client</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {receipts.map((r) => (
                    <tr key={r.receiptNo}>
                      <td className="pos-td-receipt">{r.receiptNo}</td>
                      <td className="pos-td-client">{r.client}</td>
                      <td className="pos-td-items">{r.items}</td>
                      <td className="pos-td-amount">{peso(r.amount)}</td>
                      <td>{r.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — Current Transaction */}
        <div className="pos-side-col">
          <div className="pos-transaction-card">
            <div className="pos-card-heading">
              <CartIcon /> Current Transaction
            </div>

            {hasLotItem && (
              <div className="pos-form-row">
                <div className="pos-form-group">
                  <label>Section</label>
                  <input type="text" value={section} onChange={(e) => setSection(e.target.value)} />
                </div>
                <div className="pos-form-group">
                  <label>Block</label>
                  <input type="text" value={block} onChange={(e) => setBlock(e.target.value)} />
                </div>
              </div>
            )}

            <div className="pos-form-group">
              <label>Client Name</label>
              <input
                type="text"
                placeholder="Enter client name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
            </div>

            <div className="pos-form-group">
              <label>Payment Type</label>
              <select value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
                <option value="">Select payment type</option>
                <option value="Cash">Cash</option>
                <option value="Installment">Installment</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="GCash">GCash</option>
              </select>
            </div>

            <div className="pos-items-section">
              <p className="pos-items-label">Items</p>
              {cartItems.length === 0 ? (
                <p className="pos-items-empty">No items added</p>
              ) : (
                <div className="pos-items-list">
                  {cartItems.map((item) => (
                    <div className="pos-item-row" key={item.id}>
                      <span className="pos-item-name">{item.label}</span>
                      <span className="pos-item-price">{peso(item.price)}</span>
                      <button className="pos-item-remove" onClick={() => removeItem(item.id)}>
                        <CloseIcon />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pos-total-row">
              <span>Total</span>
              <span className="pos-total-value">{peso(total)}</span>
            </div>

            {cartItems.length === 0 && (
              <>
                <div className="pos-form-group">
                  <label>Amount Tendered</label>
                  <input type="text" value="₱0" disabled />
                </div>
                <div className="pos-change-row">
                  <span>Change</span>
                  <span className="pos-change-value">₱0</span>
                </div>
              </>
            )}

            <button
              className="pos-process-btn"
              disabled={cartItems.length === 0 || !clientName.trim()}
              onClick={handleProcessPayment}
            >
              Process Payment
            </button>
          </div>
        </div>
      </div>

      {/* Receipt Modal */}
      {receiptModal && (
        <div className="pos-overlay" onClick={closeReceiptModal}>
          <div className="pos-receipt-modal" onClick={(e) => e.stopPropagation()}>
            <div className="pos-receipt-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <h2 className="pos-receipt-title">Official Receipt</h2>
            <p className="pos-receipt-no">{receiptModal.receiptNo}</p>
            <p className="pos-receipt-org">Cherubim of Heaven Memorial Park</p>
            <p className="pos-receipt-addr">Hagonoy, Bulacan</p>

            <div className="pos-receipt-info">
              <div className="pos-receipt-info-row">
                <span>Client:</span>
                <span>{receiptModal.client}</span>
              </div>
              <div className="pos-receipt-info-row">
                <span>Date:</span>
                <span>{receiptModal.date}</span>
              </div>
              <div className="pos-receipt-info-row">
                <span>Payment:</span>
                <span>{receiptModal.payment}</span>
              </div>
              <div className="pos-receipt-info-row">
                <span>Email:</span>
                <span>{receiptModal.email}</span>
              </div>
              <div className="pos-receipt-info-row">
                <span>Password:</span>
                <span>{receiptModal.password}</span>
              </div>
            </div>

            <div className="pos-receipt-items">
              {receiptModal.items.map((item) => (
                <div className="pos-receipt-item-row" key={item.id}>
                  <span>{item.label}</span>
                  <span>{peso(item.price)}</span>
                </div>
              ))}
            </div>

            <div className="pos-receipt-total-row">
              <span>Total:</span>
              <span>{peso(receiptModal.total)}</span>
            </div>

            <div className="pos-receipt-actions">
              <button className="pos-btn-secondary" onClick={closeReceiptModal}>Close</button>
              <button className="pos-btn-primary" onClick={() => window.print()}>
                <PrintIcon /> Print
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default POSTransactions;