const express = require("express");
const handlers = require("./handlers/index");

const router = express.Router();

router.post("/api/todos", handlers.CreateTodo);
router.get('/api/todos', handlers.ListTodo)

module.exports = router;
