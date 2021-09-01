'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('progresses', [
      {
        progress_rate: 30,
        progress_buttons: JSON.stringify([
          { buttonId: 0, isFinished: true },
          { buttonId: 1, isFinished: true },
          { buttonId: 2, isFinished: true },
          { buttonId: 3, isFinished: false },
          { buttonId: 4, isFinished: false },
          { buttonId: 5, isFinished: false },
          { buttonId: 6, isFinished: false },
          { buttonId: 7, isFinished: false },
          { buttonId: 8, isFinished: false },
          { buttonId: 9, isFinished: false },
        ]),
        liked: true,
        userId: 1,
        challengeId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        progress_rate: 40,
        progress_buttons: JSON.stringify([
          { buttonId: 0, isFinished: true },
          { buttonId: 1, isFinished: true },
          { buttonId: 2, isFinished: true },
          { buttonId: 3, isFinished: true },
          { buttonId: 4, isFinished: true },
          { buttonId: 5, isFinished: true },
          { buttonId: 6, isFinished: false },
          { buttonId: 7, isFinished: false },
          { buttonId: 8, isFinished: false },
          { buttonId: 9, isFinished: false },
          { buttonId: 10, isFinished: false },
          { buttonId: 11, isFinished: false },
          { buttonId: 12, isFinished: false },
          { buttonId: 13, isFinished: false },
          { buttonId: 14, isFinished: false },
        ]),
        liked: true,
        userId: 1,
        challengeId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        progress_rate: 70,
        progress_buttons: JSON.stringify([
          { buttonId: 0, isFinished: true },
          { buttonId: 1, isFinished: true },
          { buttonId: 2, isFinished: true },
          { buttonId: 3, isFinished: true },
          { buttonId: 4, isFinished: false },
          { buttonId: 5, isFinished: true },
          { buttonId: 6, isFinished: true },
          { buttonId: 7, isFinished: true },
          { buttonId: 8, isFinished: false },
          { buttonId: 9, isFinished: false },
        ]),
        liked: true,
        userId: 2,
        challengeId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        progress_rate: 80,
        progress_buttons: JSON.stringify([
          { buttonId: 0, isFinished: true },
          { buttonId: 1, isFinished: true },
          { buttonId: 2, isFinished: true },
          { buttonId: 3, isFinished: true },
          { buttonId: 4, isFinished: true },
          { buttonId: 5, isFinished: true },
          { buttonId: 6, isFinished: true },
          { buttonId: 7, isFinished: true },
          { buttonId: 8, isFinished: true },
          { buttonId: 9, isFinished: true },
          { buttonId: 10, isFinished: false },
          { buttonId: 11, isFinished: true },
          { buttonId: 12, isFinished: true },
          { buttonId: 13, isFinished: false },
          { buttonId: 14, isFinished: false },
        ]),
        liked: true,
        userId: 3,
        challengeId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        progress_rate: 50,
        progress_buttons: JSON.stringify([
          { buttonId: 0, isFinished: true },
          { buttonId: 1, isFinished: true },
          { buttonId: 2, isFinished: true },
          { buttonId: 3, isFinished: true },
          { buttonId: 4, isFinished: false },
          { buttonId: 5, isFinished: true },
          { buttonId: 6, isFinished: false },
          { buttonId: 7, isFinished: false },
          { buttonId: 8, isFinished: false },
          { buttonId: 9, isFinished: false },
          { buttonId: 10, isFinished: true },
          { buttonId: 11, isFinished: true },
          { buttonId: 12, isFinished: true },
          { buttonId: 13, isFinished: true },
          { buttonId: 14, isFinished: false },
          { buttonId: 15, isFinished: false },
          { buttonId: 16, isFinished: false },
          { buttonId: 17, isFinished: true },
          { buttonId: 18, isFinished: false },
          { buttonId: 19, isFinished: false },
        ]),
        liked: true,
        userId: 4,
        challengeId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        progress_rate: 40,
        progress_buttons: JSON.stringify([
          { buttonId: 0, isFinished: true },
          { buttonId: 1, isFinished: true },
          { buttonId: 2, isFinished: true },
          { buttonId: 3, isFinished: true },
          { buttonId: 4, isFinished: true },
          { buttonId: 5, isFinished: true },
          { buttonId: 6, isFinished: false },
          { buttonId: 7, isFinished: false },
          { buttonId: 8, isFinished: false },
          { buttonId: 9, isFinished: false },
          { buttonId: 10, isFinished: false },
          { buttonId: 11, isFinished: false },
          { buttonId: 12, isFinished: false },
          { buttonId: 13, isFinished: false },
          { buttonId: 14, isFinished: false },
        ]),
        liked: true,
        userId: 5,
        challengeId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        progress_rate: 33,
        progress_buttons: JSON.stringify([
          { buttonId: 0, isFinished: true },
          { buttonId: 1, isFinished: true },
          { buttonId: 2, isFinished: true },
          { buttonId: 3, isFinished: true },
          { buttonId: 4, isFinished: true },
          { buttonId: 5, isFinished: false },
          { buttonId: 6, isFinished: false },
          { buttonId: 7, isFinished: false },
          { buttonId: 8, isFinished: false },
          { buttonId: 9, isFinished: false },
          { buttonId: 10, isFinished: false },
          { buttonId: 11, isFinished: false },
          { buttonId: 12, isFinished: false },
          { buttonId: 13, isFinished: false },
          { buttonId: 14, isFinished: false },
        ]),
        liked: true,
        userId: 6,
        challengeId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('progresses', null, {});
  }
};
