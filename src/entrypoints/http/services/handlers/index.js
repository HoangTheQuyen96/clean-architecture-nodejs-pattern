const todoHandlers = require("./todo.handler");

const wrap = (fn) => async (req, res, next) => {
  try {
    const result = await fn(req, res, next);
    res.status(result.status).json(result.data);
  } catch (error) {
    await next(error);
  }
};

module.exports = {
  CreateTodo: wrap(todoHandlers.createTodoHandler),
  ListTodo: wrap(todoHandlers.listTodoHandler)
};
