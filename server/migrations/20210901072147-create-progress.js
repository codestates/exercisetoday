'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('progresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      progress_rate: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      progress_buttons: {
        allowNull: false,
        type: Sequelize.JSON
      },
      userId: {
        type: Sequelize.INTEGER
      },
      challengeId: {
        type: Sequelize.INTEGER
      },
      liked: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      updatedAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('progresses');
  }
};