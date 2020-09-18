const { listTodoInteractor } = require('../../../../../configuration/usecase')

module.exports.listTodoHandler = async (call) => {
    const result = await listTodoInteractor();

    return { data: result };
}