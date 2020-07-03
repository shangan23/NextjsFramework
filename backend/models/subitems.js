'use strict';
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
    try {
      var models = require('./index');
      await models.Items.findAll({ where: { id: si.dataValues.itemId } }).then(item => {
        si.dataValues.cost = (si.dataValues.quantity*item[0].dataValues.cost)
        console.log('module Cost', item[0].dataValues.cost);
        console.log(' si.dataValues.cost',  si.dataValues.cost);
        //return item[0];
      }).catch(err => {
        return err
      });
    } catch (err) {
      console.log('subItems', err);
    }
  });
  return SubItems;
};

