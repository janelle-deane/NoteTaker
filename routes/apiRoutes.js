const fs = require("fs");
const path= require("path");
const express =require("express"); 
const router = express.Router();
  
// When page loads, read existing data
const dbData= JSON.parse(fs.readFileSync(path.join(__dirname,"../db/db.json")));
// console.log(dbData);

router.post("dbData")
// Get route for Note API
  router.get("/api/notes", function(req, res) {
    console.log(dbData) 
    res.json(dbData)
    // res.sendFile(path.join(__dirname,"../db/db.json"));
  });


// POST /api/notes - Should receive a new note to save on the request body, add it 
// to the db.json file, and then return the new note to the client.
router.post("/api/notes", function(req, res) {
    let newDbData = {
        "title": req.body.title,
        "text": req.body.text,
      //   Each ID is given an unique id when it's saved
        "id": Date.now(),
        }
        console.log(newDbData)
    // dbData.push(newDbData);
    
    // fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(NewDbData, null, 2));
    // res.json(newDbData);
  })


 






// - Should receive a query parameter containing the id of a note to delete. 
// This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note, 
// you'll need to read all notes from the db.json file, remove the note with the given id property, 
// and then rewrite the notes to the db.json file.

// DELETE /api/notes/:id -uses unique ID to select and delete unneed notes
// const data= require("../db/db.json")
// router.delete("/api/notes/:id", function(req, res){
//     let idDelete = req.body.id;
//     for (let i = 0; i < data.length; i++) {
//         if(idDelete===data[i].id){
//             idDelete.splice(i,1)
//         }
//     }  
// })




module.exports=router;