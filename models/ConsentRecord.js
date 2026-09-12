const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  consentType: { type: String, enum: ['terms', 'privacy', 'not_emergency', 'ai_personalization', 'ai_journal', 'therapist_sharing', 'support_circle', 'emergency_alerts'] },
  granted: { type: Boolean, required: true },
  version: { type: String, default: '1.0' },
}, { timestamps: true });
module.exports = mongoose.model('ConsentRecord', schema);
