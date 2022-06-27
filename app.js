const path = require('path');
const express = require('express');
const bodyParser = require('body-parser'); // already added with expresse but removed before so safer to just install 3rd-party package

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const pathTo404Html = path.join(__dirname, 'views', '404.html');

// alternative to path.join
// less confusing but will produce wrong path on windows
// const pathToShopHtml = path.resolve(__dirname, '../views/404.html');

const app = express();

app.use(bodyParser.urlencoded({ extended: false })); // parses body of all requests

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// catch-all for unmatched routes
app.use((req, res) => {
  // res.status(404).send('<h1>Page not found.</h1>');
  res.status(404).sendFile(pathTo404Html);
});

app.listen(3500, () => {
  console.log('Server listening on port 3500!');
});
