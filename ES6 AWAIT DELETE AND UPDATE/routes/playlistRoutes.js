const express = require("express");
const router = express.Router();

let playlists = [
  { id: 1, name: "Top Hits", songs: 20 },
  { id: 2, name: "Chill Vibes", songs: 15 }
];

const delay = (ms) => new Promise(res => setTimeout(res, ms));

router.get("/", (req, res) => {
  res.status(200).json(playlists);
});

router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: "Name required" });

    await delay(500);

    const playlist = playlists.find(p => p.id === id);
    if (!playlist) return res.status(404).json({ message: "Not found" });

    playlist.name = name;

    res.status(200).json(playlist);

  } catch (err) {
    res.status(500).json({ message: "Error updating playlist" });
  }
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = playlists.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Not found" });
  }

  playlists.splice(index, 1);

  res.status(200).json({ message: "Deleted" });
});

module.exports = router;
