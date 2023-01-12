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

// Include CORS
const cors = require('cors')
app.use(cors({ origin: "*" }))

// Routing
const userRouter = require('./users/usersRoutes')
const loginRouter = require('./login/loginRoutes')
const projectRouter = require('./projects/projectsRoutes')
const noteRouter = require('./notes/notesRoutes')
app.use(userRouter, loginRouter, projectRouter, noteRouter);


// Set up port
const port = process.env.PORT || 5001;


// health manager route
app.get("/health", (request, response) => {
    response
        .status(200)
        .send({ message: "API is working" });
});



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

