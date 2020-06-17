'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SiteSettings', [{
      title: 'GarlCRM',
      themeColor: '#f58634',
      adminEmail:'admin@garlinfo.com',
      footer:'© 2020 Garl CRM',
      dateFormat:'YYYY-DD-MM',
      timeFormat:'12hrs',
      logo:'logo.png',
      createdAt:Sequelize.literal('NOW()'),
      updatedAt:Sequelize.literal('NOW()')
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SiteSettings', null, {});
  }
};
