const { isAuthorized } = require('./tokenFunctions');

module.exports = {
  get : (req, res) =>{
    //console.log(req.cookies);
    const {jwt, kakao} = req.cookies;

    if(jwt === undefined){
      if(kakao === undefined){
        // 쿠키에 jwt, kakao 토큰이 없는 경우
        res.status(401).json({
          data : null,
          message : "not authorized"
        });
      }else{
        // kakao 토큰만 있는 경우
        // TODO : kakao 토큰으로 verify
        // TODO : sequelize로 정보 받아오기
        res.status(200).json({
          data : {
            "user_id": 1,
            "user_email": "myemail@gmail.com",
            "user_password": "123456",
            "user_name": "오하운",
            "user_nickname": "오계란",
            "user_gender": "male",
            "user_mobile": 01011111111,
            "user_exp": 42,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "user_kakaoId": 2314
          },
          message : "ok"        
        })
      }
    }else{
      // jwt 토큰만 있는 경우
      // TODO : jwt 토큰으로 verify
      // TODO : sequelize로 정보 받아오기
      res.status(200).json({
        data : {
          "user_id": 1,
          "user_email": "myemail@gmail.com",
          "user_password": "123456",
          "user_name": "오하운",
          "user_nickname": "오계란",
          "user_gender": "male",
          "user_mobile": 01011111111,
          "user_exp": 42,
          "createdAt": new Date(),
          "updatedAt": new Date(),
          "user_kakaoId": null
        },
        message : "ok"        
      })
    }
  }
}