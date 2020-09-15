const { mongoPrimaryDb } = require("../providers/ mongo-primary-db");
const {todo} = require("../../../entities/todo")

module.exports.createTodo = async ({ title, status }) => {
  const todoColl = mongoPrimaryDb().collection(CONSTANTS.SALON_COLLECTION_NAME);

  const {ops} = await todoColl.insertOne({
    title,
    status,
    deleted: false,
    created_at: Date.now(),
    updated_at: Date.now()
  })

  return todo(ops[0])
};
