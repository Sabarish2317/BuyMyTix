const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    name: { type: String },
    phone: { type: String, required: true },
    profileImage: {
      data: { type: String },
      contentType: { type: String },
    },
    type: { type: String, required: true, default: "user" },
    // Preferences and location
    preferredLanguage: { type: String },
    city: { type: String },
    state: { type: String },

    // Auth-related
    googleId: { type: String },
    loginType: {
      type: String,
      enum: ["google", "email"],
      required: true,
      default: "email",
    },

    // Ticket sale history
    soldTickets: [
      {
        ticket: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "TicketListing",
        },
      },
    ],
    // otp and forgot password handling
    otp: { type: String, required: false },
    otpExpiry: { type: Date, required: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
