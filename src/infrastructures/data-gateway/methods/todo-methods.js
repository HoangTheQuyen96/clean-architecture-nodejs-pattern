const { mongoPrimaryDb } = require("../providers/ mongo-primary-db");
const { todo } = require("../../../entities/todo")
const { TODO_COLLECTION_NAME } = require('../../common/constans')

module.exports.createTodo = async ({ title, status }) => {
  const todoColl = mongoPrimaryDb().collection(TODO_COLLECTION_NAME);

  const { ops } = await todoColl.insertOne({
    title,
    status,
    deleted: false,
    created_at: Date.now(),
    updated_at: Date.now()
  })

  return todo({
    ...ops[0],
    id: ops[0]._id
  })
};
