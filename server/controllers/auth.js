const { isJwtAuthorized } = require('./tokenFunctions');
const db = require("../models/")
const axios = require("axios");

//! Advanced

module.exports = {
  get : async (req, res) =>{
    //console.log(req.cookies);

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
        await db.user.findAll({
          where: {
            id: userData.user_id
          }
        }).then(data => {
          
          const value = data[0].dataValues
          res.status(200).json({
            data : {
              "user_id": value.id,
              "user_kakaoId": value.user_kakaoId,
              "user_email": value.user_email,
              "user_name": value.user_name,
              "user_nickname": value.user_nickname,
              "user_exp": value.user_exp,
              "user_gender": value.user_gender,
              "user_mobile": value.user_mobile,
              "created_at": value.createdAt,
              "updated_at": value.updatedAt
            },
            message : 'ok'
          })
        })

        

      }

    } else if(kakao) {
      // 카카오 토큰 있는경우

      console.log(kakao)
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
        db.user.findAll({
          where: {
            user_kakaoId: data.data.id
          }
        }).then(data => {
          
          const value = data[0].dataValues
          res.status(200).json({
            data : {
              "user_id": value.id,
              "user_kakaoId": value.user_kakaoId,
              "user_email": value.user_email,
              "user_name": value.user_name,
              "user_nickname": value.user_nickname || `임시닉네임${value.id}`,
              "user_exp": value.user_exp,
              "user_gender": value.user_gender,
              "user_mobile": value.user_mobile,
              "created_at": value.createdAt,
              "updated_at": value.updatedAt
            },
            message : 'ok'
          })
        })

      })
      .catch(e => {
        console.log(`Kakao token validation err ${e}`)
        return e
      })

    }
      // 토큰 아예 없는경우
    res.status(200).json({
      data : null,
      message : 'not authorized'
    })
    

  }
}