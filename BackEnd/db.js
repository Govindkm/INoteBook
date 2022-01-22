const mongoose = require("mongoose");
require("dotenv").config();
const dbURI = `${process.env.DB_HOST}${process.env.DB_NAME}?readPreference=primary&appname=MongoDB%20Compass&ssl=false`;

const connectToDB = () => {
  console.log(dbURI);
  mongoose.connect(dbURI, () => {
    console.log("Connected to Database!!!");
  });
};

module.exports = connectToDB;
