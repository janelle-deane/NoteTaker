// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================
const express = require("express");

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
const htmlRoutes=require('./routes/htmlRoutes.js');
app.use(htmlRoutes);

const apiRoutes=require('./routes/apiRoutes.js')
app.use("/api", apiRoutes);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  