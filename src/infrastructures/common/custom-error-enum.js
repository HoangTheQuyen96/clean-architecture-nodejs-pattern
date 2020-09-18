const grpc = require("grpc");

// internal error have code: 1000 [DATA_GATEWAY_ERROR, INTERNAL_ERROR]
module.exports = {
  // General errors
  INVALID_PARAMETER: {
    errorType: "INVALID_REQUEST_ERROR",
    errorCode: "INVALID_PARAMETER",
    code: 5000,
    httpCode: 422,
    grpcCode: grpc.status.INVALID_ARGUMENT,
  },

  UNAUTHORIZATION: {
    errorType: "AUTHENTICATION_ERROR",
    errorCode: "UNAUTHORIZATION",
    code: 4000,
    httpCode: 401,
    grpcCode: grpc.status.UNAUTHENTICATED,

  },

  PERMISSION_DENIED: {
    errorType: "AUTHENTICATION_ERROR",
    errorCode: "PERMISSION_DENIED",
    code: 4001,
    httpCode: 403,
    grpcCode: grpc.status.PERMISSION_DENIED,
  },

  RESOURCE_NOT_FOUND: {
    errorType: "INVALID_REQUEST_ERROR",
    errorCode: "RESOURCE_NOT_FOUND",
    code: 2000,
    httpCode: 404,
    grpcCode: grpc.status.NOT_FOUND,
  },

  UNSUPPORTED_MEDIA_TYPE: {
    errorType: "INVALID_REQUEST_ERROR",
    errorCode: "UNSUPPORTED_MEDIA_TYPE",
    code: 3000,
    httpCode: 415
  },

  // Infrastructure errors
  DATA_GATEWAY_ERROR: {
    errorType: "API_ERROR",
    errorCode: "DATA_GATEWAY_ERROR",
    code: 1001,
    httpCode: 500
  },

  INTERNAL_ERROR: {
    errorType: "API_ERROR",
    errorCode: "INTERNAL_ERROR",
    code: 1000,
    httpCode: 500,
    grpcCode: grpc.status.INTERNAL,
  }
};



