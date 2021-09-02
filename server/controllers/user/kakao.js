require('dotenv').config();
const db = require("../../models/")
const qs = require('qs');
const axios = require("axios");

const clientID = process.env.KAKAO_CLIENT_ID;
const clientSecret = process.env.KAKAO_CLIENT_SECRET;


// 카카오로 시작하기 버튼 눌렀을때
module.exports = {
  post: (req, res) => { // authorizationCode 받아옴
    const kakaoAuthCode = req.body.authorizationCode;
    axios({
      method: 'post',
      url: 'https://kauth.kakao.com/oauth/token',
      data: qs.stringify({
        client_id: clientID,
        client_secret: clientSecret,
        code: kakaoAuthCode,
        
        // TODO: ******************* redirect_uri 변경하기 *******************

        redirect_uri: 'http://localhost:3000',
        grant_type: 'authorization_code'
      }),
      headers : { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8'}
    })
    .then(response1 =>{ // 토큰 받아옴
      const token = response1.data.access_token;
      
      // console.log(`accessToken : ${token}`);
      
      axios({
        method: 'get',
        url: 'https://kapi.kakao.com/v2/user/me',
        headers: {
          'authorization': `Bearer ${token}`,
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        }
      }).then(data1 => { // 토큰이용해서 데이터 받아옴
        
        const value = data1.data;

        // TODO SEQUELIZE
      

        db.user.findOrCreate({
          where:{ user_kakaoId : value.id },
          defaults: {
            "user_kakaoId": value.id,
            "user_email": value.kakao_account.email,
            "user_name": value.kakao_account.profile.nickname,
            "user_nickname": `임시닉네임${value.id}`,
            "user_exp": 0,
            "user_gender": '남',
            "user_mobile": null,
          }
        }).then(([data, created]) => {
          

          const valuefromdb = data.dataValues

          if (created) {

            res.status(200).json({
              data: {
                "user_id": valuefromdb.id,
                "user_kakaoId": valuefromdb.user_kakaoId,
                "user_email": valuefromdb.user_email,
                "user_name": valuefromdb.user_name,
                "user_nickname": valuefromdb.user_nickname || `임시닉네임${valuefromdb.id}`,
                "user_exp": valuefromdb.user_exp,
                "user_gender": valuefromdb.user_gender,
                "user_mobile": valuefromdb.user_mobile,
                "created_at": valuefromdb.createdAt,
                "updated_at": valuefromdb.updatedAt
              },
              message : "ok, signed up with kakao, kakao token is created in your cookie",
              token : token
            })

          } else {

            res.status(200).json({
              data: {
                "user_id": valuefromdb.id,
                "user_kakaoId": valuefromdb.user_kakaoId,
                "user_email": valuefromdb.user_email,
                "user_name": valuefromdb.user_name,
                "user_nickname": valuefromdb.user_nickname || `임시닉네임${valuefromdb.id}`,
                "user_exp": valuefromdb.user_exp,
                "user_gender": valuefromdb.user_gender,
                "user_mobile": valuefromdb.user_mobile,
                "created_at": valuefromdb.createdAt,
                "updated_at": valuefromdb.updatedAt
              },
              message : "ok, signed in with kakao, kakao token is created in your cookie",
              token : token
            })

          }
        })

        
      })
      .catch(e => {
        console.log(`Kakao get userinfo generation err ${e}`)}
      )

    })
    .catch(e => {console.log(`Kakao token generation err ${e}`)})



    if(!kakaoAuthCode) {

      // 에러난경우
      res.status(401).json({
        data : null,
        message : "token이나 code 오류. 다시 로그인하세요"
      });
    }
    
  }
}
