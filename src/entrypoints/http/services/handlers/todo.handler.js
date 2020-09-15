const { createTodoInteractor } = require("../../../../configuration/usecase");

module.exports.createTodo = async (req, res, next) => {
  const result = await createTodoInteractor(req.body);

  return {
    status: 201,
    data: result,
  };
};
