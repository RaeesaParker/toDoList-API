const { response } = require("express");
const Note = require("./notesModels");


// Create new user => Create token
// exports.createNote = async (request, response) => {
//   try {
//     const newUser = await User.create(request.body);
//     const token = await jwt.sign({id: newUser.id}, process.env.SECRET)
//     console.log("Successfully created new user", newUser);
//     response.status(201).send({ user: newUser.username, token});
//   } catch (error) {
//     console.log(error);
//     response.status(500).send({error: error.message});
//   }
// };
