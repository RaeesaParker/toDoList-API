const { Router } = require ("express");
const { tokenCheck } = require("../middleware");
const { createNote, readNotes, readProjectNotes, updateNote, deleteNote} = require("./notesControllers");


// Notes router
const noteRouter = Router();

// Create Note
noteRouter.post('/projects/:id/newNote', tokenCheck,  createNote );

// Read All Notes
noteRouter.get('/notes', tokenCheck, readNotes );

// Read All Notes from a specified project
noteRouter.get('/projects/:id/notes',  tokenCheck, readProjectNotes );

// Update the note => changing the noteBin   1 = To Do     2 = Doing     3 = Done
noteRouter.patch('/projects/:id/notes/:noteId', tokenCheck, updateNote)

// Delete Note
noteRouter.delete('/notes/:id', tokenCheck, deleteNote)




module.exports = noteRouter;