const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(require.main.filename), 'data', 'cart.json');

const getCartFromFile = (callback) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      console.error(err);
      callback([]);
    } else {
      callback(JSON.parse(fileContent));
    }
  });
};

module.exports = class Cart {
  constructor(title) {
    this.title = title;
  }

  save() {
    getCartFromFile((cart) => {
      cart.push(this);
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.error(err);
      });
    });
  }

  static fetchAll(callback) {
    getCartFromFile(callback);
  }
};
