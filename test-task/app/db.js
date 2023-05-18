const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`connected to ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDB;
