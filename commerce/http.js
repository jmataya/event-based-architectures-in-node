const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let numOrders = 0;

function createCart(req, res) {
  let payload = req.body;
  if (!payload.customerId) {
    res.status(400).send({ error: 'Invalid payload, customerId is required' });
  }

  let orderRef = `BR1000${numOrders}`;
  numOrders += 1;

  res.status(201).json({ orderRef });
};

function addLineItems(req, res) {
  let payload = req.body;
  if (!payload.lineItems || payload.lineItems.length == 0) {
    res.status(400).json({ error: 'Invalid payload, must have line items' });
  }

  res.status(200).json(payload);
}

function run(port) {
  app.use(bodyParser.json());

  app.post('/carts', createCart);
  app.patch('/carts/:orderRef/line-items', addLineItems);

  app.listen(port, () => console.log(`Commerce API listening on port ${port}`)); 
};


module.exports = run;
