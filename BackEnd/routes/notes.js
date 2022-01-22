const express = require("express");
const router = express.Router();

//Notes operations to be written here
/*
1. Create a new note
2. Read existing note
3. Update existing note
4. Delete existing note
*/

router.get("/", (req, res) => {
  res.send(`<h1>This is the notes page!</h1>`);
});

module.exports = router;
