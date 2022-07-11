const path = require('path');
const express = require('express');
const bodyParser = require('body-parser'); // already added with express but removed before so safer to just install 3rd-party package

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const get404 = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const { userInfo } = require('os');

// const pathTo404Html = path.join(__dirname, 'views', '404.html');

// alternative to path.join
// less confusing but will produce wrong path on windows
// const pathToShopHtml = path.resolve(__dirname, '../views/404.html');

const app = express();

// test postgresql connection =================================================
sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((err) => console.error(err));
// test postgresql connection =================================================

// set the view engine
app.set('view engine', 'ejs');
// set the html templates dir
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false })); // parses body of all requests
app.use(express.static(path.join(__dirname, 'public')));

// test postgresql connection | query all rows of test_table
app.use('/pgtest', (req, res) => {
  db.query('SELECT * FROM products ORDER BY id ASC')
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((err) => console.error(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// catch-all for unmatched routes
app.use(get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

sequelize
  .sync({ alter: true })
  .then((result) => {
    console.log(result);
    app.listen(3500, () => {
      console.log('Server listening on port 3500!');
    });
  })
  .catch((err) => console.error(err));
