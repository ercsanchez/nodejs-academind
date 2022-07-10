const fs = require('fs');
const path = require('path');
const db = require('../util/database');

const Cart = require('./cart');

const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json'
);

const getProductsFromFile = (callback) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      console.error(err);
      callback([]);
    } else {
      callback(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    // getProductsFromFile((products) => {
    //   // if product is already existing, it is an update to product's details
    //   if (this.id) {
    //     const existingProductIndex = products.findIndex(
    //       (prod) => prod.id === this.id
    //     );
    //     const updatedProducts = [...products];
    //     updatedProducts[existingProductIndex] = this;
    //     fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
    //       console.error(err);
    //     });
    //   } else {
    //     this.id = Math.random().toString();
    //     products.push(this);
    //     fs.writeFile(p, JSON.stringify(products), (err) => {
    //       console.error(err);
    //     });
    //   }
    // });
    return db.query(
      'INSERT INTO products(title, price, description, image_url) VALUES($1, $2, $3, $4)',
      [this.title, this.price, this.description, this.imageUrl]
    );
  }

  static fetchAll() {
    // getProductsFromFile(callback);
    return db.query('SELECT * FROM products');
  }

  static findById(id) {
    // getProductsFromFile((products) => {
    //   const product = products.find((prod) => prod.id === id);
    //   callback(product);
    // });
    return db.query('SELECT * FROM products WHERE id = $1', [id]);
  }

  static deleteById(id) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === id);
      const updatedProducts = products.filter((prod) => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        console.error(err);
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }
};
