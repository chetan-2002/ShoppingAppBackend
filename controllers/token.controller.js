const Token = require("../models/token.model");
const User = require("../models/user.model");

//Description: Verify token
//Route: POST /api/token/verifyToken
//Access: Public
const verifyToken = async (req, res) => {
  let { token } = req.body;
  const tokenData = await Token.findOne({ token });
  if (tokenData) {
    const user = await User.findOneAndUpdate(
      { email: tokenData.email },
      { isEmailVerified: true },
      { new: true }
    );
    res.status(200).json({ message: "Token verified Successfully", user });
  } else {
    res.status(400).json({ err: "Invalid token" });
  }
};
module.exports = {
  verifyToken,
};
