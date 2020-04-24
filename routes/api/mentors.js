var express = require("express");
var router = express.Router();
var auth = require("../../modules/auth");
const {
  registerMentor,
  loginMentor,
  createTodo,
} = require("../../controllers/mentor");

//get router test
router.get("/", (req, res) => {
  res.send("mentors");
});

//register mentor
router.post("/signup", registerMentor);

//login mentor
router.post("/login", loginMentor);

//create Todo
router.post("/addTodo", auth.verifyToken, createTodo);

module.exports = router;
