const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  symptomResponses: [{ question: String, answer: Number }],
  problemAreas: [String],
  safetyResponses: [{ question: String, answer: Number }],
  assignedAssessments: [String],
  suicideRisk: { type: String, enum: ['none', 'low', 'moderate', 'high'], default: 'none' },
}, { timestamps: true });
module.exports = mongoose.model('TriageResponse', schema);
