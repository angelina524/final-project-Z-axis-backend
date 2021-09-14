'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nickname: {
        type: Sequelize.STRING(32),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: {
          msg: '此信箱已存在'
        }
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      userToken: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users')
  }
}
