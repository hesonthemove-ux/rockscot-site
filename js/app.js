/** ==========================================
 * CONFIGURATION
 * ==========================================
 */
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
        surchargeThreshold: 28, // days
        surchargeRate: 1.3 // 30% add-on
    },
    djs: [
        { id:'alex', name:'ALEX', title:"Johnstone's Vinyl Viking", img:'assets/images/djs/dj_alex.jpg', bio:'Born and bred in Johnstone...'}, 
        { id:'andy', name:'ANDY', title:"East Kilbride's Rock Rebel", img:'assets/images/djs/dj_andy.jpg', bio:'Hailing from East Kilbride...'}, 
        { id:'stevie', name:'STEVIE', title:"Port Glasgow Headbanger", img:'assets/images/djs/dj_stevie.jpg', bio:'From the shipbuilding heart of Port Glasgow...'}, 
        { id:'mhairi', name:'MHAIRI', title:"Hamilton's Hard Rock Queen", img:'assets/images/djs/dj_mhairi.jpg', bio:'Hamilton in South Lanarkshire...'}, 
        { id:'jude', name:'JUDE', title:"Irvine's Indie Rock Icon", img:'assets/images/djs/dj_jude.jpg', bio:'North Ayrshire\'s Irvine is Jude\'s stomping ground...'}, 
        { id:'chris', name:'CHRIS', title:"Greenock's Guitar Guru", img:'assets/images/djs/dj_chris.jpg', bio:'Greenock in Inverclyde bred Chris...'}, 
        { id:'cal', name:'CAL', title:"Kilmarnock's Classic Rocker", img:'assets/images/djs/dj_cal.jpg', bio:'Straight out of Kilmarnock...'}, 
        { id:'blue', name:'BLUE', title:"Gourock's Bluesy Maverick", img:'assets/images/djs/dj_blue.jpg', bio:'From the seaside charm of Gourock...'}
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

/** ==========================================
 * APP ENGINE
 * ==========================================
 */
const app = {
    bgIdx: 0,

    init: function() {
        // Clock
        setInterval(() => {
            const d = new Date();
            document.getElementById('clock').innerText = d.toLocaleTimeString();
        }, 1000);

        // Ticker
        const msg = '<span class="ticker-item">Rock.Scot</span><span class="ticker-item ticker-brand">Across Scotland</span>';
        document.getElementById('ticker-out').innerHTML = msg.repeat(10);

        // Player
        document.getElementById('audio-container').innerHTML = `<iframe src="${STATION_CONFIG.meta.streamUrl}" style="width:100%; height:60px; border:none;" allow="autoplay"></iframe>`;

        // Packages
        const pkgSel = document.getElementById('pkg-opt');
        pkgSel.innerHTML = STATION_CONFIG.prices.packages.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
        document.getElementById('prod-price-display').innerText = `£${STATION_CONFIG.prices.productionFee}`;

        // Signals
        document.getElementById('sig-list').innerHTML = STATION_CONFIG.signals.map(l=>`<div style="padding:5px; border-bottom:1px solid #333;"><span style="color:#0f0">●</span> ${l}: PEAK</div>`).join('');

        // Initial Background
        document.body.style.backgroundImage = `url('${STATION_CONFIG.news.images[0]}')`;
    },

    switchTab: function(id, evt) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.getElementById('v-'+id).classList.add('active');
        if(evt) evt.currentTarget.classList.add('active');

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
        g.innerHTML = '<h3>TUNING...</h3>';
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

    openNews: function(t,d) {
        document.getElementById('gen-title').innerText = t;
        document.getElementById('gen-body').innerHTML = unescape(d);
        document.getElementById('gen-modal').classList.add('open');
    },

    openAdModal: function(){ document.getElementById('ad-modal').classList.add('open'); },
    openSubmitModal: function(){
        document.getElementById('gen-title').innerText = "SUBMIT TRACK";
        document.getElementById('gen-body').innerHTML = `<p>Ensure 24/7 OFCOM Compliance.</p><input type="file" class="std-input"><button class="btn-auth" onclick="alert('SENT')">UPLOAD</button>`;
        document.getElementById('gen-modal').classList.add('open');
    },
    closeModals: function(){ document.querySelectorAll('.modal-overlay').forEach(m=>m.classList.remove('open')); },

    // --- CALCULATOR ---
    calcTotal: function(){
        let base = parseInt(document.getElementById('pkg-opt').value);
        let prod = document.getElementById('prod-add').checked ? STATION_CONFIG.prices.productionFee : 0;
        let start = new Date(document.getElementById('d-start').value);
        let end = new Date(document.getElementById('d-end').value);
        let sur = 1.0;

        if(start && end && !isNaN(start) && !isNaN(end)){
            const days = (end-start)/(1000*3600*24);
            if(days>0 && days<STATION_CONFIG.prices.surchargeThreshold){
                sur = STATION_CONFIG.prices.surchargeRate;
                document.getElementById('sur-alert').style.display='block';
            } else { document.getElementById('sur-alert').style.display='none'; }
        }
        let total = Math.round((base*sur)+prod);
        document.getElementById('final-price').innerText = "£"+total;
    },

    sendEmail: function(){
        const biz = document.getElementById('biz-name').value;
        const tot = document.getElementById('final-price').innerText;
        window.location.href = `mailto:${STATION_CONFIG.meta.email}?subject=Ad Inquiry: ${biz}&body=Business: ${biz}%0D%0ATotal Est: ${tot}%0D%0AI agree to terms.`;
    },

    genPDF: function(){
        const el = document.getElementById('pdf-doc');
        el.style.display='block';
        html2pdf().from(el).save('RockScot_Contract.pdf').then(()=>{el.style.display='none';});
    }
};

// Initialize app
app.init();
