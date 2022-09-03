const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  isEmailVerified,
} = require("../controllers/user.controller");

const protect = require("../middlewares/authMiddleware");

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/isEmailVerified", protect, isEmailVerified);

module.exports = router;
