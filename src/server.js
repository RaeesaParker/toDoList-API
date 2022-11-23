// ---------------------------------- //
// Including Packages			
// ---------------------------------- //

// Import database and sync tables
const { sequelize } = require("./db/connection");
const syncTables = async () => { await sequelize.sync(); }
syncTables();

// Framework
const express = require('express');
const app = express();

// Body Parsing
app.use(express.json());

// Routing
const userRouter = require('./users/usersRoutes')
const loginRouter = require('./login/loginRoutes')
app.use(userRouter, loginRouter);


// Set up port
const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

