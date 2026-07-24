const express = require("express");
const { generateAuthToken } = require("./authUtils");
const ordersRouter = require("./routes/orders");

const app = express();
app.use(express.json());

// --- Fake login route just so you have a way to GET a token to test with ---
// (Not one of the 5 tasks, but needed to actually try things out end-to-end.)
app.post("/login", (req, res) => {
  // In a real app you'd verify a username/password here first.
  const fakeUser = { id: 1, email: req.body.email || "test@example.com" };
  const token = generateAuthToken(fakeUser);
  res.json({ token });
});

// Task 3's protected route lives here
app.use("/", ordersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`1. POST /login          -> get a token`);
  console.log(`2. GET  /my-orders      -> use header: Authorization: Bearer <token>`);
});
