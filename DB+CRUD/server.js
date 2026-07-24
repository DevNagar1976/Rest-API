const express = require('express');
const mongoose = require('mongoose');
const PlaylistCategory = require('./models/PlaylistCategory');
const Song = require('./models/Song');

const app = express();
app.use(express.json());

// Task 1: Connect to local MongoDB named playlistdb
mongoose.connect('mongodb://127.0.0.1:27017/playlistdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB (playlistdb)'))
.catch(err => console.error('MongoDB connection error:', err));

// ==========================================
// CATEGORY ROUTES
// ==========================================

// Task 2: Add a new category
app.post('/categories', async (req, res) => {
    try {
        const category = new PlaylistCategory(req.body);
        await category.save();
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Task 3: List all categories
app.get('/categories', async (req, res) => {
    try {
        const categories = await PlaylistCategory.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Task 3: Delete a category by ID
app.delete('/categories/:id', async (req, res) => {
    try {
        const category = await PlaylistCategory.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).json({ error: 'Category not found' });
        res.json({ message: 'Category deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// SONG ROUTES
// ==========================================

// Task 4: Add a new song
app.post('/songs', async (req, res) => {
    try {
        const song = new Song(req.body);
        await song.save();
        res.status(201).json(song);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Task 5: Fetch all songs or songs by category
app.get('/songs', async (req, res) => {
    try {
        const categoryId = req.query.category;
        let query = {};
        
        // Filter by category if the query parameter is provided
        if (categoryId) {
            query.category = categoryId;
        }
        
        // Use populate() to include the category details (specifically the name)
        const songs = await Song.find(query).populate('category', 'name');
        res.json(songs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
