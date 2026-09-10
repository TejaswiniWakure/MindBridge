const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assessmentId: { type: String, required: true },
  responses: [{ questionIndex: Number, selectedOptionIndex: Number, score: Number }],
  totalScore: { type: Number, required: true },
  maxScore: Number,
  severity: String,
  riskLevel: { type: String, enum: ['low', 'moderate', 'high'] },
  riskFlags: [String],
  completedAt: Date
}, { timestamps: true });
module.exports = mongoose.model('AssessmentResult', schema);
