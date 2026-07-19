const { Router } = require('express');

const { getStations } = require('../services/dataService');

const router = Router();

router.get('/', (request, response, next) => {
  try {
    const areas = [...new Set(
      getStations()
        .map((station) => station.area)
        .filter((area) => typeof area === 'string' && area.trim() !== '')
    )].sort((left, right) => left.localeCompare(right));

    return response.status(200).json(areas);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
