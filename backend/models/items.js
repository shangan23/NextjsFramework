'use strict';
module.exports = (sequelize, DataTypes) => {
  const Items = sequelize.define('Items', {
    name: DataTypes.STRING,
    sku: DataTypes.STRING,
    units: DataTypes.INTEGER,
    cost: DataTypes.FLOAT,
    costDescription: DataTypes.TEXT,
    openingStock: DataTypes.FLOAT,
    preorderLevel: DataTypes.FLOAT
  }, {});
  Items.associate = function (models) {
    Items.belongsTo(models.Vendors, { foreignKey: 'vendorId', as: 'fk_vendorId' });
    Items.belongsTo(models.Users, { foreignKey: 'createdBy', as: 'fk_createdBy' });
    Items.belongsTo(models.Users, { foreignKey: 'updatedBy', as: 'fk_updatedBy' });
  };
  return Items;
};