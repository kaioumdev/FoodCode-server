const jwt = require("jsonwebtoken");
require("dotenv").config();

const createJWT = (req, res) => {
  try {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
    res.send({ token });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { createJWT };
