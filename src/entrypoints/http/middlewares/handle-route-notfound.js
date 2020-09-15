const customError = require("../../../infrastructures/common/custom-error");
const customErrorEnum = require("../../../infrastructures/common/custom-error-enum");

module.exports = async (req, res, next) => {
  await next(customError(customErrorEnum.RESOURCE_NOT_FOUND, "resource not found"));
};
