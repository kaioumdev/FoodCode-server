const express = require("express");
const { createJWT } = require("../controllers/authController");
const router = express.Router();

router.post("/jwt", createJWT);

module.exports = router;
