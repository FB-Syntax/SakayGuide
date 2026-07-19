const { Router } = require('express');

const { getBrands, getStations } = require('../services/dataService');

const router = Router();

function countStationsByBrand(stations) {
  const stationCounts = new Map();

  for (const station of stations) {
    if (typeof station.brand !== 'string' || station.brand === '') {
      continue;
    }

    stationCounts.set(station.brand, (stationCounts.get(station.brand) || 0) + 1);
  }

  return stationCounts;
}

router.get('/', (request, response, next) => {
  try {
    const brands = getBrands();
    const stationCounts = countStationsByBrand(getStations());
    const data = Object.entries(brands)
      .map(([id, brand]) => ({
        id,
        name: brand.name,
        stations: stationCounts.get(id) || 0,
      }))
      .sort((left, right) => left.name.localeCompare(right.name));

    return response.status(200).json(data);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
