const express = require("express");
const router = express.Router();

// In-memory storage
let playlists = [];
let idCounter = 1;

/**
 * POST /playlist
 * Create playlist + Promise chaining
 */
router.post("/playlist", (req, res) => {
  const { name, songs } = req.body;

  if (!name || !Array.isArray(songs)) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const newPlaylist = {
    id: idCounter++,
    name,
    songs
  };

  Promise.resolve()
    .then(() => {
      playlists.push(newPlaylist);
      return playlists;
    })
    .then((allPlaylists) => {
      res.status(201).json({
        message: "Playlist created",
        data: newPlaylist,
        allPlaylists
      });
    })
    .catch(() => {
      res.status(500).json({ message: "Server error" });
    });
});

/**
 * GET /playlist/:id
 */
router.get("/playlist/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const playlist = playlists.find(p => p.id === id);

  if (!playlist) {
    return res.status(404).json({ message: "Playlist not found" });
  }

  res.status(200).json(playlist);
});

/**
 * GET /playlists
 * Return name + total songs only
 */
router.get("/playlists", (req, res) => {
  const result = playlists.map(p => ({
    name: p.name,
    totalSongs: p.songs.length
  }));

  res.status(200).json(result);
});

module.exports = router;
