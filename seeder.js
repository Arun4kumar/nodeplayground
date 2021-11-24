const users = require("./users");
const User = require("./models/User");
const connectDB = require("./database/connectDB");

connectDB();
const seed = async () => {
  await User.deleteMany({});
  console.log("destroyed data");

  for (let user of users) {
    const userNew = new User(user);
    await userNew.save();
  }

  console.log("inserted Data");
  process.exit(0);
};

seed();
