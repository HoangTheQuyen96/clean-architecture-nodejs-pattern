// todo methods
const { createTodo } = require("./methods/create-todo");
const { listTodo } = require('./methods/list-todo')

module.exports = (dbProvider) => ({
  createTodo: createTodo(dbProvider),
  listTodo: listTodo(dbProvider),
});
