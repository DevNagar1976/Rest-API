const mongoose = require("mongoose");

// Task 1: connect the app to a local MongoDB database named "playlistdb"
const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/playlistdb";
    await mongoose.connect(uri);
    console.log(`MongoDB connected: ${mongoose.connection.name}`);
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
