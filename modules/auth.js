const jwt = require("jsonwebtoken");
const Mentor = require("../models/Mentor");

module.exports = {
  verifyToken: async (req, res, next) => {
    var token = req.headers["authorization"] || "";
    if (token) {
      try {
        var payload = await jwt.verify(token, process.env.SECRET);
        req.user = payload;
        req.user.token = token;
        next();
        console.log(req.user);
      } catch (error) {
        res.json({ message: "invalid token", error });
      }
    } else {
      res.json({ msg: "Token required" });
    }
  },
  grantAccess: async (req, res, next) => {
    var id = req.user.mentorid;
    var mentor = await Mentor.findById(id);
    if (mentor) {
      req.user.isMentor = true;
    } else {
      req.user.isMentor = false;
    }
    next();
  },
  identification:async(req,res,next) => {
    var id = req.user.mentorid;
    req.user.isStudent = true
    var mentor = await Mentor.findById(id);
    if(mentor){
      req.user.isStudent = true
    }else {
      req.user.isStudent = false
      
    }
  }
};
