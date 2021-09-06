'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Issue_Guest_Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nickname: {
        type: Sequelize.STRING(32)
      },
      content: {
        type: Sequelize.TEXT
      },
      likesNum: {
        type: Sequelize.INTEGER
      },
      isResolved: {
        type: Sequelize.BOOLEAN
      },
      reply: {
        type: Sequelize.TEXT
      },
      replyCreateAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Issue_Guest_Comments');
  }
};