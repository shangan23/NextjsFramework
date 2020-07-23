'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'SubItems',
        'moduleId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Items',
            key: 'id'
          }
        },
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('SubItems', 'moduleId')
    ]);
  }
};
