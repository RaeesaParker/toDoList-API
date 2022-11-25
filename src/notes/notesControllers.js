const { response } = require("express");
const Note = require("./notesModels");
const User = require("../users/usersModels");



// Create new note
exports.createNote = async (request, response) => {
  try {
    // Put the authenticated user id in the request.body
    request.body.userId = request.authUser.id

    // Build new note
    const newNote = await Note.create(request.body);

    // Check it has successfully created a new note
    if ( !newNote ){
      response.status(500).send({error: "Note not created"});
      return 
    }

    // Attach userid to note => Find the user using the ID as the PK => Include the note 
    let loadedUser = await User.findByPk(request.body.userId, {include: Note})

    // Check we have loaded the user 
    if (!loadedUser){
      response.status(500).send({error: "User not loaded"});
      return 
    }

    // Add the project to the user 
    loadedUser.addNote(newNote)

    response.status(201).send({ notetName: newNote.noteTitle, id:newNote.id  });

  } catch (error) {
    console.log(error);
    response.status(500).send({error: error.message});
  }
};



// Get a list of the notes 
exports.readNotes = async (request, response) => {
  try {
    const notesList = await Note.findAll({})
    response.status(200).send({note: notesList})
  } catch (error) {
    console.log(error);
    response.status(500).send({error: error.message});
  }
};


// Delete Note
exports.deleteNote = async (request, response) => {
  try {
      await Note.destroy({
        where: {id: request.params.id}
      })
      response.status(200).send({message: "successfully deleted a note"})
  } catch (error) {
      console.log(error);
      response.status(500).send({error: error.message});
  }
}