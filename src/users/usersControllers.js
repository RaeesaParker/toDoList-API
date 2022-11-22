const { response } = require("express");
const User = require("./userModels");

// Create new user
exports.createUser = async (request, response) => {
  try {
    const newUser = await User.create(request.body);
    console.log("Successfully created new user", newUser);
    response.status(201).send({ user: newUser.username, token });
  } catch (error) {
    console.log(error);
    response.status(500).send({error: error.message});
  }
};


// Get a list of the users 
exports.readUsers = async (request, response) => {
  try {
    const usersList = await User.find({})
    console.log(usersList)
    response.status(200).send({user: usersList})
  } catch (error) {
    console.log(error);
    response.status(500).send({error: error.message});
  }
}
