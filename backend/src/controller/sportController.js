const SportsTicket = require('../models/sportModel');
const User = require('../models/userModel');

// Sell sports ticket controller function
async function sellSportTicket(req, res) {
    try {
        const {
            eventName,
            stadiumName,
            stadiumLocation,
            seatTotal,
            eventDate,
            eventTime,
            ticketCategory, // Silver, Gold, Bronze, Fan Pit
            pricePerTicket,
            seatNumber
        } = req.body;

        // Get user email from logged-in session
        const userEmail = req.user.email; 

        // Check if all required fields are provided
        if (!eventName || !stadiumName || !stadiumLocation || !eventDate || !eventTime || !ticketCategory || !pricePerTicket || !seatNumber) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check if the user exists
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new sports ticket
        const newTicket = new SportsTicket({
            eventName,
            stadiumName,
            stadiumLocation,
            seatTotal,
            eventDate,
            eventTime,
            ticketCategory,
            pricePerTicket,
            seatNumber,
            userEmail,
            seatNumberStatus: [{ isSold: false }],
        });

        // Save the ticket to the database
        await newTicket.save();

        return res.status(201).json({ message: 'Sports ticket posted for sale successfully', ticket: newTicket });

    } catch (error) {
        console.error("Error in sellSportsTicket:", error);
        return res.status(500).json({ message: 'Server error', error });
    }
}

module.exports = { sellSportTicket };
