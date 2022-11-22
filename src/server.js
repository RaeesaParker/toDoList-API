// ---------------------------------- //
// Including Packages			
// ---------------------------------- //

// Framework
const express = require('express');
const app = express();

// Body Parsing
app.use(express.json());

// Routing
const userRouter = require('./users/usersRoutes')
app.use(userRouter);


// Set up port
const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

