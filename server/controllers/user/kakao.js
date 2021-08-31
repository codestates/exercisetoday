require('dotenv').config();
const qs = require('qs');
const axios = require("axios");

const clientID = "ce4c941a6f16b0b73737edf331c2adaf";
const clientSecret = "Wa3IRUTiJK1FcsyIg2HyYraHu4Ez9ixs";


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
        
        // TODO: redirect_uri 변경하기 *******************
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
      }).then(response2 => { // 토큰이용해서 데이터 받아옴
        
        // console.log(response2.data);
        
        res.cookie("kakao", token);

        // TODO SEQUELIZE 

        res.status(200).json({
          data: {
            user_id : null,
            user_kakaoId: response2.data.id,
            user_email : response2.data.kakao_account.email,
            user_nickname : response2.data.kakao_account.profile.nickname,
            user_exp : 52,
          },
          message : "ok, kakao token is created in your cookie"
        })
      })
      .catch(e => {
        console.log(`Kakao get userinfo generation err ${e}`)}
      )

    })
    .catch(e => {console.log(`Kakao token generation err ${e}`)})




    // 에러난경우
    // res.status(401).json({
    //   data : null,
    //   message : "token이나 code 오류. 다시 로그인하세요"
    // });
    
  }
}
