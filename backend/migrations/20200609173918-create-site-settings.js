'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SiteSettings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      themeColor: {
        type: Sequelize.STRING
      },
      adminEmail: {
        type: Sequelize.STRING
      },
      footer: {
        type: Sequelize.TEXT
      },
      dateFormat: {
        type: Sequelize.STRING
      },
      timeFormat: {
        type: Sequelize.STRING
      },
      logo: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SiteSettings');
  }
};