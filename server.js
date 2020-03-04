const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Server is listening on http://localhost:" + PORT);
});

let notesArray = [
  {
    title: "",
    text: ""
  }
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
  console.log("hi");
  let newNote = req.body;
  notesArray.push(newNote);
  console.log(notesArray)

  // res.json(JSON.parse(notesArray));
  res.json(newNote);
})
  try {
    notesArray = fs.readFileSync(
      "./Develop/db/db.json",
      newNote,
      "utf-8",
      err => {
        if (err) throw err;
        console.log("An error occured");
      }
    );
  } catch (err) {}


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
