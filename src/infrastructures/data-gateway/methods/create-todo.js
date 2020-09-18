const { Todo } = require("../../../entities/todo")
const { TODO_COLLECTION_NAME } = require('../../common/constans')

module.exports.createTodo = (dbProvider) => async ({ title, status }) => {
    const todoColl = dbProvider.mongoPrimary.collection(TODO_COLLECTION_NAME);

    const { ops } = await todoColl.insertOne({
        title,
        status,
        deleted: false,
        created_at: Date.now(),
        updated_at: Date.now()
    })

    return Todo({
        ...ops[0],
        id: ops[0]._id
    })
};
