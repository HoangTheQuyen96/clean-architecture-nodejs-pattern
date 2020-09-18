const path = require("path");

const { createTodoHandler } = require('./handlers/create-todo-handler')

const { loadProto } = require("../../common/load-proto");
const { buildSchema } = require("../../common/build-schema");

const todoProtoFile = path.join(__dirname, "../..", "protos/quyen/todo/todo.proto");
const externalProtoDirs = [path.join(__dirname, "../..", "protos/quyen")];
const proto = loadProto(todoProtoFile, externalProtoDirs);
const { service } = proto.quyen.todo.TodoService;

module.exports.todoService = {
    service,
    schema: buildSchema([todoProtoFile], service),
    handlers: {
        CreateTodo: createTodoHandler
    }
}