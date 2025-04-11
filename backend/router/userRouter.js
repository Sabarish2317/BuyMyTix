const express = require("express");
const {
  registerUser,
  loginUser,
  userProfile,
  updateProfile,
  OauthUser,
} = require("../controller/userController");
const checkToken = require("../middleware/authware");
const {
  sendOTP,
  resetPassword,
} = require("../controller/forgotPasswordController");
const router = express.Router();

router.post("/signup", registerUser);
router.post("/signin", loginUser);
router.post("/googleOauth", OauthUser);
router.get("/profile", checkToken, userProfile);
router.put("/profile", checkToken, updateProfile);
router.post("/forgot-password", sendOTP);
router.post("/reset-password", resetPassword);

module.exports = router;
