const mongoose = require("mongoose");

const eventReferenceSchema = new mongoose.Schema(
  {
    // Common
    title: { type: String, required: true, index: true },
    description: { type: String },
    venue: { type: String },
    location: { type: String },
    date: { type: Date, required: true },
    Poster: { type: String },

    // type
    type: {
      type: String,
      required: true,
      enum: ["Movie", "Sport", "Event"],
    },

    // Movie specific
    releaseYear: { type: Number },
    movieLanguage: { type: String },
    movieType: { type: String },

    // Sport specifi
    sportType: { type: String },
    teams: [{ type: String }],

    // Event specifi
    eventType: { type: String },
    artist: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("EventReference", eventReferenceSchema);
