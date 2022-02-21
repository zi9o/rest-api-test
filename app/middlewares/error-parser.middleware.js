const winston = require('../config/winston-logger');
const {CommonErrors} = require('../_errors');
const errorStructure = function (err) {
  const statusCode = err.isOperational ? err.commonType : err.statusCode === 404 ? 404 : 520;
  const error = {
    error: {
      statusCode,
      message: Array.isArray(err.details) ?
        'Format invalide' :
        (err.statusCode === 404 ?
          `Cette route n'existe pas ou a été déplacée` :
          ((typeof err.description === 'string') ? err.description : 'Erreur interne')
        ),
    },
  };
  if (Array.isArray(err.details)) {
    // JOI Validation's error details
    error.error['details'] = err.details;
  }
  return {error, status: statusCode};
};

module.exports = (err, req, res, next) => {
  
  if (err) {

    if (err.name === "UnauthorizedError") {
      console.log(err); // You will still want to log the error...
      // but we don't want to send back internal operation details
      // like a stack trace to the client!
      res.status(err.status).json({ errors: [{ message: err.message }] });
      res.end();
    }


    const {error, status} = errorStructure(err);
    // set locals, only providing error in development
    res.locals.message = error.error.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(status).send(error);
    // add this line to include winston logging
    winston.error(`[status]=${status} - [user]=${req.user && req.user.userId}`+
      ` - [url]=${req.originalUrl} - [method]=${req.method} - [IP]=${req.ip} - [message]=${error.error.message} `);
    // Internal Error fired programmatically
    if (status === CommonErrors.InternalServerError) {
      console.error(err.description);
      console.error(err);
    } else if (!err.isOperational && status !== CommonErrors.InternalServerError) {
      // unCaughtException
      console.error(err);
      // send email notifying DevOps(or us Dev ;) )
    }
  } else {
    next();
  }
};
