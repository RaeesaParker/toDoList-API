const { Router } = require ("express");
const { loginUser } = require ("./loginControllers")

// Login router
const loginRouter = Router();

// Login User
loginRouter.post('/auth', loginUser)






module.exports = loginRouter;