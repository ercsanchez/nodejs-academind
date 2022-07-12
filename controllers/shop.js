const Product = require('../models/product');

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
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(([product]) => {
      return product.cart_item.destroy();
    })
    .then((result) => {
      res.redirect('/cart');
    })
    .catch((err) => console.error(err));
};

exports.postToCart = (req, res) => {
  const prodId = req.body.productId;

  // Product.findById(prodId, (product) => {
  //   Cart.addProduct(prodId, product.price);
  // });
  //
  let fetchedCart;
  let newQty = 1;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(([product]) => {
      if (product) {
        const oldQty = product.cart_item.qty;
        newQty = oldQty + 1;
        return Promise.resolve(product);
      }
      return Product.findByPk(prodId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, { through: { qty: newQty } });
    })
    .then((cart) => {
      res.redirect('/cart');
    })
    .catch((err) => console.error(err));
};

exports.postOrder = (req, res) => {
  let cartProducts;
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      cartProducts = products;
      return req.user.createOrder();
    })
    .then((order) => {
      return order.addProducts(
        cartProducts.map((prod) => {
          prod.order_item = { qty: prod.cart_item.qty };
          return prod;
        })
      );
    })
    .then((result) => {
      return fetchedCart.setProducts(null);
    })
    .then((result) => {
      res.redirect('/orders');
    })
    .catch((err) => console.error(err));
};

exports.getOrders = (req, res) => {
  req.user
    .getOrders({ include: ['products'] }) // eager load products table so that we can access the order_items join table
    .then((orders) => {
      // console.log('look here=> ', orders[0].products[0].order_item);
      res.render('shop/orders', {
        pageTitle: 'Your Orders',
        path: '/orders',
        orders: orders,
      });
    })
    .catch((err) => console.error(err));
};

exports.getCheckout = (req, res) => {
  res.render('shop/checkout', { pageTitle: 'Checkout', path: '/checkout' });
};
