'use strict';
module.exports = (sequelize, DataTypes) => {
  const BomItem = sequelize.define('BomItem', {
    quantity: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {});
  BomItem.associate = function (models) {
    BomItem.belongsTo(models.BillsOfMaterial, { foreignKey: 'moduleId', as: 'fk_moduleId' });
    BomItem.belongsTo(models.Items, { foreignKey: 'itemId', as: 'fk_itemId' });
    BomItem.belongsTo(models.Users, { foreignKey: 'createdBy', as: 'fk_createdBy' });
    BomItem.belongsTo(models.Users, { foreignKey: 'updatedBy', as: 'fk_updatedBy' });
  };
  return BomItem;
};