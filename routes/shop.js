const path = require('path');
const express = require('express');

const {
  getProducts,
  getProduct,
  getIndex,
  getCart,
  getOrders,
  getCheckout,
} = require('../controllers/shop');

const router = express.Router();

router.get('/products', getProducts);

// always place this last in /products routes or always after more specific routes (e.g. /products/delete)
router.get('/products/:productId', getProduct);

router.get('/cart', getCart);

router.get('/orders', getOrders);

router.get('/checkout', getCheckout);

router.get('/', getIndex);

module.exports = router;
