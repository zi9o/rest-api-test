const request = require("supertest");
const { app } = require('./_helpers');

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
