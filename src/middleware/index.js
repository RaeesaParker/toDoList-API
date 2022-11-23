const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../users/usersModels')

// Set Salt Rounds
let saltRounds = 10;


// Hash password and set request.body.password to hashed
exports.hashPass = async (request, response, next) => {
  try {
    // For PUT request / update => check if there is a password => hash password
    if (request.method === "PUT"){
      if (request.body.password){
        request.body.password = await bcrypt.hash(request.body.password, saltRounds)
      }
      next() 
    }else{
      request.body.password = await bcrypt.hash(request.body.password, saltRounds)
      next()
    }
  } catch (error) {
      console.log(error)
      response.status(500).send({error: error.message})
  }
}


// Compare the entered password to the hashed => Check if the token has been authenticated 
exports.comparePass = async(request, response, next) => {
  try {
    // Check if user has passed the token check 
    if(request.authUser){
      request.user = await User.findOne({
        where: {username: request.authUser.username}
      })
    }else{
      request.user = await User.findOne({
        where: {username: request.body.username}
      })
    }

    // Check the password matches
    if (request.user && await bcrypt.compare(request.body.password, request.user.password)){
        next()
    }else{
        throw new Error("Incorrect username or password")
    } 

  } catch (error) {
      console.log(error)
      response.status(500).send({error: error.message})
  }
}


// Set Token Checking => If an authorization bearer token is passed => decode it => find a user with that ID => compare request.body with token data
exports.tokenCheck = async(request, response, next) => {
  try {
      if (request.header("Authorization")){
          const token = request.header("Authorization").replace("Bearer ", "")
          const decodedToken = await jwt.verify( token, process.env.SECRET )

          const user = await User.findOne({
            where : {user_id:decodedToken.user_id}
          })

          request.authUser = user
          console.log("Headers passed")
      }else{
          console.log("No headers passed")
      }
      next()
  } catch (error) {
      console.log(error)
      response.status(500).send({error: error.message}) 
  }
}

// Check that the token matches the request username
exports.tokenRequestCompare  = async(request, response, next) => {
  try {
    // If user has passed the token check => compare to body username => compare passwords to throw error
    if(request.authUser){

      if (request.authUser.username == request.body.username){
        next()
      }else{
        throw new Error("Incorrect username or password")
      }
    }else{
      next()
    }
  } catch (error) {
    console.log(error)
    response.status(500).send({error: error.message}) 
  }
}