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
    await queryInterface.bulkInsert('challenges', [
      {
        challenge_name: "30분 데일리 러닝 챌린지",
        challenge_desc: "1일 1회 자신이 원하는 장소에서 30분 이상 러닝하는 챌린지입니다.매일 러닝 후에 해당 일에 맞는 버튼을 클릭하고 댓글로 공유해주세요.",
        challenge_btn_cnt: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        challenge_name: "위캔드 클라이밍 챌린지",
        challenge_desc: "모험과 도전을 즐기는 분들에게 알맞은 개별 미션 챌린지입니다.주말마다 실내 클라이밍장을 이용하여 클라이밍에 도전하여 해당 일에 맞는 버튼을 클릭하고 댓글로 공유해주세요.",
        challenge_btn_cnt: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        challenge_name: "하드코어 홈트레이닝 챌린지",
        challenge_desc: "집 또는 안전한 실내 및 실외에서 자신만의 운동으로 트레이닝하는 챌린지입니다.스쿼트, 플랭크 등 어떠한 운동이든 상관없으며, 트레이닝 후에 해당 일에 맞는 버튼 클릭과 함께 댓글로 본인만의 운동 방법을 공유해주세요",
        challenge_btn_cnt: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        challenge_name: "자전거 출퇴근 챌린지",
        challenge_desc: "온실가스와 미세먼지 감축은 물론 참여자의 건강을 동시에 지킬 수 있는 개별 미션 챌린지입니다.매일 자전거로 출퇴근 후에 해당 일에 맞는 버튼을 클릭하고 댓글로 공유해주세요.",
        challenge_btn_cnt: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        challenge_name: "30일 바른 자세를 위한 플랭크 챌린지",
        challenge_desc: "챌린지 설명입니다1",
        challenge_btn_cnt: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        challenge_name: "한강크로스스위밍챌린지",
        challenge_desc: "챌린지 설명입니다2",
        challenge_btn_cnt: 25,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        challenge_name: "헌드레드 스쿼트 챌린지",
        challenge_desc: "챌린지 설명입니다4",
        challenge_btn_cnt: 100,
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
     await queryInterface.bulkDelete('challenges', null, {});
  }
};
