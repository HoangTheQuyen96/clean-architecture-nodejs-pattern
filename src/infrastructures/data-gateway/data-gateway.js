// todo methods
const { createTodo } = require("./methods/create-todo");

module.exports = (dbProvider) => ({
  createTodo: createTodo(dbProvider),
});
