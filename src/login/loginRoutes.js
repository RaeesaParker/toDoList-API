const { Router } = require ("express");
const { loginUser } = require ("./loginControllers")
const { comparePass, tokenCheck, tokenRequestCompare} = require("../middleware/index")

// Login router
const loginRouter = Router();

// Login User
loginRouter.post('/auth', tokenCheck, tokenRequestCompare, comparePass, loginUser)






module.exports = loginRouter;