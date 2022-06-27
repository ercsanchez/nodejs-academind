// const http = require('http');

const express = require('express');
const bodyParser = require('body-parser'); // already added with expresse but removed before so safer to just install 3rd-party package

const app = express();

app.use(bodyParser.urlencoded({ extended: false })); // parses body of all requests

// app.use('/', (req, res, next) => {
//   console.log('This middleware always runs');
//   next(); // pass the same req on to next middleware to be able to use it for res
// });

app.get('/add-product', (req, res) => {
  console.log('In /add-product middleware');
  res.send(`
    <form action="/product" method="POST">
      <input type="text" name="title" />
      <button type="submit">Add Product</button>
    </form>
  `);
});

app.post('/product', (req, res) => {
  console.log(req.body);
  res.redirect('/');
});

app.use('/', (req, res) => {
  console.log('In / middleware'); // also executes for '/add-product' since also a match
  res.send('<h1>Hello from Express!</h1>'); // won't execute for '/add-product'
});

// const server = http.createServer(app);
// server.listen(3500, () => {
//   console.log('Server listening on port 3500!');
// });

app.listen(3500, () => {
  console.log('Server listening on port 3500!');
});
