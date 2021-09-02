const db = require("../../models");
const axios = require("axios");

module.exports = {
  get: async(req ,res) =>{
    const user_id = req.query.user_id;
    // console.log(user_id);
    //TODO: sequelize로 user_id 검색
    
    //sequelize로 progresses테이블에서 user_id로 검색
    await db.progress.findAll({
      include: [
        {
          model: db.challenge,
          attributes: ['id','challenge_name', 'challenge_desc']
        }
      ],
      where: {
        userId: user_id
      }
    })
    .then(data =>{
      // console.log(data[0].dataValues.challenge);
      let result = [];
      for(let i = 0; i < data.length; i++){
        let obj = {};
        obj.challenge_id = data[i].dataValues.challenge.dataValues.id;
        obj.challenge_name = data[i].dataValues.challenge.dataValues.challenge_name;
        obj.challenge_desc = data[i].dataValues.challenge.dataValues.challenge_desc;
        obj.progress_rate = data[i].dataValues.progress_rate;
        result.push(obj);
      }
      res.status(200).json({
        data: {
          challenges: result
        },
        message: "ok"
      })    
    })
  }
}