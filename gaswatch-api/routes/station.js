const { Router } = require('express');

const { getStations } = require('../services/dataService');

const router = Router();

router.get('/:id', (request, response, next) => {
  try {
    const station = getStations().find(
      (candidate) => String(candidate.id) === request.params.id
    );

    if (!station) {
      return response.status(404).json({
        success: false,
        error: {
          code: 'STATION_NOT_FOUND',
          message: `Station ${request.params.id} was not found.`,
        },
        requestId: request.id,
      });
    }

    return response.status(200).json({
      success: true,
      data: station,
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
