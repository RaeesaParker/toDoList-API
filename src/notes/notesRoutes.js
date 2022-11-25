const { Router } = require ("express");
const { tokenCheck } = require("../middleware");
const { createNote, readNotes, deleteNote} = require("./notesControllers");


// User router
const noteRouter = Router();

// Create Note
noteRouter.post('/newNote', tokenCheck,  createNote );

// Read Note
noteRouter.get('/notes',  readNotes );


// Delete Note
noteRouter.delete('/notes/:id', deleteNote)


// Move Note Between Sections => Update Bin Value on Note 



module.exports = noteRouter;