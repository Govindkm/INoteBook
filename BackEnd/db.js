const mongoose = require("mongoose");
const dbURI = `mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false`;

const connectToDB = () => {
  mongoose.connect(dbURI, () => {
    console.log("Connected to Database!!!");
  });
};

module.exports = connectToDB;
