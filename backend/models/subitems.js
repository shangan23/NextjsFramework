'use strict';
let hookController = require('../server/hooks');
module.exports = (sequelize, DataTypes) => {
  const SubItems = sequelize.define('SubItems', {
    quantity: DataTypes.INTEGER,
    cost: DataTypes.FLOAT
  }, {});
  SubItems.associate = function (models) {
    SubItems.belongsTo(models.Items, { foreignKey: 'itemId', as: 'fk_itemId' });
    SubItems.belongsTo(models.Items, { foreignKey: 'moduleId', as: 'fk_moduleId' });
    SubItems.belongsTo(models.Users, { foreignKey: 'createdBy', as: 'fk_createdBy' });
    SubItems.belongsTo(models.Users, { foreignKey: 'updatedBy', as: 'fk_updatedBy' });
  };
  SubItems.beforeCreate(async function (si, options) {
    await hookController(si, options, { sourceModel: 'subitems', hookToExec: 'beforeCreate' });
  });
  return SubItems;
};

