const Order = require("../models/order.model.js");
const Cart = require("../models/cart.model.js");
// Description: Make order
// Route: POST /api/order/makeOrder
// Access: Private
const makeOrder = async (req, res) => {
  // const user = req.user._id;
  const { cart, address, paymentType, total, phoneNo, userId } = req.body;
  const user = userId;
  const order = await Order.create({
    user,
    cart,
    address,
    paymentType,
    total,
    phoneNo,
  });
  const orderPopulatedData = await Order.findOne({ order })
    .populate({
      path: "cart",
      populate: {
        path: "cartItems.product",
        select: "name price description image",
      },
    })
    .populate({
      path: "user",
      select: "name email",
    });

  return res.status(200).json(orderPopulatedData);
};

const getOrderByUser = async (req, res) => {
  const user = req.body.userId;
  const order = await Order.find({ user })
    .sort({ date: -1 })
    .populate({
      path: "cart",
      populate: {
        path: "cartItems.product",
        select: "name price description image",
      },
    })
    .populate({
      path: "user",
      select: "name email",
    });
  return res.status(200).json(order);
};

module.exports = {
  makeOrder,
  getOrderByUser,
};
