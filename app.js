var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var mongoose = require("mongoose");
var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");
var apiRouter = require("./routes/api/index");

require("dotenv").config();

mongoose.connect(
  'mongodb://localhost/authDB',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  },
  (err) => {
    console.log("Connected", err ? false : true);
  }
);

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
// app.use("/users", usersRouter);
app.use("/api", apiRouter);

module.exports = app;
