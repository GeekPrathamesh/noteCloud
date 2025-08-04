const mongoose = require("mongoose");
const databaseURL = "mongodb://localhost:27017/";

const connectTomongo = async()=>{
  try {
      await mongoose.connect(databaseURL);
      console.log("connected to DB");

  } catch (error) {
    console.log("not able to connect the database")
  }
}

module.exports = connectTomongo;

































// //mongoose is used to connect to remote or local database

// const mongoose = require("mongoose");

// const dbString = "mongodb://localhost:27017/";

// const connectTomongo = async () => {
//   try {
//     await mongoose.connect(dbString, {});

//     console.log("connected to database..");
//   } catch (error) {
//     console.log("mongodb connection error", error);
//   }
// };

// module.exports = connectTomongo;
