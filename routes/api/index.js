var express = require("express");
var router = express.Router();

var studentRouter = require("./students");
var mentorRouter = require("./mentors");
var todoRouter = require("./todos");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("<h1>Challenge-1</h1>");
});

router.use("/students", studentRouter);
router.use("/mentors", mentorRouter);
router.use("/todos", todoRouter);

module.exports = router;
