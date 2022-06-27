const path = require('path');
const express = require('express');

const pathToAddProductHtml = path.join(
  __dirname,
  '..',
  'views',
  'add-product.html'
);

// alternative to path.join
// less confusing but will produce wrong path on windows
// const pathToShopHtml = path.resolve(__dirname, '../views/add-product.html');

const router = express.Router();

router.get('/add-product', (req, res) => {
  console.log('In /add-product middleware');
  res.sendFile(pathToAddProductHtml);
});

router.post('/add-product', (req, res) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;
