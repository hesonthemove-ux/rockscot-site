// ========================
// Main App Module
// ========================

import { STATION_CONFIG } from './config.js';
import { loadWire } from './wire.js';
import { openAdModal, calcTotal, sendEmail, genPDF } from './ads.js';
import { openSubmitModal, closeModals } from './modals.js';

window.app = {
    bgIdx: 0,

    init: function() {
        // Init Clock
        setInterval(() => {
            const d = new Date();
            const clockEl = document.getElementById('clock');
            if(clockEl) clockEl.innerText = d.toTimeString().split(' ')[0];
        }, 1000);

        // Init Ticker
        const tickerEl = document.getElementById('ticker-out');
        if(tickerEl) {
            const msg = '<span class="ticker-item">Rock.Scot</span><span class="ticker-item ticker-brand">Across Scotland</span>';
            tickerEl.innerHTML = msg.repeat(10);
        }

        // Init Player
        const playerContainer = document.getElementById('player-container');
        if(playerContainer) {
            playerContainer.innerHTML = `<iframe src="${STATION_CONFIG.meta.streamUrl}" style="width:100%; height:200px; border:none;" allow="autoplay"></iframe>`;
        }

        // Init Packages in Select Box
        const pkgSel = document.getElementById('pkg-opt');
        if(pkgSel) {
            pkgSel.innerHTML = STATION_CONFIG.prices.packages.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
            const prodPrice = document.getElementById('prod-price-display');
            if(prodPrice) prodPrice.innerText = `£${STATION_CONFIG.prices.productionFee}`;
        }

        // Init Signals
        const sigList = document.getElementById('sig-list');
        if(sigList) {
            sigList.innerHTML = STATION_CONFIG.signals.map(l=>`<div style="padding:10px; border-bottom:1px solid #333;"><span style="color:#0f0">●</span> ${l}: PEAK</div>`).join('');
        }

        // Initial Background
        document.body.style.backgroundImage = `url('${STATION_CONFIG.news.images[0]}')`;

        // Navigation Buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = btn.dataset.tab;
                if(tab) window.app.switchTab(tab, e.currentTarget);
            });
        });
    },

    switchTab: function(id, btnEl) {
        // Show/Hide Views
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        const view = document.getElementById('v-' + id);
        if(view) view.classList.add('active');

        // Update Nav Button
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        if(btnEl) btnEl.classList.add('active');

        // Background Rotation
        this.bgIdx = (this.bgIdx + 1) % STATION_CONFIG.news.images.length;
        document.body.style.backgroundImage = `url('${STATION_CONFIG.news.images[this.bgIdx]}')`;

        // Load content if necessary
        if(id === 'wire') loadWire(STATION_CONFIG);
        if(id === 'crew') this.loadCrew();
    },

    loadCrew: function() {
        const trk = document.getElementById('crew-roller');
        if(!trk) return;

        trk.innerHTML = STATION_CONFIG.djs.map(d => `
            <div class="crew-card" onclick="window.app.openBio('${d.id}')">
                <img src="${d.img}" alt="${d.name}">
                <div class="crew-info">
                    <h3 style="font-family:'Bebas Neue'; font-size:2rem;">${d.name}</h3>
                    <p style="font-size:0.8rem; color:#aaa;">${d.title}</p>
                </div>
            </div>
        `).join('');
    },

    openBio: function(id) {
        const dj = STATION_CONFIG.djs.find(x => x.id === id);
        if(dj) {
            const titleEl = document.getElementById('gen-title');
            const bodyEl = document.getElementById('gen-body');
            const modal = document.getElementById('gen-modal');
            if(titleEl) titleEl.innerText = dj.name;
            if(bodyEl) bodyEl.innerText = dj.bio;
            if(modal) modal.classList.add('open');
        }
    },

    // --- Ads ---
    openAdModal,
    calcTotal,
    sendEmail,
    genPDF,

    // --- Modals ---
    openSubmitModal,
    closeModals
};

// Initialize the App
window.addEventListener('DOMContentLoaded', () => window.app.init());
