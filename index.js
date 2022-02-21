import express from "express";
import path from "path";
const logger = require('morgan');
const helmet = require('helmet');

const errorParser = require('./app/middlewares/error-parser.middleware');
const timeoutParser = require('./app/middlewares/timeout.middleware');

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
}

// Handle timeout
app.use(timeoutParser);

app.use(logger('dev'));

// Passing the request url to environment locals
app.use(function (req, res, next) {
  res.locals.host = req.protocol + '://' + req.hostname;
  res.locals.url = req.protocol + '://' + req.headers.host + req.originalUrl;
  next();
});

// Environment dependent middleware
if (process.env.NODE_ENV === 'development') {
  // Disable views cache
  app.set('view cache', false);
} else if (process.env.NODE_ENV === 'production') {
  app.locals.cache = 'memory';
}

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, './front/build'), { maxAge: 31536000000 }));

// Inject App routes
app.use('/api', require("./app/routes/routes")(app));

// Parse all errors with the same format
app.use(errorParser);


// When on Production mode, All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './front/build', 'index.html'));
});

app.listen(3001, () => {
  console.log(`Server started ➜ http://localhost:3001`);
});
