const express = require("express");

const router = express.Router();

const {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/product.controller");

const protect = require("../middlewares/authMiddleware");

router.get("/", getProducts);
router.post("/addProduct", protect, addProduct);
router.post("/deleteProduct", protect, deleteProduct);
router.post("/updateProduct", protect, updateProduct);

module.exports = router;
