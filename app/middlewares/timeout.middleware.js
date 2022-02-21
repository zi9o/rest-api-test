const apiTimeout = process.env.TIMEOUT || 3 * 1000;
module.exports = (req, res, next) => {
  // Set the timeout for all HTTP requests
  req.setTimeout(apiTimeout, () => {
    let err = new Error('Request Timeout');
    err.status = 408;
    err.description = 'Request Timeout';
    next(err);
  });
  // Set the server response timeout for all HTTP requests
  res.setTimeout(apiTimeout, () => {
    let err = new Error('Service Unavailable');
    err.status = 503;
    err.description = 'Service Unavailable';
    next(err);
  });
  next();
};
