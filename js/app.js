const app = {
    bgIdx: 0,

    init: function() {
        // ---- CLOCK ----
        setInterval(() => {
            const d = new Date();
            document.getElementById('clock').innerText = d.toTimeString().split(' ')[0];
        }, 1000);

        // ---- TICKER ----
        const tickerMsg = '<span class="ticker-item">Rock.Scot</span><span class="ticker-item ticker-brand">Across Scotland</span>';
        const tickerEl = document.getElementById('ticker-out');
        if(tickerEl) tickerEl.innerHTML = tickerMsg.repeat(10);

        // ---- SIGNAL LIST ----
        const sigEl = document.getElementById('sig-list');
        if(sigEl) sigEl.innerHTML = STATION_CONFIG.signals.map(l => `
            <div style="padding:10px; border-bottom:1px solid #333;">
                <span style="color:#0f0">●</span> ${l}: PEAK
            </div>
        `).join('');

        // ---- INITIAL BACKGROUND ----
        if(STATION_CONFIG.news.images.length > 0) {
            document.body.style.backgroundImage = `url('${STATION_CONFIG.news.images[0]}')`;
        }

        // ---- NAVIGATION BUTTONS ----
        document.querySelectorAll('.nav-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                const target = btn.getAttribute('data-target');
                app.switchTab(target, btn);
            });
        });
    },

    switchTab: function(id, btnEl) {
        // Hide all views
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        // Remove active from buttons
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        // Show selected view
        const view = document.getElementById('v-' + id);
        if(view) view.classList.add('active');
        // Highlight button
        if(btnEl) btnEl.classList.add('active');

        // Rotate background
        this.bgIdx = (this.bgIdx + 1) % STATION_CONFIG.news.images.length;
        document.body.style.backgroundImage = `url('${STATION_CONFIG.news.images[this.bgIdx]}')`;

        // Load view-specific content
        if(id === 'wire') this.loadWire();
        if(id === 'crew') this.loadCrew();
    },

    // ---- WIRE NEWS ----
    loadWire: async function() {
        const g = document.getElementById('wire-grid');
        if(!g) return;
        g.innerHTML = '<h3>TUNING...</h3>';
        try {
            const res = await fetch(STATION_CONFIG.news.feed);
            const data = await res.json();
            g.innerHTML = data.items.map(i => `
                <div class="uniform-card" onclick="app.openNews('${i.title.replace(/'/g, '')}', '${escape(i.description)}')">
                    <h4 style="color:#ff5500; font-family:'Oswald';">${i.title}</h4>
                    <p style="font-size:0.8rem; margin-top:10px;">Tap to read</p>
                </div>
            `).join('');
        } catch(e) {
            g.innerHTML = '<h3>WIRE OFFLINE</h3>';
        }
    },

    openNews: function(title, desc) {
        const modal = document.getElementById('gen-modal');
        if(!modal) return;
        document.getElementById('gen-title').innerText = title;
        document.getElementById('gen-body').innerHTML = unescape(desc);
        modal.classList.add('open');
    },

    // ---- CREW ----
    loadCrew: function() {
        const trk = document.getElementById('crew-roller');
        if(!trk) return;
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
        if(!p) return;
        const modal = document.getElementById('gen-modal');
        if(!modal) return;
        document.getElementById('gen-title').innerText = p.name;
        document.getElementById('gen-body').innerText = p.bio;
        modal.classList.add('open');
    },

    // ---- SUBMIT MODAL ----
    openSubmitModal: function() {
        const modal = document.getElementById('gen-modal');
        if(!modal) return;
        document.getElementById('gen-title').innerText = "SUBMIT TRACK";
        document.getElementById('gen-body').innerHTML = `
            <p>Ensure 24/7 Ofcom Compliance.</p>
            <input type="file" class="std-input">
            <button class="btn-auth" onclick="alert('SENT')">UPLOAD</button>
        `;
        modal.classList.add('open');
    },

    closeModals: function() {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
    },

    // ---- AD MODAL (placeholder, existing functionality) ----
    openAdModal: function() { 
        const modal = document.getElementById('ad-modal');
        if(modal) modal.classList.add('open'); 
    }

};

// ---- INITIALIZE APP ----
document.addEventListener('DOMContentLoaded', () => app.init());
