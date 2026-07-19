# SakayGuide 🚌

**Real-time jeepney & tricycle fares, terminal locations, and fuel prices for Philippine commuters.**

A mobile-friendly web app that gives commuters real-time tricycle and jeepney routes, terminal locations, and updated fare matrices for specific local barangays. Focus area: **Mapúa University, Intramuros, Manila**.

## Features

- **Live Dashboard** — Jeepney fares (traditional & modern), tricycle fare calculator, and real-time fuel prices from the DOE via fuelphapi
- **Fare Calculator** — Distance-based computation with full fare matrix (1–20 km) and breakdown
- **Interactive Map** — Leaflet/OpenStreetMap showing terminals, landmarks, and sample routes around Intramuros
- **Mobile-First** — White/blue responsive design that works on all screen sizes
- **Real-Time API** — Fuel prices auto-refresh every 5 minutes from `fuelphapi.vercel.app`

## Live Fares (as of March 2026)

| Mode | Base Fare | Per Km |
|------|-----------|--------|
| Traditional Jeepney | ₱14.00 (1st km) | ₱2.00 |
| Modern Jeepney | ₱15.00 (1st km) | ₱2.20 |
| Tricycle | ₱25.00 (flagdown) | ₱12.00 |

Fuel price baseline: Gasoline ₱62.55/L, Diesel ₱56.74/L (DOE / Zigwheels PH, July 2026)

## Tech Stack

- **HTML5 / CSS3** — Semantic markup, CSS custom properties, mobile-first responsive
- **Vanilla JavaScript** — No frameworks, lightweight and fast
- **Leaflet.js** — Open-source map library with OpenStreetMap tiles
- **fuelphapi** — Philippine fuel price API (scrapes DOE advisories)
- **Font Awesome** — Icons

## API Integration

**Fuel Prices:** `GET https://fuelphapi.vercel.app/api/fuel-prices`
Returns weekly fuel price adjustments (diesel, gasoline) with effective dates. CORS-enabled, free to use.

## Files

```
sakayguide/
├── index.html      # Main single-page application
├── styles.css      # White/blue theme, responsive layout
├── app.js          # Fare logic, API calls, map init, UI updates
├── data.js         # Terminal data, route data, fare defaults
└── README.md       # This file
```

## Usage

Open `index.html` in any modern browser. No build step required.

```bash
# Serve locally with any HTTP server
npx serve .
# or
python -m http.server 8000
```

## Roadmap

- **v1.0** — MVP: Dashboard, calculator, map, fuel API (✓ Current)
- **v1.1** — Route Finder: Detailed routes, PDF export, search
- **v1.2** — Smart: Fuel history chart, GPS nearest terminal, offline
- **v1.3** — Crowdsourced: User reports, fare verification
- **v1.4+** — Expansion: 5+ municipalities, mobile app

## Disclaimer

This is a non-official reference tool. Fares are based on published LTFRB rates and LGU regulations. Actual fares may vary. Always verify with the driver before boarding. Not affiliated with LTFRB, DOE, or any government agency.

## Data Sources

- [LTFRB](https://ltfrb.gov.ph) — Land Transportation Franchising and Regulatory Board
- [DOE](https://doe.gov.ph) — Department of Energy
- [FuelPH API](https://fuelphapi.vercel.app) — Philippine fuel price data
- [OpenStreetMap](https://www.openstreetmap.org) — Map tiles and data
- [Zigwheels PH](https://www.zigwheels.ph/fuel-price) — Fuel price reference

---

Built for daily Filipino commuters. 🇵🇭
