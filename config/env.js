require('dotenv').config();

module.exports = {
  httpPort: process.env.ENTRYPOINT_HTTP_PORT,
  grpcPort: process.env.ENTRYPOINT_GRPC_PORT,
  db: {
    mongo: {
      mongoPrimaryURI: process.env.MONGO_PRIMARY_URI,
      mongoReplicaURI: process.env.MONGO_REPLICA_URI
    },
  },
  kafka: {
    kafkaHost: process.env.KAFKA_HOST,
    kafkaConnectTimeout: Number.parseFloat(process.env.KAFKA_CONNECT_TIMEOUT) || 10000,
    kafkaTopics: {
      [process.env.TODO_TOPIC]: process.env.TODO_TOPIC
    }
  }
};
