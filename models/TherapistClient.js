const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  therapist: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  relationshipStatus: { type: String, enum: ['ACTIVE', 'ENDED'], default: 'ACTIVE' },
  startedAt: { type: Date, default: Date.now },
  endedAt: Date
}, { timestamps: true });
module.exports = mongoose.model('TherapistClient', schema);
