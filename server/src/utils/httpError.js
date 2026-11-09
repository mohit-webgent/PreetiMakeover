/** Throw `new HttpError(404, 'Not found')` from any handler; the error middleware formats it. */
class HttpError extends Error {
  constructor(status, message, extra = {}) {
    super(message);
    this.status = status;
    this.extra = extra;
    this.expose = true;
  }
}

/** Wraps async route handlers so rejected promises reach the error middleware. */
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

module.exports = { HttpError, asyncHandler };
