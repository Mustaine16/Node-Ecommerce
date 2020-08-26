function paramsBuilder(reqBody, validParams) {
  //reqBody --> <Object>req.body 
  //ValidParams --> <Array>Array of strings that indicates the valid params wich can be updated

  /*
    This function will check if a param send by the user is valid or not to alter in DB

    I.E, a client cant modify his role or id, only his username and password
    So, validParams= ["username", "password"]

    Warning: With this function, an admin couldn't change roles to let someone be a new admin 😪, maybe this fn shouldn't be executed if the user is Admin 🤔
  */

  let cleanParams = {};

  validParams.forEach((param) => {

    //First, if one of the params was not send, cleanParams is set to null
    if (!cleanParams || !reqBody.hasOwnProperty(param)) {
      cleanParams = null
      return false
    }

    if (!reqBody[param]) {
      cleanParams[param] = null;
    } else if (param == "username") {
      cleanParams[param] = reqBody[param].toString().toLowerCase().trim();
    } else {
      cleanParams[param] = reqBody[param].toString().trim();
    }
  });

  return cleanParams;

  /*
    return {
      username: "user",
      password:"123"
    }
  */
}

module.exports = paramsBuilder