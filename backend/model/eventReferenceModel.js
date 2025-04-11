import mongoose from "mongoose";

const eventReferenceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    type: {
      type: String,
      required: true,
      enum: ["Movie", "Sport", "Event"],
    },

    // Movie
    releaseYear: { type: Number },
    movieLanguage: { type: String },
    movieType: { type: String },
    moviePoster: { type: String },

    // Sport
    sportType: { type: String },
    teams: [{ type: String }],

    // Event
    eventType: { type: String },
    artist: { type: String },

    // Common
    description: { type: String },
    venue: { type: String },
    location: { type: String },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("EventReference", eventReferenceSchema);
