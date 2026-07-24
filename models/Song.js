const mongoose = require("mongoose");

// Task 4: Song model — title (required), artist, category (ref to PlaylistCategory)
const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Song title is required"],
      trim: true,
    },
    artist: {
      type: String,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlaylistCategory",
      required: [true, "Category is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Song", songSchema);
