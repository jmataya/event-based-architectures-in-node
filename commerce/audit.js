const ActivityConsumer = require('./consumer');

const customers = [
  'Jeff Mataya',
  'Adil Wali',
  'Bree Swineford',
  'Jessica Walters',
  'Maxim Khailo',
];

function handleCreateCart(payload) {
  let { customerId, orderRef } = payload;
  let customerName = customers[customerId - 1];

  if (customerName) {
    console.log(`${customerName} created a new cart with reference ${orderRef}`);
  }
}

function handleAddLineItems(payload) {
  let { customerId, orderRef, lineItems } = payload;
  let customerName = customers[customerId - 1];

  for (let i = 0; i < lineItems.length; i++) {
    let { sku, qty } = lineItems[i];
    console.log(`${customerName} added ${qty} units of ${sku} to cart ${orderRef}`);
  }
}

function handleAddShippingAddress(payload) {
  let { customerId, orderRef, shippingAddress } = payload;
  let customerName = customers[customerId - 1];
  let { street1, street2, city, state, postalCode } = shippingAddress;

  console.log(`${customerName} added the address ${street1}, ${street2} ${city}, ${state}, ${postalCode}`);
}

function handleAddPaymentMethod(payload) {
  let { customerId, orderRef, paymentMethod } = payload;
  let customerName = customers[customerId - 1];
  let { cardNumber } = paymentMethod;

  console.log(`${customerName} added credit card ${cardNumber} to cart ${orderRef}`);
}


let consumer = new ActivityConsumer();

consumer.addHandler("create_cart", handleCreateCart);
consumer.addHandler("add_line_items", handleAddLineItems);
consumer.addHandler("add_shipping_address", handleAddShippingAddress);
consumer.addHandler("add_payment_method", handleAddPaymentMethod);

console.log('------------------');
console.log('Audit Log Starting');
console.log('------------------');

consumer.handle({
  kafkaHost: '0.0.0.0:29092',
  topic: 'carts',
  partition: 0
});
