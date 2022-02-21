const express = require("express");
const indexRoutes = require("./index.route");
const stocksRoutes = require("./stocks.route");

module.exports = () => {
  const app = new express.Router();

  app.use('/', indexRoutes)
  app.use('/stocks', stocksRoutes);

  return app;
};
