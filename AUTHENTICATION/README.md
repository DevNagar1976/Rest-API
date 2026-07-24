# Session 3 – Authentication (JWT)

## Setup
```bash
npm install
node server.js
```
Server runs on `http://localhost:3000`.

## Try it out
```bash
# 1. Get a token
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@example.com"}'

# 2. Use it on the protected route
curl http://localhost:3000/my-orders \
  -H "Authorization: Bearer <paste token here>"

# 3. Try with no token (or a bad one) to see the 401 responses
curl http://localhost:3000/my-orders
```

## Task-by-task mapping
| Task | File |
|---|---|
| 1. `generateAuthToken(user)` | `authUtils.js` |
| 2. `verifyToken` middleware | `middleware/verifyToken.js` |
| 3. Protected `/my-orders` route | `routes/orders.js` |
| 4. Expired-token handling (`TokenExpiredError`) | `middleware/verifyToken.js` |
| 5. Code review + improvement | see below |

## Task 5 — Code review notes

**Review focus:** `verifyToken.js`

**Issue found:** the original `catch` block treated every verification failure
the same way (one generic "Invalid token" message), whether the token was
expired, malformed, or had a bad signature. That makes debugging harder and
gives the client less useful feedback.

**Improvement implemented:** the `catch` block now checks `err.name` for
`JsonWebTokenError` (malformed token / bad signature) separately from
`TokenExpiredError` (already required by Task 4), and returns a distinct
message for each, with a generic fallback for anything else. This keeps
error handling readable (one clear branch per failure type) without
exposing internal implementation details to the client.

Other suggestions considered but not implemented (left as an exercise):
- Move the JWT secret to a `.env` file with `dotenv` instead of a hard-coded
  fallback string.
- Add rate limiting on `/login` to slow down brute-force attempts.
- Use `jwt.verify`'s async callback form (or wrap in `util.promisify`) if you
  later add async logic like a token blocklist/database lookup.
