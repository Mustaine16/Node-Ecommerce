const { Router } = require("express")

const authMidd = require("../middlewares/authMidd")
const authDev = require("../middlewares/authDev")
const categoryController = require("../controllers/categoryController")
const userController = require("../controllers/userController")

const router = Router();
const { index, findCategory , show, create, update } = categoryController
const { findUser } = userController

router.route("/")
  .get(index)
  .post(authMidd, findUser, authDev, create)

router.route("/:id")
  .get(authMidd, findCategory, show)
  .put(authMidd, findUser, authDev, findCategory, update)

module.exports = router