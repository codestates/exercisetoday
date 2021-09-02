const db = require("../../models");

// 챌린지 정보
const getChallengeInfo = async function (challengeId) {
  const challengeData = await db.challenge.findAll({
    where: {id : challengeId},
  })
  return challengeData[0].dataValues
}


// likes 정보
const getLikesInfo = async function(challengeId) {
  const likedProgress = await db.progress.findAll({
    where: {liked : true},
  })


  return likedProgress.filter(el => el.dataValues.challengeId === challengeId).length
}

// progress 정보
const getProgressInfo = async function(userId, challengeId) {
  const userAndProgress = await db.user.findAll({
    where: {id : userId},
    include: [
      {model : db.progress}
    ]
  })

  const progressArr = userAndProgress[0].dataValues.progresses;

  return progressArr.filter(el=> el.dataValues.challengeId === challengeId);
}


module.exports = {
  get: async (req, res) => {

    const userId = Number(req.query.user_id);
    const challengeId = Number(req.query.challenge_id);
    
    const challenge = await getChallengeInfo(challengeId)

    const likes = await getLikesInfo(challengeId)

    const progress = await getProgressInfo(userId, challengeId)



    if(progress.length > 0) {
      
      let progressData = progress[0].dataValues
      
      const dataToSend = {
        progress_id: progressData.id,
        user_id: userId,
        challenge_id: challenge.id,
        challenge_name: challenge.challenge_name,
        challenge_desc: challenge.challenge_desc,
        progress_rate: progressData.progress_rate,
        progress_buttons: progressData.progress_buttons,
        progress_liked: progressData.liked,
        challenge_likes: likes,
      }
      
      
      res.status(200).json({
        data: dataToSend,
        message: "ok"
      })
    } else {

      const dataToSend = {
        progress_id: null,
        challenge_id: challenge.id,
        challenge_name: challenge.challenge_name,
        challenge_desc: challenge.challenge_desc, 
        progress_buttons: challenge.progress_buttons,         
        progress_rate: challenge.progress_rate,
        progress_liked: false,
        challenge_likes: likes,
      }

      res.status(200).json({
        data : dataToSend,
        message : "challenge not in progress"
      })
    }

  },
  post: async (req, res) => {

    const userId = req.body.user_id;
    const challengeId = req.body.challenge_id;
    
    const challenge = await getChallengeInfo(challengeId)

    const likes = await getLikesInfo(challengeId)

    const progress = await getProgressInfo(userId, challengeId)
    

    if(progress.length > 0) {
      //진행중이었음
      res.status(200).json({
        data : null,
        message : "challenge already in progress"
      })

    } else {

      const buttonCount = challenge.progress_buttons.length
      let newButtons = [];
      for(let i = 0; i < buttonCount; i++) {
        let newobj = { buttonId: i, isFinished: false }
        newButtons.push(newobj)
      }


      const created = await db.progress.create({
        progress_rate: 0, // 첫시작은 0
        progress_buttons: JSON.stringify(newButtons),
        liked: false,
        userId: userId,
        challengeId: challengeId
      })

      const dataToSend = {
        progress_id: created.id,
        user_id: userId,
        challenge_id: challenge.id,
        challenge_name: challenge.challenge_name,
        challenge_desc: challenge.challenge_desc, 
        progress_rate: created.progress_rate,
        progress_buttons: created.progress_buttons,
        progress_liked: created.liked,
        challenge_likes: likes,
      }

      res.status(201).json({
        data: dataToSend,
        message: "ok"
      })

    }

  },
  put: async (req, res) => {
    
    const userId = req.body.user_id;
    const challengeId = req.body.challenge_id;

    const liked = req.body.progress_liked;
    const progress_rate = req.body.progress_rate;

// ------------------ user exp -------------------
    const userInfo = await db.user.findOne({
      where: { id : userId },
      attributes: ['user_exp']
    });

    let userExp = userInfo.dataValues.user_exp;
    
    // 기존 유저 경험치 가져옴

    const progressInfo = await db.progress.findOne({
      where: {
        userId: userId,
        challengeId: challengeId
      },
      attributes: ['progress_buttons']
    })


    const procBtn = progressInfo.dataValues.progress_buttons;
    

    const prevBtnCount = procBtn.filter(el => el.isFinished).length;
    // 기존 버튼에서 누른 개수 가져옴


    const progress_buttons = req.body.progress_buttons;
    
    const newBtnCount = progress_buttons.filter(el => el.isFinished).length;
    // 새로 누른 버튼 갯수


    userExp = userExp - prevBtnCount + newBtnCount;
    // 원래 있던 경험치에 현재 눌렸던 버튼 갯수 빼고 새로 누른 버튼 갯수 더해줌.


    await db.user.update(
      {
        user_exp: userExp
      },
      {
        where: {
          id: userId
        }
      }
    )



// -----------------------------------------------


    await db.progress.update(
      {
        liked: liked,
        progress_rate: progress_rate,
        progress_buttons: JSON.stringify(progress_buttons)
      },
      {
        where: {
          userId: userId,
          challengeId: challengeId
        }
    })
    

    const challenge = await getChallengeInfo(challengeId)

    const likes = await getLikesInfo(challengeId)

    const progress = await getProgressInfo(userId, challengeId)

    const progressVal = progress[0].dataValues


    const dataToSend = {
      progress_id: progressVal.id,
      user_id: userId,
      challenge_id: challenge.id,
      challenge_name: challenge.challenge_name,
      challenge_desc: challenge.challenge_desc,
      progress_rate: progressVal.progress_rate,
      progress_buttons: progressVal.progress_buttons,
      progress_liked: progressVal.liked,
      challenge_likes: likes
    }

    res.status(201).json({
      data: dataToSend,
      message: "ok"
    })



  },

}
