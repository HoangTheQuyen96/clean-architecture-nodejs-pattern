const Todo = ({ id, status, title, created_at }) => {
  return Object.freeze({
    id,
    title,
    status,
    created_at: new Date(created_at).toISOString(),
  });
}


module.exports.Todo = Todo;
