const { Router } = require ("express");
const { loginUser } = require ("./loginControllers")
const { comparePass } = require("../middleware/index")

// Login router
const loginRouter = Router();

// Login User
loginRouter.post('/auth', comparePass, loginUser)






module.exports = loginRouter;