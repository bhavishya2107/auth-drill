var express = require("express");
var router = express.Router();
// var auth = require("../../module/methods");
// const { registerUser, loginUser } = require("../../controllers/auth");
// const {
//   getUserByID,
//   updateUser,
//   userPurchaseList,
//   getAllUsers,
// } = require("../../controllers/user");

//get router test
router.get("/", (req, res) => {
  res.send("mentors");
});

module.exports = router;