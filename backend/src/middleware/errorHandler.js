export function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

export function errorHandler(err, req, res, next) {
  // Express requires 4 args to treat this as an error middleware.
  void next;

  const statusCode = err.statusCode || err.status || 500;
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    console.error('[error]', err);
  }

  res.status(statusCode).json({
    success: false,
    message: statusCode >= 500 && isProduction
      ? 'Internal server error'
      : err.message || 'Internal server error',
    ...(isProduction ? {} : { stack: err.stack }),
  });
}
