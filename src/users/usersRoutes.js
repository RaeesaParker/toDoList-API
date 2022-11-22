const { Router } = require ("express");
const { createUser, readUsers, deleteUser } = require("./usersControllers");


// User router
const userRouter = Router();

// Create User
userRouter.post('/addUser', createUser);

// Get all users
userRouter.get('/readUsers', readUsers)

// Delete User
userRouter.delete('/deleteUser', deleteUser)

module.exports = userRouter;