const express = require("express");
const { body, validationResult } = require("express-validator");
require("dotenv").config();
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const User = require("../Models/User");
const logger = require("../logger/logger");

const router = express.Router();

//Authentication operations to be written here
/*
1. Register user(create new user)
2. Authenticate(login user)
3. Delete existing user
4. Update existing user details
*/

router.get("/", (req, res) => {
  console.log(req.body);
  res.send(`<h1>This is the auth page!</h1>`);
});

//1. Create a user using POST request, does not require any authentication for now
router.post(
  "/create-user",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("userName", "Enter a valid user name").isLength({ min: 3 }),
    body("email", "Enter a valid email id").isEmail(),
    body("password", "Password must be 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //validate the express validations (server-side validations)
    const errors = validationResult(req);

    //if there are error log it into the log files as well as send a bad request;
    if (!errors.isEmpty()) {
      logger.error("Validation failed. Please check the validators.");
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ userName: req.body.userName });
      if (user) {
        res.status(400).json({ error: "Duplicate entry is not allowed" });
        throw Error("Duplicate entry is not allowed");
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      await User.create({
        name: req.body.name,
        userName: req.body.userName,
        email: req.body.email,
        password: hashPassword,
        gender: req.body.gender,
        dob: req.body.dob,
      }).then((user) => {
        const authToken = jwt.sign({ id: user._id }, process.env.SECRET);
        res.json({ authToken });
      });
    } catch (err) {
      logger.error(err.message);
    }
  }
);

//2. Authenticate(login user)
router.post("/login", async (req, res) => {});

module.exports = router;
