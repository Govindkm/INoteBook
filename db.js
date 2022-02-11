const mongoose = require("mongoose");
const logger = require("./logger/logger");
require("dotenv").config();
const dbURI = `${process.env.DB_HOST}${process.env.DB_NAME}?readPreference=primary&appname=MongoDB%20Compass&ssl=false`;

const connectToDB = () => {
  console.log(dbURI);
  mongoose
    .connect(dbURI)
    .then(() => {
      logger.info("Successfully Connected to Database.");
    })
    .catch((error) => {
      logger.error(`Database connection failed!!! ${error}`);
      process.exit(1);
    });
};

module.exports = connectToDB;
