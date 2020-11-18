const jwt = require("jsonwebtoken");
const config = require("../config/config.json");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access Denied, no token provided");
  try {
    const decoded = jwt.verify(token, config.secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("invalid token");
  }
};
