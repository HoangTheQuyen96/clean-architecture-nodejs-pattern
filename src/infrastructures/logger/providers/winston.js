const { createLogger, format, transports } = require("winston");

const { printf } = format;

const customFormat = printf((data) => {
  let logString = "";
  logString = `${data.timestamp}`;
  logString += ` ${data.serviceName || ""}`;
  logString += ` ${data.level}`;
  logString += ` ${data.stack || data.message || ""}`;
  return logString;
});

const config = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
  },
  colors: {
    error: "red",
    warn: "yellow",
    info: "green",
    debug: "blue"
  }
};

module.exports.Winston = (serverName = "", level = "error", traceId = "", jaegerTraceId = "", domainName = "") => {
  return createLogger({
    levels: config.levels,
    defaultMeta: {
      serviceName: serverName,
      traceId,
      domainName,
      jaegerTraceId
    },
    format: format.combine(
      format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss"
      }),
      format.colorize({
        colors: config.colors
      }),
      customFormat,
      format.errors({ stack: true })
    ),
    transports: [new transports.Console({ level })]
  });
};
