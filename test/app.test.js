const request = require("supertest");
const { app } = require('./_helpers');
const {CommonErrors, AppError} = require("../app/_errors");

// Please refer to docs for syntax https://jestjs.io/docs/en/testing-frameworks#expressjs
describe("Test the root path", () => {

  it("Should ping the local api", async () => {
    const response = await request(app)
      .get('/api')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).not.toBeNull();
  });
});

describe("Test error format", () => {

  it("Should return a specific format", async () => {
    const errorMessage = 'ERROR_TEST_MESSAGE';
    try {
    const response = await request(app)
        .get('/api/error')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(CommonErrors.InternalServerError);

    } catch (e) {
      console.log(e)
      expect(e.message).toEqual(errorMessage);
      expect(e.status).toEqual(CommonErrors.InternalServerError);
    }
  });
});

describe("Detect timeouts when running delay-api", () => {

  it("Should return 503", async () => {
    const response = await request(app)
        .get('/api/stocks')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(503);
  });
});
