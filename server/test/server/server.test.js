const app = require('../../app.js');
const request = require('supertest')(app);
const expect = require('chai').expect;
const express = require('express');

describe("GET /products", () => {
  it("returns a single product", async function() {
    const response = await request.get('/shopdata/product/40344');
    expect(response.status).to.eql(200);
    // console.log('response body :', response.body.results[0]);
    expect(response.body.results[0].id).to.eql("40344");
  });
  it("returns an empty array for a non-existant product", async function() {
    const response = await request.get('/shopdata/product/403440000');
    // console.log('request :', response);
    expect(response.status).to.eql(200);
    expect(response.body).to.have.keys('results');
    expect(response.body.results.length).to.eql(0);
  });
});





// describe('For server endpoint', () => {
//   describe('"shopdata/product/:productid"', () => {
//     test('returns a 404 when the productid is 0', () => {
//       return axios.get('http://127.0.0.1:3000/shopdata/product/:0')
//         .catch((err) => {
//           const { status } = err.response;

//           expect(status).toEqual(404);
//         });
//     });
