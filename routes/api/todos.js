var express = require("express");
var router = express.Router();
var auth = require("../../modules/auth");
const { createTodo, allTodos } = require("../../controllers/todo");

//create Todo
router.post("/addTodo", auth.verifyToken, auth.grantAccess, createTodo);

router.get("/", allTodos);

module.exports = router;
