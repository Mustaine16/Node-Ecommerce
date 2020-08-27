exports.ResponseObject = class ResponseObject {
  constructor(body = "", error = "", status = 200) {
    this.error = error
    this.status = status
    this.body = body
  }
}

exports.responseHandler = (res, responseObject, err = "") => {

  if (err && err.name === "SequelizeUniqueConstraintError") {
    console.log(err)
    responseObject.status = 400
    if (err.original.table === "Users") {
      responseObject.error = "There is an account asociated with this username"
    } else {
      responseObject.error = "App name duplicated, choose another"
    }
  }

  if (err && err.name === "SequelizeValidationError") {
    console.log(err);
    responseObject.status = 400
    responseObject.error = []
    err.errors.map(e => responseObject.error.push(e.message))
  }

  res.status(responseObject["status"])
  res.send(responseObject)
}