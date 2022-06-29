const path = require('path');
const express = require('express');

const adminData = require('./admin');

// only concatenates
// const pathToShopHtml = path.join(__dirname, '..', 'views', 'shop.html');

// alternative to path.join
// less confusing but will produce wrong path on windows
// const pathToShopHtml = path.resolve(__dirname, '../views/shop.html');

const router = express.Router();

router.get('/', (req, res) => {
  console.log('In / middleware'); // also executes for '/add-product' since also a match
  // console.log(pathToShopHtml);
  const products = adminData.products;
  console.log('products: ', adminData.products);
  // res.sendFile(pathToShopHtml);
  res.render('shop', { prods: products, pageTitle: 'Shop', path: '/' });
});

module.exports = router;
