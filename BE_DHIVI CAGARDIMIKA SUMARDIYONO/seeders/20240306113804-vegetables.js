'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('vegetables', [
      {
        "name": "Bayam",
        "description": "Sayur bayam segar dari london",
        "price": 15000,
        "stock": 2,
        "address": "London",
        "seller": "Bu Timah",
        "image": "/images/vegetables/spinach.jpg"
      },
      {
        "name": "Kangkung",
        "description": "Sayur Kangkung segar dari Eropa",
        "price": 15000,
        "stock": 5,
        "address": "Bandung",
        "seller": "King Kong",
        "image": "/images/vegetables/lettuce.jpg"
      },
      {
        "name": "Bawang",
        "description": "Bawang dari jepang",
        "price": 115000,
        "stock": 22,
        "address": "Jepang",
        "seller": "Ryo Hitoshi",
        "image": "/images/vegetables/onion.jpg"
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
