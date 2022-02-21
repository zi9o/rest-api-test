const express = require('express');
const {AppError, CommonErrors} = require("../_errors");

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json();
});

router.get('/error', (req, res) => {
    throw new AppError(CommonErrors.InternalServerError, 'ERROR_TEST_MESSAGE', true)
    res.status(200).json();
});


module.exports = router;
