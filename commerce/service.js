function OrderService() {}

function getCart(carts, refNum) {
  if (!carts || !carts[refNum]) {
    return { error: `Order ${refNum} not found` };
  } else {
    return { cart: carts[refNum] }
  };
}

OrderService.prototype.createCart = req => {
  let { customerId } = req.body;
  if (!customerId) {
    return { status: 400, error: 'Invalid payload, customerId is required' };
  }

  if (this.customers && this.customers[customerId]) {
    return { status: 400, error: `Customer ${customerId} already has cart` };
  }

  if (!this.carts) this.carts = {};
  if (!this.customers) this.customers = {};
  if (!this.numOrders) this.numOrders = 0;

  let orderRef = `BR1000${this.numOrders}`;
  this.numOrders += 1;

  let cart = { customerId, orderRef };
  this.carts[orderRef] = cart;
  this.customers['customerId'] = orderRef;

  return { status: 201, resp: cart };
};

OrderService.prototype.addLineItems = req => {
  let { lineItems } = req.body;
  if (!lineItems || lineItems.length == 0) {
    return { status: 400, error: 'Invalid payload, must have line items' };
  }

  let orderRef = req.params['orderRef'];
  let { cart, error } = getCart(this.carts, orderRef);
  if (!cart) {
    return { status: 404, error };
  }

  let newCart = { ...cart, lineItems };
  this.carts[orderRef] = newCart;

  return { status: 200, resp: newCart };
};

OrderService.prototype.addShippingAddress = req => {
  let { address } = req.body;
  if (!address) {
    return { status: 400, error: 'Invalid payload, must have an address' };
  }

  let orderRef = req.params['orderRef'];
  let { cart, error } = getCart(this.carts, orderRef);
  if (!cart) {
    return { status: 404, error };
  }

  let newCart = { ...cart, shippingAddress: address };
  this.carts[orderRef] = newCart;

  return { status: 200, resp: newCart };
};

OrderService.prototype.addPaymentMethod = req => {
  let { payment } = req.body;
  if (!payment) {
    return { status: 400, error: 'Invalid payload, must have a payment' };
  }

  let orderRef = req.params['orderRef'];
  let { cart, error } = getCart(this.carts, orderRef);
  if (!cart) {
    return { status: 404, error };
  }

  let newCart = { ...cart, paymentMethod: payment };
  this.carts[orderRef] = newCart;

  return { status: 200, resp: newCart };
};

module.exports = OrderService;
