'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Comment.belongsTo(models.Issue)
      Comment.belongsTo(models.Guest, {
        foreignKey: 'guestToken'
      })
    }
  }
  Comment.init(
    {
      nickname: DataTypes.STRING,
      content: DataTypes.TEXT,
      likesNum: DataTypes.INTEGER,
      isResolved: DataTypes.BOOLEAN,
      reply: DataTypes.TEXT,
      replyCreateAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Comment'
    }
  )
  return Comment
}
