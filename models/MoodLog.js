const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true, min: 1, max: 10 },
  note: String,
  loggedAt: { type: Date, default: Date.now }
}, { timestamps: true });
module.exports = mongoose.model('MoodLog', schema);
