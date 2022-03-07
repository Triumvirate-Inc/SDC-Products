
const express = require('express');
const axios = require('axios');
const db = require('../database/index.js');

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

//ROUTES--------------------------------------------------------------------

const sendResponse = function(err, data, res) {
  err ?
    res.status(500).send(err) :
    res.status(200).send(data);
}

// Get Products
app.get('shopdata/products/', (req, res) => {
  db.getSingleProduct(params,
    (err, data) => sendResponse(err, data, res));
});

//Get Single Product
app.get('shopdata/products/:product_id}', (req, res) => {
  const params = { product_id: req.query.product_id };
  db.getProducts(params,
    (err, data) => sendResponse(err, data, res));
});

//Get Single Product Style
app.get('shopdata/products/:product_id/styles', (req, res) => {
  const params = { product_id: req.query.product_id };
  db.getSingleProductStyles(params,
    (err, data) => sendResponse(err, data, res));
});

//Get Related Products
app.get('shopdata/products/:product_id/related', (req, res) => {
  const params = { product_id: req.query.product_id };
  db.getRelatedItems(params,
    (err, data) => sendResponse(err, data, res));
});

// Listening for requests on the PORT
app.listen(PORT, () => {
  console.log(`Serving up now at ${PORT}`);
});