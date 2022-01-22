const express = require("express");
const connectToDB = require("./db");
const app = express();
const port = 3000;

connectToDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
