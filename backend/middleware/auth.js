const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/userModel");
exports.isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "You must be logged in",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "This route only for admin user",
      });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
