const express = require("express");

const router = express.Router();

const { verifyToken } = require("../controllers/token.controller");
const protect = require("../middlewares/authMiddleware");

router.post("/verifyToken", protect, verifyToken);

module.exports = router;
