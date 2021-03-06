const express = require("express");
const { body, validationResult } = require("express-validator");
require("dotenv").config();
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const User = require("../Models/User");
const logger = require("../logger/logger");
const jwtInterceptor = require("../middlewares/jwt.interceptor");

const router = express.Router();

//Authentication operations to be written here
/*
1. Register user(create new user)
2. Authenticate(login user)
3. Get User Details
4. Delete existing user
5. Update existing user details
*/

const createJWTToken = (id) => {
  return jwt.sign({ id: id }, process.env.SECRET, { expiresIn: "1d" });
};

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
      const user = await User.findOne({ userName: req.body.userName });
      if (user) {
        throw Error("Duplicate entry is not allowed");
        return res
          .status(400)
          .json({ error: "Duplicate entry is not allowed" });
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
        const authToken = createJWTToken(user._id);
        return res.json({ authToken });
      });
    } catch (err) {
      logger.error(err.message);
      return res.status(500).json({ error: "internal server error" });
    }
  }
);

//2. Authenticate(login user)
router.post(
  "/login",
  [
    body("userName", "Enter a valid userName").isLength({ min: 5 }),
    body("password", "Password cannot be blank").isLength({ min: 5 }),
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
      const user = await User.findOne({ userName: req.body.userName });
      if (!user) {
        logger.error(`Username not found.`);
        return res
          .status(400)
          .json({ error: "Please try with valid credentials." });
      }
      const { password } = req.body;
      const isAuthenticated = await bcrypt.compare(password, user.password);
      if (isAuthenticated) {
        const authToken = createJWTToken(user._id);
        res.json({ authToken });
      } else {
        res.status(403).json("User Authentication failed");
        logger.error("User Authentication failed");
      }
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "internal server error" });
    }
  }
);

//3. Get User Details
router.post("/get-user-details", jwtInterceptor, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId }).select("-password");
    res.json(user);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "internal server error" });
  }
});

//4. Delete existing user
router.post(
  "/delete",
  [body("authToken", "Cannot perform the specified task").exists()],
  async (req, res) => {
    //validate the express validations (server-side validations)
    const errors = validationResult(req);

    //if there are error log it into the log files as well as send a bad request;
    if (!errors.isEmpty()) {
      logger.error("Validation failed. Please check the validators.");
      return res.status(400).json({ errors: errors.array() });
    }
  }
);

module.exports = router;
