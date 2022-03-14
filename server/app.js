
const express = require('express');
const axios = require('axios');
const db = require('../database/index.js');

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

//ROUTES---------------------------------------------------

const sendResponse = function(err, data, res) {
  err ?
    res.status(500).send(err) :
    res.status(200).send({results: data});
}


// Get Products
app.get('/shopdata/products/', (req, res) => {
  db.getAllProducts(
    (err, data) => sendResponse(err, data, res));
});

//Get Single Product
app.get(`/shopdata/product/:product_id`, (req, res) => {
  const params = { product_id: req.params.product_id };
  db.getProduct(params.product_id,
    (err, data) => sendResponse(err, data, res));
});

//Get Single Product Style
app.get('/shopdata/product/:product_id/styles', (req, res) => {
  const params = { product_id: req.params.product_id };
  console.log(params.product_id);
  db.getStyles(params.product_id,
    (err, data) => sendResponse(err, data, res));
});

module.exports = app;