'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createSchema('public')
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropSchema('public');
  },
};
