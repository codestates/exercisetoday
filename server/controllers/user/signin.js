const { generateJwtToken, sendJwtToken } = require('../tokenFunctions');

module.exports = {
    post: (req, res) =>{
        // console.log(req.body)
        // let user_email = req.body.data.user_email;
        // let user_password = req.body.data.user_password;
        const data = {
          "user_id": 1,
          "user_kakaoId": null,
          "user_email": req.body.user_email,
          "user_name": "오하운",
          "user_nickname": "오계란",
          "user_exp": 42,
          "created_at": new Date(),
          "updated_at": new Date()
        };
        // TODO: sequelize로 유저 정보 확인
        //! 응답에 따라 if 문으로 가입한 유저인지 확인후 res
        // 가입한 유저일 경우, 비밀번호를 제외한 정보로 jwt 생성
        const token = generateJwtToken(data);
        sendJwtToken(res, token, data);
    }
}