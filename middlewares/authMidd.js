const jwt = require('jsonwebtoken')
const { jwtKey } = require("../config/secrets")

const { ResponseObject, responseHandler } = require("../network/response")

const authMidd = async (req, res, next) => {

  try {
    const token = req.session.token || null

    if (!token) return responseHandler(res, new ResponseObject("", "Token not send", 401))

    const decrypt = await jwt.verify(token, jwtKey)

    req.authUserId = decrypt.id

    next();

  } catch (err) {
    return responseHandler(res, new ResponseObject("", "Token error", 400), err)
  }
}

module.exports = authMidd