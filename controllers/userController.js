const { User } = require("../models")
const { Product } = require("../models")

const paramsBuilder = require("../utils/paramsBuilder")
const { ResponseObject, responseHandler } = require("../network/response")

const validParams = {
  create: ["username", "password", "role"],
  edit: ["username", "password"]
}

const controller = {

  findUser: async (req, res, next) => {

    const id = req.authUserId
    const user = await User.findByPk(id, { attributes: ["id", "username", "role"] })

    if (!user) return responseHandler(res, ResponseObject("", "User not found", 404))

    req.user = user;
    req.mainObj = user;
    req.mainObj.userId = user.id;

    return next();
  },

  create: async (req, res, next) => {

    const params = paramsBuilder(req.body, validParams["create"])
    console.log(params);
    if (!params) return responseHandler(res, new ResponseObject("", "Invalid or empty inputs", 400))

    try {
      await User.create(params)
      return next()

    } catch (err) {
      const response = new ResponseObject("", "Error creating user", 400)
      return responseHandler(res, response, err)
    }
  },

}

module.exports = controller