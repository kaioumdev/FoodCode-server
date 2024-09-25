const express = require("express");
const {
  getCarts,
  createCartItem,
  deleteCartItem,
} = require("../controllers/cartController");
const router = express.Router();

router.get("/", getCarts);
router.post("/", createCartItem);
router.delete("/:id", deleteCartItem);

module.exports = router;
