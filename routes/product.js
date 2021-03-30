const express = require("express");
const router = express.Router();
const {
  getProducts,
  newProduct,
  getSingleProducts,
  updateProducts,
  deleteProducts,
} = require("../controllers/productController");
const { isAunthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.get("/products", getProducts);
router.get("/product/:id", getSingleProducts);

router.post("/admin/product/new",
  isAunthenticatedUser,
  authorizeRoles("admin"),
  newProduct
);
router
  .route("/admin/product/:id")
  .put(isAunthenticatedUser, authorizeRoles("admin"), updateProducts)
  .delete(isAunthenticatedUser, authorizeRoles("admin"), deleteProducts);

module.exports = router;
