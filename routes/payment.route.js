const express = require("express");

const router = express.Router();

const { paymentIn } = require("../controllers/payment.controller");

router.post("/paymentIntent", paymentIn);

module.exports = router;
