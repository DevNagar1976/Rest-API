const express = require("express");
const app = express();

app.use(express.json());

// Routes
app.use("/api", require("./routes/playlists"));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
