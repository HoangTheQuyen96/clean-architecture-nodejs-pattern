const { Todo } = require("../../../entities/todo")
const { TODO_COLLECTION_NAME } = require('../../common/constans')

module.exports.listTodo = ( dbProvider ) => async () => {
    const todoColl = dbProvider.mongoReplica.collection(TODO_COLLECTION_NAME);

    const result = await todoColl.find().toArray()

    return result.map(todo => Todo({
        ...todo,
        id: todo._id
    }))
};
