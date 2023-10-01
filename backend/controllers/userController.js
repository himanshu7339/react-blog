const User = require("../models/userModel");

const bcrypt = require("bcrypt");
const {
  sendCookie,
  createToken,
  sendResponseWithToken,
  throwResponseError,
} = require("../utils/Feature");

// register new user
exports.register = async (req, res) => {
  //  fetch data from the request body
  const { name, email, password, confirmPassword } = req.body;

  // throw an error if field not filled
  if ((!name || !email || !password, !confirmPassword)) {
    return res.status(403).json({
      success: false,
      message: "Please enter all required fields",
    });
  }
  // check password and confirm password is match
  if (password !== confirmPassword) {
    return res.status(403).json({
      success: false,
      message: "confirm password and password must be the same",
    });
  }
  // check is user exists
  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return throwResponseError(res, 403, false, `User ${email} already exists`);
  }

  // i do password hashing
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });
  // generate token
  const token = createToken(user);

  // send response
  return sendResponseWithToken(
    res,
    token,
    true,
    200,
    `${user.name} registered successfully`
  );
};

// Login User which is already registered
exports.login = async (req, res) => {
  try {
    // fetch user data from request body
    const { email, password } = req.body;
    // check all fields are fields
    if (!email || !password) {
      return throwResponseError(res, 404, false, `All filed are required`);
    }
    // is user already existing
    const user = await User.findOne({ email: email }).select("+password");
    if (!user) {
      return throwResponseError(res, 404, false, `User does not exist`);
    }

    // compare hash password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return throwResponseError(
        res,
        404,
        false,
        `Email and password incorrect`
      );
    }

    const token = createToken(user);
    // login user successfully
    return sendResponseWithToken(
      res,
      token,
      true,
      200,
      `Welcome back ${user.name}`
    );
  } catch (error) {
    console.log("Login Error", error);
    return throwResponseError(
      res,
      404,
      false,
      `something went wrong while login`
    );
  }
};

// get my profile
exports.getMyProfile = async (req, res) => {
const {token} = req.cookies
res.status(200).json({
  success:true,
  user:req.user
})
}

// get all user --Administrator Route
exports.getAllUsers = async (req, res) => {
const users = await User.find()
// check Posts is not found
if (!users) {
  return throwResponseError(res, 404, false, `Users not found`);
}
// if check doing correct send true response
return res.status(200).json({
  users,
  success: true,
  message: `Users fetch successfully`,
});
}

// Delete a User ---Administrator
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return throwResponseError(res, 404, false, `USer not found`);
    }
    return res.status(200).json({
      success: true,
      message: `User delete successfully`,
    });
  } catch (error) {
    console.log("Delete User Error", error);
    return throwResponseError(
      res,
      404,
      false,
      `something went wrong while delete User`
    );
  }
};

// Log out the user
exports.logout = async (req, res) => {
  try {
    res.clearCookie("token").status(200).json({
      success: true,
      message: `User logged out successfully`,
    });
  } catch (error) {
    console.log("logout Error", error);
    return throwResponseError(
      res,
      404,
      false,
      `something went wrong while logout`
    );
  }
};
