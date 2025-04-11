const express = require("express");
const {
  registerUser,
  loginUser,
  userProfile,
  updateProfile,
  OauthUser,
} = require("../controller/userController");
const checkToken = require("../middleware/authware");

const router = express.Router();

router.post("/signup", registerUser);
router.post("/signin", loginUser);
router.post("/googleOauth", OauthUser);
router.get("/profile", checkToken, userProfile);
router.put("/profile", checkToken, updateProfile);

module.exports = router;
