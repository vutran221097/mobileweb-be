import httpStatus from 'http-status';

class APIError extends Error {
  constructor(
    message,
    status = httpStatus.INTERNAL_SERVER_ERROR,
    error
  ) {
    super(!error ? message : error.message);
    this.name = error && error.name ? error.name : this.constructor.name;
    this.status = status;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default APIError;