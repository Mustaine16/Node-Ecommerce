const { Category } = require("../models")
const { App } = require("../models")
const { ResponseObject, responseHandler } = require("../network/response")
const paramsBuilder = require("../utils/paramsBuilder")

const validParams = {
  create: ["name", "price", "logo", "categoryId"],
  update: ["price", "logo"]
}

const controller = {

  findApp: async (req, res, next) => {
    try {
      const id = req.params.id
      if (!id) return responseHandler(res, new ResponseObject("", "Id is required", 400))

      const app = await App.findByPk(id, {
        include: "category"
      })

      if (!app) return responseHandler(res, new ResponseObject("", "App not found", 404))

      req.app = app
      req.mainObj = app
      next();
    } catch (err) {
      return responseHandler(res, new ResponseObject("", "Error loading App", 500), err)
    }

  },

  show: (req, res) => {
    return responseHandler(res, new ResponseObject(req.app, "", 200))
  },

  index: async (req, res) => {
    try {
      const apps = await App.findAll()
      return responseHandler(res, new ResponseObject(apps, "", 200))
    } catch (err) {
      return responseHandler(res, new ResponseObject("", "Error loading apps", 500), err)
    }
  },

  create: async (req, res) => {
    try {
      const params = paramsBuilder(req.body, validParams["create"])

      if (!params) return responseHandler(res, new ResponseObject("", "All fields must be filled", 400))
      //Add the dev ID
      params["userId"] = req.user.id

      const app = await App.create(params)

      return responseHandler(res, new ResponseObject(app, "", 200))
    } catch (err) {
      return responseHandler(res, new ResponseObject("", "Error creating App", 500), err)
    }
  },

  update: async (req, res) => {

    try {
      const params = paramsBuilder(req.body, validParams["update"])

      if (!params) return responseHandler(res, new ResponseObject("", "Price and logo are required", 400))

      const updated = await App.update(params, {
        where: { id: req.app.id }, returning: true
      })

      console.log("UPDATED:", updated);

      return responseHandler(res, new ResponseObject(updated, "", 200))
    } catch (err) {
      return responseHandler(res, new ResponseObject("", "Error updating app", 500), err)
    }

  },

  destroy: async (req, res) => {
    try {
      const app = await App.destroy({ where: { id: req.app.id } })
      return responseHandler(res, new ResponseObject(app, "", 200))
    } catch (err) {
      return responseHandler(res, new ResponseObject("", "Error deleting app", 500),err)
    }
  }
}

module.exports = controller