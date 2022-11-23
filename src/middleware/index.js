const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../users/usersModels')

// Set Salt Rounds
let saltRounds = 10;

// Hash password and set request.body.password to hashed
exports.hashPass = async (request, response, next) => {
  try {
      request.body.password = await bcrypt.hash(request.body.password, saltRounds)
      next()
  } catch (error) {
      console.log(error)
      response.status(500).send({error: error.message})
  }
}