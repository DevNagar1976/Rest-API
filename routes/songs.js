const express = require("express");
const router = express.Router();
const Song = require("../models/Song");

// Task 4: POST /songs — add a new song to a category
router.post("/", async (req, res) => {
  try {
    const { title, artist, category } = req.body;
    const song = await Song.create({ title, artist, category });
    res.status(201).json(song);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Task 5: GET /songs?category=<categoryId> — fetch all songs in a category,
// with the category name populated in the response via Mongoose's populate()
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    if (!category) {
      return res.status(400).json({ error: "category query param is required" });
    }

    const songs = await Song.find({ category }).populate("category", "name");
    res.status(200).json(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
