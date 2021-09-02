const { isJwtAuthorized } = require('../tokenFunctions');
const db = require("../../models");
const axios = require("axios");


// // 챌린지 정보
// const getChallengeInfo = async function (challengeId) {
//   const challengeData = await db.challenge.findAll({
//     where: {id : challengeId},
//   })
//   return challengeData[0].dataValues
// }

// 유저 정보
const getUserInfo = async function (userId) {
  const userData = await db.user.findAll({
    where: {id : userId},
  })
  return userData[0].dataValues
}

// progress 정보
const getProgressInfo = async function(userId, challengeId) {
  const progressData = await db.progress.findAll({
    where: {
      userId : userId,
      challengeId : challengeId
    }
  })

  return progressData
}

module.exports = {
  get: async (req, res) => {

    const challengeId = Number(req.query.challenge_id);
    

    // TODO 챌린지아이디로 댓글찾아와서 리스트 뿌려주기 (조인 사용)
    // db.progress.findAll({
    //   include: [
    //     {
    //       model: db.user
    //     }
    //   ],
    //   where: {
    //     challengeId : challengeId
    //   },
    // })
    // .then(data =>{
    //   db.comment.findAll({
    //     where: {
    //       challengeId: challengeId
    //     }
    //   })
    //   .then(data2 =>{

    //     let result = [];
    //     for(let i = 0; i < data2.length; i++){
    //       let obj = {};
    //       let id = data2[i].dataValues.userId;
    //       for(let j = 0; j < data.length; j++){
  
    //         if(data[j].dataValues.userId === id){
    //           obj.user_nickname = data[j].dataValues.user.dataValues.user_nickname;
    //           obj.user_exp = data[j].dataValues.user.dataValues.user_exp;
    //           obj.progress_rate = data[j].dataValues.progress_rate;
    //           break;
    //         }
    //       }
    //       obj.comment_id = data2[i].dataValues.id; 
    //       obj.comment_content = data2[i].dataValues.comment_content;
    //       obj.created_at = data2[i].dataValues.createdAt;
    //       result.push(obj);
    //     }
    //     // console.log(result)
    //     res.status(200).json({
    //       data: {
    //         comments: result
    //       },
    //       message: "ok"
    //     })
    //   })
    // });


    const commentsList = await db.comment.findAll({
      where: {
        challengeId : challengeId
      },
    })


    let result = [];

    for (let i = 0; i < commentsList.length; i++) {
      let obj = {};

      let userId = commentsList[i].dataValues.userId
      let challengeId = commentsList[i].dataValues.challengeId

      console.log("a")


      const userInfo = await getUserInfo(userId);
      let progressInfo = await getProgressInfo(userId, challengeId)
      // const challengeInfo = await getChallengeInfo(challengeId)

      if (progressInfo.length === 0) {
        progressInfo = 0;
      } else {
        progressInfo = progressInfo[0].dataValues.progress_rate;
      }

      obj.user_nickname = userInfo.user_nickname;
      obj.user_exp = userInfo.user_exp;
      obj.progress_rate = progressInfo;
      obj.comment_id = commentsList[i].dataValues.id;
      obj.comment_content = commentsList[i].dataValues.comment_content;
      obj.created_at = commentsList[i].dataValues.createdAt;

      result.push(obj);
    }


    res.status(200).json({
      data: {
        comments: result
      },
      message: "ok"
    })


  },
  post: (req, res) => { // 댓글 쓰기

    const userId = req.body.user_id;
    const challengeId = req.body.challenge_id;
    const commentContent = req.body.comment_content;

    const token = req.headers.authorization;
    let jwt = false;
    let kakao = false;
    
    if(token.split(" ")[0] === "kakao") {
      kakao = token.split(" ")[1];
    } else if (token.split(" ")[0] === "jwt") {
      jwt = token.split(" ")[1];
    }

    if(jwt) {
      // jwt 토큰 있는경우

      const userData = isJwtAuthorized(jwt);

      if(!userData) {
        // jwt 토큰 만료된경우

        res.status(200).json({
          data : null,
          message : 'invalid access token'
        })

      } else {
        // ! jwt 토큰 유효한경우

        // TODO Sequelize 로 정보가져오기
        db.comment.create({
          comment_content: commentContent,
          userId: userId,
          challengeId: challengeId
        })
        .then(data =>{
          res.status(200).json({
            data: {
              comment_id: data.dataValues.id,
              user_id: data.dataValues.userId,
              challenge_id: data.dataValues.challengeId,
              comment_content: data.dataValues.comment_content,
              created_at: data.dataValues.createdAt,
              updated_at: data.dataValues.updatedAt
            },
            message: "ok"
          })
        })
      }

    } else if(kakao) {
      // 카카오 토큰 있는경우

      // 카카오 유효성 검증
      axios({
        method: 'get',
        url: 'https://kapi.kakao.com/v1/user/access_token_info',
        headers : { 
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'Authorization': `Bearer ${kakao}`
        }
      })
      .then(data => {
        if(!!data.data.id){
          db.comment.create({
            comment_content: commentContent,
            userId: userId,
            challengeId: challengeId
          })
          .then(data2 =>{
            res.status(200).json({
              data: {
                comment_id: data2.dataValues.id,
                user_id: data2.dataValues.userId,
                challenge_id: data2.dataValues.challengeId,
                comment_content: data2.dataValues.comment_content,
                created_at: data2.dataValues.createdAt,
                updated_at: data2.dataValues.updatedAt
              },
              message: "ok"
            })
          })
        }
        // console.log(data.data) 하면,
        /* 
        이렇게 옴.
        {
          id: 1871968447,
          expiresInMillis: 21316280,
          expires_in: 21316,
          app_id: 630711,
          appId: 630711
        }
        */

        // TODO Sequelize 로 정보지우기
        
        // ! 카카오 토큰있고 유효한경우       
      })
      .catch(e => {
        console.log(`Kakao token validation err ${e}`)}
      )


    } else {
      // 토큰 아예 없는경우 (없을듯)
      res.status(200).json({
        data : null,
        message : 'not authorized'
      })
    }

  }
}