const { Router } = require ("express");
const { createUser, readUsers } = require("./usersControllers");


// User router
const userRouter = Router();

// Create User
userRouter.post('/addUser', createUser);

// Get all users
userRouter.get('/readUsers', readUsers)

module.exports = userRouter;