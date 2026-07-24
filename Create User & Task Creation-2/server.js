const express = require('express');
const app = express();
app.use(express.json());

// --- Mock Data Stores ---
let playlists = [{ id: 1, name: 'Workout Mix' }];
let restaurants = [{ id: 1, name: 'Burger King' }, { id: 2, name: 'Domino\'s Pizza' }];
let cart = [{ productId: 101, name: 'Wireless Mouse' }, { productId: 102, name: 'Mechanical Keyboard' }];
let movies = [{ id: 1, title: 'Inception' }, { id: 2, title: 'The Dark Knight' }];
let users = [{ id: 1, name: 'Rahul', email: 'rahul@example.com' }];

// ==========================================
// TASK 1: DELETE Playlist by ID
// ==========================================
app.delete('/api/playlists/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = playlists.findIndex(p => p.id === id);
    
    if (index === -1) {
        return res.status(404).json({ error: 'Playlist does not exist.' });
    }
    
    playlists.splice(index, 1);
    res.json({ message: 'Playlist deleted successfully.' });
});


// ==========================================
// TASK 2: GET All Restaurants with try-catch
// ==========================================
const fetchRestaurants = () => {
    // Simulating a DB call. To test the catch block, you could throw an error here.
    return restaurants; 
};

app.get('/api/restaurants', (req, res) => {
    try {
        const data = fetchRestaurants();
        res.status(200).json(data);
    } catch (error) {
        // Sending 500 status for DB connection failures
        res.status(500).json({ error: 'Database connection failure. Could not fetch restaurants.' });
    }
});


// ==========================================
// TASK 3: DELETE Product from Cart by ID
// ==========================================
app.delete('/api/cart/:productId', (req, res) => {
    const productId = parseInt(req.params.productId, 10);
    const index = cart.findIndex(p => p.productId === productId);
    
    if (index === -1) {
        return res.status(404).json({ error: 'Product not found in cart.' });
    }
    
    cart.splice(index, 1);
    res.status(200).json({ message: 'Product removed from cart successfully.' });
});


// ==========================================
// TASK 4: GET Single Movie by ID
// ==========================================
app.get('/api/movies/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const movie = movies.find(m => m.id === id);
    
    if (!movie) {
        return res.status(404).json({ error: 'Movie not found.' });
    }
    
    res.status(200).json(movie);
});


// ==========================================
// TASK 5: DELETE User (Zomato-style)
// ==========================================
app.delete('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = users.findIndex(u => u.id === id);
    
    if (index === -1) {
        return res.status(404).json({ error: 'User not found.' });
    }
    
    users.splice(index, 1);
    res.status(200).json({ message: 'User account deleted successfully.' });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
