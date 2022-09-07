const productService = require("../services/product.service");
const categoryService = require("../services/category.service");
const ObjectId = require("mongodb").ObjectID;

//desc: get all products
//route: GET /api/product
//access: public
const getProducts = async (req, res) => {
  const products = await productService.getProducts();
  res.json(products);
};

//desc: add product
//route: POST /api/product/addProduct
//access: private
const addProduct = async (req, res) => {
  const { name, price, description, image, categoryName } = req.body;
  let id = await categoryService.findByCategoryName(categoryName);
  id = id[0]._id;

  const product = await productService.createProduct(
    name,
    price,
    description,
    image,
    id,
    req.user._id
  );
  const data = await categoryService.updateCategory(id, product._id, push);
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
  const product = await productService.findProductById(id);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }
  const category = await categoryService.findCategoryById(product.category);
  if (!category) {
    res.status(404).json({ message: "Category not found" });
    return;
  }
  const data = await categoryService.updateCategory(category._id, id, pull);

  const deletedProduct = await productService.deleteById(id);
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
  console.log(req.body);
  const product = await productService.findProductById(id);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }
  const prevCategory = await categoryService.findCategoryById(product.category);

  const data = await categoryService.updateCategory(prevCategory._id, id, pull);

  let newCategoryId = await categoryService.findByCategoryName(categoryName);
  console.log(newCategoryId);
  newCategoryId = newCategoryId[0]._id;
  const updatedProduct = await productService.updateProductById(
    name,
    price,
    description,
    image,
    newCategoryId
  );

  const newData = await categoryService.updateCategory(
    newCategoryId,
    updatedProduct._id,
    push
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
