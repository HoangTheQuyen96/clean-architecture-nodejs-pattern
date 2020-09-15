const { dataGateway } = require("./infrastructure");
const { createTodo } = require("../usecases/todo/create-todo/interactor");

module.exports.createTodoInteractor = createTodo({
  infra: {
    dataGateway,
  },
});
