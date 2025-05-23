const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Report = require("../model/reportsModel");
const TicketListing = require("../model/ticketListingModel");
const axios = require("axios");

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

    //check if the account is banned
    if (user.isBanned) {
      return res
        .status(403)
        .send(
          "Your account is banned as you have not disoberyed to the terms and conditions."
        );
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        name: user.name,
      },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
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

const reportUser = async (req, res) => {
  const { reportedUserEmail, reason } = req.body;
  const reporter = req.user._id; // from toke checkn middleare
  if (!reportedUserEmail || !reason || !reporter) {
    return res.status(400).send("All fields are required");
  }
  console.log("sdjoejdn");
  console.log(reportedUserEmail, reason, reporter.toString());

  const reportedUser = await User.findOne({ email: reportedUserEmail });

  if (!reportedUser) {
    return res.status(404).send("User not found");
  }

  if (reportedUser._id.toString() === reporter.toString()) {
    return res.status(405).send("You cannot report yourself fool!");
  }

  try {
    const report = new Report({
      reporterId: reporter,
      reportedId: reportedUser._id,
      reason,
    });

    await report.save();
    return res.status(201).send("Report submitted successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error completing your request");
  }
};

const blockUser = async (req, res) => {
  try {
    let { blockedEmail } = req.body;
    const admin = req.user;

    blockedEmail = blockedEmail.trim().toLowerCase();

    if (!blockedEmail) {
      return res.status(400).send("All fields are required");
    }

    const adminUser = await User.findOne({ email: admin.email });
    const blockedUser = await User.findOne({ email: blockedEmail });

    if (!adminUser || !blockedUser) {
      return res.status(404).send("User not found");
    }

    if (adminUser.type !== "admin" || blockedUser.type === "admin") {
      return res
        .status(401)
        .send("You are not permitted to perform this action");
    }

    blockedUser.isBanned = true;
    blockedUser.dateOfBan = new Date();
    await blockedUser.save();

    await TicketListing.deleteMany({ sellerId: blockedUser._id });

    return res.status(200).send("Blocked user successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error completing your request");
  }
};

const OauthUser = async (req, res) => {
  let { email, name, googleId, profileImage } = req.body;

  if (!email || !googleId) {
    return res.status(400).json({ message: "Missing email or Google ID" });
  }

  email = email.trim().toLowerCase();

  try {
    let user = await User.findOne({ email });

    if (!user) {
      if (profileImage?.data && profileImage.data !== "empty") {
        try {
          const imageRes = await axios.get(profileImage.data, {
            responseType: "arraybuffer",
          });
          const contentType = imageRes.headers["content-type"]; // e.g., image/jpeg or image/webp
          const base64Data = Buffer.from(imageRes.data).toString("base64");
          const base64WithPrefix = `data:${contentType};base64,${base64Data}`;

          profileImage = {
            data: base64WithPrefix,
            contentType: contentType,
          };
        } catch (imgError) {
          console.error("Failed to fetch or process profile image:", imgError);
          profileImage = { data: "empty", contentType: "image/jpeg" };
        }
      } else {
        profileImage = { data: "empty", contentType: "image/jpeg" };
      }

      // Create new user
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
      { expiresIn: "24h" }
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

const checkEmail = async (req, res) => {
  let { email } = req.query;
  if (!email) return res.status(400).json({ message: "bad request" });
  email = email.trim().toLowerCase();
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "Email already exists" });
    } else {
      return res.status(200).json({ message: "Email available" });
    }
  } catch {
    return res
      .status(500)
      .json({ message: "An error occured while checking available email" });
  }
};

const userTicketHistory = async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).send("No token found");
    let email = "";
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      email = decoded.email;
    } catch {
      return res.status(401).json({ message: "invalid token", error });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).populate({
      path: "soldTickets.ticket",
      model: "TicketListing",
      populate: {
        path: "eventRef",
        model: "EventReference",
      },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    // Transform the structure
    const transformed = user.soldTickets.map((entry) => {
      const { eventRef, ...ticketDetails } = entry.ticket.toObject();
      return {
        ticketDetails,
        eventRef,
      };
    });

    return res.status(200).json(transformed);
  } catch (err) {
    console.error("Error fetching sold tickets:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  userProfile,
  updateProfile,
  OauthUser,
  reportUser,
  blockUser,
  checkEmail,
  userTicketHistory,
};
