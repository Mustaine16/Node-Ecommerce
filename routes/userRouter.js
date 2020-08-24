const { Router } = require('express')
const userController = require("../controllers/userController")

const router = Router()
const { index, createUser } = userController

router.route('/')
  .get(index)
  .post(createUser)

module.exports = router