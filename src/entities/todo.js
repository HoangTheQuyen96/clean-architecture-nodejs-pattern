const { Map } = require("immutable");

const todo = ({ id, status, create_at }) =>
  Map({
    id,
    status,
    create_at: new Date(create_at).toISOString(),
  });

module.exports.todo = todo;
