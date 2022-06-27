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

router.get('/add-product', (req, res) => {
  console.log('In /add-product middleware');
  console.log(rootProjDir);
  res.sendFile(pathToAddProductHtml);
});

router.post('/add-product', (req, res) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;
