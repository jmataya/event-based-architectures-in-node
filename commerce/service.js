function OrderService() {
  this.carts = {};
  this.customers = {};
  this.numOrders = 0;
}

function getCart(carts, refNum) {
  if (!carts || !carts[refNum]) {
    return { error: `Order ${refNum} not found` };
  } else {
    return { cart: carts[refNum] }
  };
}

OrderService.prototype.createCart = function(req) {
  let { customerId } = req.body;
  if (!customerId) {
    return { status: 400, error: 'Invalid payload, customerId is required' };
  }

  if (this.customers[customerId]) {
    return { status: 400, error: `Customer ${customerId} already has cart` };
  }

  let orderRef = `BR1000${this.numOrders}`;
  this.numOrders += 1;

  let cart = { customerId, orderRef };
  this.carts[orderRef] = cart;
  this.customers['customerId'] = orderRef;

  return { status: 201, resp: cart };
};

OrderService.prototype.addLineItems = function(req) {
  let { lineItems } = req.body;
  if (!lineItems || lineItems.length == 0) {
    return { status: 400, error: 'Invalid payload, must have line items' };
  }

  let orderRef = req.params['orderRef'];
  let cart = this.carts[orderRef];

  if (!cart) {
    return { status: 404, error: `Order ${orderRef} not found` };
  }

  return { status: 200, resp: { ...cart, lineItems } };
};

OrderService.prototype.addShippingAddress = function(req) {
  let { address } = req.body;
  if (!address) {
    return { status: 400, error: 'Invalid payload, must have an address' };
  }

  let orderRef = req.params['orderRef'];
  let cart = this.carts[orderRef];

  if (!cart) {
    return { status: 404, error: `Order ${orderRef} not found` };
  }

  return { status: 200, resp: { ...cart, shippingAddress: address } };
};

OrderService.prototype.addPaymentMethod = function(req) {
  let { payment } = req.body;
  if (!payment) {
    return { status: 400, error: 'Invalid payload, must have a payment' };
  }

  let orderRef = req.params['orderRef'];
  let cart = this.carts[orderRef];

  if (!cart) {
    return { status: 404, error: `Order ${orderRef} not found` };
  }

  return { status: 200, resp: { ...cart, paymentMethod: payment } };
};

OrderService.prototype.checkout = function(req) {
  let orderRef = req.params['orderRef'];
  let cart = this.carts[orderRef];

  if (!cart) {
    return { status: 404, error: `Order ${orderRef} not found` };
  }

  delete this.customers[cart.customerId];
  delete this.carts[orderRef];  

  return { status: 200, resp: cart };
};

module.exports = OrderService;
