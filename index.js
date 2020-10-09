// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================
const path = require("path"); 
const express = require("express");
const fs = require("fs");
const router = express.Router();


// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port and compatiable with Heroku 
var PORT = process.env.PORT || 8080;

// Sets up the linking to index js
// =============================================================
app.use(express.static("public"))

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes
// =============================================================

// Returns index.html file
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

// GET *  Return the index.html file
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

  
//   Returns notes.html file
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });
  
// Get route for Note API


// DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. 
// This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note, 
// you'll need to read all notes from the db.json file, remove the note with the given id property, 
// and then rewrite the notes to the db.json file.



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  