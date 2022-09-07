const Cart = require("../models/cart.model");

const getCartByUserId = async (userId) => {
  const cart = await Cart.findOne({ user: userId })
    .populate({
      path: "cartItems.product",
      select: "name price description image",
    })
    .populate({
      path: "user",
      select: "name email",
    });
  return cart;
};

const cartExists = async (userId) => {
  const cart = await Cart.findOne({ user: userId });
  return cart;
};

const createCart = async (userId, productId) => {
  const cart = await Cart.create({
    user: userId,
    cartItems: [{ product: productId }],
  });
  return cart;
};

const getCartByCartId = async (cartId) => {
  const cart = await Cart.findOne({ _id: cartId })
    .populate({
      path: "cartItems.product",
      select: "name price description image",
    })
    .populate({
      path: "user",
      select: "name email",
    });
  return cart;
};

module.exports = {
  getCartByUserId,
  cartExists,
  createCart,
  getCartByCartId,
};
