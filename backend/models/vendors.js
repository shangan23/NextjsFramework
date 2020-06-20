'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vendors = sequelize.define('Vendors', {
    name: DataTypes.STRING,
    contactName: DataTypes.STRING,
    number: DataTypes.STRING,
    email: DataTypes.STRING,
    designation: DataTypes.STRING,
    address: DataTypes.TEXT
  }, {});
  Vendors.associate = function(models) {
    Vendors.belongsTo(models.Users, { foreignKey: 'createdBy', as: 'fk_createdBy' });
    Vendors.belongsTo(models.Users, { foreignKey: 'updatedBy', as: 'fk_updatedBy' });
  };
  return Vendors;
};