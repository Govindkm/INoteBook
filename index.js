const express = require("express");
// const { auth } = require("express-openid-connect");
const connectToDB = require("./db");
require("dotenv").config();

const app = express();
const port = process.env.EXPRESS_PORT || 3000;

// Auth0 authentication is paid and use it later after using bycrptjs

// app.use(
//   auth({
//     issuerBaseURL: process.env.ISSUER_BASE_URL,
//     baseURL: process.env.BASE_URL,
//     clientID: process.env.CLIENT_ID,
//     secret: process.env.SECRET,
//   })
// );

connectToDB();

//To use the body json we need to pass the request through json parser
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Api Routes for different end points
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
