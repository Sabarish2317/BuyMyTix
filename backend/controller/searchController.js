// const Fuse = require('fuse.js');
// const Movie = require('../model/movieModel');
// const Sport = require('../model/sportModel');
// const Event = require('../model/eventModel');

// const options = {
//   includeScore: true,
//   keys: ['Title'],
//   threshold: 0.1,
// };

// const searchTicket = async (req, res) => {
//   const query = req.query.q;

//   const { Location , ticketType , movieLanguage , fromDate , toDate } = req.body;

//   if (!query) {
//     return res.status(400).json({ message: 'Query is required' });
//   }

//   try {

//     const filters = {};
//     if (Location) filters.Location = Location;
//     if (ticketType) filters.ticketType = ticketType;
//     if (movieLanguage) filters.movieLanguage = movieLanguage;

//   const dateFilter = {};
//     if (fromDate || toDate) {
//       dateFilter.ticketDate = {};
//       if (fromDate) dateFilter.ticketDate.$gte = new Date(fromDate);
//       if (toDate) dateFilter.ticketDate.$lte = new Date(toDate);
//     }

//     const [movies, sports, events] = await Promise.all([
//       Movie.find({ ...filters , ...dateFilter }),
//       Sport.find({ ...filters , ...dateFilter }),
//       Event.find({ ...filters , ...dateFilter })
//     ]);

//     const fuseMovies = new Fuse(movies, options);
//     const fuseSports = new Fuse(sports, options);
//     const fuseEvents = new Fuse(events, options);

//     const movieResults = fuseMovies.search(query).map(result => result.item);
//     const sportResults = fuseSports.search(query).map(result => result.item);
//     const eventResults = fuseEvents.search(query).map(result => result.item);

//     const allResults = [...movieResults, ...sportResults, ...eventResults];

//     if (allResults.length === 0) {
//       return res.status(404).json({ message: 'No tickets found' });
//     }

//     return res.json({
//       autocomplete: allResults.map(result => result.Title ),
//       searchResults: allResults,
//     });
//   }
//    catch (error) {
//     console.error('Error during search:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };

// module.exports = { searchTicket };
