'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class challenge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.challenge.hasMany(models.progress);
      models.challenge.hasMany(models.comment);
    }
  };
  challenge.init({
    challenge_name: DataTypes.STRING,
    challenge_desc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'challenge',
  });
  return challenge;
};