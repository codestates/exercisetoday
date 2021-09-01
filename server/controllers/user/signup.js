const db = require("../../models/")

module.exports = {
  post: (req, res) => { 
    const userData = req.body;

    db.user.findOrCreate({
      where:{ user_email : userData.user_email },
      defaults: {
        "user_kakaoId": null,
        "user_password": userData.user_password,
        "user_email": userData.user_email,
        "user_name": userData.user_name,
        "user_nickname": userData.user_name,
        "user_exp": 0,
        "user_gender": userData.user_gender,
        "user_mobile": userData.user_mobile,
      }
    }).then(([data, created]) => {

      const valuefromdb = data.dataValues

      if(created) {

        res.status(200).json({
          data: {
            "user_id": valuefromdb.id,
            "user_kakaoId": valuefromdb.user_kakaoId,
            "user_email": valuefromdb.user_email,
            "user_name": valuefromdb.user_name,
            "user_nickname": valuefromdb.user_nickname,
            "user_exp": valuefromdb.user_exp,
            "user_gender": valuefromdb.user_gender,
            "user_mobile": valuefromdb.user_mobile,
            "created_at": valuefromdb.createdAt,
            "updated_at": valuefromdb.updatedAt
          },
          message : "ok"
        })

      } else {
        res.status(200).json({
          data : null,
          message : `email already exists`
        });
      }

    }) 


  }
}