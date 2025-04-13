const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Register user
const registerUser = async (req, res) => {
  let { name, email, phone, password, confirmPassword, profileImage } =
    req.body;
  if (!name || !email || !phone || !password || !confirmPassword) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }
  email = email.trim().toLowerCase();
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already registered. Please log in." });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      name,
      phone,
      passwordHash,
      profileImage,
      type: "user",
      preferredLanguage: "",
      city: "",
      state: "",
      loginType: "email",
    });

    await newUser.save();

    const token = jwt.sign(
      {
        userId: newUser._id,
        email: newUser.email,
        name: newUser.name,
      },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );

    return res
      .status(201)
      .json({ message: "User registered successfully", token: token });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Error while signing up" });
  }
};

// Login user
const loginUser = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }
  email = email.trim().toLowerCase();
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User does not exist. Please create an account first.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        name: user.name,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Error while logging in" });
  }
};

// Get profile (cache it)
const userProfile = async (req, res) => {
  try {
    let userEmail = req.user.email;
    userEmail = userEmail.trim().toLowerCase();

    const user = await User.findOne({ email: userEmail }).select(
      "-passwordHash"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Profile Error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const OauthUser = async (req, res) => {
  let {
    email,
    name,
    googleId,
    profileImage = { data: "", contentType: "" },
  } = req.body;

  if (!email || !googleId) {
    return res.status(400).json({ message: "Missing email or Google ID" });
  }
  email = email.trim().toLowerCase();

  try {
    let user = await User.findOne({ email });

    if (!user) {
      // 👤 Create new user if not found
      user = new User({
        email,
        name,
        phone: "0000000000",
        passwordHash: googleId,
        profileImage,
        loginType: "google",
        googleId,
        type: "user",
        preferredLanguage: "",
        city: "",
        state: "",
      });

      await user.save();
    } else {
      if (user.loginType !== "google") {
        return res.status(401).json({
          message: "This email is already registered using email/password",
        });
      }

      if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        name: user.name,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Google authentication successful",
      token,
    });
  } catch (error) {
    console.error("Google OAuth Error:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong with Google login." });
  }
};

// Update profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, phone, profileImage, preferredLanguage, city, state } =
      req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...(name && { name }),
        ...(phone && { phone }),
        ...(profileImage && { profileImage }),
        ...(preferredLanguage && { preferredLanguage }),
        ...(city && { city }),
        ...(state && { state }),
      },
      { new: true, runValidators: true, context: "query" }
    ).select("-passwordHash");

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User not found or invalid userId" });
    }

    return res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  userProfile,
  updateProfile,
  OauthUser,
};
