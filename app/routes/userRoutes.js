const express = require("express");
const cors = require('cors')
const {
  getUsers,
  getUserAdminStatus,
  createUser,
  makeAdmin,
  deleteUser,
} = require("../controllers/userController");
const verifyToken = require("../middlewares/authMiddleware");
const verifyAdmin = require("../middlewares/adminMiddleware");
const router = express.Router();

router.get("/", verifyToken, getUsers);
router.get("/admin/:email", verifyToken, getUserAdminStatus);
router.post("/", createUser);
router.options('/products/:id', cors())
router.patch("/admin/:id", cors(), verifyToken, makeAdmin);
router.delete("/:id", verifyToken, deleteUser);

module.exports = router;
