/** ==========================================
 * Rock.Scot Phase 5 App.js
 * Handles: clock, ticker, crew, wire, modals, audio, portal
 * ========================================== */

const STATION_CONFIG = {
    meta: {
        email: "sales@rock.scot",
        streamUrl: "https://player.broadcast.radio/caledonia-tx-ltd"
    },
    prices: {
        packages: [
            { id: 299, name: "Single Region (£299)" },
            { id: 449, name: "Multi-Region (£449)" },
            { id: 2500, name: "Top-of-Hour Exclusive (£2,500/mo)" }
        ],
        productionFee: 195,
        surchargeThreshold: 28,
        surchargeRate: 1.3
    },
    signals: ["LANARKSHIRE", "INVERCLYDE", "AYRSHIRE"],
    news: {
        feed: "https://api.rss2json.com/v1/api.json?rss_url=https://snackmag.co.uk/category/music/feed",
        images: [
            "assets/images/background/background1.jpg",
            "assets/images/background/background2.jpg",
            "assets/images/background/background3.jpg",
            "assets/images/background/background4.jpg",
            "assets/images/background/background5.jpg",
            "assets/images/background/background6.jpg",
            "assets/images/background/background7.jpg"
        ]
    },
    djs: [
        { id:'andy', name:'ANDY', title:"East Kilbride's Rock Rebel", img:'assets/images/crew/dj_andy.jpg', bio:'Hailing from East Kilbride in South Lanarkshire, Andy grew up blasting Biffy Clyro anthems from his bedroom in the new town suburbs. ...' },
        { id:'alex', name:'ALEX', title:"Johnstone's Vinyl Viking", img:'assets/images/crew/dj_alex.jpg', bio:'Born and bred in Johnstone ...' },
        { id:'stevie', name:'STEVIE', title:"Port Glasgow's Headbanger", img:'assets/images/crew/dj_stevie.jpg', bio:'From the shipbuilding heart of Port Glasgow ...' },
        { id:'mhairi', name:'MHAIRI', title:"Hamilton's Hard Rock Queen", img:'assets/images/crew/dj_mhairi.jpg', bio:'Hamilton in South Lanarkshire gave Mhairi ...' },
        { id:'jude', name:'JUDE', title:"Irvine's Indie Rock Icon", img:'assets/images/crew/dj_jude.jpg', bio:'North Ayrshire's Irvine is Jude\'s stomping ground ...' },
        { id:'chris', name:'CHRIS', title:"Greenock's Guitar Guru", img:'assets/images/crew/dj_chris.jpg', bio:'Greenock in Inverclyde bred Chris ...' },
        { id:'cal', name:'CAL', title:"Kilmarnock's Classic Rocker", img:'assets/images/crew/dj_cal.jpg', bio:'Straight out of Kilmarnock in the Ayrshire heartlands ...' },
        { id:'blue', name:'BLUE', title:"Gourock's Bluesy Rock Maverick", img:'assets/images/crew/dj_blue.jpg', bio:'From the seaside charm of Gourock in Inverclyde ...' }
    ]
};

const app = {
    bgIdx: 0,
    audio: null,

    init: function() {
        // Clock
        setInterval(() => {
            const d = new Date();
            document.getElementById('clock').innerText = d.toTimeString().split(' ')[0];
        }, 1000);

        // Ticker
        const tickerMsg = '<span class="ticker-item">Rock.Scot</span><span class="ticker-item">Across Scotland</span>';
        document.getElementById('ticker-out').innerHTML = tickerMsg.repeat(10);

        // Background
        document.body.style.backgroundImage = `url('${STATION_CONFIG.news.images[0]}')`;

        // Audio player
        this.audio = new Audio(STATION_CONFIG.meta.streamUrl);
        this.audio.autoplay = true;
        this.audio.controls = true;
        this.audio.loop = true;
        document.getElementById('player-container').appendChild(this.audio);

        // Signals
        this.renderSignals();

        // Packages
        const pkgSel = document.getElementById('pkg-opt');
        pkgSel.innerHTML = STATION_CONFIG.prices.packages.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
        document.getElementById('prod-price-display').innerText = `£${STATION_CONFIG.prices.productionFee}`;

        // Register service worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js');
        }
    },

    renderSignals: function() {
        const sigList = document.getElementById('sig-list');
        sigList.innerHTML = STATION_CONFIG.signals.map(s => `<div style="padding:5px 0;"><span style="color:#0f0">●</span> ${s}: PEAK</div>`).join('');
    },

    switchTab: function(id) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById('v-' + id).classList.add('active');
        this.rotateBackground();

        if(id === 'crew') this.loadCrew();
        if(id === 'wire') this.loadWire();
    },

    rotateBackground: function() {
        this.bgIdx = (this.bgIdx + 1) % STATION_CONFIG.news.images.length;
        document.body.style.backgroundImage = `url('${STATION_CONFIG.news.images[this.bgIdx]}')`;
    },

    loadCrew: function() {
        const trk = document.getElementById('crew-roller');
        trk.innerHTML = STATION_CONFIG.djs.map(d => `
            <div class="crew-card" onclick="app.openBio('${d.id}')">
                <img src="${d.img}">
                <div class="crew-info">
                    <h3>${d.name}</h3>
                    <p>${d.title}</p>
                </div>
            </div>
        `).join('');
    },

    openBio: function(id) {
        const p = STATION_CONFIG.djs.find(d => d.id === id);
        if(p) {
            document.getElementById('gen-title').innerText = p.name;
            document.getElementById('gen-body').innerText = p.bio;
            document.getElementById('gen-modal').classList.add('open');
        }
    },

    loadWire: async function() {
        const grid = document.getElementById('wire-grid');
        grid.innerHTML = '<h3>TUNING...</h3>';
        try {
            const res = await fetch(STATION_CONFIG.news.feed);
            const data = await res.json();
            grid.innerHTML = data.items.map(i => `
                <div class="uniform-card" onclick="app.openNews('${i.title.replace(/'/g, "")}', '${escape(i.description)}')">
                    <h4>${i.title}</h4>
                    <p style="font-size:0.8rem;">Tap to read</p>
                </div>
            `).join('');
        } catch {
            grid.innerHTML = '<h3>WIRE OFFLINE</h3>';
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

    calcTotal: function() {
        const base = parseInt(document.getElementById('pkg-opt').value);
        const prod = document.getElementById('prod-add').checked ? STATION_CONFIG.prices.productionFee : 0;
        const start = new Date(document.getElementById('d-start').value);
        const end = new Date(document.getElementById('d-end').value);
        let sur = 1.0;

        if(start && end && !isNaN(start) && !isNaN(end)) {
            const days = (end-start)/(1000*3600*24);
            if(days>0 && days<STATION_CONFIG.prices.surchargeThreshold) {
                sur = STATION_CONFIG.prices.surchargeRate;
                document.getElementById('sur-alert').style.display = 'block';
            } else {
                document.getElementById('sur-alert').style.display = 'none';
            }
        }

        const total = Math.round((base*sur) + prod);
        document.getElementById('final-price').innerText = "£" + total;
    },

    sendEmail: function() {
        const biz = document.getElementById('biz-name').value;
        const tot = document.getElementById('final-price').innerText;
        window.location.href = `mailto:${STATION_CONFIG.meta.email}?subject=Ad Inquiry: ${biz}&body=Business: ${biz}%0D%0ATotal Est: ${tot}%0D%0AI agree to terms.`;
    },

    genPDF: function() {
        const el = document.getElementById('pdf-doc');
        el.style.display = 'block';
        document.getElementById('p-date').innerText = new Date().toLocaleDateString();
        document.getElementById('p-client').innerText = document.getElementById('biz-name').value || "CLIENT";
        document.getElementById('p-total').innerText = document.getElementById('final-price').innerText;
        html2pdf().from(el).save('RockScot_Contract.pdf').then(()=>{el.style.display='none';});
    },

    openSubmitModal: function() {
        document.getElementById('gen-title').innerText = "SUBMIT TRACK";
        document.getElementById('gen-body').innerHTML = `<p>Ensure 24/7 Ofcom Compliance.</p>
            <input type="file" class="std-input">
            <button class="btn-auth" onclick="alert('SENT')">UPLOAD</button>`;
        document.getElementById('gen-modal').classList.add('open');
    },

    closeModals: function() {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
    }
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => app.init());
