const logger = require("../../../infrastructures/logger/logger");

module.exports = async (error, req, res, next) => {
  logger.error(JSON.stringify(error.stack));
  if (!error.expose) {
    res.status(500).json({
      errors: [
        {
          code: 1000,
          type: "API_ERROR",
          message: "unexpected error",
        }
      ]
    });
  } else {
    res.status(error.detail.httpCode).json({
      errors: [
        {
          code: error.detail.code,
          type: error.detail.errorType,
          message: error.message,
        }
      ],
    });
  }
};


const a = {
  message: 'error',

}