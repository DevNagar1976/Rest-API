const mongoose = require("mongoose");

// Task 2: PlaylistCategory model — name (required), description (optional)
const playlistCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PlaylistCategory", playlistCategorySchema);
