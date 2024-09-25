const express = require("express");
const {
  createPaymentIntent,
  getPayments,
  createPayment,
} = require("../controllers/paymentController");
const verifyToken = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create-payment-intent", createPaymentIntent);
router.get("/:email", verifyToken, getPayments);
router.post("/", createPayment);

module.exports = router;
