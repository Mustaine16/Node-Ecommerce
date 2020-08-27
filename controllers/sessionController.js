const jwt = require("jsonwebtoken")
const { jwtKey } = require('../config/secrets')
const { User } = require("../models")

const paramsBuilder = require('../utils/paramsBuilder')
const { ResponseObject, responseHandler } = require("../network/response")
const validParams = ["username", "password"]

const controller = {

  login: async (req, res, next) => {

    //If the user user is already logged in
    console.log("req.authuser:" + " " + req.authUser);

    if (req.authUser)
      return responseHandler(res, new ResponseObject("", "You are already logged in", 400));

    try {

      const params = paramsBuilder(req.body, validParams)

      if (!params)
        return responseHandler(res, new ResponseObject("", "username and password are required", 400));
      
      const { username, password } = params
      const user = await User.findOne({ where: { username }});

      if (user) {
        const authenticated = await user.login.call(user, password)
        
        if (authenticated) {
          //Don't retrieve password_hash
          user.password_hash = ""
          req.authUser = user;
          return next();
        } else {
          return responseHandler(res, new ResponseObject("", "Invalid password", 401))
        }

      } else {
        return responseHandler(res, new ResponseObject("", "There isn't an account associated with this username", 401))
      }
    } catch (err) {
      console.log(err);

      return responseHandler(res, new ResponseObject("", "Something went wrong", 401), err)
    }
  },

  createToken: async (req, res, next) => {

    try {
      if (!req.authUser) return next()

      const token = await jwt.sign({ id: req.authUser.id }, jwtKey, {
        expiresIn: "24h",
      });

      req.session.token = token

      next();
    } catch (error) {
      console.log(err);

      return responseHandler(res, new ResponseObject("", "Something went wrong", 401), err)
    }

  },

  sendSession: function (req, res) {
    return responseHandler(res, new ResponseObject(req.user, "", 200))
  },

  destroySession: function (req, res) {
    req.session = null
    return responseHandler(res, new ResponseObject("Session destroyed", "", 200))
  }
}

module.exports = controller