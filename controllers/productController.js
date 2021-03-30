const productModel = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// Create new product   =>   /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await productModel.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// Get all product =>/api/v1/products
exports.getProducts = catchAsyncErrors(async (req, res, next) => {

  resPerPage = 4;
  const productsCount = await productModel.countDocuments()
  const apiFeatures = new ApiFeatures(productModel.find(), req.query).search().filter().paginations(resPerPage);
  const displayProduct = await apiFeatures.query;

  res.status(200).json({
    success: true,
    displayProduct,
    resPerPage,
    productsCount
  });


});

// Get single product details   =>   /api/v1/product/:id
exports.getSingleProducts = catchAsyncErrors(async (req, res, next) => {
  const singleProducts = await productModel.findById(req.params.id);
  if (!singleProducts) return next(new ErrorHandler("Product Not Found", 404));
  res.status(200).json({
    success: true,
    singleProducts,
  });
});

// Update Product   =>   /api/v1/admin/product/:id
exports.updateProducts = catchAsyncErrors(async (req, res, next) => {
  let product = await productModel.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product Not Found", 404));
  product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product   =>   /api/v1/admin/product/:id
exports.deleteProducts = catchAsyncErrors(async (req, res, next) => {
  const product = await productModel.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product Not Found", 404));
  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product is deleted.",
  });
});
