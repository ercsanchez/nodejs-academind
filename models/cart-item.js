const { DataTypes } = require('sequelize');

const sequelize = require('../util/database');

const CartItem = sequelize.define('cart_item', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  qty: DataTypes.INTEGER,
});

module.exports = CartItem;
