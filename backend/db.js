require("dotenv").config();

const mongoose = require("mongoose");
const databaseURL = process.env.MONGODB_URI;

const connectTomongo = async () => {
  try {
    await mongoose.connect(databaseURL);
    console.log("connected to DB");
  } catch (error) {
    console.error("Not able to connect the database:", error);
  }
};

module.exports = connectTomongo;
