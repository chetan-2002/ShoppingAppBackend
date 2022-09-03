const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connect = require("./config/db");
const colors = require("colors");
const Userroutes = require("./routes/user.routes");
const Productroutes = require("./routes/product.route");
const Categoryroutes = require("./routes/categories.route");
const Cartroutes = require("./routes/cart.route");
const Orderroutes = require("./routes/order.route");
const Mailroutes = require("./routes/sendmail.route");
const Tokenroutes = require("./routes/token.route");
const bodyParser = require("body-parser");
const cors = require("cors");
connect();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/user", Userroutes);
app.use("/api/product", Productroutes);
app.use("/api/category", Categoryroutes);
app.use("/api/cart", Cartroutes);
app.use("/api/order", Orderroutes);
app.use("/api/sendmail", Mailroutes);
app.use("/api/token", Tokenroutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`.green.bgMagenta);
});
