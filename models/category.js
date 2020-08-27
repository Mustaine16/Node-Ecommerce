'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.hasMany(models.App, {
        as: "apps",
        foreignKey: "categoryId"
      })
    }
  };
  Category.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Category name cannot be null"
        },
        notEmpty: {
          args: true,
          msg: "Category name cannot be empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};