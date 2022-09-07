const User = require("../models/user.model");
const generateToken = require("../config/generateToken");
const userService = require("../services/user.service");
const tokenService = require("../services/token.service");
//desc: login user
//route: POST /api/user/login
//access: public
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.findUserByEmail(email);
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
  const { name, email, password, isAdmin, phone } = req.body;

  const userExists = await userService.findUserByEmail(email);

  if (userExists) {
    res.status(400).json({ err: "User already exists" });
  }

  const user = await userService.createUser(
    name,
    email,
    password,
    phone,
    isAdmin
  );

  const generatedToken = generateToken(user._id);
  await tokenService.createToken(email, generatedToken);

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      phone: user.phone,
      token: generatedToken,
    });
  } else {
    res.status(400).json({ err: "Invalid user data" });
  }
};

//desc: Check is user is email verified
//route: POST /api/user/isEmailVerified
//access: public
const isEmailVerified = async (req, res) => {
  const { email } = req.body;
  const user = await userService.findUserByEmail(email);
  if (user.isEmailVerified) {
    res.status(200).json({ message: "Email is verified" });
  } else {
    res.status(400).json({ err: "Email is not verified" });
  }
};

module.exports = {
  loginUser,
  registerUser,
  isEmailVerified,
};
