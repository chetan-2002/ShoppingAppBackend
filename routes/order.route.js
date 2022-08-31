const express = require("express");

const router = express.Router();

const {
  makeOrder,
  getOrderByUser,
} = require("../controllers/order.controller");

const protect = require("../middlewares/authMiddleware");

router.post("/makeOrder", protect, makeOrder);
router.post("/getOrderByUser", protect, getOrderByUser);

module.exports = router;
