require("dotenv").config();



const development = {
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASSWORD,
    "database": "exercisetoday2",
    "host": process.env.DATABASE_HOST,
    "dialect": "mysql",
    "port": process.env.DATABASE_PORT
  };
  // "test": {
  //   "username": "root",
  //   "password": null,
  //   "database": "database_test",
  //   "host": "127.0.0.1",
  //   "dialect": "mysql"
  // },
  // "production": {
  //   "username": "root",
  //   "password": null,
  //   "database": "database_production",
  //   "host": "127.0.0.1",
  //   "dialect": "mysql"
  // }
module.exports = { development };
