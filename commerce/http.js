const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const OrderService = require("./service");

let service = new OrderService();

function handleResp(res, { resp, error, status }) {
  if (error) {
    res.status(status).json({ error });
  }
  res.status(status).json(resp);
}

function createCart(req, res) {
  let resp = service.createCart(req);
  handleResp(res, resp);
}

function addLineItems(req, res) {
  let resp = service.addLineItems(req);
  handleResp(res, resp);
}

function addShippingAddress(req, res) {
  let resp = service.addShippingAddress(req);
  handleResp(res, resp);
}

function addPaymentMethod(req, res) {
  let resp = service.addPaymentMethod(req);
  handleResp(res, resp);
}

function run(port) {
  app.use(bodyParser.json());

  app.post('/carts', createCart);
  app.patch('/carts/:orderRef/line-items', addLineItems);
  app.patch('/carts/:orderRef/shipping-address', addShippingAddress);
  app.patch('/carts/:orderRef/payment-method', addPaymentMethod);

  app.listen(port, () => console.log(`Commerce API listening on port ${port}`)); 
};


module.exports = run;
