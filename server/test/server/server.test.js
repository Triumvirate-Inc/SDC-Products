const expectedDataForProducts = require('../setUp/mockData.js');
const axios = require('axios');
jest.mock('axios');

describe('For server endpoint', () => {
  describe('"shopdata/product/:productid"', () => {
    test('returns a 404 when the productid is 0', () => {
      return axios.get('http://127.0.0.1:3000/shopdata/product/:0')
        .catch((err) => {
          const { status } = err.response;

          expect(status).toEqual(404);
        });
    });

    test('returns a 404 when the productid is above 10000000', () => {
      return axios.get('http://127.0.0.1:3000/shopdata/product/:10000001')
        .catch((err) => {
          const { status } = err.response;

          expect(status).toEqual(404);
        });
    });

    test('returns the expected data when productid is valid', () => {
      return axios.get('http://127.0.0.1:3000/shopdata/product/:40344')
        .then((response) => {
          const { data } = response;

          // for (const key in data) {
          //   const receivedData = data[key];
          //   const expectedData = expectedDataForProducts[key];

          //   for (let i = 0; i < expectedData.length; i++) {
          //     const receivedProduct = receivedData[i];
          //     const expectedProduct = expectedData[i];

          //     for (const key in expectedProduct) {
          //       expect(receivedProduct[key]).toEqual(expectedProduct[key]);
          //     }
          //   }
          // }
        });
    });

    test('returns a 200 when the productId is above 40344', () => {
      return axios.get('http://127.0.0.1:3000/shopdata/product/:40344')
        .then((response) => {
          const { status } = response;
          expect(status).toEqual(200);
        });
    });
  });
});