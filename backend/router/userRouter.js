const express = require("express");
const {
  registerUser,
  loginUser,
  userProfile,
  updateProfile,
  OauthUser,
  checkEmail,
  userTicketHistory,
  reportUser,
  blockUser,
} = require("../controller/userController");
const checkToken = require("../middleware/authware");
const {
  banCheckMiddleware,
  banCheckMiddlewareWithoutAuth,
} = require("../middleware/banCheckMiddleware");
const {
  sendOTP,
  resetPassword,
} = require("../controller/forgotPasswordController");
const router = express.Router();

router.post("/signup", banCheckMiddlewareWithoutAuth, registerUser);
router.post("/signin", banCheckMiddlewareWithoutAuth, loginUser);
router.post("/googleOauth", OauthUser); //ban check middleware makes some error check it later
router.get("/profile", checkToken, banCheckMiddleware, userProfile);
router.put("/profile", checkToken, updateProfile);
router.get("/history", checkToken, banCheckMiddleware, userTicketHistory);
router.get("/email", checkEmail);
router.post("/forgot-password", sendOTP);
router.post("/reset-password", resetPassword);
router.post("/report", checkToken, banCheckMiddleware, reportUser);
router.delete("/block", checkToken, banCheckMiddleware, blockUser);

module.exports = router;
