module.exports.createTodo = (injector) => async (payload) => {
  const dataGateway = injector.infra.dataGateway;
  const eventBus = injector.infra.eventBus

  const todo = await dataGateway.createTodo(payload);
  await eventBus.emit('todo_topic', todo)
  
  return todo
};
