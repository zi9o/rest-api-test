const express = require('express');
const {generateStocks} = require("../services/stock.service");

const router = express.Router();

router.get('/', (req, res) => {
    const stocks = generateStocks();
    // Detect if there's a limit to apply
    // TODO > This should be managed globally
    const limit = req.query._limit || undefined;
    res.status(200).send(stocks.slice(0, limit));
});

module.exports = router;