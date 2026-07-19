const { Router } = require('express');
const { version } = require('../package.json');

const router = Router();

router.get('/', (request, response) => {
  response.status(200).json({
    status: 'ok',
    version,
    uptime: process.uptime(),
  });
});

module.exports = router;
