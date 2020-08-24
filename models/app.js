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

      App.belongsToMany(models.User, {
        through: "Sales"
      })

      App.belongsToMany(models.User, {
        through: "Wishlists"
      })
    }
  };
  App.init({

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name cannot be empty"
        },
        notNull: {
          args: true,
          msg: "Name cannot be null"
        },
      }
    },

    price: {
      type: DataTypes.FLOAT,
      validate: {
        notEmpty: {
          args: true,
          msg: "Price cannot be empty"
        },
        notNull: {
          args: true,
          msg: "Price cannot be null"
        },
      }
    },

    logo: {
      type: DataTypes.STRING, validate: {
        notEmpty: {
          args: true,
          msg: "Logo cannot be empty"
        },
        notNull: {
          args: true,
          msg: "Logo cannot be null"
        },
      }
    },

    categoryId: DataTypes.INTEGER,

    userId: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'App',
    validate:{
      notEmptyOrNull(){
        if((!this.name || !this.price || !this.logo || !this.categoryId || !this.userId)){
          throw new Error('Attributes cannot be empty or null')
        }
      }
    }
  });
  return App;
};