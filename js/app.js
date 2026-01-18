// ===============================
// Rock.Scot App.js
// ===============================

// Station Configuration
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
    djs: [
        { id:'alex', name:'Alex', title:'Johnstone\'s Vinyl Viking', img:'assets/images/djs/dj_alex.jpg', bio:'Born in Johnstone… deep cuts and local shout-outs.' },
        { id:'andy', name:'Andy', title:'East Kilbride\'s Rock Rebel', img:'assets/images/djs/dj_andy.jpg', bio:'From East Kilbride… high-energy playlists to listeners across Inverclyde, South Lanarkshire, and North Ayrshire.' },
        { id:'stevie', name:'Stevie', title:'Port Glasgow\'s Headbanger', img:'assets/images/djs/dj_stevie.jpg', bio:'Raised in Port Glasgow… late-night shows keep Inverclyde headbanging.' },
        { id:'mhairi', name:'Mhairi', title:'Hamilton\'s Hard Rock Queen', img:'assets/images/djs/dj_mhairi.jpg', bio:'Hamilton gave Mhairi her first taste of live rock… witty banter and killer playlists.' },
        { id:'jude', name:'Jude', title:'Irvine\'s Indie Rock Icon', img:'assets/images/djs/dj_jude.jpg', bio:'North Ayrshire’s Jude champions emerging Scottish acts alongside classics.' },
        { id:'chris', name:'Chris', title:'Greenock\'s Guitar Guru', img:'assets/images/djs/dj_chris.jpg', bio:'Greenock bred… obsessed with tone, technique, and the power of a well-executed solo.' },
        { id:'cal', name:'Cal', title:'Kilmarnock\'s Classic Rocker', img:'assets/images/djs/dj_cal.jpg', bio:'Kilmarnock hero delivering timeless rock to Rock.Scot fans.' },
        { id:'blue', name:'Blue', title:'Gourock\'s Bluesy Rock Maverick', img:'assets/images/djs/dj_blue.jpg', bio:'Gourock’s Blue blends bluesy riffs with rock energy across the Firth of Clyde.' }
    ],
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
    signals: ["LANARKSHIRE", "INVERCLYDE", "AYRSHIRE"]
};

// App Object
const app = {
    bgIdx: 0,

    init: function() {
        // Clock
        setInterval(() => {
            const d = new Date();
            document.getElementById('clock').innerText = d.toTimeString().split(' ')[0];
        }, 1000);

        // Ticker
        const msg = '<span class="ticker-item">Rock.Scot</span><span class="ticker-item ticker-brand">Across Scotland</span>';
        document.getElementById('ticker-out').innerHTML = msg.repeat(10);

        // Audio Player
        document.getElementById('player-container').innerHTML = `
            <iframe src="${STATION_CONFIG.meta.streamUrl}" style="width:100%; height:200px; border:none;" allow="autoplay"></iframe>
        `;

        // Init Packages
        const pkgSel = document.getElementById('pkg-opt');
        pkgSel.innerHTML = STATION_CONFIG.prices.packages.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
        document.getElementById('prod-price-display').innerText = `£${STATION_CONFIG.prices.productionFee}`;

        // Signals
        document.getElementById('sig-list').innerHTML = STATION_CONFIG.signals.map(l => `
            <div><span>●</span> ${l}: PEAK</div>
        `).join('');

        // Initial background
        document.body.style.backgroundImage = `url('${STATION_CONFIG.news.images[0]}')`;
    },

    switchTab: function(id, event) {
        event.preventDefault();

        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

        document.getElementById('v-' + id).classList.add('active');
        event.currentTarget.classList.add('active');

        // Change BG
        this.bgIdx = (this.bgIdx + 1) % STATION_CONFIG.news.images.length;
        document.body.style.backgroundImage = `url('${STATION_CONFIG.news.images[this.bgIdx]}')`;

        if(id === 'wire') this.loadWire();
        if(id === 'crew') this.loadCrew();
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
        const p = STATION_CONFIG.djs.find(x => x.id === id);
        if(p) {
            document.getElementById('gen-title').innerText = p.name;
            document.getElementById('gen-body').innerText = p.bio;
            document.getElementById('gen-modal').classList.add('open');
        }
    },

    loadWire: async function() {
        const g = document.getElementById('wire-grid');
        g.innerHTML = '<h3>TUNING…</h3>';
        try {
            const res = await fetch(STATION_CONFIG.news.feed);
            const data = await res.json();
            g.innerHTML = data.items.map(i => `
                <div class="uniform-card" onclick="app.openNews('${i.title.replace(/'/g, "")}', '${escape(i.description)}')">
                    <h4>${i.title}</h4>
                    <p>Tap to read</p>
                </div>
            `).join('');
        } catch(e) { g.innerHTML = '<h3>WIRE OFFLINE</h3>'; }
    },

    openNews: function(t, d) {
        document.getElementById('gen-title').innerText = t;
        document.getElementById('gen-body').innerHTML = unescape(d);
        document.getElementById('gen-modal').classList.add('open');
    },

    openAdModal: function() { document.getElementById('ad-modal').classList.add('open'); },

    calcTotal: function() {
        let base = parseInt(document.getElementById('pkg-opt').value);
        let prod = document.getElementById('prod-add').checked ? STATION_CONFIG.prices.productionFee : 0;
        let start = new Date(document.getElementById('d-start').value);
        let end = new Date(document.getElementById('d-end').value);
        let sur = 1.0;

        if(start && end && !isNaN(start) && !isNaN(end)) {
            const days = (end - start)/(1000*3600*24);
            if(days > 0 && days < STATION_CONFIG.prices.surchargeThreshold) {
                sur = STATION_CONFIG.prices.surchargeRate;
                document.getElementById('sur-alert').style.display = 'block';
            } else { document.getElementById('sur-alert').style.display = 'none'; }
        }

        let total = Math.round((base * sur) + prod);
        document.getElementById('final-price').innerText = "£" + total;
    },

    sendEmail: function() {
        const biz = document.getElementById('biz-name').value;
        const tot = document.getElementById('final-price').innerText;
        window.location.href = `mailto:${STATION_CONFIG.meta.email}?subject=Ad Inquiry: ${biz}&body=Business: ${biz}%0D%0ATotal Est: ${tot}%0D%0AI agree to terms.`;
    },

    genPDF: function() {
        document.getElementById('p-date').innerText = new Date().toLocaleDateString();
        document.getElementById('p-client').innerText = document.getElementById('biz-name').value || "CLIENT";
        document.getElementById('p-total').innerText = document.getElementById('final-price').innerText;

        const el = document.getElementById('pdf-doc');
        el.style.display = 'block';
        html2pdf().from(el).save('RockScot_Contract.pdf').then(() => el.style.display = 'none');
    },

    openSubmitModal: function() {
        document.getElementById('gen-title').innerText = "SUBMIT TRACK";
        document.getElementById('gen-body').innerHTML = `<p>Ensure 24/7 Ofcom Compliance.</p><input type="file" class="std-input"><button class="btn-auth" onclick="alert('SENT')">UPLOAD</button>`;
        document.getElementById('gen-modal').classList.add('open');
    },

    closeModals: function() {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
    }
};

// Initialize after DOM loaded
document.addEventListener("DOMContentLoaded", () => {
    app.init();
});
