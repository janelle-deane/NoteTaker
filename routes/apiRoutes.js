const fs = require("fs");
const path= require("path");
const express =require("express"); 
const router = express.Router();
  
  // GET /api/notes - Should read the db.json file and return all saved notes as JSON.
  // Displays the db.json and returns the saved all notes
  router.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname,"db/db.json"));
  });

// POST /api/notes - Should receive a new note to save on the request body, add it 
// to the db.json file, and then return the new note to the client.
router.post("/api/notes", function(req, res) {
  let dbData = fs.readFileSync("../db/db.json", "utf-8");
  dbData = JSON.parse(dbData);
  let newDbData = {
  "title": req.body.title,
  "text": req.body.text,
  "id": Date.now(),
  }
  dbData.push(newDbData);
  
  fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(dbData, null, 2));
  res.json(newDbData);
})

module.exports=router;