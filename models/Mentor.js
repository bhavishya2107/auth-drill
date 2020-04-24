var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var mentorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      match: /@/,
    },
    password: {
      type: String,
      trim: true,
    },
    batch_no: {
      type: Number,
    },
  },
  { timestamps: true }
);

//hash pw
mentorSchema.pre("save", async function (next) {
  if (this.password && this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
  next();
});

//verify pw
mentorSchema.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", mentorSchema);
