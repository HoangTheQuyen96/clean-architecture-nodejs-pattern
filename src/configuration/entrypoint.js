const { httpPort, grpcPort } = require("../../config/env");
const { logger } = require("./infrastructure");

const { HTTPServer } = require("../entrypoints/http/http-server");
const { GRPCServer } = require('../entrypoints/grpc/grpc-server')

HTTPServer(logger, httpPort);
GRPCServer(logger, grpcPort)