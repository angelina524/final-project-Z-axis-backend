'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class GuestsCommentsRelation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      GuestsCommentsRelation.belongsTo(models.Comment)
      GuestsCommentsRelation.belongsTo(models.User)
      GuestsCommentsRelation.belongsTo(models.Guest, {
        foreignKey: 'guestToken'
      })
    }
  }
  GuestsCommentsRelation.init(
    {
      userId: DataTypes.INTEGER,
      guestToken: DataTypes.STRING,
      commentId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'GuestsCommentsRelation'
    }
  )
  return GuestsCommentsRelation
}
