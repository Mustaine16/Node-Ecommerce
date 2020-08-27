const { Router } = require('express')

const authMidd = require("../middlewares/authMidd")
const authDev = require("../middlewares/authDev")

const userController = require("../controllers/userController")
const sessionController = require("../controllers/sessionController")

const router = Router()

const { findUser, create, getClientApps ,getDevApps } = userController
const { login, createToken, sendSession } = sessionController

router.route('/')
  .post(create, login, createToken, sendSession)

router.route("/apps")
  .get(authMidd, findUser, getClientApps)

router.route('/dev')
  .get(authMidd, findUser, authDev, getDevApps)


module.exports = router