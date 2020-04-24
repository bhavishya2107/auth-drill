var express = require("express");
var router = express.Router();
const auth = require("../../modules/auth");
const Student = require("../../models/Student");
const Mentor = require("../../models/Mentor");

var studentRouter = require("./students");
var mentorRouter = require("./mentors");
var todoRouter = require("./todos");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("<h1>Challenge-1</h1>");
});

//get current user
router.get("/current", auth.verifyToken, async (req, res) => {
  var user = req.user.id;
  try {
    var currentUser = await Mentor.findById(user)
    if (!currentUser) {
      return res.json({ msg: "Invalid userId" });
    }
    res.json({ success: true, currentUser });
  } catch (error) {
    res.status(400).json({ msg: "user not found", error });
  }
});

router.use("/students", studentRouter);
router.use("/mentors", mentorRouter);
router.use("/todos", todoRouter);

module.exports = router;
