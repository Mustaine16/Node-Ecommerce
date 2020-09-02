const { Router } = require("express")

const authMidd = require("../middlewares/authMidd")
const authOwner = require("../middlewares/authOwner")
const productController = require("../controllers/productController")
const userController = require("../controllers/userController")

const router = Router();

router.route()