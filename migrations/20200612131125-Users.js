'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Users',
        'isAdmin',
        {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: '0'
        },
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'isAdmin')
    ]);
  }
};
