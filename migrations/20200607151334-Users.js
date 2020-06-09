'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Users',
        'email',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Users',
        'fullName',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'email'),
      queryInterface.removeColumn('Users', 'fullName')
    ]);
  }
};
