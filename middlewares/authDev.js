const { ResponseObject, responseHandler} = require("../network/response")

const authDev = (req,res,next) => {

  //Check developer Role
  if (req.user.role !== "dev") return responseHandler(res, new ResponseObject("","Unauthorized", 401))

  return next();

}

module.exports = authDev