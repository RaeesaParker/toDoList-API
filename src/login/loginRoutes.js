const { Router } = require ("express");
const { loginUser } = require ("./loginControllers")
const { comparePass, validPersistantToken} = require("../middleware/index")

// Login router
const loginRouter = Router();

// Login User
loginRouter.post('/auth', comparePass, loginUser)

loginRouter.post('/auth/checkToken', validPersistantToken)






module.exports = loginRouter;