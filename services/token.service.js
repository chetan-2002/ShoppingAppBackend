const Token = require("../models/token.model");

const createToken = async (email, token) => {
  await Token.create({
    email,
    token,
  });
};

module.exports = {
  createToken,
};
