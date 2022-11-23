const { Router } = require ("express");
const { createUser, readUsers, readOneUser, deleteUser, updateUser } = require("./usersControllers");
const { hashPass } = require("../middleware/index")


// User router
const userRouter = Router();

// Create User
userRouter.post('/addUser', hashPass, createUser);

// Get all users
userRouter.get('/users', readUsers)

// Get one User
userRouter.get('/users/:id', readOneUser)

// Delete User
userRouter.delete('/users/:id', deleteUser)

// Update User details
userRouter.put('/users/:id',updateUser) 


module.exports = userRouter;