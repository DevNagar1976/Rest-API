const express = require('express');
const app = express();
app.use(express.json());

// In-memory data stores for this exercise
let playlists = [];
let movies = [];
let playlistIdCounter = 1;
let movieIdCounter = 1;

// ==========================================
// TASKS 1 & 3: PLAYLIST ENDPOINTS
// ==========================================

// Task 1: POST /api/playlist
app.post('/api/playlist', (req, res) => {
    const { name, description } = req.body;

    // Error handling for missing fields
    if (!name || !description) {
        return res.status(400).json({ error: 'Both name and description are required fields.' });
    }

    const newPlaylist = { 
        id: playlistIdCounter++, 
        name, 
        description 
    };
    playlists.push(newPlaylist);

    // JSON response with success message and created object
    res.status(201).json({ 
        message: 'Playlist created successfully', 
        playlist: newPlaylist 
    });
});

// Task 3: PUT /api/playlist/:id
app.put('/api/playlist/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { name, description } = req.body;
    
    const playlistIndex = playlists.findIndex(p => p.id === id);
    
    // 404 error if not found
    if (playlistIndex === -1) {
        return res.status(404).json({ error: 'Playlist not found' });
    }

    // Update existing fields if provided
    if (name) playlists[playlistIndex].name = name;
    if (description) playlists[playlistIndex].description = description;

    res.status(200).json({ 
        message: 'Playlist updated successfully', 
        playlist: playlists[playlistIndex] 
    });
});


// ==========================================
// TASKS 2 & 4: MOVIE ENDPOINTS
// ==========================================

// Task 2: POST /api/movie
app.post('/api/movie', (req, res) => {
    const { title, genre, releaseYear } = req.body;

    // Error handling: title less than 2 characters
    if (!title || typeof title !== 'string' || title.length < 2) {
        return res.status(400).json({ error: 'Title is required and must be at least 2 characters long.' });
    }

    // Error handling: releaseYear is not a number
    if (releaseYear === undefined || typeof releaseYear !== 'number') {
        return res.status(400).json({ error: 'Release year must be a valid number.' });
    }

    const newMovie = { 
        id: movieIdCounter++, 
        title, 
        genre, 
        releaseYear 
    };
    movies.push(newMovie);

    // Suitable success response
    res.status(201).json({ 
        message: 'Movie created successfully', 
        movie: newMovie 
    });
});

// Task 4: PUT /api/movie/:id
app.put('/api/movie/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { genre, releaseYear } = req.body;

    const movieIndex = movies.findIndex(m => m.id === id);
    
    // Error if movie does not exist
    if (movieIndex === -1) {
        return res.status(404).json({ error: 'Movie not found' });
    }

    // Constraint: Validate allowed genres
    const allowedGenres = ['Action', 'Drama', 'Comedy', 'Thriller'];
    if (genre && !allowedGenres.includes(genre)) {
        return res.status(400).json({ error: "Invalid genre. Must be 'Action', 'Drama', 'Comedy', or 'Thriller'." });
    }

    // Error if releaseYear is provided but invalid
    if (releaseYear !== undefined && typeof releaseYear !== 'number') {
        return res.status(400).json({ error: 'Release year must be a valid number.' });
    }

    // Update fields
    if (genre) movies[movieIndex].genre = genre;
    if (releaseYear !== undefined) movies[movieIndex].releaseYear = releaseYear;

    res.status(200).json({ 
        message: 'Movie updated successfully', 
        movie: movies[movieIndex] 
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
