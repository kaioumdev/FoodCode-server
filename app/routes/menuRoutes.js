const express = require("express");
const {
  getMenu,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require("../controllers/menuController");
const verifyToken = require("../middlewares/authMiddleware");
const verifyAdmin = require("../middlewares/adminMiddleware");
const router = express.Router();

router.get("/", getMenu);
router.get("/:id", getMenuItem);
router.post("/", verifyToken, verifyAdmin, createMenuItem);
router.patch("/:id", verifyToken, verifyAdmin, updateMenuItem);
router.delete("/:id", verifyToken, verifyAdmin, deleteMenuItem);

module.exports = router;
