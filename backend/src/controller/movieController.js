const axios = require('axios');
const Movie = require('../models/movieModel');
const dotenv = require('dotenv');

dotenv.config();

const getMovieData = async (req, res) => {
  const { movieName , year } = req.body; 

  try {
    const response = await axios.get(`http://www.omdbapi.com/`, {
      params: {
        t: movieName, 
        y: year,
        apikey: process.env.OMDB_API_KEY 
      }
    });

    const movieData = response.data;

    if (movieData.Response === 'False') {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const movie = new Movie({
      title: movieData.Title,
      description: movieData.Plot,
      imdbRating: movieData.imdbRating,
      releaseYear: movieData.Year,
      language: movieData.Language,
      certification: movieData.Rated,
      poster: movieData.Poster,
      coverImage: movieData.Poster 
    });

    await movie.save();

    res.status(201).json({ message: 'Movie data saved successfully', movie });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching or saving movie data', error });
  }
};

module.exports = { getMovieData };
