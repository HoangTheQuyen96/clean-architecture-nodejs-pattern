

const todo = ({ id, status, title, created_at }) =>
  Object.freeze({
    id,
    title,
    status,
    create_at: new Date(created_at).toISOString(),
  });



module.exports.todo = todo;
