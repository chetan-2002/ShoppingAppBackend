const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.green.bgCyan);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
