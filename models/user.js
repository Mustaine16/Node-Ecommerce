'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {

  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      User.hasMany(models.App, {
        as: "apps"
      })

      User.belongsToMany(models.Sale, {
        through: "Sales",
        as: "purchases"
      })
    }
  };

  User.init({

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "There is an account associated with this username",
      },
      validate: {
        len: {
          args: [3, 20],
          msg: "Username must be at least 3 characters long, and 20 max"
        },
        notNull: {
          args: true,
          msg: "Username cannot be null"
        },
        notEmpty: {
          args: true,
          msg: "Username cannot be empty"
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
    },

    role: {
      type: DataTypes.ENUM,
      values: ['client', 'dev'],
      defaultValue: 'client',
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Role cannot be null"
        },
        notEmpty: {
          args: true,
          msg: "Role cannot be empty"
        },
        isIn: { 
          args: [["client", "dev"]],
          msg: "Role must be either client or dev"
        }
      }
    }
  },
    {
      sequelize,
      modelName: 'User',
    });

  User.beforeCreate((user) => {
    const hashPassword = new Promise((resolve, reject) => {
      console.log(user.password);
      bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          user.password_hash = hash;
          resolve();
        }
      });
    })

    return Promise.all([hashPassword]);
  })

  User.verifyPassword = function (password) {

    return new Promise((res, rej) => {
      bcrypt.compare(password, this.password_hash, function (err, valid) {
        if (err) return rej(err);

        return res(valid);
      });
    });
  }

  User.prototype.login = async function (password) {
    const isAuthenticated = await User.verifyPassword.call(this, password)
    return isAuthenticated ? true : false
  }

  return User;
};