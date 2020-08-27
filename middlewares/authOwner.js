const { ResponseObject, responseHandler } = require("../network/response")

const authOwner = (req, res, next) => {

  //Check if the User is owner of the mainObject (the app (in dev case), its wishlist (client), etc)

  //mainObj will be the default property set in finder middlewares of each controller to verify the owner
  //If the dev is CREATING, there will be no mainObj

  if (req.mainObj && req.mainObj.userId == req.user.id) return next();

  return responseHandler(res, new ResponseObject("", "Unauthorized", 401))
}

module.exports = authOwner