// const axios = require('axios');
// const User = require('../model/userModel');
// const Movie = require('../model/movieModel');
// const Sport = require('../model/sportModel');
// const Event = require('../model/eventModel');
// const  { getMovie } = require('../API/omdbAPI');

// const newTicket = async (req, res) => {
//     try {
//       const { ticketType } = req.body;
//       const userId = req.user.userId;

//       if (!ticketType) {
//         return res.status(400).json({ message: "Select the ticket type" });
//       }

//       let ticketDetail = {};
//       let ticketModel = null;

//       async function duplicateTicket(model , Title, ticketDate, seatNo) {
//         try {
//             const date = new Date(ticketDate);
//             if (isNaN(date.getTime())) {
//               throw new Error("Invalid date format for ticketDate");
//             }

//             const query = {
//                 Title,
//                 seatNo,
//                 ticketDate: date
//             };

//             const existingTicket = await model.findOne(query);
//             return existingTicket ? true : false;
//         }
//         catch (error) {
//           console.error("Error checking duplicate ticket:", error);
//           return false;
//         }
//       }

//       if (ticketType === "movie") {

//           const { Title, releaseYear, moviePoster, movieDescription, movieLanguage } = req.body;

//           if (!Title || !releaseYear) {
//             return res.status(400).json({ message: "Please fill the movie name and year" });
//           }

//           const movieData = await getMovie(Title, releaseYear, moviePoster, movieDescription, movieLanguage);

//           if (!movieData) {
//             return res.status(400).json({ message: "Cannot access the server. Please enter manually." });
//           }

//           const { Title: fetchedTitle, releaseYear: fetchedYear, movieDescription: fetchedDescription, movieLanguage: fetchedLanguage, moviePoster: fetchedPoster } = movieData;

//           const { userDescription, movieTipe, movieTheatre , Location, screenNo, ticketDate, showTime, seatNo, ticketPrice, ticketQuantity, imageUrl } = req.body;

//           if (!screenNo || !movieTipe || !Location || !movieTheatre || !ticketDate || !showTime || !seatNo || !ticketPrice || !ticketQuantity) {
//             return res.status(400).json({ message: "Missing required fields for movie ticket" });
//           }

//           const duplicate = await duplicateTicket(Movie, Title, ticketDate, seatNo);
//           if (duplicate) {
//             return res.status(400).json({ message: "Ticket has already been uploaded" });
//           }

//           ticketDetail = {
//             userId,
//             ticketType,
//             Title: Title || fetchedTitle,
//             releaseYear: releaseYear || fetchedYear,
//             movieDescription: movieDescription || fetchedDescription,
//             movieLanguage: movieLanguage || fetchedLanguage,
//             userDescription,
//             movieTipe,
//             movieTheatre,
//             Location,
//             screenNo,
//             ticketDate,
//             showTime,
//             seatNo,
//             ticketPrice,
//             ticketQuantity,
//             imageUrl: imageUrl,
//             moviePoster: moviePoster || fetchedPoster,
//           };

//         ticketModel = Movie;
//       }

//       else if (ticketType === "event") {
//         const { Title, userDescription, eventVenue, Location, seatRow, ticketDate, eventTime, seatNo, ticketPrice, ticketQuantity, imageUrl } = req.body;

//         if (!Title || !Location || !eventVenue || !ticketDate || !eventTime || !seatNo || !ticketPrice || !ticketQuantity) {
//           return res.status(400).json({ message: "Missing required fields for event ticket" });
//         }

//         const duplicate = await duplicateTicket(Event, Title, ticketDate, seatNo);
//         if (duplicate) {
//           return res.status(400).json({ message: "Ticket has already been uploaded" });
//         }

//         ticketDetail = {
//           userId,
//           ticketType,
//           Title,
//           userDescription,
//           eventVenue,
//           Location,
//           seatRow,
//           ticketDate,
//           eventTime,
//           seatNo,
//           ticketPrice,
//           ticketQuantity,
//           imageUrl
//         };

//         ticketModel = Event;
//       }

//       else if (ticketType === "sport") {
//         const { Title, userDescription, matchVenue, Location , entryGate, seatRow, ticketDate, matchTime, seatNo, ticketPrice, ticketQuantity, imageUrl } = req.body;

//         if (!Title || !Location || !matchVenue || !entryGate || !seatRow || !ticketDate || !matchTime || !seatNo || !ticketPrice || !ticketQuantity) {
//           return res.status(400).json({ message: "Missing required fields for sport ticket" });
//         }

//         const duplicate = await duplicateTicket(Sport, Title, ticketDate, seatNo);
//         if (duplicate) {
//           return res.status(400).json({ message: "Ticket has already been uploaded" });
//         }

//         ticketDetail = {
//           userId,
//           ticketType,
//           Title,
//           userDescription,
//           Location,
//           matchVenue,
//           entryGate,
//           seatRow,
//           ticketDate,
//           matchTime,
//           seatNo,
//           ticketPrice,
//           ticketQuantity,
//           imageUrl
//         };

//         ticketModel = Sport;
//       }
//       if (ticketModel) {
//         const newTicket = new ticketModel(ticketDetail);
//         const ModelName = ticketModel.modelName;
//         await newTicket.save();

//         console.log()
//         console.log(newTicket._id.toString());
//         await User.findByIdAndUpdate(
//           userId,
//           {
//               $push: {
//                   userHistroy: {
//                       ticketId: newTicket._id.toString(),
//                       model: ModelName
//                   }
//               }
//           },
//           { new: true }
//       );

//         return res.status(201).json({ message: "Ticket created and added to sales successfully" });
//       } else {
//         return res.status(400).json({ message: "Invalid ticket type" });
//       }
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: "Error while adding ticket to sales" });
//     }
//   };

// const updateTicket = async (req, res) => {

//     const userId = req.user.userId;
//     const ticketId = req.params.ticketId;
//     const { ticketQuantity , ticketPrice , userDescription , movieTipe , screenNo , seatNo , imageUrl ,  entryGate , seatRow  } = req.body;

//     try {

//       const [movieTicket, sportTicket, eventTicket] = await Promise.all([
//         Movie.findOne({ _id: ticketId, userId }),
//         Sport.findOne({ _id: ticketId, userId }),
//         Event.findOne({ _id: ticketId, userId })
//       ]);

//       let ticket, ticketModel;

//       if (movieTicket) {
//         ticket = movieTicket;
//         ticketModel = Movie;
//       }

//       else if (sportTicket) {
//         ticket = sportTicket;
//         ticketModel = Sport;
//       }

//       else if (eventTicket) {
//         ticket = eventTicket;
//         ticketModel = Event;
//       }

//       if (!ticket) {
//         return res.status(404).json({ message: 'Ticket not found' });
//       }

//       ticket.ticketQunatity = ticketQuantity || ticket.ticketQuantity;
//       ticket.ticketPrice = ticketPrice || ticket.ticketPrice;
//       ticket.userDescription = userDescription || ticket.userDescription;
//       ticket.movieTipe = movieTipe || ticket.movieTipe;
//       ticket.screenNo = screenNo || ticket.screenNo;
//       ticket.seatNo = seatNo || ticket.seatNo;
//       ticket.imageUrl = imageUrl || ticket.imageUrl;
//       ticket.entryGate = entryGate || ticket.entryGate;
//       ticket.seatRow = seatRow || ticket.seatRow;

//       const updatedTicket = await ticketModel.findByIdAndUpdate(ticketId, ticket, { new: true });

//       res.status(200).json({ message: 'Ticket updated successfully', ticket: updatedTicket });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

// const viewTicket = async (req, res) => {

//   const userId = req.user.userId;
//   const ticketId = req.params.ticketId;

//   try {
//     const [movieTicket, sportTicket, eventTicket] = await Promise.all([
//       Movie.findOne({ _id: ticketId, userId }),
//       Sport.findOne({ _id: ticketId, userId }),
//       Event.findOne({ _id: ticketId, userId })
//     ]);

//     let ticket;
//     if(movieTicket){
//       ticket = movieTicket;
//     }
//     else if (sportTicket) {
//       ticket = sportTicket;
//     }
//     else if (eventTicket) {
//       ticket = eventTicket;
//     }

//     if (!ticket) {
//       return res.status(404).json({ message: 'Ticket not found' });
//     }

//     return res.status(200).json({ message : "Ticket found" , ticket });
//   }

//   catch(error){
//         console.log(error);
//         return res.status(400).json({ message : "Error while retirevein ghte details of the ticket"});
//   }

// };

// const deleteTicket = async (req, res) => {
//   const userId = req.user.userId;
//   const ticketId = req.params.ticketId;

//   try {
//     const [movieTicket, sportTicket, eventTicket] = await Promise.all([
//       Movie.findOne({ _id: ticketId, userId }),
//       Sport.findOne({ _id: ticketId, userId }),
//       Event.findOne({ _id: ticketId, userId })
//     ]);

//     let ticket, ticketModel;

//     if (movieTicket) {
//       ticket = movieTicket;
//       ticketModel = Movie;
//     }
//     else if (sportTicket) {
//       ticket = sportTicket;
//       ticketModel = Sport;
//     }
//     else if (eventTicket) {
//       ticket = eventTicket;
//       ticketModel = Event;
//     }

//     if (!ticket) {
//       return res.status(404).json({ message: 'Ticket not found' });
//     }

//     await ticketModel.deleteOne({ _id: ticket._id });

//     res.status(200).json({ message: 'Ticket deleted successfully', ticket });
//   }
//    catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// module.exports = { newTicket , updateTicket , viewTicket , deleteTicket };
