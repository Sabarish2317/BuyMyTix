const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const banCheckMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: Missing token" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isBanned) {
      return res
        .status(403)
        .send(
          "Your account is banned as you have not disoberyed to the terms and conditions."
        );
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Ban check failed:", err);
    res.status(401).json({ message: "Unauthorized or invalid token" });
  }
};

const banCheckMiddlewareWithoutAuth = async (req, res, next) => {
  try {
    let { email } = req.body;
    email = email.trim().toLowerCase();

    if (!email) {
      return res
        .status(400)
        .json({ message: "Bad request, All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isBanned) {
      return res
        .status(403)
        .send(
          "Your account is banned as you have disobeyed the terms and conditions."
        );
    }
    next();
  } catch (err) {
    console.error("Ban check failed:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { banCheckMiddleware, banCheckMiddlewareWithoutAuth };
