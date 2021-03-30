const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const catchAsyncErrors = require("./catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

exports.isAunthenticatedUser = catchAsyncErrors(async (req, res, next) => {

  const { token } = req.cookies;

  if (!token)
    return next(
      new ErrorHandler("Please login first to access this resource", 401)
    );

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await userModel.findById(decoded.id);

  next();

});

// Handling users roles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`Role (${req.user.role}) is not allowed to acccess this resource`, 403))
    }
    next()
  }
}