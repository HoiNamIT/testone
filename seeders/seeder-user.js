'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Users', [
      {
        email:'xample@example.com',
        password:'123456',
        firstName: 'John',
        lastName: 'Does',
        address: 'VN',
        gender: 1,
        rodeId:'rode 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
