const crypto = require('node:crypto');
const http = require('node:http');
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');

const config = require('./config');
const healthRouter = require('./routes/health');
const stationsRouter = require('./routes/stations');
const stationRouter = require('./routes/station');
const searchRouter = require('./routes/search');
const brandsRouter = require('./routes/brands');
const areasRouter = require('./routes/areas');
const historyRouter = require('./routes/history');
const advisoriesRouter = require('./routes/advisories');
const statisticsRouter = require('./routes/statistics');
const reloadRouter = require('./routes/reload');
const openapi = require('./docs/openapi');
const { initialize } = require('./services/dataService');
const AppError = require('./utils/AppError');
const { errorHandler, notFoundHandler } = require('./utils/errorHandlers');

function createCorsOptions() {
  return {
    origin(origin, callback) {
      const isAllowed =
        !origin ||
        config.corsOrigins.includes('*') ||
        config.corsOrigins.includes(origin);

      if (isAllowed) {
        return callback(null, true);
      }

      return callback(
        new AppError(403, 'This origin is not permitted by the CORS policy.', 'CORS_FORBIDDEN')
      );
    },
    optionsSuccessStatus: 204,
  };
}

const rateLimiter = rateLimit({
  windowMs: 60_000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler(request, response) {
    response.status(429).json({
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Too many requests. Please try again in a minute.',
      },
      requestId: request.id,
    });
  },
});

function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.set('trust proxy', 1);

  app.use((request, response, next) => {
    request.id = crypto.randomUUID();
    response.setHeader('X-Request-Id', request.id);
    next();
  });

  morgan.token('request-id', (request) => request.id);
  app.use(morgan(':method :url :status :response-time ms request_id=:request-id'));

  app.use(rateLimiter);
  app.use(cors(createCorsOptions()));
  app.use(compression({ threshold: 0 }));
  app.use(express.json({ limit: config.jsonBodyLimit }));
  app.use(express.urlencoded({ extended: false, limit: config.jsonBodyLimit }));

  app.use(express.static('public'));

  app.get('/docs', swaggerUi.setup(openapi, { explorer: true }));
  app.use('/docs', swaggerUi.serve);
  app.use('/health', healthRouter);
  app.use('/api/health', healthRouter);
  app.use('/api/stations', stationsRouter);
  app.use('/api/stations', stationRouter);
  app.use('/api/search', searchRouter);
  app.use('/api/brands', brandsRouter);
  app.use('/api/areas', areasRouter);
  app.use('/api/history', historyRouter);
  app.use('/api/advisories', advisoriesRouter);
  app.use('/api/statistics', statisticsRouter);
  app.use('/api/reload', reloadRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

function listen(server) {
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(config.port, () => {
      server.off('error', reject);
      resolve();
    });
  });
}

async function startServer() {
  const app = createApp();
  const server = http.createServer(app);
  let isShuttingDown = false;

  const shutdown = (signal) => {
    if (isShuttingDown) {
      return;
    }

    isShuttingDown = true;
    console.info({ event: 'shutdown_started', signal });

    const forceExitTimer = setTimeout(() => {
      console.error({ event: 'shutdown_forced', signal });
      process.exit(1);
    }, config.shutdownTimeoutMs);
    forceExitTimer.unref();

    server.close((error) => {
      clearTimeout(forceExitTimer);

      if (error) {
        console.error({ event: 'shutdown_failed', error: error.message });
        process.exit(1);
      }

      console.info({ event: 'shutdown_completed', signal });
      process.exit(0);
    });
  };

  try {
    await initialize();
  } catch (error) {
    console.error({
      event: 'data_initialization_failed',
      error: error.message,
    });
    process.exit(1);
    return null;
  }

  await listen(server);
  console.info({
    event: 'server_started',
    environment: config.environment,
    port: config.port,
  });

  process.once('SIGTERM', () => shutdown('SIGTERM'));
  process.once('SIGINT', () => shutdown('SIGINT'));

  return server;
}

if (require.main === module) {
  startServer().catch((error) => {
    console.error({
      event: 'server_start_failed',
      error: error.message,
    });
    process.exit(1);
  });
}

module.exports = {
  createApp,
  startServer,
};
