const mongoose = require("mongoose");

const ticketListingSchema = new mongoose.Schema(
  {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    eventRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EventReference",
      required: true,
      index: true,
    },

    // Ticket details
    venue: { type: String, required: true },
    ticketQuantity: { type: Number, required: true },
    ticketPrice: { type: Number, required: true, index: true }, //per ticket
    showTime: {
      type: Date,
      required: true,
    },
    seatDetails: {
      entryGate: { type: String },
      row: { type: String },
      seatNumbers: { type: String, required: true },
    },

    userDescription: { type: String },
    // expiry time (same as the event start time )
    expiryTime: {
      type: Date,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TicketListing", ticketListingSchema);
