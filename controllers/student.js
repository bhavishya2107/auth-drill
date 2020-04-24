const Student = require("../models/Student");
var jwt = require("jsonwebtoken");

//signup
exports.registerStudent = async (req, res, next) => {
  try {
    var newStudent = await Student.create(req.body);
    res.json({ success: true, newStudent });
  } catch (err) {
    res.status(400).json({
      err: "not able to create a student",
    });
  }
};

//login
exports.loginStudent = async (req, res, next) => {
  var { email, password } = req.body;
  try {
    var student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ error: "No student with this email" });
    }
    var match = await student.verifyPassword(password);
    if (!match) return res.status(401).json({ error: "wrong password" });
    //jwt token auth
    var payload = {
      studentid: student._id,
      email: student.email,
      name: student.name,
      batch: student.batch,
    };
    var token = jwt.sign(payload, process.env.SECRET);
    student.token = token;
    res.json({ success: true, token, student: payload });
  } catch (error) {
    res.status(400).json({ error: "something went wrong" });
  }
};
