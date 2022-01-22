const express = require("express");
const { body, validationResult } = require("express-validator");
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

//1. Create a user using POST request
router.post(
  "/",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("userName", "Enter a valid user name").isLength({ min: 3 }),
    body("email", "Enter a valid email id").isEmail(),
    body("password", "Password must be 5 characters").isLength({ min: 5 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
      name: req.body.name,
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
      dob: req.body.dob,
    })
      .then((user) => res.json(user))
      .catch((error) => {
        logger.error(`${error}`);
        res.json({ error: "Error occured while creating user." });
      });
  }
);

module.exports = router;
