const Order = require("../models/order.model.js");

const makeOrder = async (
  cart,
  address,
  paymentType,
  total,
  phoneNo,
  userId
) => {
  const user = userId;
  const order = await Order.create({
    user,
    cart,
    address,
    paymentType,
    total,
    phoneNo,
  });
  return order;
};

const findOrderById = async (id) => {
  const order = await Order.findById(id)
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
  return order;
};

const findOrderByUserId = async (userId) => {
  const order = await Order.findOne({ user: userId })
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
  return order;
};

module.exports = {
  makeOrder,
  findOrderById,
  findOrderByUserId,
};
