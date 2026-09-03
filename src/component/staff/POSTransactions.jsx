
import React, { useEffect } from 'react';
import './pos-transactions.css';

export default function POSTransactions() {
  useEffect(() => {
    // We execute this only once per mount
    try {
      
        // ================================================================
        // 1. PRODUCT DATA (with Locations)
        // ================================================================
        const PRODUCTS = {
            'Single Niche': {
                price: 150000,
                icon: 'fa-crown',
                desc: '1x3 sqm, 2 vaults',
                category: 'lot',
                dpPercent: 50,
                monthly: 6250,
                intermentFresh: 25000,
                intermentBones: 23000,
                intermentLabel: 'Actual Price',
                available: true,
                availableSlots: 45,
                staggeredAllowed: 'both',
                availableForActual: true,
                locations: [
                    { id: 'SN-001', block: 'A', zone: 'Zone 1', level: 'Ground', status: 'Available' },
                    { id: 'SN-002', block: 'A', zone: 'Zone 1', level: 'Ground', status: 'Available' },
                    { id: 'SN-003', block: 'A', zone: 'Zone 2', level: 'Ground', status: 'Available' },
                    { id: 'SN-004', block: 'B', zone: 'Zone 1', level: 'Ground', status: 'Occupied' },
                    { id: 'SN-005', block: 'B', zone: 'Zone 1', level: 'Ground', status: 'Available' },
                ]
            },
            'Mausoleum': {
                price: 1380000,
                icon: 'fa-landmark',
                desc: '5x5 sqm, premium',
                category: 'lot',
                dpPercent: 0,
                monthly: 0,
                intermentFresh: 20,
                intermentBones: 10,
                intermentLabel: '⚠️ Mock Price',
                available: true,
                availableSlots: 12,
                staggeredAllowed: 'none',
                availableForActual: true,
                locations: [
                    { id: 'MS-001', block: 'C', zone: 'Zone 1', level: 'Ground', status: 'Available' },
                    { id: 'MS-002', block: 'C', zone: 'Zone 1', level: 'Ground', status: 'Reserved' },
                    { id: 'MS-003', block: 'C', zone: 'Zone 2', level: 'Ground', status: 'Available' },
                ]
            },
            'Columbarium': {
                price: 80000,
                icon: 'fa-dove',
                desc: 'Urn niche, 20-yr renewable',
                category: 'lot',
                dpPercent: 0,
                monthly: 0,
                intermentFresh: 10000,
                intermentBones: 0,
                intermentLabel: 'Actual Price',
                available: true,
                availableSlots: 38,
                staggeredAllowed: 'none',
                availableForActual: true,
                locations: [
                    { id: 'CL-001', block: 'D', zone: 'Zone 1', level: '1st Floor', status: 'Available' },
                    { id: 'CL-002', block: 'D', zone: 'Zone 1', level: '1st Floor', status: 'Available' },
                    { id: 'CL-003', block: 'D', zone: 'Zone 1', level: '2nd Floor', status: 'Available' },
                    { id: 'CL-004', block: 'D', zone: 'Zone 2', level: '1st Floor', status: 'Occupied' },
                    { id: 'CL-005', block: 'D', zone: 'Zone 2', level: '2nd Floor', status: 'Available' },
                ]
            },
            'Apartment': {
                price: 38000,
                icon: 'fa-building',
                desc: '3 cum, 7-yr renewable',
                category: 'lot',
                dpPercent: 0,
                monthly: 0,
                intermentFresh: 20,
                intermentBones: 10,
                intermentLabel: '⚠️ Mock Price',
                available: true,
                availableSlots: 56,
                staggeredAllowed: 'none',
                availableForActual: true,
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
                price: 30000,
                icon: 'fa-box',
                desc: 'Bone storage, 10-yr renewable',
                category: 'lot',
                dpPercent: 0,
                monthly: 0,
                intermentFresh: 20,
                intermentBones: 10,
                intermentLabel: '⚠️ Mock Price',
                available: true,
                availableSlots: 72,
                staggeredAllowed: 'none',
                availableForActual: true,
                locations: [
                    { id: 'BV-001', block: 'G', zone: 'Zone 1', level: 'Ground', status: 'Available' },
                    { id: 'BV-002', block: 'G', zone: 'Zone 1', level: 'Ground', status: 'Available' },
                    { id: 'BV-003', block: 'G', zone: 'Zone 2', level: 'Ground', status: 'Available' },
                    { id: 'BV-004', block: 'G', zone: 'Zone 2', level: 'Ground', status: 'Occupied' },
                    { id: 'BV-005', block: 'H', zone: 'Zone 1', level: 'Ground', status: 'Available' },
                ]
            },
            'Garden Type': {
                price: 560000,
                icon: 'fa-tree',
                desc: '16 sqm, 4 vaults',
                category: 'lot',
                dpPercent: 10,
                monthly: 42000,
                intermentFresh: 16000,
                intermentBones: 0,
                intermentLabel: 'Actual Price',
                available: false,
                availableSlots: 0,
                staggeredAllowed: 'preneed',
                availableForActual: true,
                locations: [
                    { id: 'GT-001', block: 'I', zone: 'Zone 1', level: 'Ground', status: 'Occupied' },
                    { id: 'GT-002', block: 'I', zone: 'Zone 1', level: 'Ground', status: 'Occupied' },
                ]
            },
            'Heroes Buried': {
                price: 387000,
                icon: 'fa-medal',
                desc: '7.84 sqm, heroes section',
                category: 'lot',
                dpPercent: 10,
                monthly: 29025,
                intermentFresh: 16000,
                intermentBones: 14000,
                intermentLabel: 'Actual Price',
                available: false,
                availableSlots: 0,
                staggeredAllowed: 'preneed',
                availableForActual: false,
                locations: [
                    { id: 'HB-001', block: 'J', zone: 'Zone 1', level: 'Ground', status: 'Occupied' },
                    { id: 'HB-002', block: 'J', zone: 'Zone 1', level: 'Ground', status: 'Occupied' },
                ]
            },
            'Wake Space': {
                price: 1500,
                icon: 'fa-bed',
                desc: 'Per night',
                category: 'wake',
                dpPercent: 0,
                monthly: 0,
                intermentFresh: 0,
                intermentBones: 0,
                intermentLabel: '',
                available: true,
                availableSlots: 1,
                staggeredAllowed: 'none',
                availableForActual: true,
                locations: []
            }
        };

        // ================================================================
        // 2. WAKE SPACE OCCUPIED DATES
        // ================================================================
        let occupiedWakeDates = [
            { checkin: '2026-08-20', checkout: '2026-08-22' },
            { checkin: '2026-08-25', checkout: '2026-08-27' }
        ];

        let wakeBooking = { nights: 3, checkin: '', checkout: '', total: 0, available: false };

        // ================================================================
        // 3. STATE
        // ================================================================
        let cart = [];
        let discountType = 'none';
        let paymentPlan = 'full';
        let burialType = 'actual';
        let discountAmount = 0;
        let grandTotal = 0;
        let isWakeOnly = false;
        let selectedClient = null;

        // ================================================================
        // 4. MOCK CLIENTS DATA (for wake-only search)
        // ================================================================
        const mockClients = [
            { name: 'Maria Santos', contact: '0917-123-4567', email: 'maria@email.com', address: '123 Street, City',
                relationship: 'Spouse', deceased: 'Juan Dela Cruz', dob: '1950-01-15', dod: '2026-08-19' },
            { name: 'Pedro Garcia', contact: '0918-234-5678', email: 'pedro@email.com', address: '456 Avenue, City',
                relationship: 'Child', deceased: 'Lourdes Garcia', dob: '1965-06-10', dod: '2026-08-18' },
            { name: 'Rosa Mendoza', contact: '0919-345-6789', email: 'rosa@email.com', address: '789 Street, City',
                relationship: 'Spouse', deceased: 'Felipe Mendoza', dob: '1955-03-20', dod: '2026-08-15' },
            { name: 'Ana Reyes', contact: '0920-456-7890', email: 'ana@email.com', address: '321 Avenue, City',
                relationship: 'Child', deceased: 'Alejandro Reyes', dob: '1948-11-05', dod: '2026-08-12' },
        ];

        // ================================================================
        // 5. DOCUMENT CHECKLIST
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
            { receipt: 'OR-2026-0342', client: 'Rosa Mendoza', items: 'Installment Payment - Lot B-098', amount: 15000,
                date: '2026-03-15' },
            { receipt: 'OR-2026-0341', client: 'Pedro Garcia', items: 'Mausoleum Lot - C-128', amount: 85000,
                date: '2026-03-15' },
            { receipt: 'OR-2026-0340', client: 'Elena Santos', items: 'Columbarium - E-003', amount: 10000,
                date: '2026-03-14' },
            { receipt: 'OR-2026-0339', client: 'Roberto Lim', items: 'Bone Vault - D-014', amount: 45000,
            date: '2026-03-14' },
            { receipt: 'OR-2026-0338', client: 'Maria Cruz', items: 'Apartment Niche - B-047', amount: 30000,
            date: '2026-03-13' }
        ];

        // ================================================================
        // 6. CLIENT SEARCH (Wake-only)
        // ================================================================
        function searchClients() {
            const input = document.getElementById('clientSearchInput');
            const term = input.value.trim().toLowerCase();
            const resultsContainer = document.getElementById('clientSearchResults');

            if (term.length === 0 || !isWakeOnly) {
                resultsContainer.style.display = 'none';
                return;
            }

            const matches = mockClients.filter(c =>
                c.name.toLowerCase().includes(term) ||
                c.deceased.toLowerCase().includes(term)
            );

            if (matches.length === 0) {
                resultsContainer.innerHTML =
                    `<div class="result-item" style="color:#8aaccc;cursor:default;">No clients found. Enter new client info below.</div>`;
                resultsContainer.style.display = 'block';
                return;
            }

            resultsContainer.innerHTML = matches.map(c => `
                <div class="result-item" onclick="selectClient(${mockClients.indexOf(c)})">
                    <strong>${c.name}</strong>
                    <div class="sub">${c.deceased} · ${c.relationship}</div>
                </div>
            `).join('');
            resultsContainer.style.display = 'block';
        }

        function selectClient(index) {
            const client = mockClients[index];
            selectedClient = client;
            document.getElementById('clientSearchInput').value = client.name;
            document.getElementById('clientSearchResults').style.display = 'none';
            document.getElementById('clientInfoBadge').textContent = 'Loaded';
            document.getElementById('clientInfoBadge').style.background = '#d5f5e3';
            document.getElementById('clientInfoBadge').style.color = '#27ae60';

            // Fill client info
            document.getElementById('clientName').value = client.name;
            document.getElementById('clientContact').value = client.contact;
            document.getElementById('clientEmail').value = client.email;
            document.getElementById('clientRelationship').value = client.relationship || '';

            // Fill deceased info
            document.getElementById('deceasedName').value = client.deceased || '';
            document.getElementById('deceasedDOB').value = client.dob || '';
            document.getElementById('deceasedDOD').value = client.dod || '';
            document.getElementById('deceasedInfoBadge').textContent = 'Loaded';
            document.getElementById('deceasedInfoBadge').style.background = '#d5f5e3';
            document.getElementById('deceasedInfoBadge').style.color = '#27ae60';

            // Disable fields to prevent accidental changes
            document.getElementById('clientName').disabled = true;
            document.getElementById('clientContact').disabled = true;
            document.getElementById('clientEmail').disabled = true;
            document.getElementById('clientRelationship').disabled = true;
            document.getElementById('deceasedName').disabled = true;
            document.getElementById('deceasedDOB').disabled = true;
            document.getElementById('deceasedDOD').disabled = true;

            showToast(`✅ Client loaded: ${client.name}`, 'success');
        }

        function enableClientEditing() {
            document.getElementById('clientName').disabled = false;
            document.getElementById('clientContact').disabled = false;
            document.getElementById('clientEmail').disabled = false;
            document.getElementById('clientRelationship').disabled = false;
            document.getElementById('deceasedName').disabled = false;
            document.getElementById('deceasedDOB').disabled = false;
            document.getElementById('deceasedDOD').disabled = false;
            document.getElementById('clientInfoBadge').textContent = 'New';
            document.getElementById('clientInfoBadge').style.background = '#f0f2f5';
            document.getElementById('clientInfoBadge').style.color = '#7a9fbe';
            document.getElementById('deceasedInfoBadge').textContent = 'Required';
            document.getElementById('deceasedInfoBadge').style.background = '#f0f2f5';
            document.getElementById('deceasedInfoBadge').style.color = '#7a9fbe';
            selectedClient = null;
            document.getElementById('clientSearchInput').value = '';
        }

        // ================================================================
        // 7. WAKE BOOKING FUNCTIONS
        // ================================================================
        function openWakeBookingModal() {
            wakeBooking.nights = 3;
            document.getElementById('wakeNightsInput').value = 3;
            const today = new Date().toISOString().slice(0, 10);
            document.getElementById('wakeCheckinInput').value = today;
            document.getElementById('wakeCheckinInput').min = today;
            wakeBooking.checkin = today;
            updateWakeBooking();
            openModal('wakeModal');
        }

        function adjustNights(delta) {
            const input = document.getElementById('wakeNightsInput');
            let val = parseInt(input.value) || 1;
            val = Math.max(1, Math.min(30, val + delta));
            input.value = val;
            updateWakeBooking();
        }

        function updateWakeBooking() {
            const nights = parseInt(document.getElementById('wakeNightsInput').value) || 1;
            const checkin = document.getElementById('wakeCheckinInput').value;
            if (!checkin) {
                document.getElementById('wakeSummaryCheckin').textContent = '—';
                document.getElementById('wakeSummaryCheckout').textContent = '—';
                document.getElementById('wakeSummaryNights').textContent = '0';
                document.getElementById('wakeSummaryTotal').textContent = '₱0.00';
                document.getElementById('wakeAvailabilityStatus').className = 'wake-availability-status';
                document.getElementById('wakeAvailabilityStatus').innerHTML =
                    '<i class="fas fa-info-circle"></i> Please select check-in date';
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
            document.getElementById('wakeSummaryTotal').textContent = `₱${total.toLocaleString()}`;

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
                statusEl.innerHTML =
                    '<i class="fas fa-times-circle"></i> Wake space is OCCUPIED for these dates. Please choose different dates.';
                bookBtn.disabled = true;
                wakeBooking.available = false;
            }
            wakeBooking.nights = nights;
            wakeBooking.checkin = checkin;
            wakeBooking.checkout = checkoutStr;
            wakeBooking.total = total;
        }

        function checkWakeAvailability(checkin, checkout) {
            if (!checkin || !checkout) return true;
            const requestedCheckin = new Date(checkin);
            const requestedCheckout = new Date(checkout);
            for (let booking of occupiedWakeDates) {
                const bookedCheckin = new Date(booking.checkin);
                const bookedCheckout = new Date(booking.checkout);
                if (requestedCheckin < bookedCheckout && requestedCheckout > bookedCheckin) return false;
            }
            return true;
        }

        function formatDate(dateStr) {
            if (!dateStr) return '—';
            const d = new Date(dateStr);
            return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        }

        function confirmWakeBooking() {
            if (!wakeBooking.available || !wakeBooking.checkin) {
                showToast('⚠️ Please select available dates.', 'warning');
                return;
            }
            occupiedWakeDates.push({ checkin: wakeBooking.checkin, checkout: wakeBooking.checkout });
            const total = wakeBooking.nights * 1500;
            const existingWake = cart.find(item => item.name === 'Wake Space');
            if (existingWake) {
                existingWake.qty += wakeBooking.nights;
                existingWake.total += total;
                existingWake.metadata = { checkin: wakeBooking.checkin, checkout: wakeBooking.checkout, nights: wakeBooking
                        .nights };
            } else {
                cart.push({
                    name: 'Wake Space',
                    displayName: 'Wake Space',
                    qty: wakeBooking.nights,
                    total: total,
                    unitPrice: 1500,
                    metadata: { checkin: wakeBooking.checkin, checkout: wakeBooking.checkout, nights: wakeBooking.nights }
                });
            }
            closeModal('wakeModal');
            renderCart();
            checkWakeOnly();
            showToast(`✅ Wake Space booked for ${wakeBooking.nights} night(s)`, 'success');
        }

        function removeWakeFromCart() {
            const index = cart.findIndex(item => item.name === 'Wake Space');
            if (index !== -1) {
                const removed = cart[index];
                if (removed.metadata) {
                    const idx = occupiedWakeDates.findIndex(b =>
                        b.checkin === removed.metadata.checkin && b.checkout === removed.metadata.checkout
                    );
                    if (idx !== -1) occupiedWakeDates.splice(idx, 1);
                }
                cart.splice(index, 1);
                renderCart();
                checkWakeOnly();
                updateWakeAvailabilityDisplay();
                showToast('🗑️ Removed Wake Space', 'info');
            }
        }

        // ================================================================
        // 8. BURIAL TYPE & VISIBILITY FUNCTIONS
        // ================================================================
        function updateBurialType() {
            const radios = document.querySelectorAll('input[name="burialType"]');
            radios.forEach(r => { if (r.checked) burialType = r.value; });
            const hasHeroes = cart.some(item => item.name === 'Heroes Buried' || item.displayName === 'Heroes Buried');
            if (hasHeroes && burialType === 'actual') {
                showToast('⚠️ Heroes Buried is only available for Pre-Need (Advance Purchase).', 'warning');
                document.querySelector('input[name="burialType"][value="preneed"]').checked = true;
                burialType = 'preneed';
            }
            updateBurialTypeAvailability();
            updateEligibilityNote();
            updateChecklistRequirements();
            updateDatePickers();
            updateDeceasedInfo();
            updateTotals();
        }

        function updateBurialTypeAvailability() {
            const actualRadio = document.querySelector('input[name="burialType"][value="actual"]');
            let actualDisabled = false;
            cart.forEach(item => {
                const p = PRODUCTS[item.name];
                if (p && p.category === 'lot' && p.availableForActual === false) actualDisabled = true;
            });
            actualRadio.disabled = actualDisabled;
            document.getElementById('actualLabel').classList.toggle('disabled', actualDisabled);
            if (actualDisabled && actualRadio.checked) {
                document.querySelector('input[name="burialType"][value="preneed"]').checked = true;
                burialType = 'preneed';
            }
        }

        function updateChecklistRequirements() {
            const grid = document.getElementById('checklistGrid');
            const items = grid.querySelectorAll('.checklist-item');
            items.forEach((item, index) => {
                const doc = DOCUMENTS[index];
                const label = item.querySelector('label');
                if (!doc) return;
                if (burialType === 'actual') {
                    if (doc.requiredFor === 'actual' || doc.requiredFor === 'both') {
                        label.innerHTML = `${doc.label} <span class="required">*</span>`;
                    } else {
                        label.innerHTML = `${doc.label} <span class="optional">(optional)</span>`;
                    }
                } else {
                    if (doc.requiredFor === 'both') {
                        label.innerHTML = `${doc.label} <span class="required">*</span>`;
                    } else {
                        label.innerHTML = `${doc.label} <span class="optional">(optional)</span>`;
                    }
                }
            });
            updateChecklist();
        }

        function updateEligibilityNote() {
            const note = document.getElementById('eligibilityNote');
            const lotKeys = Object.keys(PRODUCTS).filter(k => PRODUCTS[k].category === 'lot');
            const hasLot = cart.some(item => lotKeys.some(key => item.name === key || item.name.startsWith(key + ' (')));
            if (cart.length === 0) {
                note.innerHTML = '<i class="fas fa-info-circle"></i> Add items to cart to see payment eligibility';
                note.className = 'eligibility-note';
                return;
            }
            if (!hasLot) {
                note.innerHTML =
                    '<i class="fas fa-info-circle"></i> No grave lot selected. Only Wake Space rental. Payment plan options limited.';
                note.className = 'eligibility-note warning';
                return;
            }
            let staggeredAllowed = true;
            let warningMessages = [];
            cart.forEach(item => {
                const p = PRODUCTS[item.name];
                if (p && p.category === 'lot') {
                    if (p.staggeredAllowed === 'preneed' && burialType === 'actual') {
                        staggeredAllowed = false;
                        warningMessages.push(`${item.name} cannot use Staggered for Actual Burial`);
                    }
                    if (p.staggeredAllowed === 'none') {
                        staggeredAllowed = false;
                        warningMessages.push(`${item.name} does not support Staggered`);
                    }
                    if (p.availableForActual === false && burialType === 'actual') {
                        staggeredAllowed = false;
                        warningMessages.push(`${item.name} is not available for Actual Burial`);
                    }
                }
            });
            if (!staggeredAllowed) {
                note.innerHTML =
                    `<i class="fas fa-exclamation-triangle"></i> ${warningMessages.join('. ')}. Switch to "Full Payment" or "Pre-Need" plan.`;
                note.className = 'eligibility-note error';
                if (document.getElementById('paymentPlan').value === 'staggered') {
                    document.getElementById('paymentPlan').value = 'full';
                    updateTotals();
                }
                document.getElementById('paymentPlan').disabled = true;
            } else {
                note.innerHTML = '<i class="fas fa-check-circle"></i> Staggered payment is available for this selection.';
                note.className = 'eligibility-note';
                document.getElementById('paymentPlan').disabled = false;
            }
        }

        function updateDatePickers() {
            const lotKeys = Object.keys(PRODUCTS).filter(k => PRODUCTS[k].category === 'lot');
            const hasLot = cart.some(item => lotKeys.some(key => item.name === key || item.name.startsWith(key + ' (')));
            const burialGroup = document.getElementById('burialDateGroup');
            const label = document.getElementById('dateLabel');
            if (hasLot) {
                burialGroup.style.display = 'block';
                if (burialType === 'actual') {
                    label.textContent = '📅 Burial Date (Required)';
                    document.getElementById('burialDate').required = true;
                } else {
                    label.textContent = '📅 Purchase Date (Pre-Need)';
                    document.getElementById('burialDate').required = false;
                }
            } else {
                burialGroup.style.display = 'none';
            }
            if (cart.length === 0) {
                burialGroup.style.display = 'block';
                label.textContent = '📅 Burial Date (for actual burial)';
                document.getElementById('burialDate').required = false;
            }
        }

        function updateDeceasedInfo() {
            const section = document.getElementById('deceasedInfoColumn');
            const lotKeys = Object.keys(PRODUCTS).filter(k => PRODUCTS[k].category === 'lot');
            const hasLot = cart.some(item => lotKeys.some(key => item.name === key || item.name.startsWith(key + ' (')));
            // Show deceased info for Actual Burial OR for Wake-only (so staff can record deceased for wake)
            if ((burialType === 'actual' && hasLot) || isWakeOnly) {
                section.style.display = 'block';
                document.getElementById('deceasedInfoBadge').textContent = isWakeOnly ? 'For Wake' : 'Required';
                document.getElementById('deceasedInfoBadge').style.background = isWakeOnly ? '#fef9e7' : '#f0f2f5';
                document.getElementById('deceasedInfoBadge').style.color = isWakeOnly ? '#f39c12' : '#7a9fbe';
            } else {
                section.style.display = 'none';
            }
        }

        // ================================================================
        // 9. CHECK WAKE-ONLY & UPDATE UI
        // ================================================================
        function checkWakeOnly() {
            const lotKeys = Object.keys(PRODUCTS).filter(k => PRODUCTS[k].category === 'lot');
            const hasLot = cart.some(item => lotKeys.some(key => item.name === key || item.name.startsWith(key + ' (')));
            const hasWake = cart.some(item => item.name === 'Wake Space');
            isWakeOnly = hasWake && !hasLot;

            // Show/hide client search vs regular client field
            const clientSearchWrapper = document.getElementById('clientSearchWrapper');
            const clientNameField = document.getElementById('clientName');

            if (isWakeOnly) {
                // Wake-only: show searchable client name
                clientSearchWrapper.style.display = 'block';
                // Hide the regular client name field (it's in the info grid)
                // But we keep it for editing after search
                document.getElementById('clientPaymentPanel').style.display = 'block';
                // Enable search
                document.getElementById('clientSearchInput').placeholder = 'Search client by name or deceased...';
            } else {
                // With grave lot: hide client search, show regular client name field
                clientSearchWrapper.style.display = 'none';
                document.getElementById('clientPaymentPanel').style.display = 'block';
                // Enable editing if not loaded from search
                if (!selectedClient) {
                    enableClientEditing();
                }
            }

            // Show/hide sections based on wake-only
            document.querySelectorAll('.hide-when-wake-only').forEach(el => {
                el.classList.toggle('hidden', isWakeOnly);
            });

            // Show/hide client search results
            if (!isWakeOnly) {
                document.getElementById('clientSearchResults').style.display = 'none';
            }

            // Update deceased info visibility
            updateDeceasedInfo();

            if (isWakeOnly) {
                document.getElementById('eligibilityNote').innerHTML =
                    '<i class="fas fa-info-circle"></i> Wake Space rental only. No burial documents required.';
                document.getElementById('eligibilityNote').className = 'eligibility-note';
                // Show wake date for wake-only
                document.getElementById('datePickerPanel').style.display = 'block';
                document.getElementById('dateLabel').textContent = '📅 Wake Check-in Date';
            } else {
                updateEligibilityNote();
                if (hasLot) {
                    document.getElementById('datePickerPanel').style.display = 'block';
                    const label = document.getElementById('dateLabel');
                    if (burialType === 'actual') {
                        label.textContent = '📅 Burial Date (Required)';
                    } else {
                        label.textContent = '📅 Purchase Date (Pre-Need)';
                    }
                } else {
                    document.getElementById('datePickerPanel').style.display = 'none';
                }
            }

            updateDatePickers();
            renderModalChecklist();
        }

        // ================================================================
        // 10. RENDER FUNCTIONS
        // ================================================================

        // Render Product Table
        function renderProducts() {
            const tbody = document.getElementById('productTableBody');
            const lotKeys = Object.keys(PRODUCTS).filter(k => PRODUCTS[k].category === 'lot');
            tbody.innerHTML = lotKeys.map(key => {
                const p = PRODUCTS[key];
                const isSoldOut = p.available === false || p.availableSlots === 0;
                const availText = p.availableSlots !== null ? `${p.availableSlots}` : '—';
                let staggerNote = '';
                if (p.staggeredAllowed === 'both') staggerNote = '✅ Staggered';
                else if (p.staggeredAllowed === 'preneed') staggerNote = '⚠️ Pre-Need only';
                else staggerNote = '❌ Full only';
                const availClass = isSoldOut ? 'sold-out' : 'available';
                const icon = p.icon || 'fa-circle';
                const availLocations = p.locations ? p.locations.filter(l => l.status === 'Available').length : 0;
                return `
                    <tr>
                        <td>
                            <div class="product-name-cell">
                                <i class="fas ${icon}"></i> ${key}
                            </div>
                        </td>
                        <td style="text-align:right;" class="product-price-cell">₱${p.price.toLocaleString()}</td>
                        <td style="text-align:center;" class="product-avail-cell ${availClass}">
                            ${isSoldOut ? '❌ Sold Out' : '✅ ' + availText}
                        </td>
                        <td style="text-align:center;">
                            <button class="btn-add-sm" onclick="openAddItemModal('${key}')" ${isSoldOut ? 'disabled' : ''}>
                                + Add
                            </button>
                        </td>
                    </tr>
                `;
            }).join('');
            updateWakeAvailabilityDisplay();
        }

        function updateWakeAvailabilityDisplay() {
            const w = PRODUCTS['Wake Space'];
            const isSoldOut = w.availableSlots <= 0;
            const el = document.getElementById('wakeAvailStatus');
            if (isSoldOut) {
                el.className = 'wake-avail sold-out';
                el.textContent = '❌ Fully Booked';
            } else {
                const now = new Date();
                const futureBookings = occupiedWakeDates.filter(b => new Date(b.checkout) >= now);
                const available = Math.max(0, 1 - futureBookings.length);
                el.className = 'wake-avail available';
                el.textContent = `✅ ${available} available`;
                w.availableSlots = available;
            }
        }

        // Render Checklist
        function renderChecklist() {
            const grid = document.getElementById('checklistGrid');
            grid.innerHTML = DOCUMENTS.map(doc => {
                const checked = checklistState[doc.id] ? 'checked' : '';
                let requiredHtml = '';
                if (burialType === 'actual') {
                    if (doc.requiredFor === 'actual' || doc.requiredFor === 'both') {
                        requiredHtml = '<span class="required">*</span>';
                    } else {
                        requiredHtml = '<span class="optional">(optional)</span>';
                    }
                } else {
                    if (doc.requiredFor === 'both') {
                        requiredHtml = '<span class="required">*</span>';
                    } else {
                        requiredHtml = '<span class="optional">(optional)</span>';
                    }
                }
                return `
                    <div class="checklist-item">
                        <input type="checkbox" id="check_${doc.id}" ${checked} onchange="updateChecklist()" />
                        <label for="check_${doc.id}">${doc.label} ${requiredHtml}</label>
                    </div>
                `;
            }).join('');
            updateChecklist();
        }

        function updateChecklist() {
            const total = DOCUMENTS.length;
            let checked = 0;
            DOCUMENTS.forEach(doc => {
                if (document.getElementById(`check_${doc.id}`)?.checked) {
                    checklistState[doc.id] = true;
                    checked++;
                } else {
                    checklistState[doc.id] = false;
                }
            });
            const progress = (checked / total) * 100;
            document.getElementById('checklistStatus').textContent = `${checked} of ${total} completed`;
            document.getElementById('checklistProgress').style.width = `${progress}%`;
        }

        function renderModalChecklist() {
            const container = document.getElementById('modalChecklist');
            if (isWakeOnly) {
                container.innerHTML =
                    `<div style="grid-column:span 2;text-align:center;color:#8aaccc;padding:0.5rem 0;">
                        <i class="fas fa-info-circle"></i> No documents required for Wake Space rental only.
                    </div>`;
                return;
            }
            container.innerHTML = DOCUMENTS.map(doc => {
                const checked = checklistState[doc.id] ? 'checked' : '';
                let requiredHtml = '';
                if (burialType === 'actual') {
                    if (doc.requiredFor === 'actual' || doc.requiredFor === 'both') {
                        requiredHtml = '<span class="required">*</span>';
                    } else {
                        requiredHtml = '<span class="optional">(optional)</span>';
                    }
                } else {
                    if (doc.requiredFor === 'both') {
                        requiredHtml = '<span class="required">*</span>';
                    } else {
                        requiredHtml = '<span class="optional">(optional)</span>';
                    }
                }
                return `
                    <div class="check-item">
                        <input type="checkbox" id="modal_check_${doc.id}" ${checked} onchange="updateModalChecklist()" />
                        <label for="modal_check_${doc.id}">${doc.label} ${requiredHtml}</label>
                    </div>
                `;
            }).join('');
        }

        function updateModalChecklist() {
            DOCUMENTS.forEach(doc => {
                const el = document.getElementById(`modal_check_${doc.id}`);
                if (el) checklistState[doc.id] = el.checked;
            });
            DOCUMENTS.forEach(doc => {
                const mainEl = document.getElementById(`check_${doc.id}`);
                if (mainEl) mainEl.checked = checklistState[doc.id];
            });
            updateChecklist();
        }

        // ================================================================
        // 11. ADD ITEM MODAL (with Location Selection)
        // ================================================================
        let selectedLocationId = null;

        function openAddItemModal(preSelected) {
            const select = document.getElementById('modalProduct');
            const lotKeys = Object.keys(PRODUCTS).filter(k => PRODUCTS[k].category === 'lot');
            select.innerHTML = lotKeys.map(k =>
                `<option value="${k}">${k} - ₱${PRODUCTS[k].price.toLocaleString()}</option>`
            ).join('');
            if (preSelected) select.value = preSelected;
            document.getElementById('modalQty').value = 1;
            selectedLocationId = null;
            updateLocationOptions();
            openModal('addItemModal');
        }

        function updateLocationOptions() {
            const product = document.getElementById('modalProduct').value;
            const p = PRODUCTS[product];
            const grid = document.getElementById('locationGrid');

            if (!p.locations || p.locations.length === 0) {
                grid.innerHTML =
                    `<div style="padding:0.5rem;text-align:center;color:#8aaccc;font-size:0.8rem;grid-column:span 2;">
                        <i class="fas fa-info-circle"></i> No locations available for this type
                    </div>`;
                selectedLocationId = null;
            } else {
                const available = p.locations.filter(l => l.status === 'Available');
                if (available.length === 0) {
                    grid.innerHTML =
                        `<div style="padding:0.5rem;text-align:center;color:#c0392b;font-size:0.8rem;grid-column:span 2;">
                            <i class="fas fa-exclamation-triangle"></i> No available locations for this type
                        </div>`;
                    selectedLocationId = null;
                } else {
                    grid.innerHTML = available.map(loc => `
                        <div class="location-option" onclick="selectLocation('${loc.id}')">
                            <input type="radio" name="selectedLocation" value="${loc.id}" id="loc_${loc.id}" />
                            <label for="loc_${loc.id}" style="cursor:pointer;display:flex;align-items:center;gap:4px;flex-wrap:wrap;width:100%;">
                                <span class="loc-id">${loc.id}</span>
                                <span class="loc-detail">${loc.block} · ${loc.zone}</span>
                                <span class="loc-detail">${loc.level}</span>
                                <span class="loc-status available">● Available</span>
                            </label>
                        </div>
                    `).join('');
                    const firstRadio = grid.querySelector('input[type="radio"]');
                    if (firstRadio) {
                        firstRadio.checked = true;
                        selectedLocationId = firstRadio.value;
                    }
                }
            }

            // Update interment options
            const intermentSelect = document.getElementById('modalInterment');
            intermentSelect.innerHTML = '';
            if (p.intermentFresh > 0) {
                intermentSelect.innerHTML +=
                    `<option value="fresh">Fresh Burial - ₱${p.intermentFresh.toLocaleString()} ${p.intermentLabel && p.intermentLabel.includes('Mock') ? '⚠️ Mock' : ''}</option>`;
            }
            if (p.intermentBones > 0) {
                intermentSelect.innerHTML +=
                    `<option value="bones">Bone Transfer - ₱${p.intermentBones.toLocaleString()} ${p.intermentLabel && p.intermentLabel.includes('Mock') ? '⚠️ Mock' : ''}</option>`;
            }
            if (intermentSelect.innerHTML === '') {
                intermentSelect.innerHTML = `<option value="none">No interment fee required</option>`;
            }

            document.getElementById('borrowingGroup').style.display = (product === 'Columbarium') ? 'block' : 'none';
            document.getElementById('qtyGroup').style.display = 'block';
        }

        function selectLocation(id) {
            selectedLocationId = id;
            const radios = document.querySelectorAll('#locationGrid input[type="radio"]');
            radios.forEach(r => {
                if (r.value === id) r.checked = true;
            });
        }

        // ================================================================
        // 12. CONFIRM ADD ITEM
        // ================================================================
        function confirmAddItem() {
            const baseName = document.getElementById('modalProduct').value;
            const p = PRODUCTS[baseName];
            let qty = parseInt(document.getElementById('modalQty').value) || 1;
            let intermentFee = 0;
            let intermentLabel = '';

            const intermentVal = document.getElementById('modalInterment').value;
            if (intermentVal === 'fresh' && p.intermentFresh > 0) {
                intermentFee = p.intermentFresh;
                intermentLabel = 'Fresh';
            } else if (intermentVal === 'bones' && p.intermentBones > 0) {
                intermentFee = p.intermentBones;
                intermentLabel = 'Bones';
            }

            // Get selected location
            const selectedRadio = document.querySelector('#locationGrid input[type="radio"]:checked');
            const locationId = selectedRadio ? selectedRadio.value : null;
            let locationData = null;
            if (locationId && p.locations) {
                locationData = p.locations.find(l => l.id === locationId);
            }

            // If no location selected but locations exist, show warning
            if (p.locations && p.locations.length > 0 && !locationData) {
                showToast('⚠️ Please select a location.', 'warning');
                return;
            }

            // If this is a grave lot, hide client search and enable editing
            if (p.category === 'lot') {
                // If client was loaded from search, reset to allow editing
                if (selectedClient) {
                    enableClientEditing();
                }
                // Hide client search
                document.getElementById('clientSearchWrapper').style.display = 'none';
            }

            const displayName = intermentLabel ? `${baseName} (${intermentLabel})` : baseName;
            const unitPrice = p.price + intermentFee;

            const cartItem = {
                name: baseName,
                displayName: displayName,
                qty: qty,
                unitPrice: unitPrice,
                total: unitPrice * qty,
                intermentLabel: intermentLabel,
                intermentFee: intermentFee,
                basePrice: p.price,
                location: locationData || null
            };

            const existing = cart.find(item => item.displayName === displayName);
            if (existing) {
                existing.qty += qty;
                existing.total = existing.qty * unitPrice;
            } else {
                cart.push(cartItem);
            }

            closeModal('addItemModal');
            renderCart();
            checkWakeOnly();
            updateBurialTypeAvailability();
            updateEligibilityNote();
            updateDatePickers();
            updateDeceasedInfo();
            showToast(`✅ Added ${displayName}`, 'success');
        }

        // ================================================================
        // 13. CART FUNCTIONS
        // ================================================================
        function removeFromCart(index) {
            const removed = cart[index];
            if (removed.name === 'Wake Space' && removed.metadata) {
                const idx = occupiedWakeDates.findIndex(b =>
                    b.checkin === removed.metadata.checkin && b.checkout === removed.metadata.checkout
                );
                if (idx !== -1) occupiedWakeDates.splice(idx, 1);
            }
            cart.splice(index, 1);
            // If removing a grave lot, enable client search again if wake-only
            renderCart();
            checkWakeOnly();
            updateBurialTypeAvailability();
            updateEligibilityNote();
            updateDatePickers();
            updateDeceasedInfo();
            updateWakeAvailabilityDisplay();
            showToast(`🗑️ Removed ${removed.displayName}`, 'info');
        }

        function renderCart() {
            const tbody = document.getElementById('cartBody');
            if (cart.length === 0) {
                tbody.innerHTML = `<tr><td colspan="4" class="empty-msg">No items added yet</td></tr>`;
                document.getElementById('cartItemCount').textContent = '0 items';
            } else {
                tbody.innerHTML = cart.map((item, idx) => {
                    const isWake = item.name === 'Wake Space';
                    let extraInfo = '';
                    let locationHtml = '';
                    if (isWake && item.metadata) {
                        extraInfo =
                            ` (${formatDate(item.metadata.checkin)} → ${formatDate(item.metadata.checkout)})`;
                    }
                    if (item.location) {
                        locationHtml = `
                            <div class="cart-location">
                                <i class="fas fa-map-pin"></i>
                                <span class="location-id">${item.location.id}</span>
                                <span class="location-detail">${item.location.block} · ${item.location.zone}</span>
                                <span class="location-detail">${item.location.level}</span>
                                <button class="btn-map-sm" onclick="viewOnMap('${item.location.id}')">
                                    <i class="fas fa-map-marked-alt"></i> View Map
                                </button>
                            </div>
                        `;
                    }
                    return `
                        <tr>
                            <td>
                                ${item.displayName} ${extraInfo}
                                ${locationHtml}
                            </td>
                            <td style="text-align:center;">${item.qty}</td>
                            <td style="text-align:right;font-weight:600;">₱${item.total.toLocaleString()}</td>
                            <td style="text-align:center;">
                                <button class="btn-remove" onclick="removeFromCart(${idx})"><i class="fas fa-times"></i></button>
                            </td>
                        </tr>
                    `;
                }).join('');
                const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
                document.getElementById('cartItemCount').textContent = `${totalItems} items`;
            }
            updateTotals();
        }

        // ================================================================
        // 14. VIEW ON MAP
        // ================================================================
        function viewOnMap(locationId) {
            let found = null;
            let foundProduct = null;
            for (const [productName, product] of Object.entries(PRODUCTS)) {
                if (product.locations) {
                    const loc = product.locations.find(l => l.id === locationId);
                    if (loc) {
                        found = loc;
                        foundProduct = productName;
                        break;
                    }
                }
            }
            if (found) {
                showToast(`🗺️ Opening map view for ${foundProduct} ${found.id} (${found.block}, ${found.zone})`, 'info');
                setTimeout(() => {
                    showToast(`📍 Location: ${found.id} · ${found.block} · ${found.zone} · ${found.level}`, 'success');
                }, 800);
            } else {
                showToast(`⚠️ Location ${locationId} not found.`, 'warning');
            }
        }

        // ================================================================
        // 15. TOTALS & PAYMENT
        // ================================================================
        function updateTotals() {
            let subtotal = 0,
                intermentTotal = 0,
                wakeTotalCart = 0;
            cart.forEach(item => {
                subtotal += item.total;
                if (item.intermentFee) intermentTotal += item.intermentFee * item.qty;
                if (item.name === 'Wake Space') wakeTotalCart += item.total;
            });
            document.getElementById('wakeSubtotalDisplay').textContent = wakeTotalCart > 0 ?
                `₱${wakeTotalCart.toLocaleString()}` : '₱0.00';
            document.getElementById('intermentDisplay').textContent = intermentTotal > 0 ?
                `₱${intermentTotal.toLocaleString()}` : '₱0.00';

            let discount = 0;
            if (document.getElementById('discountType')) {
                discountType = document.getElementById('discountType').value;
                if (discountType !== 'none') discount = subtotal * 0.20;
            }
            discountAmount = discount;
            paymentPlan = document.getElementById('paymentPlan') ? document.getElementById('paymentPlan').value : 'full';

            let total = subtotal - discount;
            let dpAmount = 0,
                monthlyAmount = 0;
            let hasDPItem = false,
                totalDP = 0,
                totalMonthly = 0;
            cart.forEach(item => {
                const p = PRODUCTS[item.name];
                if (p && p.dpPercent > 0 && p.category === 'lot') {
                    let staggerAllowed = true;
                    if (p.staggeredAllowed === 'none') staggerAllowed = false;
                    if (p.staggeredAllowed === 'preneed' && burialType === 'actual') staggerAllowed = false;
                    if (p.availableForActual === false && burialType === 'actual') staggerAllowed = false;
                    if (staggerAllowed) {
                        hasDPItem = true;
                        const itemTotal = item.total;
                        const dp = itemTotal * (p.dpPercent / 100);
                        totalDP += dp;
                        if (p.monthly > 0) {
                            const remaining = itemTotal - dp;
                            totalMonthly += remaining / 12;
                        }
                    }
                }
            });
            if (paymentPlan === 'staggered' && hasDPItem) {
                dpAmount = totalDP;
                monthlyAmount = totalMonthly;
                total = dpAmount;
            } else if (paymentPlan === 'preneed') {
                dpAmount = 0;
                monthlyAmount = 0;
                total = subtotal - discount;
            } else {
                dpAmount = 0;
                monthlyAmount = 0;
                total = subtotal - discount;
            }
            grandTotal = total;
            document.getElementById('subtotalDisplay').textContent = `₱${subtotal.toLocaleString()}`;
            document.getElementById('discountDisplay').textContent = discount > 0 ? `- ₱${discount.toLocaleString()}` :
            '₱0.00';
            document.getElementById('dpDisplay').textContent = dpAmount > 0 ? `₱${dpAmount.toLocaleString()}` : '₱0.00';
            document.getElementById('monthlyDisplay').textContent = monthlyAmount > 0 ?
                `₱${monthlyAmount.toLocaleString()}/mo (12 mos)` : '₱0.00';
            document.getElementById('grandTotalDisplay').textContent = `₱${total.toLocaleString()}`;
            computeChange();
        }

        function computeChange() {
            const total = parseFloat(document.getElementById('grandTotalDisplay').textContent.replace(/[₱,]/g, '')) || 0;
            const tendered = parseFloat(document.getElementById('amountTendered').value) || 0;
            const change = tendered - total;
            document.getElementById('changeDisplay').textContent = change >= 0 ? `₱${change.toLocaleString()}` : `₱0.00`;
        }

        // ================================================================
        // 16. OPEN CHECKLIST MODAL
        // ================================================================
        function openChecklistModal() {
            if (cart.length === 0) {
                showToast('⚠️ Cart is empty. Add items first.', 'warning');
                return;
            }
            if (isWakeOnly) {
                processPayment();
                return;
            }
            renderModalChecklist();
            openModal('checklistModal');
        }

        function confirmChecklist() {
            let requiredDocs = [];
            DOCUMENTS.forEach(doc => {
                if (burialType === 'actual') {
                    if (doc.requiredFor === 'actual' || doc.requiredFor === 'both') requiredDocs.push(doc);
                } else {
                    if (doc.requiredFor === 'both') requiredDocs.push(doc);
                }
            });
            let allComplete = true,
                missing = [];
            requiredDocs.forEach(doc => {
                const el = document.getElementById(`modal_check_${doc.id}`);
                if (!el || !el.checked) {
                    allComplete = false;
                    missing.push(doc.label);
                }
            });
            if (!allComplete) {
                showToast(`⚠️ Please complete all required documents: ${missing.join(', ')}`, 'warning');
                return;
            }
            closeModal('checklistModal');
            processPayment();
        }

        // ================================================================
        // 17. PROCESS PAYMENT
        // ================================================================
        function processPayment() {
            if (cart.length === 0) {
                showToast('⚠️ Cart is empty. Add items first.', 'warning');
                return;
            }
            if (!isWakeOnly) {
                let requiredDocs = [];
                DOCUMENTS.forEach(doc => {
                    if (burialType === 'actual') {
                        if (doc.requiredFor === 'actual' || doc.requiredFor === 'both') requiredDocs.push(doc);
                    } else {
                        if (doc.requiredFor === 'both') requiredDocs.push(doc);
                    }
                });
                let allComplete = true;
                requiredDocs.forEach(doc => {
                    if (!checklistState[doc.id]) allComplete = false;
                });
                if (!allComplete) {
                    showToast('⚠️ Please complete all required documents first.', 'warning');
                    return;
                }
            }

            const total = parseFloat(document.getElementById('grandTotalDisplay').textContent.replace(/[₱,]/g, '')) || 0;
            const tendered = parseFloat(document.getElementById('amountTendered').value) || 0;
            if (tendered < total) {
                showToast('⚠️ Amount tendered is less than total due.', 'warning');
                return;
            }

            const clientName = document.getElementById('clientName').value.trim() || 'Walk-in';
            const clientContact = document.getElementById('clientContact').value.trim() || 'N/A';
            const clientEmail = document.getElementById('clientEmail').value.trim() || 'N/A';
            const clientRelationship = document.getElementById('clientRelationship').value || 'N/A';
            const burialDate = document.getElementById('burialDate').value || 'N/A';
            const deceasedName = document.getElementById('deceasedName').value.trim() || 'N/A';
            const deceasedDOB = document.getElementById('deceasedDOB').value || 'N/A';
            const deceasedDOD = document.getElementById('deceasedDOD').value || 'N/A';
            const deceasedCause = document.getElementById('deceasedCause').value.trim() || 'N/A';

            // Get location info from cart
            let locationInfo = 'N/A';
            const lotItem = cart.find(item => item.location);
            if (lotItem && lotItem.location) {
                locationInfo =
                    `${lotItem.location.id} · ${lotItem.location.block} · ${lotItem.location.zone} · ${lotItem.location.level}`;
            }

            let wakeInfo = cart.find(item => item.name === 'Wake Space');
            let wakeCheckin = 'N/A',
                wakeCheckout = 'N/A',
                wakeNightsTotal = 0;
            if (wakeInfo && wakeInfo.metadata) {
                wakeCheckin = wakeInfo.metadata.checkin || 'N/A';
                wakeCheckout = wakeInfo.metadata.checkout || 'N/A';
                wakeNightsTotal = wakeInfo.metadata.nights || 0;
            }

            // Deduct inventory
            cart.forEach(item => {
                const p = PRODUCTS[item.name];
                if (p && p.availableSlots !== null && p.availableSlots !== undefined) {
                    p.availableSlots = Math.max(0, p.availableSlots - item.qty);
                    PRODUCTS[item.name].availableSlots = p.availableSlots;
                    if (p.availableSlots === 0) PRODUCTS[item.name].available = false;
                }
                if (item.location && p && p.locations) {
                    const loc = p.locations.find(l => l.id === item.location.id);
                    if (loc) loc.status = 'Occupied';
                }
            });

            const receiptNo = `OR-2026-${String(Math.floor(Math.random() * 9000 + 1000))}`;
            const itemsList = cart.map(i => `${i.displayName} (x${i.qty})`).join(', ');
            receipts.unshift({
                receipt: receiptNo,
                client: clientName,
                items: itemsList,
                amount: total,
                date: new Date().toISOString().slice(0, 10)
            });

            let intermentDisplay = 'None';
            let intermentTotal = 0;
            cart.forEach(item => {
                if (item.intermentFee) intermentTotal += item.intermentFee * item.qty;
            });
            if (intermentTotal > 0) intermentDisplay = `₱${intermentTotal.toLocaleString()}`;

            let wakeTotalDisplay = 'None';
            cart.forEach(item => {
                if (item.name === 'Wake Space') {
                    wakeTotalDisplay =
                        `₱${item.total.toLocaleString()} (${item.qty} nights, ${formatDate(item.metadata?.checkin)} → ${formatDate(item.metadata?.checkout)})`;
                }
            });

            // Reset cart
            cart = [];
            renderCart();
            document.getElementById('clientName').value = '';
            document.getElementById('clientContact').value = '';
            document.getElementById('clientEmail').value = '';
            document.getElementById('clientRelationship').value = '';
            document.getElementById('deceasedName').value = '';
            document.getElementById('deceasedDOB').value = '';
            document.getElementById('deceasedDOD').value = '';
            document.getElementById('deceasedCause').value = '';
            document.getElementById('amountTendered').value = '';
            document.getElementById('changeDisplay').textContent = '₱0.00';
            document.getElementById('clientSearchInput').value = '';
            document.getElementById('clientSearchResults').style.display = 'none';
            document.getElementById('clientInfoBadge').textContent = 'New';
            document.getElementById('clientInfoBadge').style.background = '#f0f2f5';
            document.getElementById('clientInfoBadge').style.color = '#7a9fbe';
            document.getElementById('deceasedInfoBadge').textContent = 'Required';
            document.getElementById('deceasedInfoBadge').style.background = '#f0f2f5';
            document.getElementById('deceasedInfoBadge').style.color = '#7a9fbe';
            selectedClient = null;
            enableClientEditing();
            renderProducts();
            renderReceipts();
            checkWakeOnly();
            updateDatePickers();
            updateDeceasedInfo();

            document.getElementById('receiptNumber').textContent = receiptNo;
            document.getElementById('receiptClient').textContent = clientName;
            document.getElementById('receiptAmount').textContent = `₱${total.toLocaleString()}`;
            document.getElementById('receiptIntermentAmt').textContent = intermentDisplay;
            document.getElementById('receiptWakeTotal').textContent = wakeTotalDisplay;
            const planLabels = { 'full': 'Full Payment', 'staggered': 'Staggered (DP + Monthly)',
            'preneed': 'Pre-Need' };
            document.getElementById('receiptPlan').textContent = planLabels[paymentPlan] || 'Full Payment';
            const burialLabels = { 'actual': 'Actual Burial (Ililibing na)', 'preneed': 'Pre-Need (Advance Purchase)' };
            document.getElementById('receiptBurialType').textContent = isWakeOnly ? 'Wake Only' : (burialLabels[
                burialType] || 'Actual Burial');
            const discountLabels = { 'none': 'None', 'pwd': 'PWD - 20%', 'senior': 'Senior - 20%' };
            document.getElementById('receiptDiscount').textContent = discountLabels[discountType] || 'None';
            document.getElementById('receiptBurialDate').textContent = burialDate !== 'N/A' ? burialDate : 'Not set';
            document.getElementById('receiptDeceased').textContent = deceasedName !== 'N/A' ? deceasedName : 'N/A';
            document.getElementById('receiptLocation').textContent = locationInfo;
            document.getElementById('receiptWakeCheckin').textContent = wakeCheckin !== 'N/A' ? wakeCheckin : 'Not set';
            document.getElementById('receiptWakeCheckout').textContent = wakeCheckout !== 'N/A' ? wakeCheckout : 'Not set';
            document.getElementById('receiptNights').textContent = wakeNightsTotal || '0';

            openModal('paymentModal');
            showToast(`✅ Payment processed! Receipt ${receiptNo}`, 'success');
        }

        // ================================================================
        // 18. RECEIPTS RENDER
        // ================================================================
        function renderReceipts() {
            const tbody = document.getElementById('receiptsBody');
            tbody.innerHTML = receipts.slice(0, 10).map(r => `
                <tr>
                    <td><strong>${r.receipt}</strong></td>
                    <td>${r.client}</td>
                    <td>${r.items}</td>
                    <td style="text-align:right;" class="receipt-amount">₱${r.amount.toLocaleString()}</td>
                    <td>${r.date}</td>
                </tr>
            `).join('');
        }

        // ================================================================
        // 19. CLEAR TRANSACTION
        // ================================================================
        function clearTransaction() {
            cart = [];
            renderCart();
            document.getElementById('clientName').value = '';
            document.getElementById('clientContact').value = '';
            document.getElementById('clientEmail').value = '';
            document.getElementById('clientRelationship').value = '';
            document.getElementById('deceasedName').value = '';
            document.getElementById('deceasedDOB').value = '';
            document.getElementById('deceasedDOD').value = '';
            document.getElementById('deceasedCause').value = '';
            document.getElementById('amountTendered').value = '';
            document.getElementById('changeDisplay').textContent = '₱0.00';
            document.getElementById('discountType').value = 'none';
            document.getElementById('paymentPlan').value = 'full';
            document.getElementById('paymentPlan').disabled = false;
            document.getElementById('burialDate').value = '';
            document.getElementById('clientSearchInput').value = '';
            document.getElementById('clientSearchResults').style.display = 'none';
            document.getElementById('clientInfoBadge').textContent = 'New';
            document.getElementById('clientInfoBadge').style.background = '#f0f2f5';
            document.getElementById('clientInfoBadge').style.color = '#7a9fbe';
            document.getElementById('deceasedInfoBadge').textContent = 'Required';
            document.getElementById('deceasedInfoBadge').style.background = '#f0f2f5';
            document.getElementById('deceasedInfoBadge').style.color = '#7a9fbe';
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
            showToast('🔄 Transaction reset', 'info');
        }

        // ================================================================
        // 20. MODAL HELPERS & TOAST
        // ================================================================
        function openModal(id) { document.getElementById(id).classList.add('active'); }

        function closeModal(id) { document.getElementById(id).classList.remove('active'); }

        document.querySelectorAll('.modal-overlay').forEach(o => {
            o.addEventListener('click', function(e) {
                if (e.target === this) this.classList.remove('active');
            });
        });

        function showToast(msg, type = 'success') {
            const t = document.getElementById('toast');
            document.getElementById('toastMessage').textContent = msg;
            t.className = `toast ${type}`;
            t.classList.add('show');
            clearTimeout(t._timeout);
            t._timeout = setTimeout(hideToast, 3500);
        }

        function hideToast() { document.getElementById('toast').classList.remove('show'); }

        // ================================================================
        // 22. KEYBOARD SHORTCUTS & INIT
        // ================================================================
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
            }
            if (e.ctrlKey && e.key === 'p') { e.preventDefault();
                processPayment(); }
        });

        // ================================================================
        // 23. INIT
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
        updateWakeAvailabilityDisplay();

        // Hide client search initially (until wake-only)
        document.getElementById('clientSearchWrapper').style.display = 'none';

        // Click outside to close search results
        document.addEventListener('click', function(e) {
            const wrapper = document.getElementById('clientSearchWrapper');
            if (!wrapper.contains(e.target)) {
                document.getElementById('clientSearchResults').style.display = 'none';
            }
        });
    
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className="pos-page-wrapper" style={{ padding: '0', background: 'transparent' }}>
      
    </div>
  );
}
