const mongoose = require("mongoose");
require("dotenv").config();

exports.connectDB = async () => {
  const mongoDbUrl = process.env.MONGO_URL || "";
  console.log(mongoDbUrl);
  const { connection } = await mongoose.connect(mongoDbUrl, {
    dbName: "New-React-Blog",
  });
  console.log(`Database Connected on ${connection.host}`);
};
