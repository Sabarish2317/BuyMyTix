// const Movie = require('../model/movieModel');
// const Sport = require('../model/userModel');
// const Event = require('../model/eventModel');

// const latestTicket = async (req, res) => {

//     const requiredCount = req.query.c || 10;
//     const ticketType = req.body;

//     try {
//         if(isNaN(requiredCount) || requiredCount <= 0) {
//             return res.status(404).json({ message : "invalid count limit"});
//         }

//         let Ticket;

//         if(ticketType == "movie"){
//             Ticket = Movie;
//         }
//         else if(ticketType == "sport"){
//             Ticket = Sport;
//         }
//         else if(ticketType == "event"){
//             Ticket = Event;
//         }

//         const latestTic = await Ticket.find() .sort({timestamp :  -1}) .limit(requiredCount);

//         return res.status(200).json({ message : "latest tic" , latestTic});
//     }

//     catch(error){
//         console.log(error);
//         return res.status(400).json({ message : "Error while fetching the latest ticket"});
//     }
// };

// module.exports = { latestTicket };
