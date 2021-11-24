const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: { type: String, required: [true, "Password is required"] },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (data) {
  return await bcrypt.compare(this.password, data);
};

userSchema.methods.getjsonwebtoken = () => {
  return jwt.sign({ id: this._id }, process.env.SECRET, {
    expiresIn: process.env.EXPIRE,
  });
};

module.exports = mongoose.model("users", userSchema);
