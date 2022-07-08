const path = require('path');
const express = require('express');

const {
  getAddProduct,
  postAddProduct,
  getAdminProducts,
  getEditProduct,
} = require('../controllers/admin');

// alternative import
// const productsController = require('../controllers/products');
// productsController.getAddProduct & productsController.postAddProduct

const router = express.Router();

router.get('/add-product', getAddProduct);

router.get('/products', getAdminProducts);

router.post('/add-product', postAddProduct);

router.get('/edit-product/:productId', getEditProduct);

module.exports = router;
