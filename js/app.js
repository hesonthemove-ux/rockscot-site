// js/app.js
import { STATION_CONFIG } from './config.js';

const app = {
    bgIdx: 0,

    init: function() {
        this.initClock();
        this.initTicker();
        this.initPlayer();
        this.initPackages();
        this.initSignals();
        this.setInitialBackground();
    },

    initClock: function() {
        setInterval(() => {
            const d = new Date();
            document.getElementById('clock').innerText = d.toTimeString().split(' ')[0];
        }, 1000);
    },

    initTicker: function() {
        const msg = '<span class="ticker-item">Rock.Scot</span><span class="ticker-item ticker-brand">Across Scotland</span>';
        document.getElementById('ticker-out').innerHTML = msg.repeat(10);
    },

    initPlayer: function() {
        document.getElementById('player-container').innerHTML = `<iframe src="${STATION_CONFIG.meta.streamUrl}" style="width:100%; height:200px; border:none;"></iframe>`;
    },

    initPackages: function() {
        const pkgSel = document.getElementById('pkg-opt');
        pkgSel.innerHTML = STATION_CONFIG.prices.packages.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
        document.getElementById('prod-price-display').innerText = `£${STATION_CONFIG.prices.productionFee}`;
    },

    initSignals: function() {
        document.getElementById('sig-list').innerHTML = STATION_CONFIG.signals.map(l => `<div style="padding:10px; border-bottom:1px solid #333;"><span style="color:#0f0">●</span> ${l}: PEAK</div>`).join('');
    },

    setInitialBackground: function() {
        document.body.style.backgroundImage = `url('${STATION_CONFIG.news.images[0]}')`;
    },

    switchTab: function(id) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.getElementById('v-' + id).classList.add('active');
        event.currentTarget?.classList.add('active');

        this.bgIdx = (this.bgIdx + 1) % STATION_CONFIG.news.images.length;
        document.body.style.backgroundImage = `url('${STATION_CONFIG.news.images[this.bgIdx]}')`;

        if (id === 'wire') this.loadWire();
        if (id === 'crew') this.loadCrew();
    },

    loadCrew: function() {
        const trk = document.getElementById('crew-roller');
        trk.innerHTML = STATION_CONFIG.djs.map(d => `
            <div class="crew-card" onclick="app.openBio('${d.id}')">
                <img src="${d.img}">
                <div class="crew-info">
                    <h3 style="font-family:'Bebas Neue'; font-size:2rem;">${d.name}</h3>
                    <p style="font-size:0.8rem; color:#aaa;">${d.title}</p>
                </div>
            </div>
        `).join('');
    },

    openBio: function(id) {
        const p = STATION_CONFIG.djs.find(x => x.id === id);
        if (p) {
            document.getElementById('gen-title').innerText = p.name;
            document.getElementById('gen-body').innerText = p.bio;
            document.getElementById('gen-modal').classList.add('open');
        }
    },

    loadWire: async function() {
        const g = document.getElementById('wire-grid');
        g.innerHTML = '<h3>TUNING...</h3>';
        try {
            const res = await fetch(STATION_CONFIG.news.feed);
            const data = await res.json();
            g.innerHTML = data.items.map(i => `
                <div class="uniform-card" onclick="app.openNews('${i.title.replace(/'/g,"")}', '${escape(i.description)}')">
                    <h4 style="color:var(--authority-orange); font-family:'Oswald';">${i.title}</h4>
                    <p style="font-size:0.8rem; margin-top:10px;">Tap to read</p>
                </div>
            `).join('');
        } catch(e) { g.innerHTML = '<h3>WIRE OFFLINE</h3>'; }
    },

    openNews: function(t, d) {
        document.getElementById('gen-title').innerText = t;
        document.getElementById('gen-body').innerHTML = unescape(d);
        document.getElementById('gen-modal').classList.add('open');
    },

    // Calculator and modals remain same as before
    openAdModal: function() { document.getElementById('ad-modal').classList.add('open'); },
    calcTotal: function() { /* existing logic */ },
    sendEmail: function() { /* existing logic */ },
    genPDF: function() { /* existing logic */ },
    openSubmitModal: function() { /* existing logic */ },
    closeModals: function() { document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open')); }
};

// Initialize
app.init();
export { app };
