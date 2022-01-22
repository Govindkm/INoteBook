const express = require("express");
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
router.post("/", (req, res) => {
  res.json({
    userCreated: "Success",
  });
});

module.exports = router;
