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

  console.log(likedProgress.length)

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

    console.log("progress",progress)

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
        challenge_id: challenge.id,
        challenge_name: challenge.challenge_name,
        challenge_desc: challenge.challenge_desc, 
        progress_buttons: challenge.progress_buttons,
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
    
    console.log(likes)

    if(progress.length > 0) {
      //진행중이었음
      res.status(200).json({
        data : null,
        message : "challenge already in progress"
      })

    } else {

      const buttonCount = challenge.challenge_btn_cnt
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
        challenge_btn_cnt: challenge.challenge_btn_cnt,
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

    // TODO userexp!!!!!!!
    
    const userId = req.body.user_id;
    const challengeId = req.body.challenge_id;

    const liked = req.body.liked;
    const progress_rate = req.body.progress_rate;
    const progress_buttons = req.body.progress_buttons;

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

    // console.log(progressVal.progress_buttons)

    const dataToSend = {
      progress_id: progressVal.id,
      user_id: userId,
      challenge_id: challenge.id,
      challenge_name: challenge.challenge_name,
      challenge_desc: challenge.challenge_desc, 
      challenge_btn_cnt: challenge.challenge_btn_cnt,
      progress_rate: progressVal.progress_rate,
      progress_buttons: progressVal.progress_buttons,
      progress_liked: progressVal.liked,
      challenge_likes: likes,
    }

    res.status(201).json({
      data: dataToSend,
      message: "ok"
    })



  },

}
