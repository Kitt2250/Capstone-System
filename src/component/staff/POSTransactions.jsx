import StaffTopbar from './StaffTopbar';
import { useState, useEffect, useMemo } from 'react';
import './pos-transactions.css';

// ================================================================
// 1. PRODUCT DATA & CONSTANTS
// ================================================================
const PRODUCTS = {
    'Single Niche': {
        price: 150000, icon: 'fa-crown', desc: '1x3 sqm, 2 vaults', category: 'lot',
        dpPercent: 50, monthly: 6250, intermentFresh: 25000, intermentBones: 23000,
        intermentLabel: 'Actual Price', available: true, availableSlots: 45,
        staggeredAllowed: 'both', availableForActual: true,
        locations: [
            { id: 'SN-001', block: 'A', zone: 'Zone 1', level: 'Ground', status: 'Available' },
            { id: 'SN-002', block: 'A', zone: 'Zone 1', level: 'Ground', status: 'Available' },
            { id: 'SN-003', block: 'A', zone: 'Zone 2', level: 'Ground', status: 'Available' },
            { id: 'SN-004', block: 'B', zone: 'Zone 1', level: 'Ground', status: 'Occupied' },
            { id: 'SN-005', block: 'B', zone: 'Zone 1', level: 'Ground', status: 'Available' },
        ]
    },
    'Mausoleum': {
        price: 1380000, icon: 'fa-landmark', desc: '5x5 sqm, premium', category: 'lot',
        dpPercent: 0, monthly: 0, intermentFresh: 20, intermentBones: 10,
        intermentLabel: '\\u26a0\\ufe0f Mock Price', available: true, availableSlots: 12,
        staggeredAllowed: 'none', availableForActual: true,
        locations: [
            { id: 'MS-001', block: 'C', zone: 'Zone 1', level: 'Ground', status: 'Available' },
            { id: 'MS-002', block: 'C', zone: 'Zone 1', level: 'Ground', status: 'Reserved' },
            { id: 'MS-003', block: 'C', zone: 'Zone 2', level: 'Ground', status: 'Available' },
        ]
    },
    'Columbarium': {
        price: 80000, icon: 'fa-dove', desc: 'Urn niche, 20-yr renewable', category: 'lot',
        dpPercent: 0, monthly: 0, intermentFresh: 10000, intermentBones: 0,
        intermentLabel: 'Actual Price', available: true, availableSlots: 38,
        staggeredAllowed: 'none', availableForActual: true,
        locations: [
            { id: 'CL-001', block: 'D', zone: 'Zone 1', level: '1st Floor', status: 'Available' },
            { id: 'CL-002', block: 'D', zone: 'Zone 1', level: '1st Floor', status: 'Available' },
            { id: 'CL-003', block: 'D', zone: 'Zone 1', level: '2nd Floor', status: 'Available' },
            { id: 'CL-004', block: 'D', zone: 'Zone 2', level: '1st Floor', status: 'Occupied' },
            { id: 'CL-005', block: 'D', zone: 'Zone 2', level: '2nd Floor', status: 'Available' },
        ]
    },
    'Apartment': {
        price: 38000, icon: 'fa-building', desc: '3 cum, 7-yr renewable', category: 'lot',
        dpPercent: 0, monthly: 0, intermentFresh: 20, intermentBones: 10,
        intermentLabel: '\\u26a0\\ufe0f Mock Price', available: true, availableSlots: 56,
        staggeredAllowed: 'none', availableForActual: true,
        locations: [
            { id: 'AP-001', block: 'E', zone: 'Zone 1', level: '1st Floor', status: 'Available' },
            { id: 'AP-002', block: 'E', zone: 'Zone 1', level: '2nd Floor', status: 'Available' },
            { id: 'AP-003', block: 'E', zone: 'Zone 2', level: '1st Floor', status: 'Available' },
            { id: 'AP-004', block: 'E', zone: 'Zone 2', level: '2nd Floor', status: 'Occupied' },
            { id: 'AP-005', block: 'F', zone: 'Zone 1', level: '1st Floor', status: 'Available' },
            { id: 'AP-006', block: 'F', zone: 'Zone 1', level: '2nd Floor', status: 'Available' },
        ]
    },
    'Bonevault': {
        price: 30000, icon: 'fa-box', desc: 'Bone storage, 10-yr renewable', category: 'lot',
        dpPercent: 0, monthly: 0, intermentFresh: 20, intermentBones: 10,
        intermentLabel: '\\u26a0\\ufe0f Mock Price', available: true, availableSlots: 72,
        staggeredAllowed: 'none', availableForActual: true,
        locations: [
            { id: 'BV-001', block: 'G', zone: 'Zone 1', level: 'Ground', status: 'Available' },
            { id: 'BV-002', block: 'G', zone: 'Zone 1', level: 'Ground', status: 'Available' },
            { id: 'BV-003', block: 'G', zone: 'Zone 2', level: 'Ground', status: 'Available' },
            { id: 'BV-004', block: 'G', zone: 'Zone 2', level: 'Ground', status: 'Occupied' },
            { id: 'BV-005', block: 'H', zone: 'Zone 1', level: 'Ground', status: 'Available' },
        ]
    },
    'Garden Type': {
        price: 560000, icon: 'fa-tree', desc: '16 sqm, 4 vaults', category: 'lot',
        dpPercent: 10, monthly: 42000, intermentFresh: 16000, intermentBones: 0,
        intermentLabel: 'Actual Price', available: false, availableSlots: 0,
        staggeredAllowed: 'preneed', availableForActual: true,
        locations: [
            { id: 'GT-001', block: 'I', zone: 'Zone 1', level: 'Ground', status: 'Occupied' },
            { id: 'GT-002', block: 'I', zone: 'Zone 1', level: 'Ground', status: 'Occupied' },
        ]
    },
    'Heroes Buried': {
        price: 387000, icon: 'fa-medal', desc: '7.84 sqm, heroes section', category: 'lot',
        dpPercent: 10, monthly: 29025, intermentFresh: 16000, intermentBones: 14000,
        intermentLabel: 'Actual Price', available: false, availableSlots: 0,
        staggeredAllowed: 'preneed', availableForActual: false,
        locations: [
            { id: 'HB-001', block: 'J', zone: 'Zone 1', level: 'Ground', status: 'Occupied' },
            { id: 'HB-002', block: 'J', zone: 'Zone 1', level: 'Ground', status: 'Occupied' },
        ]
    },
    'Wake Space': {
        price: 1500, icon: 'fa-bed', desc: 'Per night', category: 'wake',
        dpPercent: 0, monthly: 0, intermentFresh: 0, intermentBones: 0,
        intermentLabel: '', available: true, availableSlots: 1,
        staggeredAllowed: 'none', availableForActual: true, locations: []
    }
};

const INITIAL_OCCUPIED_WAKE_DATES = [
    { checkin: '2026-08-20', checkout: '2026-08-22' },
    { checkin: '2026-08-25', checkout: '2026-08-27' }
];

const MOCK_CLIENTS = [
    { name: 'Maria Santos', contact: '0917-123-4567', email: 'maria@email.com', relationship: 'Spouse', deceased: 'Juan Dela Cruz', dob: '1950-01-15', dod: '2026-08-19' },
    { name: 'Pedro Garcia', contact: '0918-234-5678', email: 'pedro@email.com', relationship: 'Child', deceased: 'Lourdes Garcia', dob: '1965-06-10', dod: '2026-08-18' },
    { name: 'Rosa Mendoza', contact: '0919-345-6789', email: 'rosa@email.com', relationship: 'Spouse', deceased: 'Felipe Mendoza', dob: '1955-03-20', dod: '2026-08-15' },
    { name: 'Ana Reyes', contact: '0920-456-7890', email: 'ana@email.com', relationship: 'Child', deceased: 'Alejandro Reyes', dob: '1948-11-05', dod: '2026-08-12' },
];

const DOCUMENTS = [
    { id: 'death_cert', label: 'Death Certificate', requiredFor: 'actual' },
    { id: 'burial_permit', label: 'Burial/Transfer of Cadaver Permit', requiredFor: 'actual' },
    { id: 'transfer_permit', label: 'Transfer Permit for Bone Transfer', requiredFor: 'actual' },
    { id: 'cert_ownership', label: 'Certificate of Ownership (lot owners)', requiredFor: 'actual' },
    { id: 'valid_id', label: 'Valid ID of Payor', requiredFor: 'both' },
    { id: 'purchase_agreement', label: 'Signed Purchase Agreement', requiredFor: 'both' }
];

const INITIAL_RECEIPTS = [
    { receipt: 'OR-2026-0342', client: 'Rosa Mendoza', items: 'Installment Payment - Lot B-098', amount: 15000, date: '2026-03-15' },
    { receipt: 'OR-2026-0341', client: 'Pedro Garcia', items: 'Mausoleum Lot - C-128', amount: 85000, date: '2026-03-15' },
    { receipt: 'OR-2026-0340', client: 'Elena Santos', items: 'Columbarium - E-003', amount: 10000, date: '2026-03-14' },
    { receipt: 'OR-2026-0339', client: 'Roberto Lim', items: 'Bone Vault - D-014', amount: 45000, date: '2026-03-14' },
    { receipt: 'OR-2026-0338', client: 'Maria Cruz', items: 'Apartment Niche - B-047', amount: 30000, date: '2026-03-13' }
];

function formatDate(dateStr) {
    if (!dateStr) return '\u2014';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function generateReceiptNo() {
    return 'OR-2026-' + String(Math.floor(Math.random() * 9000 + 1000));
}

export default function POSTransactions() {
    // ================================================================
    // STATE
    // ================================================================
    const [products, setProducts] = useState(JSON.parse(JSON.stringify(PRODUCTS)));
    const [occupiedWakeDates, setOccupiedWakeDates] = useState(INITIAL_OCCUPIED_WAKE_DATES);
    const [cart, setCart] = useState([]);
    const [discountType, setDiscountType] = useState('none');
    const [paymentPlan, setPaymentPlan] = useState('full');
    const [burialType, setBurialType] = useState('actual');
    
    const [clientName, setClientName] = useState('');
    const [clientContact, setClientContact] = useState('');
    const [clientEmail, setClientEmail] = useState('');
    const [clientRelationship, setClientRelationship] = useState('');
    const [clientSearchTerm, setClientSearchTerm] = useState('');
    const [isClientEditing, setIsClientEditing] = useState(true);
    const [isClientSearchFocused, setIsClientSearchFocused] = useState(false);

    const [deceasedName, setDeceasedName] = useState('');
    const [deceasedDOB, setDeceasedDOB] = useState('');
    const [deceasedDOD, setDeceasedDOD] = useState('');
    const [deceasedCause, setDeceasedCause] = useState('');
    const [burialDate, setBurialDate] = useState(() => new Date().toISOString().slice(0, 10));

    const [wakeModalOpen, setWakeModalOpen] = useState(false);
    const [wakeBooking, setWakeBooking] = useState({ nights: 3, checkin: '', checkout: '', total: 0, available: false });
    
    const [addItemModalOpen, setAddItemModalOpen] = useState(false);
    const [addItemProduct, setAddItemProduct] = useState('');
    const [addItemLocation, setAddItemLocation] = useState('');
    const [addItemInterment, setAddItemInterment] = useState('none');
    const [addItemQty, setAddItemQty] = useState(1);
    const [addItemBorrowing, setAddItemBorrowing] = useState('0');

    const [checklistState, setChecklistState] = useState(Object.fromEntries(DOCUMENTS.map(d => [d.id, false])));
    const [checklistModalOpen, setChecklistModalOpen] = useState(false);

    const [amountTendered, setAmountTendered] = useState('');
    const [receipts, setReceipts] = useState(INITIAL_RECEIPTS);
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [lastReceipt, setLastReceipt] = useState(null);

    const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

    // ================================================================
    // DERIVED STATE
    // ================================================================
    const lotKeys = Object.keys(products).filter(k => products[k].category === 'lot');
    const hasLot = cart.some(item => lotKeys.includes(item.name));
    const hasWake = cart.some(item => item.name === 'Wake Space');
    const isWakeOnly = hasWake && !hasLot;

    const { subtotal, intermentTotal, wakeTotalCart, totalDP, totalMonthly, hasDPItem } = useMemo(() => {
        let sub = 0, inter = 0, wakeTotal = 0, dp = 0, monthly = 0, hasDp = false;
        cart.forEach(item => {
            sub += item.total;
            if (item.intermentFee) inter += item.intermentFee * item.qty;
            if (item.name === 'Wake Space') wakeTotal += item.total;
            
            const p = products[item.name];
            if (p && p.dpPercent > 0 && p.category === 'lot') {
                let allowed = true;
                if (p.staggeredAllowed === 'none') allowed = false;
                if (p.staggeredAllowed === 'preneed' && burialType === 'actual') allowed = false;
                if (p.availableForActual === false && burialType === 'actual') allowed = false;
                if (allowed) {
                    hasDp = true;
                    const itemDp = item.total * (p.dpPercent / 100);
                    dp += itemDp;
                    if (p.monthly > 0) monthly += (item.total - itemDp) / 12;
                }
            }
        });
        return { subtotal: sub, intermentTotal: inter, wakeTotalCart: wakeTotal, totalDP: dp, totalMonthly: monthly, hasDPItem: hasDp };
    }, [cart, products, burialType]);

    const discountAmount = discountType !== 'none' ? subtotal * 0.20 : 0;
    let grandTotal = subtotal - discountAmount;
    let dpAmount = 0, monthlyAmount = 0;
    if (paymentPlan === 'staggered' && hasDPItem) {
        dpAmount = totalDP;
        monthlyAmount = totalMonthly;
        grandTotal = dpAmount;
    }
    const changeAmount = (parseFloat(amountTendered) || 0) - grandTotal;
    
    const isActualBurialDisabled = cart.some(item => {
        const p = products[item.name];
        return p && p.category === 'lot' && p.availableForActual === false;
    });

    const wakeAvailableSlots = useMemo(() => {
        const now = new Date();
        const futureBookings = occupiedWakeDates.filter(b => new Date(b.checkout) >= now);
        return Math.max(0, 1 - futureBookings.length);
    }, [occupiedWakeDates]);

    const matchedClients = useMemo(() => {
        if (!clientSearchTerm.trim() || !isWakeOnly) return [];
        const term = clientSearchTerm.trim().toLowerCase();
        return MOCK_CLIENTS.filter(c => c.name.toLowerCase().includes(term) || c.deceased.toLowerCase().includes(term));
    }, [clientSearchTerm, isWakeOnly]);

    let eligibilityNoteClass = 'eligibility-note';
    let eligibilityNoteHtml = '<i class="fas fa-info-circle"></i> Add items to cart to see payment eligibility';
    let staggeredDisabled = false;

    if (isWakeOnly) {
        eligibilityNoteHtml = '<i class="fas fa-info-circle"></i> Wake Space rental only. No burial documents required.';
    } else if (cart.length > 0) {
        if (!hasLot) {
            eligibilityNoteHtml = '<i class="fas fa-info-circle"></i> No grave lot selected. Only Wake Space rental. Payment plan options limited.';
            eligibilityNoteClass = 'eligibility-note warning';
            staggeredDisabled = true;
        } else {
            let staggeredAllowed = true, warnings = [];
            cart.forEach(item => {
                const p = products[item.name];
                if (p && p.category === 'lot') {
                    if (p.staggeredAllowed === 'preneed' && burialType === 'actual') { staggeredAllowed = false; warnings.push(item.name + ' cannot use Staggered for Actual Burial'); }
                    if (p.staggeredAllowed === 'none') { staggeredAllowed = false; warnings.push(item.name + ' does not support Staggered'); }
                    if (p.availableForActual === false && burialType === 'actual') { staggeredAllowed = false; warnings.push(item.name + ' is not available for Actual Burial'); }
                }
            });
            if (!staggeredAllowed) {
                eligibilityNoteHtml = '<i class="fas fa-exclamation-triangle"></i> ' + warnings.join('. ') + '. Switch to "Full Payment" or "Pre-Need" plan.';
                eligibilityNoteClass = 'eligibility-note error';
                staggeredDisabled = true;
            } else {
                eligibilityNoteHtml = '<i class="fas fa-check-circle"></i> Staggered payment is available for this selection.';
            }
        }
    }

    useEffect(() => {
        if (isActualBurialDisabled && burialType === 'actual') setBurialType('preneed');
        if (staggeredDisabled && paymentPlan === 'staggered') setPaymentPlan('full');
    }, [isActualBurialDisabled, staggeredDisabled, burialType, paymentPlan]);

    useEffect(() => {
        if (wakeModalOpen) {
            const checkin = wakeBooking.checkin;
            if (!checkin) {
                // eslint-disable-next-line
                setWakeBooking(prev => ({ ...prev, available: false }));
                return;
            }
            const checkinDate = new Date(checkin);
            const checkoutDate = new Date(checkinDate);
            checkoutDate.setDate(checkoutDate.getDate() + wakeBooking.nights);
            const checkoutStr = checkoutDate.toISOString().slice(0, 10);
            
            let available = true;
            const rIn = new Date(checkin), rOut = new Date(checkoutStr);
            for (let b of occupiedWakeDates) {
                if (rIn < new Date(b.checkout) && rOut > new Date(b.checkin)) {
                    available = false;
                    break;
                }
            }
            
            const total = wakeBooking.nights * 1500;
            setWakeBooking(prev => ({ ...prev, checkout: checkoutStr, total, available }));
        }
    }, [wakeBooking.checkin, wakeBooking.nights, wakeModalOpen, occupiedWakeDates]);

    const checklistCompleted = Object.values(checklistState).filter(v => v).length;
    const checklistProgress = (checklistCompleted / DOCUMENTS.length) * 100;

    const showToastMsg = (msg, type = 'success') => {
        setToast({ visible: true, message: msg, type });
        setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3500);
    };

    const handleSelectClient = (index) => {
        const client = MOCK_CLIENTS[index];
        setClientSearchTerm(client.name);
        setClientName(client.name);
        setClientContact(client.contact);
        setClientEmail(client.email);
        setClientRelationship(client.relationship || '');
        setDeceasedName(client.deceased || '');
        setDeceasedDOB(client.dob || '');
        setDeceasedDOD(client.dod || '');
        setIsClientEditing(false);
        setIsClientSearchFocused(false);
        showToastMsg('\u2705 Client loaded: ' + client.name, 'success');
    };

    const enableClientEditingLocal = () => {
        setIsClientEditing(true);
        setClientSearchTerm('');
    };

    const handleOpenWakeBookingModal = () => {
        const today = new Date().toISOString().slice(0, 10);
        setWakeBooking({ nights: 3, checkin: today, checkout: '', total: 0, available: false });
        setWakeModalOpen(true);
    };

    const adjustWakeNights = (delta) => {
        setWakeBooking(prev => ({ ...prev, nights: Math.max(1, Math.min(30, prev.nights + delta)) }));
    };

    const confirmWakeBooking = () => {
        if (!wakeBooking.available || !wakeBooking.checkin) {
            showToastMsg('\u26a0\ufe0f Please select available dates.', 'warning'); return;
        }
        setOccupiedWakeDates(prev => [...prev, { checkin: wakeBooking.checkin, checkout: wakeBooking.checkout }]);
        
        const existingWakeIndex = cart.findIndex(item => item.name === 'Wake Space');
        const newCart = [...cart];
        if (existingWakeIndex >= 0) {
            newCart[existingWakeIndex] = {
                ...newCart[existingWakeIndex],
                qty: newCart[existingWakeIndex].qty + wakeBooking.nights,
                total: newCart[existingWakeIndex].total + wakeBooking.total,
                metadata: { checkin: wakeBooking.checkin, checkout: wakeBooking.checkout, nights: wakeBooking.nights }
            };
        } else {
            newCart.push({
                name: 'Wake Space', displayName: 'Wake Space', qty: wakeBooking.nights, total: wakeBooking.total, unitPrice: 1500,
                metadata: { checkin: wakeBooking.checkin, checkout: wakeBooking.checkout, nights: wakeBooking.nights }
            });
        }
        setCart(newCart);
        setWakeModalOpen(false);
        showToastMsg('\u2705 Wake Space booked for ' + wakeBooking.nights + ' night(s)', 'success');
    };

    const openAddItemModalLocal = (preSelected) => {
        setAddItemProduct(preSelected);
        const p = products[preSelected];
        let defaultLoc = '';
        if (p && p.locations && p.locations.length > 0) {
            const avail = p.locations.filter(l => l.status === 'Available');
            if (avail.length > 0) defaultLoc = avail[0].id;
        }
        setAddItemLocation(defaultLoc);
        
        let defaultInterment = 'none';
        if (p && p.intermentFresh > 0) defaultInterment = 'fresh';
        else if (p && p.intermentBones > 0) defaultInterment = 'bones';
        
        setAddItemInterment(defaultInterment);
        setAddItemQty(1);
        setAddItemBorrowing('0');
        setAddItemModalOpen(true);
    };

    const confirmAddItemLocal = () => {
        const baseName = addItemProduct;
        const p = products[baseName];
        const qty = parseInt(addItemQty) || 1;
        let intermentFee = 0, intermentLabel = '';
        if (addItemInterment === 'fresh' && p.intermentFresh > 0) { intermentFee = p.intermentFresh; intermentLabel = 'Fresh'; }
        else if (addItemInterment === 'bones' && p.intermentBones > 0) { intermentFee = p.intermentBones; intermentLabel = 'Bones'; }

        const locationId = addItemLocation;
        let locationData = locationId && p.locations ? p.locations.find(l => l.id === locationId) : null;

        if (p.locations && p.locations.length > 0 && !locationData) {
            showToastMsg('\u26a0\ufe0f Please select a location.', 'warning'); return;
        }

        if (p.category === 'lot' && !isClientEditing) {
            enableClientEditingLocal();
        }

        const displayName = intermentLabel ? baseName + ' (' + intermentLabel + ')' : baseName;
        const unitPrice = p.price + intermentFee;
        const cartItem = { name: baseName, displayName, qty, unitPrice, total: unitPrice * qty,
            intermentLabel, intermentFee, basePrice: p.price, location: locationData || null };
        
        const newCart = [...cart];
        const existing = newCart.find(item => item.displayName === displayName);
        if (existing) {
            existing.qty += qty;
            existing.total = existing.qty * unitPrice;
        } else {
            newCart.push(cartItem);
        }
        setCart(newCart);
        setAddItemModalOpen(false);
        showToastMsg('\u2705 Added ' + displayName, 'success');
    };

    const removeFromCartLocal = (index) => {
        const removed = cart[index];
        if (removed.name === 'Wake Space' && removed.metadata) {
            setOccupiedWakeDates(prev => prev.filter(b => !(b.checkin === removed.metadata.checkin && b.checkout === removed.metadata.checkout)));
        }
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
        showToastMsg('\ud83d\uddd1\ufe0f Removed ' + removed.displayName, 'info');
    };

    const viewOnMapLocal = (locationId) => {
        let found = null, foundProduct = null;
        for (const [productName, product] of Object.entries(products)) {
            if (product.locations) {
                const loc = product.locations.find(l => l.id === locationId);
                if (loc) { found = loc; foundProduct = productName; break; }
            }
        }
        if (found) {
            showToastMsg('\ud83d\uddfa\ufe0f Opening map view for ' + foundProduct + ' ' + found.id, 'info');
            setTimeout(() => showToastMsg('\ud83d\udccd Location: ' + found.id + ' \u00b7 ' + found.block + ' \u00b7 ' + found.zone + ' \u00b7 ' + found.level, 'success'), 800);
        } else {
            showToastMsg('\u26a0\ufe0f Location ' + locationId + ' not found.', 'warning');
        }
    };

    const handleChecklistChange = (id, checked) => {
        setChecklistState(prev => ({ ...prev, [id]: checked }));
    };

    const handleProcessPaymentBtn = () => {
        if (cart.length === 0) { showToastMsg('\u26a0\ufe0f Cart is empty. Add items first.', 'warning'); return; }
        if (isWakeOnly) { processPaymentLocal(); return; }
        setChecklistModalOpen(true);
    };

    const confirmChecklistModal = () => {
        let requiredDocs = DOCUMENTS.filter(doc =>
            burialType === 'actual' ? (doc.requiredFor === 'actual' || doc.requiredFor === 'both') : doc.requiredFor === 'both'
        );
        let missing = [];
        requiredDocs.forEach(doc => {
            if (!checklistState[doc.id]) missing.push(doc.label);
        });
        if (missing.length) { showToastMsg('\u26a0\ufe0f Please complete: ' + missing.join(', '), 'warning'); return; }
        setChecklistModalOpen(false);
        processPaymentLocal();
    };

    const processPaymentLocal = () => {
        if (cart.length === 0) { showToastMsg('\u26a0\ufe0f Cart is empty. Add items first.', 'warning'); return; }
        if (!isWakeOnly) {
            let requiredDocs = DOCUMENTS.filter(doc =>
                burialType === 'actual' ? (doc.requiredFor === 'actual' || doc.requiredFor === 'both') : doc.requiredFor === 'both'
            );
            if (requiredDocs.some(doc => !checklistState[doc.id])) {
                showToastMsg('\u26a0\ufe0f Please complete all required documents first.', 'warning'); return;
            }
        }
        const tendered = parseFloat(amountTendered) || 0;
        if (tendered < grandTotal) { showToastMsg('\u26a0\ufe0f Amount tendered is less than total due.', 'warning'); return; }

        const cName = clientName.trim() || 'Walk-in';
        const dName = deceasedName.trim() || 'N/A';
        const bDate = burialDate || 'N/A';

        let locationInfo = 'N/A';
        const lotItem = cart.find(item => item.location);
        if (lotItem && lotItem.location) {
            locationInfo = lotItem.location.id + ' \u00b7 ' + lotItem.location.block + ' \u00b7 ' + lotItem.location.zone + ' \u00b7 ' + lotItem.location.level;
        }

        let wakeCheckin = 'N/A', wakeCheckout = 'N/A', wakeNightsTotal = 0;
        const wakeInfo = cart.find(item => item.name === 'Wake Space');
        if (wakeInfo && wakeInfo.metadata) {
            wakeCheckin = wakeInfo.metadata.checkin || 'N/A';
            wakeCheckout = wakeInfo.metadata.checkout || 'N/A';
            wakeNightsTotal = wakeInfo.metadata.nights || 0;
        }

        const newProducts = { ...products };
        cart.forEach(item => {
            const p = newProducts[item.name];
            if (p && p.availableSlots != null) {
                p.availableSlots = Math.max(0, p.availableSlots - item.qty);
                if (p.availableSlots === 0) p.available = false;
            }
            if (item.location && p && p.locations) {
                const loc = p.locations.find(l => l.id === item.location.id);
                if (loc) loc.status = 'Occupied';
            }
        });
        setProducts(newProducts);

        const receiptNo = generateReceiptNo();
        const itemsList = cart.map(i => i.displayName + ' (x' + i.qty + ')').join(', ');
        const newReceipt = { receipt: receiptNo, client: cName, items: itemsList, amount: grandTotal, date: new Date().toISOString().slice(0, 10) };
        setReceipts([newReceipt, ...receipts]);

        let intermTotal = 0;
        cart.forEach(item => { if (item.intermentFee) intermTotal += item.intermentFee * item.qty; });
        const intermentDisplay = intermTotal > 0 ? '\u20b1' + intermTotal.toLocaleString() : 'None';
        let wakeTotalDisplay = 'None';
        if (wakeInfo) wakeTotalDisplay = '\u20b1' + wakeInfo.total.toLocaleString() + ' (' + wakeInfo.qty + ' nights, ' + formatDate(wakeInfo.metadata?.checkin) + ' \u2192 ' + formatDate(wakeInfo.metadata?.checkout) + ')';

        setLastReceipt({
            receiptNo, client: cName, amount: grandTotal, intermentAmt: intermentDisplay, wakeTotal: wakeTotalDisplay,
            plan: paymentPlan, burialType: isWakeOnly ? 'Wake Only' : burialType, discount: discountType,
            burialDate: bDate, deceased: dName, location: locationInfo,
            wakeCheckin, wakeCheckout, nights: wakeNightsTotal
        });

        clearTransactionLocal();
        setPaymentModalOpen(true);
        showToastMsg('\u2705 Payment processed! Receipt ' + receiptNo, 'success');
    };

    const clearTransactionLocal = () => {
        setCart([]);
        setClientName(''); setClientContact(''); setClientEmail(''); setClientRelationship('');
        setDeceasedName(''); setDeceasedDOB(''); setDeceasedDOD(''); setDeceasedCause(''); setBurialDate('');
        setAmountTendered('');
        setDiscountType('none');
        setPaymentPlan('full');
        setBurialType('actual');
        enableClientEditingLocal();
        setChecklistState(Object.fromEntries(DOCUMENTS.map(d => [d.id, false])));
        setOccupiedWakeDates(INITIAL_OCCUPIED_WAKE_DATES);
        showToastMsg('\ud83d\udd04 Transaction reset', 'info');
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setWakeModalOpen(false);
                setAddItemModalOpen(false);
                setChecklistModalOpen(false);
                setPaymentModalOpen(false);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <>
            <StaffTopbar title="POS Transactions" greeting="Process grave lot sales, wake space rentals, and payments" />
            <div className="pos-page-wrapper" style={{ padding: '0', background: 'transparent' }}>
                <div className="pos-container">
                    <div className="pos-header">
                        <div className="pos-header-left">
                            <h2><i className="fas fa-cash-register" style={{color:'#d4af37',marginRight:'8px'}}></i>New Transaction</h2>
                            <p>Select products below, then complete payment details on the right</p>
                        </div>
                        <div className="pos-header-right">
                            <button className="btn-secondary" onClick={clearTransactionLocal}><i className="fas fa-undo"></i> Reset</button>
                        </div>
                    </div>

                    <div className="pos-two-col">
                        <div className="left-panel">
                            <div className="product-list-section">
                                <div className="section-title"><i className="fas fa-tshirt"></i> Grave Lots</div>
                                <table className="product-table" id="productTable">
                                    <thead>
                                        <tr>
                                            <th style={{width:'40%'}}>Product</th>
                                            <th style={{width:'20%', textAlign:'left'}}>Price</th>
                                            <th style={{width:'20%', textAlign:'center'}}>Availability</th>
                                            <th style={{width:'20%', textAlign:'center'}}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody id="productTableBody">
                                        {lotKeys.map(key => {
                                            const p = products[key];
                                            const isSoldOut = !p.available || p.availableSlots === 0;
                                            const availClass = isSoldOut ? 'sold-out' : 'available';
                                            return (
                                                <tr key={key}>
                                                    <td><div className="product-name-cell"><i className={'fas ' + p.icon}></i> {key}</div></td>
                                                    <td style={{textAlign:'left'}} className="product-price-cell">&#8369;{p.price.toLocaleString()}</td>
                                                    <td style={{textAlign:'center'}} className={'product-avail-cell ' + availClass}>
                                                        {isSoldOut ? <><span dangerouslySetInnerHTML={{__html: '&#10060;'}}/> Sold Out</> : <><span dangerouslySetInnerHTML={{__html: '&#9989;'}}/> {p.availableSlots}</>}
                                                    </td>
                                                    <td style={{textAlign:'center'}}>
                                                        <button className="btn-add-sm" onClick={() => openAddItemModalLocal(key)} disabled={isSoldOut}>+ Add</button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            <div className="wake-separator">
                                <span><i className="fas fa-bed" style={{color:'#3670AF'}}></i> Wake Space (Optional)</span>
                                <div className="line"></div>
                            </div>

                            <div className="product-list-section">
                                <div className="section-title" style={{color:'#3670AF'}}><i className="fas fa-bed"></i> Wake Space Rental</div>
                                <div className="wake-product-row">
                                    <div className="wake-info">
                                        <i className="fas fa-bed"></i>
                                        <div>
                                            <div className="wake-name">Wake Space</div>
                                            <div className="wake-price">&#8369;1,500 / night</div>
                                        </div>
                                    </div>
                                    <div style={{display:'flex',alignItems:'center',gap:'0.8rem'}}>
                                        <span className={'wake-avail ' + (wakeAvailableSlots > 0 ? 'available' : 'sold-out')} id="wakeAvailStatus">
                                            {wakeAvailableSlots > 0 ? '\u2705 ' + wakeAvailableSlots + ' available' : '\u274c Fully Booked'}
                                        </span>
                                        <button className="btn-add-sm" onClick={handleOpenWakeBookingModal} disabled={wakeAvailableSlots <= 0}>
                                            <i className="fas fa-calendar-plus"></i> Book
                                        </button>
                                    </div>
                                </div>
                                <div style={{fontSize:'0.6rem',color:'#8aaccc',padding:'0.2rem 0.4rem',textAlign:'center'}}>
                                    <i className="fas fa-info-circle"></i> Click "Book" to select check-in/out dates
                                </div>
                            </div>

                            <div className="cart-section">
                                <div className="cart-title">
                                    <span>&#128722; Cart</span>
                                    <span className="item-count" id="cartItemCount">{cart.reduce((s, i) => s + i.qty, 0)} items</span>
                                </div>
                                <table className="cart-items-table" id="cartTable">
                                    <thead>
                                        <tr>
                                            <th style={{width:'50%'}}>Item</th>
                                            <th style={{width:'15%', textAlign:'left'}}>Qty</th>
                                            <th style={{width:'20%', textAlign:'left'}}>Total</th>
                                            <th style={{width:'15%', textAlign:'center'}}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody id="cartBody">
                                        {cart.length === 0 ? (
                                            <tr><td colSpan="4" className="empty-msg">No items added yet</td></tr>
                                        ) : cart.map((item, idx) => (
                                            <tr key={idx}>
                                                <td>
                                                    {item.displayName}
                                                    {item.name === 'Wake Space' && item.metadata && ` (${formatDate(item.metadata.checkin)} \u2192 ${formatDate(item.metadata.checkout)})`}
                                                    {item.location && (
                                                        <div className="cart-location">
                                                            <i className="fas fa-map-pin"></i>
                                                            <span className="location-id">{item.location.id}</span>
                                                            <span className="location-detail">{item.location.block} &middot; {item.location.zone}</span>
                                                            <span className="location-detail">{item.location.level}</span>
                                                            <button className="btn-map-sm" onClick={() => viewOnMapLocal(item.location.id)}>
                                                                <i className="fas fa-map-marked-alt"></i> View Map
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                                <td style={{textAlign:'left'}}>{item.qty}</td>
                                                <td style={{textAlign:'left',fontWeight:'600'}}>&#8369;{item.total.toLocaleString()}</td>
                                                <td style={{textAlign:'center'}}>
                                                    <button className="btn-remove" onClick={() => removeFromCartLocal(idx)}><i className="fas fa-times"></i></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="right-panel">
                            <div className="panel-box" id="clientPaymentPanel">
                                <div className="client-payment-row">
                                    <div className="form-group client-search-wrapper" id="clientSearchWrapper" style={{display: isWakeOnly ? 'block' : 'none'}}>
                                        <label>Client Name</label>
                                        <input type="text" id="clientSearchInput" placeholder={isWakeOnly ? "Search client by name or deceased..." : "Search client..."} 
                                            value={clientSearchTerm} 
                                            onChange={e => setClientSearchTerm(e.target.value)} 
                                            onFocus={() => setIsClientSearchFocused(true)} />
                                        <i className="fas fa-search search-icon"></i>
                                        {isClientSearchFocused && matchedClients.length > 0 && (
                                            <div className="client-search-results" id="clientSearchResults" style={{display: 'block'}}>
                                                {matchedClients.map((c, i) => (
                                                    <div className="result-item" key={i} onClick={() => handleSelectClient(MOCK_CLIENTS.indexOf(c))}>
                                                        <strong>{c.name}</strong>
                                                        <div className="sub">{c.deceased} &middot; {c.relationship}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {isClientSearchFocused && clientSearchTerm.length > 0 && matchedClients.length === 0 && isWakeOnly && (
                                            <div className="client-search-results" id="clientSearchResults" style={{display: 'block'}}>
                                                <div className="result-item" style={{color:'#8aaccc',cursor:'default'}}>No clients found. Enter new client info below.</div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label>Payment Type</label>
                                        <select id="paymentType"><option value="Cash">Cash</option></select>
                                    </div>
                                </div>
                            </div>

                            <div className="panel-box" id="infoPanel">
                                <div className="info-side-by-side">
                                    <div className="info-column">
                                        <div className="info-title">
                                            <i className="fas fa-user" style={{color:'#d4af37'}}></i> Client Information
                                            <span className="badge" id="clientInfoBadge" style={isClientEditing ? {background: '#f0f2f5', color: '#7a9fbe'} : {background: '#d5f5e3', color: '#27ae60'}}>
                                                {isClientEditing ? 'New' : 'Loaded'}
                                            </span>
                                        </div>
                                        <div className="info-grid">
                                            <div className="form-group">
                                                <label>Full Name</label>
                                                <input type="text" id="clientName" placeholder="Walk-in or enter name" value={clientName} onChange={e => setClientName(e.target.value)} disabled={!isClientEditing} />
                                            </div>
                                            <div className="form-group">
                                                <label>Contact Number</label>
                                                <input type="text" id="clientContact" placeholder="0917-123-4567" value={clientContact} onChange={e => setClientContact(e.target.value)} disabled={!isClientEditing} />
                                            </div>
                                            <div className="form-group" style={{gridColumn: 'span 2'}}>
                                                <label>Email Address</label>
                                                <input type="email" id="clientEmail" placeholder="client@email.com" value={clientEmail} onChange={e => setClientEmail(e.target.value)} disabled={!isClientEditing} />
                                            </div>
                                            <div className="form-group" style={{gridColumn: 'span 2'}}>
                                                <label>Relationship to Deceased</label>
                                                <select id="clientRelationship" value={clientRelationship} onChange={e => setClientRelationship(e.target.value)} disabled={!isClientEditing}>
                                                    <option value="">Select relationship...</option>
                                                    <option value="Spouse">Spouse</option>
                                                    <option value="Child">Child</option>
                                                    <option value="Parent">Parent</option>
                                                    <option value="Sibling">Sibling</option>
                                                    <option value="Grandparent">Grandparent</option>
                                                    <option value="Grandchild">Grandchild</option>
                                                    <option value="Friend">Friend</option>
                                                    <option value="Relative">Other Relative</option>
                                                    <option value="Self">Self</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="info-column" id="deceasedInfoColumn" style={{display: (burialType === 'actual' && hasLot) || isWakeOnly ? 'block' : 'none'}}>
                                        <div className="info-title">
                                            <i className="fas fa-cross" style={{color:'#8e44ad'}}></i> Deceased Information
                                            <span className="badge" id="deceasedInfoBadge" style={isWakeOnly ? {background: '#fef9e7', color: '#f39c12'} : isClientEditing ? {background: '#f0f2f5', color: '#7a9fbe'} : {background: '#d5f5e3', color: '#27ae60'}}>
                                                {isWakeOnly ? 'For Wake' : (isClientEditing ? 'Required' : 'Loaded')}
                                            </span>
                                        </div>
                                        <div className="info-grid">
                                            <div className="form-group" style={{gridColumn: 'span 2'}}>
                                                <label>Full Name</label>
                                                <input type="text" id="deceasedName" placeholder="Enter full name" value={deceasedName} onChange={e => setDeceasedName(e.target.value)} disabled={!isClientEditing} />
                                            </div>
                                            <div className="form-group">
                                                <label>Date of Birth</label>
                                                <input type="date" id="deceasedDOB" value={deceasedDOB} onChange={e => setDeceasedDOB(e.target.value)} disabled={!isClientEditing} />
                                            </div>
                                            <div className="form-group">
                                                <label>Date of Death</label>
                                                <input type="date" id="deceasedDOD" value={deceasedDOD} onChange={e => setDeceasedDOD(e.target.value)} disabled={!isClientEditing} />
                                            </div>
                                            <div className="form-group" style={{gridColumn: 'span 2'}}>
                                                <label>Cause of Death (Optional)</label>
                                                <input type="text" id="deceasedCause" placeholder="e.g., Natural causes" value={deceasedCause} onChange={e => setDeceasedCause(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`panel-box hide-when-wake-only ${isWakeOnly ? 'hidden' : ''}`} id="burialTypePanel">
                                <div className="burial-type-group">
                                    <label id="actualLabel" className={isActualBurialDisabled ? 'disabled' : ''}>
                                        <input type="radio" name="burialType" value="actual" checked={burialType === 'actual'} onChange={() => setBurialType('actual')} disabled={isActualBurialDisabled} /> Actual Burial (Ililibing na)
                                    </label>
                                    <label id="preneedLabel">
                                        <input type="radio" name="burialType" value="preneed" checked={burialType === 'preneed'} onChange={() => setBurialType('preneed')} /> Pre-Need (Advance Purchase)
                                    </label>
                                    <span className="info-note" id="burialTypeNote"><i className="fas fa-info-circle"></i> Heroes Buried only available for Pre-Need</span>
                                </div>
                            </div>

                            <div className="panel-box" id="datePickerPanel" style={{display: hasLot || isWakeOnly ? 'block' : (cart.length === 0 ? 'block' : 'none')}}>
                                <div className="date-picker-row">
                                    <div className="form-group" id="burialDateGroup" style={{display: hasLot || cart.length === 0 ? 'block' : 'none'}}>
                                        <label id="dateLabel">
                                            {isWakeOnly ? '\ud83d\udcc5 Wake Check-in Date' : (hasLot ? (burialType === 'actual' ? '\ud83d\udcc5 Burial Date (Required)' : '\ud83d\udcc5 Purchase Date (Pre-Need)') : '\ud83d\udcc5 Burial Date (for actual burial)')}
                                        </label>
                                        <input type="date" id="burialDate" value={burialDate} onChange={e => setBurialDate(e.target.value)} required={burialType === 'actual' && hasLot} />
                                    </div>
                                </div>
                            </div>

                            <div className={eligibilityNoteClass} id="eligibilityNote" dangerouslySetInnerHTML={{__html: eligibilityNoteHtml}}></div>

                            <div className={`panel-box checklist-section hide-when-wake-only ${isWakeOnly ? 'hidden' : ''}`} id="checklistSection">
                                <div className="checklist-title">
                                    <i className="fas fa-clipboard-list"></i> Document Requirements
                                    <span style={{fontSize:'0.6rem',color:'#8aaccc',fontWeight:'400'}}> (Check when complete)</span>
                                </div>
                                <div className="checklist-grid" id="checklistGrid">
                                    {DOCUMENTS.map(doc => {
                                        const rHtml = burialType === 'actual'
                                            ? (doc.requiredFor === 'actual' || doc.requiredFor === 'both' ? '<span class="required">*</span>' : '<span class="optional">(optional)</span>')
                                            : (doc.requiredFor === 'both' ? '<span class="required">*</span>' : '<span class="optional">(optional)</span>');
                                        return (
                                            <div className="checklist-item" key={doc.id}>
                                                <input type="checkbox" id={"check_" + doc.id} checked={checklistState[doc.id]} onChange={e => handleChecklistChange(doc.id, e.target.checked)} />
                                                <label htmlFor={"check_" + doc.id} dangerouslySetInnerHTML={{__html: doc.label + ' ' + rHtml}}></label>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="checklist-progress">
                                    <span id="checklistStatus">{checklistCompleted} of {DOCUMENTS.length} completed</span>
                                    <div className="progress-track">
                                        <div className="progress-bar" id="checklistProgress" style={{width: checklistProgress + '%'}}></div>
                                    </div>
                                </div>
                            </div>

                            <div className="panel-box">
                                <div className="discount-plan-row">
                                    <div className="form-group">
                                        <label>Discount Type</label>
                                        <select id="discountType" value={discountType} onChange={e => setDiscountType(e.target.value)}>
                                            <option value="none">None</option>
                                            <option value="pwd">PWD - 20%</option>
                                            <option value="senior">Senior Citizen - 20%</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Payment Plan</label>
                                        <select id="paymentPlan" value={paymentPlan} onChange={e => setPaymentPlan(e.target.value)} disabled={staggeredDisabled}>
                                            <option value="full">Full Payment (On the Spot)</option>
                                            <option value="staggered">Staggered (DP + Monthly)</option>
                                            <option value="preneed">Pre-Need (Advance Purchase)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="panel-box payment-panel">
                                <h4 style={{fontSize:'0.85rem',fontWeight:'600',color:'#1a3d5c',marginBottom:'0.3rem'}}>
                                    <i className="fas fa-receipt" style={{color:'#d4af37'}}></i> Payment Summary
                                </h4>
                                <div className="summary-line">
                                    <span className="label">Subtotal</span>
                                    <span className="value" id="subtotalDisplay">&#8369;{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="summary-line">
                                    <span className="label">Interment Fee</span>
                                    <span className="value" id="intermentDisplay" style={{color:'#8e44ad'}}>{intermentTotal > 0 ? '₱' + intermentTotal.toLocaleString() : '₱0.00'}</span>
                                </div>
                                <div className="summary-line">
                                    <span className="label">Wake Space</span>
                                    <span className="value" id="wakeSubtotalDisplay" style={{color:'#3670AF'}}>{wakeTotalCart > 0 ? '₱' + wakeTotalCart.toLocaleString() : '₱0.00'}</span>
                                </div>
                                <div className="summary-line">
                                    <span className="label">Discount (20%)</span>
                                    <span className="value" id="discountDisplay" style={{color:'#27ae60'}}>{discountAmount > 0 ? '- ₱' + discountAmount.toLocaleString() : '₱0.00'}</span>
                                </div>
                                <div className="summary-line">
                                    <span className="label">DP Required</span>
                                    <span className="value" id="dpDisplay" style={{color:'#f39c12'}}>{dpAmount > 0 ? '₱' + dpAmount.toLocaleString() : '₱0.00'}</span>
                                </div>
                                <div className="summary-line" style={{borderBottom:'none'}}>
                                    <span className="label">Monthly (if staggered)</span>
                                    <span className="value" id="monthlyDisplay" style={{fontSize:'0.75rem',color:'#3670AF'}}>{monthlyAmount > 0 ? '₱' + monthlyAmount.toLocaleString() + '/mo (12 mos)' : '₱0.00'}</span>
                                </div>
                                <div className="summary-line total">
                                    <span className="label">Total Due</span>
                                    <span className="value" id="grandTotalDisplay">&#8369;{grandTotal.toLocaleString()}</span>
                                </div>
                                <div style={{marginTop:'0.5rem'}}>
                                    <div className="form-group">
                                        <label>Amount Tendered (Cash)</label>
                                        <input type="number" id="amountTendered" placeholder="0.00" value={amountTendered} onChange={e => setAmountTendered(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Change</label>
                                        <div className="change-display" id="changeDisplay">{changeAmount > 0 ? '₱' + changeAmount.toLocaleString() : '₱0.00'}</div>
                                    </div>
                                </div>
                                <button className="btn-process" onClick={handleProcessPaymentBtn}>
                                    <i className="fas fa-check-circle"></i> Process Payment
                                </button>
                                <div style={{fontSize:'0.6rem',color:'#8aaccc',textAlign:'center',marginTop:'0.2rem'}}>
                                    <i className="fas fa-info-circle"></i> Cash only. Receipt will be generated.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="receipts-section">
                        <h3><i className="fas fa-receipt"></i> Recent Receipts</h3>
                        <div className="table-wrapper" style={{border:'1px solid #e8edf4',borderRadius:'12px',overflowX:'auto'}}>
                            <table className="receipts-table">
                                <thead>
                                    <tr>
                                        <th>Receipt No.</th>
                                        <th>Client</th>
                                        <th>Items</th>
                                        <th style={{textAlign:'right'}}>Amount</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody id="receiptsBody">
                                    {receipts.slice(0, 10).map((r, i) => (
                                        <tr key={i}>
                                            <td><strong>{r.receipt}</strong></td>
                                            <td>{r.client}</td>
                                            <td>{r.items}</td>
                                            <td style={{textAlign:'right'}} className="receipt-amount">&#8369;{r.amount.toLocaleString()}</td>
                                            <td>{r.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="main-footer" style={{marginTop:'2rem',textAlign:'center',fontSize:'0.7rem',color:'#8aaccc',borderTop:'1px solid rgba(212,175,55,0.08)',paddingTop:'1.5rem'}}>
                    <i className="fas fa-dove" style={{color:'#d4af37',margin:'0 4px'}}></i>
                    Cherubim of Heaven Memorial Park &middot; Staff Dashboard v2.0
                    <i className="fas fa-dove" style={{color:'#d4af37',margin:'0 4px'}}></i>
                </div>

                {wakeModalOpen && (
                    <div className="modal-overlay active" id="wakeModal" onClick={(e) => { if (e.target === e.currentTarget) setWakeModalOpen(false); }}>
                        <div className="modal" style={{maxWidth:'520px'}}>
                            <div className="modal-icon" style={{color:'#3670AF'}}><i className="fas fa-bed"></i></div>
                            <h3>Book Wake Space</h3>
                            <p className="modal-subtitle">Select dates for the wake service</p>
                            <div className="wake-nights-control">
                                <label>Number of Nights</label>
                                <div className="nights-input">
                                    <button onClick={() => adjustWakeNights(-1)}><i className="fas fa-minus"></i></button>
                                    <input type="number" id="wakeNightsInput" value={wakeBooking.nights} min="1" max="30" onChange={e => setWakeBooking(prev => ({...prev, nights: parseInt(e.target.value)||1}))} />
                                    <button onClick={() => adjustWakeNights(1)}><i className="fas fa-plus"></i></button>
                                </div>
                            </div>
                            <div className="wake-date-range">
                                <div className="date-group">
                                    <label><i className="fas fa-calendar-check" style={{color:'#3670AF'}}></i> Check-in Date</label>
                                    <input type="date" id="wakeCheckinInput" value={wakeBooking.checkin} onChange={e => setWakeBooking(prev => ({...prev, checkin: e.target.value}))} min={new Date().toISOString().slice(0, 10)} />
                                </div>
                                <div className="date-group">
                                    <label><i className="fas fa-calendar-times" style={{color:'#c0392b'}}></i> Check-out Date</label>
                                    <input type="date" id="wakeCheckoutInput" value={wakeBooking.checkout} disabled />
                                </div>
                            </div>
                            <div className="wake-booking-summary">
                                <div className="wake-row"><span className="label">Check-in</span><span className="value" id="wakeSummaryCheckin">{formatDate(wakeBooking.checkin)}</span></div>
                                <div className="wake-row"><span className="label">Check-out</span><span className="value" id="wakeSummaryCheckout">{formatDate(wakeBooking.checkout)}</span></div>
                                <div className="wake-row"><span className="label">Nights</span><span className="value" id="wakeSummaryNights">{wakeBooking.nights}</span></div>
                                <div className="wake-row"><span className="label">Rate</span><span className="value">&#8369;1,500 / night</span></div>
                                <div className="wake-row wake-total"><span className="label">Total</span><span className="value" id="wakeSummaryTotal">&#8369;{wakeBooking.total.toLocaleString()}</span></div>
                            </div>
                            <div className={`wake-availability-status ${!wakeBooking.checkin ? '' : (wakeBooking.available ? 'available' : 'unavailable')}`} id="wakeAvailabilityStatus">
                                {!wakeBooking.checkin ? <><i className="fas fa-info-circle"></i> Please select check-in date</> :
                                    (wakeBooking.available ? <><i className="fas fa-check-circle"></i> Wake space is AVAILABLE for these dates</> :
                                        <><i className="fas fa-times-circle"></i> Wake space is OCCUPIED for these dates. Please choose different dates.</>)}
                            </div>
                            <div className="modal-actions">
                                <button className="btn-cancel" onClick={() => setWakeModalOpen(false)}>Cancel</button>
                                <button className="btn-confirm" onClick={confirmWakeBooking} id="wakeBookBtn" disabled={!wakeBooking.available}>
                                    <i className="fas fa-check"></i> Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {addItemModalOpen && (
                    <div className="modal-overlay active" id="addItemModal" onClick={(e) => { if (e.target === e.currentTarget) setAddItemModalOpen(false); }}>
                        <div className="modal" style={{maxWidth:'560px'}}>
                            <div className="modal-icon" style={{color:'#d4af37'}}><i className="fas fa-cart-plus"></i></div>
                            <h3>Add Item</h3>
                            <p className="modal-subtitle">Select grave type, location, and interment option</p>
                            <div className="form-group">
                                <label>Product</label>
                                <select id="modalProduct" value={addItemProduct} onChange={e => {
                                    setAddItemProduct(e.target.value);
                                    const p = products[e.target.value];
                                    let defaultLoc = '';
                                    if (p && p.locations && p.locations.length > 0) {
                                        const avail = p.locations.filter(l => l.status === 'Available');
                                        if (avail.length > 0) defaultLoc = avail[0].id;
                                    }
                                    setAddItemLocation(defaultLoc);
                                    let defaultInterment = 'none';
                                    if (p && p.intermentFresh > 0) defaultInterment = 'fresh';
                                    else if (p && p.intermentBones > 0) defaultInterment = 'bones';
                                    setAddItemInterment(defaultInterment);
                                }}>
                                    {lotKeys.map(k => <option key={k} value={k}>{k} - &#8369;{products[k].price.toLocaleString()}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Select Location</label>
                                <div className="location-grid" id="locationGrid">
                                    {(() => {
                                        const p = products[addItemProduct];
                                        if (!p || !p.locations || p.locations.length === 0) {
                                            return <div style={{padding:'0.5rem',textAlign:'center',color:'#8aaccc',fontSize:'0.8rem',gridColumn:'span 2'}}><i className="fas fa-info-circle"></i> No locations available for this type</div>;
                                        }
                                        const available = p.locations.filter(l => l.status === 'Available');
                                        if (available.length === 0) {
                                            return <div style={{padding:'0.5rem',textAlign:'center',color:'#c0392b',fontSize:'0.8rem',gridColumn:'span 2'}}><i className="fas fa-exclamation-triangle"></i> No available locations for this type</div>;
                                        }
                                        return available.map(loc => (
                                            <div className="location-option" key={loc.id} onClick={() => setAddItemLocation(loc.id)}>
                                                <input type="radio" name="selectedLocation" value={loc.id} id={"loc_" + loc.id} checked={addItemLocation === loc.id} readOnly />
                                                <label htmlFor={"loc_" + loc.id} style={{cursor:'pointer',display:'flex',alignItems:'center',gap:'4px',flexWrap:'wrap',width:'100%'}}>
                                                    <span className="loc-id">{loc.id}</span>
                                                    <span className="loc-detail">{loc.block} &middot; {loc.zone}</span>
                                                    <span className="loc-detail">{loc.level}</span>
                                                    <span className="loc-status available">&#9679; Available</span>
                                                </label>
                                            </div>
                                        ));
                                    })()}
                                </div>
                            </div>
                            <div className="form-group" id="intermentGroup">
                                <label>Interment Type</label>
                                <select id="modalInterment" value={addItemInterment} onChange={e => setAddItemInterment(e.target.value)}>
                                    {(() => {
                                        const p = products[addItemProduct];
                                        const opts = [];
                                        if (p && p.intermentFresh > 0) opts.push(<option key="fresh" value="fresh">Fresh Burial - &#8369;{p.intermentFresh.toLocaleString()} {p.intermentLabel?.includes('Mock') ? '\u26a0\ufe0f Mock' : ''}</option>);
                                        if (p && p.intermentBones > 0) opts.push(<option key="bones" value="bones">Bone Transfer - &#8369;{p.intermentBones.toLocaleString()} {p.intermentLabel?.includes('Mock') ? '\u26a0\ufe0f Mock' : ''}</option>);
                                        if (opts.length === 0) opts.push(<option key="none" value="none">No interment fee required</option>);
                                        return opts;
                                    })()}
                                </select>
                            </div>
                            <div className="form-group" id="qtyGroup">
                                <label>Quantity</label>
                                <input type="number" id="modalQty" value={addItemQty} min="1" onChange={e => setAddItemQty(e.target.value)} />
                            </div>
                            <div className="form-group" id="borrowingGroup" style={{display: addItemProduct === 'Columbarium' ? 'block' : 'none'}}>
                                <label>Columbarium Borrowing Fee</label>
                                <select id="modalBorrowing" value={addItemBorrowing} onChange={e => setAddItemBorrowing(e.target.value)}>
                                    <option value="0">None</option>
                                    <option value="1500">Borrowing Fee - &#8369;1,500/urn</option>
                                </select>
                            </div>
                            <div className="modal-actions">
                                <button className="btn-cancel" onClick={() => setAddItemModalOpen(false)}>Cancel</button>
                                <button className="btn-confirm" onClick={confirmAddItemLocal}><i className="fas fa-check"></i> Add to Cart</button>
                            </div>
                        </div>
                    </div>
                )}

                {checklistModalOpen && (
                    <div className="modal-overlay active" id="checklistModal" onClick={(e) => { if (e.target === e.currentTarget) setChecklistModalOpen(false); }}>
                        <div className="modal" style={{maxWidth:'560px'}}>
                            <div className="modal-icon" style={{color:'#d4af37'}}><i className="fas fa-clipboard-check"></i></div>
                            <h3>Document Checklist</h3>
                            <p className="modal-subtitle">Verify all required documents are complete before processing payment</p>
                            <div className="modal-checklist" id="modalChecklist">
                                {isWakeOnly ? (
                                    <div style={{gridColumn:'span 2',textAlign:'center',color:'#8aaccc',padding:'0.5rem 0'}}><i className="fas fa-info-circle"></i> No documents required for Wake Space rental only.</div>
                                ) : DOCUMENTS.map(doc => {
                                    const rHtml = burialType === 'actual'
                                        ? (doc.requiredFor === 'actual' || doc.requiredFor === 'both' ? '<span class="required">*</span>' : '<span class="optional">(optional)</span>')
                                        : (doc.requiredFor === 'both' ? '<span class="required">*</span>' : '<span class="optional">(optional)</span>');
                                    return (
                                        <div className="check-item" key={doc.id}>
                                            <input type="checkbox" id={"modal_check_" + doc.id} checked={checklistState[doc.id]} onChange={e => handleChecklistChange(doc.id, e.target.checked)} />
                                            <label htmlFor={"modal_check_" + doc.id} dangerouslySetInnerHTML={{__html: doc.label + ' ' + rHtml}}></label>
                                        </div>
                                    );
                                })}
                            </div>
                            <div style={{background:'#fef9e7',borderLeft:'3px solid #f39c12',padding:'0.5rem 0.8rem',borderRadius:'6px',fontSize:'0.75rem',color:'#7a9fbe',marginBottom:'1rem'}}>
                                <i className="fas fa-info-circle" style={{color:'#f39c12'}}></i>
                                <strong>For Actual Burial:</strong> All documents marked with <strong style={{color:'#c0392b'}}>*</strong> are required.<br />
                                <strong>For Pre-Need:</strong> Only <strong style={{color:'#3670AF'}}>Purchase Agreement</strong> and <strong style={{color:'#3670AF'}}>Valid ID</strong> are required.
                            </div>
                            <div className="modal-actions">
                                <button className="btn-cancel" onClick={() => setChecklistModalOpen(false)}>Cancel</button>
                                <button className="btn-confirm" onClick={confirmChecklistModal}>
                                    <i className="fas fa-check"></i> All Documents Complete - Process Payment
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {paymentModalOpen && lastReceipt && (
                    <div className="modal-overlay active" id="paymentModal" onClick={(e) => { if (e.target === e.currentTarget) setPaymentModalOpen(false); }}>
                        <div className="modal">
                            <div className="modal-icon" style={{color:'#27ae60'}}><i className="fas fa-check-circle"></i></div>
                            <h3>Payment Processed!</h3>
                            <p className="modal-subtitle">Receipt generated successfully</p>
                            <div style={{background:'#f8fafc',borderRadius:'12px',padding:'1rem',marginBottom:'1rem'}}>
                                <div style={{display:'flex',justifyContent:'space-between',padding:'0.2rem 0'}}><span>Receipt No.</span><strong id="receiptNumber">{lastReceipt.receiptNo}</strong></div>
                                <div style={{display:'flex',justifyContent:'space-between',padding:'0.2rem 0'}}><span>Client</span><strong id="receiptClient">{lastReceipt.client}</strong></div>
                                <div style={{display:'flex',justifyContent:'space-between',padding:'0.2rem 0'}}><span>Total Amount</span><strong id="receiptAmount">&#8369;{lastReceipt.amount.toLocaleString()}</strong></div>
                                <div style={{display:'flex',justifyContent:'space-between',padding:'0.2rem 0'}}><span>Interment Fee</span><strong id="receiptIntermentAmt">{lastReceipt.intermentAmt}</strong></div>
                                <div style={{display:'flex',justifyContent:'space-between',padding:'0.2rem 0'}}><span>Wake Space</span><strong id="receiptWakeTotal">{lastReceipt.wakeTotal}</strong></div>
                                <div style={{display:'flex',justifyContent:'space-between',padding:'0.2rem 0'}}><span>Payment Plan</span><strong id="receiptPlan">{{'full': 'Full Payment', 'staggered': 'Staggered (DP + Monthly)', 'preneed': 'Pre-Need'}[lastReceipt.plan] || 'Full Payment'}</strong></div>
                                <div style={{display:'flex',justifyContent:'space-between',padding:'0.2rem 0'}}><span>Burial Type</span><strong id="receiptBurialType">{lastReceipt.burialType === 'Wake Only' ? 'Wake Only' : (lastReceipt.burialType === 'actual' ? 'Actual Burial (Ililibing na)' : 'Pre-Need (Advance Purchase)')}</strong></div>
                                <div style={{display:'flex',justifyContent:'space-between',padding:'0.2rem 0'}}><span>Discount</span><strong id="receiptDiscount">{{'none': 'None', 'pwd': 'PWD - 20%', 'senior': 'Senior - 20%'}[lastReceipt.discount] || 'None'}</strong></div>
                                <div style={{display:'flex',justifyContent:'space-between',padding:'0.2rem 0'}}><span>Burial Date</span><strong id="receiptBurialDate">{lastReceipt.burialDate}</strong></div>
                                <div style={{display:'flex',justifyContent:'space-between',padding:'0.2rem 0'}}><span>Deceased</span><strong id="receiptDeceased">{lastReceipt.deceased}</strong></div>
                                <div style={{display:'flex',justifyContent:'space-between',padding:'0.2rem 0'}}><span>Location</span><strong id="receiptLocation">{lastReceipt.location}</strong></div>
                                <div style={{display:'flex',justifyContent:'space-between',padding:'0.2rem 0'}}><span>Wake Check-in</span><strong id="receiptWakeCheckin">{lastReceipt.wakeCheckin}</strong></div>
                                <div style={{display:'flex',justifyContent:'space-between',padding:'0.2rem 0'}}><span>Wake Check-out</span><strong id="receiptWakeCheckout">{lastReceipt.wakeCheckout}</strong></div>
                                <div style={{display:'flex',justifyContent:'space-between',padding:'0.2rem 0'}}><span>Nights</span><strong id="receiptNights">{lastReceipt.nights}</strong></div>
                            </div>
                            <div className="modal-actions">
                                <button className="btn-cancel" onClick={() => setPaymentModalOpen(false)}>Close</button>
                                <button className="btn-confirm" onClick={() => window.print()}><i className="fas fa-print"></i> Print Receipt</button>
                            </div>
                        </div>
                    </div>
                )}

                <div className={`toast ${toast.type} ${toast.visible ? 'show' : ''}`} id="toast">
                    <span id="toastMessage">{toast.message}</span>
                    <button className="toast-close" onClick={() => setToast(prev => ({...prev, visible: false}))}>&times;</button>
                </div>
            </div>
        </>
    );
}
