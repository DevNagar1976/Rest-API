const express = require("express");
const app = express();

app.use(express.json());

const playlistRoutes = require("./routes/playlistRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/playlists", playlistRoutes);
app.use("/users", userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
