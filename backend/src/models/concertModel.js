const mongoose = require("mongoose");

const concertTicketSchema = new mongoose.Schema({
    postId: { type: Number, unique: true }, // Auto-incrementing if needed
    eventName: { type: String, required: true },
    artist: { type: String, required: true }, // Performer/Band Name
    venue: { type: String, required: true },
    city: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    seatCategory: { 
        type: String, 
        enum: ["VIP", "General", "Silver", "Gold", "Bronze", "Fan Pit"], 
        required: true 
    },
    seatNumber: { type: String, required: false }, // Optional for standing tickets
    price: { type: Number, required: true },
    isSold: { type: Boolean, default: false },
    deliveryMethod: { type: String, enum: ["Email", "QR Code", "Physical"], required: true },
    resaleRestrictions: { type: String, required: false }, // Example: "Non-transferable"
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Ticket owner
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ConcertTicket", concertTicketSchema);
