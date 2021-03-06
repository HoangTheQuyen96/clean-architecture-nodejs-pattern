const logger = require("../../src/infrastructures/logger/logger");
const dataGateway = require("../infrastructures/data-gateway/data-gateway");
const mongoDb = require("../../src/infrastructures/data-gateway/providers/ mongo-primary-db");
const { db, kafka } = require("../../config/env");
const kafkaConfig = require("../infrastructures/event-bus/event-bus");

const kafkaHost = kafka.kafkaHost;
const kafkaConnectTimeout = kafka.kafkaConnectTimeout

const eventBus = kafkaConfig({
    kafkaHost,
    kafkaConnectTimeout,
    logger
})

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

module.exports = {
    logger,
    loadSingletons,
    eventBus
}

