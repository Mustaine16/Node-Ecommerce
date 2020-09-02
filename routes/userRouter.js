const { Router } = require('express')

const authMidd = require("../middlewares/authMidd")
const authDev = require("../middlewares/authDev")

const userController = require("../controllers/userController")
const sessionController = require("../controllers/sessionController")

const router = Router()

const { findUser, create } = userController
const { login, createToken, sendSession } = sessionController

router.route('/')
  .post(create, login, createToken, sendSession)

router.route('/apps')
  .get(authMidd, findUser)

router.route('/dev')
  .get(authMidd, findUser, authDev)

module.exports = router