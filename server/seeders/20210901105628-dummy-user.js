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
    await queryInterface.bulkInsert('users', [
      {
        user_kakaoId: null,
        user_email: 'ohhaun@gmail.com',
        user_password: '111222',
        user_name: '오하운',
        user_nickname: '오계란',
        user_exp: 21,
        user_gender: '남',
        user_mobile: '01000000000',
        user_photo: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_kakaoId: null,
        user_email: 'kimhealth@gmail.com',
        user_password: '111222',
        user_name: '김건강',
        user_nickname: '김헬스',
        user_exp: 81,
        user_gender: '여',
        user_mobile: '01000000000',
        user_photo: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_kakaoId: null,
        user_email: 'kangpro@gmail.com',
        user_password: '111222',
        user_name: '강국대',
        user_nickname: '강프로',
        user_exp: 2,
        user_gender: '남',
        user_mobile: '01000000000',
        user_photo: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_kakaoId: null,
        user_email: 'bibimbab@gmail.com',
        user_password: '111222',
        user_name: '김비빔',
        user_nickname: '육회비빔밥',
        user_exp: 23,
        user_gender: '남',
        user_mobile: '01000000000',
        user_photo: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_kakaoId: null,
        user_email: 'challenger@gmail.com',
        user_password: '111222',
        user_name: '최린지',
        user_nickname: '브론즈',
        user_exp: 16,
        user_gender: '남',
        user_mobile: '01000000000',
        user_photo: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_kakaoId: null,
        user_email: 'godkao@gmail.com',
        user_password: '111222',
        user_name: '곽카오',
        user_nickname: '초코',
        user_exp: 42,
        user_gender: '여',
        user_mobile: '01000000000',
        user_photo: null,
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
     await queryInterface.bulkDelete('users', null, {});
  }
};
