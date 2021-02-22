class AppError extends Error {
  constructor(message, statCode, page) {
    super(message);

    this.statusCode = statCode;
    this.page = page;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
