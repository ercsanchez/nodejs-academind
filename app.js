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
const { nextTick } = require('process');

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

// app.use only registers the middleware and doesn't execute the callback func passed to it
// npm start executes the app.use and sequelize.sync
// callback func is only executed for incoming requests or when you finally go through a
// route (after app is running), so there will be no error even when a User is nonexistent
// before running app since it will be created before we get to a route
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      console.log('currentUser', user.dataValues);
      // user obj here includes all methods and props of sequelize User model instance
      req.user = user;
      next();
    })
    .catch((err) => console.error(err));
});

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
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      console.log('no user found', user);
      return User.create({ name: 'John Doe', email: 'johndoe@mail.com' });
    }
    // in order to make sure that user is still a promise to be consistent
    // if a user is created in the if block above, however this is optional, since
    // anything returned inside of a then block is automatically wrapped in a promise
    return Promise.resolve(user);
  })
  .then((user) => {
    // console.log(user.dataValues);
    app.listen(3500, () => {
      console.log('Server listening on port 3500!');
    });
  })
  .catch((err) => console.error(err));
