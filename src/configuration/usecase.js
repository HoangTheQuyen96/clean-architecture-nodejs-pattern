const { dataGateway } = require("./infrastructure");
const { createTodo } = require("../usecases/todo/create-todo/interactor");
const { listTodo } = require('../usecases/todo/list-todo/interactor')

module.exports.createTodoInteractor = createTodo({
  infra: {
    dataGateway,
  },
});

module.exports.listTodoInteractor = listTodo({
  infra: {
    dataGateway,
  },
});
