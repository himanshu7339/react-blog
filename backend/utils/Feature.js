const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createToken = (user) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  return token;
};

exports.sendResponseWithToken = (res, token, success, statusCode, message) => {
  res.cookie("token", token).status(statusCode).json({
    success: success,
    message,
  });
};

exports.throwResponseError = (res, statusCode, success, message) => {
  res.status(statusCode).json({
    success: success,
    message: message,
  });
};
