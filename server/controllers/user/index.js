const { isJwtAuthorized } = require('../tokenFunctions');
const db = require("../../models");
const axios = require("axios");


module.exports = {
  put: (req, res) => { 

    const userDataToChange = req.body;
    // console.log(userDataToChange)
    let updateData = {};
    if(!!userDataToChange.user_nickname){
      updateData.user_nickname = userDataToChange.user_nickname;
    }
    if(!!userDataToChange.user_password){
      updateData.user_password = userDataToChange.user_password;
    }
    // console.log(updateData)
    
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
      // console.log(jwt)
      const userData = isJwtAuthorized(jwt);
      // console.log(userData)

      if(!userData) {
        // jwt 토큰 만료된경우

        res.status(200).json({
          data : null,
          message : 'invalid access token'
        })

      } else {
        // ! jwt 토큰 유효한경우

        // TODO Sequelize 로 정보수정해서 바뀐거 보내기
        db.user.update(updateData,{
          where: {
            id: userDataToChange.user_id
          }
        })
        .then(data =>{
          // console.log(data);
          db.user.findAll({
            where:{
              id: userDataToChange.user_id
            }
          })
          .then(data2 =>{
            // console.log(data2[0].dataValues);
            res.status(200).json({
              data: {
                user_id: data2[0].dataValues.id,
                user_kakaoId: data2[0].dataValues.user_kakaoId,
                user_email: data2[0].dataValues.user_email,
                user_password: data2[0].dataValues.user_password,
                user_name: data2[0].dataValues.user_name,
                user_nickname: data2[0].dataValues.user_nickname,
                user_exp: data2[0].dataValues.user_exp,
                user_gender: data2[0].dataValues.user_gender,
                user_mobile: data2[0].dataValues.user_mobile,
                created_at: data2[0].dataValues.createdAt,
                updated_at: data2[0].dataValues.updatedAt
              },
              message: "ok"
            })          
          })
        })
      }
    } else if(kakao) {
      // 카카오 토큰 있는경우

      // console.log(kakao)
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
        // TODO Sequelize 로 정보수정해서 바뀐거 보내기 
        // ! 카카오 토큰있고 유효한경우
        db.user.update(updateData,{
          where: {
            id: userDataToChange.user_id
          }
        })
        .then(data =>{
          // console.log(data);
          db.user.findAll({
            where:{
              id: userDataToChange.user_id
            }
          })
          .then(data2 =>{
            // console.log(data2[0].dataValues);
            res.status(200).json({
              data: {
                user_id: data2[0].dataValues.id,
                user_kakaoId: data2[0].dataValues.user_kakaoId,
                user_email: data2[0].dataValues.user_email,
                user_password: data2[0].dataValues.user_password,
                user_name: data2[0].dataValues.user_name,
                user_nickname: data2[0].dataValues.user_nickname,
                user_exp: data2[0].dataValues.user_exp,
                user_gender: data2[0].dataValues.user_gender,
                user_mobile: data2[0].dataValues.user_mobile,
                created_at: data2[0].dataValues.createdAt,
                updated_at: data2[0].dataValues.updatedAt
              },
              message: "ok"
            })          
          })
        })
      })
      .catch(e => {
        console.log(`Kakao token validation err ${e}`)}
      )


    } else {
      // 토큰 아예 없는경우
      res.status(204).json({
        data : null,
        message : 'not authorized'
      })
    }
  },
  delete: (req, res) => {

    
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
        // jwt 토큰 유효한경우

        // TODO Sequelize 로 정보지우기
        //userData.user_id로 찾아 지우기
        db.user.destroy({
          where:{
            id: userData.user_id
          }
        })
        .then(data =>{
          res.status(200).json({
            data : null,
            message : 'ok'
          })
        })
      }
    } else if(kakao) {
      // 카카오 토큰 있는경우

      // console.log(kakao)
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
        // 카카오 토큰있고 유효한경우
        db.user.destroy({
          where:{
            user_kakaoId: data.data.id
          }
        })
        .then(data2 =>{
          res.status(200).json({
            data : null,
            message : 'ok'
          })
        })
      })
      .catch(e => {
        console.log(`Kakao token validation err ${e}`)}
      )


    } else {
      // 토큰 아예 없는경우
      res.status(200).json({
        data : null,
        message : 'not authorized'
      })
    }

  }
}   
