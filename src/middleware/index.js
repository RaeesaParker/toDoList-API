const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../users/userModels')

// Set Salt Rounds
let saltRounds = 10;

// Hash passwords
exports.hashPass = async (request, response, next) => {
  try {
      request.body.password = await bcrypt.hash(request.body.password, saltRounds)
      next()
  } catch (error) {
      console.log(error)
      response.status(500).send({error: error.message})
  }
}