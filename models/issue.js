'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Issue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Issue.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      Issue.hasMany(Issue_Guest_Comment)
    }
  };
  Issue.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    beginTime: DataTypes.DATE,
    finishTime: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Issue',
  });
  return Issue;
};