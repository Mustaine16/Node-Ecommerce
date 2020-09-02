const { Router } = require("express")

const authMidd = require("../middlewares/authMidd")
const authDev = require("../middlewares/authDev")
const authOwner = require("../middlewares/authOwner")
const productController = require("../controllers/productController")
const userController = require("../controllers/userController")

const router = Router();

const { findProduct, index, show, create, update, destroy } = productController
const { findUser } = userController

router.route("/")
  .get(index)
  .post(authMidd, findUser, authDev, create)

router.route("/:id")
  .get(authMidd, findProduct, show)
  .put(authMidd, findUser, authDev, findProduct, authOwner, update)
  .delete(authMidd, findUser, authDev, findProduct, authOwner, destroy)
  
module.exports = router