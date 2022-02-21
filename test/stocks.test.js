const request = require("supertest");
const { app } = require('./_helpers');
const {generateStocks} = require("../app/services/stock.service");

describe("Test the stocks", () => {

  it("Should retrieve at least one stock's detail", async () => {
    const expected = [
      expect.objectContaining({
        timestamp: expect.any(Date),
        index: expect.any(Number),
        stocks: expect.any(String),
      }),
    ];
    const stocks = generateStocks();
    expect(stocks).toBeDefined();
    expect(stocks).toEqual(expect.arrayContaining(expected));
  });
});
