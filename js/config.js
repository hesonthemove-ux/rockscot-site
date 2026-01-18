// js/config.js
export const STATION_CONFIG = {
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
        { id:'alex', name:'ALEX', title:"Johnstone's Vinyl Viking", img:'./assets/images/crew/dj_alex.jpg', bio:'Known as "Johnstone\'s Vinyl Viking"...' },
        { id:'andy', name:'ANDY', title:"East Kilbride Rebel", img:'./assets/images/crew/dj_andy.jpg', bio:'The East Kilbride Rebel, Andy brings...'},
        { id:'stevie', name:'STEVIE', title:"Port Glasgow Headbanger", img:'./assets/images/crew/dj_stevie.jpg', bio:'Stevie is the Port Glasgow Headbanger...'},
        { id:'mhairi', name:'MHAIRI', title:"Hamilton's Hard Rock Queen", img:'./assets/images/crew/dj_mhairi.jpg', bio:'Mhairi combines sharp wit...'},
        { id:'jude', name:'JUDE', title:"Irvine's Indie Rock Icon", img:'./assets/images/crew/dj_jude.jpg', bio:'Jude represents the cool, melodic side...'},
        { id:'chris', name:'CHRIS', title:"Greenock's Guitar Guru", img:'./assets/images/crew/dj_chris.jpg', bio:'Chris was bred on the raw energy...'},
        { id:'cal', name:'CAL', title:"Kilmarnock's Classic Rocker", img:'./assets/images/crew/dj_cal.jpg', bio:'Cal is a hometown hero...'},
        { id:'blue', name:'BLUE', title:"Gourock's Bluesy Maverick", img:'./assets/images/crew/dj_blue.jpg', bio:'Blue brings a soulful, rootsy vibe...'}
    ],
    news: {
        feed: "https://api.rss2json.com/v1/api.json?rss_url=https://snackmag.co.uk/category/music/feed",
        images: [
            './assets/images/background/background1.jpg',
            './assets/images/background/background2.jpg',
            './assets/images/background/background3.jpg',
            './assets/images/background/background4.jpg',
            './assets/images/background/background5.jpg',
            './assets/images/background/background6.jpg',
            './assets/images/background/background7.jpg'
        ]
    },
    signals: ["LANARKSHIRE", "INVERCLYDE", "AYRSHIRE"]
};
