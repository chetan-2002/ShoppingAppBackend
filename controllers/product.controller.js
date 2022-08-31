const Category = require("../models/category.model");
const Product = require("../models/product.model");
const ObjectId = require("mongodb").ObjectID;

//desc: get all products
//route: GET /api/product
//access: public
const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

//desc: add product
//route: POST /api/product/addProduct
//access: private
const addProduct = async (req, res) => {
  const { name, price, description, image, categoryName } = req.body;
  let id = await Category.find({ name: categoryName });
  id = id[0]._id;
  const product = await Product.create({
    name,
    price,
    description,
    image,
    category: id,
    uploadedBy: req.user._id,
  });
  const data = await Category.findByIdAndUpdate(
    id,
    {
      $push: { products: product._id },
    },
    { new: true }
  );
  if (product) {
    res.status(201).json(product);
  } else {
    res.status(400);
    throw new Error("Invalid product data");
  }
};

//desc: delete product
//route: POST /api/product/deleteProduct
//access: private
const deleteProduct = async (req, res) => {
  let { id } = req.body;
  id = new ObjectId(id);
  const product = await Product.findById(id);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }
  const category = await Category.findById(product.category);
  if (!category) {
    res.status(404).json({ message: "Category not found" });
    return;
  }
  const data = await Category.findByIdAndUpdate(
    category._id,
    { $pull: { products: id } },
    { new: true }
  );
  const deletedProduct = await Product.findByIdAndDelete(id);
  if (deletedProduct) {
    res.status(200).json({ message: "Product deleted successfully" });
  } else {
    res.status(404).json({ err: "Error in deleting the product" });
  }
};

//desc: update product
//route: POST /api/product/updateProduct
//access: private
const updateProduct = async (req, res) => {
  const { id, name, price, description, image, categoryName } = req.body;
  // console.log(req.body);
  const product = await Product.findById(id);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }
  const prevCategory = await Category.findById(product.category);
  const data = await Category.findByIdAndUpdate(
    prevCategory._id,
    { $pull: { products: id } },
    { new: true }
  );
  let newCategoryId = await Category.find({ name: categoryName });
  newCategoryId = newCategoryId[0]._id;
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      name,
      price,
      description,
      image,
      category: newCategoryId,
    },
    { new: true }
  );
  const newData = await Category.findByIdAndUpdate(
    newCategoryId,
    {
      $push: { products: updatedProduct._id },
    },
    { new: true }
  );
  if (updatedProduct) {
    res.status(200).json({ message: "Product updated successfully" });
  } else {
    res.status(404).json({ err: "Error in updating the product" });
  }
};
module.exports = {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
};
