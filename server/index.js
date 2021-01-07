const compression = require('compression');
const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios').default;

app.use(compression());
app.use('/items/:itemId', express.static('client'));

app.listen(port, () => {
  console.log(`fetsyProxyServer listening at http://localhost:${port}`);
});

// #############################
// Request for service bundles
// #############################

// Shopping Service Amazon EC2 Instance
// http://18.222.223.190:3004/items/1
app.get('/shopping', (req, res) => {
  axios.get('http://18.222.223.190:3004/items/1/bundle.js')
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

// Seller Service Amazon EC2 Instance
// http://3.21.248.149:3005/items/2/
app.get('/seller', (req, res) => {
  console.log('hitting seller endpoint');
  axios.get('http://3.21.248.149:3005/items/1/bundle.js')
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

// Reviews Service Amazon EC2 Instance
// http://54.151.123.24:3002/items/1/
app.get('/reviews', (req, res) => {
  console.log('hitting seller endpoint');
  axios.get('http://54.151.123.24:3002/items/1/bundle.js')
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

// Item Images Service Amazon EC2 Instance
// http://13.52.213.118:3006/items/1/
app.get('/images', (req, res) => {
  console.log('hitting images endpoint');
  axios.get('http://13.52.213.118:3006/items/1/bundle.js')
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

// Shopping Service Amazon EC2 Instance
// http://18.222.223.190:3004/items/1
// Shopping Service
app.get('/shopping/items/:itemId', (req, res) => {
  let itemID = req.params.itemId;
  axios.get(`http://18.222.223.190:3004/shopping/items/${itemID}`)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

// Seller Service Amazon EC2 Instance
// http://3.21.248.149:3005/items/2/
// Seller Service
app.get('/items/:item_id/seller', (req, res) => {
  console.log('getting to seller endpoint');
  let itemID = req.params.item_id;
  axios.get(`http://3.21.248.149:3005/items/${itemID}/seller`)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get('/shopping/items', (req, res) => {
  axios.get('http://3.21.248.149:3005/shopping/items')
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get('/item/images', (req, res) => {
  axios.get('http://3.21.248.149:3005/item/images')
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

// Item Images Service Amazon EC2 Instance
// http://13.52.213.118:3006/items/1/
// Images Service
app.get('/item/:item_id/images', (req, res) => {
  let itemID = req.params.item_id;
  axios.get(`http://13.52.213.118:3006/item/${itemID}/images`)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});
