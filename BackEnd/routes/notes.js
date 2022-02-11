const express = require("express");
const note = require("../Models/Note");
const jwtInterceptor = require("../middlewares/jwt.interceptor");
const logger = require("../logger/logger");
const { body, validationResult } = require("express-validator");

const router = express.Router();
//Notes operations to be written here
/*
1. Create a new note
2. Read existing note
3. Update existing note
4. Delete existing note
*/

//1. Get all the notes
router.get("/getallnotes", jwtInterceptor, async (req, res) => {
  const notes = await note.find({ userid: req.userId });
  res.send(notes);
});

//2. Create a new note
router.post(
  "/createnote",
  jwtInterceptor,
  [body("title", "Enter a valid title").exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error("Validation failed. Please check the validators.");
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const created = await note.create({
        title: req.body.title,
        description: req.body.description,
        userid: req.userId,
        tag: req.body.tag,
        date: req.body.date,
      });
      res.json(created);
    } catch (error) {
      logger.error(err.message);
      res.status(500).json({ error: "internal server error" });
    }
  }
);

//3. Update existing note
router.put(
  "/updatenote",
  jwtInterceptor,
  [body("id", "object id is required").exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error("Validation failed. Please check the validators.");
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const created = await note.findOneAndUpdate(
        {
          _id: req.body.id,
          userid: req.userId,
        },
        {
          title: req.body.title,
          description: req.body.description,
          tag: req.body.tag,
        },
        {
          new: true,
        }
      );
      if (created) {
        res.status(200).json(created);
      } else {
        res.status(404).json({ message: "No data found" });
      }
    } catch (error) {
      logger.error(err.message);
      res.status(500).json({ error: "internal server error" });
    }
  }
);

//4. Delete existing note

router.delete(
  "/deletenote",
  jwtInterceptor,
  [body("id", "object id is required").exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error("Validation failed. Please check the validators.");
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const created = await note.findOneAndDelete({
        _id: req.body.id,
        userid: req.userId,
      });
      if (created) {
        res.status(200).json(created);
      } else {
        res.status(404).json({ message: "No data found" });
      }
    } catch (error) {
      logger.error(err.message);
      res.status(500).json({ error: "internal server error" });
    }
  }
);

//Delete all notes by loggedin user
router.delete("/deleteall", jwtInterceptor, async (req, res) => {
  try {
    const created = await note.deleteMany({
      userid: req.userId,
    });
    res.json(created);
  } catch (error) {
    logger.error(err.message);
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = router;
