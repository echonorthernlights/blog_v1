const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const connectDB = asyncHandler(async (uri) => {
  const options = {};

  const conn = await mongoose.connect(uri, options);
  console.log(`Connected to database, host ${conn.connection.host}`);
});

module.exports = { connectDB };
