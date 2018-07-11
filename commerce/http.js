const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const OrderService = require("./service");

let service = new OrderService();

function createCart(req, res) {
  let { resp, error, status } = service.createCart(req);
  if (error) {
    res.status(status).json({ error });
  }
  res.status(status).json(resp);
}

function addLineItems(req, res) {
  let { error, resp, status } = service.addLineItems(req);
  if (error) {
    res.status(status).json({ error });
  }
  res.status(status).json(resp);
}

function addShippingAddress(req, res) {
  let { error, resp, status } = service.addShippingAddress(req);
  if (error) {
    res.status(status).json({ error });
  }
  res.status(status).json(resp);
}

function addPaymentMethod(req, res) {
  let { error, resp, status } = service.addPaymentMethod(req);
  if (error) {
    res.status(status).json({ error });
  }
  res.status(status).json(resp);
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
