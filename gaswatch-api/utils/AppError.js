class AppError extends Error {
  constructor(statusCode, message, code = 'INTERNAL_ERROR') {
    super(message);

    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
