const { createTodoInteractor } = require('../../../../../configuration/usecase')

module.exports.createTodoHandler = async (call) => {
    const result = await createTodoInteractor(call.request);

    return {
        data: result
    }
}