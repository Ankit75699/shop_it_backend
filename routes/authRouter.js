const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  getAllUsers,
  getUserDetails,
  updateUser,
  deleteUser,
} = require("../controllers/authController");
const { isAunthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);

router.get("/logout", logoutUser);

router.get("/me", isAunthenticatedUser, getUserProfile);
router.put("/password/update", isAunthenticatedUser, updatePassword);
router.put("/me/update", isAunthenticatedUser, updateProfile);

router.get("/admin/users", isAunthenticatedUser, authorizeRoles('admin'), getAllUsers)
router.route("/admin/user/:id")
  .get(isAunthenticatedUser, authorizeRoles('admin'), getUserDetails)
  .put(isAunthenticatedUser, authorizeRoles('admin'), updateUser)
  .delete(isAunthenticatedUser, authorizeRoles('admin'), deleteUser)
module.exports = router;
