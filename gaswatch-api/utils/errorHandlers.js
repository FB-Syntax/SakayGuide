const AppError = require('./AppError');

function notFoundHandler(request, response, next) {
  next(
    new AppError(
      404,
      `Route ${request.method} ${request.originalUrl} was not found.`,
      'ROUTE_NOT_FOUND'
    )
  );
}

function normalizeError(error) {
  if (error instanceof SyntaxError && Object.hasOwn(error, 'body')) {
    return new AppError(400, 'The request body contains invalid JSON.', 'INVALID_JSON');
  }

  if (error.type === 'entity.too.large') {
    return new AppError(413, 'The request body exceeds the allowed size.', 'PAYLOAD_TOO_LARGE');
  }

  return error;
}

function errorHandler(error, request, response, next) {
  if (response.headersSent) {
    return next(error);
  }

  const normalizedError = normalizeError(error);
  const statusCode =
    Number.isInteger(normalizedError.statusCode) &&
    normalizedError.statusCode >= 400 &&
    normalizedError.statusCode < 600
      ? normalizedError.statusCode
      : 500;
  const isOperational = normalizedError.isOperational === true;

  if (statusCode >= 500) {
    console.error({
      event: 'request_error',
      requestId: request.id,
      method: request.method,
      path: request.originalUrl,
      error: normalizedError.message,
      stack: normalizedError.stack,
    });
  }

  return response.status(statusCode).json({
    error: {
      code: isOperational ? normalizedError.code : 'INTERNAL_ERROR',
      message: isOperational
        ? normalizedError.message
        : 'An unexpected server error occurred.',
    },
    requestId: request.id,
  });
}

module.exports = {
  errorHandler,
  notFoundHandler,
};
