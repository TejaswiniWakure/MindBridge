const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  therapist: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  sessionDate: { type: Date, required: true },
  summary: String,
  observations: String,
  plan: String,
  homework: String,
  followUp: String,
  riskLevel: String
}, { timestamps: true });
module.exports = mongoose.model('SessionNote', schema);
