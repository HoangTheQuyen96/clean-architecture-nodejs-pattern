const grpc = require('grpc')

module.exports.wrap = fn => async (call, callback) => {
    try {
        const result = await fn(call, callback)

        callback(null, result)
    } catch (error) {
        console.log(error)
        if (!error.expose) {
            return callback({
                code: grpc.status.INTERNAL,
                type: "API_ERROR",
                message: 'unexpected error'
            }, null)
        }
        else {
            return callback({
                code: error.grpcCode,
                type: error.detail.errorType,
                message: error.message
            })
        }
    }
}