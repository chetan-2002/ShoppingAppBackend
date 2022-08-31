const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

//Description: Get all the  cart item
//Route: POST /api/cart/getCartItems
//Access: Private
const getCartItems = async (req, res) => {
  const user = req.body.userId;
  const cart = await Cart.findOne({ user: user })
    .populate({
      path: "cartItems.product",
      select: "name price description image",
    })
    .populate({
      path: "user",
      select: "name email",
    });
  //   if (cart) {
  //     return res.status(200).json(cart);
  //   }
  return res.status(200).json(cart);
};

//Description: Add to cart
//Route: POST /api/cart/addToCart
//Access: Private
const addToCart = async (req, res) => {
  const { productId, userId } = req.body;
  // const user = userId;
  const product = await Product.findOne({ _id: productId });
  const product_price = product.price;
  const cart_exists = await Cart.findOne({ user: userId });
  if (cart_exists) {
    let productExists = false;
    cart_exists.cartItems.forEach((item) => {
      if (item.product == productId) {
        productExists = true;
        item.qty++;
      }
    });
    if (!productExists) {
      cart_exists.cartItems.push({ product: productId });
    }
    cart_exists.totalItem = cart_exists.cartItems.reduce(
      (acc, item) => acc + item.qty,
      0
    );
    cart_exists.total = cart_exists.total + product_price;
    await cart_exists.save();
    const cartId = cart_exists._id;
    const cartPopulatedData = await Cart.findOne({ _id: cartId })
      .populate({
        path: "cartItems.product",
        select: "name price description image",
      })
      .populate({
        path: "user",
        select: "name email",
      });
    return res.status(200).json(cartPopulatedData);
  } else {
    const cart = await Cart.create({
      user: userId,
      cartItems: [{ product: productId }],
    });
    cart.totalItem = cart.cartItems.reduce((acc, item) => acc + item.qty, 0);
    cart.total = cart.total + product_price;
    await cart.save();
    const cartId = cart._id;
    // console.log(cartId);
    const cartPopulatedData = await Cart.findOne({ _id: cartId })
      .populate({
        path: "cartItems.product",
        select: "name price description image",
      })
      .populate({
        path: "user",
        select: "name email",
      });
    return res.status(200).json(cartPopulatedData);
  }
};

//desc: update cart items
//route: POST /api/cart/updateCartItems
//access: Private
const updateCartItems = async (req, res) => {
  const { productId, operation, userId } = req.body;
  // const user = userId;
  const product = await Product.findOne({ _id: productId });
  const product_price = product.price;
  const cart = await Cart.findOne({ user: userId });
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
    const cartPopulatedData = await Cart.findOne({ _id: cartId })
      .populate({
        path: "cartItems.product",
        select: "name price description image",
      })
      .populate({
        path: "user",
        select: "name email",
      });
    return res.status(200).json(cartPopulatedData);
  } else {
    return res.status(400).json({ message: "Cart not found" });
  }
};

//desc: delete cart item
//route: POST /api/cart/deleteCart
//access: Private
const deleteCart = async (req, res) => {
  const user = req.user._id;
  const cart = await Cart.findOneAndDelete({ user });
  if (cart) {
    return res.status(200).json({ message: "Cart deleted successfully" });
  } else {
    return res.status(400).json({ message: "Cart not found" });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  updateCartItems,
  deleteCart,
};
