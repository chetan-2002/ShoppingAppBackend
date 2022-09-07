const categoryService = require("../services/category.service");
var ObjectId = require("mongodb").ObjectID;

//desc: get all categories
//route: GET /api/category
//access: public
const getCategories = async (req, res) => {
  const categories = await categoryService.getAllCategories();
  res.json(categories);
};

//desc: create category
//route: POST /api/category/addCategory
//access: private
const createCategory = async (req, res) => {
  const { name } = req.body;
  const category = await categoryService.createCategory(name);
  if (category) {
    res.status(201).json(category);
  } else {
    res.status(400).json({ err: "Invalid category data" });
  }
};

//desc: delete a category
//route: POST /api/category/deleteCategory
//access: private
const deleteCategory = async (req, res) => {
  let { id } = req.body;
  id = new ObjectId(id);
  const category = await categoryService.deleteCategory(id);
  if (category) {
    res.status(200).json({ message: "Category deleted" });
  } else {
    res.status(404).json({ err: "Category not found" });
  }
};

module.exports = {
  getCategories,
  createCategory,
  deleteCategory,
};
