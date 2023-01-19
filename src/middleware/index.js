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
      // Catch missing password
      if (!request.body.password){
        response.status(500).send({error: "a password is required",});
        return;
      }
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
  console.log("At comparing passwords")
  try {
    // Check if user has passed the token check 
    if(request.authUser){
      request.authUser = await User.findOne({where: {username: request.authUser.username}});
      console.log("The requested User is ", request.authUser)
      next()
    }else{
      request.user = await User.findOne({ where: {username: request.body.username}})
      if (request.user && await bcrypt.compare(request.body.password, request.user.password)){
        next()
      }else{
          throw new Error("Incorrect username or password")
      } 
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
      console.log("The decoded token is ", decodedToken)
      const user = await User.findOne({ where : {id:decodedToken.id}})
      request.authUser = user
      console.log("User is authenticated")
      next()
    }else{
      response.status(401).send({
        status: "Not authorized, login required",
      });
      return;
    }
  } catch (error) {
      console.log(error)
      response.status(500).send({error: error.message}) 
  }
}



// Check for cookie value 
exports.validPersistantToken = async (request, response) => {
  try {
    if (!request.body.token) {
      response.status(401).send({ status: "No token supplied, not authorized, login required",});
      return;
    }

    const token = request.body.token;
    const decodedToken = await jwt.verify(token, process.env.SECRET);

    // Check the user is valid =>  attempt to get a user
    const user = await User.findOne({ where : {id:decodedToken.id}})

    if (!user) { 
      response.status(401).send({ status: "Not authorized, login required",});
      return;
    }

    console.log("The decoded token is ", decodedToken);
    response.status(200).send({ id: user.id, userName: user.username, email:user.email});

  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
};