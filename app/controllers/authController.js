const jwt = require("jsonwebtoken");
require("dotenv").config();

const createJWT = (req, res) => {
  const user = req.body;
  console.log("got jwt user", user);
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  res.send({ token });
};

module.exports = { createJWT };
