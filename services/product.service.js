const Product = require("../models/product.model");

const getProducts = async () => {
  const products = await Product.find({});
  return products;
};

const createProduct = async (
  name,
  price,
  description,
  image,
  category,
  uploadedBy
) => {
  const product = await Product.create({
    name,
    price,
    description,
    image,
    category,
    uploadedBy,
  });
  return product;
};

const findProductById = async (id) => {
  const product = await Product.findById(id);
  return product;
};

const deleteById = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  return product;
};

const updateProductById = async (
  id,
  name,
  price,
  description,
  image,
  category
) => {
  const product = await Product.findByIdAndUpdate(
    id,
    {
      name,
      price,
      description,
      image,
      category,
    },
    { new: true }
  );
  return product;
};

module.exports = {
  getProducts,
  createProduct,
  findProductById,
  deleteById,
  updateProductById,
};
