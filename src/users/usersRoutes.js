const { Router } = require ("express");
const { createUser, readUsers, readOneUser, deleteUser, updateUser } = require("./usersControllers");
const { hashPass, tokenCheck} = require("../middleware/index")
const { validateNewUser } = require('../middleware/validation')


// User router
const userRouter = Router();

// Create User
userRouter.post('/addUser', validateNewUser, hashPass, createUser);

// Get all users
userRouter.get('/users', readUsers)

// Get one User
userRouter.get('/users/:id', readOneUser)

// Delete User
userRouter.delete('/users/:id', tokenCheck,  deleteUser)

// Update User details
userRouter.put('/users/:id', tokenCheck, hashPass, updateUser) 


module.exports = userRouter;