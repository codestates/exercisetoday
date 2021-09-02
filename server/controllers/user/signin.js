const { generateJwtToken, sendJwtToken } = require('../tokenFunctions');
const db = require("../../models/")

module.exports = {
    post: (req, res) =>{
        // console.log(req.body)

        let user_email = req.body.user_email;
        let user_password = req.body.user_password;

    
        // TODO: sequelize로 유저 정보 확인

        db.user.findAll({
          where: {
            user_email: user_email,
            user_password: user_password
          }
        }).then(data => {
        //! 응답에 따라 if 문으로 가입한 유저인지 확인후 res
          if(data.length === 0) {
            res.status(200).json({
              data : null,
              message : 'invalid user or password'
            })
          } else {
          // 가입한 유저일 경우, 비밀번호를 제외한 정보로 jwt 생성
            const value = data[0].dataValues
            const userdata = {
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
            }
            const token = generateJwtToken(userdata);
            sendJwtToken(res, token, userdata);
          }

        })


    }
}