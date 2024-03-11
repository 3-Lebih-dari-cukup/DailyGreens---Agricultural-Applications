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

    await queryInterface.bulkInsert('fruits', [
      {
        "name": "Mangga",
        "description": "Buah Mangga segar dari Eropa",
        "price": 15000,
        "stock": 2,
        "address": "Bandung",
        "seller": "Mang Asep",
        "image": "/images/fruits/manggo.jpg"
      },
      {
        "name": "apel",
        "description": "Buah apel segar dari Jepang",
        "price": 25000,
        "stock": 6,
        "address": "Cimahi",
        "seller": "Mang Ago",
        "image": "/images/fruits/apple.jpg"
      },
      {
        "name": "Watermelon",
        "description": "Buah semangka segar dari banjarmasin",
        "price": 5000,
        "stock": 122,
        "address": "Jakarta",
        "seller": "Mang Toman",
        "image": "/images/fruits/watermelon.jpg"
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
