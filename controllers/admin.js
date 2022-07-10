const Product = require('../models/product');
const get404 = require('./error');

exports.getAddProduct = (req, res) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: 'false',
  });
};

exports.postAddProduct = (req, res) => {
  console.log(req.body);
  const { title, imageUrl, price, description } = req.body;
  // const product = new Product(null, title, imageUrl, description, price);
  // product
  //   .save()
  //   .then((result) => {
  //     console.log('successfully added product');
  //     res.redirect('/');
  //   })
  //   .catch((err) => console.error(err));
  Product.create({
    title,
    image_url: imageUrl,
    price,
    description,
  })
    .then((result) => {
      // console.log(result);
      res.redirect('/');
    })
    .catch((err) => console.error(err));
};

exports.getEditProduct = (req, res) => {
  const editMode = req.query.edit;

  // redundant since we only execute this controller if
  // we intentionally edit product's details
  if (editMode !== 'true') {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId, (prod) => {
    // check if there is no product
    if (!prod) {
      return get404(req, res);
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: `/admin/edit-product/${prodId}`,
      editing: editMode,
      product: prod,
    });
  });
};

exports.postEditProduct = (req, res) => {
  const prodId = req.body.productId;
  const { title, imageUrl, price, description } = req.body;
  const updatedProduct = new Product(
    prodId,
    title,
    imageUrl,
    description,
    price
  );
  updatedProduct.save();
  res.redirect('/admin/products');
};

exports.getAdminProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
    });
  });
};

exports.postDeleteProduct = (req, res) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect('/admin/products');
};
