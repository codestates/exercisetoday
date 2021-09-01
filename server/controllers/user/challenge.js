
module.exports = {
  get: (req ,res) =>{
    const user_id = req.query.user_id;
    // console.log(user_id);
    //TODO: sequelize로 user_id 검색 
    res.status(200).json({
      data: {
        challenges: [
          {
            "challenge_id" : 1,
            "challenge_name": "북한산...",
            "challenge_desc": "이 챌린지는...",
            "progress_rate": 60
          },
          {
            "challenge_id" : 2,
            "challenge_name": "누구나 할 수 있는 숨쉬기 챌린지",
            "challenge_desc": "이 챌린지는...",
            "progress_rate": 100
          },
          {
            "challenge_id" : 3,
            "challenge_name": "30일 바른 자세를 위한 플랭크 챌린지",
            "challenge_desc": "이 챌린지는...",
            "progress_rate": 100
          },
          {
            "challenge_id" : 4,
            "challenge_name": "한강크로스스위밍챌린지",
            "challenge_desc": "이 챌린지는...",
            "progress_rate": 100
          },
          {
            "challenge_id" : 5,
            "challenge_name": "헌드레드 스쿼트 챌린지",
            "challenge_desc": "이 챌린지는...",
            "progress_rate": 100
          }
        ]
      },
      message: "ok"
    });
  }
}