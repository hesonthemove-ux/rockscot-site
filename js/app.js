/*** Rock.Scot App ***/

import { STATION_CONFIG } from './config.js';

const app = {
    bgIdx: 0,

    init: function() {
        // Clock
        setInterval(() => {
            const now = new Date();
            document.getElementById('clock').innerText = now.toTimeString().split(' ')[0];
        }, 1000);

        // Ticker
        const tickerEl = document.getElementById('ticker-out');
        const msg = '<span class="ticker-item">Rock.Scot</span><span class="ticker-item ticker-brand">Across Scotland</span>';
        tickerEl.innerHTML = msg.repeat(10);

        // Signals
        const sigList = document.getElementById('sig-list');
        sigList.innerHTML = STATION_CONFIG.signals.map(l => `<div><span class="signal-dot">●</span> ${l}: PEAK</div>`).join('');

        // Background image
        document.body.style.backgroundImage = `url('${STATION_CONFIG.news.images[0]}')`;

        // Crew load
        this.loadCrew();
    },

    switchTab: function(id, event) {
        event.preventDefault();

        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById('v-' + id).classList.add('active');

        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        if(event.currentTarget) event.currentTarget.classList.add('active');

        // Rotate background
        this.bgIdx = (this.bgIdx + 1) % STATION_CONFIG.news.images.length;
        document.body.style.backgroundImage = `url('${STATION_CONFIG.news.images[this.bgIdx]}')`;

        if(id === 'wire') this.loadWire();
        if(id === 'crew') this.loadCrew();
    },

    loadCrew: function() {
        const trk = document.getElementById('crew-roller');
        trk.innerHTML = STATION_CONFIG.djs.map(d => `
            <div class="crew-card" onclick="app.openBio('${d.id}')">
                <img src="${d.img}" alt="${d.name}">
                <div class="crew-info">
                    <h3>${d.name}</h3>
                    <p>${d.title}</p>
                </div>
            </div>
        `).join('');
    },

    openBio: function(id) {
        const dj = STATION_CONFIG.djs.find(d => d.id === id);
        if(dj) {
            document.getElementById('gen-title').innerText = dj.name;
            document.getElementById('gen-body').innerText = dj.bio;
            document.getElementById('gen-modal').classList.add('open');
        }
    },

    loadWire: async function() {
        const grid = document.getElementById('wire-grid');
        grid.innerHTML = '<h3>Loading news...</h3>';
        try {
            const res = await fetch(STATION_CONFIG.news.feed);
            const data = await res.json();
            grid.innerHTML = data.items.map(i => `
                <div class="uniform-card" onclick="app.openNews('${i.title.replace(/'/g,'')}', '${escape(i.description)}')">
                    <h4>${i.title}</h4>
                    <p>Tap to read</p>
                </div>
            `).join('');
        } catch(e) {
            grid.innerHTML = '<h3>Wire offline</h3>';
        }
    },

    openNews: function(title, desc) {
        document.getElementById('gen-title').innerText = title;
        document.getElementById('gen-body').innerHTML = unescape(desc);
        document.getElementById('gen-modal').classList.add('open');
    },

    openAdModal: function() {
        document.getElementById('ad-modal').classList.add('open');
    },

    openSubmitModal: function() {
        document.getElementById('gen-title').innerText = "Submit Track";
        document.getElementById('gen-body').innerHTML = `
            <p>Ensure 24/7 OFCOM compliance. Max 25MB.</p>
            <input type="file" class="std-input">
            <button class="btn-auth" onclick="alert('Upload sent')">Upload</button>
        `;
        document.getElementById('gen-modal').classList.add('open');
    },

    closeModals: function() {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
    }
};

// Wait for DOM before init
document.addEventListener("DOMContentLoaded", () => {
    app.init();
});

export { app };
