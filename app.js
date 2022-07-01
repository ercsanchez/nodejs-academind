const path = require('path');
const express = require('express');
const bodyParser = require('body-parser'); // already added with express but removed before so safer to just install 3rd-party package

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const get404 = require('./controllers/error');

// const pathTo404Html = path.join(__dirname, 'views', '404.html');

// alternative to path.join
// less confusing but will produce wrong path on windows
// const pathToShopHtml = path.resolve(__dirname, '../views/404.html');

const app = express();

// set the view engine
app.set('view engine', 'ejs');
// set the html templates dir
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false })); // parses body of all requests
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// catch-all for unmatched routes
app.use(get404);

app.listen(3500, () => {
  console.log('Server listening on port 3500!');
});
