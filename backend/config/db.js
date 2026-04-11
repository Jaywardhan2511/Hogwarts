const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://Jay:Jay@practice.evibdwl.mongodb.net/?appName=practice');
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;