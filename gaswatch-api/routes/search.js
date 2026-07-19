const { Router } = require('express');

const { getStations } = require('../services/dataService');

const router = Router();

function matchesQuery(station, query) {
  return [station.name, station.brand, station.area].some((value) =>
    String(value || '').toLocaleLowerCase().includes(query)
  );
}

router.get('/', (request, response, next) => {
  try {
    const query = typeof request.query.q === 'string'
      ? request.query.q.trim().toLocaleLowerCase()
      : '';
    const stations = query
      ? getStations().filter((station) => matchesQuery(station, query))
      : [];

    return response.status(200).json({
      success: true,
      count: stations.length,
      data: stations,
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
