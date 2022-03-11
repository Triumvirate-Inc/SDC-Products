
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
  // console.log('Params :', req.params);
  // res.send('Hello');
  db.getAllProducts(
    (err, data) => sendResponse(err, data, res));
});

//Get Single Product
app.get(`/shopdata/product/:product_id`, (req, res) => {
  // res.send('Hello');
  const params = { product_id: req.params.product_id };
  // console.log('REQ :', params);
  db.getProduct(params.product_id,
    (err, data) => sendResponse(err, data, res));
});

//Get Single Product Style
app.get('/shopdata/product/:product_id/styles', (req, res) => {
  // res.send('Hello');
  const params = { product_id: req.params.product_id };
  console.log(params.product_id);
  db.getStyles(params.product_id,
    (err, data) => sendResponse(err, data, res));
});

// //Get Related Products
// app.get('/shopdata/products/:product_id/related', (req, res) => {
//   const params = { product_id: req.query.product_id };
//   db.getRelatedItems(params,
//     (err, data) => sendResponse(err, data, res));
// });

// Listening for requests on the PORT
module.exports = app;