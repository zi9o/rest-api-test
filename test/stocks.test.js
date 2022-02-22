const request = require("supertest");
const { app } = require('./_helpers');
const {generateStocks} = require("../app/services/stock.service");

describe("Test the stocks", () => {
  const expected = [
    expect.objectContaining({
      timestamp: expect.any(Date),
      index: expect.any(Number),
      name: expect.any(String),
      stocks: expect.any(String),
    }),
  ];

  it("Should retrieve at least one stock's detail", async () => {

    const stocks = generateStocks();
    expect(stocks).toBeDefined();
    expect(stocks).toEqual(expect.arrayContaining(expected));
  });

  it("Should retrieve specified limit", async () => {
    const limit = (Math.random() * 10 * 4).toFixed();
    const response = await request(app)
        .get(`/api/stocks?_limit=${limit}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

    expect(response).toBeDefined();
    expect(response.body).toBeDefined();
    expect(response.body.length).toEqual(parseInt(limit));
  });
});
