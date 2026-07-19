const cron = require('node-cron');

const { downloadAll } = require('./downloader');
const { parseDataJS, parseStationOverrides } = require('./parser');
const { mergeData } = require('./merge');

let cache = null;
let activeRefresh = null;

function deepFreeze(value, seen = new WeakSet()) {
  if (value === null || typeof value !== 'object' || seen.has(value)) {
    return value;
  }

  seen.add(value);

  for (const propertyValue of Object.values(value)) {
    deepFreeze(propertyValue, seen);
  }

  return Object.freeze(value);
}

function cloneForCaller(value) {
  return structuredClone(value);
}

async function buildCache() {
  const { dataJS, stationOverrides, communityPrices } = await downloadAll();
  const parsedData = parseDataJS(dataJS);
  const parsedOverrides = parseStationOverrides(stationOverrides);

  return deepFreeze({
    stations: mergeData(
      parsedData.GAS_STATIONS,
      parsedOverrides.STATION_OVERRIDES,
      communityPrices
    ),
    brands: parsedData.BRANDS,
    priceHistory: parsedData.PRICE_HISTORY,
    advisories: parsedData.ADVISORIES,
    fuelTypes: parsedData.FUEL_TYPES,
    lastRefresh: new Date().toISOString(),
  });
}

function requireCache() {
  if (!cache) {
    throw new Error('GasWatch data has not been initialized. Call initialize() first.');
  }

  return cache;
}

async function refresh() {
  if (activeRefresh) {
    return activeRefresh;
  }

  activeRefresh = (async () => {
    const nextCache = await buildCache();

    // Replace the cache only after all downloads, parsing, and merging succeed.
    cache = nextCache;

    return cloneForCaller(nextCache);
  })();

  try {
    return await activeRefresh;
  } finally {
    activeRefresh = null;
  }
}

async function initialize() {
  return refresh();
}

function getStations() {
  return cloneForCaller(requireCache().stations);
}

function getBrands() {
  return cloneForCaller(requireCache().brands);
}

function getPriceHistory() {
  return cloneForCaller(requireCache().priceHistory);
}

function getAdvisories() {
  return cloneForCaller(requireCache().advisories);
}

function getFuelTypes() {
  return cloneForCaller(requireCache().fuelTypes);
}

function getCacheMetadata() {
  return cloneForCaller({
    lastRefresh: requireCache().lastRefresh,
  });
}

cron.schedule(
  '*/5 * * * *',
  async () => {
    try {
      await refresh();
      console.info({ event: 'data_refresh_completed', trigger: 'cron' });
    } catch (error) {
      console.error({
        event: 'data_refresh_failed',
        trigger: 'cron',
        error: error.message,
      });
    }
  },
  {
    name: 'gaswatch-data-refresh',
    noOverlap: true,
  }
);

module.exports = {
  initialize,
  refresh,
  getStations,
  getBrands,
  getPriceHistory,
  getAdvisories,
  getFuelTypes,
  getCacheMetadata,
};
