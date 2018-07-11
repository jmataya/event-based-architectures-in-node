const ActivityConsumer = require('./consumer');

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = require('twilio')(accountSid, authToken);

function handleOrderConfirmation(order) {
  let {  orderRef } = order;
  let body = 'Thanks for your order! We\'re packing it up now. ' +
    `If you have any questions, contact support with order number ${orderRef}.`;

  let { phoneNumber } = order.shippingAddress;
  let to = `+1${phoneNumber}`;
  let from = '+16502354586';

  client.messages.create({ body, from, to }).then(message => {
    console.log(`Message ${message.sid} send successfully`);
  }).done();
}

let consumer = new ActivityConsumer();
consumer.addHandler("order_created", handleOrderConfirmation);
consumer.handle({
  kafkaHost: '0.0.0.0:29092',
  topic: 'orders',
  partition: 0
});
