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
router.post("/", verifyToken, createMenuItem);
router.patch("/:id", verifyToken, updateMenuItem);
router.delete("/:id", verifyToken, deleteMenuItem);

module.exports = router;
