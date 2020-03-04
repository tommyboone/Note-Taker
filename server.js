const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8000;
const json = require("./Develop/db/db.json")

app.listen(PORT, () => {
  console.log("Server is listening on http://localhost:" + PORT);
});

let notesArray = [
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "Develop/public")));

//API CALL FOR NOTES, SENDS TO BROWSER AS AN ARRAY OBJECT
app.get("http://localhost:8000/api/notes", (err, res) => {
  try {
    notesArray = fs.readFileSync("Develop/db/db.json", "utf-8");
    console.log("Success!");

    notesArray = JSON.parse(notesArray);
  } catch (err) {
    console.log("\n error (in app.get.catch):");
    console.log(err);
  }
  res.json(notesData);
});

//WRITES THE NOTE TO A JSON FILE
app.post("/api/notes", (req, res) => {
  try {
    // reads the json file
    notesArray = fs.readFileSync("./Develop/db/db.json", "utf8");
    console.log(notesArray);

    // parse the data to get an array of objects
    notesArray = JSON.parse(notesArray);
    // Set new notes id
    req.body.id = notesArray.length;
    // add the new note to the array of note objects
    notesArray.push(req.body); // req.body - user input
    // make it string(stringify)so you can write it to the file
    notesArray = JSON.stringify(notesArray);
    // writes the new note to file
    fs.writeFile("./Develop/db/db.json", notesArray, "utf8", function(err) {
      // error handling
      if (err) throw err;
    });
    // changeit back to an array of objects & send it back to the browser(client)
    res.json(JSON.parse(notesArray));

    // error Handling
  } catch (err) {
    throw err;
   
  }

 
  
})


//GET Requests
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "Develop/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  return res.sendFile(path.join(__dirname, "Develop/db/db.json"));
});

//DELETE Request

app.delete("/api/notes/:id", (req, res) => {
  try {
    notesArray = fs.readFileSync("./Develop/db/db.json", "utf-8");
    notesArray = JSON.parse(notesArray);
    notesArray = notesArray.filter(function(note) {
      return note.id != req.params.id;
    });
    notesArray = JSON.stringify(notesArray);

    fs.writeFile("./Develop/db/db.json", notesArray, "utf8", function(err) {
      //
      if (err) throw err;
    });

    // change it back to an array of objects & send it back to the browser (client)
    res.send(JSON.parse(notesArray));
  } catch (err) {
    throw err;
  }
});
