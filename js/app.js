/** ===================================================
 * Rock.Scot App.js – Functional, Modular, SEO Ready
 * =================================================== */

const STATION_CONFIG = {
    meta: {
        email: "sales@rock.scot",
        streamUrl: "https://player.broadcast.radio/caledonia-tx-ltd"
    },
    djs: [
        {
            id: 'andy',
            name: "Andy – East Kilbride's Rock Rebel",
            bio: `Hailing from East Kilbride in South Lanarkshire, Andy grew up blasting Biffy Clyro anthems from his bedroom. Pirate radio in his garage before Rock.Scot. Favourite band: Biffy Clyro. Best gig: Franz Ferdinand at Barrowland Ballroom. Dream venue: King Tut's Wah Wah Hut. Fun fact: Crowd-surfed and lost a shoe.`
        },
        {
            id: 'alex',
            name: "Alex – Johnstone's Vinyl Viking",
            bio: `Johnstone born, vinyl collector, deep cut specialist. Favourite band: Nazareth. Best gig: Texas at SEC Armadillo. Dream venue: Barrowland Ballroom. Fun fact: Scratched signed Deacon Blue vinyl.`
        },
        {
            id: 'stevie',
            name: "Stevie – Port Glasgow's Headbanger",
            bio: `Raised in Port Glasgow, garage band teen turned DJ. Favourite band: Big Country. Best gig: Mogwai at Òran Mór. Dream venue: Beacon Arts Centre. Fun fact: High-fived Angus Young (rumor).`
        },
        {
            id: 'mhairi',
            name: "Mhairi – Hamilton's Hard Rock Queen",
            bio: `Hamilton rock lover, ex-CD collector, sharp wit on air. Favourite band: The Jesus and Mary Chain. Best gig: Teenage Fanclub at King Tut's. Dream venue: Grand Hall Kilmarnock. Fun fact: Tattoo artist for band logos.`
        },
        {
            id: 'jude',
            name: "Jude – Irvine's Indie Rock Icon",
            bio: `Irvine local, melodic rock champion, Scottish indie fan. Favourite band: Travis. Best gig: Idlewild at Barrowland. Dream venue: Harbour Arts Centre. Fun fact: Hitchhiked to Franz Ferdinand gig.`
        },
        {
            id: 'chris',
            name: "Chris – Greenock's Guitar Guru",
            bio: `Greenock bred, Primal Scream lover, pub DJ origin. Favourite band: Primal Scream. Best gig: Simple Minds at OVO Hydro. Dream venue: Cathouse Rock Club. Fun fact: Can air-guitar Big Country perfectly.`
        },
        {
            id: 'cal',
            name: "Cal – Kilmarnock's Classic Rocker",
            bio: `Kilmarnock local, Biffy Clyro fan, DJ pro. Favourite band: Biffy Clyro. Best gig: The Fratellis at Grand Hall Kilmarnock. Dream venue: Palace Theatre. Fun fact: Won an air guitar contest.`
        },
        {
            id: 'blue',
            name: "Blue – Gourock's Bluesy Rock Maverick",
            bio: `Seaside Gourock DJ, blues-rock specialist. Favourite band: Nazareth. Best gig: Texas at Paisley Arts Centre. Dream venue: Beacon Arts Centre. Fun fact: Blue hair got mistaken for roadie at Mogwai gig.`
        }
    ],
    ticker: [
        "Rock.Scot – Central Scotland's Rock Authority",
        "Loud rock, indie & alternative music",
        "Broadcasting Lanarkshire, Ayrshire & Inverclyde"
    ]
};

/* ===================================================
   APP ENGINE
=================================================== */
const app = {
    currentView: 'live',
    audio: null,

    init: function() {
        // Initialize Clock
        setInterval(this.updateClock, 1000);
        this.updateClock();

        // Init Ticker
        this.loadTicker();

        // Init Audio
        this.initAudio();

        // Init Nav Links
        this.initNav();

        // Load default view
        this.showView('live');

        // Load Crew cards
        this.loadCrew();
    },

    updateClock: function() {
        const clockEl = document.getElementById('clock');
        const now = new Date();
        clockEl.innerText = now.toLocaleTimeString('en-GB', { hour12: false });
    },

    loadTicker: function() {
        const tickerEl = document.createElement('div');
        tickerEl.className = 'ticker';
        tickerEl.style.whiteSpace = 'nowrap';
        tickerEl.style.overflow = 'hidden';
        tickerEl.style.width = '100%';
        tickerEl.style.display = 'block';
        tickerEl.style.background = '#111';
        tickerEl.style.color = '#aaa';
        tickerEl.style.padding = '5px 0';
        tickerEl.style.fontFamily = "'Oswald', sans-serif";
        tickerEl.style.fontWeight = '500';
        document.body.prepend(tickerEl);

        let tickerText = STATION_CONFIG.ticker.join(" — ") + " — ";
        tickerText = tickerText.repeat(10);
        tickerEl.innerText = tickerText;

        let offset = 0;
        setInterval(() => {
            offset -= 1;
            if(Math.abs(offset) > tickerEl.scrollWidth / 2) offset = 0;
            tickerEl.style.transform = `translateX(${offset}px)`;
        }, 50);
    },

    initAudio: function() {
        this.audio = new Audio(STATION_CONFIG.meta.streamUrl);
        this.audio.autoplay = false;
        this.audio.loop = true;
        this.audio.controls = true;

        // Insert into player container
        const container = document.querySelector('section#live .player');
        container.innerHTML = '';
        container.appendChild(this.audio);
    },

    initNav: function() {
        document.querySelectorAll('nav.main-nav a').forEach(a => {
            a.addEventListener('click', (e) => {
                e.preventDefault();
                const target = a.getAttribute('href').replace('#', '');
                this.showView(target);
            });
        });
    },

    showView: function(view) {
        document.querySelectorAll('section').forEach(s => s.style.display = 'none');
        const el = document.getElementById(view);
        if(el) el.style.display = 'block';
        this.currentView = view;
    },

    loadCrew: function() {
        const crewSection = document.getElementById('crew');
        const grid = document.createElement('div');
        grid.className = 'crew-grid';

        STATION_CONFIG.djs.forEach(dj => {
            const card = document.createElement('div');
            card.className = 'crew-card';
            card.innerHTML = `
                <h3>${dj.name}</h3>
                <p>${dj.bio}</p>
            `;
            grid.appendChild(card);
        });

        crewSection.appendChild(grid);
    }
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => app.init());
