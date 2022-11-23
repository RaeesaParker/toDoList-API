const { response } = require("express");
const User = require("../users/usersModels");


// Login User
exports.loginUser = async (request, response) => {
  try {
      // if(request.authUser){
      //     console.log("Token exists continue to login")
      //     response.status(200).send({username: request.user.username})
      // }else{
          const user = await User.findOne({
            where: {username: request.body.username}
          })
          // const token = await jwt.sign({_id: user._id}, process.env.SECRET)
          // console.log("Token not passed, continue to login, generate new token")
          response.status(200).send({username: user.username})
      // }
  } catch (error) {
      console.log(error);
      response.status(500).send({error: error.message});
  }
}