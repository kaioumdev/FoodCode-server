const express = require("express");
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
router.patch("/admin/:id", verifyToken, verifyAdmin, makeAdmin);
router.delete("/:id", verifyToken, verifyAdmin, deleteUser);

module.exports = router;
