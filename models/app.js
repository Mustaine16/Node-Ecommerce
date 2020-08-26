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
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    logo: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    categoryId: DataTypes.INTEGER,

    userId: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'App',
    validate: {
      notEmptyOrNull() {
        if ((!this.name || !this.price || !this.logo || !this.categoryId || !this.userId)) {
          throw new Error('Attributes cannot be empty or null')
        }
      }
    }
  });
  return App;
};