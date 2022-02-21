const express = require("express");
const indexRoutes = require("./index.route");
const stocksRoutes = require("./stocks.route");

module.exports = () => {
  const app = new express.Router();

  app.get("/", function(req, res) {
    res.json({ message: "Getting data from server!" });
  });

  app.use('/', indexRoutes)
  app.use('/stocks', stocksRoutes);

  return app;
};
