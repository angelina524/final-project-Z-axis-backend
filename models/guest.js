'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Guest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Guest.hasMany(models.Issue_Guest_Comment, {
        foreignKey: 'guestToken'
      })
    }
  };
  Guest.init({
    guestToken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Guest',
  });
  return Guest;
};