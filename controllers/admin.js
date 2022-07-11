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
  // console.log(req.body);
  const { title, imageUrl, price, description } = req.body;

  // const { id: currentUserId } = req.user.dataValues;
  // Product.create({
  //   title,
  //   image_url: imageUrl,
  //   price,
  //   description,
  //   userId: currentUserId,
  // })

  //shortcut to commented out code | sequelize feature for associations
  req.user
    .createProduct({
      title,
      image_url: imageUrl,
      price,
      description,
    })
    .then((result) => {
      res.redirect('/admin/products');
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
  Product.findByPk(prodId)
    .then(({ dataValues }) => {
      if (!dataValues) {
        return get404(req, res);
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: `/admin/edit-product/${prodId}`,
        editing: editMode,
        product: dataValues,
      });
    })
    .catch((err) => console.error(err));
};

exports.postEditProduct = (req, res) => {
  const prodId = req.body.productId;
  const { title, imageUrl, price, description } = req.body;
  Product.update(
    { title, price, description, image_url: imageUrl },
    { where: { id: prodId } }
  )
    .then((result) => {
      res.redirect('/admin/products');
    })
    .catch((err) => console.error(err));
};

exports.getAdminProducts = (req, res) => {
  Product.findAll()
    .then((result) => {
      res.render('admin/products', {
        prods: result.map(({ dataValues }) => dataValues),
        pageTitle: 'Admin Products',
        path: '/admin/products',
      });
    })
    .catch((err) => console.error(err));
};

exports.postDeleteProduct = (req, res) => {
  const prodId = req.body.productId;
  // Product.deleteById(prodId);

  Product.destroy({ where: { id: prodId } })
    .then((result) => {
      res.redirect('/admin/products');
    })
    .catch((err) => console.error(err));
  // alternative solution
  // Product.findByPk(prodId)
  //   .then((result) => {
  //     return result.destroy();
  //   })
  //   .then((result) => {
  //     res.redirect('/admin/products');
  //   })
  //   .catch((err) => console.error(err));
};
