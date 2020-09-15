const logger = require("../../../infrastructures/logger/logger");

module.exports = async (error, req, res, next) => {
  logger.error(JSON.stringify(error.stack));
  if (!error.expose) {
    res.status(500).json({
      message: "unexpected error",
      error: "API_ERROR"
    });
  } else {
    res.status(error.detail.httpCode).json({
      message: error.message,
      error: error.detail.errorType,
      data: error.data || []
    });
  }
};
