const express = require("express");
const {
  getAdminStats,
  getOrderStats,
} = require("../controllers/adminController");
const verifyToken = require("../middlewares/authMiddleware");
const verifyAdmin = require("../middlewares/adminMiddleware");
const router = express.Router();

router.get("/admin-stats", verifyToken, getAdminStats);
router.get("/order-stats", getOrderStats);

module.exports = router;
