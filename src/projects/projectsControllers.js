const { response } = require("express");
const Project = require("./projectsModels");
const User = require("../users/usersModels");
const Note = require('../notes/notesModels')

// Create new project
exports.createProject = async (request, response) => {
  try {
    if (request.authUser){
      // Put the authenticated user id in the request.body
      request.body.userId = request.authUser.id
    }else{
      response.status(401).send({
        status: "Not authorized, login required",
      });
      return;
    }

    // Build project 
    const newProject = await Project.create(request.body);

    // Check it has successfully created a new project
    if ( !newProject ){
      response.status(500).send({error: "Project not created"});
      return 
    }

    // Attach userid to project => Find the user using the ID as the PK => Include the project 
    let loadedUser = await User.findByPk(request.body.userId, {include: Project})

    // Check we have loaded the user 
    if (!loadedUser){
      response.status(500).send({error: "User not loaded"});
      return 
    }

    // Add the project to the user 
    loadedUser.addProject(newProject)

    response.status(201).send({ projectName: newProject.projectName, id:newProject.id  });

  } catch (error) {
    console.log(error);
    response.status(500).send({error: error.message});
  }
};


// Get a list of the projects 
exports.readProjects = async (request, response) => {
  try {
    const projectsList = await Project.findAll({
      attributes:[ "id", "projectName", "themeName", "UserId" ], 
      include:[ 
        { model:Note, attributes:["id", "noteTitle", "noteContent"] } 
      ]})


    response.status(200).send({project: projectsList})
  } catch (error) {
    console.log(error);
    response.status(500).send({error: error.message});
  }
};



// Get one project
exports.readOneProject = async (request, response) => {
  try {
    if (request.authUser){
      // Put the authenticated user id in the request.body
      request.body.userId = request.authUser.id
    }else{
      response.status(401).send({
        status: "Not authorized, login required",
      });
      return;
    }
    const projectsList = await Project.findOne({
      where: {id: request.params.id}
    })
    response.status(200).send({projectName: projectsList.projectName, themeName:projectsList.themeName, id:projectsList.id})
  } catch (error) {
    console.log(error);
    response.status(500).send({error: error.message});
  }
};


// Get all projects of a user
exports.readUserProjects = async (request, response) => {
  try {
    if (request.authUser){
      // Put the authenticated user id in the request.body
      request.body.userId = request.authUser.id
    }else{
      response.status(401).send({
        status: "Not authorized, login required",
      });
      return;
    }
    const projectsList = await Project.findAll({
      where: {UserId: request.body.userId}
    })
    response.status(200).send(projectsList)
  } catch (error) {
    console.log(error);
    response.status(500).send({error: error.message});
  }
};


// Delete Project
exports.deleteProject = async (request, response) => {
  try {
    if (request.authUser){
      // Put the authenticated user id in the request.body
      request.body.userId = request.authUser.id
    }else{
      response.status(401).send({
        status: "Not authorized, login required",
      });
      return;
    }
    await Project.destroy({where: {id: request.params.id}})
    response.status(200).send({message: "successfully deleted a project"})
  } catch (error) {
    console.log(error);
    response.status(500).send({error: error.message});
  }
}