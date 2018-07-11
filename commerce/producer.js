const kafka = require('kafka-node');

function ActivityProducer({ kafkaHost, topic }) {
  let client = new kafka.KafkaClient({ kafkaHost });
  this.topic = topic;
  this.producer = new kafka.Producer(client);
}

ActivityProducer.prototype.send = function(activityType, payload) {
  let activity = JSON.stringify({ activityType, payload });
  let messagePayload = [{
    topic: this.topic,
    messages: activity
  }];

  this.producer.send(messagePayload, err => {
    if (err) console.log(err);
  });
};

module.exports = ActivityProducer;

