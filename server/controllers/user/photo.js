const { isJwtAuthorized } = require('../tokenFunctions');
const db = require("../../models/")
const axios = require("axios");


module.exports = {
  get: (req, res) => { 

    const userId = req.query.user_id;
    
    // TODO Sequelize 로 userId이용해서 사진가져오기
    // console.log(userId)

    db.user.findAll({
      where: {
        id: userId
      }
    }).then(data => {
          
      const value = data[0].dataValues

      // console.log(value)
      res.status(200).json({
        data : value.user_photo,
        message : 'ok'
      })
    })

  },
  put: async (req, res) => {
    //! put photo local test code
    // const image = req.file
    // // console.log(image)
    // db.user.update({
    //   user_photo: image
    // },{
    //   where: {
    //     id: 1
    //   }
    // })
    // .then(data =>{
    //   // console.log(data)
    //   db.user.findAll({where:{id:1}}).then(data2 =>{
    //     console.log(data2[0].dataValues)
    //   })
    // })
    //!------------------------------

    const photo = req.body.user_photo;
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

        // TODO Sequelize 로 정보 넣기
        db.user.update({user_photo: photo}, {
          where: {
            id: userData.user_id
          }
        }).then(data => {

          res.status(200).json({
            data :photo,
            message : 'ok'
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
        // TODO Sequelize 로 사진 업뎃
        
        // ! 카카오 토큰있고 유효한경우
        if(!!data.data.id){

          db.user.update({
            user_photo: photo
          },{
            where: {
              user_kakaoId: data.data.id
            }
          })
          .then(data2 =>{
            db.user.findAll({
              where: {
                user_kakaoId: data.data.id
              }
            })
            .then(data3 =>{
              res.status(200).json({
                data: photo,
                message: "ok"
              })
            })
          })
          // const image = req.file
          // // console.log(image)
          // db.user.update({
          //   user_photo: image
          // },{
          //   where: {
          //     user_kakaoId: data.data.id
          //   }
          // })
          // .then(data2 =>{
          //   // console.log(data)
          //   db.user.findAll({
          //     where:{
          //       user_kakaoId: data.data.id
          //     }
          //   })
          //   .then(data3 =>{
          //     // console.log(data3[0].dataValues)
          //     res.send(data3[0].dataValues.user_photo);
          //   })
          // })
        }
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