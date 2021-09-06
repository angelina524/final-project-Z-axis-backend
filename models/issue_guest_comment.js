'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Issue_Guest_Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Issue_Guest_Comment.belongsTo(Issue, {
        foreignKey: 'issueId'
      })
      Issue_Guest_Comment.belongsTo(Guest, {
        foreignKey: 'guestToken'
      })
    }
  };
  Issue_Guest_Comment.init({
    nickname: DataTypes.STRING,
    content: DataTypes.TEXT,
    likesNum: DataTypes.INTEGER,
    isResolved: DataTypes.BOOLEAN,
    reply: DataTypes.TEXT,
    replyCreateAt: DataTypes.DATE,
    issueId: DataTypes.INTEGER,
    guestToken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Issue_Guest_Comment',
  });
  return Issue_Guest_Comment;
};