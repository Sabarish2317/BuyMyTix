const ConcertTicket = require('../models/concertModel');
const User = require('../models/userModel');
const Concert = require('../models/concertModel'); 

// Sell concert ticket controller function
async function sellConcertTicket(req, res) {
    try {
        const {
            concertName,
            venueName,
            venueLocation,
            seatTotal,
            concertDate,
            concertTime,
            ticketCategory, // Silver, Gold, Bronze, Fan Pit
            pricePerTicket,
            seatNumber
        } = req.body;

        const userEmail = req.user.email;

        // Check if all required fields are provided
        if (!concertName || !venueName || !venueLocation || !concertDate || !concertTime || !ticketCategory || !pricePerTicket || !seatNumber || !userEmail) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check if the user exists
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the concert exists
        const concert = await Concert.findOne({ name: concertName });
        if (!concert) {
            return res.status(404).json({ message: 'Concert not found' });
        }

        // Create a new concert ticket
        const newTicket = new ConcertTicket({
            concertName,
            venueName,
            venueLocation,
            seatTotal,
            concertDate,
            concertTime,
            ticketCategory,
            pricePerTicket,
            seatNumber,
            userEmail,
            seatNumberStatus: [{ isSold: false }],
        });

        // Save the ticket to the database
        await newTicket.save();

        return res.status(201).json({ message: 'Concert ticket posted for sale successfully', ticket: newTicket });

    } catch (error) {
        console.error("Error in sellConcertTicket:", error);
        return res.status(500).json({ message: 'Server error', error });
    }
}

module.exports = { sellConcertTicket };
