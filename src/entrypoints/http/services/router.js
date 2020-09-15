const express = require("express");
const handler = require("./handlers/index");

const router = express.Router();

router.post("/api/todos", handler.createTodo);

module.exports = router;
