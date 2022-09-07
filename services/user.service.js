const User = require("../models/user.model");

const createUser = async (name, email, password, phone, isAdmin) => {
  const user = await User.create({
    name,
    email,
    password,
    isAdmin,
    phone,
  });
  return user;
};

const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

module.exports = {
  createUser,
  findUserByEmail,
};
