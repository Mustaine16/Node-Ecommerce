const { Router } = require('express')

const authMidd = require("../middlewares/authMidd")
// const authRole = require("../middlewares/authRole")

const userController = require("../controllers/userController")
const sessionController = require("../controllers/sessionController")

const router = Router()

const { create } = userController
const { login, createToken, sendSession } = sessionController

router.route('/')
  .post(create, login, createToken, sendSession)


module.exports = router