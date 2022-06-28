const path = require('path');
const express = require('express');

const rootProjDir = require('../util/root-dir');

const pathToAddProductHtml = path.join(
  rootProjDir,
  'views',
  'add-product.html'
);

// alternative to path.join
// less confusing but will produce wrong path on windows
// const pathToShopHtml = path.resolve(__dirname, '../views/add-product.html');

const router = express.Router();

const products = [];

router.get('/add-product', (req, res) => {
  console.log('In /add-product middleware');
  console.log(rootProjDir);
  res.sendFile(pathToAddProductHtml);
});

router.post('/add-product', (req, res) => {
  // console.log(req.body);
  products.push({ title: req.body.title });
  console.log('products: ', products);
  res.redirect('/');
});

// module.exports = router;

exports.routes = router;
exports.products = products;

// alternative method of exporting

// module.exports = {
//   routes: router,
//   products,
// };
