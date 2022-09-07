const Cart = require("../models/cart.model");
const cartService = require("../services/cart.service");
const productService = require("../services/product.service");
const Product = require("../models/product.model");

//Description: Get all the  cart item
//Route: POST /api/cart/getCartItems
//Access: Private
const getCartItems = async (req, res) => {
  const user = req.body.userId;
  const cart = await cartService.getCartByUserId(user);
  return res.status(200).json(cart);
};

//Description: Add to cart
//Route: POST /api/cart/addToCart
//Access: Private
const addToCart = async (req, res) => {
  const { productId, userId } = req.body;
  const product = await productService.findProductById(productId);
  const product_price = product.price;
  const existingCart = await cartService.cartExists(userId);
  if (existingCart) {
    let productExists = false;
    existingCart.cartItems.forEach((item) => {
      if (item.product == productId) {
        productExists = true;
        item.qty++;
      }
    });
    if (!productExists) {
      existingCart.cartItems.push({ product: productId });
    }
    existingCart.totalItem = existingCart.cartItems.reduce(
      (acc, item) => acc + item.qty,
      0
    );
    existingCart.total = existingCart.total + product_price;
    await existingCart.save();
    const cartId = existingCart._id;
    const cartPopulatedData = await cartService.getCartByCartId(cartId);
    return res.status(200).json(cartPopulatedData);
  } else {
    const cart = await cartService.createCart(userId, productId);
    cart.totalItem = cart.cartItems.reduce((acc, item) => acc + item.qty, 0);
    cart.total = cart.total + product_price;
    await cart.save();
    const cartId = cart._id;
    const cartPopulatedData = await cartService.getCartByCartId(cartId);
    return res.status(200).json(cartPopulatedData);
  }
};

//desc: update cart items
//route: POST /api/cart/updateCartItems
//access: Private
const updateCartItems = async (req, res) => {
  const { productId, operation, userId } = req.body;
  const product = await productService.findProductById(productId);
  const product_price = product.price;
  const cart = await cartService.getCartByUserId(userId);
  if (cart) {
    cart.cartItems.forEach((item) => {
      if (item.product == productId) {
        if (operation == "inc") {
          item.qty++;
        } else {
          item.qty--;
          if (item.qty == 0) {
            cart.cartItems = cart.cartItems.filter((item) => {
              return item.product != productId;
            });
          }
        }
      }
    });

    if (operation == "inc") {
      cart.total = cart.total + product_price;
      cart.totalItem = cart.totalItem + 1;
    } else {
      cart.total = cart.total - product_price;
      cart.totalItem = cart.totalItem - 1;
    }
    await cart.save();
    const cartId = cart._id;
    const cartPopulatedData = await cartService.getCartByCartId(cartId);
    return res.status(200).json(cartPopulatedData);
  } else {
    return res.status(400).json({ message: "Cart not found" });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  updateCartItems,
};
