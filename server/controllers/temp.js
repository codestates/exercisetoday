<<<<<<< HEAD
const db = require("../models/")

=======
const db = require("../models");
const axios = require("axios");
>>>>>>> b2d16f4e27ba3048004997ba6b78df8c82d0b39d
//! sequelize connection test
// try {
//   db.sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }



<<<<<<< HEAD



=======
// db.user.findAll({where:{id:1}}).then(data => {
//   console.log(data[0].dataValues)
// })

// db.comment.findAll().then(data => console.log(data[0].dataValues))
>>>>>>> b2d16f4e27ba3048004997ba6b78df8c82d0b39d

// db.user.findAll({
//   where: {id : 1},
//   include: [
//       {model : db.comment}
//   ]
// }).then(data =>{
//   console.log(data[0].dataValues)
// });
// let sample ={
//   user_nickname: "변경 테스트",
//   user_password: "비번 테스트"
// }
// db.user.update(sample,{
//   where: {
//     id: 3
//   }
// })
// .then(data =>{
//   console.log(data)
// })



//! comment get
// db.progress.findAll({
//   include: [
//     {
//       model: db.user
//     }
//   ],
//   where: {
//     challengeId : 1
//   },
// })
// .then(data =>{
//   db.comment.findAll({
//     where: {
//       challengeId: 1
//     }
//   })
//   .then(data2 =>{
//     let result = [];
//     for(let i = 0; i < data2.length; i++){
//       let obj = {};
//       let id = data2[i].dataValues.userId;
//       for(let j = 0; j < data.length; j++){
//         if(data[j].dataValues.userId === id){
//           obj.user_nickname = data[j].dataValues.user.dataValues.user_nickname;
//           obj.user_exp = data[j].dataValues.user.dataValues.user_exp;
//           obj.progress_rate = data[j].dataValues.progress_rate;
//           break;
//         }
//       }
//       obj.comment_id = data2[i].dataValues.id; 
//       obj.comment_content = data2[i].dataValues.comment_content;
//       obj.created_at = data2[i].dataValues.createdAt;
//       result.push(obj);
//     }
//     console.log(result)
//   })
// });
db.comment.create({
  comment_content: 'test댓글',
  userId: 1,
  challengeId: 1
}).then(data =>{
<<<<<<< HEAD
  console.log(data[0].dataValues.comments)
});
=======
  console.log(data.dataValues)
})
>>>>>>> b2d16f4e27ba3048004997ba6b78df8c82d0b39d
