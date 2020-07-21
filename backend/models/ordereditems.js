'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderedItems = sequelize.define('OrderedItems', {
    quantity: DataTypes.INTEGER,
    cost: DataTypes.FLOAT
  }, {});
  OrderedItems.associate = function (models) {
    // associations can be defined here
    OrderedItems.belongsTo(models.Items, { foreignKey: 'itemId', as: 'fk_itemId' });
  };
  return OrderedItems;
};