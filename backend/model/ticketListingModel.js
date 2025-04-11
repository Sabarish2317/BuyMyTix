import mongoose from "mongoose";

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
    ticketQuantity: { type: Number, required: true },
    ticketPrice: { type: Number, required: true, index: true },
    seatDetails: {
      section: { type: String },
      row: { type: String },
      seatNumbers: [{ type: String }],
    },

    // Optional ticket info
    showTime: { type: String },
    entryGate: { type: String },
    userDescription: { type: String },
    ticketImage: { type: String },

    // Status
    status: {
      type: String,
      enum: ["Active", "Sold", "Expired"],
      default: "Active",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("TicketListing", ticketListingSchema);
