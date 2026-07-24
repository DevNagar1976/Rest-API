// Task 2 + Task 4: middleware that checks for a JWT, verifies it,
// attaches decoded user info to req.user, and handles expired tokens specially.
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../authUtils");

function verifyToken(req, res, next) {
  // Expect header format: "Authorization: Bearer <token>"
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // attach decoded payload (id, email) to the request
    next();
  } catch (err) {
    // Task 4: jwt.verify() throws a TokenExpiredError specifically for expired tokens
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Session expired, please login again" });
    }
    // Improvement (Task 5, from code review): the original code lumped every
    // non-expiry failure into one generic "Invalid token" message. Splitting out
    // JsonWebTokenError (bad signature / malformed token) makes debugging easier
    // for the client and for future developers reading the logs, without leaking
    // sensitive details about *why* it failed.
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Unauthorized: Malformed or invalid token" });
    }

    // Fallback for anything unexpected (e.g. jwt.verify misconfiguration)
    return res.status(401).json({ error: "Unauthorized: Token verification failed" });
  }
}

module.exports = verifyToken;
