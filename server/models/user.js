'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    user_id: DataTypes.INTEGER,
    user_kakaoId: DataTypes.INTEGER,
    user_email: DataTypes.STRING,
    user_password: DataTypes.STRING,
    user_name: DataTypes.STRING,
    user_nickname: DataTypes.STRING,
    user_exp: DataTypes.INTEGER,
    user_photo: DataTypes.STRING,
    user_gender: DataTypes.STRING,
    user_mobile: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};