const { isJwtAuthorized } = require('./tokenFunctions');


const dummyUserInfoJwt = {
  "user_id": 1,
  "user_email": "myemail@gmail.com",
  "user_name": "오하운",
  "user_nickname": "오계란",
  "user_gender": "male",
  "user_mobile": 01011111111,
  "user_exp": 42,
  "createdAt": new Date(),
  "updatedAt": new Date(),
  "user_kakaoId": null
}

const dummyUserInfoKakao = {
  "user_id": 1,
  "user_email": "myemail@gmail.com",
  "user_name": "오하운",
  "user_nickname": "오계란",
  "user_gender": "male",
  "user_mobile": 01011111111,
  "user_exp": 42,
  "createdAt": new Date(),
  "updatedAt": new Date(),
  "user_kakaoId": 2314
}


module.exports = {
  get : (req, res) =>{
    //console.log(req.cookies);

    const token = req.headers.authorization;
    let jwt = false;
    let kakao = false;
    
    if(token.split(" ")[0] === "kakao") {
      kakao = token.split(" ")[1];
    } else if (token.split(" ")[0] === "jwt") {
      jwt = token.split(" ")[1];
    }

    if(jwt){
      if(kakao){
        // 쿠키에 jwt, kakao 토큰이 없는 경우
        res.status(401).json({
          data : null,
          message : "not authorized"
        });
      }else{
        // kakao 토큰만 있는 경우
        // TODO : kakao 토큰으로 verify
        axios({
          method: "get",
          url: "https://kapi.kakao.com/v1/user/access_token_info",
          headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            'Authorization': `Bearer ${kakao}`
          }
        })
        .then(data => {
          
          const userInfoKakao = data.id;

          if(!userInfoKakao) {
            // kakao 토큰 있는데 만료된 경우
            res.status(400).json({
              data : null,
              message : "invalid access token"
            });
            
          } else {

            // kakao 토큰 있고 유효
            // TODO : sequelize로 정보 받아오기
            
            res.status(200).json({
              data : dummyUserInfoKakao,
              message : "ok"        
            })
          }

        })

        
      }
    }else{
      // jwt 토큰만 있는 경우
      const userInfoJwt = isJwtAuthorized(jwt);
      
      if (!userInfoJwt) {
        // jwt 토큰 있는데 만료된 경우
        res.status(400).json({
          data : null,
          message : "invalid access token"
        });
      } else {
        // jwt 토큰있고 맞는경우

        // TODO : sequelize로 정보 받아오기

        res.status(200).json({
          data : dummyUserInfoJwt, // ! 나중에 userInfoJwt로 바꾸기
          message : "ok"
        });

      }
    }
  }
}