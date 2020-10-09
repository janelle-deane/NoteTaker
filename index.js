// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================
var path = require("path"); 
var express = require("express");
var fs = require("fs");


// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port and compatiable with Heroku 
var PORT = process.env.PORT || 8080;

// Sets up the linking to add & view js
// =============================================================
app.use(express.static("public"))

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes
// =============================================================

// Returns index.html file
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });

// GET *  Return the index.html file
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });

  
//   Returns notes.html file
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });
  
  // GET /api/notes - Should read the db.json file and return all saved notes as JSON.
  // Displays the db.json and returns the saved all notes
  app.get("/api/notes", function(req, res) {
    let dbData= fs.readFileSync("db/db.json", "utf-8");
    dbData=JSON.parse(dbData)
    return res.json(dbData);
  });

// POST /api/notes - Should receive a new note to save on the request body, add it 
// to the db.json file, and then return the new note to the client.
app.post("/api/notes", function(req, res) {
  let dbData = fs.readFileSync("db/db.json", "utf-8");
  dbData = JSON.parse(dbData);
  let newDbData = {
  "title": req.body.title,
  "text": req.body.text,
  "id": Date.now(),
  }
  dbData.push(newDbData);
  fs.writeFileSync(path.join(__dirname, "db/db.json"), JSON.stringify(dbData, null, 2));
  res.send(true);
})


// DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. 
// This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note, 
// you'll need to read all notes from the db.json file, remove the note with the given id property, 
// and then rewrite the notes to the db.json file.



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  