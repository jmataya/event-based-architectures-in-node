// const Consumer = require('./consumer');

// var c = new Consumer();
// c.addHandler("create_cart", payload => console.log({ payload }));
// c.handle({
//   kafkaHost: '0.0.0.0:29092',
//   topic: 'foo',
//   partition: 0,
// });

require('./http')(21337);
