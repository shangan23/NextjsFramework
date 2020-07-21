'use strict';
module.exports = (sequelize, DataTypes) => {
  const Inventory = sequelize.define('Inventory', {
    onAvailable: DataTypes.NUMBER,
    onOrder: DataTypes.NUMBER,
    onHand: DataTypes.NUMBER
  }, {});
  Inventory.associate = function(models) {
    Inventory.belongsTo(models.Items, { foreignKey: 'itemId', as: 'fk_itemId' });
    Inventory.belongsTo(models.Users, { foreignKey: 'createdBy', as: 'fk_createdBy' });
    Inventory.belongsTo(models.Users, { foreignKey: 'updatedBy', as: 'fk_updatedBy' });
  };
  return Inventory;
};