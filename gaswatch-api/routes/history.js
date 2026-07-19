const { getPriceHistory } = require('../services/dataService');
const createDataRouter = require('./createDataRouter');

module.exports = createDataRouter(getPriceHistory);
