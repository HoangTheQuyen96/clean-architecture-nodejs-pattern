const { MongoClient } = require("mongodb");

const state = {
  db: null,
  client: null,
};

const connect = (mongoUrl, { logger = console }) =>
  new Promise((resolve, reject) => {
    if (state.db) resolve(state.db);
    return MongoClient.connect(
      mongoUrl,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err, client) => {
        if (err) {
          logger.error("[MONGO] connected failure");
          reject(err);
        }
        // set connection to state.connection
        state.db = client.db();
        state.client = client;
        logger.info(`[MONGO] connected to: ${mongoUrl}`);
        resolve(state.client);
      }
    );
  });

const mongoPrimaryDb = () => state.db;
const mongoClientPrimary = () => state.client;

module.exports = {
  mongoPrimaryDb,
  mongoClientPrimary,
  connect,
};
