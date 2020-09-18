const { listTodoInteractor } = require("../../../../configuration/usecase");
const { createTodoInteractor } = require('../../../../configuration/usecase')

module.exports.createTodoHandler = async (req) => {
  const result = await createTodoInteractor(req.body);

  return {
    status: 201,
    data: result,
  };
};

module.exports.listTodoHandler = async () => {
  const result = await listTodoInteractor();

  return {
    status: 200,
    data: {
      data: result
    },
  };
}