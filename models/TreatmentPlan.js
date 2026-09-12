const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  track: { type: String, required: true },
  status: { type: String, enum: ['active', 'completed', 'paused', 'adjusted'], default: 'active' },
  durationWeeks: { type: Number, required: true },
  currentWeek: { type: Number, default: 1 },
  focusAreas: [String],
  dailyTimeCommitment: Number,
  modules: [{
    title: String, description: String, week: Number, order: Number,
    status: { type: String, enum: ['locked', 'active', 'completed'] },
    tasks: [{ title: String, description: String, type: { type: String }, duration: Number, completed: Boolean, completedAt: Date }]
  }],
  aiExplanation: String,
  adjustmentHistory: [{ date: Date, reason: String, changes: String }],
  createdBy: { type: String, enum: ['system', 'therapist'], default: 'system' }
}, { timestamps: true });
module.exports = mongoose.model('TreatmentPlan', schema);
