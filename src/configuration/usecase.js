const { dataGateway, eventBus } = require("./infrastructure");
const { createTodo } = require("../usecases/todo/create-todo/interactor");
const { listTodo } = require('../usecases/todo/list-todo/interactor')

module.exports.createTodoInteractor = createTodo({
  infra: {
    dataGateway,
    eventBus: new eventBus()
  },
});

module.exports.listTodoInteractor = listTodo({
  infra: {
    dataGateway,
  },
});
