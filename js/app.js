// js/app.js
var app = {
    bgIdx: 0,

    init: function() {
        this.initClock();
        this.initTicker();
        this.initPlayer();
        this.initPackages();
        this.initSignals();
        this.setInitialBackground();
        this.bindNavButtons();
    },

    initClock: function() {
        setInterval(function() {
            var d = new Date();
            var clockEl = document.getElementById('clock');
            if(clockEl) clockEl.innerText = d.toTimeString().split(' ')[0];
        }, 1000);
    },

    initTicker: function() {
        var tickerEl = document.getElementById('ticker-out');
        if(tickerEl){
            var msg = '<span class="ticker-item">Rock.Scot</span><span class="ticker-item ticker-brand">Across Scotland</span>';
            tickerEl.innerHTML = msg.repeat(10);
        }
    },

    initPlayer: function() {
        var container = document.getElementById('player-container');
        if(container){
            container.innerHTML = '<iframe src="'+STATION_CONFIG.meta.streamUrl+'" style="width:100%; height:200px; border:none;"></iframe>';
        }
    },

    initPackages: function() {
        var pkgSel = document.getElementById('pkg-opt');
        if(pkgSel){
            pkgSel.innerHTML = STATION_CONFIG.prices.packages.map(function(p){
                return '<option value="'+p.id+'">'+p.name+'</option>';
            }).join('');
            var prodDisplay = document.getElementById('prod-price-display');
            if(prodDisplay) prodDisplay.innerText = '£'+STATION_CONFIG.prices.productionFee;
        }
    },

    initSignals: function() {
        var sigList = document.getElementById('sig-list');
        if(sigList){
            sigList.innerHTML = STATION_CONFIG.signals.map(function(l){
                return '<div style="padding:10px; border-bottom:1px solid #333;"><span style="color:#0f0">●</span> '+l+': PEAK</div>';
            }).join('');
        }
    },

    setInitialBackground: function() {
        document.body.style.backgroundImage = 'url("'+STATION_CONFIG.news.images[0]+'")';
    },

    bindNavButtons: function(){
        var buttons = document.querySelectorAll('.nav-btn');
        buttons.forEach(function(btn){
            btn.addEventListener('click', function(e){
                var target = e.currentTarget.getAttribute('onclick').replace(/app\.switchTab\('(.+)'\)/,'$1');
                app.switchTab(target, e.currentTarget);
            });
        });
    },

    switchTab: function(id, btnEl){
        document.querySelectorAll('.view').forEach(function(v){ v.classList.remove('active'); });
        document.querySelectorAll('.nav-btn').forEach(function(b){ b.classList.remove('active'); });
        var view = document.getElementById('v-'+id);
        if(view) view.classList.add('active');
        if(btnEl) btnEl.classList.add('active');

        this.bgIdx = (this.bgIdx + 1) % STATION_CONFIG.news.images.length;
        document.body.style.backgroundImage = 'url("'+STATION_CONFIG.news.images[this.bgIdx]+'")';

        if(id==='crew') this.loadCrew();
        if(id==='wire') this.loadWire();
    },

    loadCrew: function(){
        var trk = document.getElementById('crew-roller');
        if(trk){
            trk.innerHTML = STATION_CONFIG.djs.map(function(d){
                return '<div class="crew-card" onclick="app.openBio(\''+d.id+'\')">'+
                        '<img src="'+d.img+'">'+
                        '<div class="crew-info">'+
                        '<h3 style="font-family:\'Bebas Neue\'; font-size:2rem;">'+d.name+'</h3>'+
                        '<p style="font-size:0.8rem; color:#aaa;">'+d.title+'</p>'+
                        '</div></div>';
            }).join('');
        }
    },

    openBio: function(id){
        var p = STATION_CONFIG.djs.find(function(d){ return d.id===id; });
        if(p){
            var titleEl = document.getElementById('gen-title');
            var bodyEl = document.getElementById('gen-body');
            var modal = document.getElementById('gen-modal');
            if(titleEl) titleEl.innerText = p.name;
            if(bodyEl) bodyEl.innerText = p.bio;
            if(modal) modal.classList.add('open');
        }
    },

    loadWire: async function(){
        var g = document.getElementById('wire-grid');
        if(!g) return;
        g.innerHTML = '<h3>TUNING...</h3>';
        try{
            var res = await fetch(STATION_CONFIG.news.feed);
            var data = await res.json();
            g.innerHTML = data.items.map(function(i){
                return '<div class="uniform-card" onclick="app.openNews(\''+i.title.replace(/'/g,'')+'\',\''+escape(i.description)+'\')">'+
                        '<h4 style="color:var(--authority-orange); font-family:\'Oswald\';">'+i.title+'</h4>'+
                        '<p style="font-size:0.8rem; margin-top:10px;">Tap to read</p></div>';
            }).join('');
        }catch(e){ g.innerHTML = '<h3>WIRE OFFLINE</h3>'; }
    },

    openNews: function(t,d){
        var titleEl = document.getElementById('gen-title');
        var bodyEl = document.getElementById('gen-body');
        var modal = document.getElementById('gen-modal');
        if(titleEl) titleEl.innerText = t;
        if(bodyEl) bodyEl.innerHTML = unescape(d);
        if(modal) modal.classList.add('open');
    },

    openAdModal: function(){ document.getElementById('ad-modal')?.classList.add('open'); },
    closeModals: function(){ document.querySelectorAll('.modal-overlay').forEach(function(m){ m.classList.remove('open'); }); }
};

window.addEventListener('DOMContentLoaded', function(){ app.init(); });
