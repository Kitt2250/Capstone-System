
import StaffTopbar from './StaffTopbar';
import React, { useEffect } from 'react';
import './pos-transactions.css';

export default function POSTransactions() {

  useEffect(() => {
    const scriptText = `
        // ================================================================
        // 1. PRODUCT DATA (with Locations)
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

        // ================================================================
        // 2. STATE
        // ================================================================
        let occupiedWakeDates = [
            { checkin: '2026-08-20', checkout: '2026-08-22' },
            { checkin: '2026-08-25', checkout: '2026-08-27' }
        ];
        let wakeBooking = { nights: 3, checkin: '', checkout: '', total: 0, available: false };
        let cart = [];
        let discountType = 'none';
        let paymentPlan = 'full';
        let burialType = 'actual';
        let discountAmount = 0;
        let grandTotal = 0;
        let isWakeOnly = false;
        let selectedClient = null;
        let selectedLocationId = null;

        // ================================================================
        // 3. MOCK CLIENTS
        // ================================================================
        const mockClients = [
            { name: 'Maria Santos', contact: '0917-123-4567', email: 'maria@email.com',
              relationship: 'Spouse', deceased: 'Juan Dela Cruz', dob: '1950-01-15', dod: '2026-08-19' },
            { name: 'Pedro Garcia', contact: '0918-234-5678', email: 'pedro@email.com',
              relationship: 'Child', deceased: 'Lourdes Garcia', dob: '1965-06-10', dod: '2026-08-18' },
            { name: 'Rosa Mendoza', contact: '0919-345-6789', email: 'rosa@email.com',
              relationship: 'Spouse', deceased: 'Felipe Mendoza', dob: '1955-03-20', dod: '2026-08-15' },
            { name: 'Ana Reyes', contact: '0920-456-7890', email: 'ana@email.com',
              relationship: 'Child', deceased: 'Alejandro Reyes', dob: '1948-11-05', dod: '2026-08-12' },
        ];

        // ================================================================
        // 4. DOCUMENTS
        // ================================================================
        const DOCUMENTS = [
            { id: 'death_cert', label: 'Death Certificate', requiredFor: 'actual' },
            { id: 'burial_permit', label: 'Burial/Transfer of Cadaver Permit', requiredFor: 'actual' },
            { id: 'transfer_permit', label: 'Transfer Permit for Bone Transfer', requiredFor: 'actual' },
            { id: 'cert_ownership', label: 'Certificate of Ownership (lot owners)', requiredFor: 'actual' },
            { id: 'valid_id', label: 'Valid ID of Payor', requiredFor: 'both' },
            { id: 'purchase_agreement', label: 'Signed Purchase Agreement', requiredFor: 'both' }
        ];
        let checklistState = {};
        DOCUMENTS.forEach(d => checklistState[d.id] = false);

        let receipts = [
            { receipt: 'OR-2026-0342', client: 'Rosa Mendoza', items: 'Installment Payment - Lot B-098', amount: 15000, date: '2026-03-15' },
            { receipt: 'OR-2026-0341', client: 'Pedro Garcia', items: 'Mausoleum Lot - C-128', amount: 85000, date: '2026-03-15' },
            { receipt: 'OR-2026-0340', client: 'Elena Santos', items: 'Columbarium - E-003', amount: 10000, date: '2026-03-14' },
            { receipt: 'OR-2026-0339', client: 'Roberto Lim', items: 'Bone Vault - D-014', amount: 45000, date: '2026-03-14' },
            { receipt: 'OR-2026-0338', client: 'Maria Cruz', items: 'Apartment Niche - B-047', amount: 30000, date: '2026-03-13' }
        ];

        // ================================================================
        // 5. CLIENT SEARCH
        // ================================================================
        window.searchClients = function() {
            const input = document.getElementById('clientSearchInput');
            const term = input.value.trim().toLowerCase();
            const resultsContainer = document.getElementById('clientSearchResults');
            if (term.length === 0 || !isWakeOnly) { resultsContainer.style.display = 'none'; return; }
            const matches = mockClients.filter(c =>
                c.name.toLowerCase().includes(term) || c.deceased.toLowerCase().includes(term)
            );
            if (matches.length === 0) {
                resultsContainer.innerHTML = '<div class="result-item" style="color:#8aaccc;cursor:default;">No clients found. Enter new client info below.</div>';
                resultsContainer.style.display = 'block';
                return;
            }
            resultsContainer.innerHTML = matches.map(c => \`
                <div class="result-item" onclick="selectClient(\${mockClients.indexOf(c)})">
                    <strong>\${c.name}</strong>
                    <div class="sub">\${c.deceased} &middot; \${c.relationship}</div>
                </div>
            \`).join('');
            resultsContainer.style.display = 'block';
        };

        window.selectClient = function(index) {
            const client = mockClients[index];
            selectedClient = client;
            document.getElementById('clientSearchInput').value = client.name;
            document.getElementById('clientSearchResults').style.display = 'none';
            document.getElementById('clientInfoBadge').textContent = 'Loaded';
            document.getElementById('clientInfoBadge').style.background = '#d5f5e3';
            document.getElementById('clientInfoBadge').style.color = '#27ae60';
            document.getElementById('clientName').value = client.name;
            document.getElementById('clientContact').value = client.contact;
            document.getElementById('clientEmail').value = client.email;
            document.getElementById('clientRelationship').value = client.relationship || '';
            document.getElementById('deceasedName').value = client.deceased || '';
            document.getElementById('deceasedDOB').value = client.dob || '';
            document.getElementById('deceasedDOD').value = client.dod || '';
            document.getElementById('deceasedInfoBadge').textContent = 'Loaded';
            document.getElementById('deceasedInfoBadge').style.background = '#d5f5e3';
            document.getElementById('deceasedInfoBadge').style.color = '#27ae60';
            ['clientName','clientContact','clientEmail','clientRelationship','deceasedName','deceasedDOB','deceasedDOD'].forEach(id => {
                document.getElementById(id).disabled = true;
            });
            showToast('\\u2705 Client loaded: ' + client.name, 'success');
        };

        window.enableClientEditing = function() {
            ['clientName','clientContact','clientEmail','clientRelationship','deceasedName','deceasedDOB','deceasedDOD'].forEach(id => {
                document.getElementById(id).disabled = false;
            });
            document.getElementById('clientInfoBadge').textContent = 'New';
            document.getElementById('clientInfoBadge').style.background = '#f0f2f5';
            document.getElementById('clientInfoBadge').style.color = '#7a9fbe';
            document.getElementById('deceasedInfoBadge').textContent = 'Required';
            document.getElementById('deceasedInfoBadge').style.background = '#f0f2f5';
            document.getElementById('deceasedInfoBadge').style.color = '#7a9fbe';
            selectedClient = null;
            document.getElementById('clientSearchInput').value = '';
        };

        // ================================================================
        // 6. WAKE BOOKING
        // ================================================================
        window.openWakeBookingModal = function() {
            wakeBooking.nights = 3;
            document.getElementById('wakeNightsInput').value = 3;
            const today = new Date().toISOString().slice(0, 10);
            document.getElementById('wakeCheckinInput').value = today;
            document.getElementById('wakeCheckinInput').min = today;
            wakeBooking.checkin = today;
            updateWakeBooking();
            openModal('wakeModal');
        };

        window.adjustNights = function(delta) {
            const input = document.getElementById('wakeNightsInput');
            let val = Math.max(1, Math.min(30, (parseInt(input.value) || 1) + delta));
            input.value = val;
            updateWakeBooking();
        };

        window.updateWakeBooking = function() {
            const nights = parseInt(document.getElementById('wakeNightsInput').value) || 1;
            const checkin = document.getElementById('wakeCheckinInput').value;
            if (!checkin) {
                document.getElementById('wakeSummaryCheckin').textContent = '\\u2014';
                document.getElementById('wakeSummaryCheckout').textContent = '\\u2014';
                document.getElementById('wakeSummaryNights').textContent = '0';
                document.getElementById('wakeSummaryTotal').textContent = '\\u20b10.00';
                document.getElementById('wakeAvailabilityStatus').className = 'wake-availability-status';
                document.getElementById('wakeAvailabilityStatus').innerHTML = '<i class="fas fa-info-circle"></i> Please select check-in date';
                document.getElementById('wakeBookBtn').disabled = true;
                return;
            }
            const checkinDate = new Date(checkin);
            const checkoutDate = new Date(checkinDate);
            checkoutDate.setDate(checkoutDate.getDate() + nights);
            const checkoutStr = checkoutDate.toISOString().slice(0, 10);
            document.getElementById('wakeCheckoutInput').value = checkoutStr;
            document.getElementById('wakeSummaryCheckin').textContent = formatDate(checkin);
            document.getElementById('wakeSummaryCheckout').textContent = formatDate(checkoutStr);
            document.getElementById('wakeSummaryNights').textContent = nights;
            const total = nights * 1500;
            document.getElementById('wakeSummaryTotal').textContent = '\\u20b1' + total.toLocaleString();
            const available = checkWakeAvailability(checkin, checkoutStr);
            const statusEl = document.getElementById('wakeAvailabilityStatus');
            const bookBtn = document.getElementById('wakeBookBtn');
            if (available) {
                statusEl.className = 'wake-availability-status available';
                statusEl.innerHTML = '<i class="fas fa-check-circle"></i> Wake space is AVAILABLE for these dates';
                bookBtn.disabled = false;
                wakeBooking.available = true;
            } else {
                statusEl.className = 'wake-availability-status unavailable';
                statusEl.innerHTML = '<i class="fas fa-times-circle"></i> Wake space is OCCUPIED for these dates. Please choose different dates.';
                bookBtn.disabled = true;
                wakeBooking.available = false;
            }
            wakeBooking.nights = nights;
            wakeBooking.checkin = checkin;
            wakeBooking.checkout = checkoutStr;
            wakeBooking.total = total;
        };

        function checkWakeAvailability(checkin, checkout) {
            if (!checkin || !checkout) return true;
            const rIn = new Date(checkin), rOut = new Date(checkout);
            for (let b of occupiedWakeDates) {
                if (rIn < new Date(b.checkout) && rOut > new Date(b.checkin)) return false;
            }
            return true;
        }

        window.checkWakeAvailability = checkWakeAvailability;

        function formatDate(dateStr) {
            if (!dateStr) return '\\u2014';
            return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        }
        window.formatDate = formatDate;

        window.confirmWakeBooking = function() {
            if (!wakeBooking.available || !wakeBooking.checkin) {
                showToast('\\u26a0\\ufe0f Please select available dates.', 'warning'); return;
            }
            occupiedWakeDates.push({ checkin: wakeBooking.checkin, checkout: wakeBooking.checkout });
            const total = wakeBooking.nights * 1500;
            const existingWake = cart.find(item => item.name === 'Wake Space');
            if (existingWake) {
                existingWake.qty += wakeBooking.nights;
                existingWake.total += total;
                existingWake.metadata = { checkin: wakeBooking.checkin, checkout: wakeBooking.checkout, nights: wakeBooking.nights };
            } else {
                cart.push({ name: 'Wake Space', displayName: 'Wake Space', qty: wakeBooking.nights, total, unitPrice: 1500,
                    metadata: { checkin: wakeBooking.checkin, checkout: wakeBooking.checkout, nights: wakeBooking.nights } });
            }
            closeModal('wakeModal');
            renderCart();
            checkWakeOnly();
            showToast('\\u2705 Wake Space booked for ' + wakeBooking.nights + ' night(s)', 'success');
        };

        // ================================================================
        // 7. BURIAL TYPE & UI STATE
        // ================================================================
        window.updateBurialType = function() {
            document.querySelectorAll('input[name="burialType"]').forEach(r => { if (r.checked) burialType = r.value; });
            const hasHeroes = cart.some(item => item.name === 'Heroes Buried');
            if (hasHeroes && burialType === 'actual') {
                showToast('\\u26a0\\ufe0f Heroes Buried is only available for Pre-Need.', 'warning');
                document.querySelector('input[name="burialType"][value="preneed"]').checked = true;
                burialType = 'preneed';
            }
            updateBurialTypeAvailability();
            updateEligibilityNote();
            updateChecklistRequirements();
            updateDatePickers();
            updateDeceasedInfo();
            updateTotals();
        };

        window.updateBurialTypeAvailability = function() {
            const actualRadio = document.querySelector('input[name="burialType"][value="actual"]');
            let disabled = false;
            cart.forEach(item => {
                const p = PRODUCTS[item.name];
                if (p && p.category === 'lot' && p.availableForActual === false) disabled = true;
            });
            actualRadio.disabled = disabled;
            document.getElementById('actualLabel').classList.toggle('disabled', disabled);
            if (disabled && actualRadio.checked) {
                document.querySelector('input[name="burialType"][value="preneed"]').checked = true;
                burialType = 'preneed';
            }
        };

        window.updateChecklistRequirements = function() {
            const grid = document.getElementById('checklistGrid');
            grid.querySelectorAll('.checklist-item').forEach((item, index) => {
                const doc = DOCUMENTS[index];
                const label = item.querySelector('label');
                if (!doc) return;
                let rHtml = burialType === 'actual'
                    ? (doc.requiredFor === 'actual' || doc.requiredFor === 'both' ? '<span class="required">*</span>' : '<span class="optional">(optional)</span>')
                    : (doc.requiredFor === 'both' ? '<span class="required">*</span>' : '<span class="optional">(optional)</span>');
                label.innerHTML = doc.label + ' ' + rHtml;
            });
            updateChecklist();
        };

        window.updateEligibilityNote = function() {
            const note = document.getElementById('eligibilityNote');
            const lotKeys = Object.keys(PRODUCTS).filter(k => PRODUCTS[k].category === 'lot');
            const hasLot = cart.some(item => lotKeys.includes(item.name));
            if (cart.length === 0) {
                note.innerHTML = '<i class="fas fa-info-circle"></i> Add items to cart to see payment eligibility';
                note.className = 'eligibility-note'; return;
            }
            if (!hasLot) {
                note.innerHTML = '<i class="fas fa-info-circle"></i> No grave lot selected. Only Wake Space rental. Payment plan options limited.';
                note.className = 'eligibility-note warning'; return;
            }
            let staggeredAllowed = true, warnings = [];
            cart.forEach(item => {
                const p = PRODUCTS[item.name];
                if (p && p.category === 'lot') {
                    if (p.staggeredAllowed === 'preneed' && burialType === 'actual') { staggeredAllowed = false; warnings.push(item.name + ' cannot use Staggered for Actual Burial'); }
                    if (p.staggeredAllowed === 'none') { staggeredAllowed = false; warnings.push(item.name + ' does not support Staggered'); }
                    if (p.availableForActual === false && burialType === 'actual') { staggeredAllowed = false; warnings.push(item.name + ' is not available for Actual Burial'); }
                }
            });
            if (!staggeredAllowed) {
                note.innerHTML = '<i class="fas fa-exclamation-triangle"></i> ' + warnings.join('. ') + '. Switch to "Full Payment" or "Pre-Need" plan.';
                note.className = 'eligibility-note error';
                if (document.getElementById('paymentPlan').value === 'staggered') { document.getElementById('paymentPlan').value = 'full'; updateTotals(); }
                document.getElementById('paymentPlan').disabled = true;
            } else {
                note.innerHTML = '<i class="fas fa-check-circle"></i> Staggered payment is available for this selection.';
                note.className = 'eligibility-note';
                document.getElementById('paymentPlan').disabled = false;
            }
        };

        window.updateDatePickers = function() {
            const lotKeys = Object.keys(PRODUCTS).filter(k => PRODUCTS[k].category === 'lot');
            const hasLot = cart.some(item => lotKeys.includes(item.name));
            const burialGroup = document.getElementById('burialDateGroup');
            const label = document.getElementById('dateLabel');
            if (hasLot) {
                burialGroup.style.display = 'block';
                label.textContent = burialType === 'actual' ? '\\ud83d\\udcc5 Burial Date (Required)' : '\\ud83d\\udcc5 Purchase Date (Pre-Need)';
                document.getElementById('burialDate').required = burialType === 'actual';
            } else {
                burialGroup.style.display = cart.length === 0 ? 'block' : 'none';
                if (cart.length === 0) { label.textContent = '\\ud83d\\udcc5 Burial Date (for actual burial)'; document.getElementById('burialDate').required = false; }
            }
        };

        window.updateDeceasedInfo = function() {
            const section = document.getElementById('deceasedInfoColumn');
            const lotKeys = Object.keys(PRODUCTS).filter(k => PRODUCTS[k].category === 'lot');
            const hasLot = cart.some(item => lotKeys.includes(item.name));
            if ((burialType === 'actual' && hasLot) || isWakeOnly) {
                section.style.display = 'block';
                document.getElementById('deceasedInfoBadge').textContent = isWakeOnly ? 'For Wake' : 'Required';
                document.getElementById('deceasedInfoBadge').style.background = isWakeOnly ? '#fef9e7' : '#f0f2f5';
                document.getElementById('deceasedInfoBadge').style.color = isWakeOnly ? '#f39c12' : '#7a9fbe';
            } else {
                section.style.display = 'none';
            }
        };

        // ================================================================
        // 8. WAKE-ONLY CHECK
        // ================================================================
        window.checkWakeOnly = function() {
            const lotKeys = Object.keys(PRODUCTS).filter(k => PRODUCTS[k].category === 'lot');
            const hasLot = cart.some(item => lotKeys.includes(item.name));
            const hasWake = cart.some(item => item.name === 'Wake Space');
            isWakeOnly = hasWake && !hasLot;

            const searchWrapper = document.getElementById('clientSearchWrapper');
            if (isWakeOnly) {
                searchWrapper.style.display = 'block';
                document.getElementById('clientSearchInput').placeholder = 'Search client by name or deceased...';
            } else {
                searchWrapper.style.display = 'none';
                document.getElementById('clientSearchResults').style.display = 'none';
                if (!selectedClient) enableClientEditing();
            }

            document.querySelectorAll('.hide-when-wake-only').forEach(el => el.classList.toggle('hidden', isWakeOnly));

            updateDeceasedInfo();

            if (isWakeOnly) {
                document.getElementById('eligibilityNote').innerHTML = '<i class="fas fa-info-circle"></i> Wake Space rental only. No burial documents required.';
                document.getElementById('eligibilityNote').className = 'eligibility-note';
                document.getElementById('datePickerPanel').style.display = 'block';
                document.getElementById('dateLabel').textContent = '\\ud83d\\udcc5 Wake Check-in Date';
            } else {
                updateEligibilityNote();
                document.getElementById('datePickerPanel').style.display = hasLot ? 'block' : 'none';
                if (hasLot) {
                    document.getElementById('dateLabel').textContent = burialType === 'actual' ? '\\ud83d\\udcc5 Burial Date (Required)' : '\\ud83d\\udcc5 Purchase Date (Pre-Need)';
                }
            }

            updateDatePickers();
            renderModalChecklist();
        };

        // ================================================================
        // 9. RENDER PRODUCTS
        // ================================================================
        window.renderProducts = function() {
            const tbody = document.getElementById('productTableBody');
            const lotKeys = Object.keys(PRODUCTS).filter(k => PRODUCTS[k].category === 'lot');
            tbody.innerHTML = lotKeys.map(key => {
                const p = PRODUCTS[key];
                const isSoldOut = !p.available || p.availableSlots === 0;
                const availClass = isSoldOut ? 'sold-out' : 'available';
                return \`
                    <tr>
                        <td><div class="product-name-cell"><i class="fas \${p.icon}"></i> \${key}</div></td>
                        <td style="text-align:right;" class="product-price-cell">&#8369;\${p.price.toLocaleString()}</td>
                        <td style="text-align:center;" class="product-avail-cell \${availClass}">
                            \${isSoldOut ? '&#10060; Sold Out' : '&#9989; ' + p.availableSlots}
                        </td>
                        <td style="text-align:center;">
                            <button class="btn-add-sm" onclick="openAddItemModal('\${key}')" \${isSoldOut ? 'disabled' : ''}>+ Add</button>
                        </td>
                    </tr>
                \`;
            }).join('');
            updateWakeAvailabilityDisplay();
        };

        window.updateWakeAvailabilityDisplay = function() {
            const w = PRODUCTS['Wake Space'];
            const el = document.getElementById('wakeAvailStatus');
            if (w.availableSlots <= 0) {
                el.className = 'wake-avail sold-out';
                el.textContent = '\\u274c Fully Booked';
            } else {
                const now = new Date();
                const futureBookings = occupiedWakeDates.filter(b => new Date(b.checkout) >= now);
                const available = Math.max(0, 1 - futureBookings.length);
                el.className = 'wake-avail' + (available > 0 ? ' available' : ' sold-out');
                el.textContent = available > 0 ? ('\\u2705 ' + available + ' available') : '\\u274c Fully Booked';
                w.availableSlots = available;
            }
        };

        // ================================================================
        // 10. CHECKLIST RENDER
        // ================================================================
        window.renderChecklist = function() {
            const grid = document.getElementById('checklistGrid');
            grid.innerHTML = DOCUMENTS.map(doc => {
                const checked = checklistState[doc.id] ? 'checked' : '';
                let rHtml = burialType === 'actual'
                    ? (doc.requiredFor === 'actual' || doc.requiredFor === 'both' ? '<span class="required">*</span>' : '<span class="optional">(optional)</span>')
                    : (doc.requiredFor === 'both' ? '<span class="required">*</span>' : '<span class="optional">(optional)</span>');
                return \`
                    <div class="checklist-item">
                        <input type="checkbox" id="check_\${doc.id}" \${checked} onchange="updateChecklist()" />
                        <label for="check_\${doc.id}">\${doc.label} \${rHtml}</label>
                    </div>
                \`;
            }).join('');
            updateChecklist();
        };

        window.updateChecklist = function() {
            let checked = 0;
            DOCUMENTS.forEach(doc => {
                const el = document.getElementById('check_' + doc.id);
                if (el && el.checked) { checklistState[doc.id] = true; checked++; }
                else checklistState[doc.id] = false;
            });
            const progress = (checked / DOCUMENTS.length) * 100;
            document.getElementById('checklistStatus').textContent = checked + ' of ' + DOCUMENTS.length + ' completed';
            document.getElementById('checklistProgress').style.width = progress + '%';
        };

        window.renderModalChecklist = function() {
            const container = document.getElementById('modalChecklist');
            if (isWakeOnly) {
                container.innerHTML = '<div style="grid-column:span 2;text-align:center;color:#8aaccc;padding:0.5rem 0;"><i class="fas fa-info-circle"></i> No documents required for Wake Space rental only.</div>';
                return;
            }
            container.innerHTML = DOCUMENTS.map(doc => {
                const checked = checklistState[doc.id] ? 'checked' : '';
                let rHtml = burialType === 'actual'
                    ? (doc.requiredFor === 'actual' || doc.requiredFor === 'both' ? '<span class="required">*</span>' : '<span class="optional">(optional)</span>')
                    : (doc.requiredFor === 'both' ? '<span class="required">*</span>' : '<span class="optional">(optional)</span>');
                return \`
                    <div class="check-item">
                        <input type="checkbox" id="modal_check_\${doc.id}" \${checked} onchange="updateModalChecklist()" />
                        <label for="modal_check_\${doc.id}">\${doc.label} \${rHtml}</label>
                    </div>
                \`;
            }).join('');
        };

        window.updateModalChecklist = function() {
            DOCUMENTS.forEach(doc => {
                const el = document.getElementById('modal_check_' + doc.id);
                if (el) checklistState[doc.id] = el.checked;
            });
            DOCUMENTS.forEach(doc => {
                const mainEl = document.getElementById('check_' + doc.id);
                if (mainEl) mainEl.checked = checklistState[doc.id];
            });
            updateChecklist();
        };

        // ================================================================
        // 11. ADD ITEM MODAL
        // ================================================================
        window.openAddItemModal = function(preSelected) {
            const select = document.getElementById('modalProduct');
            const lotKeys = Object.keys(PRODUCTS).filter(k => PRODUCTS[k].category === 'lot');
            select.innerHTML = lotKeys.map(k => \`<option value="\${k}">\${k} - &#8369;\${PRODUCTS[k].price.toLocaleString()}</option>\`).join('');
            if (preSelected) select.value = preSelected;
            document.getElementById('modalQty').value = 1;
            selectedLocationId = null;
            updateLocationOptions();
            openModal('addItemModal');
        };

        window.updateLocationOptions = function() {
            const product = document.getElementById('modalProduct').value;
            const p = PRODUCTS[product];
            const grid = document.getElementById('locationGrid');

            if (!p.locations || p.locations.length === 0) {
                grid.innerHTML = '<div style="padding:0.5rem;text-align:center;color:#8aaccc;font-size:0.8rem;grid-column:span 2;"><i class="fas fa-info-circle"></i> No locations available for this type</div>';
                selectedLocationId = null;
            } else {
                const available = p.locations.filter(l => l.status === 'Available');
                if (available.length === 0) {
                    grid.innerHTML = '<div style="padding:0.5rem;text-align:center;color:#c0392b;font-size:0.8rem;grid-column:span 2;"><i class="fas fa-exclamation-triangle"></i> No available locations for this type</div>';
                    selectedLocationId = null;
                } else {
                    grid.innerHTML = available.map(loc => \`
                        <div class="location-option" onclick="selectLocation('\${loc.id}')">
                            <input type="radio" name="selectedLocation" value="\${loc.id}" id="loc_\${loc.id}" />
                            <label for="loc_\${loc.id}" style="cursor:pointer;display:flex;align-items:center;gap:4px;flex-wrap:wrap;width:100%;">
                                <span class="loc-id">\${loc.id}</span>
                                <span class="loc-detail">\${loc.block} &middot; \${loc.zone}</span>
                                <span class="loc-detail">\${loc.level}</span>
                                <span class="loc-status available">&#9679; Available</span>
                            </label>
                        </div>
                    \`).join('');
                    const firstRadio = grid.querySelector('input[type="radio"]');
                    if (firstRadio) { firstRadio.checked = true; selectedLocationId = firstRadio.value; }
                }
            }

            const intermentSelect = document.getElementById('modalInterment');
            intermentSelect.innerHTML = '';
            if (p.intermentFresh > 0) intermentSelect.innerHTML += \`<option value="fresh">Fresh Burial - &#8369;\${p.intermentFresh.toLocaleString()} \${p.intermentLabel && p.intermentLabel.includes('Mock') ? '\\u26a0\\ufe0f Mock' : ''}</option>\`;
            if (p.intermentBones > 0) intermentSelect.innerHTML += \`<option value="bones">Bone Transfer - &#8369;\${p.intermentBones.toLocaleString()} \${p.intermentLabel && p.intermentLabel.includes('Mock') ? '\\u26a0\\ufe0f Mock' : ''}</option>\`;
            if (!intermentSelect.innerHTML) intermentSelect.innerHTML = '<option value="none">No interment fee required</option>';

            document.getElementById('borrowingGroup').style.display = (product === 'Columbarium') ? 'block' : 'none';
        };

        window.selectLocation = function(id) {
            selectedLocationId = id;
            document.querySelectorAll('#locationGrid input[type="radio"]').forEach(r => { if (r.value === id) r.checked = true; });
        };

        window.confirmAddItem = function() {
            const baseName = document.getElementById('modalProduct').value;
            const p = PRODUCTS[baseName];
            const qty = parseInt(document.getElementById('modalQty').value) || 1;
            let intermentFee = 0, intermentLabel = '';
            const intermentVal = document.getElementById('modalInterment').value;
            if (intermentVal === 'fresh' && p.intermentFresh > 0) { intermentFee = p.intermentFresh; intermentLabel = 'Fresh'; }
            else if (intermentVal === 'bones' && p.intermentBones > 0) { intermentFee = p.intermentBones; intermentLabel = 'Bones'; }

            const selectedRadio = document.querySelector('#locationGrid input[type="radio"]:checked');
            const locationId = selectedRadio ? selectedRadio.value : null;
            let locationData = locationId && p.locations ? p.locations.find(l => l.id === locationId) : null;

            if (p.locations && p.locations.length > 0 && !locationData) {
                showToast('\\u26a0\\ufe0f Please select a location.', 'warning'); return;
            }
            if (p.category === 'lot') {
                if (selectedClient) enableClientEditing();
                document.getElementById('clientSearchWrapper').style.display = 'none';
            }

            const displayName = intermentLabel ? baseName + ' (' + intermentLabel + ')' : baseName;
            const unitPrice = p.price + intermentFee;
            const cartItem = { name: baseName, displayName, qty, unitPrice, total: unitPrice * qty,
                intermentLabel, intermentFee, basePrice: p.price, location: locationData || null };
            const existing = cart.find(item => item.displayName === displayName);
            if (existing) { existing.qty += qty; existing.total = existing.qty * unitPrice; }
            else cart.push(cartItem);

            closeModal('addItemModal');
            renderCart();
            checkWakeOnly();
            updateBurialTypeAvailability();
            updateEligibilityNote();
            updateDatePickers();
            updateDeceasedInfo();
            showToast('\\u2705 Added ' + displayName, 'success');
        };

        // ================================================================
        // 12. CART
        // ================================================================
        window.removeFromCart = function(index) {
            const removed = cart[index];
            if (removed.name === 'Wake Space' && removed.metadata) {
                const idx = occupiedWakeDates.findIndex(b => b.checkin === removed.metadata.checkin && b.checkout === removed.metadata.checkout);
                if (idx !== -1) occupiedWakeDates.splice(idx, 1);
            }
            cart.splice(index, 1);
            renderCart();
            checkWakeOnly();
            updateBurialTypeAvailability();
            updateEligibilityNote();
            updateDatePickers();
            updateDeceasedInfo();
            updateWakeAvailabilityDisplay();
            showToast('\\ud83d\\uddd1\\ufe0f Removed ' + removed.displayName, 'info');
        };

        window.renderCart = function() {
            const tbody = document.getElementById('cartBody');
            if (cart.length === 0) {
                tbody.innerHTML = '<tr><td colspan="4" class="empty-msg">No items added yet</td></tr>';
                document.getElementById('cartItemCount').textContent = '0 items';
            } else {
                tbody.innerHTML = cart.map((item, idx) => {
                    let extraInfo = '';
                    let locationHtml = '';
                    if (item.name === 'Wake Space' && item.metadata) {
                        extraInfo = ' (' + formatDate(item.metadata.checkin) + ' \\u2192 ' + formatDate(item.metadata.checkout) + ')';
                    }
                    if (item.location) {
                        locationHtml = \`
                            <div class="cart-location">
                                <i class="fas fa-map-pin"></i>
                                <span class="location-id">\${item.location.id}</span>
                                <span class="location-detail">\${item.location.block} &middot; \${item.location.zone}</span>
                                <span class="location-detail">\${item.location.level}</span>
                                <button class="btn-map-sm" onclick="viewOnMap('\${item.location.id}')">
                                    <i class="fas fa-map-marked-alt"></i> View Map
                                </button>
                            </div>
                        \`;
                    }
                    return \`
                        <tr>
                            <td>\${item.displayName}\${extraInfo}\${locationHtml}</td>
                            <td style="text-align:center;">\${item.qty}</td>
                            <td style="text-align:right;font-weight:600;">&#8369;\${item.total.toLocaleString()}</td>
                            <td style="text-align:center;">
                                <button class="btn-remove" onclick="removeFromCart(\${idx})"><i class="fas fa-times"></i></button>
                            </td>
                        </tr>
                    \`;
                }).join('');
                document.getElementById('cartItemCount').textContent = cart.reduce((s, i) => s + i.qty, 0) + ' items';
            }
            updateTotals();
        };

        // ================================================================
        // 13. VIEW ON MAP
        // ================================================================
        window.viewOnMap = function(locationId) {
            let found = null, foundProduct = null;
            for (const [productName, product] of Object.entries(PRODUCTS)) {
                if (product.locations) {
                    const loc = product.locations.find(l => l.id === locationId);
                    if (loc) { found = loc; foundProduct = productName; break; }
                }
            }
            if (found) {
                showToast('\\ud83d\\uddfa\\ufe0f Opening map view for ' + foundProduct + ' ' + found.id, 'info');
                setTimeout(() => showToast('\\ud83d\\udccd Location: ' + found.id + ' \\u00b7 ' + found.block + ' \\u00b7 ' + found.zone + ' \\u00b7 ' + found.level, 'success'), 800);
            } else {
                showToast('\\u26a0\\ufe0f Location ' + locationId + ' not found.', 'warning');
            }
        };

        // ================================================================
        // 14. TOTALS
        // ================================================================
        window.updateTotals = function() {
            let subtotal = 0, intermentTotal = 0, wakeTotalCart = 0;
            cart.forEach(item => {
                subtotal += item.total;
                if (item.intermentFee) intermentTotal += item.intermentFee * item.qty;
                if (item.name === 'Wake Space') wakeTotalCart += item.total;
            });
            document.getElementById('wakeSubtotalDisplay').textContent = wakeTotalCart > 0 ? '\\u20b1' + wakeTotalCart.toLocaleString() : '\\u20b10.00';
            document.getElementById('intermentDisplay').textContent = intermentTotal > 0 ? '\\u20b1' + intermentTotal.toLocaleString() : '\\u20b10.00';

            discountType = document.getElementById('discountType').value;
            let discount = discountType !== 'none' ? subtotal * 0.20 : 0;
            discountAmount = discount;
            paymentPlan = document.getElementById('paymentPlan').value;

            let total = subtotal - discount, dpAmount = 0, monthlyAmount = 0;
            let hasDPItem = false, totalDP = 0, totalMonthly = 0;
            cart.forEach(item => {
                const p = PRODUCTS[item.name];
                if (p && p.dpPercent > 0 && p.category === 'lot') {
                    let allowed = true;
                    if (p.staggeredAllowed === 'none') allowed = false;
                    if (p.staggeredAllowed === 'preneed' && burialType === 'actual') allowed = false;
                    if (p.availableForActual === false && burialType === 'actual') allowed = false;
                    if (allowed) {
                        hasDPItem = true;
                        const dp = item.total * (p.dpPercent / 100);
                        totalDP += dp;
                        if (p.monthly > 0) totalMonthly += (item.total - dp) / 12;
                    }
                }
            });
            if (paymentPlan === 'staggered' && hasDPItem) { dpAmount = totalDP; monthlyAmount = totalMonthly; total = dpAmount; }
            grandTotal = total;

            document.getElementById('subtotalDisplay').textContent = '\\u20b1' + subtotal.toLocaleString();
            document.getElementById('discountDisplay').textContent = discount > 0 ? '- \\u20b1' + discount.toLocaleString() : '\\u20b10.00';
            document.getElementById('dpDisplay').textContent = dpAmount > 0 ? '\\u20b1' + dpAmount.toLocaleString() : '\\u20b10.00';
            document.getElementById('monthlyDisplay').textContent = monthlyAmount > 0 ? '\\u20b1' + monthlyAmount.toLocaleString() + '/mo (12 mos)' : '\\u20b10.00';
            document.getElementById('grandTotalDisplay').textContent = '\\u20b1' + total.toLocaleString();
            computeChange();
        };

        window.computeChange = function() {
            const total = parseFloat(document.getElementById('grandTotalDisplay').textContent.replace(/[\\u20b1,]/g, '')) || 0;
            const tendered = parseFloat(document.getElementById('amountTendered').value) || 0;
            document.getElementById('changeDisplay').textContent = tendered >= total ? '\\u20b1' + (tendered - total).toLocaleString() : '\\u20b10.00';
        };

        // ================================================================
        // 15. CHECKLIST MODAL & PAYMENT FLOW
        // ================================================================
        window.openChecklistModal = function() {
            if (cart.length === 0) { showToast('\\u26a0\\ufe0f Cart is empty. Add items first.', 'warning'); return; }
            if (isWakeOnly) { processPayment(); return; }
            renderModalChecklist();
            openModal('checklistModal');
        };

        window.confirmChecklist = function() {
            let requiredDocs = DOCUMENTS.filter(doc =>
                burialType === 'actual' ? (doc.requiredFor === 'actual' || doc.requiredFor === 'both') : doc.requiredFor === 'both'
            );
            let missing = [];
            requiredDocs.forEach(doc => {
                const el = document.getElementById('modal_check_' + doc.id);
                if (!el || !el.checked) missing.push(doc.label);
            });
            if (missing.length) { showToast('\\u26a0\\ufe0f Please complete: ' + missing.join(', '), 'warning'); return; }
            closeModal('checklistModal');
            processPayment();
        };

        // ================================================================
        // 16. PROCESS PAYMENT
        // ================================================================
        window.processPayment = function() {
            if (cart.length === 0) { showToast('\\u26a0\\ufe0f Cart is empty. Add items first.', 'warning'); return; }
            if (!isWakeOnly) {
                let requiredDocs = DOCUMENTS.filter(doc =>
                    burialType === 'actual' ? (doc.requiredFor === 'actual' || doc.requiredFor === 'both') : doc.requiredFor === 'both'
                );
                if (requiredDocs.some(doc => !checklistState[doc.id])) {
                    showToast('\\u26a0\\ufe0f Please complete all required documents first.', 'warning'); return;
                }
            }
            const total = parseFloat(document.getElementById('grandTotalDisplay').textContent.replace(/[\\u20b1,]/g, '')) || 0;
            const tendered = parseFloat(document.getElementById('amountTendered').value) || 0;
            if (tendered < total) { showToast('\\u26a0\\ufe0f Amount tendered is less than total due.', 'warning'); return; }

            const clientName = document.getElementById('clientName').value.trim() || 'Walk-in';
            const burialDate = document.getElementById('burialDate').value || 'N/A';
            const deceasedName = document.getElementById('deceasedName').value.trim() || 'N/A';

            let locationInfo = 'N/A';
            const lotItem = cart.find(item => item.location);
            if (lotItem && lotItem.location) {
                locationInfo = lotItem.location.id + ' \\u00b7 ' + lotItem.location.block + ' \\u00b7 ' + lotItem.location.zone + ' \\u00b7 ' + lotItem.location.level;
            }

            let wakeCheckin = 'N/A', wakeCheckout = 'N/A', wakeNightsTotal = 0;
            const wakeInfo = cart.find(item => item.name === 'Wake Space');
            if (wakeInfo && wakeInfo.metadata) {
                wakeCheckin = wakeInfo.metadata.checkin || 'N/A';
                wakeCheckout = wakeInfo.metadata.checkout || 'N/A';
                wakeNightsTotal = wakeInfo.metadata.nights || 0;
            }

            // Deduct inventory & mark locations
            cart.forEach(item => {
                const p = PRODUCTS[item.name];
                if (p && p.availableSlots != null) {
                    p.availableSlots = Math.max(0, p.availableSlots - item.qty);
                    if (p.availableSlots === 0) p.available = false;
                }
                if (item.location && p && p.locations) {
                    const loc = p.locations.find(l => l.id === item.location.id);
                    if (loc) loc.status = 'Occupied';
                }
            });

            const receiptNo = 'OR-2026-' + String(Math.floor(Math.random() * 9000 + 1000));
            const itemsList = cart.map(i => i.displayName + ' (x' + i.qty + ')').join(', ');
            receipts.unshift({ receipt: receiptNo, client: clientName, items: itemsList, amount: total, date: new Date().toISOString().slice(0, 10) });

            let intermentTotal = 0;
            cart.forEach(item => { if (item.intermentFee) intermentTotal += item.intermentFee * item.qty; });
            const intermentDisplay = intermentTotal > 0 ? '\\u20b1' + intermentTotal.toLocaleString() : 'None';

            let wakeTotalDisplay = 'None';
            if (wakeInfo) wakeTotalDisplay = '\\u20b1' + wakeInfo.total.toLocaleString() + ' (' + wakeInfo.qty + ' nights, ' + formatDate(wakeInfo.metadata?.checkin) + ' \\u2192 ' + formatDate(wakeInfo.metadata?.checkout) + ')';

            // Reset
            cart = [];
            renderCart();
            ['clientName','clientContact','clientEmail','deceasedName','deceasedCause','amountTendered'].forEach(id => { document.getElementById(id).value = ''; });
            document.getElementById('clientRelationship').value = '';
            document.getElementById('deceasedDOB').value = '';
            document.getElementById('deceasedDOD').value = '';
            document.getElementById('changeDisplay').textContent = '\\u20b10.00';
            document.getElementById('clientSearchInput').value = '';
            document.getElementById('clientSearchResults').style.display = 'none';
            selectedClient = null;
            enableClientEditing();
            renderProducts();
            renderReceipts();
            checkWakeOnly();
            updateDatePickers();
            updateDeceasedInfo();

            // Populate receipt modal
            document.getElementById('receiptNumber').textContent = receiptNo;
            document.getElementById('receiptClient').textContent = clientName;
            document.getElementById('receiptAmount').textContent = '\\u20b1' + total.toLocaleString();
            document.getElementById('receiptIntermentAmt').textContent = intermentDisplay;
            document.getElementById('receiptWakeTotal').textContent = wakeTotalDisplay;
            const planLabels = { full: 'Full Payment', staggered: 'Staggered (DP + Monthly)', preneed: 'Pre-Need' };
            document.getElementById('receiptPlan').textContent = planLabels[paymentPlan] || 'Full Payment';
            const burialLabels = { actual: 'Actual Burial (Ililibing na)', preneed: 'Pre-Need (Advance Purchase)' };
            document.getElementById('receiptBurialType').textContent = isWakeOnly ? 'Wake Only' : (burialLabels[burialType] || 'Actual Burial');
            const discountLabels = { none: 'None', pwd: 'PWD - 20%', senior: 'Senior - 20%' };
            document.getElementById('receiptDiscount').textContent = discountLabels[discountType] || 'None';
            document.getElementById('receiptBurialDate').textContent = burialDate !== 'N/A' ? burialDate : 'Not set';
            document.getElementById('receiptDeceased').textContent = deceasedName !== 'N/A' ? deceasedName : 'N/A';
            document.getElementById('receiptLocation').textContent = locationInfo;
            document.getElementById('receiptWakeCheckin').textContent = wakeCheckin !== 'N/A' ? wakeCheckin : 'Not set';
            document.getElementById('receiptWakeCheckout').textContent = wakeCheckout !== 'N/A' ? wakeCheckout : 'Not set';
            document.getElementById('receiptNights').textContent = wakeNightsTotal || '0';

            openModal('paymentModal');
            showToast('\\u2705 Payment processed! Receipt ' + receiptNo, 'success');
        };

        // ================================================================
        // 17. RECEIPTS
        // ================================================================
        window.renderReceipts = function() {
            const tbody = document.getElementById('receiptsBody');
            tbody.innerHTML = receipts.slice(0, 10).map(r => \`
                <tr>
                    <td><strong>\${r.receipt}</strong></td>
                    <td>\${r.client}</td>
                    <td>\${r.items}</td>
                    <td style="text-align:right;" class="receipt-amount">&#8369;\${r.amount.toLocaleString()}</td>
                    <td>\${r.date}</td>
                </tr>
            \`).join('');
        };

        // ================================================================
        // 18. CLEAR TRANSACTION
        // ================================================================
        window.clearTransaction = function() {
            cart = [];
            renderCart();
            ['clientName','clientContact','clientEmail','deceasedName','deceasedCause','amountTendered','burialDate'].forEach(id => { document.getElementById(id).value = ''; });
            document.getElementById('clientRelationship').value = '';
            document.getElementById('deceasedDOB').value = '';
            document.getElementById('deceasedDOD').value = '';
            document.getElementById('changeDisplay').textContent = '\\u20b10.00';
            document.getElementById('discountType').value = 'none';
            document.getElementById('paymentPlan').value = 'full';
            document.getElementById('paymentPlan').disabled = false;
            document.getElementById('clientSearchInput').value = '';
            document.getElementById('clientSearchResults').style.display = 'none';
            selectedClient = null;
            enableClientEditing();
            discountType = 'none';
            paymentPlan = 'full';
            occupiedWakeDates = [
                { checkin: '2026-08-20', checkout: '2026-08-22' },
                { checkin: '2026-08-25', checkout: '2026-08-27' }
            ];
            DOCUMENTS.forEach(doc => checklistState[doc.id] = false);
            renderChecklist();
            checkWakeOnly();
            updateBurialTypeAvailability();
            updateTotals();
            updateEligibilityNote();
            updateDatePickers();
            updateDeceasedInfo();
            updateWakeAvailabilityDisplay();
            showToast('\\ud83d\\udd04 Transaction reset', 'info');
        };

        // ================================================================
        // 19. MODAL & TOAST HELPERS
        // ================================================================
        window.openModal = function(id) { document.getElementById(id).classList.add('active'); };
        window.closeModal = function(id) { document.getElementById(id).classList.remove('active'); };

        document.querySelectorAll('.modal-overlay').forEach(o => {
            o.addEventListener('click', function(e) { if (e.target === this) this.classList.remove('active'); });
        });

        window.showToast = function(msg, type = 'success') {
            const t = document.getElementById('toast');
            document.getElementById('toastMessage').textContent = msg;
            t.className = 'toast ' + type;
            t.classList.add('show');
            clearTimeout(t._timeout);
            t._timeout = setTimeout(() => t.classList.remove('show'), 3500);
        };
        window.hideToast = function() { document.getElementById('toast').classList.remove('show'); };

        // ================================================================
        // 20. DATE BADGE
        // ================================================================
        const db = document.querySelector('.pos-date-badge');
        if (db) {
            const n = new Date();
            const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
            db.innerHTML = '<i class="fas fa-calendar-alt"></i> ' + months[n.getMonth()] + ' ' + n.getFullYear();
        }

        // ================================================================
        // 21. KEYBOARD SHORTCUTS
        // ================================================================
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
            if (e.ctrlKey && e.key === 'p') { e.preventDefault(); processPayment(); }
        });

        // Click outside to close search results
        document.addEventListener('click', function(e) {
            const wrapper = document.getElementById('clientSearchWrapper');
            if (wrapper && !wrapper.contains(e.target)) document.getElementById('clientSearchResults').style.display = 'none';
        });

        // ================================================================
        // 22. INIT
        // ================================================================
        renderProducts();
        renderCart();
        renderReceipts();
        renderChecklist();
        checkWakeOnly();
        updateBurialTypeAvailability();
        updateEligibilityNote();
        updateDatePickers();
        updateDeceasedInfo();
        document.getElementById('clientName').placeholder = 'Walk-in or enter name';
        document.getElementById('burialDate').value = new Date().toISOString().slice(0, 10);
        document.getElementById('clientSearchWrapper').style.display = 'none';
        updateWakeAvailabilityDisplay();
    `;

    const script = document.createElement('script');
    script.innerHTML = '(function() { try {\n' + scriptText + '\n} catch(e) { console.error(e); } })();';
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <StaffTopbar title="POS Transactions" greeting="Process grave lot sales, wake space rentals, and payments" />
      <div className="pos-page-wrapper" style={{ padding: '0', background: 'transparent' }}
      dangerouslySetInnerHTML={{ __html: `
    <!-- ===== POS ===== -->
    <div class="pos-container">
        <!-- Header -->
        <div class="pos-header">
            <div class="pos-header-left">
                <h2><i class="fas fa-cash-register" style="color:#d4af37;margin-right:8px;"></i>New Transaction</h2>
                <p>Select products below, then complete payment details on the right</p>
            </div>
            <div class="pos-header-right">
                <button class="btn-secondary" onclick="clearTransaction()"><i class="fas fa-undo"></i> Reset</button>
            </div>
        </div>

        <!-- ===== TWO-COLUMN LAYOUT ===== -->
        <div class="pos-two-col">

            <!-- ===== LEFT ===== -->
            <div class="left-panel">

                <!-- Grave Lots Section -->
                <div class="product-list-section">
                    <div class="section-title"><i class="fas fa-tshirt"></i> Grave Lots</div>
                    <table class="product-table" id="productTable">
                        <thead>
                            <tr>
                                <th style="width:30%">Product</th>
                                <th style="width:20%; text-align:right;">Price</th>
                                <th style="width:25%; text-align:center;">Availability</th>
                                <th style="width:25%; text-align:center;">Action</th>
                            </tr>
                        </thead>
                        <tbody id="productTableBody"></tbody>
                    </table>
                </div>

                <!-- Wake Space Separator -->
                <div class="wake-separator">
                    <span><i class="fas fa-bed" style="color:#3670AF;"></i> Wake Space (Optional)</span>
                    <div class="line"></div>
                </div>

                <!-- Wake Space Section -->
                <div class="product-list-section">
                    <div class="section-title" style="color:#3670AF;"><i class="fas fa-bed"></i> Wake Space Rental</div>
                    <div class="wake-product-row">
                        <div class="wake-info">
                            <i class="fas fa-bed"></i>
                            <div>
                                <div class="wake-name">Wake Space</div>
                                <div class="wake-price">&#8369;1,500 / night</div>
                            </div>
                        </div>
                        <div style="display:flex;align-items:center;gap:0.8rem;">
                            <span class="wake-avail" id="wakeAvailStatus">&#9989; 2 available</span>
                            <button class="btn-add-sm" onclick="openWakeBookingModal()">
                                <i class="fas fa-calendar-plus"></i> Book
                            </button>
                        </div>
                    </div>
                    <div style="font-size:0.6rem;color:#8aaccc;padding:0.2rem 0.4rem;text-align:center;">
                        <i class="fas fa-info-circle"></i> Click "Book" to select check-in/out dates
                    </div>
                </div>

                <!-- Cart Section -->
                <div class="cart-section">
                    <div class="cart-title">
                        <span>&#128722; Cart</span>
                        <span class="item-count" id="cartItemCount">0 items</span>
                    </div>
                    <table class="cart-items-table" id="cartTable">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th style="text-align:center;">Qty</th>
                                <th style="text-align:right;">Total</th>
                                <th style="text-align:center;">Action</th>
                            </tr>
                        </thead>
                        <tbody id="cartBody"></tbody>
                    </table>
                </div>

            </div>

            <!-- ===== RIGHT ===== -->
            <div class="right-panel">

                <!-- Client & Payment Type -->
                <div class="panel-box" id="clientPaymentPanel">
                    <div class="client-payment-row">
                        <div class="form-group client-search-wrapper" id="clientSearchWrapper">
                            <label>Client Name</label>
                            <input type="text" id="clientSearchInput" placeholder="Search client..." oninput="searchClients()" />
                            <i class="fas fa-search search-icon"></i>
                            <div class="client-search-results" id="clientSearchResults"></div>
                        </div>
                        <div class="form-group">
                            <label>Payment Type</label>
                            <select id="paymentType">
                                <option value="Cash">Cash</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Client & Deceased Info -->
                <div class="panel-box" id="infoPanel">
                    <div class="info-side-by-side">
                        <!-- Client Info -->
                        <div class="info-column">
                            <div class="info-title">
                                <i class="fas fa-user" style="color:#d4af37;"></i> Client Information
                                <span class="badge" id="clientInfoBadge">New</span>
                            </div>
                            <div class="info-grid">
                                <div class="form-group">
                                    <label>Full Name</label>
                                    <input type="text" id="clientName" placeholder="Enter name" />
                                </div>
                                <div class="form-group">
                                    <label>Contact Number</label>
                                    <input type="text" id="clientContact" placeholder="0917-123-4567" />
                                </div>
                                <div class="form-group" style="grid-column: span 2;">
                                    <label>Email Address</label>
                                    <input type="email" id="clientEmail" placeholder="client@email.com" />
                                </div>
                                <div class="form-group" style="grid-column: span 2;">
                                    <label>Relationship to Deceased</label>
                                    <select id="clientRelationship">
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

                        <!-- Deceased Info -->
                        <div class="info-column" id="deceasedInfoColumn">
                            <div class="info-title">
                                <i class="fas fa-cross" style="color:#8e44ad;"></i> Deceased Information
                                <span class="badge" id="deceasedInfoBadge">Required</span>
                            </div>
                            <div class="info-grid">
                                <div class="form-group" style="grid-column: span 2;">
                                    <label>Full Name</label>
                                    <input type="text" id="deceasedName" placeholder="Enter full name" />
                                </div>
                                <div class="form-group">
                                    <label>Date of Birth</label>
                                    <input type="date" id="deceasedDOB" />
                                </div>
                                <div class="form-group">
                                    <label>Date of Death</label>
                                    <input type="date" id="deceasedDOD" />
                                </div>
                                <div class="form-group" style="grid-column: span 2;">
                                    <label>Cause of Death (Optional)</label>
                                    <input type="text" id="deceasedCause" placeholder="e.g., Natural causes" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Burial Type -->
                <div class="panel-box hide-when-wake-only" id="burialTypePanel">
                    <div class="burial-type-group">
                        <label id="actualLabel"><input type="radio" name="burialType" value="actual" checked onchange="updateBurialType()" /> Actual Burial (Ililibing na)</label>
                        <label id="preneedLabel"><input type="radio" name="burialType" value="preneed" onchange="updateBurialType()" /> Pre-Need (Advance Purchase)</label>
                        <span class="info-note" id="burialTypeNote"><i class="fas fa-info-circle"></i> Heroes Buried only available for Pre-Need</span>
                    </div>
                </div>

                <!-- Date Picker -->
                <div class="panel-box hide-when-wake-only" id="datePickerPanel">
                    <div class="date-picker-row">
                        <div class="form-group" id="burialDateGroup">
                            <label id="dateLabel">&#128197; Burial Date</label>
                            <input type="date" id="burialDate" />
                        </div>
                    </div>
                </div>

                <!-- Eligibility Note -->
                <div class="eligibility-note" id="eligibilityNote">
                    <i class="fas fa-info-circle"></i> Add items to cart to see payment eligibility
                </div>

                <!-- Document Checklist -->
                <div class="panel-box checklist-section hide-when-wake-only" id="checklistSection">
                    <div class="checklist-title">
                        <i class="fas fa-clipboard-list"></i> Document Requirements
                        <span style="font-size:0.6rem;color:#8aaccc;font-weight:400;">(Check when complete)</span>
                    </div>
                    <div class="checklist-grid" id="checklistGrid"></div>
                    <div class="checklist-progress">
                        <span id="checklistStatus">0 of 6 completed</span>
                        <div class="progress-track">
                            <div class="progress-bar" id="checklistProgress" style="width:0%;"></div>
                        </div>
                    </div>
                </div>

                <!-- Discount & Payment Plan -->
                <div class="panel-box">
                    <div class="discount-plan-row">
                        <div class="form-group">
                            <label>Discount Type</label>
                            <select id="discountType" onchange="updateTotals()">
                                <option value="none">None</option>
                                <option value="pwd">PWD - 20%</option>
                                <option value="senior">Senior Citizen - 20%</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Payment Plan</label>
                            <select id="paymentPlan" onchange="updateTotals()">
                                <option value="full">Full Payment (On the Spot)</option>
                                <option value="staggered">Staggered (DP + Monthly)</option>
                                <option value="preneed">Pre-Need (Advance Purchase)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Payment Summary -->
                <div class="panel-box payment-panel">
                    <h4 style="font-size:0.85rem;font-weight:600;color:#1a3d5c;margin-bottom:0.3rem;">
                        <i class="fas fa-receipt" style="color:#d4af37;"></i> Payment Summary
                    </h4>
                    <div class="summary-line">
                        <span class="label">Subtotal</span>
                        <span class="value" id="subtotalDisplay">&#8369;0.00</span>
                    </div>
                    <div class="summary-line">
                        <span class="label">Interment Fee</span>
                        <span class="value" id="intermentDisplay" style="color:#8e44ad;">&#8369;0.00</span>
                    </div>
                    <div class="summary-line">
                        <span class="label">Wake Space</span>
                        <span class="value" id="wakeSubtotalDisplay" style="color:#3670AF;">&#8369;0.00</span>
                    </div>
                    <div class="summary-line">
                        <span class="label">Discount (20%)</span>
                        <span class="value" id="discountDisplay" style="color:#27ae60;">- &#8369;0.00</span>
                    </div>
                    <div class="summary-line">
                        <span class="label">DP Required</span>
                        <span class="value" id="dpDisplay" style="color:#f39c12;">&#8369;0.00</span>
                    </div>
                    <div class="summary-line" style="border-bottom:none;">
                        <span class="label">Monthly (if staggered)</span>
                        <span class="value" id="monthlyDisplay" style="font-size:0.75rem;color:#3670AF;">&#8369;0.00</span>
                    </div>
                    <div class="summary-line total">
                        <span class="label">Total Due</span>
                        <span class="value" id="grandTotalDisplay">&#8369;0.00</span>
                    </div>
                    <div style="margin-top:0.5rem;">
                        <div class="form-group">
                            <label>Amount Tendered (Cash)</label>
                            <input type="number" id="amountTendered" placeholder="0.00" oninput="computeChange()" />
                        </div>
                        <div class="form-group">
                            <label>Change</label>
                            <div class="change-display" id="changeDisplay">&#8369;0.00</div>
                        </div>
                    </div>
                    <button class="btn-process" onclick="openChecklistModal()">
                        <i class="fas fa-check-circle"></i> Process Payment
                    </button>
                    <div style="font-size:0.6rem;color:#8aaccc;text-align:center;margin-top:0.2rem;">
                        <i class="fas fa-info-circle"></i> Cash only. Receipt will be generated.
                    </div>
                </div>

            </div>
        </div>

        <!-- Recent Receipts -->
        <div class="receipts-section">
            <h3><i class="fas fa-receipt"></i> Recent Receipts</h3>
            <div class="table-wrapper" style="border:1px solid #e8edf4;border-radius:12px;overflow-x:auto;">
                <table class="receipts-table">
                    <thead>
                        <tr>
                            <th>Receipt No.</th>
                            <th>Client</th>
                            <th>Items</th>
                            <th style="text-align:right;">Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody id="receiptsBody"></tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- FOOTER -->
    <div class="main-footer" style="margin-top:2rem;text-align:center;font-size:0.7rem;color:#8aaccc;border-top:1px solid rgba(212,175,55,0.08);padding-top:1.5rem;">
        <i class="fas fa-dove" style="color:#d4af37;margin:0 4px;"></i>
        Cherubim of Heaven Memorial Park &middot; Staff Dashboard v2.0
        <i class="fas fa-dove" style="color:#d4af37;margin:0 4px;"></i>
    </div>

    <!-- ===== WAKE BOOKING MODAL ===== -->
    <div class="modal-overlay" id="wakeModal">
        <div class="modal" style="max-width:520px;">
            <div class="modal-icon" style="color:#3670AF;"><i class="fas fa-bed"></i></div>
            <h3>Book Wake Space</h3>
            <p class="modal-subtitle">Select dates for the wake service</p>
            <div class="wake-nights-control">
                <label>Number of Nights</label>
                <div class="nights-input">
                    <button onclick="adjustNights(-1)"><i class="fas fa-minus"></i></button>
                    <input type="number" id="wakeNightsInput" value="3" min="1" max="30" onchange="updateWakeBooking()" />
                    <button onclick="adjustNights(1)"><i class="fas fa-plus"></i></button>
                </div>
            </div>
            <div class="wake-date-range">
                <div class="date-group">
                    <label><i class="fas fa-calendar-check" style="color:#3670AF;"></i> Check-in Date</label>
                    <input type="date" id="wakeCheckinInput" onchange="updateWakeBooking()" />
                </div>
                <div class="date-group">
                    <label><i class="fas fa-calendar-times" style="color:#c0392b;"></i> Check-out Date</label>
                    <input type="date" id="wakeCheckoutInput" disabled />
                </div>
            </div>
            <div class="wake-booking-summary">
                <div class="wake-row"><span class="label">Check-in</span><span class="value" id="wakeSummaryCheckin">&mdash;</span></div>
                <div class="wake-row"><span class="label">Check-out</span><span class="value" id="wakeSummaryCheckout">&mdash;</span></div>
                <div class="wake-row"><span class="label">Nights</span><span class="value" id="wakeSummaryNights">0</span></div>
                <div class="wake-row"><span class="label">Rate</span><span class="value">&#8369;1,500 / night</span></div>
                <div class="wake-row wake-total"><span class="label">Total</span><span class="value" id="wakeSummaryTotal">&#8369;0.00</span></div>
            </div>
            <div class="wake-availability-status" id="wakeAvailabilityStatus">
                <i class="fas fa-spinner fa-spin"></i> Checking availability...
            </div>
            <div class="modal-actions">
                <button class="btn-cancel" onclick="closeModal('wakeModal')">Cancel</button>
                <button class="btn-confirm" onclick="confirmWakeBooking()" id="wakeBookBtn" disabled>
                    <i class="fas fa-check"></i> Add to Cart
                </button>
            </div>
        </div>
    </div>

    <!-- ===== ADD ITEM MODAL ===== -->
    <div class="modal-overlay" id="addItemModal">
        <div class="modal" style="max-width:560px;">
            <div class="modal-icon" style="color:#d4af37;"><i class="fas fa-cart-plus"></i></div>
            <h3>Add Item</h3>
            <p class="modal-subtitle">Select grave type, location, and interment option</p>
            <div class="form-group">
                <label>Product</label>
                <select id="modalProduct" onchange="updateLocationOptions()"></select>
            </div>
            <div class="form-group">
                <label>Select Location</label>
                <div class="location-grid" id="locationGrid"></div>
            </div>
            <div class="form-group" id="intermentGroup">
                <label>Interment Type</label>
                <select id="modalInterment"></select>
            </div>
            <div class="form-group" id="qtyGroup">
                <label>Quantity</label>
                <input type="number" id="modalQty" value="1" min="1" />
            </div>
            <div class="form-group" id="borrowingGroup" style="display:none;">
                <label>Columbarium Borrowing Fee</label>
                <select id="modalBorrowing">
                    <option value="0">None</option>
                    <option value="1500">Borrowing Fee - &#8369;1,500/urn</option>
                </select>
            </div>
            <div class="modal-actions">
                <button class="btn-cancel" onclick="closeModal('addItemModal')">Cancel</button>
                <button class="btn-confirm" onclick="confirmAddItem()"><i class="fas fa-check"></i> Add to Cart</button>
            </div>
        </div>
    </div>

    <!-- ===== DOCUMENT CHECKLIST MODAL ===== -->
    <div class="modal-overlay" id="checklistModal">
        <div class="modal" style="max-width:560px;">
            <div class="modal-icon" style="color:#d4af37;"><i class="fas fa-clipboard-check"></i></div>
            <h3>Document Checklist</h3>
            <p class="modal-subtitle">Verify all required documents are complete before processing payment</p>
            <div class="modal-checklist" id="modalChecklist"></div>
            <div style="background:#fef9e7;border-left:3px solid #f39c12;padding:0.5rem 0.8rem;border-radius:6px;font-size:0.75rem;color:#7a9fbe;margin-bottom:1rem;">
                <i class="fas fa-info-circle" style="color:#f39c12;"></i>
                <strong>For Actual Burial:</strong> All documents marked with <strong style="color:#c0392b;">*</strong> are required.<br>
                <strong>For Pre-Need:</strong> Only <strong style="color:#3670AF;">Purchase Agreement</strong> and <strong style="color:#3670AF;">Valid ID</strong> are required.
            </div>
            <div class="modal-actions">
                <button class="btn-cancel" onclick="closeModal('checklistModal')">Cancel</button>
                <button class="btn-confirm" onclick="confirmChecklist()">
                    <i class="fas fa-check"></i> All Documents Complete - Process Payment
                </button>
            </div>
        </div>
    </div>

    <!-- ===== PAYMENT CONFIRMATION MODAL ===== -->
    <div class="modal-overlay" id="paymentModal">
        <div class="modal">
            <div class="modal-icon" style="color:#27ae60;"><i class="fas fa-check-circle"></i></div>
            <h3>Payment Processed!</h3>
            <p class="modal-subtitle">Receipt generated successfully</p>
            <div style="background:#f8fafc;border-radius:12px;padding:1rem;margin-bottom:1rem;">
                <div style="display:flex;justify-content:space-between;padding:0.2rem 0;"><span>Receipt No.</span><strong id="receiptNumber">OR-2026-0000</strong></div>
                <div style="display:flex;justify-content:space-between;padding:0.2rem 0;"><span>Client</span><strong id="receiptClient">-</strong></div>
                <div style="display:flex;justify-content:space-between;padding:0.2rem 0;"><span>Total Amount</span><strong id="receiptAmount">&#8369;0.00</strong></div>
                <div style="display:flex;justify-content:space-between;padding:0.2rem 0;"><span>Interment Fee</span><strong id="receiptIntermentAmt">-</strong></div>
                <div style="display:flex;justify-content:space-between;padding:0.2rem 0;"><span>Wake Space</span><strong id="receiptWakeTotal">-</strong></div>
                <div style="display:flex;justify-content:space-between;padding:0.2rem 0;"><span>Payment Plan</span><strong id="receiptPlan">-</strong></div>
                <div style="display:flex;justify-content:space-between;padding:0.2rem 0;"><span>Burial Type</span><strong id="receiptBurialType">-</strong></div>
                <div style="display:flex;justify-content:space-between;padding:0.2rem 0;"><span>Discount</span><strong id="receiptDiscount">None</strong></div>
                <div style="display:flex;justify-content:space-between;padding:0.2rem 0;"><span>Burial Date</span><strong id="receiptBurialDate">-</strong></div>
                <div style="display:flex;justify-content:space-between;padding:0.2rem 0;"><span>Deceased</span><strong id="receiptDeceased">-</strong></div>
                <div style="display:flex;justify-content:space-between;padding:0.2rem 0;"><span>Location</span><strong id="receiptLocation">-</strong></div>
                <div style="display:flex;justify-content:space-between;padding:0.2rem 0;"><span>Wake Check-in</span><strong id="receiptWakeCheckin">-</strong></div>
                <div style="display:flex;justify-content:space-between;padding:0.2rem 0;"><span>Wake Check-out</span><strong id="receiptWakeCheckout">-</strong></div>
                <div style="display:flex;justify-content:space-between;padding:0.2rem 0;"><span>Nights</span><strong id="receiptNights">0</strong></div>
            </div>
            <div class="modal-actions">
                <button class="btn-cancel" onclick="closeModal('paymentModal')">Close</button>
                <button class="btn-confirm" onclick="window.print()"><i class="fas fa-print"></i> Print Receipt</button>
            </div>
        </div>
    </div>

    <!-- ===== TOAST ===== -->
    <div class="toast" id="toast">
        <span id="toastMessage">Success!</span>
        <button class="toast-close" onclick="hideToast()">&times;</button>
    </div>
      ` }}
    />
    </>
  );
}
