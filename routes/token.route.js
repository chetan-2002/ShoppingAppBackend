const express = require("express");

const router = express.Router();

const { verifyToken } = require("../controllers/token.controller");

router.post("/verifyToken", verifyToken);

module.exports = router;
