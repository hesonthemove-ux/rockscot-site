// ========================
// Rock.Scot App (Modular JS)
// ========================

import { STATION_CONFIG } from './config.js';
import { loadWire } from './wire.js';
import { loadCrew, openBio } from './crew.js';
import { initPlayer } from './player.js';
import { initUI, switchTab } from './ui.js';
import { openAdModal, calcTotal, sendEmail, genPDF } from './ads.js';
import { openSubmitModal, closeModals } from './modals.js';

// --- APP CORE ---
const app = {
    bgIdx: 0,

    init: function() {
        // Init clock
        setInterval(() => {
            const d = new Date();
            const clockEl = document.getElementById('clock');
            if (clockEl) clockEl.innerText = d.toTimeString().split(' ')[0];
        }, 1000);

        // Init ticker
        const tickerMsg = `
            <span class="ticker-item">Rock.Scot</span>
            <span class="ticker-item ticker-brand">Across Scotland</span>
        `;
        const tickerOut = document.getElementById('ticker-out');
        if (tickerOut) tickerOut.innerHTML = tickerMsg.repeat(10);

        // Init player
        initPlayer(STATION_CONFIG.meta.streamUrl);

        // Init packages in ads select box
        const pkgSel = document.getElementById('pkg-opt');
        if (pkgSel) {
            pkgSel.innerHTML = STATION_CONFIG.prices.packages
                .map(p => `<option value="${p.id}">${p.name}</option>`)
                .join('');
            const prodDisplay = document.getElementById('prod-price-display');
            if (prodDisplay) prodDisplay.innerText = `£${STATION_CONFIG.prices.productionFee}`;
        }

        // Init signals
        const sigList = document.getElementById('sig-list');
        if (sigList) {
            sigList.innerHTML = STATION_CONFIG.signals
                .map(l => `<div style="padding:10px; border-bottom:1px solid #333;">
                               <span style="color:#0f0">●</span> ${l}: PEAK
                            </div>`)
                .join('');
        }

        // Init first background
        document.body.style.backgroundImage = `url('${STATION_CONFIG.news.images[0]}')`;

        // Init UI interactions
        initUI(app);
    },

    // --- VIEW SWITCH ---
    switchTab: function(id) {
        switchTab(id, app);

        // Background rotation
        this.bgIdx = (this.bgIdx + 1) % STATION_CONFIG.news.images.length;
        document.body.style.backgroundImage = `url('${STATION_CONFIG.news.images[this.bgIdx]}')`;

        if (id === 'wire') loadWire(STATION_CONFIG);
        if (id === 'crew') loadCrew(STATION_CONFIG);
    },

    openBio: function(id) { openBio(id, STATION_CONFIG); },
    openAdModal: openAdModal,
    calcTotal: calcTotal,
    sendEmail: sendEmail,
    genPDF: genPDF,
    openSubmitModal: openSubmitModal,
    closeModals: closeModals
};

// --- INIT APP ---
app.init();

// Export for modular usage
export { app };
