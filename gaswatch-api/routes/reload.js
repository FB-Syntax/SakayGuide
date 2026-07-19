const { Router } = require('express');

const { refresh } = require('../services/dataService');

const router = Router();

router.post('/', async (request, response, next) => {
  try {
    await refresh();

    return response.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
