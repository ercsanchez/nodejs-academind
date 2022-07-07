const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products',
    });
  });
};

exports.getProduct = (req, res) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (prod) => {
    // console.log(product);
    res.render('shop/product-detail', {
      product: prod,
      pageTitle: prod.title,
      path: `/products`,
    });
  });
};

exports.getIndex = (req, res) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
    });
  });
};

exports.getCart = (req, res) => {
  Cart.fetchAll((products) => {
    res.render('shop/cart', {
      cart: products,
      pageTitle: 'Your Cart',
      path: '/cart',
    });
  });
};

exports.postToCart = (req, res) => {
  const prodId = req.body.productId;
  console.log(prodId);
  res.redirect('/cart');
};

exports.getOrders = (req, res) => {
  res.render('shop/orders', {
    pageTitle: 'Your Orders',
    path: '/orders',
  });
};

exports.getCheckout = (req, res) => {
  res.render('shop/checkout', { pageTitle: 'Checkout', path: '/checkout' });
};
