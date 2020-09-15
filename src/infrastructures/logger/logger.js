const { Winston } = require("./providers/winston");

let winston;
const setTraceId = (traceId = "", jaegerTraceId = "", domainName = "") => {
  winston = Winston("controller's system", "info", traceId, jaegerTraceId, domainName);
};

const info = (data) => {
  if (!winston) setTraceId();
  winston.info(data);
};

const warn = (data) => {
  if (!winston) setTraceId();
  winston.warn(data);
};

const error = (data) => {
  if (!winston) setTraceId();
  winston.error(data);
};

const debug = (data) => {
  if (!winston) setTraceId();
  winston.debug(data);
};

module.exports = {
  info,
  warn,
  error,
  debug
};
