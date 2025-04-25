const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  console.log(token);
  if (!token) {
    return res
      .status(403)
      .json({ message: "Invalid token or no token entered" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "invalid token", error });
  }
};

module.exports = checkToken;
