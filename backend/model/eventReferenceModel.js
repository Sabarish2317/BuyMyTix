const mongoose = require("mongoose");

const eventReferenceSchema = new mongoose.Schema(
  {
    // Common for all types
    title: { type: String, required: true, index: true }, // Eg:{Avengers Endgamse, Anirudh concert, Ind vs Australia cricket}
    description: { type: String }, // Eg:{"Movie description form imdb given by user from frontend", "No description from source for events and sports"}
    poster: { type: String }, //{"Poster given by user from frontend"} stored as base64

    // type
    type: {
      type: String,
      required: true,
      enum: ["Movie", "Sport", "Event"],
    },

    releaseYear: { type: Number }, //treated as year on event and sports cases
  },
  { timestamps: true }
);

module.exports = mongoose.model("EventReference", eventReferenceSchema);
