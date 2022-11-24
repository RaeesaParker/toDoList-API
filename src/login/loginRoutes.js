const { Router } = require ("express");
const { loginUser } = require ("./loginControllers")
const { comparePass, tokenCheck} = require("../middleware/index")

// Login router
const loginRouter = Router();

// Login User
loginRouter.post('/auth', tokenCheck, comparePass, loginUser)






module.exports = loginRouter;