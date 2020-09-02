'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Product.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId"
      })

      Product.belongsTo(models.Category, {
        as: "category",
        foreignKey: "categoryId"
      })

      Product.belongsTo(models.Brand, {
        as: "brand",
        foreignKey: "brandId"
      })

      Product.belongsToMany(models.Sale, {
        through: "Sales",
        as: "purchased"
      })

      Product.belongsToMany(models.Wishlist, {
        through: "Wishlists",
        as: "wishlist"
      })
    }
  };

  Product.init({

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
        isFloat: {
          args: true,
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

    description: {
      type: DataTypes.STRING,
      allowNull: false
    },

    categoryId: DataTypes.INTEGER,

    brandId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

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
    modelName: 'Product',
  });
  return Product;
};