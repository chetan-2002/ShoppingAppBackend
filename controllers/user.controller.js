const User = require("../models/user.model");
const generateToken = require("../config/generateToken");
//desc: login user
//route: POST /api/user/login
//access: public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ err: "Invalid email or password" });
  }
};

//desc: register user
//route: POST /api/user/register
//access: public
const registerUser = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ err: "User already exists" });
  }

  const user = await User.create({
    name,
    email,
    password,
    isAdmin,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ err: "Invalid user data" });
  }
};

module.exports = {
  loginUser,
  registerUser,
};
