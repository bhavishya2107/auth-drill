var express = require("express");
var router = express.Router();
// var auth = require("../../module/methods");
const { registerStudent, loginStudent } = require("../../controllers/student");


//register mentor
router.post("/signup", registerStudent);

//login mentor
router.post("/login", loginStudent);

module.exports = router;
