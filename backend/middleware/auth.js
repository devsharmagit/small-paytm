const jwt = require("jsonwebtoken");
const { JWT_SECERET } = require("../config.js");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token)
      return res.status(401).json({
        message: "Please provide token",
      });

    const decoded = jwt.verify(token, JWT_SECERET);
    if (!decoded) return res.status(401).json({ message: "invalid token" });
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(500).json({ message: "something went wrong server side" });
  }
};

module.exports = { authMiddleware };
