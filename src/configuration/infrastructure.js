const logger = require("../../src/infrastructures/logger/logger");
const dataGateway = require("../infrastructures/data-gateway/data-gateway");
const mongoPrimaryDb = require("../../src/infrastructures/data-gateway/providers/ mongo-primary-db");
const { db } = require("../../config/env");

module.exports.loadSingletons = async () => {
    await mongoPrimaryDb.connect(db.mongo.mongoPrimaryURI, { logger: console });
};

module.exports.logger = logger;
module.exports.dataGateway = dataGateway;
