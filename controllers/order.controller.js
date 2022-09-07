const orderService = require("../services/order.service");

// Description: Make order
// Route: POST /api/order/makeOrder
// Access: Private
const makeOrder = async (req, res) => {
  const { cart, address, paymentType, total, phoneNo, userId } = req.body;
  const user = userId;
  const order = await orderService.makeOrder(
    cart,
    address,
    paymentType,
    total,
    phoneNo,
    user
  );
  const orderPopulatedData = await orderService.findOrderById(order._id);

  return res.status(200).json(orderPopulatedData);
};

const getOrderByUser = async (req, res) => {
  const user = req.body.userId;
  const order = await orderService.findOrderByUserId(user);
  return res.status(200).json(order);
};

module.exports = {
  makeOrder,
  getOrderByUser,
};
