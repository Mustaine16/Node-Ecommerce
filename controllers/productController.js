const { Category } = require("../models")
const { Product } = require("../models")
const { ResponseObject, responseHandler } = require("../network/response")
const paramsBuilder = require("../utils/paramsBuilder")

const validParams = ["name", "price", "logo", "description", "brandId", "categoryId"]

const controller = {

  findProduct: async (req, res, next) => {
    try {
      const id = req.params.id
      if (!id) return responseHandler(res, new ResponseObject("", "Id is required", 400))

      const product = await Product.findByPk(id, {
        include: "category"
      })

      if (!product) return responseHandler(res, new ResponseObject("", "Product not found", 404))

      req.product = product
      req.mainObj = product
      next();
    } catch (err) {
      return responseHandler(res, new ResponseObject("", "Error loading Product", 500), err)
    }

  },

  show: (req, res) => {
    return responseHandler(res, new ResponseObject(req.product, "", 200))
  },

  index: async (req, res) => {
    try {
      const products = await Product.findAll()
      return responseHandler(res, new ResponseObject(products, "", 200))
    } catch (err) {
      return responseHandler(res, new ResponseObject("", "Error loading products", 500), err)
    }
  },

  create: async (req, res) => {
    try {
      const params = paramsBuilder(req.body, validParams)

      if (!params) return responseHandler(res, new ResponseObject("", "All fields must be filled", 400))
      //Add the dev ID
      params["userId"] = req.user.id

      const product = await Product.create(params)

      return responseHandler(res, new ResponseObject(product, "", 200))
    } catch (err) {
      return responseHandler(res, new ResponseObject("", "Error creating Product", 500), err)
    }
  },

  update: async (req, res) => {

    try {
      const params = paramsBuilder(req.body, validParams)

      if (!params) return responseHandler(res, new ResponseObject("", "Price and logo are required", 400))

      const updated = await Product.update(params, {
        where: { id: req.product.id }, returning: true
      })

      console.log("UPDATED:", updated);

      return responseHandler(res, new ResponseObject(updated, "", 200))
    } catch (err) {
      return responseHandler(res, new ResponseObject("", "Error updating product", 500), err)
    }

  },

  destroy: async (req, res) => {
    try {
      const product = await Product.destroy({ where: { id: req.product.id } })
      return responseHandler(res, new ResponseObject(product, "", 200))
    } catch (err) {
      return responseHandler(res, new ResponseObject("", "Error deleting product", 500), err)
    }
  }
}

module.exports = controller