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