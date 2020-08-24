function paramsBuilder(bodyParams, validParams) {
  //BodyParams --> req.body
  //ValidParams --> Array of strings that indicates the valid params wich will be updated

  const parameters = {};
  // console.log(bodyParams);
  
  validParams.forEach((param) => {
    if (bodyParams.hasOwnProperty(param)) {
      //To set null in categoryId
      if (!bodyParams[param]) {
        parameters[param] = null;
      } else if (param == "email") {
        parameters[param] = bodyParams[param].toString().toLowerCase().trim();
      }else {
        parameters[param] = bodyParams[param].toString().trim();
      }
    }
  });

  return parameters;

  /*
    return {
      name: "demo",
      password:"123"
    }
  */
}

module.exports = paramsBuilder