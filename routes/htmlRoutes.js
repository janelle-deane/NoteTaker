const path= require("path");
const express = require("express");
const router = express.Router();

// Returns index.html file
router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  
//   Returns notes.html file
  router.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });
 

  // Returns index.html file
// router.get("*", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/index.html"));
//   });

module.exports=router;