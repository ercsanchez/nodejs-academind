const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  console.log('In / middleware'); // also executes for '/add-product' since also a match
  res.send('<h1>Hello from Express!</h1>'); // won't execute for '/add-product'
});

module.exports = router;
