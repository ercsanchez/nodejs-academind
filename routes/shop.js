const path = require('path');
const express = require('express');

// only concatenates
const pathToShopHtml = path.join(__dirname, '..', 'views', 'shop.html');

// alternative to path.join
// less confusing but will produce wrong path on windows
// const pathToShopHtml = path.resolve(__dirname, '../views/shop.html');

const router = express.Router();

router.get('/', (req, res) => {
  console.log('In / middleware'); // also executes for '/add-product' since also a match
  console.log(pathToShopHtml);
  res.sendFile(pathToShopHtml);
});

module.exports = router;
