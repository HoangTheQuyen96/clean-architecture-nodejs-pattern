const Kafka = require("node-rdkafka");
const logger = require("../../src/infrastructures/logger/logger");
const dataGateway = require("../infrastructures/data-gateway/data-gateway");
const mongoDb = require("../../src/infrastructures/data-gateway/providers/ mongo-primary-db");
const { db, kafka } = require("../../config/env");
const { EventBus } = require("../infrastructures/event-bus/event-bus");

const kafkaHost = kafka.kafkaHost;
const kafkaConnectTimeout = kafka.kafkaConnectTimeout

const kafkaTopics = kafka.kafkaTopics

let kafkaProducer;
/**
 * Init kafka producer for EventBus
 */

(() => {
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
})();

const loadSingletons = async () => {
    try {
        const mongoPrimary = await mongoDb.connect(db.mongo.mongoPrimaryURI);
        const mongoReplica = await mongoDb.connect(db.mongo.mongoReplicaURI);
        logger.info(`[MONGO PRIMARY] connected to: ${db.mongo.mongoPrimaryURI}`);
        logger.info(`[MONGO REPLICATE] connected to: ${db.mongo.mongoReplicaURI}`);
        module.exports.dataGateway = dataGateway({
            mongoPrimary,
            mongoReplica
        });
    } catch (error) {
        logger.error(`[MONGO] connected failure ${JSON.stringify(error.stack)}`)
        process.kill(process.pid);
        process.exit(1);
    }
}

const eventBus = class extends EventBus {
    constructor() {
        super({
            kafkaHost,
            kafkaProducer,
            kafkaTopics,
            infra: {
                logger
            },
        });
    }
};

module.exports = {
    logger,
    loadSingletons,
    eventBus
}

