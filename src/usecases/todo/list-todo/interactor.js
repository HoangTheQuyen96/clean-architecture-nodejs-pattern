module.exports.listTodo = (injector) => async () => {
    const dataGateway = injector.infra.dataGateway;

    const todos = await dataGateway.listTodo();

    return todos
};
