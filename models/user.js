'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      User.hasMany(models.App,{
        as: "apps"
      })

      User.belongsToMany(models.Sale,{
        through:"Sales"
      })
    }
  };

  User.init({

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "There is an account associated with this email",
      },
      validate: {
        len: {
          args: [3, 20],
          msg: "Username must be at least 3 characters long, and 20 max"
        }
      }
    },

    password: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        len: {
          args: [6, 20],
          msg: "your password must be at least 6 characters long, and 20 max",
        },
        notNull: { args: true, msg: "password cannot be null" },
      }
    },

    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 20],
          msg: "your password must be at least 6 characters long, and 20 max",
        },
        notNull: { args: true, msg: "password cannot be null" },
      }
    },

    roles: {
      type: DataTypes.ENUM,
      values: ['client', 'dev'],
      defaultValue: 'client'
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};