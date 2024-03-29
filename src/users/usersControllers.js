const { response } = require("express");
const User = require("./usersModels");
const Project = require('../projects/projectsModels')
const Note = require("../notes/notesModels");
const jwt = require('jsonwebtoken')


// Create new user => Create token
exports.createUser = async (request, response) => {
  try {
    const newUser = await User.create(request.body);
    const token = await jwt.sign({id: newUser.id}, process.env.SECRET)
    console.log("Successfully created new user", newUser.username);
    response.status(201).send({ userName: newUser.username, id:newUser.id, token, email:newUser.email });
  } catch (error) {
    console.log(error);
    response.status(500).send({error: error.message});
  }
};


// Get a list of the users 
exports.readUsers = async (request, response) => {
  try {
    const usersList = await User.findAll({
      attributes:[ "id", "username", "email" ], 
      include:[ 
        { model:Project, attributes:["id", "projectName", "themeName"] }
      ]
    })
    response.status(200).send({user: usersList})
  } catch (error) {
    console.log(error);
    response.status(500).send({error: error.message});
  }
};


// Get one user
exports.readOneUser = async (request, response) => {
  try {
    const usersList = await User.findOne({
      where: {id: request.params.id}
    })
    response.status(200).send({username: usersList.username, email:usersList.email })
  } catch (error) {
    console.log(error);
    response.status(500).send({error: error.message});
  }
};


// Delete User
exports.deleteUser = async (request, response) => {
  try {
      await User.destroy({
        where: {id: request.params.id}
      })
      response.status(200).send({message: "successfully deleted a user"})
  } catch (error) {
      console.log(error);
      response.status(500).send({error: error.message});
  }
}

// Update User
exports.updateUser = async (request, response) => {
  try {
    await User.update(
        request.body,
        { where: 
          { id: request.params.id }
        }
    );
    const usersList = await User.findOne({where: {id: request.params.id}})
    response.status(200).send({username: usersList.username, email:usersList.email, id:usersList.id })
  } catch (error) {
      console.log(error);
      response.status(500).send({error: error.message});
  }
}
