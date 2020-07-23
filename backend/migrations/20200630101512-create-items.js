'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      sku: {
        type: Sequelize.STRING
      },
      units: {
        type: Sequelize.INTEGER
      },
      cost: {
        type: Sequelize.FLOAT
      },
      costDescription: {
        type: Sequelize.TEXT
      },
      openingStock: {
        type: Sequelize.FLOAT
      },
      preorderLevel: {
        type: Sequelize.FLOAT
      },
      vendorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Vendors',
          key: 'id'
        }
      }, createdBy: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      updatedBy: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
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
    return queryInterface.dropTable('Items');
  }
};