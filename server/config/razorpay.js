const Razorpay = require("razorpay");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Create the instance of Razorpay
exports.instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET, // lowercase "key_secret"
});
