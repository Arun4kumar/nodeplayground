const Error = require("../errors/CustomError");
require("express-async-errors");
const User = require("../models/User");

const {
  userRegisterValidator,
  userLoginValidator,
} = require("../validateor/validators");

module.exports.register = async (req, res, next) => {
  const { error } = userRegisterValidator(req.body);
  if (error) {
    throw new Error(error.details[0].message, 400);
  }
  const user = await User.create(req.body);
  sendCookie(res, 200, user);
};

module.exports.login = async (req, res, next) => {
  const { error } = userLoginValidator(req.body);

  console.log(req.body);
  if (error) {
    throw new Error(error.details[0].message, 400);
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or Password", 401);
  }

  await user.matchPassword(password);

  sendCookie(res, 200, user);
};

const sendCookie = (res, statusCode, user) => {
  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  const token = user.getjsonwebtoken();
  res
    .status(statusCode)
    .cookie("token", token, options)
    .header({ "x-auth-token": token })
    .send("you are in");
};
