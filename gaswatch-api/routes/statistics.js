const { Router } = require('express');

const {
  getBrands,
  getCacheMetadata,
  getFuelTypes,
  getStations,
} = require('../services/dataService');

const router = Router();

router.get('/', (request, response, next) => {
  try {
    const stations = getStations();
    const { lastRefresh } = getCacheMetadata();
    const refreshedAt = Date.parse(lastRefresh);
    const totalAreas = new Set(
      stations
        .map((station) => station.area)
        .filter((area) => typeof area === 'string' && area.trim() !== '')
    ).size;

    return response.status(200).json({
      totalStations: stations.length,
      totalBrands: Object.keys(getBrands()).length,
      totalAreas,
      fuelTypes: Object.keys(getFuelTypes()),
      lastRefresh,
      cacheAge: Number.isNaN(refreshedAt)
        ? null
        : Math.max(0, Math.floor((Date.now() - refreshedAt) / 1000)),
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
