// Task 1: Install jsonwebtoken (npm install jsonwebtoken) and generate a JWT
const jwt = require("jsonwebtoken");

// In a real app, keep this in an environment variable (.env), never hard-code it.
const JWT_SECRET = process.env.JWT_SECRET || "super-secret-dev-key";

/**
 * Creates a signed JWT containing the user's id and email.
 * @param {{ id: string|number, email: string }} user
 * @returns {string} signed JWT
 */
function generateAuthToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
  };

  // 1h is realistic for production. To demo the "expired token" flow in Task 4,
  // temporarily change this to something short like "5s" and wait it out.
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

module.exports = { generateAuthToken, JWT_SECRET };
