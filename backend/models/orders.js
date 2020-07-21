'use strict';
let hookController = require('../server/hooks');
module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define('Orders', {
    orderId: DataTypes.STRING,
    orderDate: DataTypes.DATE,
    deliveryDate: DataTypes.DATE,
    customerNotes: DataTypes.TEXT,
    orderedItems: DataTypes.JSONB,
    orderStatus: {
      type: DataTypes.ENUM,
      values: ['confirmed', 'underway', 'completed', 'cancelled']
    }
  }, {});
  Orders.associate = function (models) {
    Orders.belongsTo(models.Customers, { foreignKey: 'customerId', as: 'fk_customerId' });
    Orders.belongsTo(models.Users, { foreignKey: 'soldBy', as: 'fk_soldBy' });
    Orders.belongsTo(models.Users, { foreignKey: 'createdBy', as: 'fk_createdBy' });
    Orders.belongsTo(models.Users, { foreignKey: 'updatedBy', as: 'fk_updatedBy' });
  };
  Orders.afterCreate(async function (si, options) {
    await hookController(si, options, { sourceModel: 'orders', hookToExec: 'afterCreate' });
  });
  Orders.afterUpdate(async function (si, options) {
    await hookController(si, options, { sourceModel: 'orders', hookToExec: 'afterUpdate' });
  });
  return Orders;
};