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
     await queryInterface.bulkInsert('comments', [
      {
        comment_content: "주말엔 역시 클라이밍이지",
        userId: 1,
        challengeId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        comment_content: "집에서 한다고 살살할 수 없죠",
        userId: 1,
        challengeId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        comment_content: "중간에 한 주 빼먹었지만 클라이밍 도전 거의 다 끝나가네요",
        userId: 2,
        challengeId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        comment_content: "하루키처럼 매일매일 달리기 중입니다",
        userId: 2,
        challengeId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        comment_content: "드디어 2년전에 산 로드 자전거 쓸 수 있겠네요",
        userId: 4,
        challengeId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        comment_content: "“군대 전역 이후로 달리는 건 처음이에요",
        userId: 5,
        challengeId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        comment_content: "와... 1일차에는 너무 힘들었어요",
        userId: 6,
        challengeId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
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
    await queryInterface.bulkDelete('comments', null, {});
  }
};
