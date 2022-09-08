const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const paymentIn = async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    payment_method_types: ["card"],
  });
  res.status(200).json({
    clientSecret: paymentIntent.client_secret,
  });
};

module.exports = {
  paymentIn,
};
