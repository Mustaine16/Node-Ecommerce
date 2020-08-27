const { Router } = require("express")

const authMidd = require("../middlewares/authMidd")
const authDev = require("../middlewares/authDev")
const authOwner = require("../middlewares/authOwner")
const appController = require("../controllers/appController")
const userController = require("../controllers/userController")

const router = Router();

const { findApp, index, show, create, update, destroy } = appController
const { findUser } = userController

router.route("/")
  .get(index)
  .post(authMidd, findUser, authDev, create)

router.route("/:id")
  .get(authMidd, findApp, show)
  .put(authMidd, findUser, authDev, findApp, authOwner, update)
  .delete(authMidd, findUser, authDev, findApp, authOwner, destroy)
  
module.exports = router