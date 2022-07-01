const path = require('path');
const express = require('express');

const {
  getProducts,
  getIndex,
  getCart,
  getOrders,
  getCheckout,
} = require('../controllers/shop');

const router = express.Router();

router.get('/products', getProducts);

router.get('/cart', getCart);

router.get('/orders', getOrders);

router.get('/checkout', getCheckout);

router.get('/', getIndex);

module.exports = router;
