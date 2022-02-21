const express = require('express');
const {generateStocks} = require("../services/stock.service");

const router = express.Router();

router.get('/', (req, res) => {

    res.status(200).send(generateStocks());
});

module.exports = router;