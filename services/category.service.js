const Category = require("../models/category.model");

const getAllCategories = async () => {
  const categories = await Category.find({}).populate({
    path: "products",
    select: "name price _id description image size crust",
  });
  return categories;
};

const createCategory = async (name) => {
  const category = await Category.create({
    name,
    products: [],
  });
  return category;
};

const deleteCategory = async (id) => {
  const category = await Category.findByIdAndDelete(id);
  return category;
};

const findByCategoryName = async (name) => {
  const category = await Category.findOne({ name });
  return category;
};

const updateCategory = async (id, product, operation) => {
  if (operation === "push") {
    const category = await Category.findByIdAndUpdate(
      id,
      {
        $push: { products: product._id },
      },
      { new: true }
    );
    return category;
  } else {
    const category = await Category.findByIdAndUpdate(
      id,
      {
        $pull: { products: product._id },
      },
      { new: true }
    );
    return category;
  }
};

const findCategoryById = async (id) => {
  const category = await Category.findById(id);
  return category;
};

module.exports = {
  getAllCategories,
  createCategory,
  deleteCategory,
  findByCategoryName,
  updateCategory,
  findCategoryById,
};
