const { Category } = require("../models")
const { ResponseObject, responseHandler } = require("../network/response")
const paramsBuilder = require("../utils/paramsBuilder")

const validParams = ["title"]

const controller = {

  findCategory: async (req, res, next) => {
    const id = req.params.id

    if (!id) return responseHandler(res, new ResponseObject("", "Id is required", 400))

    const category = await Category.findByPk(id)

    if (!category) return responseHandler(res, new ResponseObject("", "Category not found", 404))

    req.category = category

    return next();
  },

  index: async (req, res) => {
    try {
      const categories = await Category.findAll({
        attributes: ["id", "title"]
      })

      responseHandler(res, new ResponseObject(categories, "", 200))
    } catch (error) {
      responseHandler(res, new ResponseObject("", "Error loading categories", 500), err)
    }
  },

  show: async (req, res) => {
    const apps = await req.category.getApps();
    res.send(apps)
  },

  create: async (req, res) => {
    try {
      const params = paramsBuilder(req.body, validParams)

      if (!params) return responseHandler(res, new ResponseObject("", "Title is required", 400))

      const category = await Category.create(params)

      responseHandler(res, new ResponseObject(category, "", 200))
    } catch (err) {
      responseHandler(res, new ResponseObject("", "Error creating category", 500), err)
    }
  },

  update: async (req, res) => {
    try {
      const params = paramsBuilder(req.body, validParams)

      if (!params) return responseHandler(res, new ResponseObject("", "Title is required", 400))

      req.category.title = params["title"]
      await req.category.save();
      await req.category.reload();

      responseHandler(res, new ResponseObject(req.category, "", 200))
    } catch (err) {
      responseHandler(res, new ResponseObject("", "Error updating category", 500),err)
    }
  }

}

module.exports = controller