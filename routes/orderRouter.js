const express = require('express')
const router = express.Router();

const { newOrder, getSingleOrder, myOrders, allOrders, updateOrder, deleteOrder } = require('../controllers/orderController')

const { isAunthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route('/order/new').post(isAunthenticatedUser, newOrder);

router.route('/order/:id').get(isAunthenticatedUser, getSingleOrder);
router.route('/orders/me').get(isAunthenticatedUser, myOrders);
router.route('/admin/orders').get(isAunthenticatedUser, authorizeRoles('admin'), allOrders);

router.route('/admin/order/:id')
  .put(isAunthenticatedUser, authorizeRoles('admin'), updateOrder)
  .delete(isAunthenticatedUser, authorizeRoles('admin'), deleteOrder);

module.exports = router;
