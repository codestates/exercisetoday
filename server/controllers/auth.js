// const { isJwtAuthorized } = require('./tokenFunctions');
const db = require("../models/")
const axios = require("axios");

//! sequelize connection test
try {
  db.sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}



db.user.findAll().then(data => console.log(data[0].dataValues))

db.comment.findAll().then(data => console.log(data[0].dataValues))

db.user.findAll({
  where: {id : 1},
  include: [
      {model : db.comment}
  ]
}).then(data =>{
  console.log(data[0].dataValues)
});






//! Advanced
// const dummyUserInfoJwt = {
//   "user_id": 1,
//   "user_email": "myemail@gmail.com",
//   "user_name": "오하운",
//   "user_nickname": "JWT",
//   "user_gender": "male",
//   "user_mobile": 01011111111,
//   "user_exp": 42,
//   "createdAt": new Date(),
//   "updatedAt": new Date(),
//   "user_kakaoId": null
// }

// const dummyUserInfoKakao = {
//   "user_id": 1,
//   "user_email": "myemail@gmail.com",
//   "user_name": "오하운",
//   "user_nickname": "카카오",
//   "user_gender": "male",
//   "user_mobile": 01011111111,
//   "user_exp": 42,
//   "createdAt": new Date(),
//   "updatedAt": new Date(),
//   "user_kakaoId": 2314
// }


// module.exports = {
//   get : (req, res) =>{
//     //console.log(req.cookies);

//     const token = req.headers.authorization;
//     let jwt = false;
//     let kakao = false;
    
//     if(token.split(" ")[0] === "kakao") {
//       kakao = token.split(" ")[1];
//     } else if (token.split(" ")[0] === "jwt") {
//       jwt = token.split(" ")[1];
//     }

//     if(jwt) {
//       // jwt 토큰 있는경우

//       const userData = isJwtAuthorized(jwt);

//       if(!userData) {
//         // jwt 토큰 만료된경우

//         res.status(200).json({
//           data : null,
//           message : 'invalid access token'
//         })

//       } else {
//         // ! jwt 토큰 유효한경우

//         // TODO Sequelize 로 정보지우기

//         res.status(200).json({
//           data : dummyUserInfoJwt,
//           message : 'ok'
//         })

//       }

//     } else if(kakao) {
//       // 카카오 토큰 있는경우

//       console.log(kakao)
//       // 카카오 유효성 검증
//       axios({
//         method: 'get',
//         url: 'https://kapi.kakao.com/v1/user/access_token_info',
//         headers : { 
//           'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
//           'Authorization': `Bearer ${kakao}`
//         }
//       })
//       .then(data => {
//         // console.log(data.data) 하면,
//         /* 
//         이렇게 옴.
//         {
//           id: 1871968447,
//           expiresInMillis: 21316280,
//           expires_in: 21316,
//           app_id: 630711,
//           appId: 630711
//         }
//         */

//         // TODO Sequelize 로 정보지우기
        
//         // ! 카카오 토큰있고 유효한경우
//         res.status(200).json({
//           data : dummyUserInfoKakao,
//           message : 'ok'
//         })

//       })
//       .catch(e => {
//         console.log(`Kakao token validation err ${e}`)}
//       )


//     } else {
//       // 토큰 아예 없는경우
//       res.status(200).json({
//         data : null,
//         message : 'not authorized'
//       })
//     }

//   }
// }