const Ticket = require('../models/sellModel'); 
const User = require('../models/userModel'); 
const Movie = require('../models/movieModel'); 

// Sell ticket controller function
async function sellTicket(req, res) {
    try {
        const {
            theatreName,
            theatreLocation,
            seatTotal,
            showDate,
            showTime,
            screenNumber,
            pricePerTicket,
            seatNumber,
            movieName
        } = req.body;

        const userEmail = req.user.email;

        // Check if all required fields are provided
        if (!theatreName || !theatreLocation || !seatTotal || !showDate || !showTime || !screenNumber || !pricePerTicket || !seatNumber || !movieName) {
            return res.status(400).json({ message: 'Missing required fields' });
        }


        const movie = await Movie.findOne(movieName);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        const newTicket = new Ticket({
            theatreName,
            theatreLocation,
            seatTotal,
            showDate,
            showTime,
            screenNumber,
            pricePerTicket,
            seatNumber,
            userEmail,
            movieName, 
            seatNumberStatus: [{ isSold: true }], 
        });

        // Save the ticket to the database
        await newTicket.save();

        // Respond with success message and the created ticket
        return res.status(201).json({ message: 'Ticket to be sold is posted successfully', ticket: newTicket });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
}

module.exports = { sellTicket };
