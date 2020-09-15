module.exports.createTodo = (injector) => async (payload) => {
  const dataGateway = injector.infra.dataGateway;

  const todo = await dataGateway.createTodo(payload);

  return {
    data: todo,
  };
};
