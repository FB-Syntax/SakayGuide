const dotenv = require('dotenv');

dotenv.config({ quiet: true });

const supportedEnvironments = new Set(['development', 'test', 'production']);

function readPositiveInteger(name, fallback) {
  const rawValue = process.env[name];

  if (rawValue === undefined || rawValue.trim() === '') {
    return fallback;
  }

  const value = Number.parseInt(rawValue, 10);

  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new Error(`${name} must be a positive integer.`);
  }

  return value;
}

function readCorsOrigins() {
  const rawValue = process.env.CORS_ORIGIN?.trim();

  if (!rawValue || rawValue === '*') {
    return ['*'];
  }

  const origins = rawValue
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (origins.length === 0) {
    throw new Error('CORS_ORIGIN must contain at least one origin or *.');
  }

  return origins;
}

const environment = process.env.NODE_ENV || 'development';

if (!supportedEnvironments.has(environment)) {
  throw new Error(
    `NODE_ENV must be one of: ${Array.from(supportedEnvironments).join(', ')}.`
  );
}

const config = Object.freeze({
  environment,
  isProduction: environment === 'production',
  port: readPositiveInteger('PORT', 3000),
  corsOrigins: readCorsOrigins(),
  jsonBodyLimit: process.env.JSON_BODY_LIMIT || '1mb',
  shutdownTimeoutMs: readPositiveInteger('SHUTDOWN_TIMEOUT_MS', 10_000),
});

module.exports = config;
