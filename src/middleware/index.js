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


// Compare the entered password to the hashed
exports.comparePass = async(request, response, next) => {
  try {
      request.user = await User.findOne({
        where: {username: request.body.username}
      })
      
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