const Ajv = require("ajv");
const customError = require("../../../infrastructures/common/custom-error");
const customErrorEnum = require("../../../infrastructures/common/custom-error-enum");

const validator = (schema) => async (req, res, next) => {
  const ajv = new Ajv({
    removeAdditional: true,
    useDefaults: true,
    coerceTypes: true,
    allErrors: true,
    verbose: true,
    errorDataPath: "property"
  });

  const valid = ajv
    .addSchema(schema, "bodySchema")
    .validate("bodySchema", req.body);

  if (!valid) {
    await next(customError(customErrorEnum.INVALID_PARAMETER, "invalid parameters", {
      errors: ajv.errors.map((err) => ({
        code: 422,
        property: err.dataPath.slice(1),
        message: `${err.dataPath.slice(1)} ${err.message}`,
        type: err.keyword
      }))
    }));
    return;
  }

  await next();
};

module.exports = validator;
