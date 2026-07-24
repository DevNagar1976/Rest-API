const express = require("express");
const router = express.Router();
const PlaylistCategory = require("../models/PlaylistCategory");

// Task 2: POST /categories — add a new category
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await PlaylistCategory.create({ name, description });
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Task 3: GET /categories — list all playlist categories
router.get("/", async (req, res) => {
  try {
    const categories = await PlaylistCategory.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Task 3: DELETE /categories/:id — delete a category by its ID
router.delete("/:id", async (req, res) => {
  try {
    const category = await PlaylistCategory.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted", category });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
