const mongoose = require('mongoose');
const mongooseSequence = require('mongoose-sequence')(mongoose);

// Movie Schema Definition
const movieSchema = new mongoose.Schema({
  movieId: { type: Number, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imdbRating: { type: String, required: true },
  releaseYear: { type: String, required: true },
  language: { type: String, required: true },
  certification: { type: String, required: true },
  poster: { type: String, required: true },
  coverImage: { type: String, required: true },
}, { timestamps: true });

movieSchema.plugin(mongooseSequence, { inc_field: 'movieId' });
module.exports = mongoose.model('Movie', movieSchema);
