const express = require("express");

const router = express.Router();

const { sendmail } = require("../controllers/mail.controller");
const protect = require("../middlewares/authMiddleware");

router.post("/", protect, sendmail);

module.exports = router;
