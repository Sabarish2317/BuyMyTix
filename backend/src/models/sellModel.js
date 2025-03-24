const mongoose = require('mongoose');
const mongooseSequence = require('mongoose-sequence')(mongoose);

const ticketSchema = new mongoose.Schema({
    postId: { type: Number, unique: true },
    movieName: { type: String,required: true },
    theatreName: { type: String, required: true },
    theatreLocation: { type: String, required: true }, // theatre city
    showDate: { type: Date, required: true },
    showTime: { type: String, required: true }, 
    seatNumber: { type: String, required: true },
    seatTotal: { type: Number, required: true },
    screenNumber: { type: Number, required: true },
    pricePerTicket: { type: Number, required: true },
    
    seatNumberStatus: 
        [{
            isSold: { type: Boolean, default: false },  
        }],
    creationTimestamp: { type: Date, default: Date.now },

    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

ticketSchema.plugin(mongooseSequence, { inc_field: 'postId' });

// Create the model for the schema
module.exports = mongoose.model('Ticket', ticketSchema);
