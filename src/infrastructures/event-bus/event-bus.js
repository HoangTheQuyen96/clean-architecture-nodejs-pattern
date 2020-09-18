const Kafka = require("node-rdkafka");

module.exports = ({ kafkaHost, kafkaConnectTimeout, logger }) => {
  kafkaProducer = new Kafka.Producer({
    "metadata.broker.list": kafkaHost,
    "retry.backoff.ms": 20,
    'queue.buffering.max.messages': 10000000,
    "socket.keepalive.enable": true,
  });

  kafkaProducer.connect({ timeout: kafkaConnectTimeout }, (err) => {
    if (err) {
      logger.error("Cannot connect to Kafka", err);
      process.kill(process.pid);
      process.exit(1)
    }
  });

  kafkaProducer.on("event.error", (err) => {
    logger.error(err);
  });
  kafkaProducer.setPollInterval(5000);
  kafkaProducer.on("ready", () => {
    logger.info("[KAFKA PRODUCER] is ready");
  });

  return {
    emit: (topic, payload) => kafkaProducer.produce(topic, null, Buffer.from(JSON.stringify(payload), null, +new Date()))
  }
}
