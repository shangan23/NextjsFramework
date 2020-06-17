'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Customers', [{
      name: 'GarlCRM',
      contactName: 'Suresh R',
      contactMobile: '+91 9626769738',
      contactTelephone: '0422-2414450',
      contactEmail: 'admin@garlinfo.com',
      contactDesignation: 'Managing Director',
      address: 'NO.41,A and B, s.no.4 Rajpriya G Avenue,, Avinashi Road, Sitra, Coimbatore, Tamil Nadu 641014',
      createdBy: 1,
      updatedBy: 1,
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Customers', null, {});
  }
};
