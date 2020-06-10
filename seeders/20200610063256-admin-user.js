'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      fullName: 'Sovereign Admin',
      uname: 'sa',
      password: 'sa@123',
      email:'shankar@garlinfo.com',
      createdAt:Sequelize.literal('NOW()'),
      updatedAt:Sequelize.literal('NOW()')
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
