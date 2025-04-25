const mongoose = require("mongoose");

const eventReferenceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    description: { type: String },
    poster: { type: String }, // ✅ lowercase 'poster' (not 'Poster')
    type: {
      type: String,
      required: true,
      enum: ["Movie", "Sport", "Event"],
    },
    year: String,
    source: String,
    rating: String,
    imdbID: { type: String, index: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EventReference", eventReferenceSchema);
