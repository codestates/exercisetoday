'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class progress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      models.progress.belongsTo(models.challenge);
      models.progress.belongsTo(models.user);
    }
  };
  progress.init({
    progress_rate: DataTypes.INTEGER,
    progress_buttons: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    challengeId: DataTypes.INTEGER,
    liked: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'progress',
  });
  return progress;
};