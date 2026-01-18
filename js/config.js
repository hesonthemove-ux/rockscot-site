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
        surchargeThreshold: 28,
        surchargeRate: 1.3
    },
    djs: [
        {
            id: "andy",
            name: "Andy",
            title: "East Kilbride's Rock Rebel",
            img: "dj_andy.jpg",
            bio: "Hailing from East Kilbride in South Lanarkshire, Andy grew up blasting Biffy Clyro anthems from his bedroom in the new town suburbs. His dad dragged him to his first gig at a local pub, where a cover band nailed Simple Minds' 'Don't You (Forget About Me)', and that was it—rock hooked him for life. He started pirate radio in his garage before landing at Rock.Scot, bringing high-energy playlists to listeners across Inverclyde, South Lanarkshire, and North Ayrshire. Favourite Scottish rock band? Biffy Clyro. Best gig ever? Catching Franz Ferdinand at the Barrowland Ballroom. Dream venue to DJ? King Tut's Wah Wah Hut. Fun fact: Andy once crowd-surfed at a Big Country tribute night in Hamilton and lost a shoe—still blames the kilt."
        },
        {
            id: "alex",
            name: "Alex",
            title: "Johnstone's Vinyl Viking",
            img: "dj_alex.jpg",
            bio: "Born and bred in Johnstone, Alex discovered rock digging through his uncle's record collection—Nazareth's 'Hair of the Dog' changed everything. He spent his teens sneaking into gigs in nearby Paisley and Glasgow, then built his own decks to spin rock classics. Now he rocks the airwaves on Rock.Scot with deep cuts and local shout-outs. Favourite Scottish rock band? Nazareth. Best gig ever? Texas at the SEC Armadillo. Dream venue? Barrowland Ballroom. Fun fact: Alex's prized possession is a scratched vinyl of Deacon Blue signed after he DJ'd a secret afterparty in Paisley."
        },
        {
            id: "stevie",
            name: "Stevie",
            title: "Port Glasgow's Headbanger",
            img: "dj_stevie.jpg",
            bio: "From the shipbuilding heart of Port Glasgow in Inverclyde, Stevie was raised on tales of Clyde rockers and first fell for rock hearing AC/DC at a family barbecue. He formed a garage band in his teens, playing covers at local pubs before switching to DJing. His late-night shows on Rock.Scot keep Inverclyde headbanging from Greenock to Gourock. Favourite Scottish rock band? Big Country. Best gig ever? Mogwai at Òran Mór. Dream venue? Beacon Arts Centre in Greenock. Fun fact: Stevie claims he once high-fived Angus Young at a secret pub gig."
        },
        {
            id: "mhairi",
            name: "Mhairi",
            title: "Hamilton's Hard Rock Queen",
            img: "dj_mhairi.jpg",
            bio: "Hamilton in South Lanarkshire gave Mhairi her first taste of live rock at a school battle of the bands featuring The Jesus and Mary Chain covers. She was instantly obsessed, trading pop for distortion pedals and building a massive CD collection. Her witty banter and killer playlists now light up Rock.Scot for listeners in Hamilton, East Kilbride, and beyond. Favourite Scottish rock band? The Jesus and Mary Chain. Best gig ever? Teenage Fanclub at King Tut's. Dream venue? The Grand Hall in Kilmarnock. Fun fact: Mhairi moonlights as a tattoo artist specialising in rock band logos."
        },
        {
            id: "jude",
            name: "Jude",
            title: "Irvine's Indie Rock Icon",
            img: "dj_jude.jpg",
            bio: "North Ayrshire's Irvine is Jude's stomping ground, where beach walks with Travis on headphones sparked a lifelong love of melodic rock. She volunteered at local open mics, then climbed the ranks to Rock.Scot, championing emerging Scottish acts alongside classics. Favourite Scottish rock band? Travis. Best gig ever? Idlewild at the Barrowland. Dream venue? Harbour Arts Centre in Irvine. Fun fact: Jude once hitchhiked to a Franz Ferdinand gig and ended up backstage."
        },
        {
            id: "chris",
            name: "Chris",
            title: "Greenock's Guitar Guru",
            img: "dj_chris.jpg",
            bio: "Greenock in Inverclyde bred Chris on tales of shipyard workers rocking out to Primal Scream. His first gig was Biffy Clyro in Glasgow, and he never looked back—starting as a pub DJ before joining Rock.Scot to blast rock across the Firth of Clyde. Favourite Scottish rock band? Primal Scream. Best gig ever? Simple Minds at the OVO Hydro. Dream venue? Cathouse Rock Club in Glasgow. Fun fact: Chris owns every Big Country album on vinyl and can play 'In a Big Country' on air guitar flawlessly."
        },
        {
            id: "cal",
            name: "Cal",
            title: "Kilmarnock's Classic Rocker",
            img: "dj_cal.jpg",
            bio: "Straight out of Kilmarnock in the Ayrshire heartlands, Cal grew up on Biffy Clyro and The Sensational Alex Harvey Band. DJ'd school discos before going pro, now delivering timeless rock to Rock.Scot fans in Kilmarnock, Irvine, and North Ayrshire. Favourite Scottish rock band? Biffy Clyro. Best gig ever? The Fratellis at The Grand Hall Kilmarnock. Dream venue? Palace Theatre and Grand Hall in Kilmarnock. Fun fact: Cal's nickname 'Cal the Rocker' started after he won an air guitar contest at a local Ayrshire festival."
        },
        {
            id: "blue",
            name: "Blue",
            title: "Gourock's Bluesy Rock Maverick",
            img: "dj_blue.jpg",
            bio: "From the seaside charm of Gourock in Inverclyde, Blue got into rock via his grandad's Nazareth and Gerry Rafferty records. He blended bluesy riffs with rock energy, DJing beach parties before hitting Rock.Scot waves for listeners from Gourock to Wemyss Bay. Favourite Scottish rock band? Nazareth. Best gig ever? Texas at Paisley Arts Centre. Dream venue? Coats Paisley or Beacon Arts Centre. Fun fact: Blue's blue hair once got him mistaken for a roadie at a Mogwai gig—he played along."
        }
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
