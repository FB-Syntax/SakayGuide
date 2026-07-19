const { version } = require('../package.json');

const jsonResponse = {
  'application/json': {
    schema: {
      type: 'object',
    },
  },
};

const openapi = {
  openapi: '3.0.3',
  info: {
    title: 'GasWatch API',
    version,
    description: 'Read-only fuel price data from GasWatchPH, with a manual cache refresh endpoint.',
  },
  paths: {
    '/health': {
      get: {
        summary: 'Health check',
        responses: {
          200: { description: 'Service health', content: jsonResponse },
        },
      },
    },
    '/api/health': {
      get: {
        summary: 'Health check (API alias)',
        responses: {
          200: { description: 'Service health', content: jsonResponse },
        },
      },
    },
    '/api/stations': {
      get: {
        summary: 'List merged stations',
        parameters: [
          { $ref: '#/components/parameters/Page' },
          { $ref: '#/components/parameters/Limit' },
          { $ref: '#/components/parameters/Brand' },
          { $ref: '#/components/parameters/Area' },
          { $ref: '#/components/parameters/City' },
          { $ref: '#/components/parameters/Fuel' },
          { $ref: '#/components/parameters/Sort' },
        ],
        responses: {
          200: { description: 'Paginated stations', content: jsonResponse },
          400: { $ref: '#/components/responses/InvalidQuery' },
          429: { $ref: '#/components/responses/RateLimited' },
        },
      },
    },
    '/api/stations/{id}': {
      get: {
        summary: 'Get one merged station',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Station', content: jsonResponse },
          404: { description: 'Station not found', content: jsonResponse },
          429: { $ref: '#/components/responses/RateLimited' },
        },
      },
    },
    '/api/search': {
      get: {
        summary: 'Search station name, brand, or area',
        parameters: [{ name: 'q', in: 'query', schema: { type: 'string' }, example: 'shell' }],
        responses: {
          200: { description: 'Matching stations', content: jsonResponse },
          429: { $ref: '#/components/responses/RateLimited' },
        },
      },
    },
    '/api/brands': {
      get: {
        summary: 'List brands with station counts',
        responses: { 200: { description: 'Brands', content: jsonResponse } },
      },
    },
    '/api/areas': {
      get: {
        summary: 'List unique areas',
        responses: { 200: { description: 'Areas', content: jsonResponse } },
      },
    },
    '/api/history': {
      get: {
        summary: 'Get fuel price history',
        responses: { 200: { description: 'Price history', content: jsonResponse } },
      },
    },
    '/api/advisories': {
      get: {
        summary: 'Get GasWatch advisories',
        responses: { 200: { description: 'Advisories', content: jsonResponse } },
      },
    },
    '/api/statistics': {
      get: {
        summary: 'Get cache and dataset statistics',
        responses: { 200: { description: 'Statistics', content: jsonResponse } },
      },
    },
    '/api/reload': {
      post: {
        summary: 'Refresh GasWatch data',
        responses: {
          200: { description: 'Refresh completed', content: jsonResponse },
          429: { $ref: '#/components/responses/RateLimited' },
        },
      },
    },
    '/docs': {
      get: {
        summary: 'Open interactive API documentation',
        responses: {
          200: {
            description: 'Swagger UI document',
            content: { 'text/html': { schema: { type: 'string' } } },
          },
        },
      },
    },
  },
  components: {
    parameters: {
      Page: { name: 'page', in: 'query', schema: { type: 'integer', minimum: 1, default: 1 } },
      Limit: { name: 'limit', in: 'query', schema: { type: 'integer', minimum: 1, maximum: 200, default: 50 } },
      Brand: { name: 'brand', in: 'query', schema: { type: 'string' } },
      Area: { name: 'area', in: 'query', schema: { type: 'string' } },
      City: { name: 'city', in: 'query', schema: { type: 'string' } },
      Fuel: { name: 'fuel', in: 'query', schema: { type: 'string' } },
      Sort: { name: 'sort', in: 'query', schema: { type: 'string', enum: ['id', 'name', 'brand', 'area'], default: 'id' } },
    },
    responses: {
      InvalidQuery: { description: 'Invalid query parameter', content: jsonResponse },
      RateLimited: { description: 'Too many requests', content: jsonResponse },
    },
  },
};

module.exports = openapi;
