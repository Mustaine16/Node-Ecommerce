'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Apps', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      name: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
          len:[2,40]
        }
      },

      price: {
        type: Sequelize.FLOAT,
        allowNull:false
      },

      logo: {
        type: Sequelize.STRING,
        allowNull:false
      },

      categoryId: {
        type: Sequelize.INTEGER,
        allowNull:true,
        references:{
          model: "Categories",
          key:"id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model: "Users",
          key:"id"
        },
        onUpdate:"CASCADE",
        onDelete:"CASCADE" //if the dev's account is deleted, its apps will be too
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
    await queryInterface.dropTable('Apps');
  }
};