'use strict';
module.exports = (sequelize, DataTypes) => {
  const SubItems = sequelize.define('SubItems', {
    quantity: DataTypes.INTEGER,
    cost: DataTypes.FLOAT
  }, {
      hooks: {
        beforeCreate: function (SubItems) {
          console.log('SubItems beforeCreate:', SubItems);
        }
      }
    });
  SubItems.associate = function (models) {
    SubItems.belongsTo(models.Items, { foreignKey: 'itemId', as: 'fk_itemId' });
    SubItems.belongsTo(models.Users, { foreignKey: 'createdBy', as: 'fk_createdBy' });
    SubItems.belongsTo(models.Users, { foreignKey: 'updatedBy', as: 'fk_updatedBy' });
  };
  return SubItems;
};