const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");

const {
  login,
  signUp,
  changePassword,
  sendOTP,
} = require("../controllers/Auth");

const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");

// =================== AUTH ROUTES =================== //

// Send OTP for registration
router.post("/sendotp", sendOTP);

// Sign up new user
router.post("/signup", signUp);

// Login existing user
router.post("/login", login);

// Change password (requires authentication)
router.post("/changepassword", auth, changePassword);

// Request password reset (send token via email)
router.post("/resetpasswordtoken", resetPasswordToken);

// Reset password using token
router.post("/resetpassword", resetPassword);

module.exports = router;
