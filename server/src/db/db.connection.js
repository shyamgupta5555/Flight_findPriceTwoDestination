const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

exports.dbConnection = () => {
  mongoose.Promise = global.Promise;
  mongoose.set("strictQuery", true);
  mongoose.connect(process.env.URL, { useNewUrlParser: true })
    .then(() => {
      console.log("MONGO DB  IS connect");
    })
    .catch((err) => {
      console.log("connection error with mongodb :", err.message);
    });
};
