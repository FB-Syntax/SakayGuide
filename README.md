# SakayGuide 🚌

**Real-time jeepney & tricycle fares, gas station prices, traffic-aware route planning, and interactive terminal maps — for Philippine commuters.**

A mobile-friendly single-page app focused on **Intramuros, Manila** (Mapúa University area) with live fuel prices via GasWatchPH, traffic data via TomTom, and custom pin-based route planning with TomTom routing.

## Features

- **Live Dashboard** — Jeepney fares (traditional ₱14 / modern ₱17) and tricycle fare calculator (₱16 flagdown + ₱10/km)
- **PH Fuel Card** — Nationwide average gas/diesel prices with week-over-week change indicators (▲/▼), powered by GasWatchPH
- **Gas Station Map** — Searchable list with brand filter, interactive Leaflet map, click-to-focus on stations, show-more pagination, and advisories modal
- **Fare Calculator** — Distance-based computation (1–20 km) with full breakdown
- **Interactive Terminal Map** — Leaflet/OpenStreetMap showing terminals, landmarks, and sample routes
- **Traffic Map** — Real-time TomTom traffic flow + incident overlays, pin your start/destination, get traffic-aware route and ETA
- **Route Planner** — Auto-detect location (GPS or IP fallback), set start & destination pins on a mini-map with nearby terminal suggestions, TomTom routing with traffic delay display
- **Live Ride Tracker** — Start a ride with static route from TomTom, real traffic overlay, traffic-aware ETA, elapsed timer, Finish and SOS buttons
- **Data Sources Footer** — Curated links to LTFRB, Manila Bulletin, GasWatchPH, TomTom, OpenStreetMap

## Live Fares (as of March 2026)

| Mode | Base Fare | Per Km |
|------|-----------|--------|
| Traditional Jeepney | ₱14.00 (first 4 km) | ₱2.00 |
| Modern Jeepney | ₱17.00 (first 4 km) | ₱2.30 |
| Tricycle | ₱16.00 (flagdown, first km) | ₱10.00 |

Fuel prices are fetched live from GasWatchPH — no static baseline.

## Tech Stack

- **HTML5 / CSS3** — Semantic markup, CSS custom properties, mobile-first responsive
- **Vanilla JavaScript** — No frameworks, lightweight and fast
- **Leaflet.js** — Open-source map library with OpenStreetMap tiles
- **TomTom Maps API** — Traffic flow tiles, incident tiles, and routing (car travel mode, traffic-aware)
- **GasWatchPH API** — Live gas station prices, brands, advisories (self-hosted proxy in `gaswatch-api/`)
- **ip-api.com / ipapi.co** — IP geolocation fallback when GPS unavailable

## API Integration

**GasWatch Proxy (self-hosted):** `GET /api/...`
- `GET /api/stations` — All gas stations with prices, brands, location
- `GET /api/brands` — Brand list
- `GET /api/history` — Price history for week-over-week comparison
- `GET /api/advisories` — Fuel advisories
- Auto-downloads fresh data from gaswatchph.com every 5 minutes

**TomTom:**
- Traffic flow tiles: `api.tomtom.com/traffic/map/4/tile/flow/relative/...`
- Traffic incident tiles: `api.tomtom.com/traffic/map/4/tile/incidents/s1/...`
- Routing: `api.tomtom.com/routing/1/calculateRoute/...` (car mode, traffic-aware)

## Files

```
sakayguide/
├── index.html               # Main single-page application
├── styles.css               # Full responsive stylesheet
├── app.js                   # All logic: dashboard, maps, planner, tracker
├── data.js                  # Terminal data, fare config, TomTom API key, sources
├── gaswatch-api/
│   ├── server.js            # Express server (port 3000)
│   ├── data.js              # 3,000+ stations, brands, price history
│   ├── routes/
│   │   ├── stations.js      # Station search/list/brands endpoints
│   │   ├── history.js       # Price history endpoint
│   │   └── advisories.js    # Fuel advisories endpoint
│   └── services/
│       ├── downloader.js    # Auto-download & parse gaswatchph.com
│       └── merger.js        # Merge community + official prices
└── README.md                # This file
```

## Usage

Open `index.html` in any modern browser. The GasWatch API backend must be running for fuel features.

```bash
# 1. Start the backend (from gaswatch-api/)
cd gaswatch-api
npm install
node server.js

# 2. Serve the frontend (from project root)
npx serve .
# or
python -m http.server 8000
```

For full features (traffic, routing), ensure `data.js` has a valid TomTom API key.

## Deployment

See full VPS setup guide in the repository wiki. Quick summary:

1. Push code to GitHub
2. SSH into VPS, clone repo
3. Install Node.js, Nginx, PM2, Certbot
4. Start backend with PM2: `pm2 start gaswatch-api/server.js --name sakay-api`
5. Configure Nginx to serve static files + proxy `/api` to `localhost:3000`
6. Set up HTTPS with Certbot
7. (Optional) GitHub Action for auto-deploy on push

## Disclaimer

This is a non-official reference tool. Fares are based on published LTFRB rates and LGU regulations. Actual fares may vary. Always verify with the driver before boarding. Not affiliated with LTFRB, DOE, TomTom, GasWatchPH, or any government agency.

## Data Sources

- [LTFRB](https://ltfrb.gov.ph) — Land Transportation Franchising and Regulatory Board
- [Manila Bulletin](https://mb.com.ph) — Manila LGU Tricycle Fare Matrix
- [GasWatchPH](https://gaswatchph.com) — Community-reported gas prices
- [TomTom](https://tomtom.com) — Traffic tiles, incident tiles, routing engine
- [OpenStreetMap](https://www.openstreetmap.org) — Map tiles and data

---

Built for daily Filipino commuters. 🇵🇭
