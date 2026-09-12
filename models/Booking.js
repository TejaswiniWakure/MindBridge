const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  therapist: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  duration: { type: Number, default: 45 },
  type: { type: String, enum: ['video', 'chat', 'phone'], default: 'video' },
  status: { type: String, enum: ['scheduled', 'completed', 'cancelled', 'no_show'], default: 'scheduled' },
  videoLink: String,
  consentShared: { assessmentSummaries: Boolean, moodTrends: Boolean, journalSummaries: Boolean },
  notes: String,
  cancelledAt: Date,
  cancelReason: String
}, { timestamps: true });
module.exports = mongoose.model('Booking', schema);
