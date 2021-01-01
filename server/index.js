const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios').default;

app.use('/items/:itemId', express.static('client'));

app.listen(port, () => {
  console.log(`fetsyProxyServer listening at http://localhost:${port}`);
});

// #############################
// Request for service bundles
// #############################

// Change local host to each services individual public address

app.get('/shopping', (req, res) => {
  axios.get('http://localhost:3004/items/1/bundle.js')
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get('/seller', (req, res) => {
  console.log('hitting seller endpoint');
  axios.get('http://localhost:3005/items/1/bundle.js')
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get('/reviews', (req, res) => {
  console.log('hitting seller endpoint');
  axios.get('http://localhost:3002/items/1/bundle.js')
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get('/images', (req, res) => {
  console.log('hitting images endpoint');
  axios.get('http://localhost:3006/items/1/bundle.js')
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

// ##################################################
// Rerouting requests from services to their correct ports if necessary
// ##################################################

// Change local host to each services individual public address

// Shopping Service
app.get('/shopping/items/:itemId', (req, res) => {
  let itemID = req.params.itemId;
  axios.get(`http://localhost:3004/shopping/items/${itemID}`)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

// Seller Service
app.get('/items/:item_id/seller', (req, res) => {
  console.log('getting to seller endpoint');
  let itemID = req.params.item_id;
  axios.get(`http://localhost:3005/items/${itemID}/seller`)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get('/shopping/items', (req, res) => {
  axios.get('http://localhost:3005/shopping/items')
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get('/item/images', (req, res) => {
  axios.get('http://localhost:3005/item/images')
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

// Images Service
app.get('/item/:item_id/images', (req, res) => {
  let itemID = req.params.item_id;
  axios.get(`http://localhost:3006/item/${itemID}/images`)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});
