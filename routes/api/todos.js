var express = require("express");
var router = express.Router();

//get router test
router.get("/", (req, res) => {
  res.send("todos");
});

module.exports = router;