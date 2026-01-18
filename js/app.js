// app.js
import { STATION_CONFIG } from './config.js';

const app = {
    bgIdx: 0,
    audioPlaying: true,

    init() {
        this.initClock();
        this.initTicker();
        this.initPlayer();
        this.initSignals();
        this.initBackground();
        this.loadCrew();
    },

    // ---------------- CLOCK ----------------
    initClock() {
        const clockEl = document.getElementById('clock');
        setInterval(() => {
            const now = new Date();
            const timeStr = now.toTimeString().split(' ')[0];
            clockEl.textContent = timeStr;
        }, 1000);
    },

    // ---------------- TICKER ----------------
    initTicker() {
        const ticker = document.getElementById('ticker-out');
        ticker.innerHTML = '<span class="ticker-item">Rock.Scot</span><span class="ticker-item ticker-brand">Across Scotland</span>'.repeat(10);
    },

    // ---------------- AUDIO ----------------
    initPlayer() {
        const container = document.getElementById('audio-container');
        container.innerHTML = `<iframe src="${STATION_CONFIG.meta.streamUrl}" style="width:100%; height:200px; border:none;" allow="autoplay"></iframe>`;
    },

    // ---------------- SIGNALS ----------------
    initSignals() {
        const sigList = document.getElementById('sig-list');
        sigList.innerHTML = STATION_CONFIG.signals.map(s => `<div><span style="color:#0f0">●</span> ${s}: PEAK</div>`).join('');
    },

    // ---------------- BACKGROUND ROTATION ----------------
    initBackground() {
        if(STATION_CONFIG.news.images && STATION_CONFIG.news.images.length > 0){
            document.body.style.backgroundImage = `url('${STATION_CONFIG.news.images[0]}')`;
            setInterval(() => {
                this.bgIdx = (this.bgIdx + 1) % STATION_CONFIG.news.images.length;
                document.body.style.backgroundImage = `url('${STATION_CONFIG.news.images[this.bgIdx]}')`;
            }, 10000); // rotate every 10s
        }
    },

    // ---------------- MENU TAB SWITCH ----------------
    switchTab(tabId) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.getElementById('v-' + tabId).classList.add('active');
        event.currentTarget.classList.add('active');

        if(tabId === 'wire') this.loadWire();
        if(tabId === 'crew') this.loadCrew();
    },

    // ---------------- WIRE ----------------
    async loadWire() {
        const grid = document.getElementById('wire-grid');
        grid.innerHTML = '<h3>TUNING...</h3>';
        try {
            const res = await fetch(STATION_CONFIG.news.feed);
            const data = await res.json();
            grid.innerHTML = data.items.map(i => `
                <div class="uniform-card" onclick="app.openNews('${i.title.replace(/'/g, "")}', '${escape(i.description)}')">
                    <h4 style="color:var(--authority-orange); font-family:'Oswald';">${i.title}</h4>
                    <p style="font-size:0.8rem; margin-top:10px;">Tap to read</p>
                </div>
            `).join('');
        } catch (e) {
            grid.innerHTML = '<h3>WIRE OFFLINE</h3>';
        }
    },

    openNews(title, description) {
        document.getElementById('gen-title').textContent = title;
        document.getElementById('gen-body').innerHTML = unescape(description);
        document.getElementById('gen-modal').classList.add('open');
    },

    // ---------------- CREW ----------------
    loadCrew() {
        const track = document.getElementById('crew-roller');
        track.innerHTML = STATION_CONFIG.djs.map(d => `
            <div class="crew-card" onclick="app.openBio('${d.id}')">
                <img src="assets/images/djs/${d.img}" alt="${d.name}">
                <div class="crew-info">
                    <h3 style="font-family:'Bebas Neue'; font-size:2rem;">${d.name}</h3>
                    <p style="font-size:0.8rem; color:#aaa;">${d.title}</p>
                </div>
            </div>
        `).join('');
    },

    openBio(id) {
        const dj = STATION_CONFIG.djs.find(x => x.id === id);
        if(dj) {
            document.getElementById('gen-title').textContent = dj.name;
            document.getElementById('gen-body').textContent = dj.bio;
            document.getElementById('gen-modal').classList.add('open');
        }
    },

    // ---------------- AD MODAL ----------------
    openAdModal() {
        document.getElementById('ad-modal').classList.add('open');
    },

    // ---------------- SUBMIT MODAL ----------------
    openSubmitModal() {
        document.getElementById('gen-title').textContent = "SUBMIT TRACK";
        document.getElementById('gen-body').innerHTML = `<p>Ensure 24/7 OFCOM Compliance.</p><input type="file" class="std-input"><button class="btn-auth" onclick="alert('SENT')">UPLOAD</button>`;
        document.getElementById('gen-modal').classList.add('open');
    },

    // ---------------- CLOSE MODALS ----------------
    closeModals() {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => app.init());
export { app };
