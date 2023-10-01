const express = require("express");
const {
  register,
  login,
  logout,
  getMyProfile,
  getAllUsers,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const router = express.Router();

router.route("/user/register").post(register);
router.route("/user/login").post(login);
router.route("/user/logout").get(isAuthenticated, logout);
router.route("/admin/users").get( getAllUsers);
router.route("/admin/user/:userId").delete( deleteUser);
router.route("/me").get(isAuthenticated, getMyProfile);

module.exports = router;
