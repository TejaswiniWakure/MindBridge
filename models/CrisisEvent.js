const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  triggerSource: { type: String, enum: ['assessment', 'journal', 'ai_coach', 'triage', 'therapist_report'] },
  riskLevel: { type: String, enum: ['moderate', 'high', 'severe'] },
  triggerDetails: String,
  actionsTaken: [{ action: String, timestamp: Date, performedBy: String }],
  status: { type: String, enum: ['open', 'acknowledged', 'resolved', 'escalated'], default: 'open' },
  assignedTherapist: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  resolvedAt: Date
}, { timestamps: true });
module.exports = mongoose.model('CrisisEvent', schema);
