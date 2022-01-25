var jwt = require("jsonwebtoken");
const logger = require("../logger/logger");
require("dotenv").config();
//This method will intercept the various request for authtoken
async function jwtInterceptor(req, res, next) {
  const token = req.header("auth-token");
  if (!token) {
    logger.error(`Unauthorized access. Auth-token missing in request.`);
    res.status(401).json(`Please authenticate with valid token.`);
  }
  try {
    console.log(jwt.decode(token, process.env.SECRET));
    const data = jwt.verify(token, process.env.SECRET);
    req.userId = data.id;
    next();
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
}

module.exports = jwtInterceptor;
