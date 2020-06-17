'use strict';
module.exports = (sequelize, DataTypes) => {
  const SiteSettings = sequelize.define('SiteSettings', {
    title: DataTypes.STRING,
    themeColor: DataTypes.STRING,
    adminEmail: DataTypes.STRING,
    footer: DataTypes.TEXT,
    dateFormat: DataTypes.STRING,
    timeFormat: DataTypes.STRING,
    logo: DataTypes.TEXT
  }, {});
  SiteSettings.associate = function(models) {
    // associations can be defined here
  };
  return SiteSettings;
};