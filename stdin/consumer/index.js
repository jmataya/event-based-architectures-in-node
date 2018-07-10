const kafka = require('kafka-node');

const client = new kafka.KafkaClient({
  kafkaHost: "0.0.0.0:29092",
});

const topics = [{
  topic: 'foo',
  partition: 0
}];

const consumer = new kafka.Consumer(client, topics);

consumer.on('message', ({ value }) => console.log(value));
