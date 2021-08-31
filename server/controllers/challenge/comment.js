const { isJwtAuthorized } = require('../tokenFunctions');

const axios = require("axios");


module.exports = {
  get: (req, res) => {
    const challengeId = Number(req.query.challenge_id);

    // TODO 챌린지아이디로 댓글찾아와서 리스트 뿌려주기

    res.status(200).json({
      data: {
        "comments": [
          {  
            "comment_id": 1,
            "user_nickname": "힘든사람123",
            "user_exp": 12,
            "progress_rate": 10,
            "comment_content": " 생각보다 힘드네 ",
            "created_at": "created_at",
          },
          {
            "comment_id": 2,
            "user_nickname": "정열맨",
            "user_exp": 55,
            "progress_rate": 70,
            "comment_content": " 열심히 합시da " ,
            "created_at": "created_at",
          },
          {
            "comment_id": 3,
            "user_nickname": "육회비빔밥",
            "user_exp": 10,
            "progress_rate": 10,
            "comment_content": " 운동 시작합니다 " ,
            "created_at": "created_at",
          },
          {
            "comment_id": 4,
            "user_nickname": "미미",
            "user_exp": 62,
            "progress_rate": 100,
            "comment_content": " 쉽네 ㅋ " ,
            "created_at": "created_at",
          },
          {
            "comment_id": 5,
            "user_nickname": "육회비빔밥",
            "user_exp": 13,
            "progress_rate": 50,
            "comment_content": " 엄청 많이한거같은데 이제 반했네 " ,
            "created_at": "created_at",
          },
          {
            "comment_id": 6,
            "user_nickname": "오계란",
            "user_exp": 112,
            "progress_rate": 90,
            "comment_content": " 안녕친구들 " ,
            "created_at": "created_at",
          },
          {
            "comment_id": 7,
            "user_nickname": "물어보는사람",
            "user_exp": 21,
            "progress_rate": 0,
            "comment_content": " 님들 이거 어렵나요 " ,
            "created_at": "created_at",
          }
        ]
      },
      message: "ok"
    })
  },
  post: (req, res) => { // 댓글 쓰기

    const userId = req.body.user_id;
    const challengeId = req.body.challenge_id;
    const commentContent = req.body.comment_content;

    const kakao = req.cookies.kakao;
    const jwt = req.cookies.jwt;

    if(jwt) {
      // jwt 토큰 있는경우

      const userData = isJwtAuthorized(jwt);

      if(!userData) {
        // jwt 토큰 만료된경우

        res.status(400).json({
          data : null,
          message : 'invalid access token'
        })

      } else {
        // ! jwt 토큰 유효한경우

        // TODO Sequelize 로 정보가져오기

        res.status(200).json({
          data : {
            "comment_id": 8,
            "user_id": userId,
            "challenge_id" : challengeId,
            "comment_content" : commentContent,
            "created_at" : new Date(),
            "updated_at" : new Date()            
          },
          message : 'ok'
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
        res.status(200).json({
          data : {
            "comment_id": 8,
            "user_id": userId,
            "challenge_id" : challengeId,
            "comment_content" : commentContent,
            "created_at" : new Date(),
            "updated_at" : new Date()            
          },
          message : 'ok'
        })

      })
      .catch(e => {
        console.log(`Kakao token validation err ${e}`)}
      )


    } else {
      // 토큰 아예 없는경우 (없을듯)
      res.status(401).json({
        data : null,
        message : 'not authorized'
      })
    }

  }
}