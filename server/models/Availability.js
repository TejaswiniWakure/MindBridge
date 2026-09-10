const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  therapist: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dayOfWeek: Number,
  startTime: String,
  endTime: String,
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });
module.exports = mongoose.model('Availability', schema);
