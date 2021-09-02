'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_kakaoId: {
        defaultValue: null,
        type: Sequelize.INTEGER
      },
      user_email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      user_password: {
        defaultValue: null,
        type: Sequelize.STRING
      },
      user_name: {
        defaultValue: "오하운",
        type: Sequelize.STRING
      },
      user_nickname: {
        defaultValue: null,
        type: Sequelize.STRING
      },
      user_exp: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      user_photo: {
        defaultValue: null,
        type: Sequelize.STRING
      },
      user_gender: {
        defaultValue: null,
        type: Sequelize.STRING
      },
      user_mobile: {
        defaultValue: null,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('users');
  }
};