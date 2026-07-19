// GasWatch PH - Fuel Price Data
// Last Updated: April 27, 2026
// Source: Community price reports and DOE weekly advisory
//         RON97 = RON95 + historical brand premium; E-gas = RON95 - historical brand differential
// To update prices: Edit the numbers below and change the lastUpdated date

const LAST_UPDATED = "July 14, 2026";

// ─── Advisories / Announcements ──────────────────────────────
const ADVISORIES = [
  {
    date: "2026-07-14",
    expires: "2026-07-21",
    type: "update",
    title: "Big diesel hike again, gasoline up ₱1 this week",
    body: "Pump prices rose 6AM Tuesday — diesel up ₱4.60/L (CleanFuel ₱4.00), gasoline up ₱1.00/L, and kerosene ₱2.30/L across major brands. The DOE pegged this week's range at diesel up to +₱4.62, gasoline up to +₱1.00, and kerosene up to +₱4.22 per liter, driven by renewed US–Iran tensions. Coverage via Inquirer, July 14, 2026.",
  },
  {
    date: "2026-04-12",
    type: "update",
    title: "Metro Manila Fuel Price History — Now Live",
    body: "You asked, we listened. See weekly average diesel and gasoline prices for every major brand in Metro Manila. Tap 'Price History' in the menu to compare trends across Shell, Petron, Caltex, and 8 other brands. New data added every Tuesday.",
  },
  {
    date: "2026-03-29",
    type: "update",
    title: "Fuel Cost Calculator — estimate your fill-up cost instantly!",
    body: "Tap 'Calculate Cost' on the homepage to estimate your fill-up cost. Pick your fuel type, choose a brand, enter your liters, and get an instant total. It even shows you the cheapest brand option so you know if you're getting a good deal.",
  },
  {
    date: "2026-03-15",
    type: "update",
    title: "Flag a Station When Fuel Runs Out!",
    body: "If a fuel type is unavailable at a station, tap 'No stock' in the station details. It shows up on the map instantly so others know. Flags auto-clear after 48 hours.",
  },
];

// ─── Brand Colors & Info ───────────────────────────────────────
const BRANDS = {
  shell: { name: "Shell", short: "SHL", color: "#FFD500", textColor: "#111" },
  petron: { name: "Petron", short: "PTR", color: "#004B93", textColor: "#fff" },
  caltex: { name: "Caltex", short: "CAL", color: "#E31937", textColor: "#fff" },
  phoenix: { name: "Phoenix", short: "PHX", color: "#FF6600", textColor: "#fff" },
  seaoil: { name: "Seaoil", short: "SEA", color: "#00A651", textColor: "#fff" },
  unioil: { name: "Unioil", short: "UNI", color: "#1B3C73", textColor: "#fff" },
  jetti: { name: "Jetti", short: "JET", color: "#C8102E", textColor: "#fff" },
  flyingv: { name: "Flying V", short: "FLV", color: "#8B0000", textColor: "#fff" },
  cleanfuel: { name: "Cleanfuel", short: "CLN", color: "#00B4D8", textColor: "#fff" },
  total: { name: "Total", short: "TOT", color: "#FF0000", textColor: "#fff" },
  ptt: { name: "PTT", short: "PTT", color: "#5B2C6F", textColor: "#fff" },
};

// ─── Previous Week Prices (for change indicators in Brand Summary) ─
// Last updated: Week of July 14, 2026 — MM-only per-brand avgs from Jul 7 settled baseline (brand summary is MM-only)
// Next update: Before applying next Tuesday station scrape
const PREVIOUS_PRICES = {
  shell:      { diesel: 74.72, premiumDiesel: 85.52, unleaded: 81.09, premium95: 91.38, premium97: 99.87, kerosene: 124.51 },
  petron:     { diesel: 73.60, premiumDiesel: 79.14, unleaded: 78.62, premium95: 80.52, premium97: 90.89, kerosene: 121.24 },
  caltex:     { diesel: 75.13, premiumDiesel: 117.41, unleaded: 82.48, premium95: 93.44, premium97: 108.43, kerosene: 120.11 },
  phoenix:    { diesel: 76.16, unleaded: 79.53, premium95: 83.37, premium97: 89.97, egasoline: 81.81 },
  seaoil:     { diesel: 72.50, premiumDiesel: 145.75, unleaded: 77.73, premium95: 94.39, premium97: 81.83, egasoline: 93.54, kerosene: 126.24 },
  unioil:     { diesel: 73.21, unleaded: 78.07, premium95: 82.72, premium97: 84.15, egasoline: 90.83 },
  jetti:      { diesel: 73.97, unleaded: 79.52, premium95: 82.77, premium97: 86.27 },
  flyingv:    { diesel: 70.67, unleaded: 75.42, premium95: 78.31 },
  cleanfuel:  { diesel: 73.93, unleaded: 79.52, premium95: 90.74 },
  total:      { diesel: 74.27, premiumDiesel: 93.48, unleaded: 80.83, premium95: 87.77, premium97: 92.05 },
  ptt:        { diesel: 72.41, premiumDiesel: 74.30, unleaded: 76.11, premium95: 80.67 },
};

// ─── Previous Week Overall Averages (for homepage stat badges) ──
// Must equal PRICE_HISTORY[0] BEFORE the new Tuesday scrape runs — the homepage
// badge compares current PRICE_HISTORY[0] vs PREV_AVG, so PREV_AVG must match
// what's about to roll into PRICE_HISTORY[1].
// Jul 14, 2026: PREV_AVG = current published PRICE_HISTORY[0] (Jul 7) station-weighted
// averages — confirmed by scripts/compute-price-history.js (74.03 / 79.59, n=964 MM
// stations) — the values about to roll into PRICE_HISTORY[1] when the Jul 14 scrape runs.
// The homepage badge then compares the new PRICE_HISTORY[0] (Jul 14) vs PREV_AVG.
const PREV_AVG = { diesel: 74.03, unleaded: 79.59 };

// ─── Price History (weekly snapshots for /price-history page) ──
// Updated every Tuesday alongside PREV_AVG — newest first, keep 12 weeks max
// dieselAvg/unleadedAvg = station-weighted averages across all stations
// brands = per-brand representative prices (diesel + unleaded)
const PRICE_HISTORY = [
  {
    week: "2026-07-14",
    label: "Jul 14 – 20",
    // Jul 14 big diesel hike (effective 6AM): DIESEL +₱4.60 (Shell/Petron/Caltex/SeaOil/Unioil/
    // Phoenix/Total/FlyingV/PTT/Jetti; CleanFuel +₱4.00), gasoline +₱1.00, kerosene +₱2.30 —
    // brand advisories via Alvin Elchico + PH Fuel Watch; DOE final est diesel up to +4.62,
    // gasoline up to +1.00, kerosene up to +4.22. Driver: renewed US–Iran tensions / Strait of Hormuz.
    // The ~3:20PM REPLACE scrape came back mid-roll AGAIN — diesel stale-high (MM avg 82.53 vs
    // ~78.63 expected, SD 9.21 with a ₱158 outlier: pre-rollback reports leaking past the cutoff)
    // and unleaded moved the WRONG way (−₱0.24 vs the +₱1.00 pump move); 23% seed-fallback both
    // fuels. Per feedback_doe_synthesis_when_no_rescrape, discarded the scrape and DOE-synthesized
    // both fuels: every station = Jul 7 settled + per-brand advisory delta. Re-scrape Friday.
    dieselAvg: 78.59,
    unleadedAvg: 80.59,
    brands: {
      shell:     { diesel: 79.32, unleaded: 82.09 },
      petron:    { diesel: 78.20, unleaded: 79.62 },
      caltex:    { diesel: 79.73, unleaded: 83.48 },
      phoenix:   { diesel: 80.76, unleaded: 80.53 },
      seaoil:    { diesel: 77.10, unleaded: 78.73 },
      unioil:    { diesel: 77.81, unleaded: 79.07 },
      jetti:     { diesel: 78.57, unleaded: 80.52 },
      flyingv:   { diesel: 75.27, unleaded: 76.42 },
      cleanfuel: { diesel: 77.93, unleaded: 80.52 },
      total:     { diesel: 78.87, unleaded: 81.83 },
      ptt:       { diesel: 77.01, unleaded: 77.11 },
    }
  },
  {
    week: "2026-07-07",
    label: "Jul 7 – 13",
    // Jul 7 mixed increase (effective 6AM): DIESEL +₱3.30 (big), gasoline +₱0.20–0.25 (tiny),
    // kerosene +₱1.70–1.75. Brand advisories: Shell/SeaOil/Unioil diesel +3.30/gas +0.25;
    // Petron/Jetti gas +0.20; DOE final est diesel up to +3.57, gas up to +0.25. The ~11:55AM
    // REPLACE scrape came back mid-roll — DIESEL broken (stale-high: MM avg 79.42 vs 74.03
    // expected, SD 11.04, pre-Jun-23-rollback reports leaking past the cutoff); unleaded roughly
    // clean (80.22) but 23% of stations seed-fallback for both fuels. Per
    // feedback_doe_synthesis_when_no_rescrape, discarded the scrape and DOE-synthesized both
    // fuels: every station = Jun 30 settled + per-brand advisory delta. Re-scrape Friday.
    dieselAvg: 74.03,
    unleadedAvg: 79.59,
    brands: {
      shell:     { diesel: 74.72, unleaded: 81.09 },
      petron:    { diesel: 73.60, unleaded: 78.62 },
      caltex:    { diesel: 75.13, unleaded: 82.48 },
      phoenix:   { diesel: 76.16, unleaded: 79.53 },
      seaoil:    { diesel: 72.50, unleaded: 77.73 },
      unioil:    { diesel: 73.21, unleaded: 78.07 },
      jetti:     { diesel: 73.97, unleaded: 79.52 },
      flyingv:   { diesel: 70.67, unleaded: 75.42 },
      cleanfuel: { diesel: 73.93, unleaded: 79.52 },
      total:     { diesel: 74.27, unleaded: 80.83 },
      ptt:       { diesel: 72.41, unleaded: 76.11 },
    }
  },
  {
    week: "2026-06-30",
    label: "Jun 30 – Jul 6",
    // Jun 30 small mixed increase (effective 6AM): brand advisories diesel +₱0.80–0.85,
    // gasoline +₱1.60–1.70, kerosene +₱1.20–1.22. The ~11AM Tuesday REPLACE scrape came back
    // mid-roll — diesel scraped clean (SD ₱1.64, median = last week + 0.84) but gasoline was
    // broken (Petron +0.11, SeaOil −0.44, Unioil +0.18, Flying V −0.54 vs the +1.65 pump move;
    // community reports unpropagated). Per feedback_doe_synthesis_when_no_rescrape, discarded the
    // scrape and DOE-synthesized: every station = Jun 23 settled + per-brand advisory delta.
    // Re-scrape Friday for fresh community data. Jetti/Cleanfuel diesel+unleaded = MM-avg estimate.
    dieselAvg: 70.73,
    unleadedAvg: 79.35,
    brands: {
      shell:     { diesel: 71.42, unleaded: 80.84 },
      petron:    { diesel: 70.30, unleaded: 78.42 },
      caltex:    { diesel: 71.83, unleaded: 82.23 },
      phoenix:   { diesel: 72.86, unleaded: 79.28 },
      seaoil:    { diesel: 69.20, unleaded: 77.48 },
      unioil:    { diesel: 69.91, unleaded: 77.82 },
      jetti:     { diesel: 70.67, unleaded: 79.32 },
      flyingv:   { diesel: 67.37, unleaded: 75.17 },
      cleanfuel: { diesel: 70.63, unleaded: 79.27 },
      total:     { diesel: 70.97, unleaded: 80.58 },
      ptt:       { diesel: 69.11, unleaded: 75.86 },
    }
  },
  {
    week: "2026-06-23",
    label: "Jun 23 – 29",
    // Jun 23 big rollback (industry-wide): gasoline −₱3.90, diesel −₱9.04,
    // kerosene −₱9.82 (Petron diesel −9.00; Shell kero −11.00). The ~8AM live
    // scrape was CLEAN (diesel SD ₱1.74 / unleaded ₱2.81 across 740 MM stations)
    // AND validated vs DOE-published post-rollback pump levels (diesel
    // ₱60.25–80.45, RON91 ₱65.60–86.13 — our avgs sit at the midpoints), so the
    // values below are REAL station-weighted MM scrape data. This week also
    // CORRECTS ~₱8 of high-side drift: the Jun 9 "clean" scrape (90.39) we
    // rebaselined up to was itself a stale-high snapshot that propagated forward
    // (see project_jun23_rebaseline). PREV_AVG = real − advisory delta so the
    // homepage badge reads the true −₱9.04 / −₱3.90. Jetti + Cleanfuel have no
    // MM coverage → estimated at the MM average (replacing a stale ₱101 seed);
    // flagged for backfill once the scrape covers them.
    dieselAvg: 69.83,
    unleadedAvg: 77.67,
    brands: {
      shell:     { diesel: 70.58, unleaded: 79.19 },
      petron:    { diesel: 69.50, unleaded: 76.72 },
      caltex:    { diesel: 70.99, unleaded: 80.58 },
      phoenix:   { diesel: 72.01, unleaded: 77.63 },
      seaoil:    { diesel: 68.36, unleaded: 75.83 },
      unioil:    { diesel: 69.11, unleaded: 76.22 },
      jetti:     { diesel: 69.83, unleaded: 77.67 },
      flyingv:   { diesel: 66.53, unleaded: 73.52 },
      cleanfuel: { diesel: 69.83, unleaded: 77.67 },
      total:     { diesel: 70.13, unleaded: 78.93 },
      ptt:       { diesel: 68.27, unleaded: 74.21 },
    }
  },
  {
    week: "2026-06-16",
    label: "Jun 16 – 22",
    // CORRECTED Jun 23, 2026: the originally-published Jun 16 averages (86.68 /
    // 88.93) were ~₱8 high — DOE-synthesized off the inflated Jun 9 baseline.
    // Rebaselined here to reality = confirmed-real Jun 23 + the Jun 23 rollback
    // delta (diesel +9.04, gasoline +3.90), so the Jun 16→Jun 23 chart segment
    // shows the honest −₱9.04 / −₱3.90. (Jun 16's own advisory move was diesel
    // −₱3.71 / gas +₱1.68; weeks before Jun 16 not yet backfilled — see
    // project_jun23_rebaseline.) Jetti + Cleanfuel = MM-avg estimate + delta.
    dieselAvg: 78.87,
    unleadedAvg: 81.57,
    brands: {
      shell:     { diesel: 79.62, unleaded: 83.09 },
      petron:    { diesel: 78.54, unleaded: 80.62 },
      caltex:    { diesel: 80.03, unleaded: 84.48 },
      phoenix:   { diesel: 81.05, unleaded: 81.53 },
      seaoil:    { diesel: 77.40, unleaded: 79.73 },
      unioil:    { diesel: 78.15, unleaded: 80.12 },
      jetti:     { diesel: 78.87, unleaded: 81.57 },
      flyingv:   { diesel: 75.57, unleaded: 77.42 },
      cleanfuel: { diesel: 78.87, unleaded: 81.57 },
      total:     { diesel: 79.17, unleaded: 82.83 },
      ptt:       { diesel: 77.31, unleaded: 78.11 },
    }
  },
  {
    week: "2026-06-09",
    label: "Jun 9 – 15",
    // Jun 9 hike day. The 8AM+ scrape captured clean post-roll prices (diesel
    // SD ₱2.26 across 987 stations), so brand + average values below are REAL
    // station-weighted Metro Manila scrape data — NOT synthesized. This also
    // re-baselines ~₱3 of accumulated low-side drift from prior weeks' DOE
    // rollback synthesis. Advisory deltas this week: diesel +₱4.85 std (Seaoil
    // +₱5.77, Unioil +₱4.90, Jetti +₱4.80/gas +₱0.00); within DOE OIMB Wk
    // Jun 9–15 range. Jetti + Cleanfuel had no live MM coverage → DOE-synthesized
    // (Jun 2 + delta); flagged for backfill once scrape covers them.
    dieselAvg: 90.39,
    unleadedAvg: 87.25,
    brands: {
      shell:     { diesel: 91.51, unleaded: 90.36 },
      petron:    { diesel: 90.20, unleaded: 84.96 },
      caltex:    { diesel: 91.72, unleaded: 90.68 },
      phoenix:   { diesel: 90.86, unleaded: 86.98 },
      seaoil:    { diesel: 90.23, unleaded: 86.30 },
      unioil:    { diesel: 88.38, unleaded: 83.62 },
      jetti:     { diesel: 105.50, unleaded: 85.53 },
      flyingv:   { diesel: 86.82, unleaded: 82.89 },
      cleanfuel: { diesel: 100.29, unleaded: 89.34 },
      total:     { diesel: 88.23, unleaded: 90.80 },
      ptt:       { diesel: 89.59, unleaded: 83.93 },
    }
  },
  {
    week: "2026-06-02",
    label: "Jun 2 – 8",
    // Brand values = PRICE_HISTORY[1] (May 26) + DOE-confirmed Jun 2 rollback
    // (diesel −₱9.26, gasoline −₱4.76, kerosene −₱10.86; industry-wide per
    // Shell, Petron, Seaoil, Unioil advisories). Scrape avg confirmed diesel
    // −₱9.30, gasoline −₱5.45 (mostly rolled); used DOE-aligned synthesis
    // for brand-level consistency.
    dieselAvg: 82.54,
    unleadedAvg: 85.88,
    brands: {
      shell:     { diesel: 79.31, unleaded: 88.96 },
      petron:    { diesel: 75.42, unleaded: 82.50 },
      caltex:    { diesel: 84.98, unleaded: 87.96 },
      phoenix:   { diesel: 93.58, unleaded: 86.58 },
      seaoil:    { diesel: 82.82, unleaded: 83.87 },
      unioil:    { diesel: 82.35, unleaded: 84.71 },
      jetti:     { diesel: 100.70, unleaded: 85.53 },
      flyingv:   { diesel: 73.53, unleaded: 79.78 },
      cleanfuel: { diesel: 95.44, unleaded: 89.04 },
      total:     { diesel: 90.23, unleaded: 86.89 },
      ptt:       { diesel: 101.51, unleaded: 90.10 },
    }
  },
  {
    week: "2026-05-26",
    label: "May 26 – Jun 1",
    // Brand values = PRICE_HISTORY[1] + DOE-confirmed May 26 movement
    // (diesel +₱1.96, gasoline +₱1.60, kerosene +₱1.45; Shell gasoline +₱1.43;
    // Jetti/Cleanfuel +₱1.90/+₱1.60 per historical brand-rounding pattern).
    // Used DOE-aligned synthesis because the 7:30am Tue scrape captured stations
    // mid-roll — some pumps had updated, others hadn't.
    dieselAvg: 91.80,
    unleadedAvg: 90.64,
    brands: {
      shell:     { diesel: 88.57, unleaded: 93.72 },
      petron:    { diesel: 84.68, unleaded: 87.26 },
      caltex:    { diesel: 94.24, unleaded: 92.72 },
      phoenix:   { diesel: 102.84, unleaded: 91.34 },
      seaoil:    { diesel: 92.08, unleaded: 88.63 },
      unioil:    { diesel: 91.61, unleaded: 89.47 },
      jetti:     { diesel: 109.96, unleaded: 90.29 },
      flyingv:   { diesel: 82.79, unleaded: 84.54 },
      cleanfuel: { diesel: 104.70, unleaded: 93.80 },
      total:     { diesel: 99.49, unleaded: 91.65 },
      ptt:       { diesel: 110.77, unleaded: 94.86 },
    }
  },
  {
    week: "2026-05-19",
    label: "May 19 – 25",
    // Brand values = PRICE_HISTORY[1] + DOE-confirmed May 19 movement
    // (diesel +₱2.82, gasoline +₱1.21, kerosene −₱2.11; Jetti +₱2.80/+₱1.20;
    // Cleanfuel +₱2.80/+₱1.20). Used DOE-aligned synthesis because the 7:30am
    // Tue scrape captured stations mid-roll — some pumps had updated, others
    // hadn't, producing a ~₱2 drift on diesel direction.
    dieselAvg: 89.84,
    unleadedAvg: 89.04,
    brands: {
      shell:     { diesel: 86.61, unleaded: 92.29 },
      petron:    { diesel: 82.72, unleaded: 85.66 },
      caltex:    { diesel: 92.28, unleaded: 91.12 },
      phoenix:   { diesel: 100.88, unleaded: 89.74 },
      seaoil:    { diesel: 90.12, unleaded: 87.03 },
      unioil:    { diesel: 89.65, unleaded: 87.87 },
      jetti:     { diesel: 108.06, unleaded: 88.69 },
      flyingv:   { diesel: 80.83, unleaded: 82.94 },
      cleanfuel: { diesel: 102.80, unleaded: 92.20 },
      total:     { diesel: 97.53, unleaded: 90.05 },
      ptt:       { diesel: 108.81, unleaded: 93.26 },
    }
  },
  {
    week: "2026-05-13",
    label: "May 13 – 19",
    // Brand values = PRICE_HISTORY[1] + DOE-confirmed May 12 movement
    // (diesel −₱9.57, gasoline +₱0.47, kerosene −₱13.30; Jetti −₱9.60/+₱0.40).
    // Used DOE-aligned synthesis because the 7:30am Tue scrape captured stations
    // mid-roll — some pumps had updated, others hadn't, producing ~₱1 drift.
    dieselAvg: 87.02,
    unleadedAvg: 87.83,
    brands: {
      shell:     { diesel: 83.79, unleaded: 91.08 },
      petron:    { diesel: 79.90, unleaded: 84.45 },
      caltex:    { diesel: 89.46, unleaded: 89.91 },
      phoenix:   { diesel: 98.06, unleaded: 88.53 },
      seaoil:    { diesel: 87.30, unleaded: 85.82 },
      unioil:    { diesel: 86.83, unleaded: 86.66 },
      jetti:     { diesel: 105.26, unleaded: 87.49 },
      flyingv:   { diesel: 78.01, unleaded: 81.73 },
      cleanfuel: { diesel: 100.00, unleaded: 91.00 },
      total:     { diesel: 94.71, unleaded: 88.84 },
      ptt:       { diesel: 105.99, unleaded: 92.05 },
    }
  },
  {
    week: "2026-05-06",
    label: "May 6 – 12",
    // Brand values = PRICE_HISTORY[1] + DOE-confirmed May 5 movement
    // (diesel +₱2.66, unleaded +₱2.21; Cleanfuel/Jetti +₱2.60/+₱2.20).
    // Used DOE-aligned numbers because community price reports lag the 6am hike
    // by several hours and the 7:30am scrape mixed fresh + stale brand avgs.
    dieselAvg: 94.85,
    unleadedAvg: 89.90,
    brands: {
      shell:     { diesel: 93.03, unleaded: 90.84 },
      petron:    { diesel: 90.98, unleaded: 86.86 },
      caltex:    { diesel: 97.00, unleaded: 93.21 },
      phoenix:   { diesel: 98.21, unleaded: 92.29 },
      seaoil:    { diesel: 93.25, unleaded: 89.27 },
      unioil:    { diesel: 94.10, unleaded: 88.61 },
      jetti:     { diesel: 107.86, unleaded: 89.69 },
      flyingv:   { diesel: 88.97, unleaded: 84.05 },
      cleanfuel: { diesel: 102.60, unleaded: 93.20 },
      total:     { diesel: 102.61, unleaded: 90.93 },
      ptt:       { diesel: 109.27, unleaded: 94.02 },
    }
  },
  {
    week: "2026-04-29",
    label: "Apr 29 – May 5",
    dieselAvg: 92.20,
    unleadedAvg: 87.69,
    brands: {
      shell:     { diesel: 90.37, unleaded: 88.63 },
      petron:    { diesel: 88.32, unleaded: 84.65 },
      caltex:    { diesel: 94.34, unleaded: 91.00 },
      phoenix:   { diesel: 95.55, unleaded: 90.08 },
      seaoil:    { diesel: 90.59, unleaded: 87.06 },
      unioil:    { diesel: 91.44, unleaded: 86.40 },
      jetti:     { diesel: 105.26, unleaded: 87.49 },
      flyingv:   { diesel: 86.31, unleaded: 81.84 },
      cleanfuel: { diesel: 100.00, unleaded: 91.00 },
      total:     { diesel: 99.95, unleaded: 88.72 },
      ptt:       { diesel: 106.61, unleaded: 91.81 },
    }
  },
];

// ─── Fuel Types ────────────────────────────────────────────────
const FUEL_TYPES = {
  diesel: "Diesel",
  premiumDiesel: "Premium Diesel",
  unleaded: "Unleaded 91",
  egasoline: "E-Gasoline (RON 91 E10)",
  premium95: "Premium 95",
  premium97: "Premium 97",
  kerosene: "Kerosene",
};

// ─── Gas Stations with Prices ──────────────────────────────────
// Prices in PHP per liter
// Station names and addresses based on verified real locations
// Coordinates are approximate based on actual verified addresses
// Prices are sample data — update weekly from DOE advisory
// Sources: Shell (moonchildcookie.com, find.shell.com), Petron (petron.com, ClickTheCity),
//   Caltex (HSBC/PNB/Yumpu station lists, ClickTheCity, SunStar), Phoenix (phoenixfuels.ph Google Sites),
//   Unioil (eastwestbanker.com, yellow-pages.ph), Seaoil (seaoil.com.ph), Jetti (jetti.com.ph)
const GAS_STATIONS = [
  {
    "id": 1,
    "brand": "shell",
    "name": "Shell EDSA-McKinley",
    "area": "Makati",
    "lat": 14.5501,
    "lng": 121.03,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 2,
    "brand": "petron",
    "name": "Petron EDSA-Arnaiz Dasmariñas",
    "area": "Makati",
    "lat": 14.549,
    "lng": 121.0275,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 103.82,
      "unleaded": 85.86,
      "egasoline": null,
      "premium95": 88.26,
      "premium97": 97.46,
      "kerosene": 123.54
    }
  },
  {
    "id": 3,
    "brand": "petron",
    "name": "Petron Gil Puyat Palanan",
    "area": "Makati",
    "lat": 14.552,
    "lng": 121.019,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 103.82,
      "unleaded": 85.86,
      "egasoline": null,
      "premium95": 88.26,
      "premium97": 97.46,
      "kerosene": 123.54
    }
  },
  {
    "id": 4,
    "brand": "caltex",
    "name": "Caltex Arnaiz / Osmeña Hwy",
    "area": "Makati",
    "lat": 14.554,
    "lng": 121.0135,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 111.99,
      "unleaded": 91.88,
      "egasoline": null,
      "premium95": 99.53,
      "premium97": 103.03,
      "kerosene": 122.41
    }
  },
  {
    "id": 5,
    "brand": "caltex",
    "name": "Caltex EDSA Climaco",
    "area": "Makati",
    "lat": 14.5595,
    "lng": 121.031,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 111.99,
      "unleaded": 91.88,
      "egasoline": null,
      "premium95": 99.53,
      "premium97": 103.03,
      "kerosene": 122.41
    }
  },
  {
    "id": 6,
    "brand": "phoenix",
    "name": "Phoenix EDSA Guadalupe",
    "area": "Makati",
    "lat": 14.5672,
    "lng": 121.0455,
    "prices": {
      "diesel": 86.94,
      "unleaded": 81.15,
      "egasoline": 81.85,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 7,
    "brand": "phoenix",
    "name": "Phoenix Evangelista / Gen Estrella",
    "area": "Makati",
    "lat": 14.558,
    "lng": 121.013,
    "prices": {
      "diesel": 86.94,
      "unleaded": 81.15,
      "egasoline": 81.85,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 8,
    "brand": "unioil",
    "name": "Unioil Osmeña Hwy Pio Del Pilar",
    "area": "Makati",
    "lat": 14.556,
    "lng": 121.012,
    "prices": {
      "diesel": 101.26,
      "unleaded": 86.66,
      "egasoline": 87.36,
      "premium95": 92.66,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 9,
    "brand": "shell",
    "name": "Shell Cayetano Blvd Ususan",
    "area": "Taguig",
    "lat": 14.5262,
    "lng": 121.0562,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 105.44,
      "unleaded": 90.23,
      "egasoline": null,
      "premium95": 97.13,
      "premium97": 100.58,
      "kerosene": 126.81
    }
  },
  {
    "id": 1715,
    "brand": "petron",
    "name": "Petron Kamuning Rd Diliman",
    "area": "Quezon City",
    "lat": 14.6290326,
    "lng": 121.038352,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1716,
    "brand": "petron",
    "name": "Petron West Ave cor Del Monte",
    "area": "Quezon City",
    "lat": 14.6426137,
    "lng": 121.0268289,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 103.82,
      "unleaded": 85.86,
      "egasoline": null,
      "premium95": 88.26,
      "premium97": 97.46,
      "kerosene": 123.54
    }
  },
  {
    "id": 1713,
    "brand": "shell",
    "name": "Shell Cayetano Blvd 2 Taguig",
    "area": "Taguig",
    "lat": 14.5309287,
    "lng": 121.0669622,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1714,
    "brand": "unioil",
    "name": "Unioil MCX Muntinlupa",
    "area": "Muntinlupa",
    "lat": 14.3763644,
    "lng": 121.0160847,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 10,
    "brand": "shell",
    "name": "Shell C5 Logcom Northbound",
    "area": "Taguig",
    "lat": 14.5413,
    "lng": 121.0553,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 11,
    "brand": "petron",
    "name": "Petron Pasong Tamo Ext BGC",
    "area": "Taguig",
    "lat": 14.536,
    "lng": 121.052,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 103.82,
      "unleaded": 85.86,
      "egasoline": null,
      "premium95": 88.26,
      "premium97": 97.46,
      "kerosene": 123.54
    }
  },
  {
    "id": 12,
    "brand": "caltex",
    "name": "Caltex East Service Rd Bicutan",
    "area": "Parañaque",
    "lat": 14.493,
    "lng": 121.047,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 111.99,
      "unleaded": 91.88,
      "egasoline": null,
      "premium95": 99.53,
      "premium97": 103.03,
      "kerosene": 122.41
    }
  },
  {
    "id": 13,
    "brand": "shell",
    "name": "Shell EDSA-Main Cubao",
    "area": "Quezon City",
    "lat": 14.6135,
    "lng": 121.0543,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 14,
    "brand": "shell",
    "name": "Shell Quezon Ave / Sct Albano",
    "area": "Quezon City",
    "lat": 14.6412,
    "lng": 121.0334,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 15,
    "brand": "shell",
    "name": "Shell Mindanao Ave Bahay Toro",
    "area": "Quezon City",
    "lat": 14.6692,
    "lng": 121.0334,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 17,
    "brand": "petron",
    "name": "Petron EDSA-Main Ave Crame",
    "area": "Quezon City",
    "lat": 14.6088,
    "lng": 121.0525,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 103.82,
      "unleaded": 85.86,
      "egasoline": null,
      "premium95": 88.26,
      "premium97": 97.46,
      "kerosene": 123.54
    }
  },
  {
    "id": 18,
    "brand": "petron",
    "name": "Petron Commonwealth UP Campus",
    "area": "Quezon City",
    "lat": 14.656,
    "lng": 121.053,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 103.82,
      "unleaded": 85.86,
      "egasoline": null,
      "premium95": 88.26,
      "premium97": 97.46,
      "kerosene": 123.54
    }
  },
  {
    "id": 19,
    "brand": "caltex",
    "name": "Caltex EDSA Balintawak",
    "area": "Quezon City",
    "lat": 14.6573,
    "lng": 121.0045,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 111.99,
      "unleaded": 91.88,
      "egasoline": null,
      "premium95": 99.53,
      "premium97": 103.03,
      "kerosene": 122.41
    }
  },
  {
    "id": 20,
    "brand": "caltex",
    "name": "Caltex Congressional / Cagayan",
    "area": "Quezon City",
    "lat": 14.653,
    "lng": 121.03,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 111.99,
      "unleaded": 91.88,
      "egasoline": null,
      "premium95": 99.53,
      "premium97": 103.03,
      "kerosene": 122.41
    }
  },
  {
    "id": 21,
    "brand": "caltex",
    "name": "Caltex Katipunan Linear Bldg",
    "area": "Quezon City",
    "lat": 14.61,
    "lng": 121.0706,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 111.99,
      "unleaded": 91.88,
      "egasoline": null,
      "premium95": 99.53,
      "premium97": 103.03,
      "kerosene": 122.41
    }
  },
  {
    "id": 22,
    "brand": "caltex",
    "name": "Caltex Visayas Ave Culiat",
    "area": "Quezon City",
    "lat": 14.6589,
    "lng": 121.0452,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 111.99,
      "unleaded": 91.88,
      "egasoline": null,
      "premium95": 99.53,
      "premium97": 103.03,
      "kerosene": 122.41
    }
  },
  {
    "id": 23,
    "brand": "caltex",
    "name": "Caltex Kamuning / Judge Jimenez",
    "area": "Quezon City",
    "lat": 14.628,
    "lng": 121.039,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 24,
    "brand": "phoenix",
    "name": "Phoenix Timog Ave South Triangle",
    "area": "Quezon City",
    "lat": 14.6337,
    "lng": 121.0394,
    "prices": {
      "diesel": 86.94,
      "unleaded": 81.15,
      "egasoline": 81.85,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 25,
    "brand": "phoenix",
    "name": "Phoenix G. Araneta / Baloy Santol",
    "area": "Quezon City",
    "lat": 14.6241,
    "lng": 121.0115,
    "prices": {
      "diesel": 86.94,
      "unleaded": 81.15,
      "egasoline": 81.85,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 26,
    "brand": "seaoil",
    "name": "Seaoil A. Bonifacio / Sct Alcaraz",
    "area": "Quezon City",
    "lat": 14.6368,
    "lng": 121.0101,
    "prices": {
      "diesel": 101.64,
      "premiumDiesel": 104.33,
      "unleaded": 84.32,
      "egasoline": 85.52,
      "premium95": 89.52,
      "premium97": 92.62,
      "kerosene": 128.54
    }
  },
  {
    "id": 27,
    "brand": "unioil",
    "name": "Unioil Congressional Ave Ext Culiat",
    "area": "Quezon City",
    "lat": 14.687,
    "lng": 121.043,
    "prices": {
      "diesel": 101.26,
      "unleaded": 86.66,
      "egasoline": 87.36,
      "premium95": 92.66,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 28,
    "brand": "unioil",
    "name": "Unioil Kalayaan Teachers Village",
    "area": "Quezon City",
    "lat": 14.642,
    "lng": 121.0586,
    "prices": {
      "diesel": 101.26,
      "unleaded": 86.66,
      "egasoline": 87.36,
      "premium95": 92.66,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 29,
    "brand": "shell",
    "name": "Shell Quirino Ave / Jorge Paco",
    "area": "Manila",
    "lat": 14.5912,
    "lng": 121.0019,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 30,
    "brand": "petron",
    "name": "Petron Taft Ave Malate",
    "area": "Manila",
    "lat": 14.5759,
    "lng": 120.9882,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 31,
    "brand": "caltex",
    "name": "Caltex Quirino / Mabini Malate",
    "area": "Manila",
    "lat": 14.5726,
    "lng": 120.9931,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 32,
    "brand": "caltex",
    "name": "Caltex Jose Abad Santos Tondo",
    "area": "Manila",
    "lat": 14.618,
    "lng": 120.9776,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 111.99,
      "unleaded": 91.88,
      "egasoline": null,
      "premium95": 99.53,
      "premium97": 103.03,
      "kerosene": 122.41
    }
  },
  {
    "id": 33,
    "brand": "phoenix",
    "name": "Phoenix Dimasalang Sta Cruz",
    "area": "Manila",
    "lat": 14.6069,
    "lng": 120.986,
    "prices": {
      "diesel": 86.94,
      "unleaded": 81.15,
      "egasoline": 81.85,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 35,
    "brand": "shell",
    "name": "Shell E. Rodriguez / Julia Vargas",
    "area": "Pasig",
    "lat": 14.5832,
    "lng": 121.0767,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 36,
    "brand": "shell",
    "name": "Shell C. Raymundo Caniogan",
    "area": "Pasig",
    "lat": 14.5736,
    "lng": 121.0834,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 37,
    "brand": "caltex",
    "name": "Caltex C. Raymundo Maybunga",
    "area": "Pasig",
    "lat": 14.573,
    "lng": 121.083,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 111.99,
      "unleaded": 91.88,
      "egasoline": null,
      "premium95": 99.53,
      "premium97": 103.03,
      "kerosene": 122.41
    }
  },
  {
    "id": 38,
    "brand": "caltex",
    "name": "Caltex Amang Rodriguez Manggahan",
    "area": "Pasig",
    "lat": 14.6039,
    "lng": 121.0923,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 111.99,
      "unleaded": 91.88,
      "egasoline": null,
      "premium95": 99.53,
      "premium97": 103.03,
      "kerosene": 122.41
    }
  },
  {
    "id": 39,
    "brand": "phoenix",
    "name": "Phoenix A. Sandoval Pinagbuhatan",
    "area": "Pasig",
    "lat": 14.5522,
    "lng": 121.0986,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 40,
    "brand": "petron",
    "name": "Petron EDSA Boni Mandaluyong",
    "area": "Mandaluyong",
    "lat": 14.579,
    "lng": 121.0504,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 103.82,
      "unleaded": 85.86,
      "egasoline": null,
      "premium95": 88.26,
      "premium97": 97.46,
      "kerosene": 123.54
    }
  },
  {
    "id": 41,
    "brand": "caltex",
    "name": "Caltex Gen Kalentong / Romualdez",
    "area": "Mandaluyong",
    "lat": 14.5945,
    "lng": 121.0283,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 111.99,
      "unleaded": 91.88,
      "egasoline": null,
      "premium95": 99.53,
      "premium97": 103.03,
      "kerosene": 122.41
    }
  },
  {
    "id": 42,
    "brand": "phoenix",
    "name": "Phoenix Shaw Blvd Addition Hills",
    "area": "Mandaluyong",
    "lat": 14.5772,
    "lng": 121.0471,
    "prices": {
      "diesel": 86.94,
      "unleaded": 81.15,
      "egasoline": 81.85,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 43,
    "brand": "shell",
    "name": "Shell Sucat Rd Sta Rita",
    "area": "Parañaque",
    "lat": 14.4558,
    "lng": 121.0368,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 44,
    "brand": "shell",
    "name": "Shell Doña Soledad Don Bosco",
    "area": "Parañaque",
    "lat": 14.4874,
    "lng": 121.028,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 105.44,
      "unleaded": 90.23,
      "egasoline": null,
      "premium95": 97.13,
      "premium97": 100.58,
      "kerosene": 126.81
    }
  },
  {
    "id": 45,
    "brand": "shell",
    "name": "Shell Diosdado Macapagal Ave",
    "area": "Parañaque",
    "lat": 14.5303,
    "lng": 120.9888,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 105.44,
      "unleaded": 90.23,
      "egasoline": null,
      "premium95": 97.13,
      "premium97": 100.58,
      "kerosene": 126.81
    }
  },
  {
    "id": 46,
    "brand": "caltex",
    "name": "Caltex Pres Ave BF Homes",
    "area": "Parañaque",
    "lat": 14.458,
    "lng": 121.025,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 111.99,
      "unleaded": 91.88,
      "egasoline": null,
      "premium95": 99.53,
      "premium97": 103.03,
      "kerosene": 122.41
    }
  },
  {
    "id": 47,
    "brand": "phoenix",
    "name": "Phoenix Sucat Dr. A. Santos",
    "area": "Parañaque",
    "lat": 14.4709,
    "lng": 121.0351,
    "prices": {
      "diesel": 86.94,
      "unleaded": 81.15,
      "egasoline": 81.85,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 48,
    "brand": "phoenix",
    "name": "Phoenix Ninoy Aquino Ave San Dionisio",
    "area": "Parañaque",
    "lat": 14.4904,
    "lng": 121.0166,
    "prices": {
      "diesel": 86.94,
      "unleaded": 81.15,
      "egasoline": 81.85,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 50,
    "brand": "phoenix",
    "name": "Phoenix EDSA Ext Pasay",
    "area": "Pasay",
    "lat": 14.5354,
    "lng": 120.9988,
    "prices": {
      "diesel": 86.94,
      "unleaded": 81.15,
      "egasoline": 81.85,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 51,
    "brand": "unioil",
    "name": "Unioil Gil Puyat Ext San Rafael",
    "area": "Makati",
    "lat": 14.5571,
    "lng": 121.0065,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 52,
    "brand": "caltex",
    "name": "Caltex A. Bonifacio Ave Marikina",
    "area": "Marikina",
    "lat": 14.6337,
    "lng": 121.0851,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 111.99,
      "unleaded": 91.88,
      "egasoline": null,
      "premium95": 99.53,
      "premium97": 103.03,
      "kerosene": 122.41
    }
  },
  {
    "id": 53,
    "brand": "petron",
    "name": "Petron Marcos Hwy Santolan Pasig",
    "area": "Pasig",
    "lat": 14.6201,
    "lng": 121.097,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 54,
    "brand": "phoenix",
    "name": "Phoenix JP Rizal Nangka",
    "area": "Marikina",
    "lat": 14.6693,
    "lng": 121.1082,
    "prices": {
      "diesel": 86.94,
      "unleaded": 81.15,
      "egasoline": 81.85,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 55,
    "brand": "caltex",
    "name": "Caltex A. Mabini Caloocan",
    "area": "Caloocan",
    "lat": 14.65,
    "lng": 120.969,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 111.99,
      "unleaded": 91.88,
      "egasoline": null,
      "premium95": 99.53,
      "premium97": 103.03,
      "kerosene": 122.41
    }
  },
  {
    "id": 56,
    "brand": "phoenix",
    "name": "Phoenix C3 Road / 5th Ave",
    "area": "Caloocan",
    "lat": 14.6446,
    "lng": 120.9821,
    "prices": {
      "diesel": 86.94,
      "unleaded": 81.15,
      "egasoline": 81.85,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 57,
    "brand": "phoenix",
    "name": "Phoenix Camarin",
    "area": "Caloocan",
    "lat": 14.7297,
    "lng": 121.0368,
    "prices": {
      "diesel": 86.94,
      "unleaded": 81.15,
      "egasoline": 81.85,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 58,
    "brand": "seaoil",
    "name": "Seaoil A. Mabini Sangandaan",
    "area": "Caloocan",
    "lat": 14.651,
    "lng": 120.968,
    "prices": {
      "diesel": 101.64,
      "premiumDiesel": 104.33,
      "unleaded": 84.32,
      "egasoline": 85.52,
      "premium95": 89.52,
      "premium97": 92.62,
      "kerosene": 128.54
    }
  },
  {
    "id": 59,
    "brand": "caltex",
    "name": "Caltex National Rd Putatan",
    "area": "Muntinlupa",
    "lat": 14.3992,
    "lng": 121.0427,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 60,
    "brand": "petron",
    "name": "Petron SLEX West Service Rd",
    "area": "Muntinlupa",
    "lat": 14.44,
    "lng": 121.0433,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 103.82,
      "unleaded": 85.86,
      "egasoline": null,
      "premium95": 88.26,
      "premium97": 97.46,
      "kerosene": 123.54
    }
  },
  {
    "id": 61,
    "brand": "phoenix",
    "name": "Phoenix Filinvest Alabang-Zapote",
    "area": "Muntinlupa",
    "lat": 14.4173,
    "lng": 121.0378,
    "prices": {
      "diesel": 86.94,
      "unleaded": 81.15,
      "egasoline": 81.85,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 62,
    "brand": "phoenix",
    "name": "Phoenix West Service Rd Cupang",
    "area": "Muntinlupa",
    "lat": 14.44,
    "lng": 121.0433,
    "prices": {
      "diesel": 86.94,
      "unleaded": 81.15,
      "egasoline": 81.85,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 63,
    "brand": "shell",
    "name": "Shell Alabang-Zapote Rd Pamplona",
    "area": "Las Piñas",
    "lat": 14.4434,
    "lng": 120.9974,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 64,
    "brand": "caltex",
    "name": "Caltex Alabang-Zapote Pamplona Uno",
    "area": "Las Piñas",
    "lat": 14.445,
    "lng": 120.988,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 111.99,
      "unleaded": 91.88,
      "egasoline": null,
      "premium95": 99.53,
      "premium97": 103.03,
      "kerosene": 122.41
    }
  },
  {
    "id": 65,
    "brand": "phoenix",
    "name": "Phoenix Marcos Alvarez Talon",
    "area": "Las Piñas",
    "lat": 14.4431,
    "lng": 120.9965,
    "prices": {
      "diesel": 86.94,
      "unleaded": 81.15,
      "egasoline": 81.85,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 66,
    "brand": "jetti",
    "name": "Jetti Naga Road Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4693,
    "lng": 120.9784,
    "prices": {
      "diesel": 86.74,
      "unleaded": 77.97,
      "egasoline": null,
      "premium95": 82.77,
      "premium97": 86.27,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 67,
    "brand": "shell",
    "name": "Shell MH Del Pilar Palasan",
    "area": "Valenzuela",
    "lat": 14.7053,
    "lng": 120.9475,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 68,
    "brand": "caltex",
    "name": "Caltex T. Santiago Lingunan",
    "area": "Valenzuela",
    "lat": 14.7141,
    "lng": 120.9816,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 111.99,
      "unleaded": 91.88,
      "egasoline": null,
      "premium95": 99.53,
      "premium97": 103.03,
      "kerosene": 122.41
    }
  },
  {
    "id": 69,
    "brand": "phoenix",
    "name": "Phoenix MacArthur Hwy Malanday",
    "area": "Valenzuela",
    "lat": 14.7194,
    "lng": 120.9547,
    "prices": {
      "diesel": 86.94,
      "unleaded": 81.15,
      "egasoline": 81.85,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 70,
    "brand": "seaoil",
    "name": "Seaoil Maysan Rd Valenzuela",
    "area": "Valenzuela",
    "lat": 14.6978,
    "lng": 120.9765,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 71,
    "brand": "caltex",
    "name": "Caltex Ortigas / Wilson Greenhills",
    "area": "San Juan",
    "lat": 14.601,
    "lng": 121.048,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 72,
    "brand": "petron",
    "name": "Petron N. Domingo / San Gabriel",
    "area": "San Juan",
    "lat": 14.6096,
    "lng": 121.03,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 73,
    "brand": "unioil",
    "name": "Unioil N. Domingo Valencia",
    "area": "San Juan",
    "lat": 14.5998,
    "lng": 121.0341,
    "prices": {
      "diesel": 101.26,
      "unleaded": 86.66,
      "egasoline": 87.36,
      "premium95": 92.66,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 74,
    "brand": "shell",
    "name": "Shell MH Del Pilar / Gov Pascual",
    "area": "Malabon",
    "lat": 14.6679,
    "lng": 120.9656,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 105.44,
      "unleaded": 90.23,
      "egasoline": null,
      "premium95": 97.13,
      "premium97": 100.58,
      "kerosene": 126.81
    }
  },
  {
    "id": 76,
    "brand": "phoenix",
    "name": "Phoenix MH Del Pilar Tinajeros",
    "area": "Malabon",
    "lat": 14.6625,
    "lng": 120.9689,
    "prices": {
      "diesel": 86.94,
      "unleaded": 81.15,
      "egasoline": 81.85,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 77,
    "brand": "flyingv",
    "name": "Flying V Sandoval Ave San Miguel",
    "area": "Pasig",
    "lat": 14.566,
    "lng": 121.0943,
    "prices": {
      "diesel": 82.79,
      "unleaded": 84.54,
      "egasoline": null,
      "premium95": 88.34,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 78,
    "brand": "flyingv",
    "name": "Flying V Araneta Ave",
    "area": "Quezon City",
    "lat": 14.6166,
    "lng": 121.0158,
    "prices": {
      "diesel": 82.79,
      "unleaded": 84.54,
      "egasoline": null,
      "premium95": 88.34,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 79,
    "brand": "flyingv",
    "name": "Flying V Bagumbong Rd",
    "area": "Quezon City",
    "lat": 14.735,
    "lng": 121.042,
    "prices": {
      "diesel": 100.45,
      "unleaded": 85.21,
      "egasoline": null,
      "premium95": 89.21,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 80,
    "brand": "flyingv",
    "name": "Flying V MacArthur Hwy",
    "area": "Valenzuela",
    "lat": 14.706,
    "lng": 120.972,
    "prices": {
      "diesel": 100.45,
      "unleaded": 85.21,
      "egasoline": null,
      "premium95": 89.21,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 81,
    "brand": "flyingv",
    "name": "Flying V M. Almeda Pateros",
    "area": "Pateros",
    "lat": 14.5444,
    "lng": 121.0679,
    "prices": {
      "diesel": 73.53,
      "unleaded": 79.78,
      "egasoline": null,
      "premium95": 84.45,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 82,
    "brand": "cleanfuel",
    "name": "Cleanfuel P. Gil Sta. Ana",
    "area": "Manila",
    "lat": 14.5802,
    "lng": 121.0074,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 83,
    "brand": "cleanfuel",
    "name": "Cleanfuel Commonwealth Ave Balara",
    "area": "Quezon City",
    "lat": 14.6672,
    "lng": 121.0731,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 84,
    "brand": "cleanfuel",
    "name": "Cleanfuel Fairview Regalado Ave",
    "area": "Quezon City",
    "lat": 14.7088,
    "lng": 121.054,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 85,
    "brand": "cleanfuel",
    "name": "Cleanfuel EDSA Cubao",
    "area": "Quezon City",
    "lat": 14.6187,
    "lng": 121.055,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 86,
    "brand": "total",
    "name": "Total Filinvest Alabang",
    "area": "Muntinlupa",
    "lat": 14.417,
    "lng": 121.0375,
    "prices": {
      "diesel": 94.14,
      "premiumDiesel": 87.57,
      "unleaded": 83.28,
      "egasoline": null,
      "premium95": 88.08,
      "premium97": 91.58,
      "kerosene": null
    }
  },
  {
    "id": 87,
    "brand": "total",
    "name": "Total Pedro Gil Manila",
    "area": "Manila",
    "lat": 14.5798,
    "lng": 121.0065,
    "prices": {
      "diesel": 94.14,
      "premiumDiesel": 87.57,
      "unleaded": 83.28,
      "egasoline": null,
      "premium95": 88.08,
      "premium97": 91.58,
      "kerosene": null
    }
  },
  {
    "id": 88,
    "brand": "total",
    "name": "Total Metropolitan Ave Makati",
    "area": "Makati",
    "lat": 14.5563,
    "lng": 121.019,
    "prices": {
      "diesel": 94.14,
      "premiumDiesel": 87.57,
      "unleaded": 83.28,
      "egasoline": null,
      "premium95": 88.08,
      "premium97": 91.58,
      "kerosene": null
    }
  },
  {
    "id": 89,
    "brand": "total",
    "name": "Total EDSA Balintawak",
    "area": "Quezon City",
    "lat": 14.657,
    "lng": 121.004,
    "prices": {
      "diesel": 94.14,
      "premiumDiesel": 87.57,
      "unleaded": 83.28,
      "egasoline": null,
      "premium95": 88.08,
      "premium97": 91.58,
      "kerosene": null
    }
  },
  {
    "id": 90,
    "brand": "flyingv",
    "name": "Flying V F. Huertas Sta. Cruz",
    "area": "Manila",
    "lat": 14.609,
    "lng": 120.9838,
    "prices": {
      "diesel": 100.45,
      "unleaded": 85.21,
      "egasoline": null,
      "premium95": 89.21,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 91,
    "brand": "flyingv",
    "name": "Flying V P. Tuazon Cubao",
    "area": "Quezon City",
    "lat": 14.621,
    "lng": 121.058,
    "prices": {
      "diesel": 100.45,
      "unleaded": 85.21,
      "egasoline": null,
      "premium95": 89.21,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 92,
    "brand": "flyingv",
    "name": "Flying V Gen. Santos Ave",
    "area": "Taguig",
    "lat": 14.521,
    "lng": 121.056,
    "prices": {
      "diesel": 100.45,
      "unleaded": 85.21,
      "egasoline": null,
      "premium95": 89.21,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 93,
    "brand": "cleanfuel",
    "name": "Cleanfuel Bonny Serrano Cubao",
    "area": "Quezon City",
    "lat": 14.6195,
    "lng": 121.0485,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 94,
    "brand": "cleanfuel",
    "name": "Cleanfuel Amang Rodriguez Pasig",
    "area": "Pasig",
    "lat": 14.5875,
    "lng": 121.083,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 95,
    "brand": "cleanfuel",
    "name": "Cleanfuel Boni Ave Mandaluyong",
    "area": "Mandaluyong",
    "lat": 14.574,
    "lng": 121.0345,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 96,
    "brand": "ptt",
    "name": "PTT EDSA Loring Pasay",
    "area": "Pasay",
    "lat": 14.5435,
    "lng": 121.0015,
    "prices": {
      "diesel": 90.01,
      "unleaded": 82.99,
      "egasoline": null,
      "premium95": 86.99,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 97,
    "brand": "ptt",
    "name": "PTT Arnaiz Ave San Roque Pasay",
    "area": "Pasay",
    "lat": 14.548,
    "lng": 120.996,
    "prices": {
      "diesel": 90.01,
      "unleaded": 82.99,
      "egasoline": null,
      "premium95": 86.99,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 98,
    "brand": "ptt",
    "name": "PTT Gen. Molina Marikina",
    "area": "Marikina",
    "lat": 14.636,
    "lng": 121.102,
    "prices": {
      "diesel": 90.01,
      "unleaded": 82.99,
      "egasoline": null,
      "premium95": 86.99,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 99,
    "brand": "ptt",
    "name": "PTT Belfast Fairview",
    "area": "Quezon City",
    "lat": 14.71,
    "lng": 121.061,
    "prices": {
      "diesel": 90.01,
      "unleaded": 82.99,
      "egasoline": null,
      "premium95": 86.99,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 100,
    "brand": "petron",
    "name": "Petron Zobel Roxas / Dian La Paz",
    "area": "Makati",
    "lat": 14.5651,
    "lng": 121.004,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 103.82,
      "unleaded": 85.86,
      "egasoline": null,
      "premium95": 88.26,
      "premium97": 97.46,
      "kerosene": 123.54
    }
  },
  {
    "id": 101,
    "brand": "petron",
    "name": "Petron Kamagong / P. Ocampo Ext",
    "area": "Makati",
    "lat": 14.5565,
    "lng": 121.0148,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 103.82,
      "unleaded": 85.86,
      "egasoline": null,
      "premium95": 88.26,
      "premium97": 97.46,
      "kerosene": 123.54
    }
  },
  {
    "id": 102,
    "brand": "petron",
    "name": "Petron Evangelista Pio del Pilar",
    "area": "Makati",
    "lat": 14.5507,
    "lng": 121.0104,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 103.82,
      "unleaded": 85.86,
      "egasoline": null,
      "premium95": 88.26,
      "premium97": 97.46,
      "kerosene": 123.54
    }
  },
  {
    "id": 103,
    "brand": "petron",
    "name": "Petron J.P. Rizal / Reposo",
    "area": "Makati",
    "lat": 14.5646,
    "lng": 121.0344,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 103.82,
      "unleaded": 85.86,
      "egasoline": null,
      "premium95": 88.26,
      "premium97": 97.46,
      "kerosene": 123.54
    }
  },
  {
    "id": 104,
    "brand": "petron",
    "name": "Petron Katipunan / Mangyan Loyola Hts",
    "area": "Quezon City",
    "lat": 14.6467,
    "lng": 121.0748,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 105,
    "brand": "petron",
    "name": "Petron Timog / Tomas Morato",
    "area": "Quezon City",
    "lat": 14.6338,
    "lng": 121.0411,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 106,
    "brand": "petron",
    "name": "Petron V. Luna / Masikap Pinyahan",
    "area": "Quezon City",
    "lat": 14.636,
    "lng": 121.0465,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 103.82,
      "unleaded": 85.86,
      "egasoline": null,
      "premium95": 88.26,
      "premium97": 97.46,
      "kerosene": 123.54
    }
  },
  {
    "id": 107,
    "brand": "petron",
    "name": "Petron Xavierville / Katipunan",
    "area": "Quezon City",
    "lat": 14.639,
    "lng": 121.0671,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 103.82,
      "unleaded": 85.86,
      "egasoline": null,
      "premium95": 88.26,
      "premium97": 97.46,
      "kerosene": 123.54
    }
  },
  {
    "id": 108,
    "brand": "petron",
    "name": "Petron Mindanao Ave Bahay Toro",
    "area": "Quezon City",
    "lat": 14.669,
    "lng": 121.0336,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 103.82,
      "unleaded": 85.86,
      "egasoline": null,
      "premium95": 88.26,
      "premium97": 97.46,
      "kerosene": 123.54
    }
  },
  {
    "id": 109,
    "brand": "petron",
    "name": "Petron UN Ave / Romualdez Paco",
    "area": "Manila",
    "lat": 14.5835,
    "lng": 120.9884,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 110,
    "brand": "petron",
    "name": "Petron Dela Fuente / G. Tuazon Sampaloc",
    "area": "Manila",
    "lat": 14.6049,
    "lng": 121.0003,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": null,
      "kerosene": 123.54
    }
  },
  {
    "id": 111,
    "brand": "petron",
    "name": "Petron Rizal Ave / Malabon St Sta Cruz",
    "area": "Manila",
    "lat": 14.61,
    "lng": 120.9815,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 103.82,
      "unleaded": 85.86,
      "egasoline": null,
      "premium95": 88.26,
      "premium97": 97.46,
      "kerosene": 123.54
    }
  },
  {
    "id": 112,
    "brand": "petron",
    "name": "Petron Juan Luna / Honorio Lopez Tondo",
    "area": "Manila",
    "lat": 14.6157,
    "lng": 120.9701,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 113,
    "brand": "petron",
    "name": "Petron West Service Rd Sun Valley",
    "area": "Parañaque",
    "lat": 14.4952,
    "lng": 121.041,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 114,
    "brand": "petron",
    "name": "Petron Dr. A. Santos Ave Sucat",
    "area": "Parañaque",
    "lat": 14.4573,
    "lng": 121.0348,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 115,
    "brand": "petron",
    "name": "Petron Quirino Ave / Kabihasnan",
    "area": "Parañaque",
    "lat": 14.4923,
    "lng": 120.9881,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 103.82,
      "unleaded": 85.86,
      "egasoline": null,
      "premium95": 88.26,
      "premium97": 97.46,
      "kerosene": 123.54
    }
  },
  {
    "id": 116,
    "brand": "petron",
    "name": "Petron Macapagal Blvd / EDSA Ext",
    "area": "Pasay",
    "lat": 14.5494,
    "lng": 120.9929,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 117,
    "brand": "petron",
    "name": "Petron F.B. Harrison Pasay",
    "area": "Pasay",
    "lat": 14.5441,
    "lng": 120.9916,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 118,
    "brand": "petron",
    "name": "Petron Alabang-Zapote Rd Pamplona",
    "area": "Las Piñas",
    "lat": 14.4443,
    "lng": 120.9943,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 103.82,
      "unleaded": 85.86,
      "egasoline": null,
      "premium95": 88.26,
      "premium97": 97.46,
      "kerosene": 123.54
    }
  },
  {
    "id": 119,
    "brand": "petron",
    "name": "Petron McArthur Hwy / Gov Santiago Malinta",
    "area": "Valenzuela",
    "lat": 14.7046,
    "lng": 120.9613,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 103.82,
      "unleaded": 85.86,
      "egasoline": null,
      "premium95": 88.26,
      "premium97": 97.46,
      "kerosene": 123.54
    }
  },
  {
    "id": 120,
    "brand": "petron",
    "name": "Petron Rizal Ave Ext Grace Park",
    "area": "Caloocan",
    "lat": 14.6555,
    "lng": 120.9783,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 103.82,
      "unleaded": 85.86,
      "egasoline": null,
      "premium95": 88.26,
      "premium97": 97.46,
      "kerosene": 123.54
    }
  },
  {
    "id": 122,
    "brand": "petron",
    "name": "Petron Gen. Luna / Sacristia San Agustin",
    "area": "Malabon",
    "lat": 14.663,
    "lng": 120.9498,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 103.82,
      "unleaded": 85.86,
      "egasoline": null,
      "premium95": 88.26,
      "premium97": 97.46,
      "kerosene": 123.54
    }
  },
  {
    "id": 123,
    "brand": "petron",
    "name": "Petron C4 Road Navotas",
    "area": "Navotas",
    "lat": 14.653,
    "lng": 120.9425,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 103.82,
      "unleaded": 85.86,
      "egasoline": null,
      "premium95": 88.26,
      "premium97": 97.46,
      "kerosene": 123.54
    }
  },
  {
    "id": 124,
    "brand": "petron",
    "name": "Petron C5 / E. Rodriguez Ugong",
    "area": "Pasig",
    "lat": 14.58,
    "lng": 121.071,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 103.82,
      "unleaded": 85.86,
      "egasoline": null,
      "premium95": 88.26,
      "premium97": 97.46,
      "kerosene": 123.54
    }
  },
  {
    "id": 130,
    "brand": "seaoil",
    "name": "Seaoil Buendia / Gil Puyat Palanan",
    "area": "Makati",
    "lat": 14.557,
    "lng": 121.0052,
    "prices": {
      "diesel": 101.64,
      "premiumDiesel": 104.33,
      "unleaded": 84.32,
      "egasoline": 85.52,
      "premium95": 89.52,
      "premium97": 92.62,
      "kerosene": 128.54
    }
  },
  {
    "id": 131,
    "brand": "seaoil",
    "name": "Seaoil EDSA P. Tuazon Cubao",
    "area": "Quezon City",
    "lat": 14.6159,
    "lng": 121.0518,
    "prices": {
      "diesel": 101.64,
      "premiumDiesel": 104.33,
      "unleaded": 84.32,
      "egasoline": 85.52,
      "premium95": 89.52,
      "premium97": 92.62,
      "kerosene": 128.54
    }
  },
  {
    "id": 132,
    "brand": "seaoil",
    "name": "Seaoil E. Rodriguez Sr. Ave Doña Josefa",
    "area": "Quezon City",
    "lat": 14.6282,
    "lng": 120.994,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 133,
    "brand": "seaoil",
    "name": "Seaoil Commonwealth Ave Novaliches",
    "area": "Quezon City",
    "lat": 14.7129,
    "lng": 121.0587,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 134,
    "brand": "seaoil",
    "name": "Seaoil Pasig Blvd Bagong Ilog",
    "area": "Pasig",
    "lat": 14.5679,
    "lng": 121.0663,
    "prices": {
      "diesel": 101.64,
      "premiumDiesel": 104.33,
      "unleaded": 84.32,
      "egasoline": 85.52,
      "premium95": 89.52,
      "premium97": 92.62,
      "kerosene": 128.54
    }
  },
  {
    "id": 136,
    "brand": "seaoil",
    "name": "Seaoil Ususan Gen. Luna Taguig",
    "area": "Taguig",
    "lat": 14.5356,
    "lng": 121.0677,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 137,
    "brand": "seaoil",
    "name": "Seaoil Cuasay Signal Village Taguig",
    "area": "Taguig",
    "lat": 14.5126,
    "lng": 121.0585,
    "prices": {
      "diesel": 101.64,
      "premiumDiesel": 104.33,
      "unleaded": 84.32,
      "egasoline": 85.52,
      "premium95": 89.52,
      "premium97": 92.62,
      "kerosene": 128.54
    }
  },
  {
    "id": 138,
    "brand": "seaoil",
    "name": "Seaoil Sucat Dr. A. Santos Parañaque",
    "area": "Parañaque",
    "lat": 14.4551,
    "lng": 121.0417,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 139,
    "brand": "seaoil",
    "name": "Seaoil Merville West Service Rd Parañaque",
    "area": "Parañaque",
    "lat": 14.4947,
    "lng": 121.0424,
    "prices": {
      "diesel": 101.64,
      "premiumDiesel": 104.33,
      "unleaded": 84.32,
      "egasoline": 85.52,
      "premium95": 89.52,
      "premium97": 92.62,
      "kerosene": 128.54
    }
  },
  {
    "id": 140,
    "brand": "seaoil",
    "name": "Seaoil Marcos Alvarez Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4175,
    "lng": 120.9915,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 141,
    "brand": "seaoil",
    "name": "Seaoil Cupang Alabang Muntinlupa",
    "area": "Muntinlupa",
    "lat": 14.4239,
    "lng": 121.0502,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 142,
    "brand": "seaoil",
    "name": "Seaoil Pritil Juan Luna Tondo",
    "area": "Manila",
    "lat": 14.6162,
    "lng": 120.9703,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 143,
    "brand": "seaoil",
    "name": "Seaoil Paco Peñafrancia Manila",
    "area": "Manila",
    "lat": 14.5815,
    "lng": 120.9971,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 144,
    "brand": "seaoil",
    "name": "Seaoil Legarda Sampaloc Manila",
    "area": "Manila",
    "lat": 14.6014,
    "lng": 120.9939,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 150,
    "brand": "jetti",
    "name": "Jetti Mindanao Ave Bagong Pag-asa",
    "area": "Quezon City",
    "lat": 14.6636,
    "lng": 121.036,
    "prices": {
      "diesel": 86.74,
      "unleaded": 77.97,
      "egasoline": null,
      "premium95": 82.77,
      "premium97": 86.27,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 151,
    "brand": "jetti",
    "name": "Jetti Dahlia Ave / Chestnut North Fairview",
    "area": "Quezon City",
    "lat": 14.6992,
    "lng": 121.06,
    "prices": {
      "diesel": 86.74,
      "unleaded": 77.97,
      "egasoline": null,
      "premium95": 82.77,
      "premium97": 86.27,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 152,
    "brand": "jetti",
    "name": "Jetti Tandang Sora Ave",
    "area": "Quezon City",
    "lat": 14.6814,
    "lng": 121.0321,
    "prices": {
      "diesel": 86.74,
      "unleaded": 77.97,
      "egasoline": null,
      "premium95": 82.77,
      "premium97": 86.27,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 153,
    "brand": "jetti",
    "name": "Jetti ASEAN Ave Tambo Parañaque",
    "area": "Parañaque",
    "lat": 14.5249,
    "lng": 120.9912,
    "prices": {
      "diesel": 86.74,
      "unleaded": 77.97,
      "egasoline": null,
      "premium95": 82.77,
      "premium97": 86.27,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 154,
    "brand": "jetti",
    "name": "Jetti F.B. Harrison Pasay",
    "area": "Pasay",
    "lat": 14.5453,
    "lng": 120.9939,
    "prices": {
      "diesel": 86.74,
      "unleaded": 77.97,
      "egasoline": null,
      "premium95": 82.77,
      "premium97": 86.27,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 155,
    "brand": "jetti",
    "name": "Jetti Green Valley Marcos Alvarez Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4085,
    "lng": 120.9917,
    "prices": {
      "diesel": 86.74,
      "unleaded": 77.97,
      "egasoline": null,
      "premium95": 82.77,
      "premium97": 86.27,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 156,
    "brand": "jetti",
    "name": "Jetti Camarin Caloocan",
    "area": "Caloocan",
    "lat": 14.7557,
    "lng": 121.0511,
    "prices": {
      "diesel": 86.74,
      "unleaded": 77.97,
      "egasoline": null,
      "premium95": 82.77,
      "premium97": 86.27,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 160,
    "brand": "shell",
    "name": "Shell Lopez Blvd Navotas",
    "area": "Navotas",
    "lat": 14.6375,
    "lng": 120.9597,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 161,
    "brand": "caltex",
    "name": "Caltex M. Naval Navotas",
    "area": "Navotas",
    "lat": 14.6679,
    "lng": 120.9433,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 162,
    "brand": "caltex",
    "name": "Caltex R-10 NFPC Navotas",
    "area": "Navotas",
    "lat": 14.6397,
    "lng": 120.9566,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 111.99,
      "unleaded": 91.88,
      "egasoline": null,
      "premium95": 99.53,
      "premium97": 103.03,
      "kerosene": 122.41
    }
  },
  {
    "id": 163,
    "brand": "caltex",
    "name": "Caltex M. Almeda Pateros",
    "area": "Pateros",
    "lat": 14.5506,
    "lng": 121.0736,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 111.99,
      "unleaded": 91.88,
      "egasoline": null,
      "premium95": 99.53,
      "premium97": 103.03,
      "kerosene": 122.41
    }
  },
  {
    "id": 164,
    "brand": "shell",
    "name": "Shell M. Almeda Martirez Pateros",
    "area": "Pateros",
    "lat": 14.548,
    "lng": 121.07,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 105.44,
      "unleaded": 90.23,
      "egasoline": null,
      "premium95": 97.13,
      "premium97": 100.58,
      "kerosene": 126.81
    }
  },
  {
    "id": 166,
    "brand": "caltex",
    "name": "Caltex Gov. Pascual / Sisa Malabon",
    "area": "Malabon",
    "lat": 14.6706,
    "lng": 120.973,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 111.99,
      "unleaded": 91.88,
      "egasoline": null,
      "premium95": 99.53,
      "premium97": 103.03,
      "kerosene": 122.41
    }
  },
  {
    "id": 167,
    "brand": "shell",
    "name": "Shell EDSA Barranca Mandaluyong",
    "area": "Mandaluyong",
    "lat": 14.5778,
    "lng": 121.0507,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 168,
    "brand": "seaoil",
    "name": "Seaoil San Francisco Plainview Mandaluyong",
    "area": "Mandaluyong",
    "lat": 14.5738,
    "lng": 121.0303,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 170,
    "brand": "caltex",
    "name": "Caltex Gil Puyat / Leveriza Pasay",
    "area": "Pasay",
    "lat": 14.552,
    "lng": 120.9958,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 111.99,
      "unleaded": 91.88,
      "egasoline": null,
      "premium95": 99.53,
      "premium97": 103.03,
      "kerosene": 122.41
    }
  },
  {
    "id": 171,
    "brand": "shell",
    "name": "Shell Alabang-Zapote Madrigal Muntinlupa",
    "area": "Muntinlupa",
    "lat": 14.4268,
    "lng": 121.0279,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 172,
    "brand": "shell",
    "name": "Shell National Hwy Tunasan Muntinlupa",
    "area": "Muntinlupa",
    "lat": 14.3704,
    "lng": 121.0502,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 173,
    "brand": "shell",
    "name": "Shell Rizal Ave Grace Park Caloocan",
    "area": "Caloocan",
    "lat": 14.6475,
    "lng": 120.9835,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 105.44,
      "unleaded": 90.23,
      "egasoline": null,
      "premium95": 97.13,
      "premium97": 100.58,
      "kerosene": 126.81
    }
  },
  {
    "id": 174,
    "brand": "shell",
    "name": "Shell C5 Extension Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4795,
    "lng": 120.986,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 175,
    "brand": "shell",
    "name": "Shell CAA Rd Pulang Lupa Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4553,
    "lng": 120.9941,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 176,
    "brand": "phoenix",
    "name": "Phoenix Lawton Ave Fort Bonifacio Taguig",
    "area": "Taguig",
    "lat": 14.5292,
    "lng": 121.0328,
    "prices": {
      "diesel": 86.94,
      "unleaded": 81.15,
      "egasoline": 81.85,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 177,
    "brand": "caltex",
    "name": "Caltex 9th Avenue Caloocan",
    "area": "Caloocan",
    "lat": 14.6499,
    "lng": 120.9874,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 111.99,
      "unleaded": 91.88,
      "egasoline": null,
      "premium95": 99.53,
      "premium97": 103.03,
      "kerosene": 122.41
    }
  },
  {
    "id": 178,
    "brand": "caltex",
    "name": "Caltex A. Mabini Maypajo Caloocan",
    "area": "Caloocan",
    "lat": 14.6393,
    "lng": 120.9756,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 179,
    "brand": "caltex",
    "name": "Caltex Camarin Road Caloocan",
    "area": "Caloocan",
    "lat": 14.7513,
    "lng": 121.0117,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 111.99,
      "unleaded": 91.88,
      "egasoline": null,
      "premium95": 99.53,
      "premium97": 103.03,
      "kerosene": 122.41
    }
  },
  {
    "id": 180,
    "brand": "caltex",
    "name": "Caltex EDSA Mariano Ponce Caloocan",
    "area": "Caloocan",
    "lat": 14.6576,
    "lng": 120.9912,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 111.99,
      "unleaded": 91.88,
      "egasoline": null,
      "premium95": 99.53,
      "premium97": 103.03,
      "kerosene": 122.41
    }
  },
  {
    "id": 181,
    "brand": "caltex",
    "name": "Caltex EDSA Urbano Plata Caloocan",
    "area": "Caloocan",
    "lat": 14.6564,
    "lng": 120.9926,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 111.99,
      "unleaded": 91.88,
      "egasoline": null,
      "premium95": 99.53,
      "premium97": 103.03,
      "kerosene": 122.41
    }
  },
  {
    "id": 182,
    "brand": "caltex",
    "name": "Caltex Mariano Ponce C4 Caloocan",
    "area": "Caloocan",
    "lat": 14.6618,
    "lng": 120.9916,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 111.99,
      "unleaded": 91.88,
      "egasoline": null,
      "premium95": 99.53,
      "premium97": 103.03,
      "kerosene": 122.41
    }
  },
  {
    "id": 183,
    "brand": "caltex",
    "name": "Caltex Susano-Camarin Road Caloocan",
    "area": "Caloocan",
    "lat": 14.7384,
    "lng": 121.0319,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 111.99,
      "unleaded": 91.88,
      "egasoline": null,
      "premium95": 99.53,
      "premium97": 103.03,
      "kerosene": 122.41
    }
  },
  {
    "id": 184,
    "brand": "cleanfuel",
    "name": "Cleanfuel Bagumbong Caloocan",
    "area": "Caloocan",
    "lat": 14.6869,
    "lng": 121.0187,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 185,
    "brand": "cleanfuel",
    "name": "Cleanfuel Dagat-Dagatan C3 Caloocan",
    "area": "Caloocan",
    "lat": 14.6448,
    "lng": 120.9688,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 186,
    "brand": "cleanfuel",
    "name": "Cleanfuel Samson Road Caloocan",
    "area": "Caloocan",
    "lat": 14.6573,
    "lng": 120.9806,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 187,
    "brand": "flyingv",
    "name": "Flying V Bagumbong Road North Caloocan",
    "area": "Caloocan",
    "lat": 14.7522,
    "lng": 121.0176,
    "prices": {
      "diesel": 82.79,
      "unleaded": 84.54,
      "egasoline": null,
      "premium95": 88.34,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 188,
    "brand": "flyingv",
    "name": "Flying V Zabarte Road Caloocan",
    "area": "Caloocan",
    "lat": 14.7608,
    "lng": 121.0439,
    "prices": {
      "diesel": 82.79,
      "unleaded": 84.54,
      "egasoline": null,
      "premium95": 88.34,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 189,
    "brand": "petron",
    "name": "Petron A. Mabini Caloocan",
    "area": "Caloocan",
    "lat": 14.6548,
    "lng": 120.972,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 190,
    "brand": "petron",
    "name": "Petron Maypajo Caloocan",
    "area": "Caloocan",
    "lat": 14.6446,
    "lng": 120.9696,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 191,
    "brand": "petron",
    "name": "Petron Rizal Avenue South Caloocan",
    "area": "Caloocan",
    "lat": 14.6378,
    "lng": 120.9833,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 192,
    "brand": "petron",
    "name": "Petron Samson Road Caloocan",
    "area": "Caloocan",
    "lat": 14.6571,
    "lng": 120.9813,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 103.82,
      "unleaded": 85.86,
      "egasoline": null,
      "premium95": 88.26,
      "premium97": 97.46,
      "kerosene": 123.54
    }
  },
  {
    "id": 194,
    "brand": "petron",
    "name": "Petron Zabarte Road North Caloocan",
    "area": "Caloocan",
    "lat": 14.7548,
    "lng": 121.0436,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 195,
    "brand": "phoenix",
    "name": "Phoenix Camarin Susano Road Caloocan",
    "area": "Caloocan",
    "lat": 14.7684,
    "lng": 121.0439,
    "prices": {
      "diesel": 86.94,
      "unleaded": 81.15,
      "egasoline": 81.85,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 196,
    "brand": "ptt",
    "name": "PTT Camarin Road Caloocan",
    "area": "Caloocan",
    "lat": 14.757,
    "lng": 121.0539,
    "prices": {
      "diesel": 90.01,
      "unleaded": 82.99,
      "egasoline": null,
      "premium95": 86.99,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 197,
    "brand": "seaoil",
    "name": "Seaoil Brgy 12 Caloocan",
    "area": "Caloocan",
    "lat": 14.6518,
    "lng": 120.9658,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 198,
    "brand": "seaoil",
    "name": "Seaoil Dagat-Dagatan Caloocan",
    "area": "Caloocan",
    "lat": 14.7566,
    "lng": 121.045,
    "prices": {
      "diesel": 101.64,
      "premiumDiesel": 104.33,
      "unleaded": 84.32,
      "egasoline": 85.52,
      "premium95": 89.52,
      "premium97": 92.62,
      "kerosene": 128.54
    }
  },
  {
    "id": 199,
    "brand": "shell",
    "name": "Shell 10th Ave D. Aquino Caloocan",
    "area": "Caloocan",
    "lat": 14.6515,
    "lng": 120.9796,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 200,
    "brand": "shell",
    "name": "Shell 1st Ave RAE Caloocan",
    "area": "Caloocan",
    "lat": 14.6391,
    "lng": 120.9837,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 201,
    "brand": "shell",
    "name": "Shell B. Serrano Grace Park Caloocan",
    "area": "Caloocan",
    "lat": 14.6335,
    "lng": 120.984,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 105.44,
      "unleaded": 90.23,
      "egasoline": null,
      "premium95": 97.13,
      "premium97": 100.58,
      "kerosene": 126.81
    }
  },
  {
    "id": 202,
    "brand": "shell",
    "name": "Shell C3 Dagat-Dagatan Caloocan",
    "area": "Caloocan",
    "lat": 14.6469,
    "lng": 120.9629,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 105.44,
      "unleaded": 90.23,
      "egasoline": null,
      "premium95": 97.13,
      "premium97": 100.58,
      "kerosene": 126.81
    }
  },
  {
    "id": 203,
    "brand": "shell",
    "name": "Shell C3 Dalagang Bukid Navotas",
    "area": "Navotas",
    "lat": 14.6456,
    "lng": 120.9632,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 204,
    "brand": "shell",
    "name": "Shell Camarin Road Caloocan",
    "area": "Caloocan",
    "lat": 14.7464,
    "lng": 121.0358,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 205,
    "brand": "shell",
    "name": "Shell EDSA Caloocan",
    "area": "Caloocan",
    "lat": 14.6569,
    "lng": 120.9892,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 206,
    "brand": "shell",
    "name": "Shell RAE 7th Ave Caloocan",
    "area": "Caloocan",
    "lat": 14.6491,
    "lng": 120.9822,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 105.44,
      "unleaded": 90.23,
      "egasoline": null,
      "premium95": 97.13,
      "premium97": 100.58,
      "kerosene": 126.81
    }
  },
  {
    "id": 207,
    "brand": "shell",
    "name": "Shell Susano Road Camarin Caloocan",
    "area": "Caloocan",
    "lat": 14.7528,
    "lng": 121.0444,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 210,
    "brand": "caltex",
    "name": "Caltex Chino Roces Makati",
    "area": "Makati",
    "lat": 14.5462,
    "lng": 121.0156,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 111.99,
      "unleaded": 91.88,
      "egasoline": null,
      "premium95": 99.53,
      "premium97": 103.03,
      "kerosene": 122.41
    }
  },
  {
    "id": 211,
    "brand": "caltex",
    "name": "Caltex EDSA Harvard Makati",
    "area": "Makati",
    "lat": 14.5589,
    "lng": 121.04,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 212,
    "brand": "caltex",
    "name": "Caltex JP Rizal 1116 Guadalupe Makati",
    "area": "Makati",
    "lat": 14.5707,
    "lng": 121.021,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 111.99,
      "unleaded": 91.88,
      "egasoline": null,
      "premium95": 99.53,
      "premium97": 103.03,
      "kerosene": 122.41
    }
  },
  {
    "id": 213,
    "brand": "caltex",
    "name": "Caltex JP Rizal Calasanz Olympia Makati",
    "area": "Makati",
    "lat": 14.5708,
    "lng": 121.0196,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 214,
    "brand": "caltex",
    "name": "Caltex Malugay Gil Puyat Makati",
    "area": "Makati",
    "lat": 14.5599,
    "lng": 121.0112,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 111.99,
      "unleaded": 91.88,
      "egasoline": null,
      "premium95": 99.53,
      "premium97": 103.03,
      "kerosene": 122.41
    }
  },
  {
    "id": 215,
    "brand": "caltex",
    "name": "Caltex Pio del Pilar Arnaiz Ext Makati",
    "area": "Makati",
    "lat": 14.5504,
    "lng": 121.0077,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 217,
    "brand": "cleanfuel",
    "name": "Cleanfuel JP Rizal Calasanz Makati",
    "area": "Makati",
    "lat": 14.5711,
    "lng": 121.0197,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 218,
    "brand": "cleanfuel",
    "name": "Cleanfuel Kamagong Makati",
    "area": "Makati",
    "lat": 14.5665,
    "lng": 121.0076,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 219,
    "brand": "petron",
    "name": "Petron Arnaiz Ave Makati",
    "area": "Makati",
    "lat": 14.5474,
    "lng": 121.0264,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 221,
    "brand": "petron",
    "name": "Petron EDSA Danlig Pinagkaisahan Makati",
    "area": "Makati",
    "lat": 14.5583,
    "lng": 121.0392,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 224,
    "brand": "petron",
    "name": "Petron Sen Gil Puyat Buendia Makati",
    "area": "Makati",
    "lat": 14.5576,
    "lng": 121.0065,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 225,
    "brand": "petron",
    "name": "Petron Sen Gil Puyat Makati Ave Makati",
    "area": "Makati",
    "lat": 14.5618,
    "lng": 121.0275,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 227,
    "brand": "shell",
    "name": "Shell EDSA Buendia Bel Air Makati",
    "area": "Makati",
    "lat": 14.5585,
    "lng": 121.034,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 105.44,
      "unleaded": 90.23,
      "egasoline": null,
      "premium95": 97.13,
      "premium97": 100.58,
      "kerosene": 126.81
    }
  },
  {
    "id": 228,
    "brand": "shell",
    "name": "Shell EDSA Escuela Pinagkaisahan Makati",
    "area": "Makati",
    "lat": 14.56,
    "lng": 121.0414,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 229,
    "brand": "shell",
    "name": "Shell JP Rizal Guadalupe Makati",
    "area": "Makati",
    "lat": 14.5677,
    "lng": 121.0423,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 232,
    "brand": "shell",
    "name": "Shell South Super Magallanes Makati",
    "area": "Makati",
    "lat": 14.5335,
    "lng": 121.0196,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 105.44,
      "unleaded": 90.23,
      "egasoline": null,
      "premium95": 97.13,
      "premium97": 100.58,
      "kerosene": 126.81
    }
  },
  {
    "id": 233,
    "brand": "shell",
    "name": "Shell Valero Salcedo Village Makati",
    "area": "Makati",
    "lat": 14.5587,
    "lng": 121.0237,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 105.44,
      "unleaded": 90.23,
      "egasoline": null,
      "premium95": 97.13,
      "premium97": 100.58,
      "kerosene": 126.81
    }
  },
  {
    "id": 234,
    "brand": "unioil",
    "name": "Unioil Buendia Gil Puyat Palanan Makati",
    "area": "Makati",
    "lat": 14.5568,
    "lng": 121.0059,
    "prices": {
      "diesel": 101.26,
      "unleaded": 86.66,
      "egasoline": 87.36,
      "premium95": 92.66,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 235,
    "brand": "unioil",
    "name": "Unioil Makati Ave Poblacion Makati",
    "area": "Makati",
    "lat": 14.5671,
    "lng": 121.0305,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 236,
    "brand": "unioil",
    "name": "Unioil Vito Cruz Extension Makati",
    "area": "Makati",
    "lat": 14.5671,
    "lng": 121.0099,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 237,
    "brand": "shell",
    "name": "Shell C-5 Eulogio Rodriguez Ugong",
    "area": "Pasig",
    "lat": 14.5735,
    "lng": 121.0724,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 238,
    "brand": "shell",
    "name": "Shell C. Raymundo Bagong Buhay",
    "area": "Pasig",
    "lat": 14.568,
    "lng": 121.0811,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 239,
    "brand": "shell",
    "name": "Shell Velasco Ave Caliwag",
    "area": "Pasig",
    "lat": 14.5567,
    "lng": 121.0873,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 240,
    "brand": "shell",
    "name": "Shell Mercedes Ave Palatiw",
    "area": "Pasig",
    "lat": 14.5678,
    "lng": 121.0889,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 241,
    "brand": "shell",
    "name": "Shell Pasig Blvd Bagong Ilog",
    "area": "Pasig",
    "lat": 14.5661,
    "lng": 121.0661,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 242,
    "brand": "shell",
    "name": "Shell M. Concepcion San Joaquin",
    "area": "Pasig",
    "lat": 14.5533,
    "lng": 121.0726,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 243,
    "brand": "petron",
    "name": "Petron Xpressfill M. Concepcion",
    "area": "Pasig",
    "lat": 14.553,
    "lng": 121.0731,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 244,
    "brand": "petron",
    "name": "Petron Valle Verde Eulogio Rodriguez",
    "area": "Pasig",
    "lat": 14.5763,
    "lng": 121.0732,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 245,
    "brand": "petron",
    "name": "Petron Mercedes Ave Pasig",
    "area": "Pasig",
    "lat": 14.5687,
    "lng": 121.0857,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 246,
    "brand": "petron",
    "name": "Petron Shaw Blvd W. Capitol Dr",
    "area": "Pasig",
    "lat": 14.5741,
    "lng": 121.0616,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 247,
    "brand": "petron",
    "name": "Petron C. Raymundo Pasig",
    "area": "Pasig",
    "lat": 14.5659,
    "lng": 121.0769,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 249,
    "brand": "petron",
    "name": "Petron Eusebio Avenue Pasig",
    "area": "Pasig",
    "lat": 14.5718,
    "lng": 121.0888,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 250,
    "brand": "petron",
    "name": "Petron Shaw Blvd Oranbo",
    "area": "Pasig",
    "lat": 14.5716,
    "lng": 121.0653,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 253,
    "brand": "caltex",
    "name": "Caltex M. Concepcion Buting",
    "area": "Pasig",
    "lat": 14.5537,
    "lng": 121.0708,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 255,
    "brand": "caltex",
    "name": "Caltex Sandoval Ave San Miguel",
    "area": "Pasig",
    "lat": 14.5661,
    "lng": 121.0942,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 256,
    "brand": "caltex",
    "name": "Caltex Arcovia City Eulogio Rodriguez",
    "area": "Pasig",
    "lat": 14.5779,
    "lng": 121.0772,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 257,
    "brand": "caltex",
    "name": "Caltex Santolan Evangelista",
    "area": "Pasig",
    "lat": 14.6097,
    "lng": 121.0922,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 259,
    "brand": "caltex",
    "name": "Caltex Sandoval Pinagbuhatan",
    "area": "Pasig",
    "lat": 14.5569,
    "lng": 121.0973,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 260,
    "brand": "seaoil",
    "name": "Seaoil C-5 Eulogio Rodriguez Ugong",
    "area": "Pasig",
    "lat": 14.5826,
    "lng": 121.0772,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 261,
    "brand": "seaoil",
    "name": "Seaoil Maybunga Sixto Antonio Ave",
    "area": "Pasig",
    "lat": 14.5789,
    "lng": 121.082,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 262,
    "brand": "seaoil",
    "name": "Seaoil San Antonio Ortigas",
    "area": "Pasig",
    "lat": 14.5771,
    "lng": 121.0626,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 263,
    "brand": "seaoil",
    "name": "Seaoil Palatiw Market Ave",
    "area": "Pasig",
    "lat": 14.5615,
    "lng": 121.0842,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 264,
    "brand": "seaoil",
    "name": "Seaoil C-5 ATIS Pasig",
    "area": "Pasig",
    "lat": 14.5714,
    "lng": 121.0712,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 265,
    "brand": "seaoil",
    "name": "Seaoil Ugong E. Rodriguez Ave",
    "area": "Pasig",
    "lat": 14.577,
    "lng": 121.0743,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 266,
    "brand": "phoenix",
    "name": "Phoenix Buting M. Concepcion",
    "area": "Pasig",
    "lat": 14.5535,
    "lng": 121.0705,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 267,
    "brand": "phoenix",
    "name": "Phoenix Manggahan Amang Rodriguez",
    "area": "Pasig",
    "lat": 14.6002,
    "lng": 121.092,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 269,
    "brand": "cleanfuel",
    "name": "Cleanfuel Santolan Amang Rodriguez",
    "area": "Pasig",
    "lat": 14.6164,
    "lng": 121.0925,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 270,
    "brand": "unioil",
    "name": "Unioil San Guillermo Ave Buting",
    "area": "Pasig",
    "lat": 14.5542,
    "lng": 121.0664,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 272,
    "brand": "unioil",
    "name": "Unioil Mercedes Ave Palatiw",
    "area": "Pasig",
    "lat": 14.5674,
    "lng": 121.0889,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 273,
    "brand": "total",
    "name": "Total C-5 Bagong Ilog Pasig",
    "area": "Pasig",
    "lat": 14.5661,
    "lng": 121.0709,
    "prices": {
      "diesel": 121.92,
      "premiumDiesel": 124.61,
      "unleaded": 84.08,
      "egasoline": null,
      "premium95": 88.88,
      "premium97": 92.38,
      "kerosene": null
    }
  },
  {
    "id": 274,
    "brand": "total",
    "name": "Total Pasig Blvd Shaw Ext",
    "area": "Pasig",
    "lat": 14.5667,
    "lng": 121.0658,
    "prices": {
      "diesel": 94.14,
      "premiumDiesel": 87.57,
      "unleaded": 83.28,
      "egasoline": null,
      "premium95": 88.08,
      "premium97": 91.58,
      "kerosene": null
    }
  },
  {
    "id": 275,
    "brand": "total",
    "name": "Total Velasco Ave Caliwag Pasig",
    "area": "Pasig",
    "lat": 14.5568,
    "lng": 121.086,
    "prices": {
      "diesel": 121.92,
      "premiumDiesel": 124.61,
      "unleaded": 84.08,
      "egasoline": null,
      "premium95": 88.88,
      "premium97": 92.38,
      "kerosene": null
    }
  },
  {
    "id": 276,
    "brand": "total",
    "name": "Total Eusebio Ave San Miguel Pasig",
    "area": "Pasig",
    "lat": 14.5713,
    "lng": 121.0908,
    "prices": {
      "diesel": 121.92,
      "premiumDiesel": 124.61,
      "unleaded": 84.08,
      "egasoline": null,
      "premium95": 88.88,
      "premium97": 92.38,
      "kerosene": null
    }
  },
  {
    "id": 277,
    "brand": "jetti",
    "name": "Jetti Sandoval Ave Pasig",
    "area": "Pasig",
    "lat": 14.5641,
    "lng": 121.094,
    "prices": {
      "diesel": 86.74,
      "unleaded": 77.97,
      "egasoline": null,
      "premium95": 82.77,
      "premium97": 86.27,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 278,
    "brand": "flyingv",
    "name": "Flying V Elizco Rd Pasig",
    "area": "Pasig",
    "lat": 14.551,
    "lng": 121.0812,
    "prices": {
      "diesel": 82.79,
      "unleaded": 84.54,
      "egasoline": null,
      "premium95": 88.34,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 279,
    "brand": "flyingv",
    "name": "Flying V Francisco Legaspi Pasig",
    "area": "Pasig",
    "lat": 14.5753,
    "lng": 121.0917,
    "prices": {
      "diesel": 82.79,
      "unleaded": 84.54,
      "egasoline": null,
      "premium95": 88.34,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 280,
    "brand": "flyingv",
    "name": "Flying V Caruncho Ave Pasig",
    "area": "Pasig",
    "lat": 14.5607,
    "lng": 121.0812,
    "prices": {
      "diesel": 82.79,
      "unleaded": 84.54,
      "egasoline": null,
      "premium95": 88.34,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 281,
    "brand": "shell",
    "name": "Shell Pamplona Alabang-Zapote Rd",
    "area": "Las Piñas",
    "lat": 14.4548327,
    "lng": 120.9728914,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 282,
    "brand": "shell",
    "name": "Shell Calle Real Alabang-Zapote Rd",
    "area": "Las Piñas",
    "lat": 14.44685,
    "lng": 120.9876067,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 283,
    "brand": "shell",
    "name": "Shell Zapote St Forks Alabang",
    "area": "Las Piñas",
    "lat": 14.466913,
    "lng": 120.968769,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 284,
    "brand": "shell",
    "name": "Shell Diego Cera Ave Pulang Lupa",
    "area": "Las Piñas",
    "lat": 14.4732,
    "lng": 120.9762,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 285,
    "brand": "shell",
    "name": "Shell Naga Road Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4622558,
    "lng": 120.9915021,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 286,
    "brand": "shell",
    "name": "Shell Marcos Alvarez Talon Uno",
    "area": "Las Piñas",
    "lat": 14.4257133,
    "lng": 121.0017711,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 287,
    "brand": "shell",
    "name": "Shell BF Almanza Alabang-Zapote",
    "area": "Las Piñas",
    "lat": 14.4294974,
    "lng": 121.0160866,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 288,
    "brand": "petron",
    "name": "Petron Diego Cera Ave Las Piñas",
    "area": "Las Piñas",
    "lat": 14.467355,
    "lng": 120.9695297,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 289,
    "brand": "petron",
    "name": "Petron Alabang-Zapote Rd Las Piñas",
    "area": "Las Piñas",
    "lat": 14.462545,
    "lng": 120.968926,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 290,
    "brand": "petron",
    "name": "Petron C5 Extension Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4785431,
    "lng": 120.9857717,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 291,
    "brand": "petron",
    "name": "Petron Alabang-Zapote near Southmall",
    "area": "Las Piñas",
    "lat": 14.438427,
    "lng": 121.004381,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 292,
    "brand": "petron",
    "name": "Petron Marcos Alvarez Ave Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4324517,
    "lng": 121.0047936,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 293,
    "brand": "caltex",
    "name": "Caltex Landers Alabang Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4155803,
    "lng": 121.0176186,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 294,
    "brand": "caltex",
    "name": "Caltex Marcos Alvarez Talon Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4313734,
    "lng": 121.003855,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 295,
    "brand": "total",
    "name": "Total CAA Rd Belisario Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4538885,
    "lng": 120.9933271,
    "prices": {
      "diesel": 121.92,
      "premiumDiesel": 124.61,
      "unleaded": 84.08,
      "egasoline": null,
      "premium95": 88.88,
      "premium97": 92.38,
      "kerosene": null
    }
  },
  {
    "id": 296,
    "brand": "phoenix",
    "name": "Phoenix Naga Rd Pulang Lupa Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4626895,
    "lng": 120.9894021,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 297,
    "brand": "cleanfuel",
    "name": "Cleanfuel Alabang-Zapote Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4464888,
    "lng": 120.9909275,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 298,
    "brand": "unioil",
    "name": "Unioil BF Resort Drive Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4437091,
    "lng": 120.9928735,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 299,
    "brand": "unioil",
    "name": "Unioil Southmall Almanza Uno Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4343013,
    "lng": 121.0121606,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 300,
    "brand": "jetti",
    "name": "Jetti Naga Rd Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4630042,
    "lng": 120.9897273,
    "prices": {
      "diesel": 86.74,
      "unleaded": 77.97,
      "egasoline": null,
      "premium95": 82.77,
      "premium97": 86.27,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 301,
    "brand": "petron",
    "name": "Petron Zapote Rd Las Piñas",
    "area": "Las Piñas",
    "lat": 14.456499,
    "lng": 120.971362,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 302,
    "brand": "petron",
    "name": "Petron CAA Rd Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4514293,
    "lng": 120.9788778,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 303,
    "brand": "petron",
    "name": "Petron Naga Rd Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4621826,
    "lng": 120.9908485,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 304,
    "brand": "petron",
    "name": "Petron Hospital Rd Almanza Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4252549,
    "lng": 121.0146535,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 305,
    "brand": "petron",
    "name": "Petron Daang Hari Rd Las Piñas",
    "area": "Las Piñas",
    "lat": 14.3997555,
    "lng": 121.0114022,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1763,
    "brand": "petron",
    "name": "Petron Daang Hari Almanza Dos Las Piñas",
    "area": "Las Piñas",
    "lat": 14.408,
    "lng": 121.0137,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 103.82,
      "unleaded": 85.86,
      "egasoline": null,
      "premium95": 88.26,
      "premium97": 97.46,
      "kerosene": 123.54
    }
  },
  {
    "id": 306,
    "brand": "petron",
    "name": "Petron N. Lopez Ave San Isidro Parañaque",
    "area": "Parañaque",
    "lat": 14.4679767,
    "lng": 121.0109414,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 308,
    "brand": "caltex",
    "name": "Caltex EDSA-Climaco Bangkal Makati",
    "area": "Makati",
    "lat": 14.539806,
    "lng": 121.014458,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 309,
    "brand": "caltex",
    "name": "Caltex Guadalupe JP Rizal Makati",
    "area": "Makati",
    "lat": 14.567567,
    "lng": 121.041457,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 310,
    "brand": "shell",
    "name": "Shell Sen Gil Puyat EDSA Makati",
    "area": "Makati",
    "lat": 14.5556,
    "lng": 121.035,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 311,
    "brand": "petron",
    "name": "Petron Reposo JP Rizal Makati",
    "area": "Makati",
    "lat": 14.569515,
    "lng": 121.024346,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 313,
    "brand": "seaoil",
    "name": "Seaoil EDSA Guadalupe Nuevo Makati",
    "area": "Makati",
    "lat": 14.560536,
    "lng": 121.041936,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 316,
    "brand": "unioil",
    "name": "Unioil EDSA Guadalupe Makati",
    "area": "Makati",
    "lat": 14.559323,
    "lng": 121.040583,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 317,
    "brand": "phoenix",
    "name": "Phoenix EDSA Urdaneta Makati",
    "area": "Makati",
    "lat": 14.563328,
    "lng": 121.044489,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 320,
    "brand": "shell",
    "name": "Shell C. Raymundo Maybunga Pasig",
    "area": "Pasig",
    "lat": 14.5792554,
    "lng": 121.0864304,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 321,
    "brand": "shell",
    "name": "Shell E Bank Rd Manggahan Pasig",
    "area": "Pasig",
    "lat": 14.5817,
    "lng": 121.0978,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 322,
    "brand": "shell",
    "name": "Shell Ortigas Ave San Antonio Pasig",
    "area": "Pasig",
    "lat": 14.589,
    "lng": 121.0629,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 323,
    "brand": "petron",
    "name": "Petron Maybunga C. Raymundo Pasig",
    "area": "Pasig",
    "lat": 14.5802712,
    "lng": 121.0866416,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 324,
    "brand": "petron",
    "name": "Petron F. Pike St Pasig",
    "area": "Pasig",
    "lat": 14.5709881,
    "lng": 121.0690706,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 325,
    "brand": "petron",
    "name": "Petron Capital Commons Meralco Ave Pasig",
    "area": "Pasig",
    "lat": 14.5781576,
    "lng": 121.0634207,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 326,
    "brand": "caltex",
    "name": "Caltex Floodway E Bank Rd Santa Lucia Pasig",
    "area": "Pasig",
    "lat": 14.58292,
    "lng": 121.09724,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 327,
    "brand": "caltex",
    "name": "Caltex M.H. del Pilar Pasig",
    "area": "Pasig",
    "lat": 14.5640302,
    "lng": 121.0844075,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 328,
    "brand": "caltex",
    "name": "Caltex Eusebio Ave Luis Pasig",
    "area": "Pasig",
    "lat": 14.5708826,
    "lng": 121.091734,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 330,
    "brand": "cleanfuel",
    "name": "Cleanfuel Elpidio Santos Pasig",
    "area": "Pasig",
    "lat": 14.5614055,
    "lng": 121.0860615,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 331,
    "brand": "cleanfuel",
    "name": "Cleanfuel E. Rodriguez Jr Ave Pasig",
    "area": "Pasig",
    "lat": 14.5665381,
    "lng": 121.0700738,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 332,
    "brand": "unioil",
    "name": "Unioil F. Legaspi Pasig",
    "area": "Pasig",
    "lat": 14.5754484,
    "lng": 121.0889248,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 333,
    "brand": "unioil",
    "name": "Unioil Amang Rodriguez Manggahan Pasig",
    "area": "Pasig",
    "lat": 14.5999078,
    "lng": 121.091841,
    "prices": {
      "diesel": 101.26,
      "unleaded": 86.66,
      "egasoline": 87.36,
      "premium95": 92.66,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 334,
    "brand": "ptt",
    "name": "PTT C. Raymundo Caniogan Pasig",
    "area": "Pasig",
    "lat": 14.5693314,
    "lng": 121.0833985,
    "prices": {
      "diesel": 90.01,
      "unleaded": 82.99,
      "egasoline": null,
      "premium95": 86.99,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 335,
    "brand": "ptt",
    "name": "PTT F. Legaspi Riverside Pasig",
    "area": "Pasig",
    "lat": 14.5752964,
    "lng": 121.0959449,
    "prices": {
      "diesel": 90.01,
      "unleaded": 82.99,
      "egasoline": null,
      "premium95": 86.99,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 336,
    "brand": "seaoil",
    "name": "Seaoil Capital Commons Meralco Ave Pasig",
    "area": "Pasig",
    "lat": 14.5850371,
    "lng": 121.0620644,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 337,
    "brand": "seaoil",
    "name": "Seaoil E Bank Rd Santa Lucia Pasig",
    "area": "Pasig",
    "lat": 14.5827233,
    "lng": 121.114727,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 338,
    "brand": "shell",
    "name": "Shell Felix Ave Kapasigan Pasig",
    "area": "Pasig",
    "lat": 14.61129,
    "lng": 121.07105,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 339,
    "brand": "shell",
    "name": "Shell Marcos Hwy Kapasigan Pasig",
    "area": "Pasig",
    "lat": 14.6055,
    "lng": 121.07875,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 340,
    "brand": "shell",
    "name": "Shell Felix Ave Santolan Pasig",
    "area": "Pasig",
    "lat": 14.61634,
    "lng": 121.07122,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 341,
    "brand": "shell",
    "name": "Shell Marcos Hwy N Pasig",
    "area": "Pasig",
    "lat": 14.60259,
    "lng": 121.07962,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 342,
    "brand": "shell",
    "name": "Shell Santolan Rd Pasig",
    "area": "Pasig",
    "lat": 14.62037,
    "lng": 121.09868,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 343,
    "brand": "shell",
    "name": "Shell Marcos Hwy Meralco Ave Santolan Pasig",
    "area": "Pasig",
    "lat": 14.62134,
    "lng": 121.06267,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 344,
    "brand": "shell",
    "name": "Shell Marcos Hwy Felix Ave Pasig",
    "area": "Pasig",
    "lat": 14.61982,
    "lng": 121.07214,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 345,
    "brand": "shell",
    "name": "Shell EDSA Florida Mandaluyong",
    "area": "Mandaluyong",
    "lat": 14.59887,
    "lng": 121.05931,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 346,
    "brand": "shell",
    "name": "Shell Floodway Rosario Pasig",
    "area": "Pasig",
    "lat": 14.59259,
    "lng": 121.1127,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 347,
    "brand": "shell",
    "name": "Shell Marcos Hwy Evangelista Pasig",
    "area": "Pasig",
    "lat": 14.61943,
    "lng": 121.08863,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 348,
    "brand": "shell",
    "name": "Shell Marcos Hwy E Santolan Pasig",
    "area": "Pasig",
    "lat": 14.62311,
    "lng": 121.11157,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 349,
    "brand": "shell",
    "name": "Shell Felix Ave N Kapasigan Pasig",
    "area": "Pasig",
    "lat": 14.61432,
    "lng": 121.06809,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 350,
    "brand": "shell",
    "name": "Shell ACG Santolan Pasig",
    "area": "Pasig",
    "lat": 14.61685,
    "lng": 121.10158,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 351,
    "brand": "shell",
    "name": "Shell Marcos Hwy Santolan Pasig",
    "area": "Pasig",
    "lat": 14.62159,
    "lng": 121.10806,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 353,
    "brand": "petron",
    "name": "Petron Felix Ave Santolan Pasig",
    "area": "Pasig",
    "lat": 14.6148,
    "lng": 121.07024,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 354,
    "brand": "petron",
    "name": "Petron EDSA Connecticut San Juan",
    "area": "San Juan",
    "lat": 14.60138,
    "lng": 121.05886,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 356,
    "brand": "petron",
    "name": "Petron San Miguel Ave Mandaluyong",
    "area": "Mandaluyong",
    "lat": 14.58344,
    "lng": 121.0581,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 357,
    "brand": "petron",
    "name": "Petron Marcos Hwy Santolan Pasig",
    "area": "Pasig",
    "lat": 14.61446,
    "lng": 121.10218,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 358,
    "brand": "petron",
    "name": "Petron Marcos Hwy N Pasig",
    "area": "Pasig",
    "lat": 14.6064,
    "lng": 121.07926,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 359,
    "brand": "petron",
    "name": "Petron Marcos Hwy Evangelista Pasig",
    "area": "Pasig",
    "lat": 14.62001,
    "lng": 121.08806,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 360,
    "brand": "petron",
    "name": "Petron C-5 Meralco Ave Mandaluyong",
    "area": "Mandaluyong",
    "lat": 14.58211,
    "lng": 121.05982,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 361,
    "brand": "petron",
    "name": "Petron Marcos Hwy Central Pasig",
    "area": "Pasig",
    "lat": 14.60449,
    "lng": 121.07896,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 362,
    "brand": "caltex",
    "name": "Caltex Felix Ave Kapasigan Pasig",
    "area": "Pasig",
    "lat": 14.60198,
    "lng": 121.06886,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 363,
    "brand": "caltex",
    "name": "Caltex Marcos Hwy Santolan Pasig",
    "area": "Pasig",
    "lat": 14.6205,
    "lng": 121.09933,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 365,
    "brand": "caltex",
    "name": "Caltex M. Almeda Pateros",
    "area": "Pateros",
    "lat": 14.55032,
    "lng": 121.07314,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 366,
    "brand": "caltex",
    "name": "Caltex Evangelista Santolan Pasig",
    "area": "Pasig",
    "lat": 14.60863,
    "lng": 121.10384,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 368,
    "brand": "cleanfuel",
    "name": "Cleanfuel Felix Ave Santolan Pasig",
    "area": "Pasig",
    "lat": 14.61154,
    "lng": 121.07057,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 369,
    "brand": "cleanfuel",
    "name": "Cleanfuel Marcos Hwy Santolan Pasig",
    "area": "Pasig",
    "lat": 14.62024,
    "lng": 121.09814,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 370,
    "brand": "cleanfuel",
    "name": "Cleanfuel Marcos Hwy Meralco Ave Pasig",
    "area": "Pasig",
    "lat": 14.62096,
    "lng": 121.06158,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 371,
    "brand": "cleanfuel",
    "name": "Cleanfuel Santolan Rd Pasig",
    "area": "Pasig",
    "lat": 14.61784,
    "lng": 121.10137,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 372,
    "brand": "cleanfuel",
    "name": "Cleanfuel Meralco Ave Pasig",
    "area": "Pasig",
    "lat": 14.61174,
    "lng": 121.05768,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 373,
    "brand": "total",
    "name": "Total Marcos Hwy Meralco Ave Santolan Pasig",
    "area": "Pasig",
    "lat": 14.62044,
    "lng": 121.06114,
    "prices": {
      "diesel": 121.92,
      "premiumDiesel": 124.61,
      "unleaded": 84.08,
      "egasoline": null,
      "premium95": 88.88,
      "premium97": 92.38,
      "kerosene": null
    }
  },
  {
    "id": 374,
    "brand": "unioil",
    "name": "Unioil Marcos Hwy SW Santolan Pasig",
    "area": "Pasig",
    "lat": 14.60438,
    "lng": 121.08543,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 375,
    "brand": "unioil",
    "name": "Unioil Marcos Hwy E Santolan Pasig",
    "area": "Pasig",
    "lat": 14.62323,
    "lng": 121.11234,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 376,
    "brand": "unioil",
    "name": "Unioil Felix Ave Santolan N Pasig",
    "area": "Pasig",
    "lat": 14.61833,
    "lng": 121.07144,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 377,
    "brand": "unioil",
    "name": "Unioil Felix Ave Santolan Pasig",
    "area": "Pasig",
    "lat": 14.61328,
    "lng": 121.07069,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 378,
    "brand": "unioil",
    "name": "Unioil Marcos Hwy Meralco Ave Pasig",
    "area": "Pasig",
    "lat": 14.62074,
    "lng": 121.06221,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 379,
    "brand": "unioil",
    "name": "Unioil Marcos Hwy Central Pasig",
    "area": "Pasig",
    "lat": 14.61279,
    "lng": 121.07504,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 380,
    "brand": "unioil",
    "name": "Unioil Marcos Hwy Santolan Pasig",
    "area": "Pasig",
    "lat": 14.61868,
    "lng": 121.08965,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 381,
    "brand": "phoenix",
    "name": "Phoenix Marcos Hwy Santolan Pasig",
    "area": "Pasig",
    "lat": 14.62252,
    "lng": 121.10775,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 383,
    "brand": "phoenix",
    "name": "Phoenix M. Concepcion Pateros",
    "area": "Pateros",
    "lat": 14.5498,
    "lng": 121.07272,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 384,
    "brand": "phoenix",
    "name": "Phoenix Felix Ave Kapasigan Pasig",
    "area": "Pasig",
    "lat": 14.61078,
    "lng": 121.07551,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 385,
    "brand": "caltex",
    "name": "Caltex Molino Rd Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4042007,
    "lng": 120.9766606,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 386,
    "brand": "petron",
    "name": "Petron Doña Soledad Ave Don Bosco Parañaque",
    "area": "Parañaque",
    "lat": 14.4856653,
    "lng": 121.0282297,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 387,
    "brand": "petron",
    "name": "Petron C-5 Road Extension Pamplona Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4828983,
    "lng": 120.9879114,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 388,
    "brand": "caltex",
    "name": "Caltex C-5 Road Extension La Huerta Parañaque",
    "area": "Parañaque",
    "lat": 14.4952753,
    "lng": 120.9983311,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 389,
    "brand": "caltex",
    "name": "Caltex Alabang-Zapote Rd Talon Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4398712,
    "lng": 121.005038,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 392,
    "brand": "phoenix",
    "name": "Phoenix Madrigal Ave Muntinlupa",
    "area": "Muntinlupa",
    "lat": 14.4272484,
    "lng": 121.0230741,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 394,
    "brand": "caltex",
    "name": "Caltex Quirino Ave San Dionisio Parañaque",
    "area": "Parañaque",
    "lat": 14.4933823,
    "lng": 120.988515,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 395,
    "brand": "petron",
    "name": "Petron Quirino Ave San Dionisio Parañaque",
    "area": "Parañaque",
    "lat": 14.4924243,
    "lng": 120.987585,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 396,
    "brand": "phoenix",
    "name": "Phoenix Alabang-Zapote Rd Pamplona Uno Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4719763,
    "lng": 120.9751462,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 397,
    "brand": "unioil",
    "name": "Unioil Ninoy Aquino Ave Santo Niño Parañaque",
    "area": "Parañaque",
    "lat": 14.5005195,
    "lng": 120.9968894,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 399,
    "brand": "caltex",
    "name": "Caltex Dr. A. Santos Ave San Isidro Parañaque",
    "area": "Parañaque",
    "lat": 14.4705202,
    "lng": 121.0091864,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 400,
    "brand": "caltex",
    "name": "Caltex Alabang-Zapote Rd San Dionisio Parañaque",
    "area": "Parañaque",
    "lat": 14.4736104,
    "lng": 120.9991496,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 401,
    "brand": "seaoil",
    "name": "Seaoil Dr. A. Santos Ave San Isidro Parañaque",
    "area": "Parañaque",
    "lat": 14.4668466,
    "lng": 121.0147296,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 403,
    "brand": "unioil",
    "name": "Unioil Dr. A. Santos Ave San Dionisio Parañaque",
    "area": "Parañaque",
    "lat": 14.4815912,
    "lng": 120.9967381,
    "prices": {
      "diesel": 101.26,
      "unleaded": 86.66,
      "egasoline": 87.36,
      "premium95": 92.66,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 404,
    "brand": "petron",
    "name": "Petron Dr. A. Santos Ave San Isidro Parañaque",
    "area": "Parañaque",
    "lat": 14.4721378,
    "lng": 121.0064489,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 405,
    "brand": "petron",
    "name": "Petron Dr. A. Santos Ave San Dionisio Parañaque",
    "area": "Parañaque",
    "lat": 14.4827045,
    "lng": 120.9952364,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 407,
    "brand": "cleanfuel",
    "name": "Cleanfuel Doña Soledad Ave Don Bosco Parañaque",
    "area": "Parañaque",
    "lat": 14.4882266,
    "lng": 121.0230971,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 409,
    "brand": "total",
    "name": "TotalEnergies Alabang-Zapote Rd Pamplona Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4399898,
    "lng": 120.9730674,
    "prices": {
      "diesel": 121.92,
      "premiumDiesel": 124.61,
      "unleaded": 84.08,
      "egasoline": null,
      "premium95": 88.88,
      "premium97": 92.38,
      "kerosene": null
    }
  },
  {
    "id": 410,
    "brand": "phoenix",
    "name": "Phoenix Molino Blvd Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4301901,
    "lng": 120.964719,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 411,
    "brand": "shell",
    "name": "Shell Molino Blvd Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4204316,
    "lng": 120.9665876,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 412,
    "brand": "petron",
    "name": "Petron Dr. A. Santos Ave BF Homes Parañaque",
    "area": "Parañaque",
    "lat": 14.4621485,
    "lng": 121.0245972,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 413,
    "brand": "ptt",
    "name": "PTT C-5 Road Extension Santo Niño Parañaque",
    "area": "Parañaque",
    "lat": 14.4968805,
    "lng": 121.0020081,
    "prices": {
      "diesel": 90.01,
      "unleaded": 82.99,
      "egasoline": null,
      "premium95": 86.99,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 415,
    "brand": "shell",
    "name": "Shell Doña Soledad Ave Don Bosco Parañaque",
    "area": "Parañaque",
    "lat": 14.4873609,
    "lng": 121.0249077,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 416,
    "brand": "shell",
    "name": "Shell Ninoy Aquino Ave San Dionisio Parañaque",
    "area": "Parañaque",
    "lat": 14.4878104,
    "lng": 120.9916958,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 417,
    "brand": "shell",
    "name": "Shell Dr. A. Santos Ave San Isidro Parañaque",
    "area": "Parañaque",
    "lat": 14.4674658,
    "lng": 121.0133761,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 418,
    "brand": "total",
    "name": "TotalEnergies Dr. A. Santos Ave San Dionisio Parañaque",
    "area": "Parañaque",
    "lat": 14.4766882,
    "lng": 121.0000152,
    "prices": {
      "diesel": 121.92,
      "premiumDiesel": 124.61,
      "unleaded": 84.08,
      "egasoline": null,
      "premium95": 88.88,
      "premium97": 92.38,
      "kerosene": null
    }
  },
  {
    "id": 419,
    "brand": "cleanfuel",
    "name": "Cleanfuel Ninoy Aquino Ave San Dionisio Parañaque",
    "area": "Parañaque",
    "lat": 14.4903347,
    "lng": 120.9922777,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 420,
    "brand": "shell",
    "name": "Shell Dr. A. Santos Ave San Dionisio Parañaque",
    "area": "Parañaque",
    "lat": 14.4823029,
    "lng": 120.9954077,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 421,
    "brand": "caltex",
    "name": "Caltex MIA Road NAIA Parañaque",
    "area": "Parañaque",
    "lat": 14.5024926,
    "lng": 121.0164348,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 422,
    "brand": "phoenix",
    "name": "Phoenix Ninoy Aquino Ave San Dionisio Parañaque",
    "area": "Parañaque",
    "lat": 14.4918239,
    "lng": 120.9914553,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 423,
    "brand": "total",
    "name": "TotalEnergies Molino Blvd Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4236149,
    "lng": 120.9655814,
    "prices": {
      "diesel": 121.92,
      "premiumDiesel": 124.61,
      "unleaded": 84.08,
      "egasoline": null,
      "premium95": 88.88,
      "premium97": 92.38,
      "kerosene": null
    }
  },
  {
    "id": 424,
    "brand": "phoenix",
    "name": "Phoenix Dr. A. Santos Ave San Dionisio Parañaque",
    "area": "Parañaque",
    "lat": 14.4815572,
    "lng": 120.9960834,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 425,
    "brand": "phoenix",
    "name": "Phoenix Daang Hari Almanza Dos Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4126898,
    "lng": 121.0150856,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 426,
    "brand": "petron",
    "name": "Petron Alabang-Zapote Rd Pamplona Uno Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4678996,
    "lng": 120.9646223,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 427,
    "brand": "shell",
    "name": "Shell Marcos Alvarez Ave Talon Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4300861,
    "lng": 121.0031862,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 428,
    "brand": "phoenix",
    "name": "Phoenix Marcos Alvarez Ave Talon Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4268552,
    "lng": 121.0024007,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 429,
    "brand": "shell",
    "name": "Shell Daang Hari Almanza Dos Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4077376,
    "lng": 121.012015,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 430,
    "brand": "total",
    "name": "TotalEnergies Dr. A. Santos Ave San Antonio Parañaque",
    "area": "Parañaque",
    "lat": 14.4622582,
    "lng": 121.0254215,
    "prices": {
      "diesel": 121.92,
      "premiumDiesel": 124.61,
      "unleaded": 84.08,
      "egasoline": null,
      "premium95": 88.88,
      "premium97": 92.38,
      "kerosene": null
    }
  },
  {
    "id": 431,
    "brand": "shell",
    "name": "Shell Dr. A. Santos Ave San Antonio Parañaque",
    "area": "Parañaque",
    "lat": 14.4620205,
    "lng": 121.0260791,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 432,
    "brand": "shell",
    "name": "Shell Alabang-Zapote Rd Pamplona Uno Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4577698,
    "lng": 120.9708284,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 433,
    "brand": "shell",
    "name": "Shell C-5 Road Extension Santo Niño Parañaque",
    "area": "Parañaque",
    "lat": 14.5024172,
    "lng": 121.0128961,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 434,
    "brand": "phoenix",
    "name": "Phoenix Doña Soledad Ave Moonwalk Parañaque",
    "area": "Parañaque",
    "lat": 14.490646,
    "lng": 121.0173803,
    "prices": {
      "diesel": 86.94,
      "unleaded": 81.15,
      "egasoline": 81.85,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 435,
    "brand": "unioil",
    "name": "Unioil Marcos Alvarez Ave Talon Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4291419,
    "lng": 120.9748108,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 437,
    "brand": "petron",
    "name": "Petron Molino Rd Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4002061,
    "lng": 120.9772728,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 439,
    "brand": "petron",
    "name": "Petron Alabang-Zapote Rd Pamplona Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4450848,
    "lng": 120.9663106,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 440,
    "brand": "shell",
    "name": "Shell Alabang-Zapote Rd Talon Uno Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4421798,
    "lng": 120.9661118,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 441,
    "brand": "phoenix",
    "name": "Phoenix Multinational Ave Santo Niño Parañaque",
    "area": "Parañaque",
    "lat": 14.4986221,
    "lng": 120.9976398,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 442,
    "brand": "cleanfuel",
    "name": "Cleanfuel C-5 Road Extension San Dionisio Parañaque",
    "area": "Parañaque",
    "lat": 14.4917577,
    "lng": 120.9960215,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 443,
    "brand": "caltex",
    "name": "Caltex President's Ave BF Homes Parañaque",
    "area": "Parañaque",
    "lat": 14.4482867,
    "lng": 121.0291716,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 111.99,
      "unleaded": 91.88,
      "egasoline": null,
      "premium95": 99.53,
      "premium97": 103.03,
      "kerosene": 122.41
    }
  },
  {
    "id": 444,
    "brand": "petron",
    "name": "Petron C-5 Road Extension La Huerta Parañaque",
    "area": "Parañaque",
    "lat": 14.4879605,
    "lng": 120.9998169,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 445,
    "brand": "unioil",
    "name": "Unioil Alabang-Zapote Rd Pamplona Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4476119,
    "lng": 120.9625284,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 446,
    "brand": "flyingv",
    "name": "Flying V Molino Blvd Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4260546,
    "lng": 120.964446,
    "prices": {
      "diesel": 82.79,
      "unleaded": 84.54,
      "egasoline": null,
      "premium95": 88.34,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 447,
    "brand": "petron",
    "name": "Petron BF Resort Drive Talon Dos Las Piñas",
    "area": "Las Piñas",
    "lat": 14.4454889,
    "lng": 120.9941624,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 448,
    "brand": "unioil",
    "name": "Unioil UniOil - Doña Soledad Ave, Parañaque",
    "area": "Parañaque",
    "lat": 14.487061,
    "lng": 121.0270316,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 450,
    "brand": "petron",
    "name": "Petron EDSA Mandaluyong",
    "area": "Mandaluyong",
    "lat": 14.5774323,
    "lng": 121.0503417,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 451,
    "brand": "shell",
    "name": "Shell San Francisco Mandaluyong",
    "area": "Mandaluyong",
    "lat": 14.5749807,
    "lng": 121.0316883,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 453,
    "brand": "phoenix",
    "name": "Phoenix Evangelista Bangkal Makati",
    "area": "Makati",
    "lat": 14.5454453,
    "lng": 121.01109,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 454,
    "brand": "cleanfuel",
    "name": "CleanFuel Quirino Ave San Andres Manila",
    "area": "Manila",
    "lat": 14.5830686,
    "lng": 121.0015083,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 455,
    "brand": "unioil",
    "name": "Unioil Quirino Ave San Andres Manila",
    "area": "Manila",
    "lat": 14.5836847,
    "lng": 121.001835,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 456,
    "brand": "petron",
    "name": "Petron F.B. Harrison St",
    "area": "Pasay",
    "lat": 14.5366116,
    "lng": 120.9960986,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 457,
    "brand": "shell",
    "name": "Shell Domestic Road NAIA Pasay",
    "area": "Pasay",
    "lat": 14.5384849,
    "lng": 121.0061415,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 458,
    "brand": "shell",
    "name": "Shell Boni Ave Mandaluyong",
    "area": "Mandaluyong",
    "lat": 14.5817623,
    "lng": 121.0293293,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 459,
    "brand": "caltex",
    "name": "Caltex EDSA Boni Ave Mandaluyong",
    "area": "Mandaluyong",
    "lat": 14.5724255,
    "lng": 121.0468481,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 460,
    "brand": "caltex",
    "name": "Caltex Gil Puyat Leveriza Pasay",
    "area": "Pasay",
    "lat": 14.538745,
    "lng": 121.0123211,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 461,
    "brand": "ptt",
    "name": "PTT A. Arnaiz Ave",
    "area": "Pasay",
    "lat": 14.5484305,
    "lng": 121.00344,
    "prices": {
      "diesel": 125.22,
      "unleaded": 90.62,
      "egasoline": null,
      "premium95": 94.62,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 462,
    "brand": "petron",
    "name": "Petron Evangelista Pio del Pilar Makati",
    "area": "Makati",
    "lat": 14.5493212,
    "lng": 121.0104926,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 463,
    "brand": "seaoil",
    "name": "Seaoil Tejeron Sta. Ana Manila",
    "area": "Manila",
    "lat": 14.5823296,
    "lng": 121.0134421,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 464,
    "brand": "shell",
    "name": "Shell North Signal Village Taguig",
    "area": "Taguig",
    "lat": 14.5548458,
    "lng": 121.0458282,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 466,
    "brand": "petron",
    "name": "Petron Tejeron San Andres Manila",
    "area": "Manila",
    "lat": 14.5783076,
    "lng": 121.009773,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 467,
    "brand": "caltex",
    "name": "Caltex Pandacan Manila",
    "area": "Manila",
    "lat": 14.5844741,
    "lng": 121.0178144,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 468,
    "brand": "petron",
    "name": "Petron Osmeña Hwy San Andres Manila",
    "area": "Manila",
    "lat": 14.5704519,
    "lng": 121.0003172,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 469,
    "brand": "petron",
    "name": "Petron Zobel Roxas Palanan Makati",
    "area": "Makati",
    "lat": 14.5635473,
    "lng": 121.0009362,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 470,
    "brand": "petron",
    "name": "Petron Barangka Drive",
    "area": "Mandaluyong",
    "lat": 14.5735177,
    "lng": 121.0390352,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 471,
    "brand": "petron",
    "name": "Petron Gil Puyat San Isidro Makati",
    "area": "Makati",
    "lat": 14.5557674,
    "lng": 121.0036436,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 472,
    "brand": "cleanfuel",
    "name": "CleanFuel San Andres Manila",
    "area": "Manila",
    "lat": 14.5801947,
    "lng": 121.0069108,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 473,
    "brand": "total",
    "name": "TotalEnergies Total",
    "area": "Pasay",
    "lat": 14.5378564,
    "lng": 121.0062298,
    "prices": {
      "diesel": 121.92,
      "premiumDiesel": 124.61,
      "unleaded": 84.08,
      "egasoline": null,
      "premium95": 88.88,
      "premium97": 92.38,
      "kerosene": null
    }
  },
  {
    "id": 474,
    "brand": "shell",
    "name": "Shell Quirino Ave Paco Manila",
    "area": "Manila",
    "lat": 14.5833896,
    "lng": 121.0017938,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 475,
    "brand": "caltex",
    "name": "Caltex Osmeña Hwy Sta. Ana Manila",
    "area": "Manila",
    "lat": 14.5661737,
    "lng": 121.00264,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 476,
    "brand": "petron",
    "name": "Petron Boni Ave",
    "area": "Mandaluyong",
    "lat": 14.5764516,
    "lng": 121.0346999,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 477,
    "brand": "seaoil",
    "name": "Seaoil Osmeña Hwy San Andres Manila",
    "area": "Manila",
    "lat": 14.5725025,
    "lng": 121.0019753,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 478,
    "brand": "shell",
    "name": "Shell Quirino Ave San Andres Manila",
    "area": "Manila",
    "lat": 14.5741589,
    "lng": 120.995029,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 479,
    "brand": "total",
    "name": "TotalEnergies San Andres Manila",
    "area": "Manila",
    "lat": 14.5802367,
    "lng": 121.0070985,
    "prices": {
      "diesel": 121.92,
      "premiumDiesel": 124.61,
      "unleaded": 84.08,
      "egasoline": null,
      "premium95": 88.88,
      "premium97": 92.38,
      "kerosene": null
    }
  },
  {
    "id": 480,
    "brand": "cleanfuel",
    "name": "CleanFuel Cleanfuel Auto LPG",
    "area": "Mandaluyong",
    "lat": 14.5710532,
    "lng": 121.0517591,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 481,
    "brand": "shell",
    "name": "Shell Taft Avenue Pasay",
    "area": "Pasay",
    "lat": 14.5430078,
    "lng": 120.999504,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 482,
    "brand": "caltex",
    "name": "Caltex EDSA Pasay Rotonda",
    "area": "Pasay",
    "lat": 14.5406754,
    "lng": 121.0003975,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 483,
    "brand": "caltex",
    "name": "Caltex Tejeron San Andres Manila",
    "area": "Manila",
    "lat": 14.5791754,
    "lng": 121.0021908,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 484,
    "brand": "shell",
    "name": "Shell Addition Hills Mandaluyong",
    "area": "Mandaluyong",
    "lat": 14.5843695,
    "lng": 121.045024,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 485,
    "brand": "petron",
    "name": "Petron EDSA Pasay",
    "area": "Pasay",
    "lat": 14.5388442,
    "lng": 121.0089699,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 486,
    "brand": "caltex",
    "name": "Caltex BGC",
    "area": "Taguig",
    "lat": 14.555301,
    "lng": 121.0461238,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 487,
    "brand": "seaoil",
    "name": "Seaoil SEAOIL - Pedro Gil",
    "area": "Manila",
    "lat": 14.5786372,
    "lng": 120.9972833,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 488,
    "brand": "seaoil",
    "name": "Seaoil SEAOIL - JP Rizal Makati",
    "area": "Makati",
    "lat": 14.5714896,
    "lng": 121.0165989,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 489,
    "brand": "petron",
    "name": "Petron Roosevelt Ave",
    "area": "Quezon City",
    "lat": 14.6317714,
    "lng": 121.0093253,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 490,
    "brand": "caltex",
    "name": "Caltex EDSA Balintawak",
    "area": "Caloocan",
    "lat": 14.6358216,
    "lng": 121.00903,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 491,
    "brand": "flyingv",
    "name": "Flying V Commonwealth Ave",
    "area": "Quezon City",
    "lat": 14.7097406,
    "lng": 121.0622348,
    "prices": {
      "diesel": 82.79,
      "unleaded": 84.54,
      "egasoline": null,
      "premium95": 88.34,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 492,
    "brand": "caltex",
    "name": "Caltex Monumento",
    "area": "Caloocan",
    "lat": 14.6345174,
    "lng": 120.9971924,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 493,
    "brand": "cleanfuel",
    "name": "Cleanfuel Tomas Morato Ave",
    "area": "Quezon City",
    "lat": 14.6342894,
    "lng": 121.0369611,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 494,
    "brand": "petron",
    "name": "Petron Camarin Rd",
    "area": "Caloocan",
    "lat": 14.7396518,
    "lng": 121.0322759,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 496,
    "brand": "caltex",
    "name": "Caltex Dahlia Ave Fairview",
    "area": "Quezon City",
    "lat": 14.6996223,
    "lng": 121.0646957,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 111.99,
      "unleaded": 91.88,
      "egasoline": null,
      "premium95": 99.53,
      "premium97": 103.03,
      "kerosene": 122.41
    }
  },
  {
    "id": 497,
    "brand": "caltex",
    "name": "Caltex Landers Fairview",
    "area": "Quezon City",
    "lat": 14.7332812,
    "lng": 121.0554014,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 499,
    "brand": "flyingv",
    "name": "Flying V EDSA Cubao",
    "area": "Quezon City",
    "lat": 14.6534877,
    "lng": 121.0519341,
    "prices": {
      "diesel": 82.79,
      "unleaded": 84.54,
      "egasoline": null,
      "premium95": 88.34,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 500,
    "brand": "caltex",
    "name": "Caltex Caloocan",
    "area": "Caloocan",
    "lat": 14.65796,
    "lng": 121.0050104,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 501,
    "brand": "flyingv",
    "name": "Flying V West Service Rd",
    "area": "Valenzuela",
    "lat": 14.7037336,
    "lng": 120.9949309,
    "prices": {
      "diesel": 82.79,
      "unleaded": 84.54,
      "egasoline": null,
      "premium95": 88.34,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 502,
    "brand": "phoenix",
    "name": "Phoenix NLEX Canumay Valenzuela",
    "area": "Valenzuela",
    "lat": 14.7191027,
    "lng": 120.9865357,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 503,
    "brand": "seaoil",
    "name": "Seaoil Quezon Ave",
    "area": "Quezon City",
    "lat": 14.6403649,
    "lng": 121.0394432,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 504,
    "brand": "shell",
    "name": "Shell Quezon Ave",
    "area": "Quezon City",
    "lat": 14.633662,
    "lng": 121.0397246,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 505,
    "brand": "shell",
    "name": "Shell EDSA Cubao",
    "area": "Quezon City",
    "lat": 14.662061,
    "lng": 121.0444754,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 506,
    "brand": "shell",
    "name": "Shell Quezon Ave",
    "area": "Quezon City",
    "lat": 14.6373785,
    "lng": 121.0414193,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 507,
    "brand": "shell",
    "name": "Shell Mindanao Ave",
    "area": "Quezon City",
    "lat": 14.6481592,
    "lng": 121.0281007,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 509,
    "brand": "caltex",
    "name": "Caltex E. Rodriguez Ave",
    "area": "Quezon City",
    "lat": 14.6342382,
    "lng": 121.0586364,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 510,
    "brand": "caltex",
    "name": "Caltex Commonwealth Ave Fairview",
    "area": "Quezon City",
    "lat": 14.7157497,
    "lng": 121.056372,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 511,
    "brand": "shell",
    "name": "Shell MH Del Pilar Maysilo Malabon",
    "area": "Malabon",
    "lat": 14.6834167,
    "lng": 120.9592794,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 512,
    "brand": "total",
    "name": "TotalEnergies Total",
    "area": "Malabon",
    "lat": 14.6815688,
    "lng": 120.9598692,
    "prices": {
      "diesel": 121.92,
      "premiumDiesel": 124.61,
      "unleaded": 84.08,
      "egasoline": null,
      "premium95": 88.88,
      "premium97": 92.38,
      "kerosene": null
    }
  },
  {
    "id": 513,
    "brand": "petron",
    "name": "Petron Maysan Rd",
    "area": "Valenzuela",
    "lat": 14.6989573,
    "lng": 120.9786563,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 514,
    "brand": "shell",
    "name": "Shell MacArthur Highway Valenzuela",
    "area": "Valenzuela",
    "lat": 14.6869823,
    "lng": 120.9759835,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 515,
    "brand": "unioil",
    "name": "Unioil Mindanao Ave",
    "area": "Quezon City",
    "lat": 14.6659712,
    "lng": 121.0322082,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 516,
    "brand": "shell",
    "name": "Shell Kalayaan Avenue",
    "area": "Quezon City",
    "lat": 14.641653,
    "lng": 121.0549224,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 517,
    "brand": "shell",
    "name": "Shell Quirino Hwy",
    "area": "Quezon City",
    "lat": 14.7311365,
    "lng": 121.0362655,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 518,
    "brand": "petron",
    "name": "Petron M.H. del Pilar St Valenzuela",
    "area": "Valenzuela",
    "lat": 14.6959102,
    "lng": 120.9540442,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 519,
    "brand": "flyingv",
    "name": "Flying V Caloocan",
    "area": "Caloocan",
    "lat": 14.6644958,
    "lng": 121.0036161,
    "prices": {
      "diesel": 82.79,
      "unleaded": 84.54,
      "egasoline": null,
      "premium95": 88.34,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 520,
    "brand": "petron",
    "name": "Petron Mindanao Ave",
    "area": "Quezon City",
    "lat": 14.6841862,
    "lng": 121.0315884,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 521,
    "brand": "petron",
    "name": "Petron Tandang Sora Ave",
    "area": "Quezon City",
    "lat": 14.6769446,
    "lng": 121.0331853,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 522,
    "brand": "shell",
    "name": "Shell Tandang Sora Ave",
    "area": "Quezon City",
    "lat": 14.6849817,
    "lng": 121.0322161,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 523,
    "brand": "flyingv",
    "name": "Flying V Mindanao Ave",
    "area": "Quezon City",
    "lat": 14.6832531,
    "lng": 121.0316844,
    "prices": {
      "diesel": 82.79,
      "unleaded": 84.54,
      "egasoline": null,
      "premium95": 88.34,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 524,
    "brand": "petron",
    "name": "Petron Congressional Ave",
    "area": "Quezon City",
    "lat": 14.6960986,
    "lng": 121.0318454,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 525,
    "brand": "petron",
    "name": "Petron Mindanao Ave",
    "area": "Quezon City",
    "lat": 14.6657303,
    "lng": 121.0299349,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 527,
    "brand": "petron",
    "name": "Petron MacArthur Hwy Malabon",
    "area": "Malabon",
    "lat": 14.6624419,
    "lng": 120.9843149,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 528,
    "brand": "petron",
    "name": "Petron Caloocan",
    "area": "Caloocan",
    "lat": 14.6471704,
    "lng": 120.9954984,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 529,
    "brand": "petron",
    "name": "Petron A. de Jesus St",
    "area": "Caloocan",
    "lat": 14.6563778,
    "lng": 120.9906326,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 530,
    "brand": "petron",
    "name": "Petron C-4 Road",
    "area": "Malabon",
    "lat": 14.657197,
    "lng": 120.9599658,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 531,
    "brand": "shell",
    "name": "Shell MacArthur Highway Malabon",
    "area": "Malabon",
    "lat": 14.6558813,
    "lng": 120.9588567,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 532,
    "brand": "caltex",
    "name": "Caltex MH Del Pilar Tugatog Malabon",
    "area": "Malabon",
    "lat": 14.6678156,
    "lng": 120.9656104,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 533,
    "brand": "petron",
    "name": "Petron Gov. Pascual Ave East",
    "area": "Malabon",
    "lat": 14.669024,
    "lng": 120.9755191,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 535,
    "brand": "shell",
    "name": "Shell EDSA Kamuning",
    "area": "Quezon City",
    "lat": 14.6346121,
    "lng": 121.0211877,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 536,
    "brand": "caltex",
    "name": "Caltex EDSA Balintawak",
    "area": "Caloocan",
    "lat": 14.6397404,
    "lng": 121.0100175,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 537,
    "brand": "petron",
    "name": "Petron Radial Rd 10 Tondo Manila",
    "area": "Manila",
    "lat": 14.6378399,
    "lng": 120.9934546,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 538,
    "brand": "cleanfuel",
    "name": "CleanFuel Clean Fuel",
    "area": "Caloocan",
    "lat": 14.6447286,
    "lng": 120.9709869,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 539,
    "brand": "unioil",
    "name": "Unioil Aurora Blvd",
    "area": "Quezon City",
    "lat": 14.641973,
    "lng": 121.0548484,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 540,
    "brand": "petron",
    "name": "Petron Commonwealth Ave Batasan",
    "area": "Quezon City",
    "lat": 14.7085832,
    "lng": 121.0622745,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 541,
    "brand": "caltex",
    "name": "Caltex Commonwealth Ave Fairview",
    "area": "Quezon City",
    "lat": 14.6939657,
    "lng": 121.0554264,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 542,
    "brand": "caltex",
    "name": "Caltex Tandang Sora Ave",
    "area": "Quezon City",
    "lat": 14.6867949,
    "lng": 121.031239,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 543,
    "brand": "shell",
    "name": "Shell T. Santiago Valenzuela",
    "area": "Valenzuela",
    "lat": 14.7126224,
    "lng": 120.9678878,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 544,
    "brand": "flyingv",
    "name": "Flying V MacArthur Hwy South",
    "area": "Valenzuela",
    "lat": 14.6930403,
    "lng": 120.9683634,
    "prices": {
      "diesel": 82.79,
      "unleaded": 84.54,
      "egasoline": null,
      "premium95": 88.34,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 545,
    "brand": "seaoil",
    "name": "Seaoil M.H. del Pilar St",
    "area": "Valenzuela",
    "lat": 14.7016665,
    "lng": 120.9501793,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 546,
    "brand": "petron",
    "name": "Petron Rizal Ave Ext",
    "area": "Navotas",
    "lat": 14.6596799,
    "lng": 120.9517407,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 548,
    "brand": "petron",
    "name": "Petron Gen. San Miguel St",
    "area": "Caloocan",
    "lat": 14.6585713,
    "lng": 120.9688962,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 549,
    "brand": "seaoil",
    "name": "Seaoil A. Mabini St",
    "area": "Caloocan",
    "lat": 14.656066,
    "lng": 120.9715644,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 550,
    "brand": "petron",
    "name": "Petron MacArthur Hwy North",
    "area": "Valenzuela",
    "lat": 14.692427,
    "lng": 120.9643494,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 552,
    "brand": "phoenix",
    "name": "Phoenix Paso de Blas Rd Valenzuela",
    "area": "Valenzuela",
    "lat": 14.7040825,
    "lng": 120.9866885,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 554,
    "brand": "caltex",
    "name": "Caltex T. Santiago Valenzuela",
    "area": "Valenzuela",
    "lat": 14.7153157,
    "lng": 120.973846,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 556,
    "brand": "petron",
    "name": "Petron Juan Luna Tondo Manila",
    "area": "Manila",
    "lat": 14.6312249,
    "lng": 120.9638067,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 557,
    "brand": "shell",
    "name": "Shell Moriones Tondo Manila",
    "area": "Manila",
    "lat": 14.6324551,
    "lng": 120.963723,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 558,
    "brand": "seaoil",
    "name": "Seaoil Juan Luna Tondo Manila",
    "area": "Manila",
    "lat": 14.6312389,
    "lng": 120.9641784,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 560,
    "brand": "caltex",
    "name": "Caltex Caloocan",
    "area": "Caloocan",
    "lat": 14.6525919,
    "lng": 120.9972611,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 561,
    "brand": "petron",
    "name": "Petron Bonny Serrano St",
    "area": "Caloocan",
    "lat": 14.6529616,
    "lng": 120.9880379,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 562,
    "brand": "caltex",
    "name": "Caltex Gov. Pascual Tinajeros Malabon",
    "area": "Malabon",
    "lat": 14.6705725,
    "lng": 120.9720884,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 565,
    "brand": "shell",
    "name": "Shell Gen. Luis St",
    "area": "Quezon City",
    "lat": 14.7216219,
    "lng": 121.0349998,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 566,
    "brand": "phoenix",
    "name": "Phoenix Gen. Luis St",
    "area": "Quezon City",
    "lat": 14.7216833,
    "lng": 121.035392,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 567,
    "brand": "petron",
    "name": "Petron Aurora Blvd",
    "area": "Quezon City",
    "lat": 14.6369408,
    "lng": 121.045691,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 568,
    "brand": "shell",
    "name": "Shell Caloocan",
    "area": "Caloocan",
    "lat": 14.6686741,
    "lng": 121.0088207,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 569,
    "brand": "unioil",
    "name": "Unioil Bonny Serrano St",
    "area": "Caloocan",
    "lat": 14.6543348,
    "lng": 120.9884414,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 570,
    "brand": "phoenix",
    "name": "Phoenix Congressional Ave",
    "area": "Quezon City",
    "lat": 14.6477433,
    "lng": 121.0172994,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 571,
    "brand": "cleanfuel",
    "name": "Cleanfuel Congressional Ave",
    "area": "Quezon City",
    "lat": 14.6598623,
    "lng": 121.0201253,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 572,
    "brand": "petron",
    "name": "Petron Gen. T. de Leon Rd",
    "area": "Valenzuela",
    "lat": 14.6846141,
    "lng": 120.9881198,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 573,
    "brand": "shell",
    "name": "Shell Gen. T. de Leon Valenzuela",
    "area": "Valenzuela",
    "lat": 14.686497,
    "lng": 120.995528,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 574,
    "brand": "shell",
    "name": "Shell Quirino Hwy",
    "area": "Quezon City",
    "lat": 14.7127901,
    "lng": 121.0397442,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 575,
    "brand": "seaoil",
    "name": "Seaoil Quirino Hwy",
    "area": "Quezon City",
    "lat": 14.7086207,
    "lng": 121.0388846,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 576,
    "brand": "ptt",
    "name": "PTT EDSA Kamuning",
    "area": "Quezon City",
    "lat": 14.641048,
    "lng": 121.0167221,
    "prices": {
      "diesel": 90.01,
      "unleaded": 82.99,
      "egasoline": null,
      "premium95": 86.99,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 577,
    "brand": "shell",
    "name": "Shell Congressional Ave",
    "area": "Quezon City",
    "lat": 14.6565559,
    "lng": 121.0242916,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 578,
    "brand": "phoenix",
    "name": "Phoenix EDSA Balintawak",
    "area": "Quezon City",
    "lat": 14.6309027,
    "lng": 121.0113256,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 579,
    "brand": "shell",
    "name": "Shell EDSA Balintawak",
    "area": "Quezon City",
    "lat": 14.6305993,
    "lng": 121.0105047,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 581,
    "brand": "seaoil",
    "name": "Seaoil EDSA Balintawak",
    "area": "Quezon City",
    "lat": 14.6397539,
    "lng": 121.0132411,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 582,
    "brand": "total",
    "name": "Total EDSA",
    "area": "Quezon City",
    "lat": 14.6654498,
    "lng": 121.0431126,
    "prices": {
      "diesel": 94.14,
      "premiumDiesel": 87.57,
      "unleaded": 83.28,
      "egasoline": null,
      "premium95": 88.08,
      "premium97": 91.58,
      "kerosene": null
    }
  },
  {
    "id": 583,
    "brand": "ptt",
    "name": "PTT Congressional Ave",
    "area": "Quezon City",
    "lat": 14.6567552,
    "lng": 121.0230471,
    "prices": {
      "diesel": 90.01,
      "unleaded": 82.99,
      "egasoline": null,
      "premium95": 86.99,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 584,
    "brand": "shell",
    "name": "Shell EDSA",
    "area": "Quezon City",
    "lat": 14.644367,
    "lng": 121.0172108,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 585,
    "brand": "shell",
    "name": "Shell EDSA Balintawak",
    "area": "Quezon City",
    "lat": 14.6395117,
    "lng": 121.0114927,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 586,
    "brand": "petron",
    "name": "Petron EDSA Balintawak",
    "area": "Quezon City",
    "lat": 14.6405323,
    "lng": 121.0162159,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 587,
    "brand": "unioil",
    "name": "Unioil Congressional Ave",
    "area": "Quezon City",
    "lat": 14.656274,
    "lng": 121.0251423,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 588,
    "brand": "caltex",
    "name": "Caltex Congressional Ave",
    "area": "Quezon City",
    "lat": 14.6607136,
    "lng": 121.0202296,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 589,
    "brand": "shell",
    "name": "Shell Congressional Ave",
    "area": "Quezon City",
    "lat": 14.6608899,
    "lng": 121.0197473,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 591,
    "brand": "petron",
    "name": "Petron E. Rodriguez Ave",
    "area": "Quezon City",
    "lat": 14.6358072,
    "lng": 121.0647117,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 592,
    "brand": "petron",
    "name": "Petron EDSA",
    "area": "Quezon City",
    "lat": 14.662224,
    "lng": 121.05476,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 593,
    "brand": "petron",
    "name": "Petron EDSA",
    "area": "Quezon City",
    "lat": 14.6550126,
    "lng": 121.0538428,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 594,
    "brand": "shell",
    "name": "Shell Aurora Blvd Cubao",
    "area": "Quezon City",
    "lat": 14.6336013,
    "lng": 121.0564117,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 595,
    "brand": "unioil",
    "name": "Unioil EDSA",
    "area": "Quezon City",
    "lat": 14.6726088,
    "lng": 121.0472623,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 596,
    "brand": "seaoil",
    "name": "Seaoil EDSA",
    "area": "Quezon City",
    "lat": 14.6720646,
    "lng": 121.0500993,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 597,
    "brand": "phoenix",
    "name": "Phoenix Visayas Ave",
    "area": "Quezon City",
    "lat": 14.6719323,
    "lng": 121.0444922,
    "prices": {
      "diesel": 86.94,
      "unleaded": 81.15,
      "egasoline": 81.85,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 598,
    "brand": "shell",
    "name": "Shell Katipunan Ave",
    "area": "Quezon City",
    "lat": 14.6726273,
    "lng": 121.063883,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 599,
    "brand": "petron",
    "name": "Petron EDSA Cubao",
    "area": "Quezon City",
    "lat": 14.6573499,
    "lng": 121.0452254,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 600,
    "brand": "shell",
    "name": "Shell EDSA Balintawak",
    "area": "Caloocan",
    "lat": 14.6579046,
    "lng": 121.0078827,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 601,
    "brand": "ptt",
    "name": "PTT EDSA Balintawak",
    "area": "Caloocan",
    "lat": 14.668179,
    "lng": 121.0082711,
    "prices": {
      "diesel": 90.01,
      "unleaded": 82.99,
      "egasoline": null,
      "premium95": 86.99,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 602,
    "brand": "petron",
    "name": "Petron MacArthur Hwy South",
    "area": "Valenzuela",
    "lat": 14.6783444,
    "lng": 120.9801691,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 603,
    "brand": "shell",
    "name": "Shell Gov. Pascual Concepcion Malabon",
    "area": "Malabon",
    "lat": 14.6694284,
    "lng": 120.975185,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 604,
    "brand": "shell",
    "name": "Shell Congressional Ave",
    "area": "Quezon City",
    "lat": 14.6572306,
    "lng": 121.0161973,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 605,
    "brand": "shell",
    "name": "Shell MacArthur Highway",
    "area": "Malabon",
    "lat": 14.6698518,
    "lng": 120.981831,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 606,
    "brand": "petron",
    "name": "Petron Commonwealth Ave Batasan",
    "area": "Quezon City",
    "lat": 14.6993251,
    "lng": 121.0628756,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 608,
    "brand": "caltex",
    "name": "Caltex Mindanao Ave",
    "area": "Quezon City",
    "lat": 14.6539069,
    "lng": 121.0293832,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 609,
    "brand": "petron",
    "name": "Petron Gov. Pascual Ave West",
    "area": "Malabon",
    "lat": 14.6707835,
    "lng": 120.9539528,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 610,
    "brand": "phoenix",
    "name": "Phoenix MacArthur Highway Potrero Malabon",
    "area": "Malabon",
    "lat": 14.6718447,
    "lng": 120.9641684,
    "prices": {
      "diesel": 86.94,
      "unleaded": 81.15,
      "egasoline": 81.85,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 611,
    "brand": "phoenix",
    "name": "Phoenix Caloocan",
    "area": "Caloocan",
    "lat": 14.7491511,
    "lng": 121.0371368,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 612,
    "brand": "shell",
    "name": "Shell Caloocan",
    "area": "Caloocan",
    "lat": 14.7397854,
    "lng": 121.0260203,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 613,
    "brand": "shell",
    "name": "Shell Regalado Ave",
    "area": "Quezon City",
    "lat": 14.7352193,
    "lng": 121.0641459,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 614,
    "brand": "petron",
    "name": "Petron Regalado Ave",
    "area": "Quezon City",
    "lat": 14.7311235,
    "lng": 121.0613955,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 615,
    "brand": "unioil",
    "name": "Unioil Regalado Ave",
    "area": "Quezon City",
    "lat": 14.7248668,
    "lng": 121.0614427,
    "prices": {
      "diesel": 101.26,
      "unleaded": 86.66,
      "egasoline": 87.36,
      "premium95": 92.66,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 616,
    "brand": "shell",
    "name": "Shell Regalado Ave",
    "area": "Quezon City",
    "lat": 14.7255091,
    "lng": 121.0614756,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 105.44,
      "unleaded": 90.23,
      "egasoline": null,
      "premium95": 97.13,
      "premium97": 100.58,
      "kerosene": 126.81
    }
  },
  {
    "id": 617,
    "brand": "caltex",
    "name": "Caltex Regalado Ave",
    "area": "Quezon City",
    "lat": 14.7294028,
    "lng": 121.0563391,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 618,
    "brand": "phoenix",
    "name": "Phoenix MacArthur Hwy Dalandanan Valenzuela",
    "area": "Valenzuela",
    "lat": 14.7151366,
    "lng": 120.9522201,
    "prices": {
      "diesel": 86.94,
      "unleaded": 81.15,
      "egasoline": 81.85,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 620,
    "brand": "ptt",
    "name": "PTT Quirino Hwy",
    "area": "Quezon City",
    "lat": 14.7061469,
    "lng": 121.0386564,
    "prices": {
      "diesel": 90.01,
      "unleaded": 82.99,
      "egasoline": null,
      "premium95": 86.99,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 621,
    "brand": "petron",
    "name": "Petron Commonwealth Ave Fairview",
    "area": "Quezon City",
    "lat": 14.7188215,
    "lng": 121.0538221,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 622,
    "brand": "flyingv",
    "name": "Flying V Quirino Hwy",
    "area": "Quezon City",
    "lat": 14.7329653,
    "lng": 121.0502221,
    "prices": {
      "diesel": 82.79,
      "unleaded": 84.54,
      "egasoline": null,
      "premium95": 88.34,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 623,
    "brand": "shell",
    "name": "Shell Commonwealth Ave Batasan",
    "area": "Quezon City",
    "lat": 14.7096577,
    "lng": 121.0614385,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 624,
    "brand": "shell",
    "name": "Shell Dahlia Ave Fairview",
    "area": "Quezon City",
    "lat": 14.6994936,
    "lng": 121.0643777,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 627,
    "brand": "phoenix",
    "name": "Phoenix MacArthur Highway",
    "area": "Malabon",
    "lat": 14.6640608,
    "lng": 120.9839965,
    "prices": {
      "diesel": 86.94,
      "unleaded": 81.15,
      "egasoline": 81.85,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 628,
    "brand": "cleanfuel",
    "name": "CleanFuel Clean Fuel",
    "area": "Malabon",
    "lat": 14.679584,
    "lng": 120.9611873,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 630,
    "brand": "phoenix",
    "name": "Phoenix MacArthur Hwy Paltok Valenzuela",
    "area": "Valenzuela",
    "lat": 14.7134957,
    "lng": 120.9582391,
    "prices": {
      "diesel": 86.94,
      "unleaded": 81.15,
      "egasoline": 81.85,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 631,
    "brand": "shell",
    "name": "Shell Quezon Ave",
    "area": "Quezon City",
    "lat": 14.6356815,
    "lng": 121.0330899,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 632,
    "brand": "phoenix",
    "name": "Phoenix Quezon Ave",
    "area": "Quezon City",
    "lat": 14.6357782,
    "lng": 121.0322569,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 633,
    "brand": "ptt",
    "name": "PTT Que Grande Rd",
    "area": "Valenzuela",
    "lat": 14.6939925,
    "lng": 121.0094429,
    "prices": {
      "diesel": 90.01,
      "unleaded": 82.99,
      "egasoline": null,
      "premium95": 86.99,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 634,
    "brand": "cleanfuel",
    "name": "Cleanfuel Aurora Blvd",
    "area": "Quezon City",
    "lat": 14.6373423,
    "lng": 121.0485907,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 635,
    "brand": "petron",
    "name": "Petron Aurora Blvd",
    "area": "Quezon City",
    "lat": 14.6366751,
    "lng": 121.0530395,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 636,
    "brand": "unioil",
    "name": "Unioil Aurora Blvd",
    "area": "Quezon City",
    "lat": 14.6375675,
    "lng": 121.0492006,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 637,
    "brand": "shell",
    "name": "Shell MacArthur Dalandanan Valenzuela",
    "area": "Valenzuela",
    "lat": 14.7107218,
    "lng": 120.9597103,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 638,
    "brand": "petron",
    "name": "Petron Visayas Ave",
    "area": "Quezon City",
    "lat": 14.6708649,
    "lng": 121.039575,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 643,
    "brand": "petron",
    "name": "Petron Juan Luna Tondo Manila",
    "area": "Manila",
    "lat": 14.6307464,
    "lng": 120.9587804,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 644,
    "brand": "unioil",
    "name": "Unioil Caloocan",
    "area": "Caloocan",
    "lat": 14.6405655,
    "lng": 120.9920247,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 645,
    "brand": "shell",
    "name": "Shell Commonwealth Ave Fairview",
    "area": "Quezon City",
    "lat": 14.7189804,
    "lng": 121.0544095,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 646,
    "brand": "petron",
    "name": "Petron Commonwealth Ave Fairview",
    "area": "Quezon City",
    "lat": 14.7148494,
    "lng": 121.0610217,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 647,
    "brand": "cleanfuel",
    "name": "Cleanfuel Katipunan Ave",
    "area": "Quezon City",
    "lat": 14.6732128,
    "lng": 121.0569373,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 648,
    "brand": "shell",
    "name": "Shell EDSA Balara",
    "area": "Quezon City",
    "lat": 14.6736038,
    "lng": 121.0525846,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 649,
    "brand": "seaoil",
    "name": "Seaoil EDSA Balara",
    "area": "Quezon City",
    "lat": 14.6740978,
    "lng": 121.052856,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 650,
    "brand": "cleanfuel",
    "name": "Cleanfuel Commonwealth Ave",
    "area": "Quezon City",
    "lat": 14.6952167,
    "lng": 121.0523842,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 651,
    "brand": "petron",
    "name": "Petron Congressional Ave",
    "area": "Quezon City",
    "lat": 14.64243,
    "lng": 121.026782,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 652,
    "brand": "ptt",
    "name": "PTT Regalado Ave",
    "area": "Quezon City",
    "lat": 14.7327662,
    "lng": 121.0554139,
    "prices": {
      "diesel": 90.01,
      "unleaded": 82.99,
      "egasoline": null,
      "premium95": 86.99,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 653,
    "brand": "shell",
    "name": "Shell Regalado Ave",
    "area": "Quezon City",
    "lat": 14.7323903,
    "lng": 121.0553012,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 654,
    "brand": "total",
    "name": "Total Regalado Ave",
    "area": "Quezon City",
    "lat": 14.7339804,
    "lng": 121.052947,
    "prices": {
      "diesel": 94.14,
      "premiumDiesel": 87.57,
      "unleaded": 83.28,
      "egasoline": null,
      "premium95": 88.08,
      "premium97": 91.58,
      "kerosene": null
    }
  },
  {
    "id": 655,
    "brand": "seaoil",
    "name": "Seaoil Regalado Ave",
    "area": "Quezon City",
    "lat": 14.7334357,
    "lng": 121.0528196,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 656,
    "brand": "caltex",
    "name": "Caltex Commonwealth Ave Fairview",
    "area": "Quezon City",
    "lat": 14.7194302,
    "lng": 121.0613993,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 657,
    "brand": "petron",
    "name": "Petron Aurora Blvd",
    "area": "Quezon City",
    "lat": 14.6446306,
    "lng": 121.0533285,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 658,
    "brand": "cleanfuel",
    "name": "Cleanfuel Congressional Ave",
    "area": "Quezon City",
    "lat": 14.647005,
    "lng": 121.0231893,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 659,
    "brand": "flyingv",
    "name": "Flying V Quirino Hwy",
    "area": "Quezon City",
    "lat": 14.7025519,
    "lng": 121.0435086,
    "prices": {
      "diesel": 82.79,
      "unleaded": 84.54,
      "egasoline": null,
      "premium95": 88.34,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 660,
    "brand": "petron",
    "name": "Petron Gen. Luis St",
    "area": "Quezon City",
    "lat": 14.7219789,
    "lng": 121.0344327,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 661,
    "brand": "petron",
    "name": "Petron Quezon Ave",
    "area": "Quezon City",
    "lat": 14.6376626,
    "lng": 121.0413195,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 662,
    "brand": "ptt",
    "name": "PTT Station",
    "area": "Caloocan",
    "lat": 14.7278355,
    "lng": 121.0221371,
    "prices": {
      "diesel": 90.01,
      "unleaded": 82.99,
      "egasoline": null,
      "premium95": 86.99,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 663,
    "brand": "unioil",
    "name": "Unioil Mindanao Ave",
    "area": "Valenzuela",
    "lat": 14.6921088,
    "lng": 121.0232159,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 664,
    "brand": "phoenix",
    "name": "Phoenix Mindanao Ave",
    "area": "Quezon City",
    "lat": 14.6922888,
    "lng": 121.0228408,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 665,
    "brand": "caltex",
    "name": "Caltex Visayas Ave",
    "area": "Quezon City",
    "lat": 14.6754304,
    "lng": 121.0452036,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 666,
    "brand": "total",
    "name": "TotalEnergies Total",
    "area": "Caloocan",
    "lat": 14.7335914,
    "lng": 121.0480468,
    "prices": {
      "diesel": 94.14,
      "premiumDiesel": 87.57,
      "unleaded": 83.28,
      "egasoline": null,
      "premium95": 88.08,
      "premium97": 91.58,
      "kerosene": null
    }
  },
  {
    "id": 667,
    "brand": "unioil",
    "name": "Unioil Mindanao Ave",
    "area": "Quezon City",
    "lat": 14.686085,
    "lng": 121.0314133,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 668,
    "brand": "unioil",
    "name": "Unioil Katipunan Ave",
    "area": "Quezon City",
    "lat": 14.6724992,
    "lng": 121.064818,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 669,
    "brand": "unioil",
    "name": "Unioil Quirino Hwy",
    "area": "Quezon City",
    "lat": 14.7332247,
    "lng": 121.0485487,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 670,
    "brand": "caltex",
    "name": "Caltex Landers Balintawak",
    "area": "Caloocan",
    "lat": 14.6579188,
    "lng": 121.0119026,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 671,
    "brand": "shell",
    "name": "Shell Caloocan",
    "area": "Caloocan",
    "lat": 14.6451391,
    "lng": 121.0039779,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 672,
    "brand": "flyingv",
    "name": "Flying V Quirino Hwy",
    "area": "Quezon City",
    "lat": 14.7341815,
    "lng": 121.0344092,
    "prices": {
      "diesel": 82.79,
      "unleaded": 84.54,
      "egasoline": null,
      "premium95": 88.34,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 673,
    "brand": "shell",
    "name": "Shell Mindanao Ave",
    "area": "Quezon City",
    "lat": 14.6925219,
    "lng": 121.0267881,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 674,
    "brand": "phoenix",
    "name": "Phoenix Mindanao Ave",
    "area": "Quezon City",
    "lat": 14.669359,
    "lng": 121.0331928,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 675,
    "brand": "shell",
    "name": "Shell Mindanao Ave",
    "area": "Quezon City",
    "lat": 14.6939153,
    "lng": 121.0309829,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 677,
    "brand": "total",
    "name": "Total Aurora Blvd",
    "area": "Quezon City",
    "lat": 14.6377357,
    "lng": 121.0550899,
    "prices": {
      "diesel": 94.14,
      "premiumDiesel": 87.57,
      "unleaded": 83.28,
      "egasoline": null,
      "premium95": 88.08,
      "premium97": 91.58,
      "kerosene": null
    }
  },
  {
    "id": 678,
    "brand": "shell",
    "name": "Shell Visayas Ave",
    "area": "Quezon City",
    "lat": 14.6944191,
    "lng": 121.04372,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 679,
    "brand": "phoenix",
    "name": "Phoenix Gen. T. de Leon Valenzuela",
    "area": "Valenzuela",
    "lat": 14.6849135,
    "lng": 120.9880575,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 682,
    "brand": "shell",
    "name": "Shell Aurora Blvd",
    "area": "Quezon City",
    "lat": 14.6458648,
    "lng": 121.0525999,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 684,
    "brand": "total",
    "name": "TotalEnergies Total",
    "area": "Caloocan",
    "lat": 14.7588245,
    "lng": 121.0518979,
    "prices": {
      "diesel": 94.14,
      "premiumDiesel": 87.57,
      "unleaded": 83.28,
      "egasoline": null,
      "premium95": 88.08,
      "premium97": 91.58,
      "kerosene": null
    }
  },
  {
    "id": 685,
    "brand": "petron",
    "name": "Petron Aurora Blvd",
    "area": "Quezon City",
    "lat": 14.6334296,
    "lng": 121.0545391,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 686,
    "brand": "shell",
    "name": "Shell Aurora Blvd",
    "area": "Quezon City",
    "lat": 14.6371117,
    "lng": 121.0513607,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 687,
    "brand": "total",
    "name": "TotalEnergies Total",
    "area": "Valenzuela",
    "lat": 14.7179388,
    "lng": 120.9570059,
    "prices": {
      "diesel": 121.92,
      "premiumDiesel": 124.61,
      "unleaded": 84.08,
      "egasoline": null,
      "premium95": 88.88,
      "premium97": 92.38,
      "kerosene": null
    }
  },
  {
    "id": 689,
    "brand": "petron",
    "name": "Petron Quezon Ave",
    "area": "Quezon City",
    "lat": 14.6606572,
    "lng": 121.0361469,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 690,
    "brand": "shell",
    "name": "Shell Quezon Ave",
    "area": "Quezon City",
    "lat": 14.6615277,
    "lng": 121.0368785,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 691,
    "brand": "total",
    "name": "Total Commonwealth Ave Batasan",
    "area": "Quezon City",
    "lat": 14.7081777,
    "lng": 121.063573,
    "prices": {
      "diesel": 94.14,
      "premiumDiesel": 87.57,
      "unleaded": 83.28,
      "egasoline": null,
      "premium95": 88.08,
      "premium97": 91.58,
      "kerosene": null
    }
  },
  {
    "id": 692,
    "brand": "petron",
    "name": "Petron Quirino Hwy",
    "area": "Quezon City",
    "lat": 14.7288717,
    "lng": 121.0419517,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 693,
    "brand": "unioil",
    "name": "Unioil Quirino Hwy",
    "area": "Quezon City",
    "lat": 14.708982,
    "lng": 121.038922,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 694,
    "brand": "shell",
    "name": "Shell MacArthur Hwy Malinta Valenzuela",
    "area": "Valenzuela",
    "lat": 14.7005985,
    "lng": 120.96224,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 695,
    "brand": "shell",
    "name": "Shell East Canumay Valenzuela",
    "area": "Valenzuela",
    "lat": 14.7109395,
    "lng": 120.9920075,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 696,
    "brand": "phoenix",
    "name": "Phoenix Congressional Ave",
    "area": "Quezon City",
    "lat": 14.656059,
    "lng": 121.0262077,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 697,
    "brand": "flyingv",
    "name": "Flying V MacArthur Hwy North",
    "area": "Valenzuela",
    "lat": 14.7226971,
    "lng": 120.9854915,
    "prices": {
      "diesel": 82.79,
      "unleaded": 84.54,
      "egasoline": null,
      "premium95": 88.34,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 698,
    "brand": "petron",
    "name": "Petron Quezon Ave",
    "area": "Quezon City",
    "lat": 14.6346376,
    "lng": 121.0349885,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 700,
    "brand": "unioil",
    "name": "Unioil Paso de Blas Rd",
    "area": "Valenzuela",
    "lat": 14.7057758,
    "lng": 120.989428,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 702,
    "brand": "seaoil",
    "name": "Seaoil MacArthur Hwy Malabon",
    "area": "Malabon",
    "lat": 14.6671453,
    "lng": 120.9832248,
    "prices": {
      "diesel": 101.64,
      "premiumDiesel": 104.33,
      "unleaded": 84.32,
      "egasoline": 85.52,
      "premium95": 89.52,
      "premium97": 92.62,
      "kerosene": 128.54
    }
  },
  {
    "id": 703,
    "brand": "petron",
    "name": "Petron Moriones Tondo Manila",
    "area": "Manila",
    "lat": 14.6345796,
    "lng": 120.9813044,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 704,
    "brand": "petron",
    "name": "Petron Moriones Tondo Manila",
    "area": "Manila",
    "lat": 14.6307187,
    "lng": 120.980353,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 705,
    "brand": "seaoil",
    "name": "Seaoil Caloocan",
    "area": "Caloocan",
    "lat": 14.6334769,
    "lng": 120.9924018,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 706,
    "brand": "shell",
    "name": "Shell Caloocan",
    "area": "Caloocan",
    "lat": 14.6347898,
    "lng": 120.9928335,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 707,
    "brand": "cleanfuel",
    "name": "Cleanfuel Mindanao Ave",
    "area": "Quezon City",
    "lat": 14.6970801,
    "lng": 121.0324636,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 708,
    "brand": "phoenix",
    "name": "Phoenix Regalado Ave",
    "area": "Quezon City",
    "lat": 14.7287937,
    "lng": 121.0562367,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 709,
    "brand": "cleanfuel",
    "name": "Cleanfuel Aurora Blvd",
    "area": "Quezon City",
    "lat": 14.6348611,
    "lng": 121.0594578,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 710,
    "brand": "cleanfuel",
    "name": "Cleanfuel Regalado Ave",
    "area": "Quezon City",
    "lat": 14.7322703,
    "lng": 121.0614799,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 711,
    "brand": "seaoil",
    "name": "Seaoil Gen. T. de Leon Rd",
    "area": "Valenzuela",
    "lat": 14.6883495,
    "lng": 120.9828274,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 712,
    "brand": "petron",
    "name": "Petron Paso de Blas Rd",
    "area": "Valenzuela",
    "lat": 14.711327,
    "lng": 120.9964649,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 713,
    "brand": "total",
    "name": "TotalEnergies Total",
    "area": "Valenzuela",
    "lat": 14.7111189,
    "lng": 120.9961904,
    "prices": {
      "diesel": 121.92,
      "premiumDiesel": 124.61,
      "unleaded": 84.08,
      "egasoline": null,
      "premium95": 88.88,
      "premium97": 92.38,
      "kerosene": null
    }
  },
  {
    "id": 714,
    "brand": "seaoil",
    "name": "Seaoil Sapang Bakaw St",
    "area": "Valenzuela",
    "lat": 14.7263607,
    "lng": 120.989322,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 715,
    "brand": "petron",
    "name": "Petron Gen. Luis St",
    "area": "Caloocan",
    "lat": 14.7198446,
    "lng": 121.0152958,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 716,
    "brand": "seaoil",
    "name": "Seaoil Gen. Luis St",
    "area": "Quezon City",
    "lat": 14.7216172,
    "lng": 121.030765,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 717,
    "brand": "unioil",
    "name": "Unioil Congressional Ave",
    "area": "Quezon City",
    "lat": 14.6449942,
    "lng": 121.0273008,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 718,
    "brand": "flyingv",
    "name": "Flying V Kabesang Porong St",
    "area": "Valenzuela",
    "lat": 14.7384824,
    "lng": 120.9894232,
    "prices": {
      "diesel": 82.79,
      "unleaded": 84.54,
      "egasoline": null,
      "premium95": 88.34,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 719,
    "brand": "seaoil",
    "name": "Seaoil Zabarte Rd",
    "area": "Caloocan",
    "lat": 14.7486154,
    "lng": 121.0449474,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 720,
    "brand": "petron",
    "name": "Petron Congressional Rd",
    "area": "Caloocan",
    "lat": 14.7578419,
    "lng": 121.0287253,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 721,
    "brand": "phoenix",
    "name": "Phoenix Caloocan",
    "area": "Caloocan",
    "lat": 14.7719188,
    "lng": 121.0444907,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 722,
    "brand": "petron",
    "name": "Petron Hulo St",
    "area": "Valenzuela",
    "lat": 14.7436612,
    "lng": 121.0034498,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 723,
    "brand": "phoenix",
    "name": "Phoenix Caloocan",
    "area": "Caloocan",
    "lat": 14.6577328,
    "lng": 120.9627688,
    "prices": {
      "diesel": 86.94,
      "unleaded": 81.15,
      "egasoline": 81.85,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 724,
    "brand": "shell",
    "name": "Shell Caloocan",
    "area": "Caloocan",
    "lat": 14.6528649,
    "lng": 120.998047,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 726,
    "brand": "cleanfuel",
    "name": "Cleanfuel Commonwealth Ave Fairview",
    "area": "Quezon City",
    "lat": 14.7212563,
    "lng": 121.0516688,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 727,
    "brand": "flyingv",
    "name": "Flying V Tullahan Rd",
    "area": "Caloocan",
    "lat": 14.6832342,
    "lng": 121.0065282,
    "prices": {
      "diesel": 82.79,
      "unleaded": 84.54,
      "egasoline": null,
      "premium95": 88.34,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 728,
    "brand": "phoenix",
    "name": "Phoenix Moriones Tondo Manila",
    "area": "Manila",
    "lat": 14.6345601,
    "lng": 120.9752139,
    "prices": {
      "diesel": 86.94,
      "unleaded": 81.15,
      "egasoline": 81.85,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 730,
    "brand": "phoenix",
    "name": "Phoenix Tullahan Caloocan",
    "area": "Caloocan",
    "lat": 14.6919883,
    "lng": 121.0071088,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 734,
    "brand": "petron",
    "name": "Petron M.H. del Pilar St Malabon",
    "area": "Malabon",
    "lat": 14.68009,
    "lng": 120.9612795,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 736,
    "brand": "petron",
    "name": "Petron Rizal Ave Ext Navotas",
    "area": "Navotas",
    "lat": 14.6475873,
    "lng": 120.9549243,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 737,
    "brand": "cleanfuel",
    "name": "Cleanfuel Quezon Ave",
    "area": "Quezon City",
    "lat": 14.649734,
    "lng": 121.033525,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 738,
    "brand": "unioil",
    "name": "Unioil MacArthur Hwy",
    "area": "Valenzuela",
    "lat": 14.7002494,
    "lng": 120.9624164,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 739,
    "brand": "unioil",
    "name": "Unioil East Service Rd",
    "area": "Valenzuela",
    "lat": 14.7047809,
    "lng": 120.9952238,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 740,
    "brand": "unioil",
    "name": "Unioil Caloocan",
    "area": "Caloocan",
    "lat": 14.6393418,
    "lng": 121.0104242,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 741,
    "brand": "flyingv",
    "name": "Flying V Gen. Luis St",
    "area": "Quezon City",
    "lat": 14.7218279,
    "lng": 121.0317505,
    "prices": {
      "diesel": 82.79,
      "unleaded": 84.54,
      "egasoline": null,
      "premium95": 88.34,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 742,
    "brand": "petron",
    "name": "Petron Aurora Blvd",
    "area": "Quezon City",
    "lat": 14.6337716,
    "lng": 121.0454529,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 743,
    "brand": "seaoil",
    "name": "Seaoil Regalado Ave",
    "area": "Quezon City",
    "lat": 14.735774,
    "lng": 121.0630876,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 744,
    "brand": "unioil",
    "name": "Unioil EDSA",
    "area": "Quezon City",
    "lat": 14.6360308,
    "lng": 121.0235792,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 745,
    "brand": "caltex",
    "name": "Caltex Aurora Blvd",
    "area": "Quezon City",
    "lat": 14.6367696,
    "lng": 121.0417699,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 746,
    "brand": "phoenix",
    "name": "Phoenix Camarin",
    "area": "Caloocan",
    "lat": 14.7624018,
    "lng": 121.0442159,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 747,
    "brand": "phoenix",
    "name": "Phoenix Visayas Ave",
    "area": "Quezon City",
    "lat": 14.6747451,
    "lng": 121.0468911,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 748,
    "brand": "unioil",
    "name": "Unioil Congressional Ave",
    "area": "Quezon City",
    "lat": 14.6580542,
    "lng": 121.0186486,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 749,
    "brand": "petron",
    "name": "Petron EDSA",
    "area": "Quezon City",
    "lat": 14.6307839,
    "lng": 121.0154184,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 750,
    "brand": "shell",
    "name": "Shell Aurora Blvd",
    "area": "Quezon City",
    "lat": 14.6382542,
    "lng": 121.0418138,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 751,
    "brand": "caltex",
    "name": "Caltex Heroes Hill Quezon Ave",
    "area": "Quezon City",
    "lat": 14.6355681,
    "lng": 121.0228036,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 752,
    "brand": "unioil",
    "name": "Unioil Caloocan",
    "area": "Caloocan",
    "lat": 14.635416,
    "lng": 120.9968549,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 753,
    "brand": "unioil",
    "name": "Unioil Dahlia Ave Fairview",
    "area": "Quezon City",
    "lat": 14.6994508,
    "lng": 121.0607385,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 754,
    "brand": "unioil",
    "name": "Unioil UniOil - Potrero, MacArthur Hwy.",
    "area": "Malabon",
    "lat": 14.6663742,
    "lng": 120.9837943,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 755,
    "brand": "unioil",
    "name": "Unioil Quirino Hwy Bagbag",
    "area": "Quezon City",
    "lat": 14.699442,
    "lng": 121.0343721,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 764,
    "brand": "petron",
    "name": "Petron Marcos Hwy Rosario Pasig",
    "area": "Pasig",
    "lat": 14.6288903,
    "lng": 121.1223853,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 767,
    "brand": "flyingv",
    "name": "Flying V Marcos Hwy Rosario Pasig",
    "area": "Pasig",
    "lat": 14.6288037,
    "lng": 121.1239727,
    "prices": {
      "diesel": 82.79,
      "unleaded": 84.54,
      "egasoline": null,
      "premium95": 88.34,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 770,
    "brand": "shell",
    "name": "Shell Aurora Blvd",
    "area": "Quezon City",
    "lat": 14.6101566,
    "lng": 121.0254145,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 773,
    "brand": "shell",
    "name": "Shell Roosevelt Ave",
    "area": "Quezon City",
    "lat": 14.6181877,
    "lng": 121.0049522,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 774,
    "brand": "caltex",
    "name": "Caltex Marcos Hwy Santolan Pasig",
    "area": "Pasig",
    "lat": 14.6325169,
    "lng": 121.1147806,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 775,
    "brand": "caltex",
    "name": "Caltex Fortune Ave Santan St Fortune Marikina",
    "area": "Marikina",
    "lat": 14.6630775,
    "lng": 121.1246194,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 776,
    "brand": "seaoil",
    "name": "Seaoil JP Rizal Ave Sto. Niño Marikina",
    "area": "Marikina",
    "lat": 14.6409198,
    "lng": 121.1099814,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 777,
    "brand": "ptt",
    "name": "PTT Sumulong Hwy Nangka Marikina",
    "area": "Marikina",
    "lat": 14.6604626,
    "lng": 121.1183585,
    "prices": {
      "diesel": 90.01,
      "unleaded": 82.99,
      "egasoline": null,
      "premium95": 86.99,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 780,
    "brand": "shell",
    "name": "Shell A. Bonifacio Ave Tañong Marikina",
    "area": "Marikina",
    "lat": 14.6337659,
    "lng": 121.0850334,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 782,
    "brand": "petron",
    "name": "Petron Boni Serrano Ave Maybunga Pasig",
    "area": "Pasig",
    "lat": 14.5873984,
    "lng": 121.1116122,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 789,
    "brand": "caltex",
    "name": "Caltex Roosevelt Ave",
    "area": "Quezon City",
    "lat": 14.6231887,
    "lng": 121.0282589,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 792,
    "brand": "shell",
    "name": "Shell Roosevelt Ave",
    "area": "Quezon City",
    "lat": 14.6246011,
    "lng": 121.0326975,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 794,
    "brand": "flyingv",
    "name": "Flying V Commonwealth Ave",
    "area": "Quezon City",
    "lat": 14.7042506,
    "lng": 121.0819551,
    "prices": {
      "diesel": 82.79,
      "unleaded": 84.54,
      "egasoline": null,
      "premium95": 88.34,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 795,
    "brand": "shell",
    "name": "Shell Bayan-Bayanan Ave Marikina Heights Marikina",
    "area": "Marikina",
    "lat": 14.6504589,
    "lng": 121.1120521,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 796,
    "brand": "caltex",
    "name": "Caltex C-5 Rd Bagong Ilog Pasig",
    "area": "Pasig",
    "lat": 14.5903159,
    "lng": 121.0670755,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 799,
    "brand": "petron",
    "name": "Petron Commonwealth Ave",
    "area": "Quezon City",
    "lat": 14.6697918,
    "lng": 121.0775302,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 800,
    "brand": "caltex",
    "name": "Caltex A. Bonifacio Ave Tañong Marikina",
    "area": "Marikina",
    "lat": 14.6349198,
    "lng": 121.0874507,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 802,
    "brand": "shell",
    "name": "Shell JP Rizal cor Spain St Concepcion Uno Marikina",
    "area": "Marikina",
    "lat": 14.6299409,
    "lng": 121.101625,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 803,
    "brand": "petron",
    "name": "Petron JP Rizal cor Spain St Concepcion Uno Marikina",
    "area": "Marikina",
    "lat": 14.6277877,
    "lng": 121.1022205,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 805,
    "brand": "unioil",
    "name": "Unioil Marikina",
    "area": "Marikina",
    "lat": 14.6508823,
    "lng": 121.1071237,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 807,
    "brand": "shell",
    "name": "Shell JP Rizal Concepcion Uno Marikina",
    "area": "Marikina",
    "lat": 14.6275001,
    "lng": 121.1023875,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 808,
    "brand": "shell",
    "name": "Shell Aurora Blvd",
    "area": "Quezon City",
    "lat": 14.6112274,
    "lng": 121.0172443,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 811,
    "brand": "shell",
    "name": "Shell Bayan-Bayanan Ave cor Molave St Marikina",
    "area": "Marikina",
    "lat": 14.6461484,
    "lng": 121.0963902,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 813,
    "brand": "shell",
    "name": "Shell Katipunan Ave",
    "area": "Quezon City",
    "lat": 14.6774587,
    "lng": 121.0835546,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 814,
    "brand": "petron",
    "name": "Petron JP Rizal cor Bayan-Bayanan Concepcion Marikina",
    "area": "Marikina",
    "lat": 14.6508872,
    "lng": 121.1092139,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 815,
    "brand": "flyingv",
    "name": "Flying V E. Rodriguez Ave",
    "area": "Quezon City",
    "lat": 14.6272319,
    "lng": 121.0521261,
    "prices": {
      "diesel": 82.79,
      "unleaded": 84.54,
      "egasoline": null,
      "premium95": 88.34,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 817,
    "brand": "petron",
    "name": "Petron Zabarte Road Camarin Caloocan",
    "area": "Caloocan",
    "lat": 14.7392914,
    "lng": 121.0270967,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 818,
    "brand": "petron",
    "name": "Petron Roosevelt Ave",
    "area": "Quezon City",
    "lat": 14.6167064,
    "lng": 121.0438219,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 824,
    "brand": "total",
    "name": "TotalEnergies Espana Blvd Sampaloc Manila",
    "area": "Manila",
    "lat": 14.603111,
    "lng": 121.0155807,
    "prices": {
      "diesel": 121.92,
      "premiumDiesel": 124.61,
      "unleaded": 84.08,
      "egasoline": null,
      "premium95": 88.88,
      "premium97": 92.38,
      "kerosene": null
    }
  },
  {
    "id": 825,
    "brand": "seaoil",
    "name": "Seaoil JP Rizal Ave Sto. Niño Marikina",
    "area": "Marikina",
    "lat": 14.6372856,
    "lng": 121.0943745,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 826,
    "brand": "petron",
    "name": "Petron E Bank Rd Sta Lucia Pasig",
    "area": "Pasig",
    "lat": 14.5854578,
    "lng": 121.1175914,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 827,
    "brand": "phoenix",
    "name": "Phoenix Boni Serrano Ave Maybunga Pasig",
    "area": "Pasig",
    "lat": 14.5875538,
    "lng": 121.1110011,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 829,
    "brand": "flyingv",
    "name": "Flying V E. Rodriguez Ave",
    "area": "Quezon City",
    "lat": 14.6251249,
    "lng": 121.0580235,
    "prices": {
      "diesel": 82.79,
      "unleaded": 84.54,
      "egasoline": null,
      "premium95": 88.34,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 830,
    "brand": "flyingv",
    "name": "Flying V Santolan San Juan",
    "area": "San Juan",
    "lat": 14.6046717,
    "lng": 121.0330735,
    "prices": {
      "diesel": 82.79,
      "unleaded": 84.54,
      "egasoline": null,
      "premium95": 88.34,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 832,
    "brand": "caltex",
    "name": "Caltex E. Rodriguez Ave",
    "area": "Quezon City",
    "lat": 14.629293,
    "lng": 121.0696672,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 835,
    "brand": "caltex",
    "name": "Caltex A. Mabini Maypajo Caloocan",
    "area": "Caloocan",
    "lat": 14.6569545,
    "lng": 120.9925559,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 838,
    "brand": "seaoil",
    "name": "Seaoil E. Rodriguez Ave",
    "area": "Quezon City",
    "lat": 14.616225,
    "lng": 121.0529705,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 839,
    "brand": "petron",
    "name": "Petron Roosevelt Ave",
    "area": "Quezon City",
    "lat": 14.6231406,
    "lng": 121.0454095,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 841,
    "brand": "petron",
    "name": "Petron Roosevelt Ave",
    "area": "Quezon City",
    "lat": 14.6242233,
    "lng": 121.009215,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 844,
    "brand": "shell",
    "name": "Shell E. Rodriguez Ave",
    "area": "Quezon City",
    "lat": 14.6269969,
    "lng": 121.0508513,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 845,
    "brand": "petron",
    "name": "Petron E. Rodriguez Ave",
    "area": "Quezon City",
    "lat": 14.6288762,
    "lng": 121.0676759,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 852,
    "brand": "caltex",
    "name": "Caltex A. Mabini Maypajo Caloocan",
    "area": "Caloocan",
    "lat": 14.6576268,
    "lng": 120.9919344,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 853,
    "brand": "unioil",
    "name": "Unioil A. Mabini Maypajo Caloocan",
    "area": "Caloocan",
    "lat": 14.6575371,
    "lng": 120.9905057,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 854,
    "brand": "cleanfuel",
    "name": "CleanFuel A. Mabini Maypajo Caloocan",
    "area": "Caloocan",
    "lat": 14.6568852,
    "lng": 120.990318,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 855,
    "brand": "petron",
    "name": "Petron P. Guevarra San Juan",
    "area": "San Juan",
    "lat": 14.5984067,
    "lng": 121.0373196,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 857,
    "brand": "petron",
    "name": "Petron Roosevelt Ave",
    "area": "Quezon City",
    "lat": 14.6192838,
    "lng": 121.0029412,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 859,
    "brand": "total",
    "name": "Total Commonwealth Ave",
    "area": "Quezon City",
    "lat": 14.7071387,
    "lng": 121.0890827,
    "prices": {
      "diesel": 94.14,
      "premiumDiesel": 87.57,
      "unleaded": 83.28,
      "egasoline": null,
      "premium95": 88.08,
      "premium97": 91.58,
      "kerosene": null
    }
  },
  {
    "id": 861,
    "brand": "ptt",
    "name": "PTT Roosevelt Ave",
    "area": "Quezon City",
    "lat": 14.6180473,
    "lng": 121.0069536,
    "prices": {
      "diesel": 90.01,
      "unleaded": 82.99,
      "egasoline": null,
      "premium95": 86.99,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 862,
    "brand": "petron",
    "name": "Petron Hagdang Bato Mandaluyong",
    "area": "Mandaluyong",
    "lat": 14.5873653,
    "lng": 121.0210536,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 863,
    "brand": "shell",
    "name": "Shell Roosevelt Ave",
    "area": "Quezon City",
    "lat": 14.6243866,
    "lng": 121.0094467,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 866,
    "brand": "shell",
    "name": "Shell JP Rizal Ave Marcos Hwy Concepcion Marikina",
    "area": "Marikina",
    "lat": 14.6295657,
    "lng": 121.0966303,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 867,
    "brand": "shell",
    "name": "Shell Addition Hills Mandaluyong",
    "area": "Mandaluyong",
    "lat": 14.5893106,
    "lng": 121.0419006,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 868,
    "brand": "petron",
    "name": "Petron St. Francis Mandaluyong",
    "area": "Mandaluyong",
    "lat": 14.5871385,
    "lng": 121.0469367,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 869,
    "brand": "unioil",
    "name": "Unioil Shaw Blvd Pleasant Hills Mandaluyong",
    "area": "Mandaluyong",
    "lat": 14.5896398,
    "lng": 121.0374796,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 870,
    "brand": "caltex",
    "name": "Caltex Aurora Blvd San Juan",
    "area": "San Juan",
    "lat": 14.6111979,
    "lng": 121.0276303,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 872,
    "brand": "shell",
    "name": "Shell N. Domingo Artiaga San Juan",
    "area": "San Juan",
    "lat": 14.6093999,
    "lng": 121.0297088,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 873,
    "brand": "petron",
    "name": "Petron Katipunan Ave",
    "area": "Quezon City",
    "lat": 14.6891471,
    "lng": 121.0982139,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 874,
    "brand": "petron",
    "name": "Petron Commonwealth Ave",
    "area": "Quezon City",
    "lat": 14.7067536,
    "lng": 121.0696105,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 875,
    "brand": "caltex",
    "name": "Caltex Boni Serrano Ave San Nicolas Pasig",
    "area": "Pasig",
    "lat": 14.5968059,
    "lng": 121.0892002,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 877,
    "brand": "petron",
    "name": "Petron E. Rodriguez Ave",
    "area": "Quezon City",
    "lat": 14.6321834,
    "lng": 121.0745861,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 878,
    "brand": "total",
    "name": "TotalEnergies Ortigas Ave Ext Santolan Pasig",
    "area": "Pasig",
    "lat": 14.6240957,
    "lng": 121.116695,
    "prices": {
      "diesel": 94.14,
      "premiumDiesel": 87.57,
      "unleaded": 83.28,
      "egasoline": null,
      "premium95": 88.08,
      "premium97": 91.58,
      "kerosene": null
    }
  },
  {
    "id": 880,
    "brand": "total",
    "name": "TotalEnergies Pedro Gil Paco Manila",
    "area": "Manila",
    "lat": 14.590877,
    "lng": 121.0013837,
    "prices": {
      "diesel": 121.92,
      "premiumDiesel": 124.61,
      "unleaded": 84.08,
      "egasoline": null,
      "premium95": 88.88,
      "premium97": 92.38,
      "kerosene": null
    }
  },
  {
    "id": 881,
    "brand": "cleanfuel",
    "name": "CleanFuel Clean Fuel Auto LPG",
    "area": "Mandaluyong",
    "lat": 14.5891763,
    "lng": 121.0361357,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 882,
    "brand": "petron",
    "name": "Petron Roosevelt Ave",
    "area": "Quezon City",
    "lat": 14.6208382,
    "lng": 120.9964414,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 883,
    "brand": "shell",
    "name": "Shell Ortigas Ave Ext San Nicolas Pasig",
    "area": "Pasig",
    "lat": 14.5898651,
    "lng": 121.0990539,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 884,
    "brand": "petron",
    "name": "Petron Katipunan Ave",
    "area": "Quezon City",
    "lat": 14.6784358,
    "lng": 121.0825188,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 886,
    "brand": "petron",
    "name": "Petron Commonwealth Ave",
    "area": "Quezon City",
    "lat": 14.7044374,
    "lng": 121.0810135,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 888,
    "brand": "caltex",
    "name": "Caltex Ortigas Ave Ext Maybunga Pasig",
    "area": "Pasig",
    "lat": 14.5888744,
    "lng": 121.1025606,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 889,
    "brand": "petron",
    "name": "Petron Aurora Blvd",
    "area": "Quezon City",
    "lat": 14.6132137,
    "lng": 121.0074383,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 891,
    "brand": "caltex",
    "name": "Caltex Aurora Blvd",
    "area": "Quezon City",
    "lat": 14.6076756,
    "lng": 121.0212689,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 892,
    "brand": "shell",
    "name": "Shell F. Blumentritt Valenzuela San Juan",
    "area": "San Juan",
    "lat": 14.6040476,
    "lng": 121.0237801,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 893,
    "brand": "caltex",
    "name": "Caltex F. Blumentritt Pr. Sotto San Juan",
    "area": "San Juan",
    "lat": 14.5993622,
    "lng": 121.0284786,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 894,
    "brand": "petron",
    "name": "Petron Aurora Blvd",
    "area": "Quezon City",
    "lat": 14.6098433,
    "lng": 121.0366992,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 895,
    "brand": "unioil",
    "name": "Unioil Boni Serrano Ave San Nicolas Pasig",
    "area": "Pasig",
    "lat": 14.5899168,
    "lng": 121.0968645,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 896,
    "brand": "caltex",
    "name": "Caltex Boni Serrano Ave Maybunga Pasig",
    "area": "Pasig",
    "lat": 14.5854541,
    "lng": 121.0880267,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 897,
    "brand": "petron",
    "name": "Petron Roosevelt Ave",
    "area": "Quezon City",
    "lat": 14.6239343,
    "lng": 120.9997488,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 899,
    "brand": "shell",
    "name": "Shell JP Rizal Ave Sta. Elena Marikina",
    "area": "Marikina",
    "lat": 14.6438645,
    "lng": 121.1002003,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 901,
    "brand": "petron",
    "name": "Petron Manga Ave Sampaloc Manila",
    "area": "Manila",
    "lat": 14.6025292,
    "lng": 121.0107157,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 903,
    "brand": "shell",
    "name": "Shell Boni Serrano Ave San Nicolas Pasig",
    "area": "Pasig",
    "lat": 14.5900879,
    "lng": 121.0899534,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 905,
    "brand": "caltex",
    "name": "Caltex Gen. Kalentong Mandaluyong",
    "area": "Mandaluyong",
    "lat": 14.5941356,
    "lng": 121.0275252,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 906,
    "brand": "total",
    "name": "TotalEnergies Shaw Blvd Mandaluyong",
    "area": "Mandaluyong",
    "lat": 14.5918957,
    "lng": 121.0313263,
    "prices": {
      "diesel": 121.92,
      "premiumDiesel": 124.61,
      "unleaded": 84.08,
      "egasoline": null,
      "premium95": 88.88,
      "premium97": 92.38,
      "kerosene": null
    }
  },
  {
    "id": 908,
    "brand": "unioil",
    "name": "Unioil F. Blumentritt Batis San Juan",
    "area": "San Juan",
    "lat": 14.602936,
    "lng": 121.0263642,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 909,
    "brand": "shell",
    "name": "Shell Lacson Ave Espana Sampaloc Manila",
    "area": "Manila",
    "lat": 14.6014583,
    "lng": 121.0060021,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 910,
    "brand": "ptt",
    "name": "PTT Roosevelt Ave",
    "area": "Quezon City",
    "lat": 14.6143807,
    "lng": 121.016537,
    "prices": {
      "diesel": 90.01,
      "unleaded": 82.99,
      "egasoline": null,
      "premium95": 86.99,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 911,
    "brand": "petron",
    "name": "Petron BG Molina St Parang Marikina",
    "area": "Marikina",
    "lat": 14.6507672,
    "lng": 121.1027147,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 913,
    "brand": "unioil",
    "name": "Unioil Espana Blvd Sampaloc Manila",
    "area": "Manila",
    "lat": 14.5989038,
    "lng": 121.014313,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 915,
    "brand": "petron",
    "name": "Petron A. Mabini Maypajo Caloocan",
    "area": "Caloocan",
    "lat": 14.6569495,
    "lng": 120.9908721,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 919,
    "brand": "cleanfuel",
    "name": "CleanFuel Lacson Ave Tondo Manila",
    "area": "Manila",
    "lat": 14.6166961,
    "lng": 121.0008343,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 923,
    "brand": "phoenix",
    "name": "Phoenix Ortigas Ave Ext Rosario Pasig",
    "area": "Pasig",
    "lat": 14.602254,
    "lng": 121.1060342,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 924,
    "brand": "flyingv",
    "name": "Flying V Magsaysay Blvd Sta. Mesa Manila",
    "area": "Manila",
    "lat": 14.5941843,
    "lng": 121.0250264,
    "prices": {
      "diesel": 82.79,
      "unleaded": 84.54,
      "egasoline": null,
      "premium95": 88.34,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 926,
    "brand": "cleanfuel",
    "name": "Cleanfuel Commonwealth Ave",
    "area": "Quezon City",
    "lat": 14.6731498,
    "lng": 121.0808813,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 927,
    "brand": "caltex",
    "name": "Caltex Commonwealth Ave",
    "area": "Quezon City",
    "lat": 14.6731542,
    "lng": 121.0793214,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 928,
    "brand": "caltex",
    "name": "Caltex Pedro Gil Paco Manila",
    "area": "Manila",
    "lat": 14.5907893,
    "lng": 120.9999633,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 929,
    "brand": "caltex",
    "name": "Caltex Roosevelt Ave",
    "area": "Quezon City",
    "lat": 14.6243045,
    "lng": 121.0377468,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 932,
    "brand": "petron",
    "name": "Petron Congressional Rd Bagumbong Caloocan",
    "area": "Caloocan",
    "lat": 14.6819751,
    "lng": 121.008409,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 938,
    "brand": "caltex",
    "name": "Caltex Club Filipino Ortigas San Juan",
    "area": "San Juan",
    "lat": 14.6021469,
    "lng": 121.0467643,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 939,
    "brand": "unioil",
    "name": "Unioil Roosevelt Ave",
    "area": "Quezon City",
    "lat": 14.6247778,
    "lng": 120.9981655,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 940,
    "brand": "petron",
    "name": "Petron Roosevelt Ave",
    "area": "Quezon City",
    "lat": 14.6272793,
    "lng": 120.9970061,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 944,
    "brand": "cleanfuel",
    "name": "Cleanfuel Manila",
    "area": "Manila",
    "lat": 14.620696,
    "lng": 121.0001489,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 946,
    "brand": "cleanfuel",
    "name": "Cleanfuel San Juan",
    "area": "San Juan",
    "lat": 14.62423,
    "lng": 121.0368306,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 947,
    "brand": "total",
    "name": "Total San Juan",
    "area": "San Juan",
    "lat": 14.6244714,
    "lng": 121.0354277,
    "prices": {
      "diesel": 94.14,
      "premiumDiesel": 87.57,
      "unleaded": 83.28,
      "egasoline": null,
      "premium95": 88.08,
      "premium97": 91.58,
      "kerosene": null
    }
  },
  {
    "id": 951,
    "brand": "petron",
    "name": "Petron San Juan",
    "area": "San Juan",
    "lat": 14.6168124,
    "lng": 121.0393694,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 957,
    "brand": "caltex",
    "name": "Caltex Manila",
    "area": "Manila",
    "lat": 14.6248365,
    "lng": 121.0152079,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 960,
    "brand": "phoenix",
    "name": "Phoenix Regalado Ave",
    "area": "Quezon City",
    "lat": 14.7357258,
    "lng": 121.0659409,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 962,
    "brand": "petron",
    "name": "Petron Boni Serrano Ave Maybunga Pasig",
    "area": "Pasig",
    "lat": 14.5856732,
    "lng": 121.0886148,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 963,
    "brand": "petron",
    "name": "Petron V. Mapa Sta. Mesa Manila",
    "area": "Manila",
    "lat": 14.5969422,
    "lng": 121.0187891,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 965,
    "brand": "seaoil",
    "name": "Seaoil Ortigas Ave Ext Rosario Pasig",
    "area": "Pasig",
    "lat": 14.6030461,
    "lng": 121.1061855,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 967,
    "brand": "unioil",
    "name": "Unioil Ortigas Ave Ext Rosario Pasig",
    "area": "Pasig",
    "lat": 14.5975811,
    "lng": 121.1095346,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 971,
    "brand": "petron",
    "name": "Petron Regalado Ave",
    "area": "Quezon City",
    "lat": 14.7352203,
    "lng": 121.0653106,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 974,
    "brand": "cleanfuel",
    "name": "CleanFuel Ortigas Ave Ext Maybunga Pasig",
    "area": "Pasig",
    "lat": 14.5892505,
    "lng": 121.1007398,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 981,
    "brand": "shell",
    "name": "Shell Commonwealth Ave",
    "area": "Quezon City",
    "lat": 14.7057032,
    "lng": 121.0739761,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 983,
    "brand": "total",
    "name": "TotalEnergies Magsaysay Blvd Sta. Mesa Manila",
    "area": "Manila",
    "lat": 14.6008552,
    "lng": 121.0198097,
    "prices": {
      "diesel": 121.92,
      "premiumDiesel": 124.61,
      "unleaded": 84.08,
      "egasoline": null,
      "premium95": 88.88,
      "premium97": 92.38,
      "kerosene": null
    }
  },
  {
    "id": 985,
    "brand": "petron",
    "name": "Petron Quirino Highway Amparo Caloocan",
    "area": "Caloocan",
    "lat": 14.7460373,
    "lng": 121.0792848,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 989,
    "brand": "unioil",
    "name": "Unioil Commonwealth Ave",
    "area": "Quezon City",
    "lat": 14.7048291,
    "lng": 121.0772026,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 991,
    "brand": "petron",
    "name": "Petron JP Rizal Ave Nangka Marikina",
    "area": "Marikina",
    "lat": 14.6586042,
    "lng": 121.1107127,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1001,
    "brand": "unioil",
    "name": "Unioil Katipunan Ave",
    "area": "Quezon City",
    "lat": 14.6827619,
    "lng": 121.0786066,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1003,
    "brand": "petron",
    "name": "Petron Manila",
    "area": "Manila",
    "lat": 14.6190044,
    "lng": 121.014491,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1009,
    "brand": "petron",
    "name": "Petron Quirino Ave Paco Manila",
    "area": "Manila",
    "lat": 14.5877094,
    "lng": 120.995475,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1012,
    "brand": "total",
    "name": "TotalEnergies F. Blumentritt Jose Gil San Juan",
    "area": "San Juan",
    "lat": 14.6019987,
    "lng": 121.0277009,
    "prices": {
      "diesel": 121.92,
      "premiumDiesel": 124.61,
      "unleaded": 84.08,
      "egasoline": null,
      "premium95": 88.88,
      "premium97": 92.38,
      "kerosene": null
    }
  },
  {
    "id": 1014,
    "brand": "cleanfuel",
    "name": "CleanFuel Ortigas Ave Ext San Nicolas Pasig",
    "area": "Pasig",
    "lat": 14.5896631,
    "lng": 121.0994443,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1015,
    "brand": "petron",
    "name": "Petron San Juan",
    "area": "San Juan",
    "lat": 14.6245078,
    "lng": 121.0403123,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1021,
    "brand": "shell",
    "name": "Shell Katipunan Ave",
    "area": "Quezon City",
    "lat": 14.6844425,
    "lng": 121.1049107,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1023,
    "brand": "seaoil",
    "name": "Seaoil Manila",
    "area": "Manila",
    "lat": 14.6145993,
    "lng": 121.0164926,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 1027,
    "brand": "total",
    "name": "Total Commonwealth Ave",
    "area": "Quezon City",
    "lat": 14.7003972,
    "lng": 121.0679272,
    "prices": {
      "diesel": 94.14,
      "premiumDiesel": 87.57,
      "unleaded": 83.28,
      "egasoline": null,
      "premium95": 88.08,
      "premium97": 91.58,
      "kerosene": null
    }
  },
  {
    "id": 1029,
    "brand": "petron",
    "name": "Petron Commonwealth Ave",
    "area": "Quezon City",
    "lat": 14.7040492,
    "lng": 121.0691497,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1032,
    "brand": "unioil",
    "name": "Unioil San Juan",
    "area": "San Juan",
    "lat": 14.6126447,
    "lng": 121.0371851,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1045,
    "brand": "shell",
    "name": "Shell Commonwealth Ave",
    "area": "Quezon City",
    "lat": 14.7062245,
    "lng": 121.0703763,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 105.44,
      "unleaded": 90.23,
      "egasoline": null,
      "premium95": 97.13,
      "premium97": 100.58,
      "kerosene": 126.81
    }
  },
  {
    "id": 1046,
    "brand": "petron",
    "name": "Petron Katipunan Ave",
    "area": "Quezon City",
    "lat": 14.6657502,
    "lng": 121.0653799,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1050,
    "brand": "shell",
    "name": "Shell Katipunan Ave",
    "area": "Quezon City",
    "lat": 14.6749967,
    "lng": 121.080687,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1054,
    "brand": "petron",
    "name": "Petron Shaw Blvd",
    "area": "Mandaluyong",
    "lat": 14.6107625,
    "lng": 121.0538211,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1056,
    "brand": "shell",
    "name": "Shell Katipunan Ave",
    "area": "Quezon City",
    "lat": 14.6842214,
    "lng": 121.0776096,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1060,
    "brand": "seaoil",
    "name": "Seaoil Sumulong Hwy Nangka Marikina",
    "area": "Marikina",
    "lat": 14.6600165,
    "lng": 121.1188494,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 1062,
    "brand": "shell",
    "name": "Shell Katipunan Ave",
    "area": "Quezon City",
    "lat": 14.671239,
    "lng": 121.0791612,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1063,
    "brand": "total",
    "name": "TotalEnergies JP Rizal Ave Malanday Marikina",
    "area": "Marikina",
    "lat": 14.6483029,
    "lng": 121.0974702,
    "prices": {
      "diesel": 94.14,
      "premiumDiesel": 87.57,
      "unleaded": 83.28,
      "egasoline": null,
      "premium95": 88.08,
      "premium97": 91.58,
      "kerosene": null
    }
  },
  {
    "id": 1064,
    "brand": "seaoil",
    "name": "Seaoil JP Rizal cor Korea St Nangka Marikina",
    "area": "Marikina",
    "lat": 14.6690966,
    "lng": 121.1083172,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 1065,
    "brand": "shell",
    "name": "Shell Quirino Highway Dona Amparo Caloocan",
    "area": "Caloocan",
    "lat": 14.7452528,
    "lng": 121.077749,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1067,
    "brand": "flyingv",
    "name": "Flying V JP Rizal Ave Nangka Marikina",
    "area": "Marikina",
    "lat": 14.6603781,
    "lng": 121.1047841,
    "prices": {
      "diesel": 82.79,
      "unleaded": 84.54,
      "egasoline": null,
      "premium95": 88.34,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1069,
    "brand": "shell",
    "name": "Shell Marcos Hwy Rosario Pasig",
    "area": "Pasig",
    "lat": 14.6335137,
    "lng": 121.1217104,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1070,
    "brand": "shell",
    "name": "Shell JP Rizal Ave Lamuan Nangka Marikina",
    "area": "Marikina",
    "lat": 14.6627594,
    "lng": 121.1062819,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1071,
    "brand": "caltex",
    "name": "Caltex Ortigas Ave Ext Rosario Pasig",
    "area": "Pasig",
    "lat": 14.5987569,
    "lng": 121.1089122,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 1074,
    "brand": "petron",
    "name": "Petron Valenzuela F. Blumentritt San Juan",
    "area": "San Juan",
    "lat": 14.601911,
    "lng": 121.0273342,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1076,
    "brand": "total",
    "name": "TotalEnergies JP Rizal Ave Concepcion Uno Marikina",
    "area": "Marikina",
    "lat": 14.6280505,
    "lng": 121.1022296,
    "prices": {
      "diesel": 121.92,
      "premiumDiesel": 124.61,
      "unleaded": 84.08,
      "egasoline": null,
      "premium95": 88.88,
      "premium97": 92.38,
      "kerosene": null
    }
  },
  {
    "id": 1078,
    "brand": "unioil",
    "name": "Unioil San Juan",
    "area": "San Juan",
    "lat": 14.6243462,
    "lng": 121.0337641,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1079,
    "brand": "total",
    "name": "TotalEnergies JP Rizal cor Marcos Hwy Concepcion Marikina",
    "area": "Marikina",
    "lat": 14.6263486,
    "lng": 121.0965462,
    "prices": {
      "diesel": 121.92,
      "premiumDiesel": 124.61,
      "unleaded": 84.08,
      "egasoline": null,
      "premium95": 88.88,
      "premium97": 92.38,
      "kerosene": null
    }
  },
  {
    "id": 1083,
    "brand": "shell",
    "name": "Shell Magsaysay Blvd Sta. Mesa Manila",
    "area": "Manila",
    "lat": 14.5939867,
    "lng": 121.0253269,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1087,
    "brand": "shell",
    "name": "Shell Santolan Rd Santolan Pasig",
    "area": "Pasig",
    "lat": 14.6116379,
    "lng": 121.0923246,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1088,
    "brand": "petron",
    "name": "Petron Boni Serrano Ave Maybunga Pasig",
    "area": "Pasig",
    "lat": 14.5995947,
    "lng": 121.091804,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1089,
    "brand": "petron",
    "name": "Petron Ortigas Ave Ext Rosario Pasig",
    "area": "Pasig",
    "lat": 14.6023466,
    "lng": 121.1065786,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1090,
    "brand": "unioil",
    "name": "Unioil A. Bonifacio Ave Barangka Marikina",
    "area": "Marikina",
    "lat": 14.6329647,
    "lng": 121.0834885,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1091,
    "brand": "shell",
    "name": "Shell EDSA",
    "area": "Quezon City",
    "lat": 14.6636503,
    "lng": 121.0669471,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1096,
    "brand": "total",
    "name": "TotalEnergies A. Bonifacio Ave Calumpang Marikina",
    "area": "Marikina",
    "lat": 14.6322517,
    "lng": 121.0782478,
    "prices": {
      "diesel": 94.14,
      "premiumDiesel": 87.57,
      "unleaded": 83.28,
      "egasoline": null,
      "premium95": 88.08,
      "premium97": 91.58,
      "kerosene": null
    }
  },
  {
    "id": 1097,
    "brand": "unioil",
    "name": "Unioil Manila",
    "area": "Manila",
    "lat": 14.6215805,
    "lng": 121.0053673,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1099,
    "brand": "petron",
    "name": "Petron F. Blumentritt San Juan",
    "area": "San Juan",
    "lat": 14.6042811,
    "lng": 121.0223478,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1101,
    "brand": "shell",
    "name": "Shell Blumentritt Rd Tondo Manila",
    "area": "Manila",
    "lat": 14.6155506,
    "lng": 120.9906605,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1104,
    "brand": "petron",
    "name": "Petron Manila",
    "area": "Manila",
    "lat": 14.6210562,
    "lng": 120.9988332,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1105,
    "brand": "shell",
    "name": "Shell E Bank Rd Sta Lucia Pasig",
    "area": "Pasig",
    "lat": 14.58503,
    "lng": 121.118924,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1106,
    "brand": "shell",
    "name": "Shell E Bank Rd Sta Lucia Pasig",
    "area": "Pasig",
    "lat": 14.5857619,
    "lng": 121.1186491,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1108,
    "brand": "phoenix",
    "name": "Phoenix Manila",
    "area": "Manila",
    "lat": 14.6136243,
    "lng": 121.016473,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1112,
    "brand": "cleanfuel",
    "name": "CleanFuel Ortigas Ave Ext Rosario Pasig",
    "area": "Pasig",
    "lat": 14.6000817,
    "lng": 121.1079463,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1113,
    "brand": "phoenix",
    "name": "Phoenix JP Rizal Ave Nangka Marikina",
    "area": "Marikina",
    "lat": 14.665331,
    "lng": 121.1067403,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1114,
    "brand": "cleanfuel",
    "name": "Cleanfuel JP Rizal cor Narra St Nangka Marikina",
    "area": "Marikina",
    "lat": 14.6678342,
    "lng": 121.1074732,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1115,
    "brand": "petron",
    "name": "Petron Lacson Ave Tondo Manila",
    "area": "Manila",
    "lat": 14.6150771,
    "lng": 120.999137,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1116,
    "brand": "shell",
    "name": "Shell Pedro Gil Paco Manila",
    "area": "Manila",
    "lat": 14.588643,
    "lng": 120.9963078,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1122,
    "brand": "petron",
    "name": "Petron Paco Pandacan Manila",
    "area": "Manila",
    "lat": 14.5923885,
    "lng": 121.0050016,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1123,
    "brand": "petron",
    "name": "Petron Marcos Hwy",
    "area": "Quezon City",
    "lat": 14.7263871,
    "lng": 121.1140899,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1124,
    "brand": "unioil",
    "name": "Unioil Santolan Pinaglabanan San Juan",
    "area": "San Juan",
    "lat": 14.6039573,
    "lng": 121.0321995,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1125,
    "brand": "petron",
    "name": "Petron Magsaysay Blvd Sta. Mesa Manila",
    "area": "Manila",
    "lat": 14.6002443,
    "lng": 121.0137806,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": null,
      "kerosene": 123.54
    }
  },
  {
    "id": 1130,
    "brand": "cleanfuel",
    "name": "CleanFuel Clean Fuel",
    "area": "Caloocan",
    "lat": 14.7525419,
    "lng": 121.0172333,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1134,
    "brand": "seaoil",
    "name": "Seaoil Manila",
    "area": "Manila",
    "lat": 14.62066,
    "lng": 121.0053372,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 1136,
    "brand": "petron",
    "name": "Petron Katipunan Ave",
    "area": "Quezon City",
    "lat": 14.6723951,
    "lng": 121.0656408,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1141,
    "brand": "unioil",
    "name": "Unioil Manila",
    "area": "Manila",
    "lat": 14.6247505,
    "lng": 121.0097976,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1142,
    "brand": "seaoil",
    "name": "Seaoil Shaw Blvd Addition Hills Mandaluyong",
    "area": "Mandaluyong",
    "lat": 14.5897891,
    "lng": 121.0400408,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 1144,
    "brand": "petron",
    "name": "Petron JP Rizal Ave Concepcion Dos Marikina",
    "area": "Marikina",
    "lat": 14.6396524,
    "lng": 121.1032629,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1146,
    "brand": "phoenix",
    "name": "Phoenix Shaw Blvd Mandaluyong",
    "area": "Mandaluyong",
    "lat": 14.5885749,
    "lng": 121.0440402,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1148,
    "brand": "caltex",
    "name": "Caltex Ortigas Ave Ext San Nicolas Pasig",
    "area": "Pasig",
    "lat": 14.5892979,
    "lng": 121.0990879,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 1149,
    "brand": "petron",
    "name": "Petron Boni Serrano Ave San Nicolas Pasig",
    "area": "Pasig",
    "lat": 14.5906148,
    "lng": 121.0901164,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1152,
    "brand": "petron",
    "name": "Petron Marcos Hwy Santolan Pasig",
    "area": "Pasig",
    "lat": 14.6339459,
    "lng": 121.1080614,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1153,
    "brand": "shell",
    "name": "Shell Marcos Hwy Santolan Pasig",
    "area": "Pasig",
    "lat": 14.6334706,
    "lng": 121.1105549,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1156,
    "brand": "unioil",
    "name": "Unioil San Juan",
    "area": "San Juan",
    "lat": 14.6253498,
    "lng": 121.048768,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1160,
    "brand": "cleanfuel",
    "name": "Cleanfuel San Juan",
    "area": "San Juan",
    "lat": 14.6262677,
    "lng": 121.0498802,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1161,
    "brand": "ptt",
    "name": "PTT San Juan",
    "area": "San Juan",
    "lat": 14.626478,
    "lng": 121.0504695,
    "prices": {
      "diesel": 90.01,
      "unleaded": 82.99,
      "egasoline": null,
      "premium95": 86.99,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1164,
    "brand": "petron",
    "name": "Petron Manila",
    "area": "Manila",
    "lat": 14.6198917,
    "lng": 121.015291,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1165,
    "brand": "unioil",
    "name": "Unioil Espana Blvd Sampaloc Manila",
    "area": "Manila",
    "lat": 14.6029567,
    "lng": 121.0149924,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1169,
    "brand": "seaoil",
    "name": "Seaoil E Bank Rd Sta Lucia Pasig",
    "area": "Pasig",
    "lat": 14.5863366,
    "lng": 121.1163698,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 1170,
    "brand": "petron",
    "name": "Petron JP Rizal Ave Parang Marikina",
    "area": "Marikina",
    "lat": 14.6353642,
    "lng": 121.1017109,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1171,
    "brand": "petron",
    "name": "Petron Pedro Gil Paco Manila",
    "area": "Manila",
    "lat": 14.591535,
    "lng": 121.001256,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1172,
    "brand": "petron",
    "name": "Petron Broadway San Juan",
    "area": "San Juan",
    "lat": 14.6127151,
    "lng": 121.0320864,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1175,
    "brand": "petron",
    "name": "Petron N. Domingo",
    "area": "San Juan",
    "lat": 14.6243226,
    "lng": 121.0331965,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1177,
    "brand": "shell",
    "name": "Shell N. Domingo",
    "area": "San Juan",
    "lat": 14.610748,
    "lng": 121.036608,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1179,
    "brand": "caltex",
    "name": "Caltex Metro Oil",
    "area": "Mandaluyong",
    "lat": 14.6111201,
    "lng": 121.055361,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 1182,
    "brand": "unioil",
    "name": "Unioil N. Domingo",
    "area": "San Juan",
    "lat": 14.6111341,
    "lng": 121.0343693,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1184,
    "brand": "unioil",
    "name": "Unioil Marcos Hwy Rosario Pasig",
    "area": "Pasig",
    "lat": 14.6287827,
    "lng": 121.1232206,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1185,
    "brand": "unioil",
    "name": "Unioil Commonwealth Ave Holy Spirit",
    "area": "Quezon City",
    "lat": 14.6834344,
    "lng": 121.0849099,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1187,
    "brand": "seaoil",
    "name": "Seaoil San Juan",
    "area": "San Juan",
    "lat": 14.6190796,
    "lng": 121.0432873,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 1188,
    "brand": "seaoil",
    "name": "Seaoil E. Rodriguez Ave",
    "area": "Manila",
    "lat": 14.6183352,
    "lng": 121.0040566,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 1191,
    "brand": "seaoil",
    "name": "Seaoil SEAOIL - Paraluman Marikina",
    "area": "Marikina",
    "lat": 14.6561019,
    "lng": 121.108271,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 1192,
    "brand": "shell",
    "name": "Shell Metropolitan Ave La Paz Makati",
    "area": "Makati",
    "lat": 14.5672868,
    "lng": 121.0130204,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1193,
    "brand": "petron",
    "name": "Petron Manila",
    "area": "Manila",
    "lat": 14.5962547,
    "lng": 120.9898814,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1194,
    "brand": "shell",
    "name": "Shell Manila",
    "area": "Manila",
    "lat": 14.566244,
    "lng": 120.9936796,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1195,
    "brand": "caltex",
    "name": "Caltex Pablo Ocampo Pio del Pilar Makati",
    "area": "Makati",
    "lat": 14.5667991,
    "lng": 121.0086372,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 1197,
    "brand": "shell",
    "name": "Shell Manila",
    "area": "Manila",
    "lat": 14.5800155,
    "lng": 120.989915,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1199,
    "brand": "caltex",
    "name": "Caltex Chino Roces Pio del Pilar Makati",
    "area": "Makati",
    "lat": 14.5574329,
    "lng": 121.0128759,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 1202,
    "brand": "caltex",
    "name": "Caltex Manila",
    "area": "Manila",
    "lat": 14.5769405,
    "lng": 120.9907888,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 1204,
    "brand": "petron",
    "name": "Petron Manila",
    "area": "Manila",
    "lat": 14.6157776,
    "lng": 120.9828255,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1205,
    "brand": "seaoil",
    "name": "Seaoil Manila",
    "area": "Manila",
    "lat": 14.6143812,
    "lng": 120.9847344,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 1208,
    "brand": "petron",
    "name": "Petron Manila",
    "area": "Manila",
    "lat": 14.5803077,
    "lng": 120.9887749,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1209,
    "brand": "petron",
    "name": "Petron Gil Puyat San Antonio Makati",
    "area": "Makati",
    "lat": 14.5670637,
    "lng": 121.0047378,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1210,
    "brand": "shell",
    "name": "Shell Manila",
    "area": "Manila",
    "lat": 14.6096052,
    "lng": 120.9859429,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1213,
    "brand": "caltex",
    "name": "Caltex MetroOil",
    "area": "Manila",
    "lat": 14.6108544,
    "lng": 120.9872154,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 1214,
    "brand": "shell",
    "name": "Shell Manila",
    "area": "Manila",
    "lat": 14.5655058,
    "lng": 120.9869434,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1215,
    "brand": "petron",
    "name": "Petron Manila",
    "area": "Manila",
    "lat": 14.6159623,
    "lng": 120.9872124,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1217,
    "brand": "flyingv",
    "name": "Flying V Manila",
    "area": "Manila",
    "lat": 14.6126286,
    "lng": 120.9869861,
    "prices": {
      "diesel": 82.79,
      "unleaded": 84.54,
      "egasoline": null,
      "premium95": 88.34,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1219,
    "brand": "petron",
    "name": "Petron Manila",
    "area": "Manila",
    "lat": 14.6222927,
    "lng": 120.9888687,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1220,
    "brand": "shell",
    "name": "Shell Manila",
    "area": "Manila",
    "lat": 14.6253521,
    "lng": 120.9595475,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1226,
    "brand": "shell",
    "name": "Shell Manila",
    "area": "Manila",
    "lat": 14.5684819,
    "lng": 120.9921625,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1229,
    "brand": "shell",
    "name": "Shell Manila",
    "area": "Manila",
    "lat": 14.5802664,
    "lng": 120.9786917,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1230,
    "brand": "petron",
    "name": "Petron Manila",
    "area": "Manila",
    "lat": 14.5598915,
    "lng": 120.9894228,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1231,
    "brand": "petron",
    "name": "Petron Manila",
    "area": "Manila",
    "lat": 14.627817,
    "lng": 120.9832022,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1234,
    "brand": "shell",
    "name": "Shell Pablo Ocampo Pio del Pilar Makati",
    "area": "Makati",
    "lat": 14.5671826,
    "lng": 121.0085148,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1236,
    "brand": "cleanfuel",
    "name": "CleanFuel Manila",
    "area": "Manila",
    "lat": 14.6168214,
    "lng": 120.9890288,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1238,
    "brand": "flyingv",
    "name": "Flying V Manila",
    "area": "Manila",
    "lat": 14.6168343,
    "lng": 120.9816244,
    "prices": {
      "diesel": 82.79,
      "unleaded": 84.54,
      "egasoline": null,
      "premium95": 88.34,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1241,
    "brand": "petron",
    "name": "Petron Metropolitan Ave San Antonio Makati",
    "area": "Makati",
    "lat": 14.5643928,
    "lng": 121.0153433,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1243,
    "brand": "petron",
    "name": "Petron Manila",
    "area": "Manila",
    "lat": 14.6223546,
    "lng": 120.9721173,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1244,
    "brand": "unioil",
    "name": "Unioil Manila",
    "area": "Manila",
    "lat": 14.6227252,
    "lng": 120.9726053,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1246,
    "brand": "phoenix",
    "name": "Phoenix Manila",
    "area": "Manila",
    "lat": 14.6175615,
    "lng": 120.9886633,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1253,
    "brand": "unioil",
    "name": "Unioil F.B. Harrison Pasay",
    "area": "Pasay",
    "lat": 14.5553798,
    "lng": 120.9914324,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1259,
    "brand": "petron",
    "name": "Petron Manila",
    "area": "Manila",
    "lat": 14.597026,
    "lng": 120.9702548,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1261,
    "brand": "shell",
    "name": "Shell Manila",
    "area": "Manila",
    "lat": 14.6231115,
    "lng": 120.9602367,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1265,
    "brand": "petron",
    "name": "Petron Pablo Ocampo San Antonio Makati",
    "area": "Makati",
    "lat": 14.5665292,
    "lng": 121.0145183,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1268,
    "brand": "petron",
    "name": "Petron Chino Roces San Antonio Makati",
    "area": "Makati",
    "lat": 14.5600874,
    "lng": 121.0115424,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1269,
    "brand": "seaoil",
    "name": "Seaoil Manila",
    "area": "Manila",
    "lat": 14.5934617,
    "lng": 120.9879414,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 1273,
    "brand": "petron",
    "name": "Petron Manila",
    "area": "Manila",
    "lat": 14.5994535,
    "lng": 120.9646195,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1285,
    "brand": "ptt",
    "name": "PTT Manila",
    "area": "Manila",
    "lat": 14.5847166,
    "lng": 120.9739124,
    "prices": {
      "diesel": 90.01,
      "unleaded": 82.99,
      "egasoline": null,
      "premium95": 86.99,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1290,
    "brand": "shell",
    "name": "Shell Manila",
    "area": "Manila",
    "lat": 14.6255491,
    "lng": 120.9787826,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1293,
    "brand": "shell",
    "name": "Shell Tayuman Sta. Cruz Manila",
    "area": "Manila",
    "lat": 14.6226208,
    "lng": 120.9779054,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1295,
    "brand": "cleanfuel",
    "name": "CleanFuel Manila",
    "area": "Manila",
    "lat": 14.6104367,
    "lng": 120.9756495,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1296,
    "brand": "seaoil",
    "name": "Seaoil Manila",
    "area": "Manila",
    "lat": 14.6129505,
    "lng": 120.9766718,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 1297,
    "brand": "caltex",
    "name": "Caltex Manila",
    "area": "Manila",
    "lat": 14.6258516,
    "lng": 120.9889705,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 1303,
    "brand": "caltex",
    "name": "Caltex Manila",
    "area": "Manila",
    "lat": 14.6167691,
    "lng": 120.985751,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 1307,
    "brand": "caltex",
    "name": "Caltex Magallanes Ave Magallanes Makati",
    "area": "Makati",
    "lat": 14.5316879,
    "lng": 121.0210568,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 1308,
    "brand": "phoenix",
    "name": "Phoenix Pasay",
    "area": "Pasay",
    "lat": 14.5354003,
    "lng": 120.9875189,
    "prices": {
      "diesel": 86.94,
      "unleaded": 81.15,
      "egasoline": 81.85,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1310,
    "brand": "petron",
    "name": "Petron Macapagal Blvd Baclaran Parañaque",
    "area": "Parañaque",
    "lat": 14.5303402,
    "lng": 120.9901034,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1312,
    "brand": "unioil",
    "name": "Unioil Macapagal Blvd Baclaran Parañaque",
    "area": "Parañaque",
    "lat": 14.5262558,
    "lng": 120.9941714,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1313,
    "brand": "unioil",
    "name": "Unioil Roxas Blvd Baclaran Parañaque",
    "area": "Parañaque",
    "lat": 14.5271894,
    "lng": 120.9940698,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1318,
    "brand": "shell",
    "name": "Shell Pasay",
    "area": "Pasay",
    "lat": 14.5522444,
    "lng": 120.9904488,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1320,
    "brand": "shell",
    "name": "Shell Quirino Ave Baclaran Parañaque",
    "area": "Parañaque",
    "lat": 14.5258478,
    "lng": 120.9968617,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1321,
    "brand": "ptt",
    "name": "PTT Osmeña Highway Bangkal Makati",
    "area": "Makati",
    "lat": 14.5461428,
    "lng": 121.013469,
    "prices": {
      "diesel": 125.22,
      "unleaded": 90.62,
      "egasoline": null,
      "premium95": 94.62,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1323,
    "brand": "shell",
    "name": "Shell Pasay",
    "area": "Pasay",
    "lat": 14.5377216,
    "lng": 120.9936861,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1327,
    "brand": "shell",
    "name": "Shell Macapagal Blvd Baclaran Parañaque",
    "area": "Parañaque",
    "lat": 14.530286,
    "lng": 120.9893108,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1332,
    "brand": "caltex",
    "name": "Caltex J.W. Diokno Blvd Baclaran Parañaque",
    "area": "Parañaque",
    "lat": 14.529811,
    "lng": 120.9843731,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 1333,
    "brand": "unioil",
    "name": "Unioil Osmeña Highway Pio del Pilar Makati",
    "area": "Makati",
    "lat": 14.5503531,
    "lng": 121.01114,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1334,
    "brand": "petron",
    "name": "Petron Osmeña Highway Pio del Pilar Makati",
    "area": "Makati",
    "lat": 14.5489818,
    "lng": 121.0118628,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1335,
    "brand": "petron",
    "name": "Petron Pasay",
    "area": "Pasay",
    "lat": 14.5544981,
    "lng": 120.9917069,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1336,
    "brand": "caltex",
    "name": "Caltex Arnaiz Ave Pio del Pilar Makati",
    "area": "Makati",
    "lat": 14.5509866,
    "lng": 121.010733,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 1340,
    "brand": "shell",
    "name": "Shell Pasay",
    "area": "Pasay",
    "lat": 14.5502667,
    "lng": 120.9844743,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1341,
    "brand": "shell",
    "name": "Shell Chino Roces Pio del Pilar Makati",
    "area": "Makati",
    "lat": 14.5539365,
    "lng": 121.0135537,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1342,
    "brand": "caltex",
    "name": "Caltex J.W. Diokno Blvd Baclaran Parañaque",
    "area": "Parañaque",
    "lat": 14.5276079,
    "lng": 120.9853365,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 1343,
    "brand": "unioil",
    "name": "Unioil Pasay",
    "area": "Pasay",
    "lat": 14.5531371,
    "lng": 120.9913038,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1344,
    "brand": "caltex",
    "name": "Caltex East Service Road W. Bicutan Taguig",
    "area": "Taguig",
    "lat": 14.50728,
    "lng": 121.035646,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 1345,
    "brand": "flyingv",
    "name": "Flying V Parañaque",
    "area": "Parañaque",
    "lat": 14.510616,
    "lng": 120.995169,
    "prices": {
      "diesel": 82.79,
      "unleaded": 84.54,
      "egasoline": null,
      "premium95": 88.34,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1346,
    "brand": "total",
    "name": "Total Parañaque",
    "area": "Parañaque",
    "lat": 14.517075,
    "lng": 120.994838,
    "prices": {
      "diesel": 121.92,
      "premiumDiesel": 124.61,
      "unleaded": 84.08,
      "egasoline": null,
      "premium95": 88.88,
      "premium97": 92.38,
      "kerosene": null
    }
  },
  {
    "id": 1347,
    "brand": "petron",
    "name": "Petron Airport Road Domestic Parañaque",
    "area": "Parañaque",
    "lat": 14.516162,
    "lng": 121.020459,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1348,
    "brand": "petron",
    "name": "Petron Parañaque",
    "area": "Parañaque",
    "lat": 14.502402,
    "lng": 121.038104,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1349,
    "brand": "shell",
    "name": "Shell Parañaque",
    "area": "Parañaque",
    "lat": 14.501456,
    "lng": 121.038635,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1350,
    "brand": "petron",
    "name": "Petron MIA Road NAIA Parañaque",
    "area": "Parañaque",
    "lat": 14.515693,
    "lng": 121.004336,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1351,
    "brand": "caltex",
    "name": "Caltex East Service Road Taguig",
    "area": "Taguig",
    "lat": 14.509417,
    "lng": 121.032919,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 1352,
    "brand": "caltex",
    "name": "Caltex Doña Soledad Avenue",
    "area": "Parañaque",
    "lat": 14.483553,
    "lng": 121.03307,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 1353,
    "brand": "shell",
    "name": "Shell Parañaque",
    "area": "Parañaque",
    "lat": 14.484048,
    "lng": 121.032883,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1354,
    "brand": "seaoil",
    "name": "Seaoil Parañaque",
    "area": "Parañaque",
    "lat": 14.504632,
    "lng": 121.035746,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 1355,
    "brand": "unioil",
    "name": "Unioil Parañaque",
    "area": "Parañaque",
    "lat": 14.459058,
    "lng": 121.031621,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1356,
    "brand": "caltex",
    "name": "Caltex Taguig",
    "area": "Taguig",
    "lat": 14.506074,
    "lng": 121.046969,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 1357,
    "brand": "seaoil",
    "name": "Seaoil Taguig",
    "area": "Taguig",
    "lat": 14.517552,
    "lng": 121.072885,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 1358,
    "brand": "shell",
    "name": "Shell Taguig",
    "area": "Taguig",
    "lat": 14.516645,
    "lng": 121.043084,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1359,
    "brand": "flyingv",
    "name": "Flying V Taguig",
    "area": "Taguig",
    "lat": 14.529856,
    "lng": 121.076876,
    "prices": {
      "diesel": 82.79,
      "unleaded": 84.54,
      "egasoline": null,
      "premium95": 88.34,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1360,
    "brand": "petron",
    "name": "Petron Taguig",
    "area": "Taguig",
    "lat": 14.540888,
    "lng": 121.088358,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1361,
    "brand": "petron",
    "name": "Petron Taguig",
    "area": "Taguig",
    "lat": 14.532001,
    "lng": 121.070146,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1362,
    "brand": "seaoil",
    "name": "Seaoil Taguig",
    "area": "Taguig",
    "lat": 14.513024,
    "lng": 121.054865,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 1363,
    "brand": "petron",
    "name": "Petron Taguig",
    "area": "Taguig",
    "lat": 14.492845,
    "lng": 121.061961,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1364,
    "brand": "caltex",
    "name": "Caltex Taguig",
    "area": "Taguig",
    "lat": 14.537867,
    "lng": 121.075135,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 1365,
    "brand": "shell",
    "name": "Shell Taguig",
    "area": "Taguig",
    "lat": 14.533228,
    "lng": 121.072583,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1368,
    "brand": "unioil",
    "name": "Unioil - East Service Road",
    "area": "Parañaque",
    "lat": 14.498155,
    "lng": 121.040278,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1369,
    "brand": "seaoil",
    "name": "Seaoil Muntinlupa",
    "area": "Muntinlupa",
    "lat": 14.399152,
    "lng": 121.046078,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 1370,
    "brand": "petron",
    "name": "Petron Muntinlupa",
    "area": "Muntinlupa",
    "lat": 14.420598,
    "lng": 121.033414,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1371,
    "brand": "total",
    "name": "Total Muntinlupa",
    "area": "Muntinlupa",
    "lat": 14.421268,
    "lng": 121.03365,
    "prices": {
      "diesel": 121.92,
      "premiumDiesel": 124.61,
      "unleaded": 84.08,
      "egasoline": null,
      "premium95": 88.88,
      "premium97": 92.38,
      "kerosene": null
    }
  },
  {
    "id": 1372,
    "brand": "unioil",
    "name": "Unioil Muntinlupa",
    "area": "Muntinlupa",
    "lat": 14.423473,
    "lng": 121.036368,
    "prices": {
      "diesel": 150,
      "unleaded": 90.5,
      "egasoline": 91.2,
      "premium95": 96.5,
      "premium97": null,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1373,
    "brand": "caltex",
    "name": "Caltex Muntinlupa",
    "area": "Muntinlupa",
    "lat": 14.381692,
    "lng": 121.04488,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 1374,
    "brand": "petron",
    "name": "Petron Muntinlupa",
    "area": "Muntinlupa",
    "lat": 14.414566,
    "lng": 121.04545,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1375,
    "brand": "phoenix",
    "name": "Phoenix Muntinlupa",
    "area": "Muntinlupa",
    "lat": 14.428634,
    "lng": 121.045063,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1376,
    "brand": "total",
    "name": "Total Muntinlupa",
    "area": "Muntinlupa",
    "lat": 14.434029,
    "lng": 121.044989,
    "prices": {
      "diesel": 121.92,
      "premiumDiesel": 124.61,
      "unleaded": 84.08,
      "egasoline": null,
      "premium95": 88.88,
      "premium97": 92.38,
      "kerosene": null
    }
  },
  {
    "id": 1377,
    "brand": "shell",
    "name": "Shell Muntinlupa",
    "area": "Muntinlupa",
    "lat": 14.443076,
    "lng": 121.0447,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1378,
    "brand": "petron",
    "name": "Petron Muntinlupa",
    "area": "Muntinlupa",
    "lat": 14.420229,
    "lng": 121.045901,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1379,
    "brand": "shell",
    "name": "Shell Muntinlupa",
    "area": "Muntinlupa",
    "lat": 14.413756,
    "lng": 121.046024,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1380,
    "brand": "shell",
    "name": "Shell Muntinlupa",
    "area": "Muntinlupa",
    "lat": 14.381145,
    "lng": 121.044609,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1381,
    "brand": "petron",
    "name": "Petron Muntinlupa",
    "area": "Muntinlupa",
    "lat": 14.384189,
    "lng": 121.044194,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1382,
    "brand": "petron",
    "name": "Petron Muntinlupa",
    "area": "Muntinlupa",
    "lat": 14.394581,
    "lng": 121.043684,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1383,
    "brand": "shell",
    "name": "Shell Muntinlupa",
    "area": "Muntinlupa",
    "lat": 14.394459,
    "lng": 121.0382,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1384,
    "brand": "caltex",
    "name": "Caltex Muntinlupa",
    "area": "Muntinlupa",
    "lat": 14.388284,
    "lng": 121.045676,
    "prices": {
      "diesel": 152.5,
      "premiumDiesel": 160,
      "unleaded": 98.95,
      "egasoline": null,
      "premium95": 106.6,
      "premium97": 110.1,
      "kerosene": 122.41
    }
  },
  {
    "id": 1386,
    "brand": "shell",
    "name": "Shell Muntinlupa",
    "area": "Muntinlupa",
    "lat": 14.448066,
    "lng": 121.04584,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1387,
    "brand": "seaoil",
    "name": "Seaoil Muntinlupa",
    "area": "Muntinlupa",
    "lat": 14.381215,
    "lng": 121.045021,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 93.5,
      "egasoline": 94.7,
      "premium95": 98.7,
      "premium97": 101.8,
      "kerosene": 128.54
    }
  },
  {
    "id": 1388,
    "brand": "phoenix",
    "name": "Phoenix C-5 Rd Pinagbuhatan Pasig",
    "area": "Pasig",
    "lat": 14.576011,
    "lng": 121.059286,
    "prices": {
      "diesel": 120.22,
      "unleaded": 81.08,
      "egasoline": 81.78,
      "premium95": 85.58,
      "premium97": 89.88,
      "kerosene": null,
      "premiumDiesel": null
    }
  },
  {
    "id": 1389,
    "brand": "petron",
    "name": "Petron MacArthur Highway Malabon",
    "area": "Malabon",
    "lat": 14.68125,
    "lng": 120.93814,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1391,
    "brand": "petron",
    "name": "Petron Tangos North Navotas",
    "area": "Navotas",
    "lat": 14.673451,
    "lng": 120.937836,
    "prices": {
      "diesel": 147.7,
      "premiumDiesel": 150.39,
      "unleaded": 92.9,
      "egasoline": null,
      "premium95": 95.3,
      "premium97": 104.5,
      "kerosene": 123.54
    }
  },
  {
    "id": 1397,
    "brand": "shell",
    "name": "Shell Marikina",
    "area": "Marikina",
    "lat": 14.624649,
    "lng": 121.131363,
    "prices": {
      "diesel": 158.6,
      "premiumDiesel": 160.6,
      "unleaded": 99.65,
      "egasoline": null,
      "premium95": 106.55,
      "premium97": 110,
      "kerosene": 126.81
    }
  },
  {
    "id": 1400,
    "brand": "caltex",
    "name": "Caltex Aguinaldo Highway Familyville",
    "area": "Bacoor",
    "lat": 14.44622,
    "lng": 120.95348,
    "prices": {
      "diesel": 152.9,
      "premiumDiesel": 160.4,
      "unleaded": 99.35,
      "egasoline": null,
      "premium95": 107,
      "premium97": 110.5,
      "kerosene": null
    }
  },
  {
    "id": 1401,
    "brand": "caltex",
    "name": "Caltex Molino Road Kaunlaran 2 Village",
    "area": "Bacoor",
    "lat": 14.38577,
    "lng": 120.97765,
    "prices": {
      "diesel": 152.9,
      "premiumDiesel": 160.4,
      "unleaded": 99.35,
      "egasoline": null,
      "premium95": 107,
      "premium97": 110.5,
      "kerosene": null
    }
  },
  {
    "id": 1403,
    "brand": "caltex",
    "name": "Caltex Molino Road Pangilin Compound",
    "area": "Bacoor",
    "lat": 14.43579,
    "lng": 120.97475,
    "prices": {
      "diesel": 152.9,
      "premiumDiesel": 160.4,
      "unleaded": 99.35,
      "egasoline": null,
      "premium95": 107,
      "premium97": 110.5,
      "kerosene": null
    }
  },
  {
    "id": 1404,
    "brand": "caltex",
    "name": "Caltex Tirona Highway JS Ville",
    "area": "Bacoor",
    "lat": 14.44787,
    "lng": 120.93991,
    "prices": {
      "diesel": 152.9,
      "premiumDiesel": 160.4,
      "unleaded": 99.35,
      "egasoline": null,
      "premium95": 107,
      "premium97": 110.5,
      "kerosene": null
    }
  },
  {
    "id": 1405,
    "brand": "cleanfuel",
    "name": "Cleanfuel Aguinaldo Highway New Niog Village",
    "area": "Bacoor",
    "lat": 14.45423,
    "lng": 120.95692,
    "prices": {
      "diesel": 90.74,
      "premiumDiesel": null,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1406,
    "brand": "cleanfuel",
    "name": "Cleanfuel Daang Hari Kaunlaran 2 Village",
    "area": "Bacoor",
    "lat": 14.38668,
    "lng": 120.97582,
    "prices": {
      "diesel": 90.74,
      "premiumDiesel": null,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1408,
    "brand": "flyingv",
    "name": "Flying V General Evangelista Street Sinbanali",
    "area": "Bacoor",
    "lat": 14.46009,
    "lng": 120.94876,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1409,
    "brand": "flyingv",
    "name": "Flying V I-A Street Maria Salud Village",
    "area": "Bacoor",
    "lat": 14.4441,
    "lng": 120.93169,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1410,
    "brand": "flyingv",
    "name": "Flying V Mambog Road Mambog",
    "area": "Bacoor",
    "lat": 14.42419,
    "lng": 120.95015,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1411,
    "brand": "flyingv",
    "name": "Flying V Molino Road Villa Maria",
    "area": "Bacoor",
    "lat": 14.40581,
    "lng": 120.97784,
    "prices": {
      "diesel": 151.45,
      "premiumDiesel": null,
      "unleaded": 99.4,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1412,
    "brand": "jetti",
    "name": "Jetti Arciaga Street Kaunlaran I",
    "area": "Bacoor",
    "lat": 14.41076,
    "lng": 120.97759,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1413,
    "brand": "jetti",
    "name": "Jetti Bacoor Boulevard Villa Angelina",
    "area": "Bacoor",
    "lat": 14.42509,
    "lng": 120.96562,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1414,
    "brand": "jetti",
    "name": "Jetti Daang Hari Kaunlaran 2 Village",
    "area": "Bacoor",
    "lat": 14.38743,
    "lng": 120.97111,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1415,
    "brand": "petron",
    "name": "Petron 8th Street Salinasville",
    "area": "Bacoor",
    "lat": 14.4351,
    "lng": 120.93754,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1416,
    "brand": "petron",
    "name": "Petron Aguinaldo Highway Familyville",
    "area": "Bacoor",
    "lat": 14.44664,
    "lng": 120.95371,
    "prices": {
      "diesel": 151.7,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1417,
    "brand": "petron",
    "name": "Petron Aguinaldo Highway Zapote II",
    "area": "Bacoor",
    "lat": 14.46264,
    "lng": 120.96393,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1418,
    "brand": "petron",
    "name": "Petron Bacoor Boulevard Addas 2A 2C",
    "area": "Bacoor",
    "lat": 14.40955,
    "lng": 120.96992,
    "prices": {
      "diesel": 151.2,
      "premiumDiesel": 154.2,
      "unleaded": 98.9,
      "egasoline": null,
      "premium95": 100.9,
      "premium97": 109.4,
      "kerosene": null
    }
  },
  {
    "id": 1420,
    "brand": "petron",
    "name": "Petron Bayanan Road Progressive Village 6",
    "area": "Bacoor",
    "lat": 14.42509,
    "lng": 120.97071,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1421,
    "brand": "petron",
    "name": "Petron Daang Hari Queens Row",
    "area": "Bacoor",
    "lat": 14.38088,
    "lng": 120.99281,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1423,
    "brand": "petron",
    "name": "Petron General Evangelista Street Sinbanali",
    "area": "Bacoor",
    "lat": 14.45965,
    "lng": 120.94638,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 100.8,
      "egasoline": null,
      "premium95": 102.8,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1424,
    "brand": "petron",
    "name": "Petron Tirona Highway Habay I",
    "area": "Bacoor",
    "lat": 14.4479,
    "lng": 120.94164,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1425,
    "brand": "petron",
    "name": "Petron Magdiwang Road Magdiwang",
    "area": "Bacoor",
    "lat": 14.40541,
    "lng": 120.98633,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1426,
    "brand": "petron",
    "name": "Petron Molino Road Duplex Homes",
    "area": "Bacoor",
    "lat": 14.38345,
    "lng": 120.97852,
    "prices": {
      "diesel": 151.8,
      "premiumDiesel": 154.8,
      "unleaded": 99.5,
      "egasoline": null,
      "premium95": 101.5,
      "premium97": 110.5,
      "kerosene": null
    }
  },
  {
    "id": 1427,
    "brand": "petron",
    "name": "Petron Molino Road Kaunlaran I",
    "area": "Bacoor",
    "lat": 14.40719,
    "lng": 120.97784,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1429,
    "brand": "petron",
    "name": "Petron Aguinaldo Highway Niog I",
    "area": "Bacoor",
    "lat": 14.45665,
    "lng": 120.9581,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 99.8,
      "egasoline": null,
      "premium95": 101.8,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1430,
    "brand": "petron",
    "name": "Petron Tirona Highway JS Ville",
    "area": "Bacoor",
    "lat": 14.44629,
    "lng": 120.94743,
    "prices": {
      "diesel": 151.7,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 99.8,
      "premium97": 102.8,
      "kerosene": null
    }
  },
  {
    "id": 1431,
    "brand": "phoenix",
    "name": "Phoenix Bacoor Boulevard Addas 2A 2C",
    "area": "Bacoor",
    "lat": 14.40775,
    "lng": 120.97285,
    "prices": {
      "diesel": 120.62,
      "premiumDiesel": null,
      "unleaded": 81.48,
      "egasoline": null,
      "premium95": 98.62,
      "premium97": 90.28,
      "kerosene": null
    }
  },
  {
    "id": 1433,
    "brand": "phoenix",
    "name": "Phoenix Magdiwang Road Magdiwang",
    "area": "Bacoor",
    "lat": 14.40559,
    "lng": 120.99024,
    "prices": {
      "diesel": 120.62,
      "premiumDiesel": null,
      "unleaded": 81.48,
      "egasoline": null,
      "premium95": 85.98,
      "premium97": 90.28,
      "kerosene": null
    }
  },
  {
    "id": 1434,
    "brand": "phoenix",
    "name": "Phoenix Molino Road Georgetown Heights 1",
    "area": "Bacoor",
    "lat": 14.37364,
    "lng": 120.98027,
    "prices": {
      "diesel": 120.62,
      "premiumDiesel": null,
      "unleaded": 81.48,
      "egasoline": null,
      "premium95": 85.98,
      "premium97": 90.28,
      "kerosene": null
    }
  },
  {
    "id": 1435,
    "brand": "ptt",
    "name": "PTT Bacoor Boulevard Kaunlaran I",
    "area": "Bacoor",
    "lat": 14.40645,
    "lng": 120.97734,
    "prices": {
      "diesel": 125.52,
      "premiumDiesel": null,
      "unleaded": 85.52,
      "egasoline": null,
      "premium95": 89,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1436,
    "brand": "shell",
    "name": "Shell A. B. Solis Road JS Ville",
    "area": "Bacoor",
    "lat": 14.44934,
    "lng": 120.94317,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1437,
    "brand": "shell",
    "name": "Shell Aguinaldo Highway Familyville",
    "area": "Bacoor",
    "lat": 14.44764,
    "lng": 120.95369,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1438,
    "brand": "shell",
    "name": "Shell Aguinaldo Highway Salinas II",
    "area": "Bacoor",
    "lat": 14.43376,
    "lng": 120.94778,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1439,
    "brand": "shell",
    "name": "Shell Bacoor Boulevard Addas 2 Village",
    "area": "Bacoor",
    "lat": 14.41857,
    "lng": 120.96756,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1442,
    "brand": "shell",
    "name": "Shell Daang Hari Molino",
    "area": "Bacoor",
    "lat": 14.38248,
    "lng": 120.98762,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1443,
    "brand": "shell",
    "name": "Shell Molino Road Molino Heights",
    "area": "Bacoor",
    "lat": 14.39842,
    "lng": 120.97758,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1444,
    "brand": "shell",
    "name": "Shell Saint Mary Street Duplex Homes",
    "area": "Bacoor",
    "lat": 14.37976,
    "lng": 120.97916,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1445,
    "brand": "shell",
    "name": "Shell Tirona Highway JS Ville",
    "area": "Bacoor",
    "lat": 14.44722,
    "lng": 120.94534,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1447,
    "brand": "total",
    "name": "Total General Evangelista Street Sinbanali",
    "area": "Bacoor",
    "lat": 14.45806,
    "lng": 120.93326,
    "prices": {
      "diesel": 122.32,
      "premiumDiesel": 125.01,
      "unleaded": 84.48,
      "egasoline": null,
      "premium95": 89.28,
      "premium97": 92.78,
      "kerosene": null
    }
  },
  {
    "id": 1448,
    "brand": "total",
    "name": "Total Molino Boulevard Mambog IV",
    "area": "Bacoor",
    "lat": 14.42559,
    "lng": 120.9578,
    "prices": {
      "diesel": 122.32,
      "premiumDiesel": 125.01,
      "unleaded": 84.48,
      "egasoline": null,
      "premium95": 89.28,
      "premium97": 92.78,
      "kerosene": null
    }
  },
  {
    "id": 1451,
    "brand": "unioil",
    "name": "Unioil Molino Road Georgetown Heights 1",
    "area": "Bacoor",
    "lat": 14.37227,
    "lng": 120.98051,
    "prices": {
      "diesel": 149.9,
      "premiumDiesel": null,
      "unleaded": 96.5,
      "egasoline": null,
      "premium95": 99.5,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1453,
    "brand": "unioil",
    "name": "Unioil Molino Road Molino IV",
    "area": "Bacoor",
    "lat": 14.36853,
    "lng": 120.98116,
    "prices": {
      "diesel": 149.9,
      "premiumDiesel": null,
      "unleaded": 96.5,
      "egasoline": null,
      "premium95": 99.5,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1460,
    "brand": "caltex",
    "name": "Caltex Aguinaldo Highway Salitran I",
    "area": "Dasmariñas",
    "lat": 14.35658,
    "lng": 120.93766,
    "prices": {
      "diesel": 152.9,
      "premiumDiesel": 160.4,
      "unleaded": 99.35,
      "egasoline": null,
      "premium95": 107,
      "premium97": 110.5,
      "kerosene": null
    }
  },
  {
    "id": 1461,
    "brand": "caltex",
    "name": "Caltex Aguinaldo Highway Salitran II",
    "area": "Dasmariñas",
    "lat": 14.3514,
    "lng": 120.93823,
    "prices": {
      "diesel": 152.9,
      "premiumDiesel": 160.4,
      "unleaded": 99.35,
      "egasoline": null,
      "premium95": 107,
      "premium97": 110.5,
      "kerosene": null
    }
  },
  {
    "id": 1462,
    "brand": "caltex",
    "name": "Caltex Aguinaldo Highway Salitran III",
    "area": "Dasmariñas",
    "lat": 14.34408,
    "lng": 120.93765,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 111.99,
      "unleaded": 91.88,
      "egasoline": null,
      "premium95": 99.53,
      "premium97": 103.03,
      "kerosene": null
    }
  },
  {
    "id": 1463,
    "brand": "caltex",
    "name": "Caltex Amuntay Road Poblacion",
    "area": "Dasmariñas",
    "lat": 14.32388,
    "lng": 120.93349,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 111.99,
      "unleaded": 91.88,
      "egasoline": null,
      "premium95": 99.53,
      "premium97": 103.03,
      "kerosene": null
    }
  },
  {
    "id": 1464,
    "brand": "caltex",
    "name": "Caltex Congressional Avenue Bagong Bayan",
    "area": "Dasmariñas",
    "lat": 14.33429,
    "lng": 120.95417,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 111.99,
      "unleaded": 91.88,
      "egasoline": null,
      "premium95": 99.53,
      "premium97": 103.03,
      "kerosene": null
    }
  },
  {
    "id": 1465,
    "brand": "flyingv",
    "name": "Flying V Paliparan Road Paliparan I",
    "area": "Dasmariñas",
    "lat": 14.32014,
    "lng": 120.98478,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1466,
    "brand": "flyingv",
    "name": "Flying V Paliparan Road Paliparan II",
    "area": "Dasmariñas",
    "lat": 14.29671,
    "lng": 120.9907,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1467,
    "brand": "jetti",
    "name": "Jetti F. Dela Cuesta Avenue Paliparan",
    "area": "Dasmariñas",
    "lat": 14.32107,
    "lng": 120.98342,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1468,
    "brand": "petron",
    "name": "Petron Aguinaldo Highway Poblacion",
    "area": "Dasmariñas",
    "lat": 14.33001,
    "lng": 120.93956,
    "prices": {
      "diesel": 157.7,
      "premiumDiesel": 160.7,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1469,
    "brand": "petron",
    "name": "Petron Aguinaldo Highway Sampaloc",
    "area": "Dasmariñas",
    "lat": 14.27807,
    "lng": 120.96383,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1470,
    "brand": "petron",
    "name": "Petron Aguinaldo Highway San Agustin I",
    "area": "Dasmariñas",
    "lat": 14.31597,
    "lng": 120.94429,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1471,
    "brand": "petron",
    "name": "Petron Aguinaldo Highway San Agustin II",
    "area": "Dasmariñas",
    "lat": 14.31241,
    "lng": 120.94931,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1472,
    "brand": "petron",
    "name": "Petron Don Placido Campos Avenue San Jose-Sabang",
    "area": "Dasmariñas",
    "lat": 14.33129,
    "lng": 120.93191,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1473,
    "brand": "petron",
    "name": "Petron Governor's Drive Langkaan",
    "area": "Dasmariñas",
    "lat": 14.29194,
    "lng": 120.9335,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 103.82,
      "unleaded": 85.86,
      "egasoline": null,
      "premium95": 90.66,
      "premium97": 94.16,
      "kerosene": null
    }
  },
  {
    "id": 1474,
    "brand": "petron",
    "name": "Petron Governor's Drive Pala-Pala",
    "area": "Dasmariñas",
    "lat": 14.29926,
    "lng": 120.96147,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 103.82,
      "unleaded": 85.86,
      "egasoline": null,
      "premium95": 87.66,
      "premium97": 83.36,
      "kerosene": null
    }
  },
  {
    "id": 1475,
    "brand": "petron",
    "name": "Petron Governor's Drive Paliparan",
    "area": "Dasmariñas",
    "lat": 14.28735,
    "lng": 120.98849,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 103.82,
      "unleaded": 85.86,
      "egasoline": null,
      "premium95": 90.66,
      "premium97": 94.16,
      "kerosene": null
    }
  },
  {
    "id": 1476,
    "brand": "petron",
    "name": "Petron Langkaan Road Langkaan",
    "area": "Dasmariñas",
    "lat": 14.28515,
    "lng": 120.94378,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1477,
    "brand": "petron",
    "name": "Petron Mangubat Avenue Sampaloc",
    "area": "Dasmariñas",
    "lat": 14.30011,
    "lng": 120.97473,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1478,
    "brand": "phoenix",
    "name": "Phoenix Aguinaldo Highway San Agustin",
    "area": "Dasmariñas",
    "lat": 14.30698,
    "lng": 120.95291,
    "prices": {
      "diesel": 120.62,
      "premiumDiesel": null,
      "unleaded": 81.48,
      "egasoline": null,
      "premium95": 85.98,
      "premium97": 90.28,
      "kerosene": null
    }
  },
  {
    "id": 1479,
    "brand": "phoenix",
    "name": "Phoenix Governor's Drive Paliparan",
    "area": "Dasmariñas",
    "lat": 14.28635,
    "lng": 120.99192,
    "prices": {
      "diesel": 86.94,
      "premiumDiesel": null,
      "unleaded": 81.15,
      "egasoline": null,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null
    }
  },
  {
    "id": 1480,
    "brand": "phoenix",
    "name": "Phoenix Jose Abad Santos Avenue Salawag",
    "area": "Dasmariñas",
    "lat": 14.35022,
    "lng": 120.96296,
    "prices": {
      "diesel": 120.62,
      "premiumDiesel": null,
      "unleaded": 81.48,
      "egasoline": null,
      "premium95": 85.98,
      "premium97": 90.28,
      "kerosene": null
    }
  },
  {
    "id": 1481,
    "brand": "phoenix",
    "name": "Phoenix Paliparan Road Paliparan",
    "area": "Dasmariñas",
    "lat": 14.30709,
    "lng": 120.99169,
    "prices": {
      "diesel": 120.62,
      "premiumDiesel": null,
      "unleaded": 81.48,
      "egasoline": null,
      "premium95": 85.98,
      "premium97": 90.28,
      "kerosene": null
    }
  },
  {
    "id": 1482,
    "brand": "ptt",
    "name": "PTT Governor's Drive Sampaloc",
    "area": "Dasmariñas",
    "lat": 14.29078,
    "lng": 120.97732,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1483,
    "brand": "seaoil",
    "name": "Seaoil Amuntay Road Poblacion",
    "area": "Dasmariñas",
    "lat": 14.31718,
    "lng": 120.93366,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 96,
      "egasoline": null,
      "premium95": 100.8,
      "premium97": 104.3,
      "kerosene": null
    }
  },
  {
    "id": 1484,
    "brand": "seaoil",
    "name": "Seaoil Governor's Drive Sampaloc",
    "area": "Dasmariñas",
    "lat": 14.30003,
    "lng": 120.96406,
    "prices": {
      "diesel": 101.64,
      "premiumDiesel": 104.33,
      "unleaded": 84.32,
      "egasoline": null,
      "premium95": 89.12,
      "premium97": 92.62,
      "kerosene": null
    }
  },
  {
    "id": 1485,
    "brand": "seaoil",
    "name": "Seaoil Jose Abad Santos Avenue Salawag",
    "area": "Dasmariñas",
    "lat": 14.35029,
    "lng": 120.96801,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 96,
      "egasoline": null,
      "premium95": 100.8,
      "premium97": 104.3,
      "kerosene": null
    }
  },
  {
    "id": 1486,
    "brand": "seaoil",
    "name": "Seaoil Jose Abad Santos Avenue Salitran",
    "area": "Dasmariñas",
    "lat": 14.3518,
    "lng": 120.94993,
    "prices": {
      "diesel": 149.45,
      "premiumDiesel": 156.74,
      "unleaded": 96,
      "egasoline": null,
      "premium95": 100.8,
      "premium97": 104.3,
      "kerosene": null
    }
  },
  {
    "id": 1487,
    "brand": "seaoil",
    "name": "Seaoil Paliparan Road Salawag",
    "area": "Dasmariñas",
    "lat": 14.35028,
    "lng": 120.9806,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 96,
      "egasoline": null,
      "premium95": 100.8,
      "premium97": 104.3,
      "kerosene": null
    }
  },
  {
    "id": 1488,
    "brand": "shell",
    "name": "Shell Aguinaldo Highway Salitran",
    "area": "Dasmariñas",
    "lat": 14.34413,
    "lng": 120.93708,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1489,
    "brand": "shell",
    "name": "Shell Governor's Drive Langkaan",
    "area": "Dasmariñas",
    "lat": 14.29558,
    "lng": 120.94463,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 106.13,
      "unleaded": 90.23,
      "egasoline": null,
      "premium95": 95.03,
      "premium97": 98.53,
      "kerosene": null
    }
  },
  {
    "id": 1490,
    "brand": "shell",
    "name": "Shell Governor's Drive Paliparan",
    "area": "Dasmariñas",
    "lat": 14.28666,
    "lng": 120.99007,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 106.13,
      "unleaded": 90.23,
      "egasoline": null,
      "premium95": 95.03,
      "premium97": 98.53,
      "kerosene": null
    }
  },
  {
    "id": 1491,
    "brand": "shell",
    "name": "Shell Governor's Drive Sampaloc",
    "area": "Dasmariñas",
    "lat": 14.2997,
    "lng": 120.9616,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 111.94,
      "unleaded": 90.23,
      "egasoline": null,
      "premium95": 98.33,
      "premium97": 101.33,
      "kerosene": null
    }
  },
  {
    "id": 1492,
    "brand": "shell",
    "name": "Shell Paliparan Road Paliparan",
    "area": "Dasmariñas",
    "lat": 14.31496,
    "lng": 120.98652,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 112.1,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1493,
    "brand": "shell",
    "name": "Shell Paliparan Road Salawag",
    "area": "Dasmariñas",
    "lat": 14.35228,
    "lng": 120.98085,
    "prices": {
      "diesel": 156.4,
      "premiumDiesel": 162.7,
      "unleaded": 106.4,
      "egasoline": null,
      "premium95": 114,
      "premium97": 116.5,
      "kerosene": null
    }
  },
  {
    "id": 1494,
    "brand": "total",
    "name": "Total Don Placido Campos Avenue San Jose-Sabang",
    "area": "Dasmariñas",
    "lat": 14.33975,
    "lng": 120.92833,
    "prices": {
      "diesel": 94.14,
      "premiumDiesel": 87.57,
      "unleaded": 83.28,
      "egasoline": null,
      "premium95": 88.08,
      "premium97": 91.58,
      "kerosene": null
    }
  },
  {
    "id": 1495,
    "brand": "total",
    "name": "Total Governor's Drive Langkaan",
    "area": "Dasmariñas",
    "lat": 14.29857,
    "lng": 120.94941,
    "prices": {
      "diesel": 94.14,
      "premiumDiesel": 87.57,
      "unleaded": 83.28,
      "egasoline": null,
      "premium95": 88.08,
      "premium97": 91.58,
      "kerosene": null
    }
  },
  {
    "id": 1496,
    "brand": "total",
    "name": "Total Jose Abad Santos Avenue Salitran",
    "area": "Dasmariñas",
    "lat": 14.35051,
    "lng": 120.9399,
    "prices": {
      "diesel": 122.32,
      "premiumDiesel": 125.01,
      "unleaded": 84.48,
      "egasoline": null,
      "premium95": 89.28,
      "premium97": 92.78,
      "kerosene": null
    }
  },
  {
    "id": 1497,
    "brand": "unioil",
    "name": "Unioil Governor's Drive Langkaan I",
    "area": "Dasmariñas",
    "lat": 14.29357,
    "lng": 120.93888,
    "prices": {
      "diesel": 101.26,
      "premiumDiesel": null,
      "unleaded": 86.66,
      "egasoline": null,
      "premium95": 89.66,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1498,
    "brand": "unioil",
    "name": "Unioil Governor's Drive Langkaan II",
    "area": "Dasmariñas",
    "lat": 14.29186,
    "lng": 120.93136,
    "prices": {
      "diesel": 101.26,
      "premiumDiesel": null,
      "unleaded": 86.66,
      "egasoline": null,
      "premium95": 89.66,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1500,
    "brand": "caltex",
    "name": "Caltex Aguinaldo Highway Bayan Luma IV",
    "area": "Imus",
    "lat": 14.4138782,
    "lng": 120.9406687,
    "prices": {
      "diesel": 152.9,
      "premiumDiesel": 160.4,
      "unleaded": 99.35,
      "egasoline": null,
      "premium95": 107,
      "premium97": 110.5,
      "kerosene": null
    }
  },
  {
    "id": 1501,
    "brand": "caltex",
    "name": "Caltex Bucandala-Alapan Road Alapan II-B",
    "area": "Imus",
    "lat": 14.4037339,
    "lng": 120.9174535,
    "prices": {
      "diesel": 152.9,
      "premiumDiesel": 160.4,
      "unleaded": 99.35,
      "egasoline": null,
      "premium95": 107,
      "premium97": 110.5,
      "kerosene": null
    }
  },
  {
    "id": 1502,
    "brand": "caltex",
    "name": "Caltex Champions Loop Pasong Buaya I",
    "area": "Imus",
    "lat": 14.38254,
    "lng": 120.9612048,
    "prices": {
      "diesel": 152.9,
      "premiumDiesel": 160.4,
      "unleaded": 99.35,
      "egasoline": null,
      "premium95": 107,
      "premium97": 110.5,
      "kerosene": null
    }
  },
  {
    "id": 1503,
    "brand": "caltex",
    "name": "Caltex Yengco Street Poblacion IV-C",
    "area": "Imus",
    "lat": 14.4257699,
    "lng": 120.9346236,
    "prices": {
      "diesel": 152.9,
      "premiumDiesel": 160.4,
      "unleaded": 99.35,
      "egasoline": null,
      "premium95": 107,
      "premium97": 110.5,
      "kerosene": null
    }
  },
  {
    "id": 1504,
    "brand": "caltex",
    "name": "Caltex Maliksi Avenue Carsadang Bago II",
    "area": "Imus",
    "lat": 14.4236389,
    "lng": 120.923399,
    "prices": {
      "diesel": 152.9,
      "premiumDiesel": 160.4,
      "unleaded": 99.35,
      "egasoline": null,
      "premium95": 107,
      "premium97": 110.5,
      "kerosene": null
    }
  },
  {
    "id": 1505,
    "brand": "petron",
    "name": "Petron Aguinaldo Highway Anabu II-F",
    "area": "Imus",
    "lat": 14.3637146,
    "lng": 120.9382544,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 160.8,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 104.8,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1506,
    "brand": "petron",
    "name": "Petron Aguinaldo Highway Palico IV",
    "area": "Imus",
    "lat": 14.4247523,
    "lng": 120.9435075,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1507,
    "brand": "petron",
    "name": "Petron Daang Hari Pasong Buaya I",
    "area": "Imus",
    "lat": 14.3811569,
    "lng": 120.9573121,
    "prices": {
      "diesel": 151.8,
      "premiumDiesel": 154.9,
      "unleaded": 103.8,
      "egasoline": null,
      "premium95": 105.8,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1508,
    "brand": "petron",
    "name": "Petron N. de Guzman Street Sheltertown",
    "area": "Imus",
    "lat": 14.4149705,
    "lng": 120.9505452,
    "prices": {
      "diesel": 152.1,
      "premiumDiesel": 155.3,
      "unleaded": 100.8,
      "egasoline": null,
      "premium95": 102.8,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1509,
    "brand": "petron",
    "name": "Petron Pedro Delos Reyes Malagasang I-G",
    "area": "Imus",
    "lat": 14.3937295,
    "lng": 120.9180836,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1510,
    "brand": "phoenix",
    "name": "Phoenix Buhay na Tubig Road Buhay na Tubig",
    "area": "Imus",
    "lat": 14.4126727,
    "lng": 120.9518585,
    "prices": {
      "diesel": 120.62,
      "premiumDiesel": null,
      "unleaded": 81.48,
      "egasoline": null,
      "premium95": 85.98,
      "premium97": 90.28,
      "kerosene": null
    }
  },
  {
    "id": 1511,
    "brand": "phoenix",
    "name": "Phoenix Malagasang Road Malagasang II-F",
    "area": "Imus",
    "lat": 14.357689,
    "lng": 120.9259787,
    "prices": {
      "diesel": 120.62,
      "premiumDiesel": null,
      "unleaded": 81.48,
      "egasoline": null,
      "premium95": 85.98,
      "premium97": 90.28,
      "kerosene": null
    }
  },
  {
    "id": 1512,
    "brand": "ptt",
    "name": "PTT Alapan Road Pag-asa II",
    "area": "Imus",
    "lat": 14.4323422,
    "lng": 120.9159914,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1513,
    "brand": "ptt",
    "name": "PTT Tamsui Avenue Bayan Luma II",
    "area": "Imus",
    "lat": 14.4194673,
    "lng": 120.9383967,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1514,
    "brand": "seaoil",
    "name": "Seaoil Aguinaldo Highway Anabu I-E",
    "area": "Imus",
    "lat": 14.3921736,
    "lng": 120.939917,
    "prices": {
      "diesel": 151.45,
      "premiumDiesel": 156.74,
      "unleaded": 89.9,
      "egasoline": null,
      "premium95": 90.9,
      "premium97": 104.3,
      "kerosene": null
    }
  },
  {
    "id": 1515,
    "brand": "seaoil",
    "name": "Seaoil Aguinaldo Highway Anabu II-D",
    "area": "Imus",
    "lat": 14.3718521,
    "lng": 120.9385009,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 96,
      "egasoline": null,
      "premium95": 100.8,
      "premium97": 104.3,
      "kerosene": null
    }
  },
  {
    "id": 1516,
    "brand": "seaoil",
    "name": "Seaoil Buhay na Tubig Road",
    "area": "Imus",
    "lat": 14.4217922,
    "lng": 120.9464664,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 96,
      "egasoline": null,
      "premium95": 100.8,
      "premium97": 104.3,
      "kerosene": null
    }
  },
  {
    "id": 1517,
    "brand": "seaoil",
    "name": "Seaoil Daang Hari Mariano Espeleta III",
    "area": "Imus",
    "lat": 14.3891438,
    "lng": 120.9678355,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 96,
      "egasoline": null,
      "premium95": 100.8,
      "premium97": 104.3,
      "kerosene": null
    }
  },
  {
    "id": 1518,
    "brand": "seaoil",
    "name": "Seaoil Yengco Street Medicion II-A",
    "area": "Imus",
    "lat": 14.4412751,
    "lng": 120.9251214,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 96,
      "egasoline": null,
      "premium95": 100.8,
      "premium97": 104.3,
      "kerosene": null
    }
  },
  {
    "id": 1519,
    "brand": "seaoil",
    "name": "Seaoil Maliksi Avenue Carsadang Bago II",
    "area": "Imus",
    "lat": 14.4300473,
    "lng": 120.9221944,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 96,
      "egasoline": null,
      "premium95": 100.8,
      "premium97": 104.3,
      "kerosene": null
    }
  },
  {
    "id": 1520,
    "brand": "shell",
    "name": "Shell Aguinaldo Highway Anabu I-A",
    "area": "Imus",
    "lat": 14.404245,
    "lng": 120.940616,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1521,
    "brand": "shell",
    "name": "Shell Aguinaldo Highway Anabu II-C",
    "area": "Imus",
    "lat": 14.377973,
    "lng": 120.9388121,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1522,
    "brand": "shell",
    "name": "Shell Aguinaldo Highway Pasong Santol",
    "area": "Imus",
    "lat": 14.368052,
    "lng": 120.938718,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1523,
    "brand": "shell",
    "name": "Shell Buhay na Tubig Road Buhay na Tubig",
    "area": "Imus",
    "lat": 14.416416,
    "lng": 120.948397,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 106.5,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1524,
    "brand": "shell",
    "name": "Shell Daang Hari Mariano Espeleta III",
    "area": "Imus",
    "lat": 14.387517,
    "lng": 120.9638915,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1525,
    "brand": "shell",
    "name": "Shell Castañeda Street Poblacion II-A",
    "area": "Imus",
    "lat": 14.4301478,
    "lng": 120.9384102,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1526,
    "brand": "shell",
    "name": "Shell Imus Boulevard Malagasang I-G",
    "area": "Imus",
    "lat": 14.3942558,
    "lng": 120.918115,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1527,
    "brand": "total",
    "name": "Total Balimbing Drive Medicion I-B",
    "area": "Imus",
    "lat": 14.4283856,
    "lng": 120.9326646,
    "prices": {
      "diesel": 122.32,
      "premiumDiesel": 125.01,
      "unleaded": 84.48,
      "egasoline": null,
      "premium95": 89.28,
      "premium97": 92.78,
      "kerosene": null
    }
  },
  {
    "id": 1528,
    "brand": "total",
    "name": "Total Buhay na Tubig Road Buhay na Tubig",
    "area": "Imus",
    "lat": 14.4195601,
    "lng": 120.9469902,
    "prices": {
      "diesel": 122.32,
      "premiumDiesel": 125.01,
      "unleaded": 84.48,
      "egasoline": null,
      "premium95": 89.28,
      "premium97": 92.78,
      "kerosene": null
    }
  },
  {
    "id": 1529,
    "brand": "unioil",
    "name": "Unioil Aguinaldo Highway Anabu II-A",
    "area": "Imus",
    "lat": 14.3862107,
    "lng": 120.9396971,
    "prices": {
      "diesel": 149.9,
      "premiumDiesel": null,
      "unleaded": 96.5,
      "egasoline": null,
      "premium95": 99.5,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1530,
    "brand": "unioil",
    "name": "Unioil Daang Hari Pasong Buaya I",
    "area": "Imus",
    "lat": 14.3869623,
    "lng": 120.9614816,
    "prices": {
      "diesel": 149.9,
      "premiumDiesel": null,
      "unleaded": 96.5,
      "egasoline": null,
      "premium95": 99.5,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1531,
    "brand": "unioil",
    "name": "Unioil Lancaster Boulevard Alapan II-A",
    "area": "Imus",
    "lat": 14.4039983,
    "lng": 120.9046098,
    "prices": {
      "diesel": 149.9,
      "premiumDiesel": null,
      "unleaded": 96.9,
      "egasoline": null,
      "premium95": 99.5,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1532,
    "brand": "caltex",
    "name": "Caltex Antero Soriano Highway Bacao II",
    "area": "General Trias",
    "lat": 14.4122979,
    "lng": 120.8795065,
    "prices": {
      "diesel": 152.9,
      "premiumDiesel": 160.4,
      "unleaded": 99.35,
      "egasoline": null,
      "premium95": 107,
      "premium97": 110.5,
      "kerosene": null
    }
  },
  {
    "id": 1533,
    "brand": "caltex",
    "name": "Caltex General Trias Drive San Juan I",
    "area": "General Trias",
    "lat": 14.3871873,
    "lng": 120.8701863,
    "prices": {
      "diesel": 152.9,
      "premiumDiesel": 160.4,
      "unleaded": 99.35,
      "egasoline": null,
      "premium95": 107,
      "premium97": 110.5,
      "kerosene": null
    }
  },
  {
    "id": 1534,
    "brand": "caltex",
    "name": "Caltex General Trias Drive Tejero",
    "area": "General Trias",
    "lat": 14.3969433,
    "lng": 120.8625698,
    "prices": {
      "diesel": 152.9,
      "premiumDiesel": 160.4,
      "unleaded": 99.35,
      "egasoline": null,
      "premium95": 107,
      "premium97": 110.5,
      "kerosene": null
    }
  },
  {
    "id": 1535,
    "brand": "jetti",
    "name": "Jetti Arnaldo Highway Sunny Brook Phase Ⅰ",
    "area": "General Trias",
    "lat": 14.3119049,
    "lng": 120.916054,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1536,
    "brand": "jetti",
    "name": "Jetti De los Reyes Avenue Biclatan",
    "area": "General Trias",
    "lat": 14.278466,
    "lng": 120.9155803,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1537,
    "brand": "jetti",
    "name": "Jetti San Francisco Street Biclatan",
    "area": "General Trias",
    "lat": 14.279439,
    "lng": 120.9027278,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1538,
    "brand": "petron",
    "name": "Petron Antero Soriano Highway Tejero",
    "area": "General Trias",
    "lat": 14.395931,
    "lng": 120.8628216,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1539,
    "brand": "petron",
    "name": "Petron Arnaldo Highway Pasong Camachile II",
    "area": "General Trias",
    "lat": 14.3529419,
    "lng": 120.9007035,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 99.1,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1540,
    "brand": "petron",
    "name": "Petron Arnaldo Highway San Francisco",
    "area": "General Trias",
    "lat": 14.3103085,
    "lng": 120.9164463,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1541,
    "brand": "petron",
    "name": "Petron De los Reyes Avenue Biclatan",
    "area": "General Trias",
    "lat": 14.2684863,
    "lng": 120.9147159,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1542,
    "brand": "petron",
    "name": "Petron Luna Street Bacao II",
    "area": "General Trias",
    "lat": 14.409445,
    "lng": 120.881997,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1543,
    "brand": "petron",
    "name": "Petron General Trias Drive San Juan I",
    "area": "General Trias",
    "lat": 14.3854931,
    "lng": 120.8727626,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1544,
    "brand": "petron",
    "name": "Petron Gov. Ferrer Drive Manggahan",
    "area": "General Trias",
    "lat": 14.2965881,
    "lng": 120.9083098,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1545,
    "brand": "petron",
    "name": "Petron Governor's Drive Manggahan",
    "area": "General Trias",
    "lat": 14.2923044,
    "lng": 120.9107976,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 103.82,
      "unleaded": 85.86,
      "egasoline": null,
      "premium95": 90.66,
      "premium97": 94.16,
      "kerosene": null
    }
  },
  {
    "id": 1546,
    "brand": "petron",
    "name": "Petron Javalera",
    "area": "General Trias",
    "lat": 14.2662005,
    "lng": 120.9141752,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1547,
    "brand": "phoenix",
    "name": "Phoenix F. Y. Manalo Road Navarro",
    "area": "General Trias",
    "lat": 14.3798704,
    "lng": 120.8893006,
    "prices": {
      "diesel": 86.94,
      "premiumDiesel": null,
      "unleaded": 81.15,
      "egasoline": null,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null
    }
  },
  {
    "id": 1548,
    "brand": "ptt",
    "name": "PTT General Trias Drive San Juan I",
    "area": "General Trias",
    "lat": 14.388687,
    "lng": 120.8674744,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1549,
    "brand": "ptt",
    "name": "PTT Real Street Governor Ferrer",
    "area": "General Trias",
    "lat": 14.3768688,
    "lng": 120.8793143,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1550,
    "brand": "seaoil",
    "name": "Seaoil Antero Soriano Highway Tejero",
    "area": "General Trias",
    "lat": 14.3975773,
    "lng": 120.868827,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 96,
      "egasoline": null,
      "premium95": 100.8,
      "premium97": 104.3,
      "kerosene": null
    }
  },
  {
    "id": 1551,
    "brand": "seaoil",
    "name": "Seaoil Gov. Ferrer Drive Buenavista III",
    "area": "General Trias",
    "lat": 14.3031089,
    "lng": 120.9042176,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 96,
      "egasoline": null,
      "premium95": 100.8,
      "premium97": 104.3,
      "kerosene": null
    }
  },
  {
    "id": 1552,
    "brand": "seaoil",
    "name": "Seaoil Gov. Ferrer Drive Pinagtipunan",
    "area": "General Trias",
    "lat": 14.3714927,
    "lng": 120.8794831,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 96,
      "egasoline": null,
      "premium95": 100.8,
      "premium97": 104.3,
      "kerosene": null
    }
  },
  {
    "id": 1553,
    "brand": "seaoil",
    "name": "Seaoil Governor's Drive Manggahan",
    "area": "General Trias",
    "lat": 14.2924363,
    "lng": 120.9122426,
    "prices": {
      "diesel": 101.64,
      "premiumDiesel": 104.33,
      "unleaded": 84.32,
      "egasoline": null,
      "premium95": 89.12,
      "premium97": 92.62,
      "kerosene": null
    }
  },
  {
    "id": 1554,
    "brand": "seaoil",
    "name": "Seaoil Tirona Street Sulucan",
    "area": "General Trias",
    "lat": 14.3511494,
    "lng": 120.9020213,
    "prices": {
      "diesel": 146.75,
      "premiumDiesel": 156.74,
      "unleaded": 96.38,
      "egasoline": null,
      "premium95": 96.88,
      "premium97": 97.38,
      "kerosene": null
    }
  },
  {
    "id": 1555,
    "brand": "shell",
    "name": "Shell Antero Soriano Highway Bacao II",
    "area": "General Trias",
    "lat": 14.4091695,
    "lng": 120.8787945,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1556,
    "brand": "shell",
    "name": "Shell Arnaldo Highway Pasong Camachile II",
    "area": "General Trias",
    "lat": 14.3537627,
    "lng": 120.9001885,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1557,
    "brand": "shell",
    "name": "Shell Arnaldo Highway San Francisco",
    "area": "General Trias",
    "lat": 14.3042866,
    "lng": 120.9220347,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1558,
    "brand": "shell",
    "name": "Shell Sunterra Place",
    "area": "General Trias",
    "lat": 14.3708626,
    "lng": 120.8886503,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1559,
    "brand": "shell",
    "name": "Shell General Trias Drive Tejero",
    "area": "General Trias",
    "lat": 14.3979478,
    "lng": 120.8621234,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1560,
    "brand": "shell",
    "name": "Shell Gov. Ferrer Drive Pasong Kawayan I",
    "area": "General Trias",
    "lat": 14.3444902,
    "lng": 120.8816772,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1561,
    "brand": "shell",
    "name": "Shell Sampalucan Street San Juan I",
    "area": "General Trias",
    "lat": 14.3850493,
    "lng": 120.8733631,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1562,
    "brand": "total",
    "name": "Total Antero Soriano Highway Bacao II",
    "area": "General Trias",
    "lat": 14.4154599,
    "lng": 120.8808186,
    "prices": {
      "diesel": 94.14,
      "premiumDiesel": 87.57,
      "unleaded": 83.28,
      "egasoline": null,
      "premium95": 88.08,
      "premium97": 91.58,
      "kerosene": null
    }
  },
  {
    "id": 1563,
    "brand": "total",
    "name": "Total General Trias Drive Tejero",
    "area": "General Trias",
    "lat": 14.3929602,
    "lng": 120.864216,
    "prices": {
      "diesel": 94.14,
      "premiumDiesel": 87.57,
      "unleaded": 83.28,
      "egasoline": null,
      "premium95": 88.08,
      "premium97": 91.58,
      "kerosene": null
    }
  },
  {
    "id": 1564,
    "brand": "unioil",
    "name": "Unioil Antero Soriano Highway Bacao II",
    "area": "General Trias",
    "lat": 14.4174041,
    "lng": 120.8818336,
    "prices": {
      "diesel": 149.9,
      "premiumDiesel": null,
      "unleaded": 96.5,
      "egasoline": null,
      "premium95": 99.5,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1565,
    "brand": "caltex",
    "name": "Caltex Antero Soriano Highway Tabon III",
    "area": "Kawit",
    "lat": 14.434194,
    "lng": 120.9005111,
    "prices": {
      "diesel": 152.9,
      "premiumDiesel": 160.4,
      "unleaded": 99.35,
      "egasoline": null,
      "premium95": 107,
      "premium97": 110.5,
      "kerosene": null
    }
  },
  {
    "id": 1566,
    "brand": "cleanfuel",
    "name": "Cleanfuel Antero Soriano Highway Gahak",
    "area": "Kawit",
    "lat": 14.4386782,
    "lng": 120.9092367,
    "prices": {
      "diesel": 90.74,
      "premiumDiesel": null,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1567,
    "brand": "flyingv",
    "name": "Flying V Tirona Highway Binakayan",
    "area": "Kawit",
    "lat": 14.4489825,
    "lng": 120.9196361,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1568,
    "brand": "jetti",
    "name": "Jetti Antero Soriano Highway Tabon I",
    "area": "Kawit",
    "lat": 14.4382365,
    "lng": 120.9077111,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1569,
    "brand": "jetti",
    "name": "Jetti Tirona Highway Marulas",
    "area": "Kawit",
    "lat": 14.4461079,
    "lng": 120.9098126,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1570,
    "brand": "petron",
    "name": "Petron Antero Soriano Highway Gahak",
    "area": "Kawit",
    "lat": 14.4399992,
    "lng": 120.9102405,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1571,
    "brand": "petron",
    "name": "Petron Covelandia Road Binakayan",
    "area": "Kawit",
    "lat": 14.4490101,
    "lng": 120.916319,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1572,
    "brand": "petron",
    "name": "Petron Kalayaan Road Batong Dalig",
    "area": "Kawit",
    "lat": 14.4207631,
    "lng": 120.8981986,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1573,
    "brand": "petron",
    "name": "Petron Noveleta-Rosario Diversion Road Magdalo",
    "area": "Kawit",
    "lat": 14.4285233,
    "lng": 120.8890392,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1574,
    "brand": "petron",
    "name": "Petron Toclong Road Tabon I",
    "area": "Kawit",
    "lat": 14.4382332,
    "lng": 120.9089877,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1575,
    "brand": "phoenix",
    "name": "Phoenix Antero Soriano Highway",
    "area": "Kawit",
    "lat": 14.424621,
    "lng": 120.8893792,
    "prices": {
      "diesel": 86.94,
      "premiumDiesel": null,
      "unleaded": 81.15,
      "egasoline": null,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null
    }
  },
  {
    "id": 1576,
    "brand": "phoenix",
    "name": "Phoenix Antero Soriano Highway Tabon I",
    "area": "Kawit",
    "lat": 14.4368784,
    "lng": 120.9064042,
    "prices": {
      "diesel": 86.94,
      "premiumDiesel": null,
      "unleaded": 81.15,
      "egasoline": null,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null
    }
  },
  {
    "id": 1577,
    "brand": "phoenix",
    "name": "Phoenix Covelandia Road Binakayan",
    "area": "Kawit",
    "lat": 14.4583128,
    "lng": 120.9244213,
    "prices": {
      "diesel": 120.62,
      "premiumDiesel": null,
      "unleaded": 81.48,
      "egasoline": null,
      "premium95": 85.98,
      "premium97": 90.28,
      "kerosene": null
    }
  },
  {
    "id": 1578,
    "brand": "phoenix",
    "name": "Phoenix Kalayaan Road Batong Dalig",
    "area": "Kawit",
    "lat": 14.4280622,
    "lng": 120.8941697,
    "prices": {
      "diesel": 86.94,
      "premiumDiesel": null,
      "unleaded": 81.15,
      "egasoline": null,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null
    }
  },
  {
    "id": 1579,
    "brand": "ptt",
    "name": "PTT Magdiwang Highway Magdalo",
    "area": "Kawit",
    "lat": 14.4369126,
    "lng": 120.8914608,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1580,
    "brand": "seaoil",
    "name": "Seaoil Antero Soriano Highway Tabon III",
    "area": "Kawit",
    "lat": 14.4359042,
    "lng": 120.9035335,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 96,
      "egasoline": null,
      "premium95": 100.8,
      "premium97": 104.3,
      "kerosene": null
    }
  },
  {
    "id": 1581,
    "brand": "seaoil",
    "name": "Seaoil Covelandia Road Binakayan",
    "area": "Kawit",
    "lat": 14.4524063,
    "lng": 120.9256658,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 96,
      "egasoline": null,
      "premium95": 100.8,
      "premium97": 104.3,
      "kerosene": null
    }
  },
  {
    "id": 1582,
    "brand": "seaoil",
    "name": "Seaoil Lancaster Boulevard",
    "area": "Kawit",
    "lat": 14.4137335,
    "lng": 120.9008939,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 96,
      "egasoline": null,
      "premium95": 100.8,
      "premium97": 104.3,
      "kerosene": null
    }
  },
  {
    "id": 1583,
    "brand": "shell",
    "name": "Shell Antero Soriano Highway Tabon I",
    "area": "Kawit",
    "lat": 14.4384203,
    "lng": 120.9080621,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1584,
    "brand": "shell",
    "name": "Shell Antero Soriano Highway Tabon III",
    "area": "Kawit",
    "lat": 14.432256,
    "lng": 120.8984322,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1585,
    "brand": "shell",
    "name": "Shell Lancaster Boulevard Alapan II-A",
    "area": "Kawit",
    "lat": 14.4091928,
    "lng": 120.9021575,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1586,
    "brand": "shell",
    "name": "Shell Tirona Highway Binakayan",
    "area": "Kawit",
    "lat": 14.4501659,
    "lng": 120.9257178,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1587,
    "brand": "shell",
    "name": "Shell Toclong-San Sebastian Road San Sebastian",
    "area": "Kawit",
    "lat": 14.4174142,
    "lng": 120.8987162,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1588,
    "brand": "total",
    "name": "Total Antero Soriano Highway Tabon I",
    "area": "Kawit",
    "lat": 14.437317,
    "lng": 120.9061005,
    "prices": {
      "diesel": 94.14,
      "premiumDiesel": 87.57,
      "unleaded": 83.28,
      "egasoline": null,
      "premium95": 88.08,
      "premium97": 91.58,
      "kerosene": null
    }
  },
  {
    "id": 1589,
    "brand": "total",
    "name": "Total Kalayaan Road",
    "area": "Kawit",
    "lat": 14.4178427,
    "lng": 120.8992142,
    "prices": {
      "diesel": 94.14,
      "premiumDiesel": 87.57,
      "unleaded": 83.28,
      "egasoline": null,
      "premium95": 88.08,
      "premium97": 91.58,
      "kerosene": null
    }
  },
  {
    "id": 1590,
    "brand": "caltex",
    "name": "Caltex Trece Martires-Indang Road Inocencio (Bagong Pook)",
    "area": "Trece Martires",
    "lat": 14.2442285,
    "lng": 120.87847,
    "prices": {
      "diesel": 152.9,
      "premiumDiesel": 160.4,
      "unleaded": 99.35,
      "egasoline": null,
      "premium95": 107,
      "premium97": 110.5,
      "kerosene": null
    }
  },
  {
    "id": 1591,
    "brand": "cleanfuel",
    "name": "Cleanfuel Governor's Drive Conchu (Lagundian)",
    "area": "Trece Martires",
    "lat": 14.2798495,
    "lng": 120.8806379,
    "prices": {
      "diesel": 90.74,
      "premiumDiesel": null,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1592,
    "brand": "jetti",
    "name": "Jetti Trece Martires-Indang Road Luciano",
    "area": "Trece Martires",
    "lat": 14.2786273,
    "lng": 120.8692102,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1593,
    "brand": "petron",
    "name": "Petron Calle Vicedo Inocencio (Bagong Pook)",
    "area": "Trece Martires",
    "lat": 14.2525673,
    "lng": 120.8774781,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 101.9,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1594,
    "brand": "petron",
    "name": "Petron Tanza-Trece Martires Road De Ocampo (Quintana I)",
    "area": "Trece Martires",
    "lat": 14.300469,
    "lng": 120.8639192,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1595,
    "brand": "phoenix",
    "name": "Phoenix Trece Martires-Indang Road Inocencio (Bagong Pook)",
    "area": "Trece Martires",
    "lat": 14.2515185,
    "lng": 120.877735,
    "prices": {
      "diesel": 86.94,
      "premiumDiesel": null,
      "unleaded": 81.15,
      "egasoline": null,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null
    }
  },
  {
    "id": 1596,
    "brand": "ptt",
    "name": "PTT Governor's Drive Perez (Lucbanan)",
    "area": "Trece Martires",
    "lat": 14.2805016,
    "lng": 120.8832571,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1597,
    "brand": "seaoil",
    "name": "Seaoil Trece Martires-Indang Road Inocencio (Bagong Pook)",
    "area": "Trece Martires",
    "lat": 14.2705195,
    "lng": 120.8736628,
    "prices": {
      "diesel": 147.25,
      "premiumDiesel": 156.74,
      "unleaded": 88.6,
      "egasoline": null,
      "premium95": 100.8,
      "premium97": 91.1,
      "kerosene": null
    }
  },
  {
    "id": 1598,
    "brand": "shell",
    "name": "Shell Governor's Drive Perez (Lucbanan)",
    "area": "Trece Martires",
    "lat": 14.2805759,
    "lng": 120.8870311,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 106.13,
      "unleaded": 90.23,
      "egasoline": null,
      "premium95": 95.03,
      "premium97": 98.53,
      "kerosene": null
    }
  },
  {
    "id": 1599,
    "brand": "shell",
    "name": "Shell Governor's Drive San Agustin",
    "area": "Trece Martires",
    "lat": 14.2824789,
    "lng": 120.8692206,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 106.13,
      "unleaded": 90.23,
      "egasoline": null,
      "premium95": 95.03,
      "premium97": 98.53,
      "kerosene": null
    }
  },
  {
    "id": 1600,
    "brand": "shell",
    "name": "Shell Trece Martires-Indang Road Inocencio (Bagong Pook)",
    "area": "Trece Martires",
    "lat": 14.2506386,
    "lng": 120.8777453,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1601,
    "brand": "total",
    "name": "Total Governor's Drive Gregorio (Aliang)",
    "area": "Trece Martires",
    "lat": 14.2797148,
    "lng": 120.87468,
    "prices": {
      "diesel": 94.14,
      "premiumDiesel": 87.57,
      "unleaded": 83.28,
      "egasoline": null,
      "premium95": 88.08,
      "premium97": 91.58,
      "kerosene": null
    }
  },
  {
    "id": 1602,
    "brand": "caltex",
    "name": "Caltex Governor's Drive Cabilang Baybay",
    "area": "Carmona",
    "lat": 14.3126286,
    "lng": 121.0464981,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 111.99,
      "unleaded": 91.88,
      "egasoline": null,
      "premium95": 99.53,
      "premium97": 103.03,
      "kerosene": null
    }
  },
  {
    "id": 1603,
    "brand": "petron",
    "name": "Petron Governor's Drive Mabuhay",
    "area": "Carmona",
    "lat": 14.2993561,
    "lng": 121.0205502,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 103.82,
      "unleaded": 85.86,
      "egasoline": null,
      "premium95": 90.66,
      "premium97": 94.16,
      "kerosene": null
    }
  },
  {
    "id": 1604,
    "brand": "petron",
    "name": "Petron Governor's Drive Maduya",
    "area": "Carmona",
    "lat": 14.3183544,
    "lng": 121.0614395,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 98.72,
      "unleaded": 85.86,
      "egasoline": null,
      "premium95": 87.96,
      "premium97": 86.96,
      "kerosene": null
    }
  },
  {
    "id": 1605,
    "brand": "petron",
    "name": "Petron Governor's Drive Maduya",
    "area": "Carmona",
    "lat": 14.3249936,
    "lng": 121.0660077,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 103.82,
      "unleaded": 85.86,
      "egasoline": null,
      "premium95": 90.66,
      "premium97": 94.16,
      "kerosene": null
    }
  },
  {
    "id": 1606,
    "brand": "petron",
    "name": "Petron Russia Alley Milagrosa",
    "area": "Carmona",
    "lat": 14.301901,
    "lng": 121.0376621,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1607,
    "brand": "seaoil",
    "name": "Seaoil Governor's Drive Bancal",
    "area": "Carmona",
    "lat": 14.2964842,
    "lng": 121.017813,
    "prices": {
      "diesel": 101.64,
      "premiumDiesel": 104.33,
      "unleaded": 84.32,
      "egasoline": null,
      "premium95": 89.12,
      "premium97": 92.62,
      "kerosene": null
    }
  },
  {
    "id": 1608,
    "brand": "shell",
    "name": "Shell 8th Street Maduya",
    "area": "Carmona",
    "lat": 14.3247443,
    "lng": 121.075228,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1609,
    "brand": "shell",
    "name": "Shell Governor's Drive Bancal",
    "area": "Carmona",
    "lat": 14.2811568,
    "lng": 121.0051289,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 106.13,
      "unleaded": 90.23,
      "egasoline": null,
      "premium95": 95.03,
      "premium97": 98.53,
      "kerosene": null
    }
  },
  {
    "id": 1610,
    "brand": "shell",
    "name": "Shell Governor's Drive Bancal",
    "area": "Carmona",
    "lat": 14.2892197,
    "lng": 121.0117171,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 106.13,
      "unleaded": 90.23,
      "egasoline": null,
      "premium95": 95.03,
      "premium97": 98.53,
      "kerosene": null
    }
  },
  {
    "id": 1611,
    "brand": "shell",
    "name": "Shell Governor's Drive Mabuhay",
    "area": "Carmona",
    "lat": 14.3102558,
    "lng": 121.0360506,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 106.13,
      "unleaded": 90.23,
      "egasoline": null,
      "premium95": 95.03,
      "premium97": 98.53,
      "kerosene": null
    }
  },
  {
    "id": 1612,
    "brand": "total",
    "name": "Total Governor's Drive Cabilang Baybay",
    "area": "Carmona",
    "lat": 14.3134826,
    "lng": 121.0474196,
    "prices": {
      "diesel": 94.14,
      "premiumDiesel": 87.57,
      "unleaded": 83.28,
      "egasoline": null,
      "premium95": 88.08,
      "premium97": 91.58,
      "kerosene": null
    }
  },
  {
    "id": 1613,
    "brand": "unioil",
    "name": "Unioil Governor's Drive Bancal",
    "area": "Carmona",
    "lat": 14.2885751,
    "lng": 121.0117548,
    "prices": {
      "diesel": 101.26,
      "premiumDiesel": null,
      "unleaded": 86.66,
      "egasoline": null,
      "premium95": 89.66,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1614,
    "brand": "petron",
    "name": "Petron Cavite Economic Zone Drive Tejeros Convention",
    "area": "Rosario",
    "lat": 14.4086336,
    "lng": 120.8659525,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1615,
    "brand": "petron",
    "name": "Petron General Trias Drive Tejeros Convention",
    "area": "Rosario",
    "lat": 14.413533,
    "lng": 120.8570977,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1616,
    "brand": "petron",
    "name": "Petron Marseilla Street Poblacion",
    "area": "Rosario",
    "lat": 14.4173486,
    "lng": 120.8551662,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1617,
    "brand": "ptt",
    "name": "PTT Marseilla Street Silangan I",
    "area": "Rosario",
    "lat": 14.4214425,
    "lng": 120.8604139,
    "prices": {
      "diesel": 90.01,
      "premiumDiesel": 92.7,
      "unleaded": 82.99,
      "egasoline": null,
      "premium95": 87.79,
      "premium97": 91.29,
      "kerosene": null
    }
  },
  {
    "id": 1618,
    "brand": "petron",
    "name": "Petron Santa Lucia Street Tejeros Convention",
    "area": "Rosario",
    "lat": 14.4109472,
    "lng": 120.8557282,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1619,
    "brand": "phoenix",
    "name": "Phoenix Marseilla Street Bagbag II",
    "area": "Rosario",
    "lat": 14.4232888,
    "lng": 120.8643699,
    "prices": {
      "diesel": 86.94,
      "premiumDiesel": null,
      "unleaded": 81.15,
      "egasoline": null,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null
    }
  },
  {
    "id": 1620,
    "brand": "total",
    "name": "Total Padre Burgos Street Kanluran",
    "area": "Rosario",
    "lat": 14.4180622,
    "lng": 120.8511309,
    "prices": {
      "diesel": 94.14,
      "premiumDiesel": 87.57,
      "unleaded": 83.28,
      "egasoline": null,
      "premium95": 88.08,
      "premium97": 91.58,
      "kerosene": null
    }
  },
  {
    "id": 1621,
    "brand": "cleanfuel",
    "name": "Cleanfuel Antero Soriano Highway Sahud Ulan",
    "area": "Tanza",
    "lat": 14.3674121,
    "lng": 120.8190565,
    "prices": {
      "diesel": 90.74,
      "premiumDiesel": null,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1622,
    "brand": "flyingv",
    "name": "Flying V Antero Soriano Highway Vista Acacia Homes Subdivision",
    "area": "Tanza",
    "lat": 14.386502,
    "lng": 120.8443172,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1623,
    "brand": "flyingv",
    "name": "Flying V Santa Cruz Street Barangay I",
    "area": "Tanza",
    "lat": 14.3998361,
    "lng": 120.8575501,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1624,
    "brand": "jetti",
    "name": "Jetti Tanza-Trece Martires Road Neuville Tanza",
    "area": "Tanza",
    "lat": 14.37045,
    "lng": 120.854408,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1625,
    "brand": "petron",
    "name": "Petron Antero Soriano Highway Daang Amaya I",
    "area": "Tanza",
    "lat": 14.3917026,
    "lng": 120.8518718,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1626,
    "brand": "petron",
    "name": "Petron Rosal Street Daang Amaya I",
    "area": "Tanza",
    "lat": 14.3914219,
    "lng": 120.8547083,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1627,
    "brand": "petron",
    "name": "Petron Tanza-Trece Martires Road Bukal",
    "area": "Tanza",
    "lat": 14.3515092,
    "lng": 120.8598779,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1628,
    "brand": "phoenix",
    "name": "Phoenix Antero Soriano Highway Vista Acacia Homes Subdivision",
    "area": "Tanza",
    "lat": 14.3886011,
    "lng": 120.8469428,
    "prices": {
      "diesel": 86.94,
      "premiumDiesel": null,
      "unleaded": 81.15,
      "egasoline": null,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null
    }
  },
  {
    "id": 1629,
    "brand": "ptt",
    "name": "PTT Bukal Road Bucal",
    "area": "Tanza",
    "lat": 14.391011,
    "lng": 120.8632739,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1630,
    "brand": "seaoil",
    "name": "Seaoil Antero Soriano Highway Vista Acacia Homes Subdivision",
    "area": "Tanza",
    "lat": 14.3824655,
    "lng": 120.8396028,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 96,
      "egasoline": null,
      "premium95": 100.8,
      "premium97": 104.3,
      "kerosene": null
    }
  },
  {
    "id": 1631,
    "brand": "seaoil",
    "name": "Seaoil San Agustin Street Barangay III",
    "area": "Tanza",
    "lat": 14.3935488,
    "lng": 120.8529821,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 96,
      "egasoline": null,
      "premium95": 100.8,
      "premium97": 104.3,
      "kerosene": null
    }
  },
  {
    "id": 1632,
    "brand": "shell",
    "name": "Shell Antero Soriano Highway Postema",
    "area": "Tanza",
    "lat": 14.3732035,
    "lng": 120.8266885,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1633,
    "brand": "shell",
    "name": "Shell Tanza-Trece Martires Road Bukal",
    "area": "Tanza",
    "lat": 14.3634812,
    "lng": 120.8556602,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1634,
    "brand": "total",
    "name": "Total Capipisa Road Tres Cruses",
    "area": "Tanza",
    "lat": 14.3507843,
    "lng": 120.7974434,
    "prices": {
      "diesel": 94.14,
      "premiumDiesel": 87.57,
      "unleaded": 83.28,
      "egasoline": null,
      "premium95": 88.08,
      "premium97": 91.58,
      "kerosene": null
    }
  },
  {
    "id": 1635,
    "brand": "total",
    "name": "Total Tanza-Trece Martires Road Daang Amaya I",
    "area": "Tanza",
    "lat": 14.3868969,
    "lng": 120.8539928,
    "prices": {
      "diesel": 94.14,
      "premiumDiesel": 87.57,
      "unleaded": 83.28,
      "egasoline": null,
      "premium95": 88.08,
      "premium97": 91.58,
      "kerosene": null
    }
  },
  {
    "id": 1636,
    "brand": "unioil",
    "name": "Unioil Antero Soriano Highway Vista Acacia Homes Subdivision",
    "area": "Tanza",
    "lat": 14.3881619,
    "lng": 120.8471249,
    "prices": {
      "diesel": 149.9,
      "premiumDiesel": null,
      "unleaded": 96.5,
      "egasoline": null,
      "premium95": 99.5,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1637,
    "brand": "unioil",
    "name": "Unioil Tanza-Trece Martires Road De Ocampo (Quintana I)",
    "area": "Tanza",
    "lat": 14.312175,
    "lng": 120.8619499,
    "prices": {
      "diesel": 149.9,
      "premiumDiesel": null,
      "unleaded": 96.5,
      "egasoline": null,
      "premium95": 99.5,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1638,
    "brand": "caltex",
    "name": "Caltex Aguinaldo Highway Lalaan I",
    "area": "Silang",
    "lat": 14.1888588,
    "lng": 120.9618704,
    "prices": {
      "diesel": 153.7,
      "premiumDiesel": 161.2,
      "unleaded": 100.25,
      "egasoline": null,
      "premium95": 107.9,
      "premium97": 111.4,
      "kerosene": null
    }
  },
  {
    "id": 1639,
    "brand": "caltex",
    "name": "Caltex J. P. Rizal Street Poblacion II",
    "area": "Silang",
    "lat": 14.2189276,
    "lng": 120.9732879,
    "prices": {
      "diesel": 153.7,
      "premiumDiesel": 161.2,
      "unleaded": 100.25,
      "egasoline": null,
      "premium95": 107.9,
      "premium97": 111.4,
      "kerosene": null
    }
  },
  {
    "id": 1640,
    "brand": "caltex",
    "name": "Caltex P. Antonio Avenue Poblacion V",
    "area": "Silang",
    "lat": 14.2188118,
    "lng": 120.9687076,
    "prices": {
      "diesel": 153.7,
      "premiumDiesel": 161.2,
      "unleaded": 100.25,
      "egasoline": null,
      "premium95": 107.9,
      "premium97": 111.4,
      "kerosene": null
    }
  },
  {
    "id": 1641,
    "brand": "caltex",
    "name": "Caltex Santa Rosa-Tagaytay Road Purok 5",
    "area": "Silang",
    "lat": 14.1833745,
    "lng": 121.0126662,
    "prices": {
      "diesel": 153.7,
      "premiumDiesel": 161.2,
      "unleaded": 100.25,
      "egasoline": null,
      "premium95": 107.9,
      "premium97": 111.4,
      "kerosene": null
    }
  },
  {
    "id": 1642,
    "brand": "cleanfuel",
    "name": "Cleanfuel Santa Rosa-Tagaytay Road Pasong Langka",
    "area": "Silang",
    "lat": 14.1658718,
    "lng": 120.9998093,
    "prices": {
      "diesel": 90.74,
      "premiumDiesel": null,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": 80.34,
      "kerosene": null
    }
  },
  {
    "id": 1643,
    "brand": "jetti",
    "name": "Jetti Silang-Banaybanay Road Tubuan II",
    "area": "Silang",
    "lat": 14.2137717,
    "lng": 120.9683611,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1644,
    "brand": "petron",
    "name": "Petron Aguinaldo Highway Biga I",
    "area": "Silang",
    "lat": 14.2455371,
    "lng": 120.9760188,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1645,
    "brand": "petron",
    "name": "Petron Aguinaldo Highway Lalaan I",
    "area": "Silang",
    "lat": 14.1870628,
    "lng": 120.9615659,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1646,
    "brand": "petron",
    "name": "Petron Munting Ilog Road Poblacion II",
    "area": "Silang",
    "lat": 14.2176267,
    "lng": 120.981813,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1647,
    "brand": "petron",
    "name": "Petron Santa Rosa-Tagaytay Road Tartaria",
    "area": "Silang",
    "lat": 14.2238416,
    "lng": 121.0387303,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1648,
    "brand": "petron",
    "name": "Petron Santa Rosa-Tagaytay Road Puting Kahoy",
    "area": "Silang",
    "lat": 14.2093248,
    "lng": 121.025818,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1649,
    "brand": "phoenix",
    "name": "Phoenix Aguinaldo Highway Lalaan I",
    "area": "Silang",
    "lat": 14.200201,
    "lng": 120.9649701,
    "prices": {
      "diesel": 86.94,
      "premiumDiesel": null,
      "unleaded": 81.15,
      "egasoline": null,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null
    }
  },
  {
    "id": 1650,
    "brand": "phoenix",
    "name": "Phoenix Aguinaldo Highway Purok 5",
    "area": "Silang",
    "lat": 14.1418192,
    "lng": 120.9555459,
    "prices": {
      "diesel": 86.94,
      "premiumDiesel": null,
      "unleaded": 81.15,
      "egasoline": null,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null
    }
  },
  {
    "id": 1651,
    "brand": "seaoil",
    "name": "Seaoil Aguinaldo Highway San Miguel I",
    "area": "Silang",
    "lat": 14.2311797,
    "lng": 120.9713706,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 96,
      "egasoline": null,
      "premium95": 100.8,
      "premium97": 104.3,
      "kerosene": null
    }
  },
  {
    "id": 1652,
    "brand": "seaoil",
    "name": "Seaoil Bayacal Street Sabutan",
    "area": "Silang",
    "lat": 14.2311461,
    "lng": 120.9757509,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 96,
      "egasoline": null,
      "premium95": 100.8,
      "premium97": 104.3,
      "kerosene": null
    }
  },
  {
    "id": 1653,
    "brand": "seaoil",
    "name": "Seaoil Maguyam Road Maguyam",
    "area": "Silang",
    "lat": 14.275683,
    "lng": 121.0062113,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 96,
      "egasoline": null,
      "premium95": 100.8,
      "premium97": 104.3,
      "kerosene": null
    }
  },
  {
    "id": 1654,
    "brand": "seaoil",
    "name": "Seaoil Pulong Bunga Road Pulong Bunga",
    "area": "Silang",
    "lat": 14.1969896,
    "lng": 120.9817686,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 96,
      "egasoline": null,
      "premium95": 100.8,
      "premium97": 104.3,
      "kerosene": null
    }
  },
  {
    "id": 1655,
    "brand": "seaoil",
    "name": "Seaoil Santa Rosa-Tagaytay Road Sitio Muzon",
    "area": "Silang",
    "lat": 14.225509,
    "lng": 121.0442128,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 96,
      "egasoline": null,
      "premium95": 100.8,
      "premium97": 104.3,
      "kerosene": null
    }
  },
  {
    "id": 1656,
    "brand": "shell",
    "name": "Shell Aguinaldo Highway Lalaan I",
    "area": "Silang",
    "lat": 14.184551,
    "lng": 120.961204,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1657,
    "brand": "shell",
    "name": "Shell Aguinaldo Highway Purok 5",
    "area": "Silang",
    "lat": 14.1358568,
    "lng": 120.9559411,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1658,
    "brand": "shell",
    "name": "Shell Cardiac Hill Inchican",
    "area": "Silang",
    "lat": 14.2422858,
    "lng": 121.0440634,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1659,
    "brand": "shell",
    "name": "Shell J. P. Rizal Street Poblacion II",
    "area": "Silang",
    "lat": 14.2201853,
    "lng": 120.9737231,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1660,
    "brand": "shell",
    "name": "Shell Riviera Avenue San Vicente II",
    "area": "Silang",
    "lat": 14.2279636,
    "lng": 120.9703919,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1661,
    "brand": "shell",
    "name": "Shell Santa Rosa-Tagaytay Road Pasong Langka",
    "area": "Silang",
    "lat": 14.162719,
    "lng": 120.9976884,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1662,
    "brand": "shell",
    "name": "Shell Santa Rosa-Tagaytay Road Lumil",
    "area": "Silang",
    "lat": 14.1722165,
    "lng": 121.0017426,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1663,
    "brand": "shell",
    "name": "Shell Santa Rosa-Tagaytay Road Puting Kahoy",
    "area": "Silang",
    "lat": 14.2191296,
    "lng": 121.0358963,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1664,
    "brand": "total",
    "name": "Total Aguinaldo Highway Poblacion IV",
    "area": "Silang",
    "lat": 14.2241478,
    "lng": 120.9690224,
    "prices": {
      "diesel": 94.14,
      "premiumDiesel": 87.57,
      "unleaded": 83.28,
      "egasoline": null,
      "premium95": 88.08,
      "premium97": 91.58,
      "kerosene": null
    }
  },
  {
    "id": 1665,
    "brand": "unioil",
    "name": "Unioil Aguinaldo Highway Biga I",
    "area": "Silang",
    "lat": 14.243502,
    "lng": 120.9750629,
    "prices": {
      "diesel": 149.9,
      "premiumDiesel": null,
      "unleaded": 96.5,
      "egasoline": null,
      "premium95": 99.5,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1666,
    "brand": "unioil",
    "name": "Unioil Aguinaldo Highway Lalaan I",
    "area": "Silang",
    "lat": 14.1768514,
    "lng": 120.9607772,
    "prices": {
      "diesel": 149.9,
      "premiumDiesel": null,
      "unleaded": 96.5,
      "egasoline": null,
      "premium95": 99.5,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1667,
    "brand": "unioil",
    "name": "Unioil Santa Rosa-Tagaytay Road Puting Kahoy",
    "area": "Silang",
    "lat": 14.1471783,
    "lng": 120.9929523,
    "prices": {
      "diesel": 149.9,
      "premiumDiesel": null,
      "unleaded": 96.5,
      "egasoline": null,
      "premium95": 99.5,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1668,
    "brand": "unioil",
    "name": "Unioil Santa Rosa-Tagaytay Road Pasong Langka",
    "area": "Silang",
    "lat": 14.1619403,
    "lng": 120.997335,
    "prices": {
      "diesel": 149.9,
      "premiumDiesel": null,
      "unleaded": 96.5,
      "egasoline": null,
      "premium95": 99.5,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1669,
    "brand": "caltex",
    "name": "Caltex Dr. Salud Street Remelville Subdivision",
    "area": "Noveleta",
    "lat": 14.42816,
    "lng": 120.881998,
    "prices": {
      "diesel": 152.9,
      "premiumDiesel": 160.4,
      "unleaded": 99.35,
      "egasoline": null,
      "premium95": 107,
      "premium97": 110.5,
      "kerosene": null
    }
  },
  {
    "id": 1670,
    "brand": "caltex",
    "name": "Caltex Manila-Cavite Road Chua Subdivision",
    "area": "Noveleta",
    "lat": 14.431233,
    "lng": 120.878923,
    "prices": {
      "diesel": 152.9,
      "premiumDiesel": 160.4,
      "unleaded": 99.35,
      "egasoline": null,
      "premium95": 107,
      "premium97": 110.5,
      "kerosene": null
    }
  },
  {
    "id": 1671,
    "brand": "petron",
    "name": "Petron Marseilla Street Salcedo II",
    "area": "Noveleta",
    "lat": 14.426489,
    "lng": 120.874808,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1672,
    "brand": "ptt",
    "name": "PTT Antero Soriano Highway Santa Rosa II",
    "area": "Noveleta",
    "lat": 14.422673,
    "lng": 120.886543,
    "prices": {
      "diesel": 125.52,
      "premiumDiesel": null,
      "unleaded": 85.52,
      "egasoline": null,
      "premium95": 89,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1673,
    "brand": "seaoil",
    "name": "Seaoil Marseilla Street Chua Subdivision",
    "area": "Noveleta",
    "lat": 14.427639,
    "lng": 120.879805,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 96,
      "egasoline": null,
      "premium95": 100.8,
      "premium97": 104.3,
      "kerosene": null
    }
  },
  {
    "id": 1674,
    "brand": "shell",
    "name": "Shell Magdiwang Highway Chua Subdivision",
    "area": "Noveleta",
    "lat": 14.428776,
    "lng": 120.882199,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1675,
    "brand": "total",
    "name": "Total Antonio Luna Street Chua Subdivision",
    "area": "Noveleta",
    "lat": 14.423398,
    "lng": 120.88281,
    "prices": {
      "diesel": 94.14,
      "premiumDiesel": 87.57,
      "unleaded": 83.28,
      "egasoline": null,
      "premium95": 88.08,
      "premium97": 91.58,
      "kerosene": null
    }
  },
  {
    "id": 1676,
    "brand": "caltex",
    "name": "Caltex Calubcob",
    "area": "Naic",
    "lat": 14.298417,
    "lng": 120.788696,
    "prices": {
      "diesel": 152.9,
      "premiumDiesel": 160.4,
      "unleaded": 99.35,
      "egasoline": null,
      "premium95": 107,
      "premium97": 110.5,
      "kerosene": null
    }
  },
  {
    "id": 1677,
    "brand": "cleanfuel",
    "name": "Cleanfuel Governor's Drive",
    "area": "Naic",
    "lat": 14.293357,
    "lng": 120.753977,
    "prices": {
      "diesel": 90.74,
      "premiumDiesel": null,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1678,
    "brand": "flyingv",
    "name": "Flying V Governor's Drive Malainen Bago",
    "area": "Naic",
    "lat": 14.307295,
    "lng": 120.76755,
    "prices": {
      "diesel": 100.45,
      "premiumDiesel": null,
      "unleaded": 85.21,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1679,
    "brand": "jetti",
    "name": "Jetti Antero Soriano Highway Lontoc",
    "area": "Naic",
    "lat": 14.341078,
    "lng": 120.790933,
    "prices": {
      "diesel": 86.74,
      "premiumDiesel": null,
      "unleaded": 77.97,
      "egasoline": null,
      "premium95": 82.77,
      "premium97": 86.27,
      "kerosene": null
    }
  },
  {
    "id": 1680,
    "brand": "jetti",
    "name": "Jetti Munting Mapino",
    "area": "Naic",
    "lat": 14.330466,
    "lng": 120.768921,
    "prices": {
      "diesel": 86.74,
      "premiumDiesel": null,
      "unleaded": 77.97,
      "egasoline": null,
      "premium95": 82.77,
      "premium97": 86.27,
      "kerosene": null
    }
  },
  {
    "id": 1681,
    "brand": "petron",
    "name": "Petron Antero Soriano Highway Ibayo Silangan",
    "area": "Naic",
    "lat": 14.323093,
    "lng": 120.77161,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1682,
    "brand": "phoenix",
    "name": "Phoenix Antero Soriano Highway Munting Mapino",
    "area": "Naic",
    "lat": 14.329547,
    "lng": 120.778894,
    "prices": {
      "diesel": 86.94,
      "premiumDiesel": null,
      "unleaded": 81.15,
      "egasoline": null,
      "premium95": 98.29,
      "premium97": 89.95,
      "kerosene": null
    }
  },
  {
    "id": 1683,
    "brand": "ptt",
    "name": "PTT Antero Soriano Highway Munting Mapino",
    "area": "Naic",
    "lat": 14.3309,
    "lng": 120.78064,
    "prices": {
      "diesel": 125.52,
      "premiumDiesel": null,
      "unleaded": 85.52,
      "egasoline": null,
      "premium95": 89,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1684,
    "brand": "ptt",
    "name": "PTT Naic-Indang Road Halang",
    "area": "Naic",
    "lat": 14.303453,
    "lng": 120.777784,
    "prices": {
      "diesel": 125.52,
      "premiumDiesel": null,
      "unleaded": 85.52,
      "egasoline": null,
      "premium95": 89,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1685,
    "brand": "seaoil",
    "name": "Seaoil Antero Soriano Highway Lontoc",
    "area": "Naic",
    "lat": 14.342828,
    "lng": 120.791392,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 96,
      "egasoline": null,
      "premium95": 100.8,
      "premium97": 104.3,
      "kerosene": null
    }
  },
  {
    "id": 1686,
    "brand": "seaoil",
    "name": "Seaoil Governor's Drive Cabuco",
    "area": "Naic",
    "lat": 14.321363,
    "lng": 120.773354,
    "prices": {
      "diesel": 101.64,
      "premiumDiesel": 104.33,
      "unleaded": 84.32,
      "egasoline": null,
      "premium95": 89.12,
      "premium97": 92.62,
      "kerosene": null
    }
  },
  {
    "id": 1687,
    "brand": "shell",
    "name": "Shell Sabang Road Gomez-Zamora",
    "area": "Naic",
    "lat": 14.322371,
    "lng": 120.768606,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1688,
    "brand": "total",
    "name": "Total Governor's Drive Humbac",
    "area": "Naic",
    "lat": 14.319111,
    "lng": 120.771432,
    "prices": {
      "diesel": 94.14,
      "premiumDiesel": 87.57,
      "unleaded": 83.28,
      "egasoline": null,
      "premium95": 88.08,
      "premium97": 91.58,
      "kerosene": null
    }
  },
  {
    "id": 1689,
    "brand": "caltex",
    "name": "Caltex P. Burgos Avenue Barangay 39",
    "area": "Cavite City",
    "lat": 14.47913,
    "lng": 120.896963,
    "prices": {
      "diesel": 152.9,
      "premiumDiesel": 160.4,
      "unleaded": 99.35,
      "egasoline": null,
      "premium95": 107,
      "premium97": 110.5,
      "kerosene": null
    }
  },
  {
    "id": 1690,
    "brand": "petron",
    "name": "Petron 1898 Avenue San Antonio",
    "area": "Cavite City",
    "lat": 14.493139,
    "lng": 120.905423,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1691,
    "brand": "petron",
    "name": "Petron Caridad",
    "area": "Cavite City",
    "lat": 14.47453,
    "lng": 120.895515,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1692,
    "brand": "petron",
    "name": "Petron Manila-Cavite Road Santa Cruz",
    "area": "Cavite City",
    "lat": 14.465225,
    "lng": 120.883313,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1693,
    "brand": "petron",
    "name": "Petron P. Burgos Avenue Barangay 34 (FSL)",
    "area": "Cavite City",
    "lat": 14.478076,
    "lng": 120.893918,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1694,
    "brand": "petron",
    "name": "Petron P. Burgos Avenue Barangay 34 (Bz)",
    "area": "Cavite City",
    "lat": 14.478585,
    "lng": 120.895121,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1695,
    "brand": "phoenix",
    "name": "Phoenix Saint Raphael Street Dalahican",
    "area": "Cavite City",
    "lat": 14.463745,
    "lng": 120.882726,
    "prices": {
      "diesel": 86.94,
      "premiumDiesel": null,
      "unleaded": 81.15,
      "egasoline": null,
      "premium95": 98.29,
      "premium97": 89.95,
      "kerosene": null
    }
  },
  {
    "id": 1696,
    "brand": "ptt",
    "name": "PTT Magcauas Street Caridad",
    "area": "Cavite City",
    "lat": 14.476697,
    "lng": 120.891531,
    "prices": {
      "diesel": 125.52,
      "premiumDiesel": null,
      "unleaded": 85.52,
      "egasoline": null,
      "premium95": 89,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1697,
    "brand": "seaoil",
    "name": "Seaoil Salamanca Street San Roque",
    "area": "Cavite City",
    "lat": 14.484619,
    "lng": 120.902577,
    "prices": {
      "diesel": 101.64,
      "premiumDiesel": 104.33,
      "unleaded": 84.32,
      "egasoline": null,
      "premium95": 89.12,
      "premium97": 92.62,
      "kerosene": null
    }
  },
  {
    "id": 1698,
    "brand": "seaoil",
    "name": "Seaoil P. Burgos Avenue Barangay 34",
    "area": "Cavite City",
    "lat": 14.477718,
    "lng": 120.89392,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 96,
      "egasoline": null,
      "premium95": 100.8,
      "premium97": 104.3,
      "kerosene": null
    }
  },
  {
    "id": 1699,
    "brand": "shell",
    "name": "Shell Manila-Cavite Road Dalahican",
    "area": "Cavite City",
    "lat": 14.468242,
    "lng": 120.885212,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1700,
    "brand": "shell",
    "name": "Shell Manila-Cavite Road Santa Cruz",
    "area": "Cavite City",
    "lat": 14.4721,
    "lng": 120.887415,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1701,
    "brand": "total",
    "name": "Total P. Burgos Avenue Barangay 31",
    "area": "Cavite City",
    "lat": 14.476124,
    "lng": 120.890191,
    "prices": {
      "diesel": 94.14,
      "premiumDiesel": 87.57,
      "unleaded": 83.28,
      "egasoline": null,
      "premium95": 88.08,
      "premium97": 91.58,
      "kerosene": null
    }
  },
  {
    "id": 1702,
    "brand": "caltex",
    "name": "Caltex Aguinaldo Highway Purok 157",
    "area": "Tagaytay",
    "lat": 14.115897,
    "lng": 120.962004,
    "prices": {
      "diesel": 152.9,
      "premiumDiesel": 160.4,
      "unleaded": 99.35,
      "egasoline": null,
      "premium95": 107,
      "premium97": 110.5,
      "kerosene": null
    }
  },
  {
    "id": 1703,
    "brand": "caltex",
    "name": "Caltex Aguinaldo Highway Silang Crossing East",
    "area": "Tagaytay",
    "lat": 14.114636,
    "lng": 120.961222,
    "prices": {
      "diesel": 152.9,
      "premiumDiesel": 160.4,
      "unleaded": 99.35,
      "egasoline": null,
      "premium95": 107,
      "premium97": 110.5,
      "kerosene": null
    }
  },
  {
    "id": 1704,
    "brand": "cleanfuel",
    "name": "Cleanfuel Mendoza de los Reyes Avenue Purok 102",
    "area": "Tagaytay",
    "lat": 14.102434,
    "lng": 120.941148,
    "prices": {
      "diesel": 90.74,
      "premiumDiesel": null,
      "unleaded": 86.24,
      "egasoline": null,
      "premium95": 90.74,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1705,
    "brand": "petron",
    "name": "Petron Mendez-Tagaytay Road Mendez Crossing East",
    "area": "Tagaytay",
    "lat": 14.098198,
    "lng": 120.918836,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 103.82,
      "unleaded": 85.86,
      "egasoline": null,
      "premium95": 90.66,
      "premium97": 94.16,
      "kerosene": null
    }
  },
  {
    "id": 1706,
    "brand": "petron",
    "name": "Petron Mendez-Tagaytay Road Mendez Crossing West",
    "area": "Tagaytay",
    "lat": 14.097726,
    "lng": 120.918931,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 103.82,
      "unleaded": 85.86,
      "egasoline": null,
      "premium95": 90.66,
      "premium97": 94.16,
      "kerosene": null
    }
  },
  {
    "id": 1707,
    "brand": "petron",
    "name": "Petron Tagaytay-Nasugbu Road Maharlika East",
    "area": "Tagaytay",
    "lat": 14.102018,
    "lng": 120.947697,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 103.82,
      "unleaded": 85.86,
      "egasoline": null,
      "premium95": 90.66,
      "premium97": 94.16,
      "kerosene": null
    }
  },
  {
    "id": 1708,
    "brand": "petron",
    "name": "Petron Tagaytay-Nasugbu Road Purok 84",
    "area": "Tagaytay",
    "lat": 14.098918,
    "lng": 120.929164,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 103.82,
      "unleaded": 85.86,
      "egasoline": null,
      "premium95": 90.66,
      "premium97": 94.16,
      "kerosene": null
    }
  },
  {
    "id": 1709,
    "brand": "phoenix",
    "name": "Phoenix Aguinaldo Highway Maitim II East",
    "area": "Tagaytay",
    "lat": 14.122408,
    "lng": 120.959628,
    "prices": {
      "diesel": 86.94,
      "premiumDiesel": null,
      "unleaded": 81.15,
      "egasoline": null,
      "premium95": 98.29,
      "premium97": 89.95,
      "kerosene": null
    }
  },
  {
    "id": 1710,
    "brand": "shell",
    "name": "Shell Mahogany Avenue Maharlika West",
    "area": "Tagaytay",
    "lat": 14.102497,
    "lng": 120.942539,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1711,
    "brand": "shell",
    "name": "Shell Tagaytay-Nasugbu Road Purok 84",
    "area": "Tagaytay",
    "lat": 14.0984,
    "lng": 120.929892,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1712,
    "brand": "total",
    "name": "Total Tagaytay-Nasugbu Road Mendez Crossing East",
    "area": "Tagaytay",
    "lat": 14.099643,
    "lng": 120.9232,
    "prices": {
      "diesel": 122.32,
      "premiumDiesel": 125.01,
      "unleaded": 84.48,
      "egasoline": null,
      "premium95": 89.28,
      "premium97": 92.78,
      "kerosene": null
    }
  },
  {
    "id": 2090,
    "brand": "jetti",
    "name": "Jetti Governor's Drive Poblacion II",
    "area": "Ternate",
    "lat": 14.2829117,
    "lng": 120.7242926,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 2091,
    "brand": "seaoil",
    "name": "Seaoil Governor's Drive Poblacion I-A",
    "area": "Ternate",
    "lat": 14.2836798,
    "lng": 120.7224992,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 96,
      "egasoline": null,
      "premium95": 100.8,
      "premium97": 104.3,
      "kerosene": null
    }
  },
  {
    "id": 2092,
    "brand": "shell",
    "name": "Shell Dr. C. Nuñez Street San Jose",
    "area": "Ternate",
    "lat": 14.2921872,
    "lng": 120.7177224,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 2093,
    "brand": "total",
    "name": "Total Bucana",
    "area": "Ternate",
    "lat": 14.2806253,
    "lng": 120.7085974,
    "prices": {
      "diesel": 94.14,
      "premiumDiesel": 87.57,
      "unleaded": 83.28,
      "egasoline": null,
      "premium95": 88.08,
      "premium97": 91.58,
      "kerosene": null
    }
  },
  {
    "id": 1717,
    "brand": "petron",
    "name": "Petron Governor's Drive Poblacion II-A",
    "area": "Maragondon",
    "lat": 14.2777856,
    "lng": 120.7394191,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 103.82,
      "unleaded": 85.86,
      "egasoline": null,
      "premium95": 90.66,
      "premium97": 94.16,
      "kerosene": null
    }
  },
  {
    "id": 1718,
    "brand": "petron",
    "name": "Petron Maragondon-Magallanes Road",
    "area": "Maragondon",
    "lat": 14.2683798,
    "lng": 120.7712988,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1719,
    "brand": "phoenix",
    "name": "Phoenix Governor's Drive Poblacion II-A",
    "area": "Maragondon",
    "lat": 14.2806908,
    "lng": 120.7412817,
    "prices": {
      "diesel": 86.94,
      "premiumDiesel": null,
      "unleaded": 81.15,
      "egasoline": null,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null
    }
  },
  {
    "id": 1720,
    "brand": "seaoil",
    "name": "Seaoil Riego de Dios Street Bucal I",
    "area": "Maragondon",
    "lat": 14.2733061,
    "lng": 120.7520692,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 96,
      "egasoline": null,
      "premium95": 100.8,
      "premium97": 104.3,
      "kerosene": null
    }
  },
  {
    "id": 1721,
    "brand": "shell",
    "name": "Shell Governor's Drive Poblacion II-A",
    "area": "Maragondon",
    "lat": 14.2794131,
    "lng": 120.7310373,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 106.13,
      "unleaded": 90.23,
      "egasoline": null,
      "premium95": 95.03,
      "premium97": 98.53,
      "kerosene": null
    }
  },
  {
    "id": 1722,
    "brand": "flyingv",
    "name": "Flying V J. P. Rizal Street Poblacion V",
    "area": "Mendez",
    "lat": 14.1328867,
    "lng": 120.9038742,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1723,
    "brand": "petron",
    "name": "Petron Mendez-Tagaytay Road Galicia III",
    "area": "Mendez",
    "lat": 14.1200767,
    "lng": 120.909076,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1724,
    "brand": "seaoil",
    "name": "Seaoil C. Llamado Street Poblacion IV",
    "area": "Mendez",
    "lat": 14.1341859,
    "lng": 120.9023299,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 96,
      "egasoline": null,
      "premium95": 100.8,
      "premium97": 104.3,
      "kerosene": null
    }
  },
  {
    "id": 1725,
    "brand": "shell",
    "name": "Shell C. Llamado Street Poblacion IV",
    "area": "Mendez",
    "lat": 14.1329507,
    "lng": 120.9031093,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1726,
    "brand": "total",
    "name": "Total M. Dimapilis Street Spring Heights I",
    "area": "Mendez",
    "lat": 14.1202831,
    "lng": 120.89427,
    "prices": {
      "diesel": 123.12,
      "premiumDiesel": 125.81,
      "unleaded": 85.38,
      "egasoline": null,
      "premium95": 90.18,
      "premium97": 93.68,
      "kerosene": null
    }
  },
  {
    "id": 1727,
    "brand": "total",
    "name": "Total Mendez-Alfonso Road Galicia II",
    "area": "Mendez",
    "lat": 14.1272956,
    "lng": 120.9002382,
    "prices": {
      "diesel": 123.12,
      "premiumDiesel": 125.81,
      "unleaded": 85.38,
      "egasoline": null,
      "premium95": 90.18,
      "premium97": 93.68,
      "kerosene": null
    }
  },
  {
    "id": 1728,
    "brand": "flyingv",
    "name": "Flying V Tagaytay-Nasugbu Road Luksuhin Ilaya",
    "area": "Alfonso",
    "lat": 14.0769277,
    "lng": 120.8662183,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1729,
    "brand": "jetti",
    "name": "Jetti Luksuhin-Mangas Road Mangas I",
    "area": "Alfonso",
    "lat": 14.1270922,
    "lng": 120.8616626,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1730,
    "brand": "petron",
    "name": "Petron Amuyong-Kaytitinga Road",
    "area": "Alfonso",
    "lat": 14.0925601,
    "lng": 120.8359778,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1731,
    "brand": "petron",
    "name": "Petron Luksuhin-Mangas Road Luksuhin Ilaya",
    "area": "Alfonso",
    "lat": 14.094952,
    "lng": 120.8805128,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1732,
    "brand": "petron",
    "name": "Petron Marahan Road Marahan I",
    "area": "Alfonso",
    "lat": 14.1335504,
    "lng": 120.8493412,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1733,
    "brand": "seaoil",
    "name": "Seaoil Mabini Street Poblacion I",
    "area": "Alfonso",
    "lat": 14.1388012,
    "lng": 120.8555378,
    "prices": {
      "diesel": 154.05,
      "premiumDiesel": 156.74,
      "unleaded": 96,
      "egasoline": null,
      "premium95": 100.8,
      "premium97": 104.3,
      "kerosene": null
    }
  },
  {
    "id": 1734,
    "brand": "shell",
    "name": "Shell Luksuhin-Mangas Road Luksuhin Ilaya",
    "area": "Alfonso",
    "lat": 14.0979457,
    "lng": 120.8806683,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1735,
    "brand": "unioil",
    "name": "Unioil Tagaytay-Nasugbu Road Luksuhin Ilaya",
    "area": "Alfonso",
    "lat": 14.0771735,
    "lng": 120.8673502,
    "prices": {
      "diesel": 149.9,
      "premiumDiesel": null,
      "unleaded": 96.5,
      "egasoline": null,
      "premium95": 99.5,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1736,
    "brand": "petron",
    "name": "Petron C. Bayani Street Poblacion IV",
    "area": "Amadeo",
    "lat": 14.1724252,
    "lng": 120.9240564,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1737,
    "brand": "petron",
    "name": "Petron East-West Lateral Road",
    "area": "Amadeo",
    "lat": 14.1951214,
    "lng": 120.9339979,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1738,
    "brand": "petron",
    "name": "Petron Pangil Road",
    "area": "Amadeo",
    "lat": 14.2105844,
    "lng": 120.9030952,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1739,
    "brand": "petron",
    "name": "Petron Talon Road",
    "area": "Amadeo",
    "lat": 14.1347695,
    "lng": 120.9404893,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1740,
    "brand": "phoenix",
    "name": "Phoenix C.M. de los Reyes Avenue Panungyanan",
    "area": "Amadeo",
    "lat": 14.2220004,
    "lng": 120.9262834,
    "prices": {
      "diesel": 86.94,
      "premiumDiesel": null,
      "unleaded": 81.15,
      "egasoline": null,
      "premium95": 85.65,
      "premium97": 89.95,
      "kerosene": null
    }
  },
  {
    "id": 1741,
    "brand": "total",
    "name": "Total Pangil Road",
    "area": "Amadeo",
    "lat": 14.2161006,
    "lng": 120.9010781,
    "prices": {
      "diesel": 94.14,
      "premiumDiesel": 87.57,
      "unleaded": 83.28,
      "egasoline": null,
      "premium95": 88.08,
      "premium97": 91.58,
      "kerosene": null
    }
  },
  {
    "id": 1742,
    "brand": "caltex",
    "name": "Caltex Congressional Road Koronel Jose P. Elises",
    "area": "General Mariano Alvarez",
    "lat": 14.315248,
    "lng": 121.0209979,
    "prices": {
      "diesel": null,
      "premiumDiesel": 161.2,
      "unleaded": 100.25,
      "egasoline": null,
      "premium95": 107.9,
      "premium97": 111.4,
      "kerosene": null
    }
  },
  {
    "id": 1743,
    "brand": "caltex",
    "name": "Caltex Karunungan Village",
    "area": "General Mariano Alvarez",
    "lat": 14.2914736,
    "lng": 121.0053019,
    "prices": {
      "diesel": null,
      "premiumDiesel": 161.2,
      "unleaded": 100.25,
      "egasoline": null,
      "premium95": 107.9,
      "premium97": 111.4,
      "kerosene": null
    }
  },
  {
    "id": 1744,
    "brand": "petron",
    "name": "Petron Congressional Road Macario Dacon",
    "area": "General Mariano Alvarez",
    "lat": 14.3162617,
    "lng": 121.0230486,
    "prices": {
      "diesel": null,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1745,
    "brand": "petron",
    "name": "Petron Governor's Drive Gavino Maderan",
    "area": "General Mariano Alvarez",
    "lat": 14.2834879,
    "lng": 120.9989291,
    "prices": {
      "diesel": null,
      "premiumDiesel": 150.29,
      "unleaded": 85.86,
      "egasoline": null,
      "premium95": 90.66,
      "premium97": 94.16,
      "kerosene": null
    }
  },
  {
    "id": 1746,
    "brand": "phoenix",
    "name": "Phoenix Congressional Road Gavino Maderan",
    "area": "General Mariano Alvarez",
    "lat": 14.28502,
    "lng": 120.999743,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": 82.38,
      "egasoline": null,
      "premium95": 86.88,
      "premium97": 91.18,
      "kerosene": null
    }
  },
  {
    "id": 1747,
    "brand": "total",
    "name": "Total Aldiano Olaes",
    "area": "General Mariano Alvarez",
    "lat": 14.3214046,
    "lng": 121.014818,
    "prices": {
      "diesel": null,
      "premiumDiesel": 125.81,
      "unleaded": 85.38,
      "egasoline": null,
      "premium95": 90.18,
      "premium97": 93.68,
      "kerosene": null
    }
  },
  {
    "id": 1748,
    "brand": "total",
    "name": "Total Congressional Road Poblacion 1",
    "area": "General Mariano Alvarez",
    "lat": 14.2947636,
    "lng": 121.0063779,
    "prices": {
      "diesel": null,
      "premiumDiesel": 125.81,
      "unleaded": 78.52,
      "egasoline": null,
      "premium95": 83.32,
      "premium97": 86.82,
      "kerosene": null
    }
  },
  {
    "id": 1749,
    "brand": "total",
    "name": "Total Francisco Reyes",
    "area": "General Mariano Alvarez",
    "lat": 14.325542,
    "lng": 121.02449,
    "prices": {
      "diesel": null,
      "premiumDiesel": 125.81,
      "unleaded": 78.52,
      "egasoline": null,
      "premium95": 83.32,
      "premium97": 86.82,
      "kerosene": null
    }
  },
  {
    "id": 1750,
    "brand": "total",
    "name": "Total Governor's Drive Gavino Maderan",
    "area": "General Mariano Alvarez",
    "lat": 14.2841418,
    "lng": 120.9981521,
    "prices": {
      "diesel": null,
      "premiumDiesel": 125.81,
      "unleaded": 78.52,
      "egasoline": null,
      "premium95": 83.32,
      "premium97": 86.82,
      "kerosene": null
    }
  },
  {
    "id": 1751,
    "brand": "total",
    "name": "Total Rizal Avenue Nicolasa Virata",
    "area": "General Mariano Alvarez",
    "lat": 14.3305684,
    "lng": 121.0342533,
    "prices": {
      "diesel": null,
      "premiumDiesel": 125.81,
      "unleaded": 78.52,
      "egasoline": null,
      "premium95": 83.32,
      "premium97": 86.82,
      "kerosene": null
    }
  },
  {
    "id": 1752,
    "brand": "total",
    "name": "Total Severino de las Alas",
    "area": "General Mariano Alvarez",
    "lat": 14.2961724,
    "lng": 121.0025396,
    "prices": {
      "diesel": null,
      "premiumDiesel": 125.81,
      "unleaded": 78.52,
      "egasoline": null,
      "premium95": 83.32,
      "premium97": 86.82,
      "kerosene": null
    }
  },
  {
    "id": 1753,
    "brand": "unioil",
    "name": "Unioil Congressional Road Gavino Maderan",
    "area": "General Mariano Alvarez",
    "lat": 14.2869002,
    "lng": 121.0010226,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": 96.5,
      "egasoline": null,
      "premium95": 99.5,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1754,
    "brand": "petron",
    "name": "Petron A. Mojica Street Barangay 4",
    "area": "Indang",
    "lat": 14.1966965,
    "lng": 120.8752097,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1755,
    "brand": "petron",
    "name": "Petron Indang-Alfonso Road",
    "area": "Indang",
    "lat": 14.1639322,
    "lng": 120.8603315,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1756,
    "brand": "petron",
    "name": "Petron Trece Martires-Indang Road",
    "area": "Indang",
    "lat": 14.2073195,
    "lng": 120.8894984,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1757,
    "brand": "petron",
    "name": "Petron Trece Martires-Indang Road",
    "area": "Indang",
    "lat": 14.2383603,
    "lng": 120.881027,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1758,
    "brand": "ptt",
    "name": "PTT A. Mojica Street Barangay 3",
    "area": "Indang",
    "lat": 14.1974761,
    "lng": 120.8756148,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": 75.58,
      "egasoline": null,
      "premium95": 76.58,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1759,
    "brand": "ptt",
    "name": "PTT San Gregorio Extension",
    "area": "Indang",
    "lat": 14.1866095,
    "lng": 120.8824977,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1760,
    "brand": "shell",
    "name": "Shell Indang–Mendez Road",
    "area": "Indang",
    "lat": 14.1819943,
    "lng": 120.8885753,
    "prices": {
      "diesel": 158.15,
      "premiumDiesel": 160.84,
      "unleaded": 95.95,
      "egasoline": null,
      "premium95": 100.75,
      "premium97": 104.25,
      "kerosene": null
    }
  },
  {
    "id": 1761,
    "brand": "petron",
    "name": "Petron De Guia Street Barangay 4",
    "area": "Magallanes",
    "lat": 14.1865967,
    "lng": 120.7551091,
    "prices": {
      "diesel": 147.6,
      "premiumDiesel": 150.29,
      "unleaded": 90.3,
      "egasoline": null,
      "premium95": 95.1,
      "premium97": 98.6,
      "kerosene": null
    }
  },
  {
    "id": 1762,
    "brand": "flyingv",
    "name": "Flying V Lirio Street Poblacion I",
    "area": "General Emilio Aguinaldo",
    "lat": 14.1817785,
    "lng": 120.7975336,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "egasoline": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null
    }
  },
  {
    "id": 1764,
    "sourceId": "cmmj30i0l00026gzcoq8kcrsi",
    "brand": "caltex",
    "name": "Caltex Antipolo",
    "area": "Antipolo",
    "lat": 14.6325169,
    "lng": 121.1147806,
    "prices": {
      "unleaded": 91.88,
      "premium95": 103.48,
      "diesel": null,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1765,
    "sourceId": "cmmj30i0l000x6gzchywl5gc8",
    "brand": "flyingv",
    "name": "Flying V San Mateo 2",
    "area": "Rodriguez",
    "lat": 14.6954924,
    "lng": 121.1186711,
    "prices": {
      "unleaded": 85.21,
      "premium95": 87.21,
      "premium97": 92.81,
      "diesel": null,
      "premiumDiesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1766,
    "sourceId": "cmmm5h0pk001o6g83l8e47q9f",
    "brand": "shell",
    "name": "Shell Antipolo",
    "area": "Antipolo",
    "lat": 14.6239963,
    "lng": 121.163503,
    "prices": {
      "premiumDiesel": 137.4,
      "unleaded": 90.23,
      "premium95": 99.13,
      "premium97": 103.83,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1767,
    "sourceId": "cmmm5hhby00i76g83y33e8o2h",
    "brand": "unioil",
    "name": "Unioil Antipolo",
    "area": "Antipolo",
    "lat": 14.5934873,
    "lng": 121.1756991,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1768,
    "sourceId": "cmmm5k0v2035n6g83f5jbszt8",
    "brand": "petron",
    "name": "Petron Antipolo",
    "area": "Antipolo",
    "lat": 14.5879611,
    "lng": 121.1728976,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1769,
    "sourceId": "cmmm5hhqj00ih6g83kv4vp85x",
    "brand": "shell",
    "name": "Shell Antipolo",
    "area": "Antipolo",
    "lat": 14.5876805,
    "lng": 121.1702923,
    "prices": {
      "premiumDiesel": 137.4,
      "unleaded": 90.23,
      "premium95": 99.13,
      "premium97": 103.83,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1770,
    "sourceId": "cmmm5hwzh00ys6g83mc71pdz1",
    "brand": "shell",
    "name": "Shell Antipolo",
    "area": "Antipolo",
    "lat": 14.5809959,
    "lng": 121.1787784,
    "prices": {
      "premiumDiesel": 137.4,
      "unleaded": 90.23,
      "premium95": 99.13,
      "premium97": 103.83,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1771,
    "sourceId": "cmmm5i20j01466g83qwqhcfnl",
    "brand": "shell",
    "name": "Shell Antipolo",
    "area": "Antipolo",
    "lat": 14.574916,
    "lng": 121.1770212,
    "prices": {
      "premiumDiesel": 137.4,
      "unleaded": 90.23,
      "premium95": 99.13,
      "premium97": 103.83,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1772,
    "sourceId": "cmmm5i1ve01406g83g3opu7eb",
    "brand": "caltex",
    "name": "Caltex Circumferential Road",
    "area": "Antipolo",
    "lat": 14.5808378,
    "lng": 121.1742578,
    "prices": {
      "unleaded": 91.88,
      "premium95": 93.88,
      "diesel": null,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1773,
    "sourceId": "cmmm5i1u4013z6g83gzqcrvx9",
    "brand": "flyingv",
    "name": "Flying V Oliveros",
    "area": "Antipolo",
    "lat": 14.5880089,
    "lng": 121.1737573,
    "prices": {
      "unleaded": 85.21,
      "premium95": 87.21,
      "premium97": 92.01,
      "diesel": null,
      "premiumDiesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1774,
    "sourceId": "cmmm5ic8i01f36g835ht07np4",
    "brand": "petron",
    "name": "Petron Forrest Hills",
    "area": "Antipolo",
    "lat": 14.6225965,
    "lng": 121.1727814,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1775,
    "sourceId": "cmmm5k6b003b76g83ts3mbrwg",
    "brand": "cleanfuel",
    "name": "Cleanfuel Antipolo",
    "area": "Antipolo",
    "lat": 14.5839802,
    "lng": 121.1685727,
    "prices": {
      "diesel": 90.74,
      "premiumDiesel": null,
      "unleaded": 86.24,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1776,
    "sourceId": "cmmm5k6qw03bl6g830q4ltxbr",
    "brand": "flyingv",
    "name": "Flying V Country Hills",
    "area": "Teresa",
    "lat": 14.5519498,
    "lng": 121.1909278,
    "prices": {
      "unleaded": 85.21,
      "premium95": 87.21,
      "premium97": 92.01,
      "diesel": null,
      "premiumDiesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1777,
    "sourceId": "cmmm5irpi01v96g83n3ot31wo",
    "brand": "seaoil",
    "name": "Seaoil Antipolo",
    "area": "Antipolo",
    "lat": 14.5627369,
    "lng": 121.1856011,
    "prices": {
      "unleaded": 84.32,
      "premium95": 85.32,
      "diesel": null,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1778,
    "sourceId": "cmmm5ish701w36g83305wt4r1",
    "brand": "shell",
    "name": "Shell Antipolo",
    "area": "Antipolo",
    "lat": 14.5902581,
    "lng": 121.1822425,
    "prices": {
      "premiumDiesel": 137.4,
      "unleaded": 90.23,
      "premium95": 99.13,
      "premium97": 103.83,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1779,
    "sourceId": "cmmm5iyyq022x6g83hao5pjs6",
    "brand": "phoenix",
    "name": "Phoenix Antipolo",
    "area": "Antipolo",
    "lat": 14.5827278,
    "lng": 121.1823839,
    "prices": {
      "unleaded": 85.91,
      "premium95": 88.91,
      "diesel": null,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1780,
    "sourceId": "cmmm5j332027c6g83c4dj5hh6",
    "brand": "petron",
    "name": "Petron Antipolo",
    "area": "Antipolo",
    "lat": 14.5874588,
    "lng": 121.1715785,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1781,
    "sourceId": "cmmm5o91r01to6gg3b2c0irry",
    "brand": "petron",
    "name": "Petron Gasul",
    "area": "Antipolo",
    "lat": 14.5871643,
    "lng": 121.1251734,
    "prices": {
      "premiumDiesel": 131.21,
      "unleaded": 85.86,
      "premium95": 87.86,
      "premium97": 97.36,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1782,
    "sourceId": "cmmm5j93w02dn6g83qpru8w3h",
    "brand": "shell",
    "name": "Shell Boso Boso",
    "area": "Antipolo",
    "lat": 14.630635,
    "lng": 121.2337222,
    "prices": {
      "premiumDiesel": 137.4,
      "unleaded": 90.23,
      "premium95": 99.13,
      "premium97": 103.83,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1783,
    "sourceId": "cmmm5j9an02du6g83t71qggrk",
    "brand": "shell",
    "name": "Shell Antipolo",
    "area": "Teresa",
    "lat": 14.5752651,
    "lng": 121.1917482,
    "prices": {
      "premiumDiesel": 137.4,
      "unleaded": 90.23,
      "premium95": 99.13,
      "premium97": 103.83,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1784,
    "sourceId": "cmmj30i0l001f6gzcowsi4ugm",
    "brand": "flyingv",
    "name": "Flying V Antipolo",
    "area": "Antipolo",
    "lat": 14.5720637,
    "lng": 121.12714,
    "prices": {
      "unleaded": 85.21,
      "premium95": 87.21,
      "premium97": 92.01,
      "diesel": null,
      "premiumDiesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1785,
    "sourceId": "cmmj30i0l001h6gzcmykbgrk8",
    "brand": "cleanfuel",
    "name": "Cleanfuel Antipolo",
    "area": "Antipolo",
    "lat": 14.6138295,
    "lng": 121.1283725,
    "prices": {
      "diesel": 90.74,
      "premiumDiesel": null,
      "unleaded": 86.24,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1786,
    "sourceId": "cmmj30i0m002r6gzcfc9zll86",
    "brand": "cleanfuel",
    "name": "Cleanfuel Antipolo",
    "area": "Antipolo",
    "lat": 14.6188016,
    "lng": 121.1305923,
    "prices": {
      "diesel": 90.74,
      "premiumDiesel": null,
      "unleaded": 86.24,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1787,
    "sourceId": "cmmj30i0m002x6gzc16ppujrx",
    "brand": "phoenix",
    "name": "Phoenix Marcos Highway / Renato Maria Gas Station",
    "area": "Antipolo",
    "lat": 14.6225209,
    "lng": 121.1077462,
    "prices": {
      "unleaded": 85.91,
      "premium95": 86.31,
      "diesel": null,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1788,
    "sourceId": "cmmj30i0l001i6gzcdg2e4pk2",
    "brand": "flyingv",
    "name": "Flying V Masinag",
    "area": "Antipolo",
    "lat": 14.6288037,
    "lng": 121.1239727,
    "prices": {
      "unleaded": 85.21,
      "premium95": 87.21,
      "premium97": 90.91,
      "diesel": null,
      "premiumDiesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1789,
    "sourceId": "cmmj30i0l00226gzcj0zkw28o",
    "brand": "shell",
    "name": "Parvil Shell Service Station",
    "area": "Antipolo",
    "lat": 14.621594,
    "lng": 121.1080617,
    "prices": {
      "premiumDiesel": 140.2,
      "unleaded": 90.23,
      "premium95": 98.83,
      "premium97": 95.23,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1790,
    "sourceId": "cmmj30i0m002u6gzcmomgz2cx",
    "brand": "caltex",
    "name": "CaltexFortune",
    "area": "San Mateo",
    "lat": 14.6630775,
    "lng": 121.1246194,
    "prices": {
      "unleaded": 91.88,
      "premium95": 103.48,
      "diesel": null,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1791,
    "sourceId": "cmmj30i0m002s6gzcxotxhzy9",
    "brand": "seaoil",
    "name": "SEAOIL - Katipunan Marikina",
    "area": "San Mateo",
    "lat": 14.6409198,
    "lng": 121.1099814,
    "prices": {
      "unleaded": 84.32,
      "premium95": 84.12,
      "premium97": 84.72,
      "diesel": null,
      "premiumDiesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1792,
    "sourceId": "cmmj30i0m002y6gzczfpktoci",
    "brand": "unioil",
    "name": "UniOil - Vermont Royale, Marcos Hwy",
    "area": "Antipolo",
    "lat": 14.623235,
    "lng": 121.1123375,
    "prices": {
      "unleaded": 86.66,
      "premium95": 88.66,
      "premium97": 93.66,
      "diesel": null,
      "premiumDiesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1793,
    "sourceId": "cmmm5j9of02e86g83hbmyrd3r",
    "brand": "petron",
    "name": "Petron Sumulong Hiway Antipolo",
    "area": "Antipolo",
    "lat": 14.6070927,
    "lng": 121.1706885,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1794,
    "sourceId": "cmmj30i0m00466gzcuq6piibp",
    "brand": "shell",
    "name": "Shell Antipolo",
    "area": "Antipolo",
    "lat": 14.5747163,
    "lng": 121.1231337,
    "prices": {
      "premiumDiesel": 137.4,
      "unleaded": 90.23,
      "premium95": 99.13,
      "premium97": 103.83,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1795,
    "sourceId": "cmmj30i0m004a6gzc4mk23wuz",
    "brand": "petron",
    "name": "Petron Antipolo",
    "area": "Antipolo",
    "lat": 14.5873984,
    "lng": 121.1116122,
    "prices": {
      "premiumDiesel": 130.01,
      "unleaded": 85.86,
      "premium95": 87.76,
      "premium97": 96.86,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1796,
    "sourceId": "cmmj30i0m004o6gzch2lw4ck4",
    "brand": "shell",
    "name": "Shell Antipolo",
    "area": "San Mateo",
    "lat": 14.6504589,
    "lng": 121.1120521,
    "prices": {
      "premiumDiesel": 137.6,
      "unleaded": 90.23,
      "premium95": 99.13,
      "premium97": 105.33,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1797,
    "sourceId": "cmmj30i0m00566gzcrb6mv3xi",
    "brand": "shell",
    "name": "Shell Antipolo",
    "area": "Antipolo",
    "lat": 14.6275001,
    "lng": 121.1023875,
    "prices": {
      "premiumDiesel": 140.2,
      "unleaded": 90.23,
      "premium95": 98.83,
      "premium97": 95.23,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1798,
    "sourceId": "cmmj30i0m00586gzczlxhx74u",
    "brand": "shell",
    "name": "Shell Antipolo",
    "area": "Antipolo",
    "lat": 14.6299409,
    "lng": 121.101625,
    "prices": {
      "premiumDiesel": 137.6,
      "unleaded": 90.23,
      "premium95": 99.13,
      "premium97": 105.33,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1799,
    "sourceId": "cmmj30i0m004f6gzcsbw7kdes",
    "brand": "shell",
    "name": "Shell Cainta",
    "area": "Antipolo",
    "lat": 14.5824737,
    "lng": 121.1269287,
    "prices": {
      "premiumDiesel": 137.4,
      "unleaded": 90.23,
      "premium95": 99.13,
      "premium97": 103.83,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1800,
    "sourceId": "cmmm5i195013d6g8358fcdfi8",
    "brand": "petron",
    "name": "Glazzone Petron Gasoline Station",
    "area": "Antipolo",
    "lat": 14.5808548,
    "lng": 121.1705039,
    "prices": {
      "unleaded": 85.86,
      "premium95": 87.86,
      "diesel": null,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1801,
    "sourceId": "cmmj30i0m00606gzcarzh16wt",
    "brand": "shell",
    "name": "Shell Antipolo",
    "area": "Antipolo",
    "lat": 14.5793781,
    "lng": 121.1368976,
    "prices": {
      "premiumDiesel": 137.4,
      "unleaded": 90.23,
      "premium95": 99.13,
      "premium97": 103.83,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1802,
    "sourceId": "cmmj30i0m00646gzcyhkfh7gg",
    "brand": "shell",
    "name": "Shell Antipolo",
    "area": "Antipolo",
    "lat": 14.5666553,
    "lng": 121.1415129,
    "prices": {
      "premiumDiesel": 137.4,
      "unleaded": 90.23,
      "premium95": 99.13,
      "premium97": 103.83,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1803,
    "sourceId": "cmmj30i0m006m6gzckyjcehsb",
    "brand": "caltex",
    "name": "Caltex Antipolo",
    "area": "Antipolo",
    "lat": 14.6185093,
    "lng": 121.1301084,
    "prices": {
      "unleaded": 91.88,
      "premium95": 103.48,
      "diesel": null,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1804,
    "sourceId": "cmmj30i0m006n6gzcy23e0lwi",
    "brand": "shell",
    "name": "Shell Antipolo",
    "area": "Antipolo",
    "lat": 14.6187597,
    "lng": 121.1308515,
    "prices": {
      "premiumDiesel": 137.6,
      "unleaded": 90.23,
      "premium95": 99.13,
      "premium97": 105.33,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1805,
    "sourceId": "cmmj30i0m006u6gzcj0yv6hkh",
    "brand": "caltex",
    "name": "Caltex Antipolo",
    "area": "Antipolo",
    "lat": 14.6086347,
    "lng": 121.103842,
    "prices": {
      "premiumDiesel": 134.41,
      "unleaded": 91.88,
      "premium95": 100.43,
      "diesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1806,
    "sourceId": "cmmj30i0m006w6gzcljsr16yj",
    "brand": "phoenix",
    "name": "Phoenix Antipolo",
    "area": "Antipolo",
    "lat": 14.5875538,
    "lng": 121.1110011,
    "prices": {
      "unleaded": 85.91,
      "premium95": 86.31,
      "diesel": null,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1807,
    "sourceId": "cmmj30i0m006x6gzc5pgj1xlu",
    "brand": "petron",
    "name": "Petron Antipolo",
    "area": "Antipolo",
    "lat": 14.5712801,
    "lng": 121.1300163,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1808,
    "sourceId": "cmmj30i0m006z6gzc01nro0rv",
    "brand": "caltex",
    "name": "Caltex Antipolo",
    "area": "Antipolo",
    "lat": 14.560317,
    "lng": 121.1346682,
    "prices": {
      "unleaded": 91.88,
      "premium95": 93.88,
      "diesel": null,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1809,
    "sourceId": "cmmj30i0m00726gzcgzwmuyej",
    "brand": "caltex",
    "name": "Caltex Antipolo",
    "area": "Rodriguez",
    "lat": 14.730429,
    "lng": 121.1448017,
    "prices": {
      "unleaded": 91.88,
      "premium95": 93.88,
      "diesel": null,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1810,
    "sourceId": "cmmj30i0m00766gzcboy58mle",
    "brand": "flyingv",
    "name": "Flying V Antipolo",
    "area": "Antipolo",
    "lat": 14.5545147,
    "lng": 121.1278827,
    "prices": {
      "unleaded": 85.21,
      "premium95": 87.21,
      "premium97": 92.01,
      "diesel": null,
      "premiumDiesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1811,
    "sourceId": "cmmj30i0m00776gzcjqzfoaoi",
    "brand": "shell",
    "name": "Shell Antipolo",
    "area": "Antipolo",
    "lat": 14.5539921,
    "lng": 121.1269485,
    "prices": {
      "premiumDiesel": 140.3,
      "unleaded": 90.23,
      "premium95": 101.23,
      "premium97": 104.23,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1812,
    "sourceId": "cmmj30i0m007c6gzc1kfl87h4",
    "brand": "petron",
    "name": "Petron Antipolo",
    "area": "Antipolo",
    "lat": 14.549118,
    "lng": 121.1406112,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1813,
    "sourceId": "cmmj30i0m007f6gzc106egtqh",
    "brand": "shell",
    "name": "Shell Antipolo",
    "area": "Antipolo",
    "lat": 14.5512217,
    "lng": 121.1394267,
    "prices": {
      "premiumDiesel": 137.4,
      "unleaded": 90.23,
      "premium95": 99.13,
      "premium97": 103.83,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1814,
    "sourceId": "cmmj30i0m007g6gzcbzyocaaq",
    "brand": "phoenix",
    "name": "Phoenix Station (14.5532, 121.1257)",
    "area": "Antipolo",
    "lat": 14.5531926,
    "lng": 121.1256684,
    "prices": {
      "unleaded": 85.91,
      "premium95": 92.25,
      "diesel": null,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1815,
    "sourceId": "cmmj30i0m006v6gzc4fi0o5kc",
    "brand": "petron",
    "name": "Petron Brookside",
    "area": "Antipolo",
    "lat": 14.5854578,
    "lng": 121.1175914,
    "prices": {
      "premiumDiesel": 131.21,
      "unleaded": 85.86,
      "premium95": 87.86,
      "premium97": 97.36,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1816,
    "sourceId": "cmmj30i0m00786gzc8o2iez5t",
    "brand": "phoenix",
    "name": "Phoenix Antipolo",
    "area": "Antipolo",
    "lat": 14.5533263,
    "lng": 121.1259661,
    "prices": {
      "unleaded": 85.91,
      "premium95": 92.25,
      "diesel": null,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1817,
    "sourceId": "cmmj30i0m006y6gzckjktxili",
    "brand": "petron",
    "name": "Petron KM20 Taytay",
    "area": "Antipolo",
    "lat": 14.5812371,
    "lng": 121.1324294,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1818,
    "sourceId": "cmmj30i0n007j6gzcw1r9bdqx",
    "brand": "total",
    "name": "Total (Cainta)",
    "area": "Antipolo",
    "lat": 14.5742363,
    "lng": 121.1245117,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1819,
    "sourceId": "cmmj30i0m00706gzcw5rspptf",
    "brand": "total",
    "name": "Total (Taytay - Rizal Ave.)",
    "area": "Antipolo",
    "lat": 14.5638442,
    "lng": 121.1327626,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1820,
    "sourceId": "cmmj30i0n00bi6gzcocl507gt",
    "brand": "total",
    "name": "Total (Marcos Hwy)",
    "area": "Antipolo",
    "lat": 14.6240957,
    "lng": 121.116695,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1821,
    "sourceId": "cmmj30i0n00bh6gzcuic1jxck",
    "brand": "phoenix",
    "name": "Phoenix Petroleum",
    "area": "Antipolo",
    "lat": 14.6249661,
    "lng": 121.1378598,
    "prices": {
      "unleaded": 85.91,
      "premium95": 91.25,
      "diesel": null,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1822,
    "sourceId": "cmmj30i0n00bc6gzcbto071al",
    "brand": "seaoil",
    "name": "Patiis Seaoil Station",
    "area": "Rodriguez",
    "lat": 14.7028952,
    "lng": 121.1264973,
    "prices": {
      "unleaded": 84.32,
      "premium95": 84.02,
      "premium97": 85.32,
      "diesel": null,
      "premiumDiesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1823,
    "sourceId": "cmmj30i0o00fg6gzchb4ewur3",
    "brand": "caltex",
    "name": "Caltex Antipolo",
    "area": "Antipolo",
    "lat": 14.5888744,
    "lng": 121.1025606,
    "prices": {
      "premiumDiesel": 134.41,
      "unleaded": 91.88,
      "premium95": 100.43,
      "diesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1824,
    "sourceId": "cmmj30i0o00gh6gzctmndwwc8",
    "brand": "seaoil",
    "name": "Seaoil Antipolo",
    "area": "Antipolo",
    "lat": 14.5827233,
    "lng": 121.114727,
    "prices": {
      "unleaded": 84.32,
      "premium95": 89.63,
      "premium97": 88.73,
      "diesel": null,
      "premiumDiesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1825,
    "sourceId": "cmmj30i0p00i16gzc14rdjm81",
    "brand": "shell",
    "name": "Shell Antipolo",
    "area": "Rodriguez",
    "lat": 14.7291632,
    "lng": 121.1416201,
    "prices": {
      "premiumDiesel": 137.4,
      "unleaded": 90.23,
      "premium95": 99.13,
      "premium97": 103.83,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1826,
    "sourceId": "cmmj30i0p00i46gzczz9ipdff",
    "brand": "shell",
    "name": "Shell Antipolo",
    "area": "San Mateo",
    "lat": 14.6631176,
    "lng": 121.1064493,
    "prices": {
      "premiumDiesel": 137.6,
      "unleaded": 90.23,
      "premium95": 99.13,
      "premium97": 105.33,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1827,
    "sourceId": "cmmj30i0p00ib6gzck1hngqeq",
    "brand": "phoenix",
    "name": "Phoenix Antipolo",
    "area": "Antipolo",
    "lat": 14.602254,
    "lng": 121.1060342,
    "prices": {
      "unleaded": 85.91,
      "premium95": 86.31,
      "diesel": null,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1828,
    "sourceId": "cmmj30i0p00ie6gzchus15o3k",
    "brand": "petron",
    "name": "Petron Antipolo",
    "area": "San Mateo",
    "lat": 14.6507672,
    "lng": 121.1027147,
    "prices": {
      "premiumDiesel": 132.11,
      "unleaded": 85.86,
      "premium95": 87.86,
      "premium97": 90.66,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1829,
    "sourceId": "cmmj30i0p00l46gzc67mmam5g",
    "brand": "unioil",
    "name": "UniOil - Ortigas Ave Ext, Cainta",
    "area": "Antipolo",
    "lat": 14.5828788,
    "lng": 121.1254584,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1830,
    "sourceId": "cmmj30i0p00lu6gzc4r6ud3oc",
    "brand": "shell",
    "name": "Shell Antipolo",
    "area": "Antipolo",
    "lat": 14.592595,
    "lng": 121.1126961,
    "prices": {
      "premiumDiesel": 140.2,
      "unleaded": 90.23,
      "premium95": 98.83,
      "premium97": 95.23,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1831,
    "sourceId": "cmmj30i0q00n96gzckd4giznq",
    "brand": "petron",
    "name": "Petron Antipolo",
    "area": "San Mateo",
    "lat": 14.6812869,
    "lng": 121.1143754,
    "prices": {
      "premiumDiesel": 131.21,
      "unleaded": 85.86,
      "premium95": 87.86,
      "premium97": 97.36,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1832,
    "sourceId": "cmmj30i0q00nc6gzcdg080lyx",
    "brand": "shell",
    "name": "Shell Antipolo",
    "area": "San Mateo",
    "lat": 14.6813078,
    "lng": 121.1148719,
    "prices": {
      "premiumDiesel": 139.3,
      "unleaded": 90.23,
      "premium95": 95.53,
      "premium97": 99.63,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1833,
    "sourceId": "cmmj30i0q00nt6gzcng0r6ioq",
    "brand": "petron",
    "name": "Petron Antipolo",
    "area": "San Mateo",
    "lat": 14.6586042,
    "lng": 121.1107127,
    "prices": {
      "premiumDiesel": 129.01,
      "unleaded": 85.86,
      "premium95": 87.86,
      "premium97": 97.86,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1834,
    "sourceId": "cmmj30i0q00o66gzcymfzp57l",
    "brand": "petron",
    "name": "Petron Antipolo",
    "area": "Antipolo",
    "lat": 14.6213966,
    "lng": 121.1271147,
    "prices": {
      "premiumDiesel": 129.01,
      "unleaded": 85.86,
      "premium95": 87.86,
      "premium97": 97.86,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1835,
    "sourceId": "cmmj30i0p00lq6gzcy7xb3t82",
    "brand": "cleanfuel",
    "name": "Cleanfuel Felix",
    "area": "Antipolo",
    "lat": 14.6178395,
    "lng": 121.1013672,
    "prices": {
      "diesel": 90.74,
      "premiumDiesel": null,
      "unleaded": 86.24,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1836,
    "sourceId": "cmmj30i0q00n36gzc0areo7km",
    "brand": "caltex",
    "name": "Caltex San Mateo",
    "area": "San Mateo",
    "lat": 14.679516,
    "lng": 121.1134104,
    "prices": {
      "unleaded": 91.88,
      "premium95": 103.48,
      "diesel": null,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1837,
    "sourceId": "cmmj30i0p00ls6gzc42e3dpkp",
    "brand": "seaoil",
    "name": "Seaoil Talaba Cainta",
    "area": "Antipolo",
    "lat": 14.6030461,
    "lng": 121.1061855,
    "prices": {
      "unleaded": 84.32,
      "premium95": 89.63,
      "premium97": 88.73,
      "diesel": null,
      "premiumDiesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1838,
    "sourceId": "cmmj30i0p00lt6gzc6kz7wuaq",
    "brand": "unioil",
    "name": "UniOil - Felix Ave, Cainta",
    "area": "Antipolo",
    "lat": 14.5975811,
    "lng": 121.1095346,
    "prices": {
      "unleaded": 86.66,
      "premium95": 88.66,
      "premium97": 93.66,
      "diesel": null,
      "premiumDiesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1839,
    "sourceId": "cmmj30i0q00ok6gzcpa8ayswo",
    "brand": "phoenix",
    "name": "Phoenix Antipolo",
    "area": "Antipolo",
    "lat": 14.6226242,
    "lng": 121.1253048,
    "prices": {
      "unleaded": 85.91,
      "premium95": 91.25,
      "diesel": null,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1840,
    "sourceId": "cmmj30i0q00q66gzctviaflhm",
    "brand": "shell",
    "name": "Shell Gas Station",
    "area": "Rodriguez",
    "lat": 14.6844425,
    "lng": 121.1049107,
    "prices": {
      "premiumDiesel": 139.3,
      "unleaded": 90.23,
      "premium95": 95.53,
      "premium97": 99.63,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1841,
    "sourceId": "cmmj30i0r00ss6gzcbpaa7vn8",
    "brand": "shell",
    "name": "Shell Antipolo",
    "area": "Rodriguez",
    "lat": 14.7132047,
    "lng": 121.134458,
    "prices": {
      "premiumDiesel": 139.3,
      "unleaded": 90.23,
      "premium95": 95.53,
      "premium97": 99.63,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1842,
    "sourceId": "cmmj30i0r00t06gzczu49swlq",
    "brand": "flyingv",
    "name": "Flying V Antipolo",
    "area": "San Mateo",
    "lat": 14.6603781,
    "lng": 121.1047841,
    "prices": {
      "unleaded": 85.21,
      "premium95": 87.21,
      "premium97": 90.91,
      "diesel": null,
      "premiumDiesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1843,
    "sourceId": "cmmj30i0r00t66gzcenzmttlf",
    "brand": "petron",
    "name": "Petron Antipolo",
    "area": "Rodriguez",
    "lat": 14.7471698,
    "lng": 121.1346135,
    "prices": {
      "premiumDiesel": 131.21,
      "unleaded": 85.86,
      "premium95": 87.86,
      "premium97": 97.36,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1844,
    "sourceId": "cmmj30i0r00t86gzc1juxwh7q",
    "brand": "shell",
    "name": "Shell Antipolo",
    "area": "Antipolo",
    "lat": 14.6335137,
    "lng": 121.1217104,
    "prices": {
      "premiumDiesel": 137.6,
      "unleaded": 90.23,
      "premium95": 99.13,
      "premium97": 105.33,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1845,
    "sourceId": "cmmj30i0r00t96gzcj8chuxjr",
    "brand": "shell",
    "name": "Shell Antipolo",
    "area": "San Mateo",
    "lat": 14.6627594,
    "lng": 121.1062819,
    "prices": {
      "premiumDiesel": 137.6,
      "unleaded": 90.23,
      "premium95": 99.13,
      "premium97": 105.33,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1846,
    "sourceId": "cmmj30i0r00td6gzc60hjilpl",
    "brand": "caltex",
    "name": "Caltex Antipolo",
    "area": "Antipolo",
    "lat": 14.5987569,
    "lng": 121.1089122,
    "prices": {
      "premiumDiesel": 134.41,
      "unleaded": 91.88,
      "premium95": 100.43,
      "diesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1847,
    "sourceId": "cmmj30i0r00su6gzcjm2owodr",
    "brand": "seaoil",
    "name": "SEAOIL - Nangka Marikina",
    "area": "San Mateo",
    "lat": 14.6690966,
    "lng": 121.1083172,
    "prices": {
      "unleaded": 84.32,
      "premium95": 84.12,
      "premium97": 84.72,
      "diesel": null,
      "premiumDiesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1848,
    "sourceId": "cmmj30i0r00tm6gzcq1k4qunc",
    "brand": "flyingv",
    "name": "Flying V Payatas Road",
    "area": "Rodriguez",
    "lat": 14.7422401,
    "lng": 121.128235,
    "prices": {
      "unleaded": 85.21,
      "premium95": 87.21,
      "premium97": 92.81,
      "diesel": null,
      "premiumDiesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1849,
    "sourceId": "cmmj30i0r00tu6gzczz2094bv",
    "brand": "total",
    "name": "Total Antipolo",
    "area": "Antipolo",
    "lat": 14.6280505,
    "lng": 121.1022296,
    "prices": {
      "unleaded": 83.28,
      "diesel": null,
      "premiumDiesel": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1850,
    "sourceId": "cmmj30i0r00ub6gzczv3l8o93",
    "brand": "flyingv",
    "name": "Flying V Antipolo",
    "area": "Antipolo",
    "lat": 14.6177138,
    "lng": 121.1338681,
    "prices": {
      "unleaded": 85.21,
      "premium95": 87.21,
      "premium97": 90.91,
      "diesel": null,
      "premiumDiesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1851,
    "sourceId": "cmmj30i0r00vm6gzc8szm24wm",
    "brand": "petron",
    "name": "Petron Antipolo",
    "area": "Antipolo",
    "lat": 14.6023466,
    "lng": 121.1065786,
    "prices": {
      "premiumDiesel": 130.01,
      "unleaded": 85.86,
      "premium95": 87.76,
      "premium97": 96.86,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1853,
    "sourceId": "cmmj30i0s00xv6gzc5p6xf7v3",
    "brand": "phoenix",
    "name": "Phoenix Antipolo",
    "area": "San Mateo",
    "lat": 14.665331,
    "lng": 121.1067403,
    "prices": {
      "unleaded": 85.91,
      "premium95": 91.25,
      "diesel": null,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1854,
    "sourceId": "cmmj30i0s00xw6gzcbsv2vmi9",
    "brand": "cleanfuel",
    "name": "Cleanfuel Nangka",
    "area": "San Mateo",
    "lat": 14.6678342,
    "lng": 121.1074732,
    "prices": {
      "diesel": 90.74,
      "premiumDiesel": null,
      "unleaded": 86.24,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1855,
    "sourceId": "cmmj30i0s00xu6gzcc80ev8n7",
    "brand": "cleanfuel",
    "name": "Cleanfuel Cainta",
    "area": "Antipolo",
    "lat": 14.6000817,
    "lng": 121.1079463,
    "prices": {
      "diesel": 90.74,
      "premiumDiesel": null,
      "unleaded": 86.24,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1856,
    "sourceId": "cmmj30i0s00xb6gzc1tsof0dj",
    "brand": "shell",
    "name": "SHELL ORTIGAS EXTENSION",
    "area": "Antipolo",
    "lat": 14.5857619,
    "lng": 121.1186491,
    "prices": {
      "premiumDiesel": 139.3,
      "unleaded": 90.23,
      "premium95": 95.53,
      "premium97": 99.63,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1857,
    "sourceId": "cmmj30i0s00x96gzcmb9e586y",
    "brand": "petron",
    "name": "Petron KM19 Cainta - STI",
    "area": "Antipolo",
    "lat": 14.5832384,
    "lng": 121.1263438,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1858,
    "sourceId": "cmmj30i0s010w6gzco98qbb9q",
    "brand": "phoenix",
    "name": "Phoenix Antipolo",
    "area": "Antipolo",
    "lat": 14.6310004,
    "lng": 121.1216209,
    "prices": {
      "unleaded": 85.91,
      "premium95": 91.25,
      "diesel": null,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1859,
    "sourceId": "cmmj30i0t01346gzckoqa2vns",
    "brand": "petron",
    "name": "Petron MJS III",
    "area": "San Mateo",
    "lat": 14.6396524,
    "lng": 121.1032629,
    "prices": {
      "premiumDiesel": 132.11,
      "unleaded": 85.86,
      "premium95": 87.86,
      "premium97": 90.66,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1860,
    "sourceId": "cmmj30i0t014b6gzckkwizo23",
    "brand": "petron",
    "name": "Petron Antipolo",
    "area": "Rodriguez",
    "lat": 14.7293599,
    "lng": 121.1444744,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1861,
    "sourceId": "cmmj30i0t014k6gzcexiq8cl6",
    "brand": "shell",
    "name": "Shell Antipolo",
    "area": "Antipolo",
    "lat": 14.6334706,
    "lng": 121.1105549,
    "prices": {
      "premiumDiesel": 137.6,
      "unleaded": 90.23,
      "premium95": 99.13,
      "premium97": 105.33,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1862,
    "sourceId": "cmmj30i0t01496gzckl5c82f1",
    "brand": "petron",
    "name": "Petron Katipunan Street corner Sumulong Hi-way",
    "area": "Antipolo",
    "lat": 14.6339459,
    "lng": 121.1080614,
    "prices": {
      "premiumDiesel": 129.01,
      "unleaded": 85.86,
      "premium95": 87.86,
      "premium97": 97.86,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1863,
    "sourceId": "cmmj30i0u016a6gzc7dav2rw2",
    "brand": "unioil",
    "name": "UniOil - C6, Taytay",
    "area": "Antipolo",
    "lat": 14.5454212,
    "lng": 121.1171633,
    "prices": {
      "unleaded": 86.66,
      "premium95": 87.66,
      "diesel": null,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1864,
    "sourceId": "cmmj30i0u016j6gzck8rydg1e",
    "brand": "seaoil",
    "name": "Seaoil Antipolo",
    "area": "Antipolo",
    "lat": 14.5863366,
    "lng": 121.1163698,
    "prices": {
      "unleaded": 84.32,
      "premium95": 84.02,
      "premium97": 85.32,
      "diesel": null,
      "premiumDiesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1865,
    "sourceId": "cmmj30i0u016k6gzcguzr6kro",
    "brand": "petron",
    "name": "Petron Antipolo",
    "area": "Antipolo",
    "lat": 14.6353642,
    "lng": 121.1017109,
    "prices": {
      "premiumDiesel": 132.11,
      "unleaded": 85.86,
      "premium95": 87.86,
      "premium97": 90.66,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1866,
    "sourceId": "cmmj30i0u016u6gzcsrm8api4",
    "brand": "shell",
    "name": "Acg Shell Service Station",
    "area": "Antipolo",
    "lat": 14.616852,
    "lng": 121.101582,
    "prices": {
      "premiumDiesel": 140.2,
      "unleaded": 90.23,
      "premium95": 98.83,
      "premium97": 95.23,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1867,
    "sourceId": "cmmj30i0u01796gzcenwppdmh",
    "brand": "unioil",
    "name": "Unioil Antipolo",
    "area": "Antipolo",
    "lat": 14.6287827,
    "lng": 121.1232206,
    "prices": {
      "unleaded": 86.66,
      "premium95": 89.66,
      "premium97": 86.26,
      "diesel": null,
      "premiumDiesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1868,
    "sourceId": "cmmm5jmis02r46g83yz71kkab",
    "brand": "petron",
    "name": "Petron Antipolo",
    "area": "Antipolo",
    "lat": 14.6231389,
    "lng": 121.1552082,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1869,
    "sourceId": "cmmm5jpsl02ud6g83b5b80nah",
    "brand": "phoenix",
    "name": "Phoenix Antipolo",
    "area": "Antipolo",
    "lat": 14.6040788,
    "lng": 121.1750605,
    "prices": {
      "unleaded": 85.91,
      "premium95": 88.91,
      "diesel": null,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1870,
    "sourceId": "cmmj30i0u017m6gzc75l3t88v",
    "brand": "seaoil",
    "name": "SEAOIL GAS STATION",
    "area": "Antipolo",
    "lat": 14.5549344,
    "lng": 121.1289358,
    "prices": {
      "unleaded": 84.32,
      "premium95": 85.32,
      "diesel": null,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1871,
    "sourceId": "cmmj30i0u017n6gzc5wfghg3z",
    "brand": "seaoil",
    "name": "SEAOIL - Paraluman Marikina",
    "area": "San Mateo",
    "lat": 14.6561019,
    "lng": 121.108271,
    "prices": {
      "unleaded": 84.32,
      "premium95": 84.12,
      "premium97": 84.72,
      "diesel": null,
      "premiumDiesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1872,
    "sourceId": "cmmm5l024000o6gg39d2avj0z",
    "brand": "seaoil",
    "name": "SEAOIL - Mambugan Antipolo",
    "area": "Antipolo",
    "lat": 14.617146,
    "lng": 121.1369618,
    "prices": {
      "unleaded": 84.32,
      "premium95": 84.12,
      "premium97": 84.72,
      "diesel": null,
      "premiumDiesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1873,
    "sourceId": "cmmm5l3lz002o6gg3ovhwmbe1",
    "brand": "total",
    "name": "Total (Sumulong Hwy)",
    "area": "Antipolo",
    "lat": 14.6176847,
    "lng": 121.1329492,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1875,
    "sourceId": "cmmm5li9z00au6gg3iuw7bynb",
    "brand": "caltex",
    "name": "CCN Caltex Service Station",
    "area": "Rodriguez",
    "lat": 14.7168999,
    "lng": 121.1029968,
    "prices": {
      "unleaded": 91.88,
      "premium95": 99.18,
      "diesel": null,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1876,
    "sourceId": "cmmm5muwx011u6gg31toz8uv9",
    "brand": "total",
    "name": "Total tools Station Phil. Cainta",
    "area": "Antipolo",
    "lat": 14.5857318,
    "lng": 121.1169468,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1877,
    "sourceId": "cmmm5ne6401ci6gg39vzc4jf6",
    "brand": "petron",
    "name": "Petron Gasul",
    "area": "Antipolo",
    "lat": 14.6208154,
    "lng": 121.1035943,
    "prices": {
      "premiumDiesel": 130.01,
      "unleaded": 85.86,
      "premium95": 87.76,
      "premium97": 96.86,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1878,
    "sourceId": "cmmm5o73601so6gg3q7iaxi4n",
    "brand": "shell",
    "name": "G Plus Shell",
    "area": "Antipolo",
    "lat": 14.577141,
    "lng": 121.1197531,
    "prices": {
      "premiumDiesel": 137.4,
      "unleaded": 90.23,
      "premium95": 99.13,
      "premium97": 103.83,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1879,
    "sourceId": "cmmm5o7gi01su6gg35uy1g1hq",
    "brand": "shell",
    "name": "New Lamuan Shell",
    "area": "San Mateo",
    "lat": 14.6566836,
    "lng": 121.1035203,
    "prices": {
      "premiumDiesel": 139.6,
      "unleaded": 90.23,
      "premium95": 94.03,
      "premium97": 99.93,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1880,
    "sourceId": "cmmm5o8ck01tc6gg3936sxlhj",
    "brand": "petron",
    "name": "Petron Gasul",
    "area": "Antipolo",
    "lat": 14.6071627,
    "lng": 121.1047576,
    "prices": {
      "premiumDiesel": 130.01,
      "unleaded": 85.86,
      "premium95": 87.76,
      "premium97": 96.86,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1881,
    "sourceId": "cmmm5o9k401tu6gg36bq07h2y",
    "brand": "petron",
    "name": "Petron Gasul MM",
    "area": "San Mateo",
    "lat": 14.65992,
    "lng": 121.104663,
    "prices": {
      "premiumDiesel": 129.01,
      "unleaded": 85.86,
      "premium95": 87.86,
      "premium97": 97.86,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1882,
    "sourceId": "cmmm5oa2e01u06gg387auvq2a",
    "brand": "total",
    "name": "TOTAL GAZ / REGASCO / SOLANE GAZ",
    "area": "Teresa",
    "lat": 14.5871779,
    "lng": 121.1871044,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1883,
    "sourceId": "cmmm5ofp001vu6gg3j5lxj15l",
    "brand": "petron",
    "name": "Petron Evergreen",
    "area": "Antipolo",
    "lat": 14.5864939,
    "lng": 121.163602,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1884,
    "sourceId": "cmmm5ojwg01x66gg3jm33pjfs",
    "brand": "petron",
    "name": "Petron Gasul - Joben Mktg. Antipolo Branch",
    "area": "Antipolo",
    "lat": 14.5875972,
    "lng": 121.1710482,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1885,
    "sourceId": "cmmm5oker01xc6gg3m6x9z19g",
    "brand": "petron",
    "name": "Petron Gasul - Joben Mktg. Sumulong Branch",
    "area": "Antipolo",
    "lat": 14.6178417,
    "lng": 121.132504,
    "prices": {
      "premiumDiesel": 129.01,
      "unleaded": 85.86,
      "premium95": 87.86,
      "premium97": 97.86,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1886,
    "sourceId": "cmmm5okx701xi6gg3iycnu4fj",
    "brand": "petron",
    "name": "Petron Gasul - Joben Mktg. Cogeo Branch",
    "area": "Antipolo",
    "lat": 14.6231573,
    "lng": 121.1684042,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1887,
    "sourceId": "cmmm5olfr01xo6gg3ku3b2s12",
    "brand": "petron",
    "name": "Petron Gasul",
    "area": "Antipolo",
    "lat": 14.600295,
    "lng": 121.1747029,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1896,
    "sourceId": "cmmm5p1u102306gg32uiemzhk",
    "brand": "shell",
    "name": "Shell Antipolo",
    "area": "Rodriguez",
    "lat": 14.7315321,
    "lng": 121.125431,
    "prices": {
      "premiumDiesel": 139.3,
      "unleaded": 90.23,
      "premium95": 95.53,
      "premium97": 99.63,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1898,
    "sourceId": "cmmm5i8ka01b56g83dc2rqq3y",
    "brand": "jetti",
    "name": "Jetti Antipolo",
    "area": "Antipolo",
    "lat": 14.5790445,
    "lng": 121.1842783,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1900,
    "sourceId": "cmmj30i0p00lr6gzcc88s90xn",
    "brand": "petron",
    "name": "PETRON FELIX AVE / IMELDA AVENUE - EN ELLEVE VENTURES, INC.",
    "area": "Antipolo",
    "lat": 14.6144565,
    "lng": 121.1021807,
    "prices": {
      "premiumDiesel": 130.01,
      "unleaded": 85.86,
      "premium95": 87.76,
      "premium97": 96.86,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1901,
    "sourceId": "cmmj30i0s010v6gzcbgus2v4g",
    "brand": "shell",
    "name": "Shell Gas Station",
    "area": "Antipolo",
    "lat": 14.6231142,
    "lng": 121.1115741,
    "prices": {
      "premiumDiesel": 140.2,
      "unleaded": 90.23,
      "premium95": 98.83,
      "premium97": 95.23,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1902,
    "sourceId": "cmmj30i0l00056gzcnjc0hpg2",
    "brand": "petron",
    "name": "Petron 181 Sumulong Hiway corner Hon. B. Soliven",
    "area": "Antipolo",
    "lat": 14.6288903,
    "lng": 121.1223853,
    "prices": {
      "premiumDiesel": 129.01,
      "unleaded": 85.86,
      "premium95": 87.86,
      "premium97": 97.86,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1903,
    "sourceId": "cmmj30i0r00uc6gzc5h3fnvvj",
    "brand": "shell",
    "name": "Shell Gasoline Station",
    "area": "Antipolo",
    "lat": 14.6246488,
    "lng": 121.1313627,
    "prices": {
      "premiumDiesel": 137.6,
      "unleaded": 90.23,
      "premium95": 99.13,
      "premium97": 105.33,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1904,
    "sourceId": "cmmj30i0m002v6gzcf6adl37e",
    "brand": "jetti",
    "name": "Jetti - Bayan-Bayanan (Marikina)",
    "area": "San Mateo",
    "lat": 14.6499076,
    "lng": 121.1138382,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1905,
    "sourceId": "cmmj30i0r00sl6gzc9uqlx6it",
    "brand": "seaoil",
    "name": "Seaoil Balagtas Parang",
    "area": "San Mateo",
    "lat": 14.6600165,
    "lng": 121.1188494,
    "prices": {
      "unleaded": 84.32,
      "premium95": 84.12,
      "premium97": 84.72,
      "diesel": null,
      "premiumDiesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1906,
    "sourceId": "cmmj30i0m002t6gzcqthwy290",
    "brand": "ptt",
    "name": "PTT Station",
    "area": "San Mateo",
    "lat": 14.6604626,
    "lng": 121.1183585,
    "prices": {
      "unleaded": 87.75,
      "diesel": null,
      "premiumDiesel": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1907,
    "sourceId": "cmmj30i0r00sz6gzcqx5rklxb",
    "brand": "flyingv",
    "name": "Flying v Gasoline Station",
    "area": "Rodriguez",
    "lat": 14.6950809,
    "lng": 121.1231491,
    "prices": {
      "unleaded": 85.21,
      "premium95": 87.21,
      "premium97": 92.81,
      "diesel": null,
      "premiumDiesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1908,
    "sourceId": "cmmj30i0s00yt6gzcat79aeit",
    "brand": "petron",
    "name": "Petron Payatas",
    "area": "Rodriguez",
    "lat": 14.7263871,
    "lng": 121.1140899,
    "prices": {
      "premiumDiesel": 131.21,
      "unleaded": 85.86,
      "premium95": 87.86,
      "premium97": 97.36,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1909,
    "sourceId": "cmmm5hk5400ko6g83ywntipsw",
    "brand": "unioil",
    "name": "UniOil - Hwy 2000, Taytay",
    "area": "Antipolo",
    "lat": 14.5527939,
    "lng": 121.1251058,
    "prices": {
      "unleaded": 86.66,
      "premium95": 87.66,
      "diesel": null,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1910,
    "sourceId": "cmmj30i0m007e6gzcf5ovq2yl",
    "brand": "seaoil",
    "name": "SEAOIL TAYTAY (Uncle and Nephews Gasoline Station Co.)",
    "area": "Antipolo",
    "lat": 14.5494476,
    "lng": 121.1404177,
    "prices": {
      "unleaded": 84.32,
      "premium95": 85.32,
      "diesel": null,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1911,
    "sourceId": "cmmm5kmw703rn6g83lhvyqk8l",
    "brand": "unioil",
    "name": "UniOil - Taytay Diversion Rd.",
    "area": "Antipolo",
    "lat": 14.5634432,
    "lng": 121.1385029,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1912,
    "sourceId": "cmmj30i0t012f6gzcsbjmm7e1",
    "brand": "total",
    "name": "Total (L. Wood)",
    "area": "Antipolo",
    "lat": 14.5743402,
    "lng": 121.1402818,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1913,
    "sourceId": "cmmm5kgyb03ls6g83153tp0uz",
    "brand": "cleanfuel",
    "name": "Cleanfuel San Luis",
    "area": "Antipolo",
    "lat": 14.6227416,
    "lng": 121.2079933,
    "prices": {
      "diesel": 90.74,
      "premiumDiesel": null,
      "unleaded": 86.24,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1914,
    "sourceId": "cmmj30i0m00736gzc3f8iq0pb",
    "brand": "seaoil",
    "name": "SEAOIL - MONTALBAN - RIZAL",
    "area": "Rodriguez",
    "lat": 14.730136,
    "lng": 121.1443744,
    "prices": {
      "unleaded": 84.32,
      "premium95": 85.32,
      "diesel": null,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1915,
    "sourceId": "cmmj30i0r00sw6gzcvpwe0hzs",
    "brand": "petron",
    "name": "Petron Gas Station Burgos",
    "area": "Rodriguez",
    "lat": 14.7227674,
    "lng": 121.1409398,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1916,
    "sourceId": "cmna2jh1t009f6gixriv7visq",
    "brand": "shell",
    "name": "ACG SHELL Masinag",
    "area": "Antipolo",
    "lat": 14.6252115,
    "lng": 121.1207391,
    "prices": {
      "premiumDiesel": 137.6,
      "unleaded": 90.23,
      "premium95": 99.13,
      "premium97": 105.33,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1917,
    "sourceId": "cmna2jh6n009l6gixorbfzpav",
    "brand": "shell",
    "name": "Felomar 2 Shell Services Station",
    "area": "Antipolo",
    "lat": 14.6254827,
    "lng": 121.1244847,
    "prices": {
      "premiumDiesel": 137.6,
      "unleaded": 90.23,
      "premium95": 99.13,
      "premium97": 105.33,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1918,
    "sourceId": "cmna2jhb3009r6gixpjtrvnmm",
    "brand": "petron",
    "name": "PETRON GASUL",
    "area": "San Mateo",
    "lat": 14.6518389,
    "lng": 121.1241104,
    "prices": {
      "premiumDiesel": 129.01,
      "unleaded": 85.86,
      "premium95": 87.86,
      "premium97": 97.86,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1919,
    "sourceId": "cmna2jkec00dh6gix3j2ww6yx",
    "brand": "cleanfuel",
    "name": "Cleanfuel Payatas Empire",
    "area": "Rodriguez",
    "lat": 14.7213735,
    "lng": 121.1107781,
    "prices": {
      "diesel": 90.74,
      "premiumDiesel": null,
      "unleaded": 86.24,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1920,
    "sourceId": "cmna2jswr00mn6gixyzikm0nf",
    "brand": "unioil",
    "name": "unioil san juan alaminos",
    "area": "Antipolo",
    "lat": 14.6332007,
    "lng": 121.179185,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1921,
    "sourceId": "cmna2jt0v00mr6gixl50aq3in",
    "brand": "cleanfuel",
    "name": "CleanFuel Cogeo Antipolo",
    "area": "Antipolo",
    "lat": 14.6252416,
    "lng": 121.1469872,
    "prices": {
      "diesel": 90.74,
      "premiumDiesel": null,
      "unleaded": 86.24,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1922,
    "sourceId": "cmna2jt5600mv6gixjk67bhod",
    "brand": "flyingv",
    "name": "Flying V Montalban",
    "area": "Rodriguez",
    "lat": 14.7344522,
    "lng": 121.1584507,
    "prices": {
      "unleaded": 85.21,
      "premium95": 87.21,
      "premium97": 92.01,
      "diesel": null,
      "premiumDiesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1923,
    "sourceId": "cmmj30i0p00jg6gzcfld8me28",
    "brand": "petron",
    "name": "Petron Payatas Road",
    "area": "Rodriguez",
    "lat": 14.7327728,
    "lng": 121.1257668,
    "prices": {
      "premiumDiesel": 131.21,
      "unleaded": 85.86,
      "premium95": 87.86,
      "premium97": 97.36,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1924,
    "sourceId": "cmmm5jjel02nu6g830ztpfv78",
    "brand": "phoenix",
    "name": "Phoenix Antipolo",
    "area": "Antipolo",
    "lat": 14.5729144,
    "lng": 121.1775025,
    "prices": {
      "unleaded": 85.91,
      "premium95": 88.91,
      "diesel": null,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1925,
    "sourceId": "cmmj30i0m00686gzcd64ylaru",
    "brand": "unioil",
    "name": "Unioil Marikina",
    "area": "San Mateo",
    "lat": 14.6508823,
    "lng": 121.1071237,
    "prices": {
      "unleaded": 86.66,
      "premium95": 89.66,
      "premium97": 86.26,
      "diesel": null,
      "premiumDiesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1926,
    "sourceId": "cmmj30i0o00gg6gzcqqgu07kp",
    "brand": "seaoil",
    "name": "Seaoil Antipolo",
    "area": "Antipolo",
    "lat": 14.5837793,
    "lng": 121.1230425,
    "prices": {
      "unleaded": 84.32,
      "premium95": 85.32,
      "diesel": null,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1927,
    "sourceId": "cmmj30i0m00676gzc5jolzxim",
    "brand": "petron",
    "name": "Petron Antipolo",
    "area": "San Mateo",
    "lat": 14.6508872,
    "lng": 121.1092139,
    "prices": {
      "premiumDiesel": 129.01,
      "unleaded": 85.86,
      "premium95": 87.86,
      "premium97": 97.86,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1928,
    "sourceId": "cmmj30i0m00556gzcro4iase9",
    "brand": "petron",
    "name": "Petron Gas Station,mayor Gil Fernando ave,",
    "area": "Antipolo",
    "lat": 14.6277877,
    "lng": 121.1022205,
    "prices": {
      "premiumDiesel": 130.01,
      "unleaded": 85.86,
      "premium95": 87.76,
      "premium97": 96.86,
      "diesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1929,
    "sourceId": "cmmj30i0q00mw6gzc332iakbn",
    "brand": "ptt",
    "name": "PTT Station",
    "area": "Cainta",
    "lat": 14.543263,
    "lng": 121.1282618,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1930,
    "sourceId": "cmmj30i0u016b6gzcgon9voos",
    "brand": "shell",
    "name": "Shell Cainta",
    "area": "Cainta",
    "lat": 14.5433138,
    "lng": 121.1154863,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 112.54,
      "unleaded": 90.23,
      "premium95": 98.83,
      "premium97": 95.23,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1931,
    "sourceId": "cmmj30i0q00mx6gzc07ky78ae",
    "brand": "petron",
    "name": "Petron Cainta",
    "area": "Cainta",
    "lat": 14.5433465,
    "lng": 121.1267668,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 104.13,
      "unleaded": 85.86,
      "premium95": 87.86,
      "premium97": 93.86,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1932,
    "sourceId": "cmmj30i0t011m6gzc0dymv2ab",
    "brand": "total",
    "name": "Total Cainta",
    "area": "Cainta",
    "lat": 14.5436224,
    "lng": 121.1272465,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1933,
    "sourceId": "cmmj30i0r00wf6gzc1296kn73",
    "brand": "phoenix",
    "name": "Phoenix Cainta",
    "area": "Cainta",
    "lat": 14.5522098,
    "lng": 121.0986482,
    "prices": {
      "diesel": 86.94,
      "unleaded": 85.91,
      "premium95": 86.31,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1934,
    "sourceId": "cmmj30i0p00lo6gzcxfuaog40",
    "brand": "caltex",
    "name": "Caltex Sandoval Ave., Pinagbuhatan, Pasig",
    "area": "Cainta",
    "lat": 14.5569957,
    "lng": 121.0973045,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 103.79,
      "unleaded": 91.88,
      "premium95": 100.43,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1935,
    "sourceId": "cmn9192u800306g4bnrxitqda",
    "brand": "petron",
    "name": "Petron Gasol",
    "area": "Cainta",
    "lat": 14.5577519,
    "lng": 121.0968486,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 104.13,
      "unleaded": 85.86,
      "premium95": 87.76,
      "premium97": 96.86,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1936,
    "sourceId": "cmmm5nxl601nc6gg3aislrakm",
    "brand": "petron",
    "name": "Petron Plus Service Station",
    "area": "Cainta",
    "lat": 14.5581186,
    "lng": 121.094918,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 104.13,
      "unleaded": 85.86,
      "premium95": 87.76,
      "premium97": 96.86,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1937,
    "sourceId": "cmmj30i0s00zi6gzc1c8uytpx",
    "brand": "caltex",
    "name": "Caltex Cainta",
    "area": "Cainta",
    "lat": 14.5653578,
    "lng": 121.0942217,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 103.79,
      "unleaded": 91.88,
      "premium95": 100.43,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1938,
    "sourceId": "cmmj30i0o00dk6gzc9axiwnug",
    "brand": "flyingv",
    "name": "Flying V Cainta",
    "area": "Cainta",
    "lat": 14.5659923,
    "lng": 121.0942515,
    "prices": {
      "diesel": 100.45,
      "unleaded": 85.21,
      "premium95": 85.61,
      "premium97": 90.61,
      "premiumDiesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1939,
    "sourceId": "cmmj30i0u01716gzcqiuihgqi",
    "brand": "caltex",
    "name": "Caltex triple A's",
    "area": "Cainta",
    "lat": 14.5708821,
    "lng": 121.0917339,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 103.79,
      "unleaded": 91.88,
      "premium95": 100.43,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1940,
    "sourceId": "cmmj30i0s00x36gzc1qkjhdip",
    "brand": "total",
    "name": "Total (Eusebio)",
    "area": "Cainta",
    "lat": 14.5713187,
    "lng": 121.0907823,
    "prices": {
      "diesel": 94.14,
      "unleaded": 83.28,
      "premiumDiesel": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1941,
    "sourceId": "cmmj30i0p00ic6gzc6756juyb",
    "brand": "ptt",
    "name": "PTT Cainta",
    "area": "Cainta",
    "lat": 14.5752964,
    "lng": 121.0959449,
    "prices": {
      "diesel": 90.01,
      "unleaded": 87.75,
      "premiumDiesel": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1942,
    "sourceId": "cmna2jjqm00cr6gixlqlxwjxi",
    "brand": "flyingv",
    "name": "Flying V Cainta",
    "area": "Cainta",
    "lat": 14.5753366,
    "lng": 121.0917246,
    "prices": {
      "diesel": 100.45,
      "unleaded": 85.21,
      "premium95": 85.61,
      "premium97": 90.61,
      "premiumDiesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1943,
    "sourceId": "cmmj30i0p00ly6gzc2smkuoa9",
    "brand": "shell",
    "name": "Shell Cainta",
    "area": "Cainta",
    "lat": 14.5817417,
    "lng": 121.0979688,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 112.54,
      "unleaded": 90.23,
      "premium95": 98.83,
      "premium97": 95.23,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1944,
    "sourceId": "cmmj30i0p00lw6gzc0u2uvzhx",
    "brand": "caltex",
    "name": "Floodway Caltex Gas Station",
    "area": "Cainta",
    "lat": 14.5829209,
    "lng": 121.0972361,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 103.79,
      "unleaded": 91.88,
      "premium95": 100.43,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1945,
    "sourceId": "cmmj30i0p00lx6gzct6m5rtyl",
    "brand": "cleanfuel",
    "name": "Cleanfuel Ortigas",
    "area": "Cainta",
    "lat": 14.5892505,
    "lng": 121.1007398,
    "prices": {
      "diesel": 90.74,
      "premiumDiesel": null,
      "unleaded": 86.24,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1946,
    "sourceId": "cmmj30i0t013u6gzc0q07b5oc",
    "brand": "caltex",
    "name": "Caltex Ortigas Ave",
    "area": "Cainta",
    "lat": 14.5892979,
    "lng": 121.0990879,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 103.79,
      "unleaded": 91.88,
      "premium95": 100.43,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1947,
    "sourceId": "cmmm5o8na01ti6gg3gldx8tca",
    "brand": "petron",
    "name": "Petron Gasul",
    "area": "Cainta",
    "lat": 14.5894453,
    "lng": 121.0983398,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 104.13,
      "unleaded": 85.86,
      "premium95": 87.76,
      "premium97": 96.86,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1948,
    "sourceId": "cmmj30i0q00pi6gzcijon2zad",
    "brand": "cleanfuel",
    "name": "Cleanfuel Cainta",
    "area": "Cainta",
    "lat": 14.5896631,
    "lng": 121.0994443,
    "prices": {
      "diesel": 90.74,
      "premiumDiesel": null,
      "unleaded": 86.24,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1949,
    "sourceId": "cmmj30i0o00et6gzcbyfn2rvg",
    "brand": "shell",
    "name": "Shell Cainta",
    "area": "Cainta",
    "lat": 14.5898651,
    "lng": 121.0990539,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 112.54,
      "unleaded": 90.23,
      "premium95": 98.83,
      "premium97": 95.23,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1950,
    "sourceId": "cmmj30i0o00gi6gzczsqqob0w",
    "brand": "unioil",
    "name": "UniOil - Ortigas Ave",
    "area": "Cainta",
    "lat": 14.5899168,
    "lng": 121.0968645,
    "prices": {
      "diesel": 101.26,
      "unleaded": 86.66,
      "premium95": 88.66,
      "premium97": 93.66,
      "premiumDiesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1951,
    "sourceId": "cmmj30i0o00ff6gzcxv5ce1qo",
    "brand": "shell",
    "name": "Shell Cainta",
    "area": "Cainta",
    "lat": 14.5900879,
    "lng": 121.0899534,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 112.54,
      "unleaded": 90.23,
      "premium95": 98.83,
      "premium97": 95.23,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1952,
    "sourceId": "cmmj30i0t013t6gzc21nariye",
    "brand": "petron",
    "name": "Petron Ortigas Avenue Extension - Rosario, Pasig",
    "area": "Cainta",
    "lat": 14.5906148,
    "lng": 121.0901164,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 104.13,
      "unleaded": 85.86,
      "premium95": 87.76,
      "premium97": 96.86,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1953,
    "sourceId": "cmmj30i0r00vl6gzchfhyug6e",
    "brand": "petron",
    "name": "Petron Manggahan",
    "area": "Cainta",
    "lat": 14.5995947,
    "lng": 121.091804,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 104.13,
      "unleaded": 85.86,
      "premium95": 87.76,
      "premium97": 96.86,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1954,
    "sourceId": "cmmj30i0r00ti6gzcdv8zczmg",
    "brand": "phoenix",
    "name": "Phoenix - Amang Rodriguez Ave, Manggahan",
    "area": "Cainta",
    "lat": 14.6001311,
    "lng": 121.0920306,
    "prices": {
      "diesel": 86.94,
      "unleaded": 85.91,
      "premium95": 86.31,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1955,
    "sourceId": "cmmm5mubg011i6gg3jvzdbqn5",
    "brand": "petron",
    "name": "Petron Gasul",
    "area": "Cainta",
    "lat": 14.6067405,
    "lng": 121.0921422,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 104.13,
      "unleaded": 85.86,
      "premium95": 87.76,
      "premium97": 96.86,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1956,
    "sourceId": "cmmj30i0m005e6gzc2pdryu1x",
    "brand": "caltex",
    "name": "Caltex Cainta",
    "area": "Cainta",
    "lat": 14.6096603,
    "lng": 121.092272,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 103.79,
      "unleaded": 91.88,
      "premium95": 100.43,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1957,
    "sourceId": "cmmj30i0r00vh6gzcg3s44k8d",
    "brand": "shell",
    "name": "Shell Cainta",
    "area": "Cainta",
    "lat": 14.6116379,
    "lng": 121.0923246,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 112.54,
      "unleaded": 90.23,
      "premium95": 98.83,
      "premium97": 95.23,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1958,
    "sourceId": "cmmm5l8nt005i6gg3febiaem2",
    "brand": "total",
    "name": "Total Lubricants",
    "area": "Cainta",
    "lat": 14.6128066,
    "lng": 121.092076,
    "prices": {
      "diesel": 94.14,
      "unleaded": 83.28,
      "premiumDiesel": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1959,
    "sourceId": "cmmj30i0r00u06gzcxpvoxver",
    "brand": "cleanfuel",
    "name": "Cleanfuel E. Rodriguez",
    "area": "Cainta",
    "lat": 14.6164048,
    "lng": 121.0925414,
    "prices": {
      "diesel": 90.74,
      "premiumDiesel": null,
      "unleaded": 86.24,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1960,
    "sourceId": "cmmj30i0u01726gzcidvyj71o",
    "brand": "unioil",
    "name": "UniOil - Marcos Hwy, Santolan",
    "area": "Cainta",
    "lat": 14.6186753,
    "lng": 121.0896462,
    "prices": {
      "diesel": 101.26,
      "unleaded": 86.66,
      "premium95": 88.66,
      "premium97": 93.66,
      "premiumDiesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1961,
    "sourceId": "cmmj30i0o00d06gzcon86lehm",
    "brand": "petron",
    "name": "Petron Cainta",
    "area": "Cainta",
    "lat": 14.6200734,
    "lng": 121.0970264,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 104.13,
      "unleaded": 85.86,
      "premium95": 87.76,
      "premium97": 96.86,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1962,
    "sourceId": "cmmj30i0n008o6gzcq9xfgwtb",
    "brand": "cleanfuel",
    "name": "Cleanfuel Cainta",
    "area": "Cainta",
    "lat": 14.6202399,
    "lng": 121.0981447,
    "prices": {
      "diesel": 90.74,
      "premiumDiesel": null,
      "unleaded": 86.24,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1963,
    "sourceId": "cmmj30i0m00596gzcyt7d5v3r",
    "brand": "shell",
    "name": "Shell Cainta",
    "area": "Cainta",
    "lat": 14.6203741,
    "lng": 121.0986761,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 112.54,
      "unleaded": 90.23,
      "premium95": 98.83,
      "premium97": 95.23,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1964,
    "sourceId": "cmmj30i0m005a6gzc52m0ieaj",
    "brand": "caltex",
    "name": "Caltex Cainta",
    "area": "Cainta",
    "lat": 14.6205014,
    "lng": 121.0993293,
    "prices": {
      "diesel": 104.49,
      "premiumDiesel": 103.79,
      "unleaded": 91.88,
      "premium95": 100.43,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1965,
    "sourceId": "cmmj30i0r00tz6gzcshtjmh86",
    "brand": "total",
    "name": "Total Cainta",
    "area": "Cainta",
    "lat": 14.6263486,
    "lng": 121.0965462,
    "prices": {
      "diesel": 94.14,
      "unleaded": 83.28,
      "premiumDiesel": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1966,
    "sourceId": "cmmj30i0n00co6gzcatoa3bnr",
    "brand": "shell",
    "name": "Shell Cainta",
    "area": "Cainta",
    "lat": 14.6295657,
    "lng": 121.0966303,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 110.84,
      "unleaded": 90.23,
      "premium95": 99.13,
      "premium97": 105.33,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1967,
    "sourceId": "cmmj30i0n008l6gzcve446gv1",
    "brand": "seaoil",
    "name": "SEAOIL - JP RIZAL - MARIKINA",
    "area": "Cainta",
    "lat": 14.6372856,
    "lng": 121.0943745,
    "prices": {
      "diesel": 101.64,
      "unleaded": 84.32,
      "premium95": 93.52,
      "premium97": 89.22,
      "premiumDiesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1968,
    "sourceId": "cmmm5oq0101z66gg3kjsjddfq",
    "brand": "cleanfuel",
    "name": "Clean Fuel Tagpos Binangonan",
    "area": "Taytay",
    "lat": 14.5094448,
    "lng": 121.166125,
    "prices": {
      "diesel": 90.74,
      "premiumDiesel": null,
      "unleaded": 86.24,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1969,
    "sourceId": "cmmm5ogps01w66gg3m2hd97xz",
    "brand": "caltex",
    "name": "Caltex Binangonan National Road",
    "area": "Taytay",
    "lat": 14.5110292,
    "lng": 121.1649661,
    "prices": {
      "diesel": 104.49,
      "unleaded": 91.88,
      "premium95": 93.88,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1971,
    "sourceId": "cmmm5in2p01qa6g83zdvw1qhu",
    "brand": "petron",
    "name": "Petron Taytay",
    "area": "Taytay",
    "lat": 14.5127665,
    "lng": 121.1641305,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1972,
    "sourceId": "cmmm5imxg01q46g83upbwntqc",
    "brand": "caltex",
    "name": "Caltex Taytay",
    "area": "Taytay",
    "lat": 14.5147152,
    "lng": 121.1620396,
    "prices": {
      "diesel": 104.49,
      "unleaded": 91.88,
      "premium95": 93.88,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1973,
    "sourceId": "cmmm5iuot01yd6g83ampyu4n9",
    "brand": "shell",
    "name": "Shell Gasoline - Pag-asa",
    "area": "Taytay",
    "lat": 14.520013,
    "lng": 121.157117,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 111.04,
      "unleaded": 90.23,
      "premium95": 99.13,
      "premium97": 103.83,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1975,
    "sourceId": "cmmm5k70e03bu6g83x44vax7k",
    "brand": "unioil",
    "name": "Unioil Pag-asa, Binangonan",
    "area": "Taytay",
    "lat": 14.5222675,
    "lng": 121.1577376,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1976,
    "sourceId": "cmmm5k71q03bv6g83klbfteju",
    "brand": "petron",
    "name": "Petron — Pag-Asa Binangonan",
    "area": "Taytay",
    "lat": 14.5222825,
    "lng": 121.1547743,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1978,
    "sourceId": "cmmm5iukt01ya6g831vh99vm1",
    "brand": "flyingv",
    "name": "Flying V Pagasa",
    "area": "Taytay",
    "lat": 14.5254144,
    "lng": 121.1575864,
    "prices": {
      "diesel": 100.45,
      "unleaded": 85.21,
      "premium95": 87.21,
      "premium97": 92.01,
      "premiumDiesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1982,
    "sourceId": "cmmm5i49h016k6g83a58llnro",
    "brand": "jetti",
    "name": "Jetti Taytay",
    "area": "Taytay",
    "lat": 14.5306712,
    "lng": 121.1538404,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1983,
    "sourceId": "cmmm5kjan03o56g83mpe9tiv8",
    "brand": "ptt",
    "name": "PTT Taytay",
    "area": "Taytay",
    "lat": 14.5307207,
    "lng": 121.1532292,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1985,
    "sourceId": "cmmm5of6h01vo6gg35curjlew",
    "brand": "petron",
    "name": "Petron Gasul",
    "area": "Taytay",
    "lat": 14.531583,
    "lng": 121.1414997,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1986,
    "sourceId": "cmmm5i3b5015k6g83hei1m8zp",
    "brand": "seaoil",
    "name": "SEAOIL - San Isidro Angono",
    "area": "Taytay",
    "lat": 14.536296,
    "lng": 121.1501364,
    "prices": {
      "diesel": 101.64,
      "unleaded": 84.32,
      "premium95": 85.32,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1987,
    "sourceId": "cmmj30i0t012i6gzcpw1tmp65",
    "brand": "shell",
    "name": "Shell Taytay",
    "area": "Taytay",
    "lat": 14.53817,
    "lng": 121.1487286,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 111.04,
      "unleaded": 90.23,
      "premium95": 99.13,
      "premium97": 103.83,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1988,
    "sourceId": "cmmm5oh8601wc6gg3wbg4n01g",
    "brand": "cleanfuel",
    "name": "Cleanfuel Angono",
    "area": "Taytay",
    "lat": 14.5395113,
    "lng": 121.1470234,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "premium95": 88.24,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1990,
    "sourceId": "cmmj30i0m007a6gzcl1kxdyir",
    "brand": "phoenix",
    "name": "Phoenix Taytay",
    "area": "Taytay",
    "lat": 14.54218,
    "lng": 121.1321018,
    "prices": {
      "diesel": 86.94,
      "unleaded": 85.91,
      "premium95": 88.91,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1991,
    "sourceId": "cmmm5ijmo01mo6g83lrlazz6i",
    "brand": "shell",
    "name": "Shell Angono",
    "area": "Angono",
    "lat": 14.4856294,
    "lng": 121.1868251,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 111.04,
      "unleaded": 90.23,
      "premium95": 99.13,
      "premium97": 103.83,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1993,
    "sourceId": "cmmm5o2c401q06gg3blkwu7wd",
    "brand": "total",
    "name": "Total Gaz",
    "area": "Angono",
    "lat": 14.487782,
    "lng": 121.185706,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1994,
    "sourceId": "cmmm5i5sp01876g83frldfwpw",
    "brand": "jetti",
    "name": "Jetti Angono",
    "area": "Angono",
    "lat": 14.4884351,
    "lng": 121.1857545,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1996,
    "sourceId": "cmmm5ijha01mk6g83zh0ka2ga",
    "brand": "flyingv",
    "name": "Flying V Angono",
    "area": "Angono",
    "lat": 14.4958304,
    "lng": 121.181039,
    "prices": {
      "diesel": 100.45,
      "unleaded": 85.21,
      "premium95": 87.21,
      "premium97": 92.01,
      "premiumDiesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1998,
    "sourceId": "cmmm5ijin01ml6g83mh79j8ei",
    "brand": "flyingv",
    "name": "Flying V Pantok",
    "area": "Angono",
    "lat": 14.4982422,
    "lng": 121.182758,
    "prices": {
      "diesel": 100.45,
      "unleaded": 85.21,
      "premium95": 87.21,
      "premium97": 92.01,
      "premiumDiesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 1999,
    "sourceId": "cmmm5gyzc000c6g83kth8zmmq",
    "brand": "petron",
    "name": "Petron Binangonan",
    "area": "Cardona",
    "lat": 14.471791,
    "lng": 121.230781,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2000,
    "sourceId": "cmmm5hbjk00cg6g83zetq9nqt",
    "brand": "caltex",
    "name": "Caltex Binangonan",
    "area": "Baras",
    "lat": 14.5208348,
    "lng": 121.2699875,
    "prices": {
      "diesel": 104.49,
      "unleaded": 91.88,
      "premium95": 93.88,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2001,
    "sourceId": "cmmm5hczz00dz6g83bw8wq49l",
    "brand": "flyingv",
    "name": "Flying V Binangonan",
    "area": "Baras",
    "lat": 14.5238167,
    "lng": 121.2401806,
    "prices": {
      "diesel": 100.45,
      "unleaded": 85.21,
      "premium95": 87.21,
      "premium97": 92.01,
      "premiumDiesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2002,
    "sourceId": "cmmm5hcuz00dt6g83ie95htx2",
    "brand": "seaoil",
    "name": "Seaoil Morong",
    "area": "Morong",
    "lat": 14.5087412,
    "lng": 121.2369465,
    "prices": {
      "diesel": 101.64,
      "unleaded": 84.32,
      "premium95": 85.32,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2003,
    "sourceId": "cmmm5hfm700go6g8305sbcic7",
    "brand": "total",
    "name": "Total Binangonan",
    "area": "Morong",
    "lat": 14.5063323,
    "lng": 121.2355963,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2004,
    "sourceId": "cmmm5hgmt00hm6g83alfpbs1v",
    "brand": "petron",
    "name": "Petron Binangonan",
    "area": "Baras",
    "lat": 14.5248845,
    "lng": 121.2387696,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2005,
    "sourceId": "cmmm5hwju00ya6g83caoftjvu",
    "brand": "petron",
    "name": "Petron Binangonan",
    "area": "Binangonan",
    "lat": 14.2538886,
    "lng": 121.1282796,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 104.23,
      "unleaded": 85.86,
      "premium95": 87.96,
      "premium97": 98.36,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2006,
    "sourceId": "cmmm5hwii00y96g83kyuzfgfz",
    "brand": "phoenix",
    "name": "Phoenix Gasoline Station - Sala, Cabuyao City",
    "area": "Binangonan",
    "lat": 14.2678907,
    "lng": 121.1267107,
    "prices": {
      "diesel": 86.94,
      "unleaded": 85.91,
      "premium95": 86.91,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2007,
    "sourceId": "cmmm5i5u101886g83xvy2gw7b",
    "brand": "petron",
    "name": "Petron Binangonan",
    "area": "Binangonan",
    "lat": 14.4689988,
    "lng": 121.190258,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2008,
    "sourceId": "cmmm5i6l801936g83qko5og7w",
    "brand": "seaoil",
    "name": "SEAOIL - San Jose Baras",
    "area": "Baras",
    "lat": 14.5265779,
    "lng": 121.2675601,
    "prices": {
      "diesel": 101.64,
      "unleaded": 84.32,
      "premium95": 85.32,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2009,
    "sourceId": "cmmm5id5t01g26g83b1a0qr9i",
    "brand": "petron",
    "name": "Petron Binangonan",
    "area": "Binangonan",
    "lat": 14.2714191,
    "lng": 121.1255695,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 104.12,
      "unleaded": 85.86,
      "premium95": 87.86,
      "premium97": 95.86,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2010,
    "sourceId": "cmmm5ifx701j06g837bjm7cba",
    "brand": "phoenix",
    "name": "Phoenix Binangonan",
    "area": "Baras",
    "lat": 14.5278696,
    "lng": 121.244333,
    "prices": {
      "diesel": 86.94,
      "unleaded": 85.91,
      "premium95": 88.91,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2011,
    "sourceId": "cmmm5ijjy01mm6g83gs171bnk",
    "brand": "phoenix",
    "name": "Phoenix Binangonan",
    "area": "Binangonan",
    "lat": 14.4781943,
    "lng": 121.1934122,
    "prices": {
      "diesel": 86.94,
      "unleaded": 85.91,
      "premium95": 88.91,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2012,
    "sourceId": "cmmm5j8nc02d66g837jq2lz99",
    "brand": "petron",
    "name": "Petron Tanay",
    "area": "Baras",
    "lat": 14.5012491,
    "lng": 121.2840937,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2013,
    "sourceId": "cmmm5jjws02ob6g83tf0i5wr2",
    "brand": "shell",
    "name": "Shell Binangonan",
    "area": "Teresa",
    "lat": 14.528815,
    "lng": 121.245195,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 111.04,
      "unleaded": 90.23,
      "premium95": 99.13,
      "premium97": 103.83,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2014,
    "sourceId": "cmmm5jk2002oh6g83jhklgvey",
    "brand": "petron",
    "name": "Petron Binangonan",
    "area": "Baras",
    "lat": 14.5156418,
    "lng": 121.2388559,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2015,
    "sourceId": "cmmm5jk7302on6g8381516dye",
    "brand": "flyingv",
    "name": "Flying V Binangonan",
    "area": "Cardona",
    "lat": 14.4813194,
    "lng": 121.2269456,
    "prices": {
      "diesel": 100.45,
      "unleaded": 85.21,
      "premium95": 87.21,
      "premium97": 92.01,
      "premiumDiesel": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2016,
    "sourceId": "cmmm5jjls02nz6g83v3nq7ect",
    "brand": "seaoil",
    "name": "SEAOIL - SANTIAGO - BARAS",
    "area": "Baras",
    "lat": 14.5229766,
    "lng": 121.2618031,
    "prices": {
      "diesel": 101.64,
      "unleaded": 84.32,
      "premium95": 85.32,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2017,
    "sourceId": "cmmm5jjrb02o56g83z3hwemp7",
    "brand": "petron",
    "name": "Petron Baras Station",
    "area": "Baras",
    "lat": 14.522721,
    "lng": 121.262435,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2018,
    "sourceId": "cmmm5jtf302y46g83o4fc17kw",
    "brand": "petron",
    "name": "PETRON TERESA",
    "area": "Teresa",
    "lat": 14.544129,
    "lng": 121.222785,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2019,
    "sourceId": "cmmm5kh2b03lv6g839tuuj7zl",
    "brand": "shell",
    "name": "Shell Gas Station",
    "area": "Morong",
    "lat": 14.4752931,
    "lng": 121.2035353,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 111.04,
      "unleaded": 90.23,
      "premium95": 99.13,
      "premium97": 103.83,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2020,
    "sourceId": "cmmm5kn7o03ry6g839gl6ra23",
    "brand": "shell",
    "name": "Shell Binangonan",
    "area": "Teresa",
    "lat": 14.5436159,
    "lng": 121.222662,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 111.04,
      "unleaded": 90.23,
      "premium95": 99.13,
      "premium97": 103.83,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2021,
    "sourceId": "cmmm5ncza01bu6gg3am2yeb5z",
    "brand": "shell",
    "name": "Shell Binangonan",
    "area": "Binangonan",
    "lat": 14.271437,
    "lng": 121.12295,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 114.54,
      "unleaded": 90.23,
      "premium95": 94.03,
      "premium97": 98.13,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2022,
    "sourceId": "cmmm5negv01co6gg3yzi4atv7",
    "brand": "petron",
    "name": "Petron Binangonan",
    "area": "Binangonan",
    "lat": 14.2532144,
    "lng": 121.128554,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 104.23,
      "unleaded": 85.86,
      "premium95": 87.96,
      "premium97": 98.36,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2023,
    "sourceId": "cmmm5nh5601e66gg3cxwq73ae",
    "brand": "shell",
    "name": "Shell Cabuyao Marinig Shouthville Road",
    "area": "Binangonan",
    "lat": 14.2768393,
    "lng": 121.1327524,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 114.54,
      "unleaded": 90.23,
      "premium95": 94.03,
      "premium97": 98.13,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2024,
    "sourceId": "cmmm5nhqm01ei6gg3ced8u0un",
    "brand": "total",
    "name": "Total (Cabuyao)",
    "area": "Binangonan",
    "lat": 14.2708062,
    "lng": 121.1240589,
    "prices": {
      "diesel": 92.38,
      "unleaded": 79.56,
      "premium95": 81.66,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2025,
    "sourceId": "cmmm5ni1601eo6gg33ercraxu",
    "brand": "shell",
    "name": "Shell Select",
    "area": "Binangonan",
    "lat": 14.2720266,
    "lng": 121.1238136,
    "prices": {
      "diesel": 101.64,
      "unleaded": 84.32,
      "premium95": 84.82,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2026,
    "sourceId": "cmmm5o6sg01si6gg3ishg70m4",
    "brand": "shell",
    "name": "Shell Binangonan",
    "area": "Baras",
    "lat": 14.514803,
    "lng": 121.284071,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 111.04,
      "unleaded": 90.23,
      "premium95": 99.13,
      "premium97": 103.83,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2032,
    "sourceId": "cmmm5ov75020u6gg30o4rc1py",
    "brand": "petron",
    "name": "Petron Gasul",
    "area": "Cardona",
    "lat": 14.4855552,
    "lng": 121.2299848,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2034,
    "sourceId": "cmmm5ow8002166gg3ocyeagnk",
    "brand": "petron",
    "name": "Petron Gasul - GoTech Ventures Inc.",
    "area": "Binangonan",
    "lat": 14.4673976,
    "lng": 121.193203,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2037,
    "sourceId": "cmmm5p3vd023o6gg30kyrjyx7",
    "brand": "cleanfuel",
    "name": "CLEANFUEL TERESA",
    "area": "Teresa",
    "lat": 14.5429718,
    "lng": 121.2216257,
    "prices": {
      "diesel": 90.74,
      "unleaded": 86.24,
      "premium95": 88.24,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2038,
    "sourceId": "cmmm5k3x6038w6g83049e5h42",
    "brand": "phoenix",
    "name": "Phoenix Cabuyao Hi-Way",
    "area": "Binangonan",
    "lat": 14.272177,
    "lng": 121.1221959,
    "prices": {
      "diesel": 86.94,
      "unleaded": 85.91,
      "premium95": 88.91,
      "premiumDiesel": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2039,
    "sourceId": "cmna2jqnk00k86gixka8qfoe4",
    "brand": "petron",
    "name": "Cecilia's Petron Gas Station",
    "area": "Binangonan",
    "lat": 14.2783333,
    "lng": 121.1247222,
    "prices": {
      "diesel": 101.13,
      "premiumDiesel": 104.12,
      "unleaded": 85.86,
      "premium95": 87.86,
      "premium97": 95.86,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2040,
    "sourceId": "cmna2jqxb00kj6gixbicdn6oq",
    "brand": "ptt",
    "name": "Ptt Station",
    "area": "Binangonan",
    "lat": 14.2805731,
    "lng": 121.1207303,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2041,
    "sourceId": "cmna2jt9j00mz6gixmiao31ig",
    "brand": "shell",
    "name": "Ark Shell Service Station",
    "area": "Binangonan",
    "lat": 14.4771307,
    "lng": 121.1947611,
    "prices": {
      "diesel": 103.44,
      "premiumDiesel": 111.04,
      "unleaded": 90.23,
      "premium95": 99.13,
      "premium97": 103.83,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2042,
    "sourceId": "cmmj30i0r00sv6gzc57ekpc2y",
    "brand": "total",
    "name": "Filoil by Total (Rodriguez)",
    "area": "Rodriguez",
    "lat": 14.7617769,
    "lng": 121.1406438,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2043,
    "sourceId": "cmmm5luay00hi6gg37y89rbhz",
    "brand": "shell",
    "name": "PIP Shell Station",
    "area": "Rodriguez",
    "lat": 14.8734863,
    "lng": 121.1442383,
    "prices": {
      "diesel": 104.86,
      "premiumDiesel": 112.46,
      "unleaded": 89.09,
      "premium95": 97.99,
      "premium97": 102.69,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2044,
    "sourceId": "cmmm5p2ca02366gg336swvz8l",
    "brand": "total",
    "name": "Fiesta Gas",
    "area": "Rodriguez",
    "lat": 14.700953,
    "lng": 121.124743,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2045,
    "sourceId": "cmna2jbnz002w6gixrvkr11fs",
    "brand": "shell",
    "name": "Shell Payatas Road",
    "area": "Rodriguez",
    "lat": 14.7099419,
    "lng": 121.0908615,
    "prices": {
      "diesel": 104.86,
      "premiumDiesel": 112.46,
      "unleaded": 88.69,
      "premium95": 97.99,
      "premium97": 102.69,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2046,
    "sourceId": "cmna2jcfn003u6gix8q4olxyk",
    "brand": "caltex",
    "name": "Perfect Choice Gas Station (Caltex)",
    "area": "Rodriguez",
    "lat": 14.7619651,
    "lng": 121.0915493,
    "prices": {
      "diesel": 101.46,
      "premiumDiesel": null,
      "unleaded": 90.49,
      "premium95": 99.09,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2047,
    "sourceId": "cmna2jk9e00db6gixas3z9kx2",
    "brand": "petron",
    "name": "Petron Gasul",
    "area": "Rodriguez",
    "lat": 14.6834296,
    "lng": 121.1000742,
    "prices": {
      "diesel": 102.36,
      "premiumDiesel": 106.76,
      "unleaded": 84.29,
      "premium95": 86.29,
      "premium97": 102.49,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2048,
    "sourceId": "cmmj30i0n00bd6gzcihpai6p9",
    "brand": "petron",
    "name": "Petron San Mateo Road",
    "area": "Rodriguez",
    "lat": 14.6891471,
    "lng": 121.0982139,
    "prices": {
      "diesel": 102.36,
      "premiumDiesel": 106.76,
      "unleaded": 84.29,
      "premium95": 86.29,
      "premium97": 102.49,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2049,
    "sourceId": "cmmm5oriq01zo6gg39qz3zjqo",
    "brand": "total",
    "name": "SAN PEDRO",
    "area": "Teresa",
    "lat": 14.529671,
    "lng": 121.2301009,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2050,
    "sourceId": "cmmm5h8od009z6g83e04dix03",
    "brand": "seaoil",
    "name": "SEAOIL - Tanay Pililia",
    "area": "Baras",
    "lat": 14.4906358,
    "lng": 121.2973936,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2051,
    "sourceId": "cmmm5kn1e03rr6g832kcyk2e7",
    "brand": "petron",
    "name": "Petron Gas Station Pililla",
    "area": "Baras",
    "lat": 14.4914193,
    "lng": 121.3043465,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2052,
    "sourceId": "cmmm5o09b01ou6gg3lez67bp8",
    "brand": "seaoil",
    "name": "Seaoil F. Catapusan Street",
    "area": "Baras",
    "lat": 14.4929613,
    "lng": 121.2936383,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2053,
    "sourceId": "cmmm5h5nw006x6g836p9uzbcb",
    "brand": "total",
    "name": "Total Exit Road",
    "area": "Baras",
    "lat": 14.4938426,
    "lng": 121.2906228,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2054,
    "sourceId": "cmmm5p1bn022u6gg3p45c8lr9",
    "brand": "total",
    "name": "Double E Car Care Center - Pililla Rizal (Yokohama Distributor)",
    "area": "Baras",
    "lat": 14.4944998,
    "lng": 121.3006159,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2055,
    "sourceId": "cmmm5hguk00hu6g83i4ux29a6",
    "brand": "cleanfuel",
    "name": "Cleanfuel F. Catapusan Street",
    "area": "Baras",
    "lat": 14.4945592,
    "lng": 121.2908027,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2056,
    "sourceId": "cmmm5j8i802d06g83l6ecxnay",
    "brand": "shell",
    "name": "Shell F. Catapusan Street",
    "area": "Baras",
    "lat": 14.4958431,
    "lng": 121.2891876,
    "prices": {
      "diesel": 104.86,
      "premiumDiesel": 112.46,
      "unleaded": 89.09,
      "premium95": 97.99,
      "premium97": 102.69,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2057,
    "sourceId": "cmmm5j8sf02dc6g83ddl54cm8",
    "brand": "flyingv",
    "name": "Flying V Sampaloc Road",
    "area": "Baras",
    "lat": 14.4965131,
    "lng": 121.2923998,
    "prices": {
      "diesel": 103.76,
      "premiumDiesel": null,
      "unleaded": 86.09,
      "premium95": 88.09,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2058,
    "sourceId": "cmmm5jtpf02yg6g83mmq64z6m",
    "brand": "seaoil",
    "name": "SEAOIL - Tanay Rizal",
    "area": "Baras",
    "lat": 14.5047745,
    "lng": 121.2987514,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2059,
    "sourceId": "cmmm5jjix02nx6g83vu7zw3wq",
    "brand": "flyingv",
    "name": "Flying V Sagbat-Pililla Diversion Road",
    "area": "Baras",
    "lat": 14.5058213,
    "lng": 121.2899959,
    "prices": {
      "diesel": 103.76,
      "premiumDiesel": null,
      "unleaded": 86.09,
      "premium95": 88.09,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2060,
    "sourceId": "cmmm5onz601yi6gg3jc9i1grt",
    "brand": "shell",
    "name": "Smartfuels Baras 2",
    "area": "Baras",
    "lat": 14.5267674,
    "lng": 121.2634364,
    "prices": {
      "diesel": 104.86,
      "premiumDiesel": 112.46,
      "unleaded": 89.09,
      "premium95": 97.99,
      "premium97": 102.69,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2061,
    "sourceId": "cmmm5onh001yc6gg3vywzgcdp",
    "brand": "shell",
    "name": "MA Gas - Baras",
    "area": "Baras",
    "lat": 14.5269307,
    "lng": 121.2619848,
    "prices": {
      "diesel": 104.86,
      "premiumDiesel": 112.46,
      "unleaded": 89.09,
      "premium95": 97.99,
      "premium97": 102.69,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2062,
    "sourceId": "cmmm5oohd01yo6gg307l49olg",
    "brand": "shell",
    "name": "Hillsview Plaza",
    "area": "Baras",
    "lat": 14.5365625,
    "lng": 121.2740813,
    "prices": {
      "diesel": 104.86,
      "premiumDiesel": 112.46,
      "unleaded": 89.09,
      "premium95": 97.99,
      "premium97": 102.69,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2063,
    "sourceId": "cmmm5oozk01yu6gg3jf8kp59n",
    "brand": "total",
    "name": "Global Oil Sitio Kapatagan",
    "area": "Baras",
    "lat": 14.6127739,
    "lng": 121.2529526,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2064,
    "sourceId": "cmmm5omgi01y06gg35llearjm",
    "brand": "shell",
    "name": "Smartfuels Baras Marcos Hwy",
    "area": "Baras",
    "lat": 14.6214499,
    "lng": 121.2621632,
    "prices": {
      "diesel": 104.86,
      "premiumDiesel": 112.46,
      "unleaded": 89.09,
      "premium95": 97.99,
      "premium97": 102.69,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2065,
    "sourceId": "cmmm5omyv01y66gg3cf041qua",
    "brand": "shell",
    "name": "VES Industrial Trade and Solutions Corporation",
    "area": "Baras",
    "lat": 14.6239571,
    "lng": 121.2510723,
    "prices": {
      "diesel": 104.86,
      "premiumDiesel": 112.46,
      "unleaded": 89.09,
      "premium95": 97.99,
      "premium97": 102.69,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2066,
    "sourceId": "cmmm5oly301xu6gg3rrmbws0d",
    "brand": "shell",
    "name": "Global Oil Marilaque Baras",
    "area": "Baras",
    "lat": 14.6243643,
    "lng": 121.2577573,
    "prices": {
      "diesel": 104.86,
      "premiumDiesel": 112.46,
      "unleaded": 89.09,
      "premium95": 97.99,
      "premium97": 102.69,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2067,
    "sourceId": "cmmm5ox8s021i6gg3lkbfttoa",
    "brand": "total",
    "name": "Alfamart San Roque Cardona Rizal",
    "area": "Cardona",
    "lat": 14.4830067,
    "lng": 121.2275843,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2068,
    "sourceId": "cmmm5owq6021c6gg374drv1j8",
    "brand": "petron",
    "name": "CK-Rom LPG Store - Cardona",
    "area": "Cardona",
    "lat": 14.4843193,
    "lng": 121.2283172,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2069,
    "sourceId": "cmmm5ovpu02106gg3tzfkh18j",
    "brand": "petron",
    "name": "Cardona Public Market",
    "area": "Cardona",
    "lat": 14.4846808,
    "lng": 121.2330647,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2070,
    "sourceId": "cmmm5h0ur001u6g83xrlaerwb",
    "brand": "caltex",
    "name": "Caltex Pililia-Jalajala Road",
    "area": "Pililla",
    "lat": 14.4609098,
    "lng": 121.329942,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2071,
    "sourceId": "cmmm5hcpx00dn6g835out2kke",
    "brand": "petron",
    "name": "Petron Gasoline Station",
    "area": "Pililla",
    "lat": 14.4640519,
    "lng": 121.3258327,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2072,
    "sourceId": "cmmm5kn0403rq6g83a0phpn7a",
    "brand": "cleanfuel",
    "name": "Cleanfuel Pililla",
    "area": "Pililla",
    "lat": 14.4791628,
    "lng": 121.3137499,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2073,
    "sourceId": "cmmm5o7r601t06gg3ps6aadyj",
    "brand": "shell",
    "name": "Shell Bagumbayan",
    "area": "Pililla",
    "lat": 14.481481,
    "lng": 121.313768,
    "prices": {
      "diesel": 104.86,
      "premiumDiesel": 112.46,
      "unleaded": 89.09,
      "premium95": 97.99,
      "premium97": 102.69,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2074,
    "sourceId": "cmmm5h9zm00b26g838wtq3plc",
    "brand": "flyingv",
    "name": "Flying V Quitiong Street",
    "area": "Pililla",
    "lat": 14.4816047,
    "lng": 121.3062407,
    "prices": {
      "diesel": 103.76,
      "premiumDiesel": null,
      "unleaded": 86.09,
      "premium95": 88.09,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2075,
    "sourceId": "cmmm5o81w01t66gg3dcm2d3ze",
    "brand": "shell",
    "name": "Shell Pililla",
    "area": "Pililla",
    "lat": 14.4838549,
    "lng": 121.3341478,
    "prices": {
      "diesel": 104.86,
      "premiumDiesel": 112.46,
      "unleaded": 89.09,
      "premium95": 97.99,
      "premium97": 102.69,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2076,
    "sourceId": "cmmm5k18103616g83y8kxgsms",
    "brand": "petron",
    "name": "Petron J. Velasquez Street",
    "area": "Tanay",
    "lat": 14.4742082,
    "lng": 121.4276323,
    "prices": {
      "diesel": 102.37,
      "premiumDiesel": 105.47,
      "unleaded": 87.56,
      "premium95": 89.66,
      "premium97": 99.56,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2077,
    "sourceId": "cmmm5itr701xe6g834yzdim81",
    "brand": "shell",
    "name": "Shell Marilaque Highway",
    "area": "Tanay",
    "lat": 14.5456055,
    "lng": 121.3652169,
    "prices": {
      "diesel": 104.86,
      "premiumDiesel": 112.46,
      "unleaded": 89.09,
      "premium95": 97.99,
      "premium97": 102.69,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2078,
    "sourceId": "cmmm5iu2m01xq6g83acwv5wk8",
    "brand": "caltex",
    "name": "CALTEX - Famy, Laguna",
    "area": "Tanay",
    "lat": 14.4353441,
    "lng": 121.4488699,
    "prices": {
      "diesel": 107.57,
      "premiumDiesel": 115.87,
      "unleaded": 92.36,
      "premium95": 100.86,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2079,
    "sourceId": "cmmm5nd9z01c06gg3xvbc61t6",
    "brand": "shell",
    "name": "Shell Manila East Road",
    "area": "Tanay",
    "lat": 14.4377912,
    "lng": 121.4451856,
    "prices": {
      "diesel": 104.86,
      "premiumDiesel": 112.46,
      "unleaded": 89.09,
      "premium95": 97.99,
      "premium97": 102.69,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2080,
    "sourceId": "cmmm5ns6r01kc6gg3ero8p3d7",
    "brand": "total",
    "name": "Petro Gazz Famy New",
    "area": "Tanay",
    "lat": 14.4376683,
    "lng": 121.4445277,
    "prices": {
      "diesel": 92.21,
      "premiumDiesel": null,
      "unleaded": 81.8,
      "premium95": 82.8,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2081,
    "sourceId": "cmmm5p2ul023c6gg3bvzf10rb",
    "brand": "caltex",
    "name": "Tanay Rizal",
    "area": "Tanay",
    "lat": 14.5368242,
    "lng": 121.37209,
    "prices": {
      "diesel": 107.57,
      "premiumDiesel": 115.87,
      "unleaded": 92.36,
      "premium95": 100.86,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2082,
    "sourceId": "cmmm5p3cy023i6gg3p2476erq",
    "brand": "caltex",
    "name": "TREASURE GAS RETAILING",
    "area": "Tanay",
    "lat": 14.5469385,
    "lng": 121.3642762,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2083,
    "sourceId": "cmmm5itxl01xk6g83vwihzknu",
    "brand": "shell",
    "name": "Shell - Mabitac Laguna",
    "area": "Tanay",
    "lat": 14.4426852,
    "lng": 121.4272494,
    "prices": {
      "diesel": 104.86,
      "premiumDiesel": 112.46,
      "unleaded": 89.09,
      "premium95": 97.99,
      "premium97": 102.69,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2084,
    "sourceId": "cmmm5km9e03r26g83d4a63jjx",
    "brand": "phoenix",
    "name": "Phoenix National Highway",
    "area": "Jala-Jala",
    "lat": 14.257297,
    "lng": 121.3961493,
    "prices": {
      "diesel": 91.81,
      "premiumDiesel": null,
      "unleaded": 81.5,
      "premium95": 83.5,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2085,
    "sourceId": "cmmm5ncop01bo6gg3rmnw1hz1",
    "brand": "shell",
    "name": "Shell Gasoline Station",
    "area": "Jala-Jala",
    "lat": 14.2574558,
    "lng": 121.3956351,
    "prices": {
      "diesel": 104.86,
      "premiumDiesel": 112.46,
      "unleaded": 89.09,
      "premium95": 97.99,
      "premium97": 102.69,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2086,
    "sourceId": "cmmm5nfyh01di6gg3926xjoj4",
    "brand": "seaoil",
    "name": "SEAOIL - Bubukal Laguna",
    "area": "Jala-Jala",
    "lat": 14.2578186,
    "lng": 121.3961644,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2087,
    "sourceId": "cmmm5p0t9022o6gg3wz9zfbc9",
    "brand": "total",
    "name": "Jala-jala",
    "area": "Jala-Jala",
    "lat": 14.3436223,
    "lng": 121.3773269,
    "prices": {
      "diesel": 92.21,
      "premiumDiesel": null,
      "unleaded": 81.8,
      "premium95": 82.8,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2088,
    "sourceId": "cmmm5nzo601oi6gg3k8tqs05f",
    "brand": "petron",
    "name": "Petron ROU Pakil",
    "area": "Jala-Jala",
    "lat": 14.3531964,
    "lng": 121.394754,
    "prices": {
      "diesel": 102.37,
      "premiumDiesel": 105.47,
      "unleaded": 87.56,
      "premium95": 89.66,
      "premium97": 99.56,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2089,
    "sourceId": "cmmm5jk8e02oo6g83e6f5xq38",
    "brand": "petron",
    "name": "Petron Pililia-Jalajala Road",
    "area": "Jala-Jala",
    "lat": 14.3630796,
    "lng": 121.3300282,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2094,
    "sourceId": "cmmm5h1wb002z6g83omxp6ag0",
    "brand": "caltex",
    "name": "Caltex Santa Rosa-Tagaytay Road",
    "area": "Santa Rosa",
    "lat": 14.249801,
    "lng": 121.0633524,
    "prices": {
      "diesel": 81.53,
      "premiumDiesel": 86.95,
      "unleaded": 87.8,
      "premium95": 92.6,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2095,
    "sourceId": "cmmm5kcot03hi6g8318uekf61",
    "brand": "flyingv",
    "name": "Flying V Rizal Boulevard",
    "area": "Biñan",
    "lat": 14.3162883,
    "lng": 121.1085158,
    "prices": {
      "diesel": 73.89,
      "premiumDiesel": null,
      "unleaded": 81.38,
      "premium95": 82.38,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2096,
    "sourceId": "cmmm5h9gf00ai6g831kkgvgd4",
    "brand": "phoenix",
    "name": "Phoenix Petroleum",
    "area": "Cabuyao",
    "lat": 14.2433633,
    "lng": 121.1194109,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2097,
    "sourceId": "cmmm5hinv00jc6g83x5u30vrz",
    "brand": "shell",
    "name": "Shell Carmona - Timbao Road",
    "area": "Biñan",
    "lat": 14.3099434,
    "lng": 121.0637026,
    "prices": {
      "diesel": 83.03,
      "premiumDiesel": 89.33,
      "unleaded": 93.37,
      "premium95": 96.07,
      "premium97": 117.77,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2098,
    "sourceId": "cmmm5hqtz00s56g83qb6qtfbl",
    "brand": "shell",
    "name": "Shell National Highway 1",
    "area": "San Pedro",
    "lat": 14.3185068,
    "lng": 121.0976348,
    "prices": {
      "diesel": 83.23,
      "premiumDiesel": 90.13,
      "unleaded": 91.67,
      "premium95": 96.47,
      "premium97": 100.57,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2099,
    "sourceId": "cmmm5hrc200sp6g83mli1fokq",
    "brand": "caltex",
    "name": "Caltex Pulo-Diezmo Road",
    "area": "Cabuyao",
    "lat": 14.2446811,
    "lng": 121.1229982,
    "prices": {
      "diesel": 81.53,
      "premiumDiesel": 86.95,
      "unleaded": 87.8,
      "premium95": 92.6,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2100,
    "sourceId": "cmmm5hw8200xx6g83tkxmd84g",
    "brand": "caltex",
    "name": "Caltex National Highway 1",
    "area": "Cabuyao",
    "lat": 14.2906539,
    "lng": 121.1076216,
    "prices": {
      "diesel": 80.05,
      "premiumDiesel": 83.05,
      "unleaded": 88.61,
      "premium95": 96.01,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2101,
    "sourceId": "cmmm5hwp100yg6g83dj1ca589",
    "brand": "shell",
    "name": "Shell National Highway 1",
    "area": "Biñan",
    "lat": 14.3006239,
    "lng": 121.1038805,
    "prices": {
      "diesel": 83.23,
      "premiumDiesel": 90.13,
      "unleaded": 91.67,
      "premium95": 96.47,
      "premium97": 100.57,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2102,
    "sourceId": "cmmm5hyuj010r6g83wi8ups3s",
    "brand": "caltex",
    "name": "Caltex Progress Avenue",
    "area": "Cabuyao",
    "lat": 14.2205892,
    "lng": 121.0976173,
    "prices": {
      "diesel": 81.53,
      "premiumDiesel": 86.95,
      "unleaded": 87.8,
      "premium95": 92.6,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2103,
    "sourceId": "cmmm5hxe600z76g83g0sfww65",
    "brand": "phoenix",
    "name": "Phoenix Gasoline Station - Sta Rosa",
    "area": "Santa Rosa",
    "lat": 14.2459658,
    "lng": 121.0604838,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2104,
    "sourceId": "cmmm5hyzq010x6g83bu99adpy",
    "brand": "total",
    "name": "Total (Canlubang)",
    "area": "Santa Rosa",
    "lat": 14.2119422,
    "lng": 121.1152494,
    "prices": {
      "diesel": 74.83,
      "premiumDiesel": null,
      "unleaded": 79.97,
      "premium95": 80.97,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2105,
    "sourceId": "cmmm5hxr800zl6g83pcby4gyy",
    "brand": "seaoil",
    "name": "SEAOIL - MAYAPA - LAGUNA",
    "area": "Santa Rosa",
    "lat": 14.2118356,
    "lng": 121.1252267,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2106,
    "sourceId": "cmmm5i4g1016r6g8309c5g0bp",
    "brand": "shell",
    "name": "Shell Santa Rosa-Tagaytay Road",
    "area": "Biñan",
    "lat": 14.2606589,
    "lng": 121.072339,
    "prices": {
      "diesel": 83.03,
      "premiumDiesel": 89.33,
      "unleaded": 93.37,
      "premium95": 96.07,
      "premium97": 117.77,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2107,
    "sourceId": "cmmm5i58r017m6g83i24kudar",
    "brand": "shell",
    "name": "Shell Pulo-Diezmo Road",
    "area": "Cabuyao",
    "lat": 14.2421955,
    "lng": 121.1153365,
    "prices": {
      "diesel": 81.93,
      "premiumDiesel": 88.83,
      "unleaded": 88.67,
      "premium95": 93.47,
      "premium97": 97.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2108,
    "sourceId": "cmmm5i5z8018e6g835kn0ldtf",
    "brand": "shell",
    "name": "Shell National Highway 1",
    "area": "Cabuyao",
    "lat": 14.2894945,
    "lng": 121.1081407,
    "prices": {
      "diesel": 83.23,
      "premiumDiesel": 90.13,
      "unleaded": 91.67,
      "premium95": 96.47,
      "premium97": 100.57,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2109,
    "sourceId": "cmmm5ib5501dy6g83nfuj5o4c",
    "brand": "caltex",
    "name": "Caltex RSBS Boulevard",
    "area": "Cabuyao",
    "lat": 14.2888448,
    "lng": 121.0946534,
    "prices": {
      "diesel": 80.05,
      "premiumDiesel": 83.05,
      "unleaded": 88.61,
      "premium95": 96.01,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2110,
    "sourceId": "cmmm5ibad01e46g83e8d2rxcw",
    "brand": "total",
    "name": "Total South Luzon Expressway",
    "area": "Cabuyao",
    "lat": 14.2671792,
    "lng": 121.0985765,
    "prices": {
      "diesel": 74.83,
      "premiumDiesel": null,
      "unleaded": 79.97,
      "premium95": 80.97,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2111,
    "sourceId": "cmmm5ibh101eb6g83z3u204fe",
    "brand": "caltex",
    "name": "Caltex South Luzon Expressway",
    "area": "Biñan",
    "lat": 14.2979311,
    "lng": 121.0816996,
    "prices": {
      "diesel": 81.83,
      "premiumDiesel": 85.13,
      "unleaded": 87.87,
      "premium95": 93.87,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2112,
    "sourceId": "cmmm5ibm901eh6g830rcl23dj",
    "brand": "shell",
    "name": "Shell South Luzon Expressway",
    "area": "Biñan",
    "lat": 14.310133,
    "lng": 121.0733345,
    "prices": {
      "diesel": 83.03,
      "premiumDiesel": 89.33,
      "unleaded": 93.37,
      "premium95": 96.07,
      "premium97": 117.77,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2113,
    "sourceId": "cmmm5ibri01en6g83yf4qoji5",
    "brand": "petron",
    "name": "Petron - Balibago",
    "area": "Cabuyao",
    "lat": 14.2897568,
    "lng": 121.0950141,
    "prices": {
      "diesel": 75.83,
      "premiumDiesel": 78.83,
      "unleaded": 81.47,
      "premium95": 82.47,
      "premium97": 92.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2114,
    "sourceId": "cmmm5ieyy01i26g83gifr8ks2",
    "brand": "phoenix",
    "name": "Phoenix National Highway 1",
    "area": "Cabuyao",
    "lat": 14.2338185,
    "lng": 121.134656,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2115,
    "sourceId": "cmmm5ii7601l76g83b4e1sgdb",
    "brand": "shell",
    "name": "Shell Doña Cecilia Yulo Avenue",
    "area": "Santa Rosa",
    "lat": 14.2149111,
    "lng": 121.1173016,
    "prices": {
      "diesel": 81.93,
      "premiumDiesel": 88.83,
      "unleaded": 88.67,
      "premium95": 93.47,
      "premium97": 97.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2116,
    "sourceId": "cmmm5iike01ll6g83yjpva1ez",
    "brand": "shell",
    "name": "Shell Mayapa Road",
    "area": "Santa Rosa",
    "lat": 14.2157256,
    "lng": 121.1386265,
    "prices": {
      "diesel": 81.93,
      "premiumDiesel": 88.83,
      "unleaded": 88.67,
      "premium95": 93.47,
      "premium97": 97.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2117,
    "sourceId": "cmmm5inha01qp6g83ty7fqevn",
    "brand": "shell",
    "name": "Shell Mayapa Road",
    "area": "Cabuyao",
    "lat": 14.2235,
    "lng": 121.1401752,
    "prices": {
      "diesel": 81.93,
      "premiumDiesel": 88.83,
      "unleaded": 88.67,
      "premium95": 93.47,
      "premium97": 97.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2118,
    "sourceId": "cmmm5inmh01qv6g83ck6n7060",
    "brand": "petron",
    "name": "Petron National Highway 1",
    "area": "Santa Rosa",
    "lat": 14.2131126,
    "lng": 121.1511354,
    "prices": {
      "diesel": 75.83,
      "premiumDiesel": 77.33,
      "unleaded": 82.67,
      "premium95": 83.67,
      "premium97": 93.67,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2119,
    "sourceId": "cmmm5inrn01r16g83rujjjimp",
    "brand": "shell",
    "name": "Shell Felix Reyes Street",
    "area": "Cabuyao",
    "lat": 14.2868675,
    "lng": 121.0911354,
    "prices": {
      "diesel": 83.23,
      "premiumDiesel": 90.13,
      "unleaded": 91.67,
      "premium95": 96.47,
      "premium97": 100.57,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2120,
    "sourceId": "cmmm5inwt01r76g83z5fhh9kf",
    "brand": "shell",
    "name": "Shell Santa Rosa-Tagaytay Road",
    "area": "Santa Rosa",
    "lat": 14.2365442,
    "lng": 121.0550323,
    "prices": {
      "diesel": 83.03,
      "premiumDiesel": 89.33,
      "unleaded": 93.37,
      "premium95": 96.07,
      "premium97": 117.77,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2121,
    "sourceId": "cmmm5ion101rz6g83bmabzfo7",
    "brand": "shell",
    "name": "Shell National Highway 1",
    "area": "Santa Rosa",
    "lat": 14.2149589,
    "lng": 121.1491672,
    "prices": {
      "diesel": 81.93,
      "premiumDiesel": 88.83,
      "unleaded": 88.67,
      "premium95": 93.47,
      "premium97": 97.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2122,
    "sourceId": "cmmm5k6s903bm6g83m5fpc93e",
    "brand": "shell",
    "name": "Shell National Highway 1",
    "area": "Cabuyao",
    "lat": 14.2941653,
    "lng": 121.1066636,
    "prices": {
      "diesel": 83.23,
      "premiumDiesel": 90.13,
      "unleaded": 91.67,
      "premium95": 96.47,
      "premium97": 100.57,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2123,
    "sourceId": "cmmm5k65w03b16g83vu88x5k5",
    "brand": "seaoil",
    "name": "SEAOIL - Tubigan Biñan",
    "area": "Biñan",
    "lat": 14.3296358,
    "lng": 121.0723033,
    "prices": {
      "diesel": 85.15,
      "premiumDiesel": null,
      "unleaded": 86.47,
      "premium95": 86.97,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2124,
    "sourceId": "cmmm5iogh01rs6g83q9oirrs0",
    "brand": "caltex",
    "name": "Caltex Tagapo - Owelle",
    "area": "San Pedro",
    "lat": 14.3213034,
    "lng": 121.0970879,
    "prices": {
      "diesel": 80.05,
      "premiumDiesel": 83.05,
      "unleaded": 88.61,
      "premium95": 96.01,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2125,
    "sourceId": "cmmm5irur01vf6g830pdewyfo",
    "brand": "shell",
    "name": "Shell Greenfield Parkway",
    "area": "Biñan",
    "lat": 14.2583728,
    "lng": 121.0899024,
    "prices": {
      "diesel": 81.93,
      "premiumDiesel": 88.83,
      "unleaded": 88.67,
      "premium95": 93.47,
      "premium97": 97.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2126,
    "sourceId": "cmmm5kan203fg6g838khuyc8e",
    "brand": "shell",
    "name": "Shell Santa Rosa-Tagaytay Road",
    "area": "Biñan",
    "lat": 14.2774997,
    "lng": 121.0831134,
    "prices": {
      "diesel": 83.23,
      "premiumDiesel": 90.13,
      "unleaded": 91.67,
      "premium95": 96.47,
      "premium97": 100.57,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2127,
    "sourceId": "cmmm5kas503fm6g832uol3yah",
    "brand": "petron",
    "name": "Petron Santa Rosa-Tagaytay Road",
    "area": "Biñan",
    "lat": 14.275566,
    "lng": 121.0824968,
    "prices": {
      "diesel": 74.83,
      "premiumDiesel": 77.83,
      "unleaded": 80.27,
      "premium95": 81.27,
      "premium97": 92.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2128,
    "sourceId": "cmmm5k9bw03e46g83lt2lsezf",
    "brand": "unioil",
    "name": "Unioil - Bel-Air Sta. Rosa",
    "area": "Santa Rosa",
    "lat": 14.2643748,
    "lng": 121.0755271,
    "prices": {
      "diesel": 78.03,
      "premiumDiesel": null,
      "unleaded": 84.37,
      "premium95": 87.37,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2129,
    "sourceId": "cmmm5isbw01vx6g83h80a6e4w",
    "brand": "seaoil",
    "name": "SEAOIL - Biñan Laguna",
    "area": "Biñan",
    "lat": 14.3270731,
    "lng": 121.0924727,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2130,
    "sourceId": "cmmm5iu7u01xw6g83hyruy3k6",
    "brand": "petron",
    "name": "Mighty Five Petron",
    "area": "San Pedro",
    "lat": 14.3238166,
    "lng": 121.1123497,
    "prices": {
      "diesel": 75.83,
      "premiumDiesel": 78.83,
      "unleaded": 81.47,
      "premium95": 82.47,
      "premium97": 92.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2131,
    "sourceId": "cmmm5ivoh01zh6g83nlptzmwy",
    "brand": "caltex",
    "name": "Caltex Santa Rosa-Tagaytay Road",
    "area": "Biñan",
    "lat": 14.2722113,
    "lng": 121.0816001,
    "prices": {
      "diesel": 81.83,
      "premiumDiesel": 85.13,
      "unleaded": 87.87,
      "premium95": 93.87,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2132,
    "sourceId": "cmmm5ivym01zt6g834cxevte2",
    "brand": "caltex",
    "name": "Caltex Cavite–Laguna Expressway",
    "area": "Biñan",
    "lat": 14.2846022,
    "lng": 121.060166,
    "prices": {
      "diesel": 81.83,
      "premiumDiesel": 85.13,
      "unleaded": 87.87,
      "premium95": 93.87,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2133,
    "sourceId": "cmmm5j6tk02b96g83k6kurxm8",
    "brand": "shell",
    "name": "Shell 8th Street",
    "area": "San Pedro",
    "lat": 14.3247443,
    "lng": 121.075228,
    "prices": {
      "diesel": 83.03,
      "premiumDiesel": 89.33,
      "unleaded": 93.37,
      "premium95": 96.07,
      "premium97": 117.77,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2134,
    "sourceId": "cmmm5j6yo02bf6g83z1w8fz0z",
    "brand": "petron",
    "name": "Petron Gas station",
    "area": "San Pedro",
    "lat": 14.3242192,
    "lng": 121.0734021,
    "prices": {
      "diesel": 74.83,
      "premiumDiesel": 77.83,
      "unleaded": 80.27,
      "premium95": 81.27,
      "premium97": 92.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2135,
    "sourceId": "cmmj30i0l00146gzcqr8dp3em",
    "brand": "caltex",
    "name": "Caltex General Malvar Street",
    "area": "San Pedro",
    "lat": 14.3349068,
    "lng": 121.0866076,
    "prices": {
      "diesel": 80.05,
      "premiumDiesel": 83.05,
      "unleaded": 88.61,
      "premium95": 96.01,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2136,
    "sourceId": "cmmj30i0m003l6gzccinwfagy",
    "brand": "caltex",
    "name": "Caltex National Road",
    "area": "San Pedro",
    "lat": 14.3816919,
    "lng": 121.0448801,
    "prices": {
      "diesel": 80.05,
      "premiumDiesel": 83.05,
      "unleaded": 88.61,
      "premium95": 96.01,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2137,
    "sourceId": "cmmj30i0m005f6gzch1lc9f9b",
    "brand": "petron",
    "name": "Petron National Highway 1",
    "area": "San Pedro",
    "lat": 14.3301472,
    "lng": 121.0881978,
    "prices": {
      "diesel": 75.83,
      "premiumDiesel": 78.83,
      "unleaded": 81.47,
      "premium95": 82.47,
      "premium97": 92.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2138,
    "sourceId": "cmmj30i0m005g6gzcmwg4kryx",
    "brand": "shell",
    "name": "Shell General Malvar Street",
    "area": "San Pedro",
    "lat": 14.3301264,
    "lng": 121.0740923,
    "prices": {
      "diesel": 83.03,
      "premiumDiesel": 89.33,
      "unleaded": 93.37,
      "premium95": 96.07,
      "premium97": 117.77,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2139,
    "sourceId": "cmmj30i0m005h6gzc1ceom4yu",
    "brand": "petron",
    "name": "Petron General Malvar Street",
    "area": "San Pedro",
    "lat": 14.3301404,
    "lng": 121.0737005,
    "prices": {
      "diesel": 74.83,
      "premiumDiesel": 77.83,
      "unleaded": 80.27,
      "premium95": 81.27,
      "premium97": 92.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2140,
    "sourceId": "cmmj30i0m006s6gzcfvs0k7br",
    "brand": "total",
    "name": "Total (San Pedro 3)",
    "area": "San Pedro",
    "lat": 14.3460965,
    "lng": 121.06616,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2141,
    "sourceId": "cmmj30i0n00b36gzcjs9l1r3a",
    "brand": "petron",
    "name": "Petron National Road",
    "area": "San Pedro",
    "lat": 14.3714951,
    "lng": 121.0496044,
    "prices": {
      "diesel": 75.83,
      "premiumDiesel": 78.83,
      "unleaded": 81.47,
      "premium95": 82.47,
      "premium97": 92.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2142,
    "sourceId": "cmmj30i0n00b46gzcf1lht8sf",
    "brand": "shell",
    "name": "Shell National Road",
    "area": "San Pedro",
    "lat": 14.3811452,
    "lng": 121.0446087,
    "prices": {
      "diesel": 83.23,
      "premiumDiesel": 90.13,
      "unleaded": 91.67,
      "premium95": 96.47,
      "premium97": 100.57,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2143,
    "sourceId": "cmmj30i0n00ba6gzc3y7nxjgs",
    "brand": "petron",
    "name": "Petron National Highway 1",
    "area": "San Pedro",
    "lat": 14.3585096,
    "lng": 121.0593679,
    "prices": {
      "diesel": 75.83,
      "premiumDiesel": 78.83,
      "unleaded": 81.47,
      "premium95": 82.47,
      "premium97": 92.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2144,
    "sourceId": "cmmj30i0o00ep6gzc40tzshbh",
    "brand": "caltex",
    "name": "Caltex Rosario Avenue",
    "area": "San Pedro",
    "lat": 14.3345492,
    "lng": 121.0479491,
    "prices": {
      "diesel": 80.05,
      "premiumDiesel": 83.05,
      "unleaded": 88.61,
      "premium95": 96.01,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2145,
    "sourceId": "cmmj30i0o00eq6gzc5bby12ig",
    "brand": "shell",
    "name": "Shell Industry Loop",
    "area": "San Pedro",
    "lat": 14.3324353,
    "lng": 121.0486394,
    "prices": {
      "diesel": 83.03,
      "premiumDiesel": 89.33,
      "unleaded": 93.37,
      "premium95": 96.07,
      "premium97": 117.77,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2146,
    "sourceId": "cmmj30i0o00g26gzcu35s5h52",
    "brand": "total",
    "name": "Total (San Pedro 2)",
    "area": "San Pedro",
    "lat": 14.3650667,
    "lng": 121.0424996,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2147,
    "sourceId": "cmmj30i0p00j46gzcwvyqh7qv",
    "brand": "petron",
    "name": "Petron South Luzon Expressway",
    "area": "San Pedro",
    "lat": 14.3558444,
    "lng": 121.0445006,
    "prices": {
      "diesel": 75.83,
      "premiumDiesel": 78.83,
      "unleaded": 81.47,
      "premium95": 82.47,
      "premium97": 92.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2148,
    "sourceId": "cmmj30i0p00k06gzcnndkp4ix",
    "brand": "caltex",
    "name": "Caltex San Francisco Road",
    "area": "San Pedro",
    "lat": 14.3372269,
    "lng": 121.0675654,
    "prices": {
      "diesel": 80.05,
      "premiumDiesel": 83.05,
      "unleaded": 88.61,
      "premium95": 96.01,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2149,
    "sourceId": "cmmj30i0p00kn6gzcj5weri5e",
    "brand": "caltex",
    "name": "Caltex General Malvar Street",
    "area": "San Pedro",
    "lat": 14.3349058,
    "lng": 121.0866069,
    "prices": {
      "diesel": 80.05,
      "premiumDiesel": 83.05,
      "unleaded": 88.61,
      "premium95": 96.01,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2150,
    "sourceId": "cmmj30i0p00j36gzcxwppaeln",
    "brand": "caltex",
    "name": "Caltex - SLEX San Pedro",
    "area": "San Pedro",
    "lat": 14.355136,
    "lng": 121.0458711,
    "prices": {
      "diesel": 80.05,
      "premiumDiesel": 83.05,
      "unleaded": 88.61,
      "premium95": 96.01,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2151,
    "sourceId": "cmmj30i0q00o96gzcye06sryj",
    "brand": "caltex",
    "name": "Caltex National Highway 1",
    "area": "San Pedro",
    "lat": 14.3536886,
    "lng": 121.0618864,
    "prices": {
      "diesel": 80.05,
      "premiumDiesel": 83.05,
      "unleaded": 88.61,
      "premium95": 96.01,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2152,
    "sourceId": "cmmj30i0q00or6gzcjckk17m1",
    "brand": "shell",
    "name": "Shell Diamond Street",
    "area": "San Pedro",
    "lat": 14.3565769,
    "lng": 121.0603519,
    "prices": {
      "diesel": 83.23,
      "premiumDiesel": 90.13,
      "unleaded": 91.67,
      "premium95": 96.47,
      "premium97": 100.57,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2153,
    "sourceId": "cmmj30i0r00s46gzco4j2mgns",
    "brand": "petron",
    "name": "Petron Finance Drive",
    "area": "San Pedro",
    "lat": 14.3334443,
    "lng": 121.0481601,
    "prices": {
      "diesel": 74.83,
      "premiumDiesel": 77.83,
      "unleaded": 80.27,
      "premium95": 81.27,
      "premium97": 92.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2154,
    "sourceId": "cmmj30i0r00se6gzcmeq2ln2l",
    "brand": "caltex",
    "name": "Caltex National Highway 1",
    "area": "San Pedro",
    "lat": 14.3569959,
    "lng": 121.0606691,
    "prices": {
      "diesel": 80.05,
      "premiumDiesel": 83.05,
      "unleaded": 88.61,
      "premium95": 96.01,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2155,
    "sourceId": "cmmj30i0r00tv6gzc23hss1mb",
    "brand": "petron",
    "name": "Petron National Highway 1",
    "area": "San Pedro",
    "lat": 14.3390769,
    "lng": 121.0731645,
    "prices": {
      "diesel": 75.83,
      "premiumDiesel": 78.83,
      "unleaded": 81.47,
      "premium95": 82.47,
      "premium97": 92.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2156,
    "sourceId": "cmmj30i0r00vp6gzc8ju1jgam",
    "brand": "shell",
    "name": "Shell National Road",
    "area": "San Pedro",
    "lat": 14.3703188,
    "lng": 121.0501698,
    "prices": {
      "diesel": 83.23,
      "premiumDiesel": 90.13,
      "unleaded": 91.67,
      "premium95": 96.47,
      "premium97": 100.57,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2157,
    "sourceId": "cmmj30i0r00vq6gzcasnis1y8",
    "brand": "caltex",
    "name": "Caltex National Road",
    "area": "San Pedro",
    "lat": 14.3693812,
    "lng": 121.0501206,
    "prices": {
      "diesel": 80.05,
      "premiumDiesel": 83.05,
      "unleaded": 88.61,
      "premium95": 96.01,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2158,
    "sourceId": "cmmj30i0s01106gzcf4rxofx8",
    "brand": "flyingv",
    "name": "Flying V Halang Laguna",
    "area": "San Pedro",
    "lat": 14.3344777,
    "lng": 121.0606035,
    "prices": {
      "diesel": 73.89,
      "premiumDiesel": null,
      "unleaded": 81.38,
      "premium95": 82.38,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2159,
    "sourceId": "cmmj30i0t012d6gzcd8xkgprm",
    "brand": "ptt",
    "name": "PTT General Malvar Street",
    "area": "San Pedro",
    "lat": 14.3300289,
    "lng": 121.07073,
    "prices": {
      "diesel": 83.15,
      "premiumDiesel": null,
      "unleaded": 87.52,
      "premium95": 88.52,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2160,
    "sourceId": "cmmj30i0t014f6gzc3wplfdf6",
    "brand": "shell",
    "name": "Shell National Highway 1",
    "area": "San Pedro",
    "lat": 14.3429779,
    "lng": 121.0694261,
    "prices": {
      "diesel": 83.23,
      "premiumDiesel": 90.13,
      "unleaded": 91.67,
      "premium95": 96.47,
      "premium97": 100.57,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2161,
    "sourceId": "cmmj30i0u016d6gzczcgb9c2j",
    "brand": "cleanfuel",
    "name": "Cleanfuel National Highway 1",
    "area": "San Pedro",
    "lat": 14.3352571,
    "lng": 121.0791188,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2162,
    "sourceId": "cmmj30i0t014r6gzckd7vj0ly",
    "brand": "shell",
    "name": "Shell Mobility San Francisco, Biñan",
    "area": "Biñan",
    "lat": 14.3353038,
    "lng": 121.0618865,
    "prices": {
      "diesel": 83.23,
      "premiumDiesel": 90.13,
      "unleaded": 91.67,
      "premium95": 96.47,
      "premium97": 100.57,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2163,
    "sourceId": "cmmj30i0u016e6gzc3i5gyyyx",
    "brand": "caltex",
    "name": "Caltex Canlalay",
    "area": "San Pedro",
    "lat": 14.3359749,
    "lng": 121.07713,
    "prices": {
      "diesel": 80.05,
      "premiumDiesel": 83.05,
      "unleaded": 88.61,
      "premium95": 96.01,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2164,
    "sourceId": "cmmm5hifs00j66g835gjs0ut0",
    "brand": "phoenix",
    "name": "Phoenix Mamatid",
    "area": "Cabuyao",
    "lat": 14.2352589,
    "lng": 121.1549185,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2165,
    "sourceId": "cmmm5kirk03nk6g837k46sefn",
    "brand": "caltex",
    "name": "Caltex Landers Nuvali",
    "area": "Santa Rosa",
    "lat": 14.2338249,
    "lng": 121.0563512,
    "prices": {
      "diesel": 81.83,
      "premiumDiesel": 85.13,
      "unleaded": 87.87,
      "premium95": 93.87,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2166,
    "sourceId": "cmmm5m6as00o66gg3ezcrsg93",
    "brand": "shell",
    "name": "Shell Select",
    "area": "Santa Rosa",
    "lat": 14.2422858,
    "lng": 121.0440634,
    "prices": {
      "diesel": 83.03,
      "premiumDiesel": 89.33,
      "unleaded": 93.37,
      "premium95": 96.07,
      "premium97": 117.77,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2167,
    "sourceId": "cmmm5m6wd00oi6gg39pqrruva",
    "brand": "shell",
    "name": "Shell South Boulevard",
    "area": "Santa Rosa",
    "lat": 14.242017,
    "lng": 121.041688,
    "prices": {
      "diesel": 83.03,
      "premiumDiesel": 89.33,
      "unleaded": 93.37,
      "premium95": 96.07,
      "premium97": 117.77,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2168,
    "sourceId": "cmmm5m9ck00pu6gg39tg7bnjt",
    "brand": "caltex",
    "name": "Caltex Governor's Drive",
    "area": "Biñan",
    "lat": 14.3126286,
    "lng": 121.0464981,
    "prices": {
      "diesel": 81.83,
      "premiumDiesel": 85.13,
      "unleaded": 87.87,
      "premium95": 93.87,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2169,
    "sourceId": "cmmm5m9xx00q66gg3aysa0vlq",
    "brand": "caltex",
    "name": "Caltex SLEX Mamplasan",
    "area": "Biñan",
    "lat": 14.297153,
    "lng": 121.081583,
    "prices": {
      "diesel": 81.83,
      "premiumDiesel": 85.13,
      "unleaded": 87.87,
      "premium95": 93.87,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2170,
    "sourceId": "cmmm5nbso01b66gg3uilxs0gv",
    "brand": "shell",
    "name": "Shell SLEX Northbound",
    "area": "Biñan",
    "lat": 14.3107,
    "lng": 121.0724,
    "prices": {
      "diesel": 83.03,
      "premiumDiesel": 89.33,
      "unleaded": 93.37,
      "premium95": 96.07,
      "premium97": 117.77,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2171,
    "sourceId": "cmmm5ndkn01c66gg30s5e863p",
    "brand": "shell",
    "name": "Shell Rizal Village",
    "area": "Santa Rosa",
    "lat": 14.2154,
    "lng": 121.1374,
    "prices": {
      "diesel": 81.93,
      "premiumDiesel": 88.83,
      "unleaded": 88.67,
      "premium95": 93.47,
      "premium97": 97.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2172,
    "sourceId": "cmmm5ndve01cc6gg3hud08gu4",
    "brand": "shell",
    "name": "MVSV Shell Gasoline Station",
    "area": "Los Baños",
    "lat": 14.21656,
    "lng": 121.1818731,
    "prices": {
      "diesel": 81.93,
      "premiumDiesel": 88.83,
      "unleaded": 88.67,
      "premium95": 93.47,
      "premium97": 97.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2173,
    "sourceId": "cmmm5ng9601do6gg3jy2jbfol",
    "brand": "shell",
    "name": "Shell Select",
    "area": "Biñan",
    "lat": 14.3119487,
    "lng": 121.071676,
    "prices": {
      "diesel": 83.03,
      "premiumDiesel": 89.33,
      "unleaded": 93.37,
      "premium95": 96.07,
      "premium97": 117.77,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2174,
    "sourceId": "cmmm5ngjs01du6gg34om8i0wk",
    "brand": "shell",
    "name": "Shell Bohol Street",
    "area": "Cabuyao",
    "lat": 14.2433,
    "lng": 121.1157,
    "prices": {
      "diesel": 81.93,
      "premiumDiesel": 88.83,
      "unleaded": 88.67,
      "premium95": 93.47,
      "premium97": 97.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2175,
    "sourceId": "cmmm5ngug01e06gg3xqkqeohz",
    "brand": "shell",
    "name": "Joanne's Gas Shell Station",
    "area": "Cabuyao",
    "lat": 14.2442757,
    "lng": 121.122485,
    "prices": {
      "diesel": 81.93,
      "premiumDiesel": 88.83,
      "unleaded": 88.67,
      "premium95": 93.47,
      "premium97": 97.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2176,
    "sourceId": "cmmm5nhfv01ec6gg3u5axnxhy",
    "brand": "petron",
    "name": "Petron Gas Station",
    "area": "Cabuyao",
    "lat": 14.2426269,
    "lng": 121.1172733,
    "prices": {
      "diesel": 75.83,
      "premiumDiesel": 77.33,
      "unleaded": 82.67,
      "premium95": 83.67,
      "premium97": 93.67,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2177,
    "sourceId": "cmmm5nibr01eu6gg3vavmzvb3",
    "brand": "total",
    "name": "Total (Pulo, Cabuyao)",
    "area": "Cabuyao",
    "lat": 14.2429005,
    "lng": 121.1181372,
    "prices": {
      "diesel": 74.83,
      "premiumDiesel": null,
      "unleaded": 79.97,
      "premium95": 80.97,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2178,
    "sourceId": "cmmm5niwy01f66gg354r2rxfr",
    "brand": "shell",
    "name": "Shell Doña Cecilia Yulo Avenue",
    "area": "Santa Rosa",
    "lat": 14.21884,
    "lng": 121.115652,
    "prices": {
      "diesel": 81.93,
      "premiumDiesel": 88.83,
      "unleaded": 88.67,
      "premium95": 93.47,
      "premium97": 97.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2179,
    "sourceId": "cmmm5nj7h01fc6gg3rl0zj14s",
    "brand": "shell",
    "name": "Shell San Cristobal",
    "area": "Cabuyao",
    "lat": 14.22205,
    "lng": 121.139544,
    "prices": {
      "diesel": 81.93,
      "premiumDiesel": 88.83,
      "unleaded": 88.67,
      "premium95": 93.47,
      "premium97": 97.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2180,
    "sourceId": "cmmm5nji401fi6gg3x5hpkkd9",
    "brand": "shell",
    "name": "ADC Shell Service Station",
    "area": "Santa Rosa",
    "lat": 14.2119916,
    "lng": 121.1334193,
    "prices": {
      "diesel": 81.93,
      "premiumDiesel": 88.83,
      "unleaded": 88.67,
      "premium95": 93.47,
      "premium97": 97.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2181,
    "sourceId": "cmmm5njve01fo6gg32fjez90c",
    "brand": "petron",
    "name": "Petron Km. 44 Northbound",
    "area": "Cabuyao",
    "lat": 14.2349392,
    "lng": 121.1158656,
    "prices": {
      "diesel": 75.83,
      "premiumDiesel": 77.33,
      "unleaded": 82.67,
      "premium95": 83.67,
      "premium97": 93.67,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2182,
    "sourceId": "cmmm5nk6901fu6gg3uv0s4m8p",
    "brand": "petron",
    "name": "Petron CA Yulo",
    "area": "Cabuyao",
    "lat": 14.2243513,
    "lng": 121.1100868,
    "prices": {
      "diesel": 75.83,
      "premiumDiesel": 77.33,
      "unleaded": 82.67,
      "premium95": 83.67,
      "premium97": 93.67,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2183,
    "sourceId": "cmmm5nkgs01g06gg391kyiju6",
    "brand": "caltex",
    "name": "Caltex Paciano",
    "area": "Santa Rosa",
    "lat": 14.2185188,
    "lng": 121.140215,
    "prices": {
      "diesel": 81.53,
      "premiumDiesel": 86.95,
      "unleaded": 87.8,
      "premium95": 92.6,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2184,
    "sourceId": "cmmm5nkrg01g66gg39tu7no1f",
    "brand": "caltex",
    "name": "Platon Trading Caltex",
    "area": "Santa Rosa",
    "lat": 14.2114268,
    "lng": 121.1554607,
    "prices": {
      "diesel": 81.53,
      "premiumDiesel": 86.95,
      "unleaded": 87.8,
      "premium95": 92.6,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2185,
    "sourceId": "cmmm5nl2901gc6gg3omo6706h",
    "brand": "total",
    "name": "Total (Paciano)",
    "area": "Santa Rosa",
    "lat": 14.2161715,
    "lng": 121.1395074,
    "prices": {
      "diesel": 74.83,
      "premiumDiesel": null,
      "unleaded": 79.97,
      "premium95": 80.97,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2186,
    "sourceId": "cmmm5ixa402146g83ct9ckqpy",
    "brand": "total",
    "name": "Total Governor's Drive",
    "area": "Biñan",
    "lat": 14.3134826,
    "lng": 121.0474196,
    "prices": {
      "diesel": 76.19,
      "premiumDiesel": null,
      "unleaded": 79.48,
      "premium95": 80.48,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2187,
    "sourceId": "cmmm5oblm01ui6gg3uipslxjp",
    "brand": "petron",
    "name": "Petron Gasul",
    "area": "Cabuyao",
    "lat": 14.2316826,
    "lng": 121.1363795,
    "prices": {
      "diesel": 75.83,
      "premiumDiesel": 77.33,
      "unleaded": 82.67,
      "premium95": 83.67,
      "premium97": 93.67,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2188,
    "sourceId": "cmmm5ocme01uu6gg36fom6ogv",
    "brand": "petron",
    "name": "ELIM Petron Santa Rosa",
    "area": "Santa Rosa",
    "lat": 14.2635438,
    "lng": 121.0748032,
    "prices": {
      "diesel": 74.83,
      "premiumDiesel": 77.83,
      "unleaded": 80.27,
      "premium95": 81.27,
      "premium97": 93.67,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2189,
    "sourceId": "cmmm5io1z01rd6g8303u9h23o",
    "brand": "jetti",
    "name": "Jetti Elepaño Street",
    "area": "Santa Rosa",
    "lat": 14.213052,
    "lng": 121.1651873,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2190,
    "sourceId": "cmmj30i0t01116gzcl64wt0se",
    "brand": "jetti",
    "name": "Jetti San Francisco Road",
    "area": "San Pedro",
    "lat": 14.3356753,
    "lng": 121.0628136,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2191,
    "sourceId": "cmmm5kln703qh6g83y4y17yvd",
    "brand": "shell",
    "name": "Shell National Highway 1",
    "area": "San Pedro",
    "lat": 14.3295888,
    "lng": 121.0879312,
    "prices": {
      "diesel": 83.23,
      "premiumDiesel": 90.13,
      "unleaded": 91.67,
      "premium95": 96.47,
      "premium97": 100.57,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2192,
    "sourceId": "cmmm5i4au016l6g83ihrcucr6",
    "brand": "seaoil",
    "name": "SEAOIL - STA ROSA - LAGUNA",
    "area": "Santa Rosa",
    "lat": 14.2663022,
    "lng": 121.0774952,
    "prices": {
      "diesel": 85.15,
      "premiumDiesel": null,
      "unleaded": 86.47,
      "premium95": 86.97,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2193,
    "sourceId": "cmmm5j7tm02cd6g83x73dtajm",
    "brand": "petron",
    "name": "Petron Gas Station Timbao Road",
    "area": "Biñan",
    "lat": 14.2855281,
    "lng": 121.0552984,
    "prices": {
      "diesel": 74.83,
      "premiumDiesel": 77.83,
      "unleaded": 80.27,
      "premium95": 81.27,
      "premium97": 92.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2194,
    "sourceId": "cmmm5iglc01jl6g831mdu6y2e",
    "brand": "petron",
    "name": "RSM PETRON",
    "area": "San Pedro",
    "lat": 14.3183544,
    "lng": 121.0614395,
    "prices": {
      "diesel": 74.83,
      "premiumDiesel": 77.83,
      "unleaded": 80.27,
      "premium95": 81.27,
      "premium97": 92.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2195,
    "sourceId": "cmmm5hwda00y36g83mtuegqct",
    "brand": "caltex",
    "name": "Nuvostar Caltex Service Station",
    "area": "Cabuyao",
    "lat": 14.2847013,
    "lng": 121.1099969,
    "prices": {
      "diesel": 80.05,
      "premiumDiesel": 83.05,
      "unleaded": 88.61,
      "premium95": 96.01,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2196,
    "sourceId": "cmmm5iodq01rq6g83r95hgjg5",
    "brand": "ptt",
    "name": "PTT Gasoline Station",
    "area": "Biñan",
    "lat": 14.3099679,
    "lng": 121.1011286,
    "prices": {
      "diesel": 83.15,
      "premiumDiesel": null,
      "unleaded": 87.52,
      "premium95": 88.52,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2197,
    "sourceId": "cmmj30i0p00j16gzc6k8t8ink",
    "brand": "unioil",
    "name": "Unioil San Francisco-Halang Road, Biñan, Laguna",
    "area": "Biñan",
    "lat": 14.3350457,
    "lng": 121.0612581,
    "prices": {
      "diesel": 85.23,
      "premiumDiesel": null,
      "unleaded": 90.17,
      "premium95": 93.17,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2198,
    "sourceId": "cmmj30i0u016f6gzcxrvl11fc",
    "brand": "total",
    "name": "Total (Binan)",
    "area": "Biñan",
    "lat": 14.3300538,
    "lng": 121.0872961,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2199,
    "sourceId": "cmna2jhf5009x6gixpaqhskzt",
    "brand": "petron",
    "name": "Petron Engine Oils",
    "area": "San Pedro",
    "lat": 14.3752714,
    "lng": 121.0477156,
    "prices": {
      "diesel": 75.83,
      "premiumDiesel": 78.83,
      "unleaded": 81.47,
      "premium95": 82.47,
      "premium97": 92.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2200,
    "sourceId": "cmna2jhk600a36gixlysthv3i",
    "brand": "petron",
    "name": "Petron Pedro Paterno Street",
    "area": "San Pedro",
    "lat": 14.348888,
    "lng": 121.084732,
    "prices": {
      "diesel": 75.83,
      "premiumDiesel": 78.83,
      "unleaded": 81.47,
      "premium95": 82.47,
      "premium97": 92.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2201,
    "sourceId": "cmna2jqrr00ke6gix81fuhvnq",
    "brand": "flyingv",
    "name": "Flying V Felix Reyes Street",
    "area": "Cabuyao",
    "lat": 14.291946,
    "lng": 121.098688,
    "prices": {
      "diesel": 73.89,
      "premiumDiesel": null,
      "unleaded": 81.38,
      "premium95": 82.38,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2202,
    "sourceId": "cmna2jr1j00kn6gixu6q7or9h",
    "brand": "petron",
    "name": "Petron Gasul Brgy. Tagapo",
    "area": "San Pedro",
    "lat": 14.3172653,
    "lng": 121.106133,
    "prices": {
      "diesel": 75.83,
      "premiumDiesel": 78.83,
      "unleaded": 81.47,
      "premium95": 82.47,
      "premium97": 92.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2203,
    "sourceId": "cmna2jrfb00l46gixct7gk6j9",
    "brand": "ptt",
    "name": "Ptt galosin station",
    "area": "Cabuyao",
    "lat": 14.2262168,
    "lng": 121.1567203,
    "prices": {
      "diesel": 79.41,
      "premiumDiesel": null,
      "unleaded": 85.4,
      "premium95": 86.4,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2204,
    "sourceId": "cmna2jrjm00l86gixsgu57rx7",
    "brand": "flyingv",
    "name": "FLYING V San Jose Calamba",
    "area": "Calamba",
    "lat": 14.216273,
    "lng": 121.1771205,
    "prices": {
      "diesel": 74.29,
      "premiumDiesel": null,
      "unleaded": 81.68,
      "premium95": 82.68,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2205,
    "sourceId": "cmna2jro100lc6gixe7k7mj73",
    "brand": "phoenix",
    "name": "Phoenix Sta Elena",
    "area": "Cabuyao",
    "lat": 14.2407643,
    "lng": 121.1087808,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2206,
    "sourceId": "cmna2jrsh00lh6gix5gmavd6f",
    "brand": "phoenix",
    "name": "Phoenix Gas Station Up",
    "area": "Cabuyao",
    "lat": 14.2384299,
    "lng": 121.1524244,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2207,
    "sourceId": "cmmj30i0t014q6gzcpe9902jg",
    "brand": "seaoil",
    "name": "SEAOIL - SAN FRANCISCO BINAN - LAGUNA",
    "area": "Biñan",
    "lat": 14.3342118,
    "lng": 121.060174,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2208,
    "sourceId": "cmmj30i0t014e6gzcm21ok4kb",
    "brand": "phoenix",
    "name": "Phoenix Gas Station - Canlalay",
    "area": "San Pedro",
    "lat": 14.3420114,
    "lng": 121.0697037,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2209,
    "sourceId": "cmmm5is0101vl6g83k6irv3ua",
    "brand": "petron",
    "name": "Petron Greenfield Parkway",
    "area": "Cabuyao",
    "lat": 14.2579001,
    "lng": 121.0906911,
    "prices": {
      "diesel": 75.83,
      "premiumDiesel": 77.33,
      "unleaded": 82.67,
      "premium95": 83.67,
      "premium97": 93.67,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2210,
    "sourceId": "cmmm5oaks01u66gg3yxjytxja",
    "brand": "petron",
    "name": "Petron Gasul",
    "area": "San Pedro",
    "lat": 14.344212,
    "lng": 121.043138,
    "prices": {
      "diesel": 75.83,
      "premiumDiesel": 78.83,
      "unleaded": 81.47,
      "premium95": 82.47,
      "premium97": 92.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2211,
    "sourceId": "cmmm5igd801je6g83pulg5zgp",
    "brand": "petron",
    "name": "DRCM Petron",
    "area": "San Pedro",
    "lat": 14.3249936,
    "lng": 121.0660077,
    "prices": {
      "diesel": 74.83,
      "premiumDiesel": 77.83,
      "unleaded": 80.27,
      "premium95": 81.27,
      "premium97": 92.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2212,
    "sourceId": "cmmj30i0t011o6gzc6coyzsms",
    "brand": "jetti",
    "name": "Jetti National Road San Pedro",
    "area": "San Pedro",
    "lat": 14.3497561,
    "lng": 121.0638691,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2213,
    "sourceId": "cmmm5io8i01rk6g838vx8cldf",
    "brand": "petron",
    "name": "Petron Service Station - Brgy. Tagapo",
    "area": "Biñan",
    "lat": 14.3103808,
    "lng": 121.1005478,
    "prices": {
      "diesel": 75.83,
      "premiumDiesel": 78.83,
      "unleaded": 81.47,
      "premium95": 82.47,
      "premium97": 92.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2214,
    "sourceId": "cmmm5igqh01jr6g83xacqdv4d",
    "brand": "shell",
    "name": "Shell Governor's Drive",
    "area": "Biñan",
    "lat": 14.3102558,
    "lng": 121.0360506,
    "prices": {
      "diesel": 83.03,
      "premiumDiesel": 89.33,
      "unleaded": 93.37,
      "premium95": 96.07,
      "premium97": 117.77,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2215,
    "sourceId": "cmmj30i0n00bu6gzcd82mmtri",
    "brand": "caltex",
    "name": "Caltex National Road",
    "area": "San Pedro",
    "lat": 14.3983721,
    "lng": 121.0454563,
    "prices": {
      "diesel": 80.05,
      "premiumDiesel": 83.05,
      "unleaded": 88.61,
      "premium95": 96.01,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2216,
    "sourceId": "cmmj30i0o00g56gzcep6qfwdh",
    "brand": "petron",
    "name": "Petron National Road",
    "area": "San Pedro",
    "lat": 14.3841893,
    "lng": 121.0441938,
    "prices": {
      "diesel": 75.83,
      "premiumDiesel": 78.83,
      "unleaded": 81.47,
      "premium95": 82.47,
      "premium97": 92.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2217,
    "sourceId": "cmmj30i0o00g96gzc1g0zqjgl",
    "brand": "petron",
    "name": "Petron Estanislao Road",
    "area": "San Pedro",
    "lat": 14.394581,
    "lng": 121.0436838,
    "prices": {
      "diesel": 75.83,
      "premiumDiesel": 78.83,
      "unleaded": 81.47,
      "premium95": 82.47,
      "premium97": 92.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2218,
    "sourceId": "cmmj30i0o00g16gzcg64w1ml2",
    "brand": "total",
    "name": "Total (San Pedro)",
    "area": "San Pedro",
    "lat": 14.3435571,
    "lng": 121.0383835,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2219,
    "sourceId": "cmmj30i0p00j56gzcr94negbe",
    "brand": "shell",
    "name": "Shell South Luzon Expressway",
    "area": "San Pedro",
    "lat": 14.3944585,
    "lng": 121.0382004,
    "prices": {
      "diesel": 83.23,
      "premiumDiesel": 90.13,
      "unleaded": 91.67,
      "premium95": 96.47,
      "premium97": 100.57,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2220,
    "sourceId": "cmmj30i0q00mq6gzcoha4xl6d",
    "brand": "caltex",
    "name": "Caltex Upper Prinza Street",
    "area": "San Pedro",
    "lat": 14.3882843,
    "lng": 121.0456759,
    "prices": {
      "diesel": 80.05,
      "premiumDiesel": 83.05,
      "unleaded": 88.61,
      "premium95": 96.01,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2221,
    "sourceId": "cmmm5m53t00ni6gg3obv6hroh",
    "brand": "total",
    "name": "Total (Soldiers Hills)",
    "area": "San Pedro",
    "lat": 14.3990534,
    "lng": 121.0449936,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2222,
    "sourceId": "cmmm5mly800wu6gg38yjqvq0f",
    "brand": "petron",
    "name": "Drvm petron",
    "area": "Biñan",
    "lat": 14.301901,
    "lng": 121.0376621,
    "prices": {
      "diesel": 74.83,
      "premiumDiesel": 77.83,
      "unleaded": 80.27,
      "premium95": 81.27,
      "premium97": 92.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2223,
    "sourceId": "cmmm5mvig01266gg32bysw1s4",
    "brand": "caltex",
    "name": "St. Vincent Caltex Service Station",
    "area": "San Pedro",
    "lat": 14.3592221,
    "lng": 121.0392436,
    "prices": {
      "diesel": 80.05,
      "premiumDiesel": 83.05,
      "unleaded": 88.61,
      "premium95": 96.01,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2224,
    "sourceId": "cmna2jhod00a96gixtxgf83tr",
    "brand": "petron",
    "name": "Petron Gasul",
    "area": "San Pedro",
    "lat": 14.38598959999999,
    "lng": 121.0500925,
    "prices": {
      "diesel": 75.83,
      "premiumDiesel": 78.83,
      "unleaded": 81.47,
      "premium95": 82.47,
      "premium97": 92.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2225,
    "sourceId": "cmna2jhtb00af6gixuqth3hyw",
    "brand": "total",
    "name": "Total Gas Suply",
    "area": "San Pedro",
    "lat": 14.3916857,
    "lng": 121.0439098,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2226,
    "sourceId": "cmna2jhxh00al6gixcvbnhcqm",
    "brand": "caltex",
    "name": "7 11 caltex soldiers hills 1080",
    "area": "San Pedro",
    "lat": 14.3991548,
    "lng": 121.0427383,
    "prices": {
      "diesel": 80.05,
      "premiumDiesel": 83.05,
      "unleaded": 88.61,
      "premium95": 96.01,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2227,
    "sourceId": "cmna2ji1l00ar6gixqmkeqign",
    "brand": "shell",
    "name": "Emg Shell Corporation",
    "area": "San Pedro",
    "lat": 14.400611,
    "lng": 121.046723,
    "prices": {
      "diesel": 83.23,
      "premiumDiesel": 90.13,
      "unleaded": 91.67,
      "premium95": 96.47,
      "premium97": 100.57,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2228,
    "sourceId": "cmna2jp5a00is6gix7y9qgwk2",
    "brand": "petron",
    "name": "Petronas Lubricants",
    "area": "San Pedro",
    "lat": 14.3373815,
    "lng": 121.0332653,
    "prices": {
      "diesel": 74.83,
      "premiumDiesel": 77.83,
      "unleaded": 80.27,
      "premium95": 81.27,
      "premium97": 92.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2229,
    "sourceId": "cmmj30i0n00bv6gzcujr20pw0",
    "brand": "phoenix",
    "name": "Phoenix Agro Homes",
    "area": "San Pedro",
    "lat": 14.3969842,
    "lng": 121.0447111,
    "prices": {
      "diesel": 79.5,
      "premiumDiesel": null,
      "unleaded": 77.5,
      "premium95": 78.5,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2230,
    "sourceId": "cmmj30i0o00g06gzco920lte3",
    "brand": "petron",
    "name": "Petron Daang Hari",
    "area": "San Pedro",
    "lat": 14.3744443,
    "lng": 121.0120294,
    "prices": {
      "diesel": 76.43,
      "premiumDiesel": 79.43,
      "unleaded": 80.17,
      "premium95": 81.17,
      "premium97": 94.57,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2231,
    "sourceId": "cmmj30i0q00p16gzcr7a622zz",
    "brand": "unioil",
    "name": "Unioil MCX",
    "area": "San Pedro",
    "lat": 14.3763644,
    "lng": 121.0160847,
    "prices": {
      "diesel": 75.53,
      "premiumDiesel": null,
      "unleaded": 86.17,
      "premium95": 89.17,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2232,
    "sourceId": "cmmj30i0r00v26gzc0c48tzm4",
    "brand": "phoenix",
    "name": "Phoenix Daang Hari",
    "area": "San Pedro",
    "lat": 14.4126898,
    "lng": 121.0150856,
    "prices": {
      "diesel": 78.13,
      "premiumDiesel": null,
      "unleaded": 80.67,
      "premium95": 81.67,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2233,
    "sourceId": "cmmj30i0t013e6gzczf1ocxud",
    "brand": "shell",
    "name": "Shell Muntinlupa-Cavite Expressway",
    "area": "San Pedro",
    "lat": 14.3753429,
    "lng": 121.0155756,
    "prices": {
      "diesel": 83.93,
      "premiumDiesel": 91.93,
      "unleaded": 90.77,
      "premium95": 99.07,
      "premium97": 103.07,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2234,
    "sourceId": "cmmm5jw8e03106g83wonpypo8",
    "brand": "ptt",
    "name": "PTT Station R Magsaysay",
    "area": "San Pedro",
    "lat": 14.3255017,
    "lng": 121.0152959,
    "prices": {
      "diesel": 80.53,
      "premiumDiesel": null,
      "unleaded": 85.97,
      "premium95": 88.07,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2235,
    "sourceId": "cmmm5my9q013o6gg3oom48fow",
    "brand": "total",
    "name": "Alta tierra",
    "area": "San Pedro",
    "lat": 14.3214046,
    "lng": 121.014818,
    "prices": {
      "diesel": 76.19,
      "premiumDiesel": null,
      "unleaded": 79.48,
      "premium95": 80.48,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2236,
    "sourceId": "cmna2jcqi00466gixzmpanogq",
    "brand": "petron",
    "name": "Petron Gasul",
    "area": "San Pedro",
    "lat": 14.3710376,
    "lng": 121.022616,
    "prices": {
      "diesel": 76.43,
      "premiumDiesel": 79.43,
      "unleaded": 83.57,
      "premium95": 84.57,
      "premium97": 94.57,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2237,
    "sourceId": "cmna2ji5u00ax6gix7opmnpft",
    "brand": "caltex",
    "name": "ChevronTexaco Malampaya",
    "area": "San Pedro",
    "lat": 14.4081327,
    "lng": 121.0414667,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2238,
    "sourceId": "cmmj30i0m003q6gzczslooij1",
    "brand": "petron",
    "name": "Petron (Petrolyum Inc.)",
    "area": "San Pedro",
    "lat": 14.4145661,
    "lng": 121.0454496,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2239,
    "sourceId": "cmmj30i0s00yx6gzcv0tma92m",
    "brand": "shell",
    "name": "Shell Rodeo Drive",
    "area": "San Pedro",
    "lat": 14.4077376,
    "lng": 121.012015,
    "prices": {
      "diesel": 83.93,
      "premiumDiesel": 91.93,
      "unleaded": 90.77,
      "premium95": 99.07,
      "premium97": 103.07,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2240,
    "sourceId": "cmmj30i0p00is6gzc548tqdgp",
    "brand": "petron",
    "name": "Petron Daang Hari",
    "area": "San Pedro",
    "lat": 14.3997555,
    "lng": 121.0114022,
    "prices": {
      "diesel": 76.43,
      "premiumDiesel": 79.43,
      "unleaded": 83.57,
      "premium95": 84.57,
      "premium97": 94.57,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2241,
    "sourceId": "cmmm5h4kk005r6g83zc4ndr1x",
    "brand": "petron",
    "name": "Petron Station (14.3163, 121.0230)",
    "area": "Cabuyao",
    "lat": 14.3162617,
    "lng": 121.0230486,
    "prices": {
      "diesel": 74.83,
      "premiumDiesel": 77.83,
      "unleaded": 80.27,
      "premium95": 81.27,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2242,
    "sourceId": "cmmm5kc7a03h16g83omin9lok",
    "brand": "petron",
    "name": "Petron Maharlika Highway",
    "area": "Calamba",
    "lat": 14.1848529,
    "lng": 121.1363195,
    "prices": {
      "diesel": 75.83,
      "premiumDiesel": 77.33,
      "unleaded": 82.67,
      "premium95": 83.67,
      "premium97": 93.67,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2243,
    "sourceId": "cmmm5h7s900916g83v702tfok",
    "brand": "total",
    "name": "Total (Suplang) by:ECOLOGY GREEN ENERGY CORPORATION",
    "area": "Calamba",
    "lat": 14.1518543,
    "lng": 121.060476,
    "prices": {
      "diesel": 74.83,
      "premiumDiesel": null,
      "unleaded": 79.97,
      "premium95": 80.97,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2244,
    "sourceId": "cmmm5hewl00fw6g83rp4gz0v5",
    "brand": "shell",
    "name": "Shell Lingga Road",
    "area": "Los Baños",
    "lat": 14.2144954,
    "lng": 121.184119,
    "prices": {
      "diesel": 81.93,
      "premiumDiesel": 88.83,
      "unleaded": 88.67,
      "premium95": 93.47,
      "premium97": 97.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2245,
    "sourceId": "cmmm5hbom00cm6g83nw2tmga4",
    "brand": "total",
    "name": "Total (Calamba, Laguna)",
    "area": "Calamba",
    "lat": 14.1939403,
    "lng": 121.1053207,
    "prices": {
      "diesel": 74.83,
      "premiumDiesel": null,
      "unleaded": 79.97,
      "premium95": 80.97,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2246,
    "sourceId": "cmmm5hg4f00h66g83oo7eyg59",
    "brand": "jetti",
    "name": "Jetti National Highway",
    "area": "Los Baños",
    "lat": 14.1735636,
    "lng": 121.198692,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2247,
    "sourceId": "cmmm5hqot00rz6g83hb66wux0",
    "brand": "shell",
    "name": "Shell Maharlika Highway",
    "area": "Calamba",
    "lat": 14.1872802,
    "lng": 121.1361367,
    "prices": {
      "diesel": 81.93,
      "premiumDiesel": 88.83,
      "unleaded": 88.67,
      "premium95": 93.47,
      "premium97": 97.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2248,
    "sourceId": "cmmm5hwu700ym6g83nzff1tpy",
    "brand": "petron",
    "name": "Petron National Highway",
    "area": "Calamba",
    "lat": 14.2069605,
    "lng": 121.1542207,
    "prices": {
      "diesel": 75.83,
      "premiumDiesel": 77.33,
      "unleaded": 82.67,
      "premium95": 83.67,
      "premium97": 93.67,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2249,
    "sourceId": "cmmm5hype010l6g83i876il7q",
    "brand": "petron",
    "name": "Petron Santa Rosa-Tagaytay Road",
    "area": "Calamba",
    "lat": 14.2238416,
    "lng": 121.0387303,
    "prices": {
      "diesel": 74.83,
      "premiumDiesel": 77.83,
      "unleaded": 80.27,
      "premium95": 81.27,
      "premium97": 93.67,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2250,
    "sourceId": "cmmm5hze6011c6g83ty1m2t5f",
    "brand": "shell",
    "name": "Shell Governor's Drive",
    "area": "Cabuyao",
    "lat": 14.2892197,
    "lng": 121.0117171,
    "prices": {
      "diesel": 83.03,
      "premiumDiesel": 89.33,
      "unleaded": 93.37,
      "premium95": 96.07,
      "premium97": 117.77,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2251,
    "sourceId": "cmmm5i4qf01736g838j4agkvg",
    "brand": "shell",
    "name": "Shell Chipeco Avenue Extension",
    "area": "Calamba",
    "lat": 14.1956972,
    "lng": 121.15545,
    "prices": {
      "diesel": 81.93,
      "premiumDiesel": 88.83,
      "unleaded": 88.67,
      "premium95": 93.47,
      "premium97": 97.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2252,
    "sourceId": "cmmm5i526017f6g839zjyv859",
    "brand": "caltex",
    "name": "Caltex Maharlika Highway",
    "area": "Calamba",
    "lat": 14.1826455,
    "lng": 121.1364196,
    "prices": {
      "diesel": 81.53,
      "premiumDiesel": 86.95,
      "unleaded": 87.8,
      "premium95": 92.6,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2253,
    "sourceId": "cmmm5i5m201806g83h6f2ufoj",
    "brand": "petron",
    "name": "Petron National Highway 1",
    "area": "Calamba",
    "lat": 14.1957294,
    "lng": 121.1439582,
    "prices": {
      "diesel": 75.83,
      "premiumDiesel": 77.33,
      "unleaded": 82.67,
      "premium95": 83.67,
      "premium97": 93.67,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2254,
    "sourceId": "cmmm5i7ne01a66g83m9zlrx2v",
    "brand": "total",
    "name": "Total (Calamba)",
    "area": "Calamba",
    "lat": 14.1925348,
    "lng": 121.1666651,
    "prices": {
      "diesel": 74.83,
      "premiumDiesel": null,
      "unleaded": 79.97,
      "premium95": 80.97,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2255,
    "sourceId": "cmmm5i88i01as6g83c2m86f56",
    "brand": "petron",
    "name": "Petron - Makiling",
    "area": "Calamba",
    "lat": 14.1630658,
    "lng": 121.1382347,
    "prices": {
      "diesel": 75.83,
      "premiumDiesel": 77.33,
      "unleaded": 82.67,
      "premium95": 83.67,
      "premium97": 93.67,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2256,
    "sourceId": "cmmm5iidt01le6g83kqxgkl7k",
    "brand": "shell",
    "name": "Shell National Highway",
    "area": "Los Baños",
    "lat": 14.1907821,
    "lng": 121.1675443,
    "prices": {
      "diesel": 81.93,
      "premiumDiesel": 88.83,
      "unleaded": 88.67,
      "premium95": 93.47,
      "premium97": 97.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2257,
    "sourceId": "cmmm5ij0001m36g83aqo80hog",
    "brand": "petron",
    "name": "Petron Santa Rosa-Tagaytay Road",
    "area": "Calamba",
    "lat": 14.2093248,
    "lng": 121.025818,
    "prices": {
      "diesel": 74.83,
      "premiumDiesel": 77.83,
      "unleaded": 80.27,
      "premium95": 81.27,
      "premium97": 93.67,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2258,
    "sourceId": "cmmm5io3901re6g83i3a6nkrs",
    "brand": "petron",
    "name": "Petron Chipeco Avenue",
    "area": "Calamba",
    "lat": 14.2088826,
    "lng": 121.1610324,
    "prices": {
      "diesel": 75.83,
      "premiumDiesel": 77.33,
      "unleaded": 82.67,
      "premium95": 83.67,
      "premium97": 93.67,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2259,
    "sourceId": "cmmm5k6hp03bc6g83g6iz4xdt",
    "brand": "seaoil",
    "name": "SEAOIL - Bagong Kalsada Laguna",
    "area": "Los Baños",
    "lat": 14.1736864,
    "lng": 121.1936516,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2260,
    "sourceId": "cmmm5k3mt038k6g835n09vsg1",
    "brand": "shell",
    "name": "Shell Carmelray",
    "area": "Calamba",
    "lat": 14.2087373,
    "lng": 121.0815869,
    "prices": {
      "diesel": 81.93,
      "premiumDiesel": 88.83,
      "unleaded": 88.67,
      "premium95": 93.47,
      "premium97": 97.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2261,
    "sourceId": "cmmm5ipjw01sy6g83kehgyrc7",
    "brand": "flyingv",
    "name": "Flying V Maharlika Highway",
    "area": "Calamba",
    "lat": 14.184949,
    "lng": 121.1368763,
    "prices": {
      "diesel": 74.29,
      "premiumDiesel": null,
      "unleaded": 81.68,
      "premium95": 82.68,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2262,
    "sourceId": "cmmm5kb5603g06g8378pu8e87",
    "brand": "petron",
    "name": "Petron Governor's Drive",
    "area": "Cabuyao",
    "lat": 14.2993561,
    "lng": 121.0205502,
    "prices": {
      "diesel": 74.83,
      "premiumDiesel": 77.83,
      "unleaded": 80.27,
      "premium95": 81.27,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2263,
    "sourceId": "cmmm5kbek03g96g83pejkknjf",
    "brand": "total",
    "name": "Total (Milagrosa)",
    "area": "Calamba",
    "lat": 14.1652641,
    "lng": 121.1376913,
    "prices": {
      "diesel": 74.83,
      "premiumDiesel": null,
      "unleaded": 79.97,
      "premium95": 80.97,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2264,
    "sourceId": "cmmm5ka2f03es6g83y1f3z0cg",
    "brand": "caltex",
    "name": "Caltex Milagrosa Calamba",
    "area": "Calamba",
    "lat": 14.1796888,
    "lng": 121.1365138,
    "prices": {
      "diesel": 81.53,
      "premiumDiesel": 86.95,
      "unleaded": 87.8,
      "premium95": 92.6,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2265,
    "sourceId": "cmmm5iwf7020c6g830p9574g3",
    "brand": "shell",
    "name": "Shell Maharlika Highway",
    "area": "Calamba",
    "lat": 14.1798609,
    "lng": 121.1370864,
    "prices": {
      "diesel": 81.93,
      "premiumDiesel": 88.83,
      "unleaded": 88.67,
      "premium95": 93.47,
      "premium97": 97.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2266,
    "sourceId": "cmmm5iwte020p6g83bof1wlql",
    "brand": "caltex",
    "name": "Caltex Santa Rosa-Tagaytay Road",
    "area": "Cabuyao",
    "lat": 14.1833745,
    "lng": 121.0126662,
    "prices": {
      "diesel": 81.83,
      "premiumDiesel": 85.13,
      "unleaded": 87.87,
      "premium95": 93.87,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2267,
    "sourceId": "cmmm5j7w702cf6g833euczfgm",
    "brand": "shell",
    "name": "Shell Chipeco Avenue",
    "area": "Calamba",
    "lat": 14.2093772,
    "lng": 121.1607487,
    "prices": {
      "diesel": 81.93,
      "premiumDiesel": 88.83,
      "unleaded": 88.67,
      "premium95": 93.47,
      "premium97": 97.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2268,
    "sourceId": "cmmm5jq3302un6g83vhv7fghq",
    "brand": "seaoil",
    "name": "SEAOIL - Canlubang",
    "area": "Calamba",
    "lat": 14.206713,
    "lng": 121.0962327,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2269,
    "sourceId": "cmmm5klwi03qq6g8349s6bamo",
    "brand": "cleanfuel",
    "name": "Cleanfuel Manila South Road Calamba",
    "area": "Calamba",
    "lat": 14.1901693,
    "lng": 121.1681826,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2270,
    "sourceId": "cmmm5m4if00n66gg39mleshqw",
    "brand": "total",
    "name": "Total Gasoline Station Calamba Laguna",
    "area": "Calamba",
    "lat": 14.1889633,
    "lng": 121.1369834,
    "prices": {
      "diesel": 74.83,
      "premiumDiesel": null,
      "unleaded": 79.97,
      "premium95": 80.97,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2271,
    "sourceId": "cmmm5m60100o06gg3j1986cpr",
    "brand": "shell",
    "name": "Shell Santa Rosa-Tagaytay Road",
    "area": "Calamba",
    "lat": 14.2191296,
    "lng": 121.0358963,
    "prices": {
      "diesel": 83.03,
      "premiumDiesel": 89.33,
      "unleaded": 93.37,
      "premium95": 96.07,
      "premium97": 117.77,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2272,
    "sourceId": "cmmm5mg6z00to6gg3fonqju6w",
    "brand": "total",
    "name": "Total Gas Station",
    "area": "Calamba",
    "lat": 14.2056096,
    "lng": 121.1177381,
    "prices": {
      "diesel": 74.83,
      "premiumDiesel": null,
      "unleaded": 79.97,
      "premium95": 80.97,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2273,
    "sourceId": "cmmm5mv7m01206gg3br2ldhv0",
    "brand": "caltex",
    "name": "Green Fuel GMA",
    "area": "Cabuyao",
    "lat": 14.315248,
    "lng": 121.0209979,
    "prices": {
      "diesel": 81.83,
      "premiumDiesel": 85.13,
      "unleaded": 87.87,
      "premium95": 93.87,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2274,
    "sourceId": "cmmm5n946019o6gg3nrh4n26l",
    "brand": "petron",
    "name": "Petron Gasul Branch",
    "area": "Calamba",
    "lat": 14.2152043,
    "lng": 121.0315999,
    "prices": {
      "diesel": 74.83,
      "premiumDiesel": 77.83,
      "unleaded": 80.27,
      "premium95": 81.27,
      "premium97": 93.67,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2275,
    "sourceId": "cmmm5nce101bi6gg33vmbhaf0",
    "brand": "shell",
    "name": "Shell National Highway",
    "area": "Los Baños",
    "lat": 14.1768038,
    "lng": 121.187114,
    "prices": {
      "diesel": 81.93,
      "premiumDiesel": 88.83,
      "unleaded": 88.67,
      "premium95": 93.47,
      "premium97": 97.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2276,
    "sourceId": "cmmm5nfnt01dc6gg3skbuboye",
    "brand": "caltex",
    "name": "Caltex Pansol",
    "area": "Los Baños",
    "lat": 14.1750994,
    "lng": 121.1890087,
    "prices": {
      "diesel": 81.53,
      "premiumDiesel": 86.95,
      "unleaded": 87.8,
      "premium95": 92.6,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2277,
    "sourceId": "cmmm5nimc01f06gg3iehdf3l5",
    "brand": "shell",
    "name": "Shell National Highway 1",
    "area": "Calamba",
    "lat": 14.196488,
    "lng": 121.144387,
    "prices": {
      "diesel": 81.93,
      "premiumDiesel": 88.83,
      "unleaded": 88.67,
      "premium95": 93.47,
      "premium97": 97.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2278,
    "sourceId": "cmmm5hqz200sb6g838qtep7wn",
    "brand": "jetti",
    "name": "Jetti Chipeco Avenue",
    "area": "Calamba",
    "lat": 14.2038905,
    "lng": 121.1634983,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2279,
    "sourceId": "cmmm5imqv01px6g83shoe5wgo",
    "brand": "petron",
    "name": "Petron Gas Station",
    "area": "Calamba",
    "lat": 14.181212,
    "lng": 121.1592947,
    "prices": {
      "diesel": 75.83,
      "premiumDiesel": 77.33,
      "unleaded": 82.67,
      "premium95": 83.67,
      "premium97": 93.67,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2280,
    "sourceId": "cmmm5ifzw01j26g834x8smc9p",
    "brand": "flyingv",
    "name": "Flying V Prinza",
    "area": "Calamba",
    "lat": 14.202403,
    "lng": 121.1425401,
    "prices": {
      "diesel": 74.29,
      "premiumDiesel": null,
      "unleaded": 81.68,
      "premium95": 82.68,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2281,
    "sourceId": "cmmm5i7i501a06g83emqm71cx",
    "brand": "petron",
    "name": "Petron National Highway bucal calamba",
    "area": "Calamba",
    "lat": 14.1920949,
    "lng": 121.1670424,
    "prices": {
      "diesel": 75.83,
      "premiumDiesel": 77.33,
      "unleaded": 82.67,
      "premium95": 83.67,
      "premium97": 93.67,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2282,
    "sourceId": "cmmm5itlv01xa6g834fn92ovb",
    "brand": "flyingv",
    "name": "Flying V Lawa",
    "area": "Calamba",
    "lat": 14.20893,
    "lng": 121.1497327,
    "prices": {
      "diesel": 74.29,
      "premiumDiesel": null,
      "unleaded": 81.68,
      "premium95": 82.68,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2283,
    "sourceId": "cmmm5kl9703q46g83ama5cx1s",
    "brand": "petron",
    "name": "Calamba Petron Station",
    "area": "Calamba",
    "lat": 14.2110985,
    "lng": 121.1187516,
    "prices": {
      "diesel": 75.83,
      "premiumDiesel": 77.33,
      "unleaded": 82.67,
      "premium95": 83.67,
      "premium97": 93.67,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2284,
    "sourceId": "cmna2jr5p00kt6gixr9yi3aiz",
    "brand": "petron",
    "name": "Petron Calamba-Tagaytay Road",
    "area": "Calamba",
    "lat": 14.1592911,
    "lng": 121.075079,
    "prices": {
      "diesel": 75.83,
      "premiumDiesel": 77.33,
      "unleaded": 82.67,
      "premium95": 83.67,
      "premium97": 93.67,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2285,
    "sourceId": "cmna2jra300kz6gixjmlxoaum",
    "brand": "ptt",
    "name": "PTT Mamon Road",
    "area": "Los Baños",
    "lat": 14.1732321,
    "lng": 121.1915304,
    "prices": {
      "diesel": 79.41,
      "premiumDiesel": null,
      "unleaded": 85.4,
      "premium95": 86.4,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2286,
    "sourceId": "cmmm5kbjl03gf6g83mtbi6gwp",
    "brand": "seaoil",
    "name": "Seaoil Makiling, Calamba - Laguna",
    "area": "Calamba",
    "lat": 14.1640831,
    "lng": 121.1381607,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2287,
    "sourceId": "cmmm5ikpb01nr6g83khulp1uk",
    "brand": "petron",
    "name": "Petron Maharlika Highway",
    "area": "Calamba",
    "lat": 14.1345093,
    "lng": 121.1356964,
    "prices": {
      "diesel": 75.83,
      "premiumDiesel": 77.33,
      "unleaded": 82.67,
      "premium95": 83.67,
      "premium97": 93.67,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2288,
    "sourceId": "cmmm5ikuk01nx6g83qnyxalht",
    "brand": "caltex",
    "name": "Caltex Anastasia",
    "area": "Calamba",
    "lat": 14.1327418,
    "lng": 121.1367543,
    "prices": {
      "diesel": 81.53,
      "premiumDiesel": 86.95,
      "unleaded": 87.8,
      "premium95": 92.6,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2289,
    "sourceId": "cmmm5hq7s00rg6g83woxhl87c",
    "brand": "petron",
    "name": "Petron UPLB",
    "area": "Los Baños",
    "lat": 14.1617224,
    "lng": 121.2458991,
    "prices": {
      "diesel": 75.83,
      "premiumDiesel": 77.33,
      "unleaded": 82.67,
      "premium95": 83.67,
      "premium97": 93.67,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2290,
    "sourceId": "cmmm5nvt801mc6gg3kzefzngm",
    "brand": "total",
    "name": "Superkalan Gaz",
    "area": "Los Baños",
    "lat": 14.169935,
    "lng": 121.2441088,
    "prices": {
      "diesel": 74.83,
      "premiumDiesel": null,
      "unleaded": 79.97,
      "premium95": 80.97,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2291,
    "sourceId": "cmmm5h846009e6g835m22egwl",
    "brand": "petron",
    "name": "Petron Pili Drive",
    "area": "Los Baños",
    "lat": 14.1708671,
    "lng": 121.2576571,
    "prices": {
      "diesel": 75.83,
      "premiumDiesel": 77.33,
      "unleaded": 82.67,
      "premium95": 83.67,
      "premium97": 93.67,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2292,
    "sourceId": "cmmm5nvfy01m66gg3t9s9qwo5",
    "brand": "total",
    "name": "EC Gas Los Baños",
    "area": "Los Baños",
    "lat": 14.1721294,
    "lng": 121.2453306,
    "prices": {
      "diesel": 74.83,
      "premiumDiesel": null,
      "unleaded": 79.97,
      "premium95": 80.97,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2293,
    "sourceId": "cmmm5i30r01586g830s8xjuya",
    "brand": "petron",
    "name": "Petron National Highway",
    "area": "Los Baños",
    "lat": 14.1757148,
    "lng": 121.2651432,
    "prices": {
      "diesel": 75.83,
      "premiumDiesel": 77.33,
      "unleaded": 82.67,
      "premium95": 83.67,
      "premium97": 93.67,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2294,
    "sourceId": "cmmm5je7l02ii6g83jshcodqc",
    "brand": "ptt",
    "name": "PTT LOS BAÑOS",
    "area": "Los Baños",
    "lat": 14.1761263,
    "lng": 121.2637414,
    "prices": {
      "diesel": 79.41,
      "premiumDiesel": null,
      "unleaded": 85.4,
      "premium95": 86.4,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2295,
    "sourceId": "cmmm5impg01pw6g839ki7zwdx",
    "brand": "phoenix",
    "name": "Phoenix Gasoline Station - Los Baños branch",
    "area": "Los Baños",
    "lat": 14.1761849,
    "lng": 121.2622952,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2296,
    "sourceId": "cmmm5klz403qs6g83ez6ll4gr",
    "brand": "cleanfuel",
    "name": "Cleanfuel Manila South Road Los Baños",
    "area": "Los Baños",
    "lat": 14.1768813,
    "lng": 121.2564026,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2297,
    "sourceId": "cmmm5i7gu019z6g83ziw5i6c8",
    "brand": "phoenix",
    "name": "Phoenix National Highway",
    "area": "Los Baños",
    "lat": 14.1778061,
    "lng": 121.2463053,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2298,
    "sourceId": "cmmm5nuui01lu6gg3p8o3n6bp",
    "brand": "petron",
    "name": "Petron Gasul",
    "area": "Los Baños",
    "lat": 14.1806217,
    "lng": 121.2339301,
    "prices": {
      "diesel": 75.83,
      "premiumDiesel": 77.33,
      "unleaded": 82.67,
      "premium95": 83.67,
      "premium97": 93.67,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2299,
    "sourceId": "cmmm5iazw01ds6g832g3rnoqy",
    "brand": "seaoil",
    "name": "SEAOIL - Los Banos Laguna",
    "area": "Los Baños",
    "lat": 14.1811294,
    "lng": 121.2278226,
    "prices": {
      "diesel": null,
      "premiumDiesel": null,
      "unleaded": null,
      "premium95": null,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2300,
    "sourceId": "cmmm5icjs01fd6g83wcsoq20c",
    "brand": "shell",
    "name": "Shell National Highway",
    "area": "Los Baños",
    "lat": 14.1815034,
    "lng": 121.2289855,
    "prices": {
      "diesel": 81.93,
      "premiumDiesel": 88.83,
      "unleaded": 88.67,
      "premium95": 93.47,
      "premium97": 97.47,
      "kerosene": null,
      "egasoline": null
    }
  },
  {
    "id": 2301,
    "sourceId": "cmmm5nv5901m06gg3h80959r9",
    "brand": "caltex",
    "name": "Blazing star gas station",
    "area": "Los Baños",
    "lat": 14.1838,
    "lng": 121.23961,
    "prices": {
      "diesel": 81.53,
      "premiumDiesel": 86.95,
      "unleaded": 87.8,
      "premium95": 92.6,
      "premium97": null,
      "kerosene": null,
      "egasoline": null
    }
  }
];

const GASUL_PRICES = [
  {
    brand: "Petron Gasul",
    color: "#004B93",
    sizes: {
      "11kg": 1498,
      "22kg": 2797,
      "50kg": 6647,
    },
  },
  {
    brand: "Solane",
    color: "#E42313",
    sizes: {
      "11kg": 1574,
      "22kg": 2947,
      "50kg": 6973,
    },
  },
  {
    brand: "Total Gas",
    color: "#E42313",
    sizes: {
      "11kg": 1636,
      "22kg": 3081,
      "50kg": 7252,
    },
  },
  {
    brand: "Phoenix LPG",
    color: "#FF6600",
    sizes: {
      "11kg": 1334,
      "22kg": 2607,
      "50kg": 5946,
    },
  },
  {
    brand: "SL Gas",
    color: "#00A651",
    sizes: {
      "11kg": 1319,
      "22kg": 2587,
      "50kg": null,
    },
  },
];

// ─── Helper Functions ──────────────────────────────────────────
function getAveragePrice(fuelType) {
  const prices = GAS_STATIONS
    .map((s) => s.prices[fuelType])
    .filter((p) => typeof p === "number" && !isNaN(p));
  if (!prices.length) return 0;
  return prices.reduce((a, b) => a + b, 0) / prices.length;
}

function getMinPrice(fuelType) {
  const prices = GAS_STATIONS
    .map((s) => s.prices[fuelType])
    .filter((p) => typeof p === "number" && !isNaN(p));
  if (!prices.length) return 0;
  return Math.min(...prices);
}

function getMaxPrice(fuelType) {
  const prices = GAS_STATIONS
    .map((s) => s.prices[fuelType])
    .filter((p) => typeof p === "number" && !isNaN(p));
  if (!prices.length) return 0;
  return Math.max(...prices);
}

function getPriceLevel(price, fuelType) {
  const avg = getAveragePrice(fuelType);
  const min = getMinPrice(fuelType);
  const max = getMaxPrice(fuelType);
  const range = max - min;
  if (price <= min + range * 0.33) return "low";
  if (price <= min + range * 0.66) return "mid";
  return "high";
}
