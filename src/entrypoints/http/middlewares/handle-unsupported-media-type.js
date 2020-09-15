const customError = require("../../../infrastructures/common/custom-error");
const customErrorEnum = require("../../../infrastructures/common/custom-error-enum");

module.exports = async (req, res, next) => {
  if (
    req.method !== "GET" &&
    req.method !== "DELETE" &&
    !/application\/json/.test(req.headers["content-type"])
  ) {
    await next(
      customError(
        customErrorEnum.UNSUPPORTED_MEDIA_TYPE,
        "unsupported media type"
      )
    );
  } else {
    await next();
  }
};
