const { Router } = require("express")

const authMidd = require("../middlewares/authMidd")
const sessionController = require('../controllers/sessionController')
const userController = require('../controllers/userController')

const router = Router();

const { find } = userController
const { login, createToken, sendSession, destroySession } = sessionController

router.route("/")
  .post(login, createToken, sendSession)
  .delete(destroySession)

router.route("/check")
  .post(authMidd, find, sendSession)


module.exports = router