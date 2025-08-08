const express = require("express");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/logindetails.js");

const router = express.Router();

//auth required for fetch all notes of user route 1
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

//auth required for save the  all notes of user route 2
router.post(
  "/savenote",
  fetchuser,
  [
    body("title", "enter valid title").isLength({ min: 3 }),
    body("description", "enter valid des").isLength({ min: 3 }),
    body("tag", "enter min 1").isLength({ min: 1 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, tag } = req.body;
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      return res.status(400).json({ error: "error in notes saveuser" });
    }
  }
);

//auth required here route 3

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //let confirm whether user owns that note or not

    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("unauthorised service access");
    }

    //lets update the note now

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//obiviously login must required bhai route 4

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  let success = false;
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found note");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("unauthorised service access");
    }

    //delete note

    await Notes.findByIdAndDelete(req.params.id);
    success = true;
    res.json({success , success:"note deleted success",note:note})
  } catch (error) { console.error(error.message);
    res.status(500).send(success , "Server Error hai ruk abh");}
});

module.exports = router;
