const { ValidationError } = require('mongoose').Error

function logErrors(err, req, res, next) {
  console.error(err);
  next(err);
}

function dbErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors,
    });
  }
  next(err);
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
}

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: 'Internal server error',
  });
}

module.exports = {
  error: {
    logErrors,
    boomErrorHandler,
    dbErrorHandler,
    errorHandler,
  },
};
