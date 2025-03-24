const mongoose = require('mongoose');
const mongooseSequence = require('mongoose-sequence')(mongoose);

// User schema definition
const userSchema = new mongoose.Schema({
  userEmail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userId: { type: Number, unique: true }, // userId will be auto-incremented, so no need to make it required
  mobileNumber: { type: String, required: false, unique: false }, // optional
  whatsappNumber: { type: String, required: false, unique: false }, // optional
  address: { type: String, required: false }, // optional
}, { timestamps: true });

// Apply the auto-increment plugin to the userId field
userSchema.plugin(mongooseSequence, { inc_field: 'userId' });

// Export the model
module.exports = mongoose.model('User', userSchema);
