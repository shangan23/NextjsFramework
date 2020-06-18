'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customers = sequelize.define('Customers', {
    name: DataTypes.STRING,
    contactName: DataTypes.STRING,
    contactMobile: DataTypes.STRING,
    contactTelephone: DataTypes.STRING,
    contactEmail: DataTypes.STRING,
    contactDesignation: DataTypes.STRING,
    address: DataTypes.TEXT
  }, {});
  Customers.associate = function (models) {
    Customers.belongsTo(models.Users, { foreignKey: 'createdBy', as: 'fk_createdBy' });
    Customers.belongsTo(models.Users, { foreignKey: 'updatedBy', as: 'fk_updatedBy' });
  };
  return Customers;
};