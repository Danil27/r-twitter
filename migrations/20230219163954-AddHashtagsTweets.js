'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('HashtagsTweets', {
      hashtag_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'Hashtags',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      tweet_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'Tweets',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('HashtagsTweets');
  },
};
