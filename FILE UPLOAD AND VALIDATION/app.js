const express = require("express");
const app = express();

const uploadRoutes = require("./routes/uploadRoutes");

app.use("/api", uploadRoutes);

// Custom error handler
app.use((err, req, res, next) => {
  if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
});

app.listen(3000, () => console.log("Server running on port 3000"));
