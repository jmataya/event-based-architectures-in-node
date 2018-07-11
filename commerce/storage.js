const ActivityConsumer = require('./consumer');

let carts = {};

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

let consumer = new ActivityConsumer();

consumer.addHandler("create_cart", handleUpdateCart);
consumer.addHandler("add_line_items", handleUpdateCart);
consumer.addHandler("add_shipping_address", handleUpdateCart);
consumer.addHandler("add_payment_method", handleUpdateCart);
consumer.addHandler("checkout", handleUpdateCart);

console.log('------------------');
console.log('Storage Consumer Starting');
console.log('------------------');

consumer.handle({
  kafkaHost: '0.0.0.0:29092',
  topic: 'carts',
  partition: 0
});
