var express = require("express");
var router = express.Router();
var auth = require("../../modules/auth");
const { createTodo } = require("../../controllers/todo");

//get router test
router.get("/", (req, res) => {
  res.send("Todos");
});

//create Todo
router.post("/addTodo", auth.verifyToken, auth.grantAccess, createTodo);

module.exports = router;
