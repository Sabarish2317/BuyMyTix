const Fuse = require('fuse.js');
const Movie = require('../models/movieModel'); // Import the movie model

const options = {
  includeScore: true,
  keys: ['title', 'genre', 'description', 'year'],
  threshold: 0.4,
};

// Controller method to handle search requests
const searchMovies = async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ message: 'Query is required' });
  }

  try {
    // Step 1: Fetch the movies data from MongoDB
    const movies = await Movie.find(); // Assuming this will return an array of movie documents

    if (!Array.isArray(movies) || movies.length === 0) {
      return res.status(404).json({ message: 'No movies found' });
    }

    // Step 2: Initialize Fuse with the fetched movies data
    const fuse = new Fuse(movies, options);

    // Step 3: Search with the query
    const results = fuse.search(query);
    const searchResults = results.map(result => result.item); // Extract the matched movies

    // Step 4: Return both autocomplete and search results
    return res.json({
      autocomplete: searchResults.map(result => result.title),  // Return only titles for autocomplete
      searchResults: searchResults,  // Return full movie data for smart search
    });
  } catch (error) {
    console.error('Error during search:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { searchMovies };
