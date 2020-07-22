'use strict';
let hookController = require('../server/hooks');
module.exports = (sequelize, DataTypes) => {
  const BillsOfMaterial = sequelize.define('BillsOfMaterial', {
    code: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  BillsOfMaterial.associate = function (models) {
    BillsOfMaterial.belongsTo(models.Items, { foreignKey: 'itemId', as: 'fk_itemId' });
    BillsOfMaterial.belongsTo(models.Users, { foreignKey: 'createdBy', as: 'fk_createdBy' });
    BillsOfMaterial.belongsTo(models.Users, { foreignKey: 'updatedBy', as: 'fk_updatedBy' });
  };
  BillsOfMaterial.afterCreate(async function (si, options) {
    await hookController(si, options, { sourceModel: 'billsofmaterial', hookToExec: 'afterCreate' });
  });
  return BillsOfMaterial;
};