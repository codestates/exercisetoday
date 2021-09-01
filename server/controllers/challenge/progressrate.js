const dummy = {progressU2C1: {
  "progress_id" : 1,
  "user_id" : 2,
  "challenge_id" : 1,
  "challenge_name" : "30분 데일리 러닝 챌린지",
  "challenge_desc" : "1일 1회 자신이 원하는 장소에서 30분 이상 러닝하는 챌린지입니다.\n매일 러닝 후에 해당 일에 맞는 버튼을 클릭하고 댓글로 공유해주세요.",
  "progress_rate" : 40,
  "progress_buttons" : [
    { buttonId: 0, isFinished: true },
    { buttonId: 1, isFinished: true },
    { buttonId: 2, isFinished: true },
    { buttonId: 3, isFinished: true },
    { buttonId: 4, isFinished: false },
    { buttonId: 5, isFinished: false },
    { buttonId: 6, isFinished: false },
    { buttonId: 7, isFinished: false },
    { buttonId: 8, isFinished: false },
    { buttonId: 9, isFinished: false },
  ],
  "progress_liked" : false,
  "challenge_likes" : 35, 
  "created_at": new Date(),
  "updated_at": new Date(),   
},
progressU1C2: {
  "progress_id" : 2,
  "user_id" : 1,
  "challenge_id" : 2,
  "challenge_name" : "위캔드 클라이밍 챌린지",
  "challenge_desc" : "모험과 도전을 즐기는 분들에게 알맞은 개별 미션 챌린지입니다.\n주말마다 실내 클라이밍장을 이용하여 클라이밍에 도전하여 해당 일에 맞는 버튼을 클릭하고 댓글로 공유해주세요.",
  "progress_rate" : 50,
  "progress_buttons" : [
    { buttonId: 0, isFinished: true },
    { buttonId: 1, isFinished: false },
    { buttonId: 2, isFinished: true },
    { buttonId: 3, isFinished: true },
    { buttonId: 4, isFinished: true },
    { buttonId: 5, isFinished: false },
    { buttonId: 6, isFinished: true },
    { buttonId: 7, isFinished: true },
    { buttonId: 8, isFinished: false },
    { buttonId: 9, isFinished: false },
    { buttonId: 10, isFinished: false },
    { buttonId: 11, isFinished: false },
  ],
  "progress_liked" : true,
  "challenge_likes" : 23, 
  "created_at": new Date(),
  "updated_at": new Date(),   
},
progressU3C3: {
  "progress_id" : 3,
  "user_id" : 3,
  "challenge_id" : 3,
  "challenge_name" : "하드코어 홈트레이닝 챌린지",
  "challenge_desc" : "집 또는 안전한 실내 및 실외에서 자신만의 운동으로 트레이닝하는 챌린지입니다.\n스쿼트, 플랭크 등 어떠한 운동이든 상관없으며, 트레이닝 후에 해당 일에 맞는 버튼 클릭과 함께 댓글로 본인만의 운동 방법을 공유해주세요.",
  "progress_rate" : 0,
  "progress_buttons" : [
    { buttonId: 0, isFinished: false },
    { buttonId: 1, isFinished: false },
    { buttonId: 2, isFinished: false },
    { buttonId: 3, isFinished: false },
    { buttonId: 4, isFinished: false },
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
  ],
  "progress_liked" : false,
  "challenge_likes" : 67, 
  "created_at": new Date(),
  "updated_at": new Date(),   
},
progressU6C4: {
  "progress_id" : 4,
  "user_id" : 6,
  "challenge_id" : 4,
  "challenge_name" : "자전거 출퇴근 챌린지",
  "challenge_desc" : "온실가스와 미세먼지 감축은 물론 참여자의 건강을 동시에 지킬 수 있는 개별 미션 챌린지입니다.\n매일 자전거로 출퇴근 후에 해당 일에 맞는 버튼을 클릭하고 댓글로 공유해주세요.",
  "progress_rate" : 0,
  "progress_buttons" : [
    { buttonId: 0, isFinished: false },
    { buttonId: 1, isFinished: false },
    { buttonId: 2, isFinished: false },
    { buttonId: 3, isFinished: false },
    { buttonId: 4, isFinished: false },
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
    { buttonId: 15, isFinished: false },
    { buttonId: 16, isFinished: false },
    { buttonId: 17, isFinished: false },
    { buttonId: 18, isFinished: false },
    { buttonId: 19, isFinished: false }
  ],
  "progress_liked" : false,
  "challenge_likes" : 102, 
  "created_at": new Date(),
  "updated_at": new Date(),   
}
}



module.exports = {
  

  get: (req, res) => {

    const userId = Number(req.query.user_id);
    const challengeId = Number(req.query.challenge_id);
    
    console.log(challengeId)

    // TODO Sequelize 로 정보 받아옴




    if(challengeId === 2) {
      res.status(200).json({
        data: dummy.progressU1C2,
        message: "ok"
      })
    } else if(challengeId === 1) {
      res.status(200).json({
        data: dummy.progressU2C1,
        message: "ok"
      })
    } else if(challengeId === 3) {
      res.status(200).json({
        data: {
          "challenge_name" : "하드코어 홈트레이닝 챌린지",
          "challenge_desc" : "집 또는 안전한 실내 및 실외에서 자신만의 운동으로 트레이닝하는 챌린지입니다.\n스쿼트, 플랭크 등 어떠한 운동이든 상관없으며, 트레이닝 후에 해당 일에 맞는 버튼 클릭과 함께 댓글로 본인만의 운동 방법을 공유해주세요.",
          "progress_buttons" : [
            { buttonId: 0, isFinished: false },
            { buttonId: 1, isFinished: false },
            { buttonId: 2, isFinished: false },
            { buttonId: 3, isFinished: false },
            { buttonId: 4, isFinished: false },
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
          ],
          "challenge_likes" : 21, 
        },
        message: "ok"
      })
    } else if(challengeId === 4) {
      res.status(200).json({
        data: {
          "challenge_name" : "자전거 출퇴근 챌린지",
          "challenge_desc" : "온실가스와 미세먼지 감축은 물론 참여자의 건강을 동시에 지킬 수 있는 개별 미션 챌린지입니다.\n매일 자전거로 출퇴근 후에 해당 일에 맞는 버튼을 클릭하고 댓글로 공유해주세요.",
          "progress_buttons" : [
            { buttonId: 0, isFinished: false },
            { buttonId: 1, isFinished: false },
            { buttonId: 2, isFinished: false },
            { buttonId: 3, isFinished: false },
            { buttonId: 4, isFinished: false },
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
            { buttonId: 15, isFinished: false },
            { buttonId: 16, isFinished: false },
            { buttonId: 17, isFinished: false },
            { buttonId: 18, isFinished: false },
            { buttonId: 19, isFinished: false }
          ],
          "challenge_likes" : 102, 
        },
        message: "ok"
      })
    }

    res.status(500).send();

  },
  post: (req, res) => {

    const userId = req.body.user_id;
    const challengeId = req.body.challenge_id;

    if(challengeId === 3) {
      res.status(200).json({
        data: dummy.progressU3C3,
        message: "ok"
      })
    } else if(challengeId === 4) {
      res.status(200).json({
        data: dummy.progressU6C4,
        message: "ok"
      })
    }

    res.status(500).send();

  },
  put: (req, res) => {

    const userId = req.body.user_id;
    const challengeId = req.body.challenge_id;
    const progressButtons = req.body.progress_buttons;

    let data = {};

    if(challengeId === 1) {
      data = dummy.progressU2C1;

    } else if(challengeId === 2) {
      data = dummy.progressU1C2;

    } else if(challengeId === 3) {
      data = dummy.progressU3C3;
      
    } else if(challengeId === 4) {
      data = dummy.progressU6C4;
      
    }

    res.status(200).json({
      data: {...data, progress_buttons: progressButtons},
      message: "ok"
    })

  },

}
