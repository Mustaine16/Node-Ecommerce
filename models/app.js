'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class App extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      App.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId"
      })

      App.belongsTo(models.Category, {
        as: "category",
        foreignKey: "categoryId"
      })

      App.belongsToMany(models.Sale, {
        through: "Sales",
        as:"purchased"
      })

      App.belongsToMany(models.Wishlist, {
        through: "Wishlists",
        as:"wishlist"
      })
    }
  };
  App.init({

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "name cannot bet null"
        },
        notEmpty: {
          args: true,
          msg: "name cannot be empty"
        }
      }
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat:{
          args:true,
          msg: "Price must be a number"
        },
        notNull: {
          args: true,
          msg: "price cannot bet null"
        },
        notEmpty: {
          args: true,
          msg: "price cannot be empty"
        }
      }
    },

    logo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "logo cannot bet null"
        },
        notEmpty: {
          args: true,
          msg: "logo cannot be empty"
        }
      }
    },

    categoryId: DataTypes.INTEGER,

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "userId cannot bet null"
        },
        notEmpty: {
          args: true,
          msg: "userId cannot be empty"
        }
      }
    }

  }, {
    sequelize,
    modelName: 'App',
  });
  return App;
};