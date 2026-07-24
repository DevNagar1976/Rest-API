# playlist-api

CRUD API for Playlist Categories and Songs, built with Node.js, Express, and Mongoose (MongoDB).

## Setup (Task 1)

1. Make sure MongoDB is installed and running locally (default port `27017`).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` (already set to connect to a local `playlistdb` database):
   ```bash
   cp .env.example .env
   ```
4. Start the server:
   ```bash
   npm start
   ```
   or, for auto-reload during development:
   ```bash
   npm run dev
   ```
5. You should see:
   ```
   MongoDB connected: playlistdb
   Server running on http://localhost:3000
   ```

## Project Structure

```
playlist-api/
├── config/
│   └── db.js              # MongoDB connection (Task 1)
├── models/
│   ├── PlaylistCategory.js # Task 2
│   └── Song.js             # Task 4
├── routes/
│   ├── categories.js       # Task 2 & 3
│   └── songs.js            # Task 4 & 5
├── server.js
├── package.json
└── .env.example
```

## API Endpoints

### Task 2: Create a category
`POST /categories`
```json
{
  "name": "Workout",
  "description": "High energy songs for the gym"
}
```

### Task 3: List all categories
`GET /categories`

### Task 3: Delete a category by ID
`DELETE /categories/:id`

### Task 4: Add a song to a category
`POST /songs`
```json
{
  "title": "Eye of the Tiger",
  "artist": "Survivor",
  "category": "<categoryId from Task 2>"
}
```

### Task 5: Get all songs in a category (with category name populated)
`GET /songs?category=<categoryId>`

Example response:
```json
[
  {
    "_id": "665f1a2b3c4d5e6f7a8b9c0d",
    "title": "Eye of the Tiger",
    "artist": "Survivor",
    "category": {
      "_id": "665f1a2b3c4d5e6f7a8b9c0a",
      "name": "Workout"
    },
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```
This uses Mongoose's `.populate("category", "name")` to replace the raw `category` ObjectId with the actual category document (just its `name` field) in the response.

## Testing with curl

```bash
# 1. Create a category
curl -X POST http://localhost:3000/categories \
  -H "Content-Type: application/json" \
  -d '{"name":"Workout","description":"High energy songs"}'

# 2. List categories
curl http://localhost:3000/categories

# 3. Add a song (replace <categoryId> with the _id returned above)
curl -X POST http://localhost:3000/songs \
  -H "Content-Type: application/json" \
  -d '{"title":"Eye of the Tiger","artist":"Survivor","category":"<categoryId>"}'

# 4. Get songs by category (populated)
curl "http://localhost:3000/songs?category=<categoryId>"

# 5. Delete a category
curl -X DELETE http://localhost:3000/categories/<categoryId>
```
