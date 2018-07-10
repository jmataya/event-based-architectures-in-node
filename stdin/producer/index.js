const kafka = require('kafka-node');
const readline = require('readline');

const client = new kafka.KafkaClient({
  kafkaHost: "0.0.0.0:29092",
});

const producer = new kafka.Producer(client);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

console.log('Enter text to product: ');
rl.on('line', message => {
  const payload = { topic: 'foo', messages: message };
  producer.send([payload], (err, data) => {
    if (err) {
      console.log({ err });
    }

    console.log('Enter text to product: ');
  });
});
