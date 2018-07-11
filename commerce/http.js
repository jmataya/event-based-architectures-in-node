const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const OrderService = require("./service");
const ActivityProducer = require('./producer');

let service = new OrderService();
let producer = new ActivityProducer({
  kafkaHost: '0.0.0.0:29092',
  topic: 'carts'
});

function handleResp(res, { resp, error, status }) {
  if (error) {
    res.status(status).json({ error });
    return false;
  }

  res.status(status).json(resp);
  return true;
}

function createCart(req, res) {
  let svcResp = service.createCart(req);

  if (handleResp(res, svcResp)) {
    producer.send('create_cart', svcResp.resp);
  }
}

function addLineItems(req, res) {
  let svcResp = service.addLineItems(req);

  if (handleResp(res, svcResp)) {
    producer.send('add_line_items', svcResp.resp);
  }
}

function addShippingAddress(req, res) {
  let svcResp = service.addShippingAddress(req);

  if (handleResp(res, svcResp)) {
    producer.send('add_shipping_address', svcResp.resp);
  }
}

function addPaymentMethod(req, res) {
  let svcResp = service.addPaymentMethod(req);

  if (handleResp(res, svcResp)) {
    producer.send('add_payment_method', svcResp.resp);
  }
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
