// index.js
const {generateStocks} = require("./app/services/stock.service");
module.exports = () => {
  const data = { stocks: generateStocks() };
  return data;
};
