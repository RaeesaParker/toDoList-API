const { Router } = require ("express");
const { tokenCheck } = require("../middleware");
const { createProject, readProjects, readOneProject, readUserProjects, deleteProject } = require("./projectsControllers");


// User router
const projectRouter = Router();


// Create Project
projectRouter.post('/newProject', tokenCheck,  createProject);

// Get all projects
projectRouter.get('/projects', readProjects)

// Get one project
projectRouter.get('/projects/:id', tokenCheck,  readOneProject)

// Get all projects of a user
projectRouter.get('/user/:id/projects', tokenCheck,  readUserProjects)

// Delete Project
projectRouter.delete('/projects/:id', tokenCheck, deleteProject)


module.exports = projectRouter;