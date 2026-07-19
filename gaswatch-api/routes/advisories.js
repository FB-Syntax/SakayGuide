const { getAdvisories } = require('../services/dataService');
const createDataRouter = require('./createDataRouter');

module.exports = createDataRouter(getAdvisories);
