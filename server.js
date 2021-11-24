//requires
const express = require("express");
require("colours");
const nodemailer = require("nodemailer");
const cookie = require("cookie-parser");
const connectDB = require("./database/connectDB");
require("dotenv").config();
require("express-async-errors");
const path = require("path");
const ejsMate = require("ejs-mate");
const errorHandler = require("./errors/errorHandler");
const auth = require("./routes/auth");
const logger = require("./log/logger");
const { sendCode } = require("./controllers/mailer");

//express initalisation
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());

//ejs config
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", "./views");

//connect to data base
connectDB();

//routes
app.use("/users", auth);
app.get("/", (req, res) => {
  res.render("Home.ejs", { name: "arun" });
});
app.post("/sendmail", sendCode);

//static serving
app.use(express.static(path.join(__dirname, "public")));

//excetions handlers
process.on("uncaughtException", (ex) => {
  logger.info(ex);
});

process.on("unhandledRejection", (ex) => {
  logger.error(ex.message, ex);
});

// error Handler
app.use(errorHandler);

//servers listeners
port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
