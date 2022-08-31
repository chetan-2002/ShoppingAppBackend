const express = require("express");

const router = express.Router();

const {
  getCategories,
  createCategory,
  deleteCategory,
} = require("../controllers/category.controller");

const protect = require("../middlewares/authMiddleware");

router.get("/", getCategories);
router.post("/addCategory", protect, createCategory);
router.post("/deleteCategory", protect, deleteCategory);

module.exports = router;
