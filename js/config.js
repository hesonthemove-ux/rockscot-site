// config.js
// Central configuration for Rock.Scot site

export const STATION_CONFIG = {

  meta: {
    email: "sales@rock.scot",
    streamUrl: "https://player.broadcast.radio/caledonia-tx-ltd",
    logo: "./assets/images/branding/logo_ultra_wide.png"
  },

  backgrounds: [
    "./assets/images/background/background1.jpg",
    "./assets/images/background/background2.jpg",
    "./assets/images/background/background3.jpg",
    "./assets/images/background/background4.jpg",
    "./assets/images/background/background5.jpg",
    "./assets/images/background/background6.jpg",
    "./assets/images/background/background7.jpg"
  ],

  prices: {
    packages: [
      { id: 299, name: "Single Region (£299)" },
      { id: 449, name: "Multi-Region (£449)" },
      { id: 2500, name: "Top-of-Hour Exclusive (£2,500/mo)" }
    ],
    productionFee: 195,
    surchargeThreshold: 28,   // days
    surchargeRate: 1.3        // 30% for short campaigns
  },

  djs: [
    { id:'alex', name:'ALEX', title:"Johnstone's Vinyl Viking", img:'./assets/images/crew/dj_alex.jpg', bio:"Known as 'Johnstone's Vinyl Viking,' Alex has spent decades digging through crates in dusty basements from Glasgow to London. He doesn’t just play rock; he curates an auditory museum of deep cuts. His show is a journey through the forgotten B-sides of the 70s and the prog-rock anthems that time almost forgot." },
    { id:'andy', name:'ANDY', title:"East Kilbride Rebel", img:'./assets/images/crew/dj_andy.jpg', bio:"The East Kilbride Rebel, Andy brings a chaotic, high-voltage energy to the station that is impossible to ignore. Raised on a diet of punk, new wave, and high-tempo indie, his shows are less of a broadcast and more of a riot. He champions the underdogs and the loudmouths." },
    { id:'stevie', name:'STEVIE', title:"Port Glasgow Headbanger", img:'./assets/images/crew/dj_stevie.jpg', bio:"Stevie is the Port Glasgow Headbanger with a heart of galvanized steel. A true disciple of the riff, his soul belongs to AC/DC, Iron Maiden, and the heavy hitters of the 80s. When Stevie is on air, the volume knob is strictly ornamental—it stays at maximum." },
    { id:'mhairi', name:'MHAIRI', title:"Hamilton's Hard Rock Queen", img:'./assets/images/crew/dj_mhairi.jpg', bio:"Hamilton's Hard Rock Queen, Mhairi combines sharp wit with an even sharper playlist. She dominates the airwaves with a mix of glam rock stompers and classic rock anthems. Her knowledge of the local scene is unmatched, and her banter is as legendary as the tracks she spins." },
    { id:'jude', name:'JUDE', title:"Irvine's Indie Rock Icon", img:'./assets/images/crew/dj_jude.jpg', bio:"As Irvine's Indie Rock Icon, Jude represents the cool, melodic side of the Rock.Scot spectrum. Influenced by the Britpop explosion and the post-punk revival, Jude's sets are perfect for coastal drives and late-night introspection." },
    { id:'chris', name:'CHRIS', title:"Greenock's Guitar Guru", img:'./assets/images/crew/dj_chris.jpg', bio:"Greenock's Guitar Guru, Chris was bred on the raw energy of Primal Scream and the industrial grit of his hometown. He is obsessed with tone, technique, and the power of a well-executed solo." },
    { id:'cal', name:'CAL', title:"Kilmarnock's Classic Rocker", img:'./assets/images/crew/dj_cal.jpg', bio:"Kilmarnock's Classic Rocker, Cal is a hometown hero who worships at the altar of stadium rock. With Biffy Clyro putting the town on the map, Cal keeps the momentum going by spinning massive anthems that fill the room." },
    { id:'blue', name:'BLUE', title:"Gourock's Bluesy Maverick", img:'./assets/images/crew/dj_blue.jpg', bio:"The Gourock Bluesy Maverick, Blue brings a soulful, rootsy vibe to the station. Living on the coast has infused his taste with a laid-back but powerful rhythm. He specializes in blues-rock, southern rock, and anything with a bit of soul." }
  ],

  signals: ["LANARKSHIRE", "INVERCLYDE", "AYRSHIRE"],

  newsFeed: "https://api.rss2json.com/v1/api.json?rss_url=https://snackmag.co.uk/category/music/feed"
};
