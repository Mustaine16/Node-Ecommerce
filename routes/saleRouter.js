const { Router } = require("express")

const authMidd = require("../middlewares/authMidd")
const authOwner = require("../middlewares/authOwner")
const appController = require("../controllers/appController")
const userController = require("../controllers/userController")

const router = Router();