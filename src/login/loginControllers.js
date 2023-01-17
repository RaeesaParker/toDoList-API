const { response } = require("express");
const User = require("../users/usersModels");
const jwt = require('jsonwebtoken')



// Login User
exports.loginUser = async (request, response) => {
    console.log("At logging in")
  try {
      if(request.authUser){
          console.log("Token exists continue to login")
          response.status(200).send({userName: request.authUser.username, id: request.authUser.id, email:request.authUser.email})
      }else{
          const user = await User.findOne({
            where: {username: request.body.username}
          })
          const token = await jwt.sign({id: user.id}, process.env.SECRET)
          console.log("Token not passed, continue to login, generate new token")
          response.status(200).send({userName: user.username, id:user.id, token, email:user.email})
      }
  } catch (error) {
      console.log(error);
      response.status(500).send({error: error.message});
  }
}