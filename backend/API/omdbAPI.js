// const axios = require("axios");
// const dotenv = require("dotenv");

// dotenv.config();

// const getMovie = async (Title, releaseYear) => {
//   try {
//     const response = await axios.get(`http://www.omdbapi.com/`, {
//       params: {
//         t: Title,
//         y: releaseYear,
//         apikey: process.env.OMDB_API_KEY,
//       },
//     });

//     const movieData = response.data;

//     if (movieData.Response === "False") {
//       return res
//         .status(404)
//         .json({
//           message: "Movie not found, Enter the detaiil manually",
//           error,
//         });
//     }

//     return {
//       Title: movieData.Title,
//       movieDescription: movieData.Plot,
//       releaseYear: movieData.Year,
//       movieLanguage: movieData.Language,
//       moviePoster: movieData.Poster,
//     };
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ message: "Error fetching or saving movie data", error });
//   }
// };

// module.exports = { getMovie };
