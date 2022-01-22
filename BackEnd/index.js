const express = require("express");
const connectToDB = require("./db");
require("dotenv").config();

const app = express();
const port = process.env.EXPRESS_PORT;

connectToDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//To use the body json we need to pass the request through parser
app.use(express.json());

//Api Routes for different end points
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
