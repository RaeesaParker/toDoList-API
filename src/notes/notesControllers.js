const { response } = require("express");
const Note = require("./notesModels");
const User = require("../users/usersModels");
const Project = require("../projects/projectsModels");



// Create new note
exports.createNote = async (request, response) => {
  try {
    // Put the authenticated user id in the request.body => Put project id into request.body
    request.body.userId = request.authUser.id
    request.body.projectId = request.params.id

    // Check that the project belongs to the user 
    const foundProject = await Project.findOne({
      where: {
        id: request.body.projectId,
        UserId: request.body.userId,
      }
    })

    if(!foundProject){
      console.log("Project does not belong to user")
      response.status(500).send({error: "Project does not belong to User"});
      return
    }

    // Build new note
    const newNote = await Note.create(request.body);

    // Check it has successfully created a new note
    if ( !newNote ){
      response.status(500).send({error: "Note not created"});
      return 
    }

    // Attach projectid to note => Find the project using the ID as the PK => Include the note 
    let loadedProject = await Project.findByPk(request.body.projectId, {include: Note})

    // Check we have loaded the project 
    if (!loadedProject){
      response.status(500).send({error: "Project not loaded"});
      return 
    }

    // Add the note to the project 
    loadedProject.addNote(newNote)

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


// Get a list of the notes from one project
exports.readProjectNotes = async (request, response) => {
  try {
    const projectNotesList = await Note.findAll({
      where: {ProjectId: request.params.id}
    })
    response.status(200).send(projectNotesList)
  } catch (error) {
    console.log(error);
    response.status(500).send({error: error.message});
  }
};


// Update note => changing the noteBin    1 = To Do     2 = Doing     3 = Done
exports.updateNote = async (request, response) => {
  try {
    await Note.update(
      request.body,
      { where: 
        { id: request.params.noteId }
      }
    );
    response.status(200).send({message: "noteBin field has been updated"})
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