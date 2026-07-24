require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const categoryRoutes = require("./routes/categories");
const songRoutes = require("./routes/songs");

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB (playlistdb)
connectDB();

// Routes
app.use("/categories", categoryRoutes);
app.use("/songs", songRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Playlist API is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
