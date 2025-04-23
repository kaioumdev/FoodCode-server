const jwt = require("jsonwebtoken");
require("dotenv").config();

const createJWT = (req, res) => {
  try {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    res.send({ token });
  } catch (error) {
    res.status(500).send({ message: "Failed to create jwtToken" });
  }
};

module.exports = { createJWT };
