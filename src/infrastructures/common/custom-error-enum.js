module.exports = {
  // General errors
  INVALID_PARAMETER: {
    errorType: "INVALID_REQUEST_ERROR",
    errorCode: "INVALID_PARAMETER",
    httpCode: 422
  },

  UNAUTHORIZATION: {
    errorType: "AUTHENTICATION_ERROR",
    errorCode: "UNAUTHORIZATION",
    httpCode: 401
  },

  PERMISSION_DENIED: {
    errorType: "AUTHENTICATION_ERROR",
    errorCode: "PERMISSION_DENIED",
    httpCode: 403
  },

  RESOURCE_NOT_FOUND: {
    errorType: "INVALID_REQUEST_ERROR",
    errorCode: "RESOURCE_NOT_FOUND",
    httpCode: 404
  },

  UNSUPPORTED_MEDIA_TYPE: {
    errorType: "INVALID_REQUEST_ERROR",
    errorCode: "UNSUPPORTED_MEDIA_TYPE",
    httpCode: 415
  },

  // Infrastructure errors
  DATA_GATEWAY_ERROR: {
    errorType: "API_ERROR",
    errorCode: "DATA_GATEWAY_ERROR",
    httpCode: 500
  },

  INTERNAL_ERROR: {
    errorType: "API_ERROR",
    errorCode: "INTERNAL_ERROR",
    httpCode: 500
  }

};
