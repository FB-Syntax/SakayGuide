const { Router } = require('express');

function createDataRouter(getData) {
  const router = Router();

  router.get('/', (request, response, next) => {
    try {
      return response.status(200).json(getData());
    } catch (error) {
      return next(error);
    }
  });

  return router;
}

module.exports = createDataRouter;
