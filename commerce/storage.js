const ActivityConsumer = require('./consumer');
const ActivityProducer = require('./producer');

let carts = {};
let orders = {};
let producer = new ActivityProducer({
  kafkaHost: '0.0.0.0:29092',
  topic: 'orders'
});

function handleUpdateCart(payload) {
  let { orderRef } = payload;
  let existingCart = carts[orderRef];
  let cart = existingCart
    ? { ...existingCart, ...payload }
    : payload;

  carts[orderRef] = cart;
  console.log('-------------------------');
  console.log(cart);
};

function handleCheckout(payload) {
  let { orderRef } = payload;
  let order = carts[orderRef];
  delete carts[orderRef];
  orders[orderRef] = order;

  producer.send('order_created', order);
}

let consumer = new ActivityConsumer();

consumer.addHandler("create_cart", handleUpdateCart);
consumer.addHandler("add_line_items", handleUpdateCart);
consumer.addHandler("add_shipping_address", handleUpdateCart);
consumer.addHandler("add_payment_method", handleUpdateCart);
consumer.addHandler("checkout", handleCheckout);

console.log('------------------');
console.log('Storage Consumer Starting');
console.log('------------------');

consumer.handle({
  kafkaHost: '0.0.0.0:29092',
  topic: 'carts',
  partition: 0
});
