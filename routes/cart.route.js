const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCartItems,
  updateCartItems,
  deleteCart,
} = require("../controllers/cart.controller");
const protect = require("../middlewares/authMiddleware");

router.post("/addToCart", protect, addToCart);
router.post("/getCartItems", protect, getCartItems);
router.post("/updateCartItems", protect, updateCartItems);
router.post("/deleteCart", protect, deleteCart);

module.exports = router;
