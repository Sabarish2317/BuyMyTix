const mongoose = require("mongoose");

const sportsTicketSchema = new mongoose.Schema({
    postId: { type: Number, unique: true }, 
    sportType: { type: String, enum: ["Cricket", "Football", "Hockey", "Kabaddi"], required: true },
    matchDetails: { type: String, required: true }, 
    stadiumName: { type: String, required: true },
    city: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    seatNumber: { type: String, required: true },
    standName: { type: String, required: true }, 
    price: { type: Number, required: true },
    isSold: { type: Boolean, default: false },
    deliveryMethod: { type: String, enum: ["Email", "QR Code", "Physical"], required: true },
    resaleRestrictions: { type: String, required: false }, 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("SportsTicket", sportsTicketSchema);
