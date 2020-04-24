const Mentor = require("../models/Mentor");
const Todo = require("../models/Todo");
var jwt = require("jsonwebtoken");

//signup
exports.registerMentor = async (req, res, next) => {
  try {
    var newMentor = await Mentor.create(req.body);
    res.json({ success: true, newMentor });
  } catch (err) {
    res.status(400).json({
      err: "not able to create a mentor",
    });
  }
};

//login
exports.loginMentor = async (req, res, next) => {
  var { email, password } = req.body;
  try {
    var mentor = await Mentor.findOne({ email });
    if (!mentor) {
      return res.status(400).json({ error: "No mentor with this email" });
    }
    var match = await mentor.verifyPassword(password);
    if (!match) return res.status(401).json({ error: "wrong password" });
    //jwt token auth
    var payload = {
      mentorid: mentor._id,
      email: mentor.email,
      name: mentor.name,
    };
    var token = jwt.sign(payload, process.env.SECRET);
    mentor.token = token;
    res.json({ success: true, token, mentor: payload });
  } catch (error) {
    res.status(400).json({ error: "something went wrong" });
  }
};

//create todo
exports.createTodo = async (req, res) => {
  try {
    if (req.user.isMentor) {
      var todo = await Todo.create(req.body);
      if (!todo) return res.status(400).json({ msg: "todo not created" });
      res.json({ success: true, msg: "todo created successfully" });
    } else {
      res.json({ msg: "you are not mentor to assign a task" });
    }
  } catch (error) {
    res.status(400).json({ error: "something went wrong" });
  }
};
