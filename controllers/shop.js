const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res) => {
  // Product.fetchAll((products) => {
  //   res.render('shop/product-list', {
  //     prods: products,
  //     pageTitle: 'All Products',
  //     path: '/products',
  //   });
  // });
  Product.fetchAll()
    .then(({ rows: products }) => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
      });
    })
    .catch((err) => console.error(err));
};

exports.getProduct = (req, res) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(({ rows: prod }) => {
      console.log(prod[0]);
      res.render('shop/product-detail', {
        product: prod[0],
        pageTitle: prod.title,
        path: `/products`,
      });
    })
    .catch((err) => console.error(err));
};

exports.getIndex = (req, res) => {
  Product.fetchAll()
    .then(({ rows: products }) => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
      });
    })
    .catch((err) => console.error(err));
};

exports.getCart = (req, res) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (const product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ data: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        cart: cartProducts,
        pageTitle: 'Your Cart',
        path: '/cart',
      });
    });
  });
};

exports.postCartDeleteProduct = (req, res) => {
  const prodId = req.body.productId;
  console.log('1=> ', prodId);
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    console.log('2=> ', product);
    res.redirect('/cart');
  });
};

exports.postToCart = (req, res) => {
  const prodId = req.body.productId;
  console.log(prodId);
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
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
