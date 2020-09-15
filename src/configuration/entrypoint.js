const { httpPort } = require("../../config/env");
const { logger } = require("./infrastructure");

const { HTTPServer } = require("../entrypoints/http/http-server");

HTTPServer(logger, httpPort);
