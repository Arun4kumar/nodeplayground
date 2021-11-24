const User = require("../models/User");
require("mongoose");
const router = require("express").Router();
const { register, login } = require("../controllers/auth");
const asyncErrorsHandler = require("../errors/asyncErrorsHandler");

router
  .route("/register")
  .post(asyncErrorsHandler(register))
  .get((req, res) => {
    res.render("Pages/Register");
  });
router
  .route("/login")
  .post(asyncErrorsHandler(login))
  .get((req, res) => {
    res.render("Pages/Login");
  });

module.exports = router;
