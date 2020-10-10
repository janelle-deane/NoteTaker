const fs = require("fs");
const path= require("path");
const express =require("express"); 
const router = express.Router();
 
let notes =[]; 

// When page loads, read existing data
const dbData= JSON.parse(fs.readFileSync(path.join(__dirname,"../db/db.json")));


// Get route for Note API
  router.get("/notes", function(req, res) {
    res.json(dbData)
    res.sendFile(path.join(__dirname,"../db/db.json"));
  });


// POST /api/notes - Should receive a new note to save on the request body, add it 
// to the db.json file, and then return the new note to the client.
router.post("/notes", function(req, res) {
    let newDbData = {
        "title": req.body.title,
        "text": req.body.text,
      //   Each ID is given an unique id when it's saved
        "id": Date.now(),
        }
        console.log(newDbData)
    notes.push(newDbData);
    let newNotes = notes.concat(dbData);
    fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(newNotes, null, 2));
    res.json(newNotes);
  })

// DELETE /api/notes/:id -uses unique ID to select and delete unneed notes
router.delete("/notes/:id", function(req, res){
    let idDelete = req.params.id;
    let finalNotes = dbData.filter((newNotes) => newNotes.id != idDelete); 
    fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(finalNotes, null, 2));
    res.send(true);
})

module.exports=router;