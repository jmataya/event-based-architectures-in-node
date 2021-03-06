const kafka = require('kafka-node');

function ActivityConsumer() {
  this.handlerMap = {};
}

ActivityConsumer.prototype.addHandler = function(activityType, messageHandler) {
  this.handlerMap = {
    ...this.handlerMap,
    [activityType]: messageHandler
  };
};

ActivityConsumer.prototype.handle = function({ kafkaHost, topic, partition }) {
  let client = new kafka.KafkaClient({ kafkaHost });
  let topics = [{ topic, partition }];
  let consumer = new kafka.Consumer(client, topics);

  consumer.on('message', handleMessage(this.handlerMap));
};

const handleMessage = handlerMap => message => {
  if (message && message.value) {
    let { activityType, payload } = JSON.parse(message.value);
    let handler = handlerMap[activityType];

    if (handler) {
      handler(payload);
    }
  }
};

module.exports = ActivityConsumer;
