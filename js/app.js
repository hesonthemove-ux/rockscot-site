import { STATION_CONFIG } from './config.js';

const app = {
    bgIdx: 0,

    init: function() {
        // Clock
        setInterval(() => {
            const now = new Date();
            document.getElementById('clock').innerText = now.toLocaleTimeString();
        }, 1000);

        // Ticker
        const tickerEl = document.getElementById('ticker-out');
        const msg = `<span class="ticker-item">Rock.Scot</span> <span class="ticker-item ticker-brand">Across Scotland</span>`;
        tickerEl.innerHTML = msg.repeat(10);

        // Signals
        const sigEl = document.getElementById('sig-list');
        sigEl.innerHTML = STATION_CONFIG.signals.map(s => 
            `<div style="padding:5px 0;"><span style="color:#0f0">●</span> ${s}: PEAK</div>`
        ).join('');

        // Crew
        this.loadCrew();

        // Wire
        this.loadWire();

        // Tabs
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', e => {
                this.switchTab(btn.dataset.tab);
            });
        });

        // Portal & Submit buttons
        document.getElementById('launch-portal').addEventListener('click', () => {
            alert("Portal functionality to be implemented.");
        });

        document.getElementById('start-upload').addEventListener('click', () => {
            this.openModal("SUBMIT TRACK", `<p>Ensure 24/7 OFCOM Compliance.</p><input type="file" class="std-input"><button class="btn-auth" onclick="alert('UPLOADED')">UPLOAD</button>`);
        });

        // Initial background
        document.body.style.backgroundImage = `url('${STATION_CONFIG.news.images[0]}')`;
    },

    switchTab: function(tabId) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById('v-' + tabId).classList.add('active');

        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelector(`.nav-btn[data-tab='${tabId}']`).classList.add('active');

        // Rotate background
        this.bgIdx = (this.bgIdx + 1) % STATION_CONFIG.news.images.length;
        document.body.style.backgroundImage = `url('${STATION_CONFIG.news.images[this.bgIdx]}')`;
    },

    loadCrew: function() {
        const crewEl = document.getElementById('crew-roller');
        crewEl.innerHTML = STATION_CONFIG.djs.map(d => `
            <div class="crew-card" onclick="app.openBio('${d.id}')">
                <img src="assets/images/crew/${d.img}" alt="${d.name}">
                <div class="crew-info">
                    <h3>${d.name}</h3>
                    <p>${d.title}</p>
                </div>
            </div>
        `).join('');
    },

    openBio: function(djId) {
        const dj = STATION_CONFIG.djs.find(d => d.id === djId);
        if (dj) {
            this.openModal(dj.name, `<p>${dj.bio}</p>`);
        }
    },

    loadWire: async function() {
        const wireEl = document.getElementById('wire-grid');
        wireEl.innerHTML = "<h3>Loading news...</h3>";
        try {
            const res = await fetch(STATION_CONFIG.news.feed);
            const data = await res.json();
            wireEl.innerHTML = data.items.map(i => `
                <div class="uniform-card" onclick="app.openModal('${i.title.replace(/'/g,'')}', '${i.description}')">
                    <h4>${i.title}</h4>
                    <p>Tap to read</p>
                </div>
            `).join('');
        } catch(e) {
            wireEl.innerHTML = "<h3>Wire offline</h3>";
        }
    },

    openModal: function(title, body) {
        document.getElementById('gen-title').innerText = title;
        document.getElementById('gen-body').innerHTML = body;
        document.getElementById('gen-modal').classList.add('open');
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => app.init());
