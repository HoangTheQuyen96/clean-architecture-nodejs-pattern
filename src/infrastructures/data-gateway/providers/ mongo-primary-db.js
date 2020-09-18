const { MongoClient } = require("mongodb");

module.exports.connect = async (mongoUri) => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };
    const client = await MongoClient.connect(mongoUri, options)
    return client.db();
  } catch (error) {
    throw error
  }
}
