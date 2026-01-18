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
    surchargeRate: 1.3
      
