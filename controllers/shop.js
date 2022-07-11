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
  // Product.fetchAll()
  //   .then(({ rows: products }) => {
  //     res.render('shop/product-list', {
  //       prods: products,
  //       pageTitle: 'All Products',
  //       path: '/products',
  //     });
  //   })
  //   .catch((err) => console.error(err));
  Product.findAll()
    .then((result) => {
      res.render('shop/product-list', {
        prods: result.map((product) => product.dataValues),
        pageTitle: 'All Products',
        path: '/products',
      });
    })
    .catch((err) => console.error(err));
};

exports.getProduct = (req, res) => {
  const prodId = req.params.productId;
  // Product.findById(prodId)
  //   .then(({ rows: prod }) => {
  //     console.log(prod[0]);
  //     res.render('shop/product-detail', {
  //       product: prod[0],
  //       pageTitle: prod.title,
  //       path: `/products`,
  //     });
  //   })
  //   .catch((err) => console.error(err));

  Product.findByPk(prodId)
    .then(({ dataValues: product }) => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products',
      });
    })
    .catch((err) => console.error(err));

  // alternative:
  // Product.findAll({ where: { id: prodId } })
  //   .then(([{ dataValues: product }]) => {
  //     res.render('shop/product-detail', {
  //       product: product,
  //       pageTitle: product.title,
  //       path: '/products',
  //     });
  //   })
  //   .catch((err) => console.error(err));
};

exports.getIndex = (req, res) => {
  Product.findAll()
    .then((result) => {
      res.render('shop/index', {
        prods: result.map((product) => product.dataValues),
        pageTitle: 'Shop',
        path: '/',
      });
    })
    .catch((err) => console.error(err));
};

exports.getCart = (req, res) => {
  // Cart.getCart((cart) => {
  //   Product.fetchAll((products) => {
  //     const cartProducts = [];
  //     for (const product of products) {
  //       const cartProductData = cart.products.find(
  //         (prod) => prod.id === product.id
  //       );
  //       if (cartProductData) {
  //         cartProducts.push({ data: product, qty: cartProductData.qty });
  //       }
  //     }
  //     res.render('shop/cart', {
  //       cart: cartProducts,
  //       pageTitle: 'Your Cart',
  //       path: '/cart',
  //     });
  //   });
  // });
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts();
    })
    .then((cartProducts) => {
      res.render('shop/cart', {
        cart: cartProducts,
        pageTitle: 'Your Cart',
        path: '/cart',
      });
    })
    .catch((err) => console.error(err));
};

exports.postCartDeleteProduct = (req, res) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

exports.postToCart = (req, res) => {
  const prodId = req.body.productId;

  // Product.findById(prodId, (product) => {
  //   Cart.addProduct(prodId, product.price);
  // });
  //
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(([product]) => {
      let newQty = 1;
      if (product) {
        //
      }
      return Product.findByPk(prodId)
        .then((product) => {
          return fetchedCart.addProduct(product, { through: { qty: newQty } });
        })
        .catch((err) => console.error(err));
    })
    .then((cart) => {
      res.redirect('/cart');
    })
    .catch((err) => console.error(err));
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
